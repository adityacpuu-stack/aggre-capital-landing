import { sendEmail } from '@/lib/email-service'
import { escapeHtml } from '@/lib/sanitize'

// Status pengajuan yang diizinkan. Nilai di luar daftar ini ditolak sehingga
// isi email tidak bisa dikendalikan bebas oleh pemanggil.
export const ALLOWED_STATUSES = ['pending', 'reviewing', 'approved', 'rejected'] as const
export type ApplicationStatus = (typeof ALLOWED_STATUSES)[number]

export function isAllowedStatus(value: unknown): value is ApplicationStatus {
  return typeof value === 'string' && (ALLOWED_STATUSES as readonly string[]).includes(value)
}

interface StatusEmailInput {
  applicationId: string
  status: ApplicationStatus
  email: string
  customerName?: string
}

// Membangun template email status dan mengirimnya lewat SMTP.
// SEMUA nilai dinamis di-escape lebih dulu; placeholder diganti dengan fungsi
// pengganti agar karakter seperti `$&` pada input tidak diperlakukan sebagai pola.
export async function sendStatusEmail(input: StatusEmailInput) {
  const applicationId = escapeHtml(input.applicationId)
  const customerName = escapeHtml(input.customerName || 'Pelanggan')
  const statusLabel = escapeHtml(input.status)

  const currentDate = new Date().toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

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
        <div style="background: linear-gradient(135deg, #0f766e 0%, #14b8a6 100%); padding: 40px 30px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">AGGRE CAPITAL</h1>
          <p style="color: #e6fffa; margin: 8px 0 0 0; font-size: 16px; font-weight: 300;">Solusi Pendanaan Terpercaya</p>
        </div>
        <div style="padding: 40px 30px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <div style="width: 60px; height: 60px; background: linear-gradient(135deg, #0f766e 0%, #14b8a6 100%); border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center;">
              <span style="color: #ffffff; font-size: 24px; font-weight: bold;">&#10003;</span>
            </div>
            <h2 style="color: #1f2937; margin: 0 0 10px 0; font-size: 24px; font-weight: 600;">{TITLE}</h2>
            <p style="color: #6b7280; margin: 0; font-size: 14px;">${currentDate}</p>
          </div>
          <div style="background-color: #f9fafb; border-radius: 8px; padding: 20px; margin-bottom: 30px;">
            <p style="color: #374151; margin: 0 0 15px 0; font-size: 16px; line-height: 1.6;">Halo <strong style="color: #1f2937;">${customerName}</strong>,</p>
            <p style="color: #374151; margin: 0 0 15px 0; font-size: 16px; line-height: 1.6;">{MESSAGE}</p>
            <div style="background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 6px; padding: 15px; margin: 20px 0;">
              <p style="color: #6b7280; margin: 0 0 5px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">ID Pengajuan</p>
              <p style="color: #1f2937; margin: 0; font-size: 18px; font-weight: 600; font-family: 'Courier New', monospace;">${applicationId}</p>
            </div>
            {ADDITIONAL_INFO}
          </div>
          <div style="text-align: center; margin: 30px 0;">
            <a href="https://aggrecapital.com" style="display: inline-block; background: linear-gradient(135deg, #0f766e 0%, #14b8a6 100%); color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-weight: 600; font-size: 14px;">Kunjungi Website</a>
          </div>
          <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; margin-top: 30px;">
            <p style="color: #6b7280; margin: 0 0 10px 0; font-size: 14px; line-height: 1.6;">Terima kasih telah mempercayai <strong style="color: #0f766e;">Aggre Capital</strong> sebagai mitra pendanaan Anda.</p>
            <p style="color: #6b7280; margin: 0; font-size: 14px;">Salam hangat,<br><strong style="color: #1f2937;">Tim Aggre Capital</strong></p>
          </div>
        </div>
        <div style="background-color: #f9fafb; padding: 20px 30px; text-align: center; border-top: 1px solid #e5e7eb;">
          <p style="color: #6b7280; margin: 0 0 10px 0; font-size: 12px;">&copy; ${new Date().getFullYear()} Aggre Capital. Hak cipta dilindungi.</p>
          <p style="color: #9ca3af; margin: 0; font-size: 11px;">Email ini dikirim secara otomatis. Mohon tidak membalas email ini.</p>
        </div>
      </div>
    </body>
    </html>
  `

  const variants: Record<ApplicationStatus, { subject: string; title: string; message: string; info: string }> = {
    pending: {
      subject: `Pengajuan Kredit Diterima - ${input.applicationId}`,
      title: 'Pengajuan Kredit Diterima',
      message: 'Terima kasih telah mengajukan kredit di Aggre Capital. Pengajuan Anda telah diterima dan sedang dalam proses review oleh tim kami.',
      info: infoBox('#fef3c7', '#f59e0b', '#92400e', 'Proses Review', 'Tim kami akan menghubungi Anda dalam 1-2 hari kerja untuk proses selanjutnya.'),
    },
    reviewing: {
      subject: `Pengajuan Kredit Sedang Ditinjau - ${input.applicationId}`,
      title: 'Pengajuan Sedang Ditinjau',
      message: 'Pengajuan kredit Anda sedang dalam tahap peninjauan oleh tim kami.',
      info: infoBox('#fef3c7', '#f59e0b', '#92400e', 'Proses Review', 'Mohon menunggu, kami akan mengabari hasilnya secepatnya.'),
    },
    approved: {
      subject: `Selamat! Pengajuan Kredit Disetujui - ${input.applicationId}`,
      title: 'Selamat! Pengajuan Disetujui',
      message: 'Kabar baik! Pengajuan kredit Anda telah disetujui oleh tim review kami.',
      info: infoBox('#d1fae5', '#10b981', '#065f46', 'Langkah Selanjutnya', 'Tim kami akan segera menghubungi Anda untuk proses pencairan dana dan penandatanganan dokumen.'),
    },
    rejected: {
      subject: `Pengajuan Kredit - ${input.applicationId}`,
      title: 'Update Pengajuan Kredit',
      message: 'Terima kasih telah mengajukan kredit di Aggre Capital. Setelah review menyeluruh, pengajuan Anda belum dapat disetujui pada saat ini.',
      info: infoBox('#fee2e2', '#ef4444', '#991b1b', 'Informasi Penting', 'Anda dapat mengajukan kembali setelah 3 bulan dengan melengkapi dokumen yang diperlukan.'),
    },
  }

  const v = variants[input.status]
  const html = baseHTML
    .replace('{TITLE}', () => escapeHtml(v.title))
    .replace('{MESSAGE}', () => escapeHtml(v.message))
    .replace('{ADDITIONAL_INFO}', () => v.info)

  return sendEmail({ to: input.email, subject: v.subject, html })
}

function infoBox(bg: string, border: string, text: string, heading: string, body: string): string {
  return `
    <div style="background-color: ${bg}; border: 1px solid ${border}; border-radius: 6px; padding: 15px; margin: 20px 0;">
      <p style="color: ${text}; margin: 0; font-size: 14px; font-weight: 600;">${escapeHtml(heading)}</p>
      <p style="color: ${text}; margin: 5px 0 0 0; font-size: 14px;">${escapeHtml(body)}</p>
    </div>
  `
}
