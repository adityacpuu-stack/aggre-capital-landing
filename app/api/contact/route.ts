import { contactEmail } from "@/lib/email-templates";
import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/email-service";
import { isValidEmail } from "@/lib/sanitize";

// All public contact messages go to the company inbox, never a request-supplied recipient.
const CONTACT_RECIPIENT = "hallo@aggrecapital.com";
const CONTACT_CC = "corp@aggrecapital.com";

// Endpoint publik untuk form "Hubungi Kami".
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim();
    const phone = String(body.phone || "").trim();
    const message = String(body.message || "").trim();

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: "Nama, email, dan pesan wajib diisi." },
        { status: 400 },
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { success: false, error: "Format email tidak valid." },
        { status: 400 },
      );
    }

    // Batasi panjang agar tidak dipakai mengirim payload besar.
    if (name.length > 120 || phone.length > 40 || message.length > 5000) {
      return NextResponse.json(
        { success: false, error: "Input terlalu panjang." },
        { status: 400 },
      );
    }

    const result = await sendEmail({
      to: CONTACT_RECIPIENT,
      cc: CONTACT_CC,
      ...contactEmail({ name, email, phone, message }),
      replyTo: email,
    });

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: "Pesan terkirim. Terima kasih!",
      });
    }
    return NextResponse.json(
      {
        success: false,
        error: "Gagal mengirim pesan. Silakan coba lagi nanti.",
      },
      { status: 502 },
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { success: false, error: "Gagal mengirim pesan." },
      { status: 500 },
    );
  }
}
