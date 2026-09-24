import "server-only";
import { isValidEmail } from "@/lib/sanitize";

export interface EmailOptions {
  to: string | string[];
  cc?: string | string[];
  subject: string;
  html?: string;
  text?: string;
  replyTo?: string;
  idempotencyKey?: string;
  attachments?: {
    filename: string;
    content: string | Buffer;
    content_type?: string;
  }[];
}

export interface EmailResult {
  success: boolean;
  provider: "resend";
  status: "accepted" | "failed" | "disabled" | "unknown";
  messageId?: string;
  error?: string;
  code?: string;
}

function validMailbox(value: string): boolean {
  if (/[\r\n]/.test(value)) return false;
  const address = /<([^<>]+)>$/.exec(value)?.[1] || value;
  return isValidEmail(address);
}

// Exposes readiness, never the API key. Configuration presence is not proof
// of domain verification or delivery to the recipient's inbox.
export function getEmailConfiguration() {
  const from = process.env.RESEND_FROM_EMAIL?.trim() || "";
  const replyTo = process.env.RESEND_REPLY_TO?.trim() || "";
  const enabled = process.env.EMAIL_DISABLED !== "true";
  const apiKeyConfigured = Boolean(process.env.RESEND_API_KEY?.trim());
  const senderConfigured = Boolean(from && validMailbox(from));
  const replyToValid = !replyTo || validMailbox(replyTo);
  return {
    provider: "resend" as const,
    enabled,
    apiKeyConfigured,
    senderConfigured,
    from,
    replyTo,
    ready: enabled && apiKeyConfigured && senderConfigured && replyToValid,
  };
}

export async function sendEmail(options: EmailOptions): Promise<EmailResult> {
  const config = getEmailConfiguration();
  const failed = (
    code: string,
    error: string,
    status: EmailResult["status"] = "failed",
  ): EmailResult => ({
    success: false,
    provider: "resend",
    status,
    code,
    error,
  });
  if (!config.enabled)
    return failed(
      "email_disabled",
      "Pengiriman email sedang dinonaktifkan.",
      "disabled",
    );
  if (!config.ready)
    return failed("email_not_configured", "Konfigurasi Resend belum lengkap.");
  const to = (Array.isArray(options.to) ? options.to : [options.to]).map(
    (address) => address.trim(),
  );
  const cc = (options.cc === undefined ? [] : Array.isArray(options.cc) ? options.cc : [options.cc]).map(
    (address) => address.trim(),
  );
  const replyTo = options.replyTo?.trim() || config.replyTo;
  if (
    !to.length ||
    to.some((address) => !validMailbox(address)) ||
    cc.some((address) => !validMailbox(address)) ||
    (replyTo && !validMailbox(replyTo))
  ) {
    return failed("invalid_recipient", "Alamat email tidak valid.");
  }
  if (!options.subject?.trim() || (!options.html && !options.text))
    return failed("invalid_content", "Isi email belum lengkap.");

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      cache: "no-store",
      signal: AbortSignal.timeout(15000),
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY!.trim()}`,
        "Content-Type": "application/json",
        ...(options.idempotencyKey
          ? { "Idempotency-Key": options.idempotencyKey }
          : {}),
      },
      body: JSON.stringify({
        from: config.from,
        to,
        ...(cc.length ? { cc } : {}),
        subject: options.subject,
        html: options.html,
        text: options.text,
        ...(replyTo ? { reply_to: replyTo } : {}),
        ...(options.attachments
          ? {
              attachments: options.attachments.map((file) => ({
                ...file,
                content: Buffer.isBuffer(file.content)
                  ? file.content.toString("base64")
                  : file.content,
              })),
            }
          : {}),
      }),
    });
    const result = await response.json().catch(() => null);
    if (!response.ok) {
      console.error("Resend rejected email request", {
        status: response.status,
      });
      return failed(
        "provider_rejected",
        "Resend belum menerima permintaan pengiriman email.",
      );
    }
    if (typeof result?.id !== "string" || !result.id)
      return failed(
        "invalid_response",
        "Status pengiriman email belum dapat dipastikan.",
        "unknown",
      );
    return {
      success: true,
      provider: "resend",
      status: "accepted",
      messageId: result.id,
    };
  } catch {
    // Do not automatically retry or fall back to SMTP after an ambiguous
    // network result: the provider may already have accepted the email.
    console.error("Resend request did not return a confirmed result");
    return failed(
      "network_error",
      "Status pengiriman email belum dapat dipastikan.",
      "unknown",
    );
  }
}
