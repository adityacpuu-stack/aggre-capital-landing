import { testEmail } from "@/lib/email-templates";
import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/email-service";

export async function POST(request: NextRequest) {
  // Only allow in development
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  try {
    const { to, subject, message } = await request.json();

    if (!to || !subject || !message) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required fields: to, subject, message",
        },
        { status: 400 },
      );
    }

    const emailResult = await sendEmail({
      to: to,
      ...testEmail(String(message)),
      subject: `[TEST] ${String(subject).replace(/[\r\n]+/g, " ")} | AGGRE CAPITAL`,
    });

    return NextResponse.json({
      success: emailResult.success,
      message: emailResult.success
        ? "Resend accepted test email"
        : "Test email not confirmed",
      data: {
        to: to,
        subject: subject,
        timestamp: new Date().toISOString(),
        result: emailResult,
      },
    });
  } catch (error) {
    console.error("Test email error:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : "Failed to send test email",
      },
      { status: 500 },
    );
  }
}

export async function GET() {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({
    success: true,
    message: "Email test endpoint is ready",
    usage: {
      method: "POST",
      endpoint: "/api/test-email",
      body: {
        to: "recipient@example.com",
        subject: "Test Subject",
        message: "Test message content",
      },
    },
  });
}
