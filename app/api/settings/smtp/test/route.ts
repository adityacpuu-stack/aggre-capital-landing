import { NextRequest, NextResponse } from "next/server";
import { authenticate } from "@/lib/auth-middleware";

async function retired(request: NextRequest) {
  const auth = await authenticate(request);
  if (!auth.isAuthenticated)
    return (
      auth.response || NextResponse.json({ success: false }, { status: 401 })
    );
  return NextResponse.json(
    {
      success: false,
      error:
        "SMTP tidak lagi digunakan. Kelola notifikasi Resend melalui pengaturan email.",
    },
    { status: 410 },
  );
}
export { retired as GET, retired as POST };
