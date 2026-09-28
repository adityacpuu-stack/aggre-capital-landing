import "server-only";
import { NextResponse } from "next/server";

export { isValidPhone } from "@/lib/form-validation";

export function formError(error: string, status = 400) {
  return NextResponse.json({ success: false, error }, { status });
}

// Reject before email transport or database access. No token, secret, or form data is logged.
export async function verifyFormProtection(body: Record<string, unknown>, action: "contact" | "application") {
  if (body.website !== undefined && body.website !== "") {
    return formError("Pesan tidak dapat diproses. Silakan muat ulang halaman.");
  }
  const secret = process.env.TURNSTILE_SECRET_KEY;
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  if (!secret || !siteKey) {
    return formError("Formulir sementara belum tersedia. Silakan hubungi corp@aggrecapital.com.", 503);
  }
  // Cloudflare's public testing keys must never be used on a Vercel production deployment.
  if (process.env.VERCEL_ENV === "production" &&
      (/^[123]x0{10}/.test(secret) || /^[123]x0{10}/.test(siteKey))) {
    return formError("Verifikasi belum tersedia. Silakan coba lagi nanti.", 503);
  }
  const token = body.turnstileToken;
  if (typeof token !== "string" || !token.trim() || token.length > 2048) {
    return formError("Selesaikan verifikasi keamanan sebelum mengirim formulir.");
  }
  const hostnames = (process.env.TURNSTILE_ALLOWED_HOSTNAMES || "aggrecapital.com,www.aggrecapital.com")
    .split(",").map((host) => host.trim().toLowerCase()).filter(Boolean);
  try {
    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret, response: token }),
      signal: AbortSignal.timeout(8000),
      cache: "no-store",
    });
    if (!response.ok) throw new Error("Verification unavailable");
    const result = await response.json();
    if (result?.success !== true || result.action !== action ||
        typeof result.hostname !== "string" || !hostnames.includes(result.hostname.toLowerCase())) {
      return formError("Verifikasi keamanan gagal atau kedaluwarsa. Silakan verifikasi ulang.", 403);
    }
    return null;
  } catch {
    return formError("Verifikasi sedang terganggu. Data Anda belum dikirim; silakan coba lagi.", 503);
  }
}
