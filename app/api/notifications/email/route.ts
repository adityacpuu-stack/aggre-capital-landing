import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email-service';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { applicationId, status, email, customerName } = body;

    if (!applicationId || !status || !email) {
      return NextResponse.json(
        { success: false, error: 'Application ID, status, and email are required' },
        { status: 400 }
      );
    }

    // Professional email templates
    const getEmailTemplate = (status: string, customerName: string, applicationId: string) => {
      const currentDate = new Date().toLocaleDateString('id-ID', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });

      const baseHTML = `
        <!DOCTYPE html>
        <html lang="id">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Status Pengajuan Kredit - Aggre Capital</title>
        </head>
        <body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #0f766e 0%, #14b8a6 100%); padding: 40px 30px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">
                AGGRE CAPITAL
              </h1>
              <p style="color: #e6fffa; margin: 8px 0 0 0; font-size: 16px; font-weight: 300;">
                Solusi Pendanaan Terpercaya
              </p>
            </div>

            <!-- Content -->
            <div style="padding: 40px 30px;">
              <div style="text-align: center; margin-bottom: 30px;">
                <div style="width: 60px; height: 60px; background: linear-gradient(135deg, #0f766e 0%, #14b8a6 100%); border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center;">
                  <span style="color: #ffffff; font-size: 24px; font-weight: bold;">✓</span>
                </div>
                <h2 style="color: #1f2937; margin: 0 0 10px 0; font-size: 24px; font-weight: 600;">
                  {TITLE}
                </h2>
                <p style="color: #6b7280; margin: 0; font-size: 14px;">
                  ${currentDate}
                </p>
              </div>

              <div style="background-color: #f9fafb; border-radius: 8px; padding: 20px; margin-bottom: 30px;">
                <p style="color: #374151; margin: 0 0 15px 0; font-size: 16px; line-height: 1.6;">
                  Halo <strong style="color: #1f2937;">${customerName}</strong>,
                </p>
                <p style="color: #374151; margin: 0 0 15px 0; font-size: 16px; line-height: 1.6;">
                  {MESSAGE}
                </p>
                <div style="background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 6px; padding: 15px; margin: 20px 0;">
                  <p style="color: #6b7280; margin: 0 0 5px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">
                    ID Pengajuan
                  </p>
                  <p style="color: #1f2937; margin: 0; font-size: 18px; font-weight: 600; font-family: 'Courier New', monospace;">
                    ${applicationId}
                  </p>
                </div>
                {ADDITIONAL_INFO}
              </div>

              <div style="text-align: center; margin: 30px 0;">
                <a href="https://aggre-capital-landing.vercel.app" style="display: inline-block; background: linear-gradient(135deg, #0f766e 0%, #14b8a6 100%); color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-weight: 600; font-size: 14px;">
                  Kunjungi Website
                </a>
              </div>

              <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; margin-top: 30px;">
                <p style="color: #6b7280; margin: 0 0 10px 0; font-size: 14px; line-height: 1.6;">
                  Terima kasih telah mempercayai <strong style="color: #0f766e;">Aggre Capital</strong> sebagai mitra pendanaan Anda.
                </p>
                <p style="color: #6b7280; margin: 0; font-size: 14px;">
                  Salam hangat,<br>
                  <strong style="color: #1f2937;">Tim Aggre Capital</strong>
                </p>
              </div>
            </div>

            <!-- Footer -->
            <div style="background-color: #f9fafb; padding: 20px 30px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="color: #6b7280; margin: 0 0 10px 0; font-size: 12px;">
                © 2024 Aggre Capital. All rights reserved.
              </p>
              <p style="color: #9ca3af; margin: 0; font-size: 11px;">
                Email ini dikirim secara otomatis. Mohon tidak membalas email ini.
              </p>
            </div>
          </div>
        </body>
        </html>
      `;

      switch (status) {
        case 'pending':
          return {
            subject: `✅ Pengajuan Kredit Diterima - ${applicationId}`,
            html: baseHTML
              .replace('{TITLE}', 'Pengajuan Kredit Diterima')
              .replace('{MESSAGE}', `Terima kasih telah mengajukan kredit di Aggre Capital. Pengajuan Anda telah diterima dan sedang dalam proses review oleh tim kami.`)
              .replace('{ADDITIONAL_INFO}', `
                <div style="background-color: #fef3c7; border: 1px solid #f59e0b; border-radius: 6px; padding: 15px; margin: 20px 0;">
                  <p style="color: #92400e; margin: 0; font-size: 14px; font-weight: 600;">
                    ⏰ Proses Review
                  </p>
                  <p style="color: #92400e; margin: 5px 0 0 0; font-size: 14px;">
                    Tim kami akan menghubungi Anda dalam 1-2 hari kerja untuk proses selanjutnya.
                  </p>
                </div>
              `)
          };

        case 'approved':
          return {
            subject: `🎉 Selamat! Pengajuan Kredit Disetujui - ${applicationId}`,
            html: baseHTML
              .replace('{TITLE}', 'Selamat! Pengajuan Disetujui')
              .replace('{MESSAGE}', `Kabar baik! Pengajuan kredit Anda telah disetujui oleh tim review kami.`)
              .replace('{ADDITIONAL_INFO}', `
                <div style="background-color: #d1fae5; border: 1px solid #10b981; border-radius: 6px; padding: 15px; margin: 20px 0;">
                  <p style="color: #065f46; margin: 0; font-size: 14px; font-weight: 600;">
                    🎯 Langkah Selanjutnya
                  </p>
                  <p style="color: #065f46; margin: 5px 0 0 0; font-size: 14px;">
                    Tim kami akan segera menghubungi Anda untuk proses pencairan dana dan penandatanganan dokumen.
                  </p>
                </div>
              `)
          };

        case 'rejected':
          return {
            subject: `Pengajuan Kredit - ${applicationId}`,
            html: baseHTML
              .replace('{TITLE}', 'Update Pengajuan Kredit')
              .replace('{MESSAGE}', `Terima kasih telah mengajukan kredit di Aggre Capital. Setelah review menyeluruh, pengajuan Anda belum dapat disetujui pada saat ini.`)
              .replace('{ADDITIONAL_INFO}', `
                <div style="background-color: #fee2e2; border: 1px solid #ef4444; border-radius: 6px; padding: 15px; margin: 20px 0;">
                  <p style="color: #991b1b; margin: 0; font-size: 14px; font-weight: 600;">
                    📋 Informasi Penting
                  </p>
                  <p style="color: #991b1b; margin: 5px 0 0 0; font-size: 14px;">
                    Anda dapat mengajukan kembali setelah 3 bulan dengan melengkapi dokumen yang diperlukan.
                  </p>
                </div>
              `)
          };

        default:
          return {
            subject: `Update Status Pengajuan - ${applicationId}`,
            html: baseHTML
              .replace('{TITLE}', 'Update Status Pengajuan')
              .replace('{MESSAGE}', `Status pengajuan kredit Anda telah diupdate menjadi <strong>${status}</strong>.`)
              .replace('{ADDITIONAL_INFO}', `
                <div style="background-color: #f3f4f6; border: 1px solid #d1d5db; border-radius: 6px; padding: 15px; margin: 20px 0;">
                  <p style="color: #374151; margin: 0; font-size: 14px; font-weight: 600;">
                    ℹ️ Status Terkini
                  </p>
                  <p style="color: #374151; margin: 5px 0 0 0; font-size: 14px;">
                    Status: <strong>${status}</strong>
                  </p>
                </div>
              `)
          };
      }
    };

    const emailTemplate = getEmailTemplate(status, customerName, applicationId);

    // Send email using the sendEmail function
    const emailResult = await sendEmail({
      to: email,
      subject: emailTemplate.subject,
      html: emailTemplate.html
    });

    if (emailResult.success) {
      return NextResponse.json({
        success: true,
        message: 'Email notification sent successfully',
        messageId: emailResult.messageId
      });
    } else {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Failed to send email notification',
          details: emailResult.error
        },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Email notification error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to send email notification',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}