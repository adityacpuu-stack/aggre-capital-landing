import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email-service';
import { escapeHtml, isValidEmail } from '@/lib/sanitize';

// Endpoint publik untuk form "Hubungi Kami". Meneruskan pesan ke ADMIN_EMAIL.
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const name = String(body.name || '').trim();
    const email = String(body.email || '').trim();
    const phone = String(body.phone || '').trim();
    const message = String(body.message || '').trim();

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: 'Nama, email, dan pesan wajib diisi.' },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { success: false, error: 'Format email tidak valid.' },
        { status: 400 }
      );
    }

    // Batasi panjang agar tidak dipakai mengirim payload besar.
    if (name.length > 120 || phone.length > 40 || message.length > 5000) {
      return NextResponse.json(
        { success: false, error: 'Input terlalu panjang.' },
        { status: 400 }
      );
    }

    const adminEmail = process.env.ADMIN_EMAIL || process.env.EMAIL_USER;
    if (!adminEmail) {
      console.error('Contact form: ADMIN_EMAIL/EMAIL_USER tidak diset');
      return NextResponse.json(
        { success: false, error: 'Konfigurasi email belum lengkap.' },
        { status: 500 }
      );
    }

    const html = `
      <div style="font-family: 'Segoe UI', Tahoma, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #0f766e;">Pesan Baru dari Form Kontak</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px; font-weight: 600; width: 120px;">Nama</td><td style="padding: 8px;">${escapeHtml(name)}</td></tr>
          <tr><td style="padding: 8px; font-weight: 600;">Email</td><td style="padding: 8px;">${escapeHtml(email)}</td></tr>
          <tr><td style="padding: 8px; font-weight: 600;">Telepon</td><td style="padding: 8px;">${escapeHtml(phone || '-')}</td></tr>
        </table>
        <div style="margin-top: 16px; padding: 16px; background: #f9fafb; border-radius: 8px;">
          <p style="margin: 0 0 8px; font-weight: 600; color: #374151;">Pesan:</p>
          <p style="margin: 0; white-space: pre-wrap; color: #374151;">${escapeHtml(message)}</p>
        </div>
      </div>
    `;

    const result = await sendEmail({
      to: adminEmail,
      subject: `Pesan Kontak dari ${name}`,
      html,
      replyTo: email,
    });

    if (result.success) {
      return NextResponse.json({ success: true, message: 'Pesan terkirim. Terima kasih!' });
    }
    return NextResponse.json(
      { success: false, error: 'Gagal mengirim pesan. Silakan coba lagi nanti.' },
      { status: 502 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { success: false, error: 'Gagal mengirim pesan.' },
      { status: 500 }
    );
  }
}
