import { NextRequest, NextResponse } from "next/server";
import { authenticate } from "@/lib/auth-middleware";
import { getEmailConfiguration } from "@/lib/resend-email";

export async function GET(request: NextRequest) {
  const auth = await authenticate(request);
  if (!auth.isAuthenticated)
    return (
      auth.response || NextResponse.json({ success: false }, { status: 401 })
    );
  return NextResponse.json(
    { success: true, data: getEmailConfiguration() },
    {
      headers: { "Cache-Control": "no-store" },
    },
  );
}
