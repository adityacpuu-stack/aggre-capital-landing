import { testEmail } from "@/lib/email-templates";
import { NextRequest, NextResponse } from "next/server";
import { authenticate } from "@/lib/auth-middleware";
import { sendEmail } from "@/lib/resend-email";

export async function POST(request: NextRequest) {
  const auth = await authenticate(request);
  if (!auth.isAuthenticated)
    return (
      auth.response || NextResponse.json({ success: false }, { status: 401 })
    );
  // A test is only sent after an explicit click, to the signed-in admin.
  const result = await sendEmail({
    to: auth.user.email,
    ...testEmail(),
  });
  return NextResponse.json(
    {
      success: result.success,
      status: result.status,
      messageId: result.messageId,
      ...(result.success
        ? {
            message:
              "Resend menerima email uji. Periksa inbox atau folder spam Anda.",
          }
        : { error: result.error }),
    },
    {
      status: result.success ? 200 : 502,
      headers: { "Cache-Control": "no-store" },
    },
  );
}
