import nodemailer from 'nodemailer'
import { query } from '@/lib/database'

// Primary SMTP configuration (GoDaddy) - WORKING CONFIG
const primaryTransporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtpout.secureserver.net',
  port: Number(process.env.SMTP_PORT) || 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  },
  tls: {
    rejectUnauthorized: process.env.NODE_ENV === 'production'
  },
  connectionTimeout: 15000,
  greetingTimeout: 10000,
  socketTimeout: 15000,
  pool: true,
  maxConnections: 5,
  maxMessages: 100
})

// Fallback SMTP configuration (Gmail)
const fallbackTransporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD
  }
})

// Function to test SMTP connection
async function testSMTPConnection(transporter: nodemailer.Transporter, name: string): Promise<boolean> {
  try {
    await transporter.verify()
    console.log(`✅ ${name} SMTP connection successful`)
    return true
  } catch (error) {
    console.error(`❌ ${name} SMTP connection failed:`, (error as Error).message)
    return false
  }
}

// Function to get working transporter
async function getWorkingTransporter(): Promise<nodemailer.Transporter> {
  // Test primary transporter first
  if (await testSMTPConnection(primaryTransporter, 'Primary (GoDaddy)')) {
    return primaryTransporter
  }
  
  // Test fallback transporter
  if (await testSMTPConnection(fallbackTransporter, 'Fallback (Gmail)')) {
    console.log('⚠️ Using fallback Gmail SMTP')
    return fallbackTransporter
  }
  
  throw new Error('No working SMTP transporter available')
}

export interface ApplicationNotificationData {
  applicationId: string
  customerName: string
  customerEmail: string
  customerPhone: string
  amount: number
  purpose: string
  status: string
  submittedAt: Date
  additionalDetails?: {
    address?: string
    occupation?: string
    workplace?: string
    collateralType?: string
    collateralAddress?: string
  }
}

export async function sendApplicationNotification(data: ApplicationNotificationData) {
  // Skip email if EMAIL_DISABLED is set to true
  if (process.env.EMAIL_DISABLED === 'true') {
    console.log('Email notifications disabled. Skipping admin notification.')
    return { success: true, messageId: 'disabled' }
  }

  try {
    // Get working transporter
    const transporter = await getWorkingTransporter()
    const formattedAmount = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
    }).format(data.amount)

    const emailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #0f766e 0%, #14b8a6 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="margin: 0; font-size: 24px;">🏦 AGGRE CAPITAL</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">Pengajuan Pinjaman Baru</p>
        </div>
        
        <div style="background: white; padding: 30px; border: 1px solid #e5e7eb; border-radius: 0 0 10px 10px;">
          <h2 style="color: #1f2937; margin-bottom: 20px;">📋 Detail Pengajuan</h2>
          
          <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #374151;">ID Pengajuan:</td>
                <td style="padding: 8px 0; color: #1f2937;">${data.applicationId}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #374151;">Nama Debitur:</td>
                <td style="padding: 8px 0; color: #1f2937;">${data.customerName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #374151;">Email:</td>
                <td style="padding: 8px 0; color: #1f2937;">${data.customerEmail}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #374151;">Nomor Telepon:</td>
                <td style="padding: 8px 0; color: #1f2937;">${data.customerPhone}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #374151;">Jumlah Pinjaman:</td>
                <td style="padding: 8px 0; color: #1f2937; font-weight: bold;">${formattedAmount}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #374151;">Tujuan Pinjaman:</td>
                <td style="padding: 8px 0; color: #1f2937;">${data.purpose}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #374151;">Status:</td>
                <td style="padding: 8px 0;">
                  <span style="background: #fef3c7; color: #92400e; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: bold;">
                    ${data.status.toUpperCase()}
                  </span>
                </td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #374151;">Tanggal Pengajuan:</td>
                <td style="padding: 8px 0; color: #1f2937;">${data.submittedAt.toLocaleDateString('id-ID', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}</td>
              </tr>
            </table>
          </div>

          ${data.additionalDetails ? `
          <h3 style="color: #1f2937; margin-bottom: 15px;">📝 Informasi Tambahan</h3>
          <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <table style="width: 100%; border-collapse: collapse;">
              ${data.additionalDetails.address ? `
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #374151;">Alamat:</td>
                <td style="padding: 8px 0; color: #1f2937;">${data.additionalDetails.address}</td>
              </tr>
              ` : ''}
              ${data.additionalDetails.occupation ? `
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #374151;">Pekerjaan:</td>
                <td style="padding: 8px 0; color: #1f2937;">${data.additionalDetails.occupation}</td>
              </tr>
              ` : ''}
              ${data.additionalDetails.workplace ? `
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #374151;">Tempat Kerja:</td>
                <td style="padding: 8px 0; color: #1f2937;">${data.additionalDetails.workplace}</td>
              </tr>
              ` : ''}
              ${data.additionalDetails.collateralType ? `
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #374151;">Jenis Jaminan:</td>
                <td style="padding: 8px 0; color: #1f2937;">${data.additionalDetails.collateralType}</td>
              </tr>
              ` : ''}
              ${data.additionalDetails.collateralAddress ? `
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #374151;">Alamat Jaminan:</td>
                <td style="padding: 8px 0; color: #1f2937;">${data.additionalDetails.collateralAddress}</td>
              </tr>
              ` : ''}
            </table>
          </div>
          ` : ''}

          <div style="background: #ecfdf5; border: 1px solid #a7f3d0; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: #065f46; margin: 0 0 10px 0;">🔔 Langkah Selanjutnya</h3>
            <p style="color: #065f46; margin: 0; line-height: 1.6;">
              Pengajuan ini telah diterima dan sedang dalam proses review. Tim kami akan menghubungi debitur dalam waktu 1-2 hari kerja untuk proses selanjutnya.
            </p>
          </div>

          <div style="text-align: center; margin-top: 30px;">
            <a href="${(process.env.NEXT_PUBLIC_DASHBOARD_URL && !process.env.NEXT_PUBLIC_DASHBOARD_URL.includes('localhost')) ? process.env.NEXT_PUBLIC_DASHBOARD_URL : 'https://aggrecapital.com/dashboard'}"
               style="background: #0f766e; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold;">
              📊 Lihat di Dashboard
            </a>
          </div>
        </div>
        
        <div style="text-align: center; margin-top: 20px; color: #6b7280; font-size: 12px;">
          <p>Email ini dikirim otomatis dari sistem AGGRE CAPITAL</p>
          <p>© 2025 AGGRE CAPITAL. All rights reserved.</p>
        </div>
      </div>
    `

    const mailOptions = {
      from: process.env.EMAIL_USER || 'noreply@aggrecapital.com',
      to: process.env.ADMIN_EMAIL,
      subject: `📋 Pengajuan Pinjaman Baru - ${data.applicationId}`,
      html: emailContent
    }

    const result = await transporter.sendMail(mailOptions)
    console.log('Email notification sent successfully:', result.messageId)
    return { success: true, messageId: result.messageId }

  } catch (error) {
    console.error('Failed to send email notification:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}

// Simple email sending function for testing
// Konfigurasi SMTP efektif: baca dari tabel smtp_settings (yang diisi lewat
// dashboard Settings), pakai environment variable sebagai cadangan. Di-cache
// 60 detik supaya tidak query DB tiap kirim email.
interface EffectiveSmtp {
  enabled: boolean
  source: 'db' | 'env'
  host: string
  port: number
  secure: boolean
  user?: string
  pass?: string
  fromName: string
  fromEmail: string
  replyTo?: string
}

let smtpCache: { at: number; cfg: EffectiveSmtp } | null = null

async function getEffectiveSmtp(): Promise<EffectiveSmtp> {
  if (smtpCache && Date.now() - smtpCache.at < 60000) return smtpCache.cfg

  const envDisabled = process.env.EMAIL_DISABLED === 'true'
  let cfg: EffectiveSmtp

  let db: any = null
  try {
    const r = await query('SELECT * FROM smtp_settings ORDER BY id DESC LIMIT 1')
    if (r.rows.length > 0) db = r.rows[0]
  } catch (e) {
    console.warn('smtp_settings tidak terbaca, pakai env:', (e as Error).message)
  }

  if (db) {
    const port = Number(db.smtp_port) || Number(process.env.SMTP_PORT) || 587
    cfg = {
      enabled: db.enabled !== false && !envDisabled,
      source: 'db',
      host: db.smtp_host || process.env.SMTP_HOST || 'smtpout.secureserver.net',
      port,
      secure: db.smtp_secure === true || port === 465,
      user: db.smtp_username || process.env.EMAIL_USER,
      pass: db.smtp_password || process.env.EMAIL_PASSWORD,
      fromName: db.from_name || 'Aggre Capital',
      fromEmail: db.from_email || db.smtp_username || process.env.EMAIL_USER || 'noreply@aggrecapital.com',
      replyTo: db.reply_to || undefined,
    }
  } else {
    const port = Number(process.env.SMTP_PORT) || 465
    cfg = {
      enabled: !envDisabled,
      source: 'env',
      host: process.env.SMTP_HOST || 'smtpout.secureserver.net',
      port,
      secure: port === 465,
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
      fromName: 'Aggre Capital',
      fromEmail: process.env.EMAIL_USER || 'noreply@aggrecapital.com',
      replyTo: undefined,
    }
  }

  smtpCache = { at: Date.now(), cfg }
  return cfg
}

function buildTransporter(cfg: EffectiveSmtp): nodemailer.Transporter {
  return nodemailer.createTransport({
    host: cfg.host,
    port: cfg.port,
    secure: cfg.secure,
    auth: { user: cfg.user, pass: cfg.pass },
    requireTLS: !cfg.secure,
    tls: { rejectUnauthorized: process.env.NODE_ENV === 'production', minVersion: 'TLSv1.2' },
    connectionTimeout: 15000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
  })
}

export async function sendEmail({ to, subject, html, replyTo }: { to: string; subject: string; html: string; replyTo?: string }) {
  const cfg = await getEffectiveSmtp()

  // Hormati toggle "Enable SMTP" (dari DB) maupun env EMAIL_DISABLED.
  if (!cfg.enabled) {
    console.log('Email disabled (via dashboard/env). Skipping email send.')
    return { success: true, messageId: 'disabled' }
  }

  const mailOptions: Record<string, unknown> = {
    from: `"${cfg.fromName}" <${cfg.fromEmail}>`,
    to,
    subject,
    html,
  }
  const effectiveReplyTo = replyTo || cfg.replyTo
  if (effectiveReplyTo) mailOptions.replyTo = effectiveReplyTo

  try {
    const result = await buildTransporter(cfg).sendMail(mailOptions)
    console.log(`Email sent (config: ${cfg.source}):`, result.messageId)
    return { success: true, messageId: result.messageId }
  } catch (error) {
    console.error(`Failed to send email (config: ${cfg.source}):`, error)
    // Kalau config DB gagal, coba sekali lagi dengan config env sebagai jaring pengaman.
    if (cfg.source === 'db') {
      try {
        const envPort = Number(process.env.SMTP_PORT) || 465
        const envCfg: EffectiveSmtp = {
          enabled: true, source: 'env',
          host: process.env.SMTP_HOST || 'smtpout.secureserver.net',
          port: envPort, secure: envPort === 465,
          user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASSWORD,
          fromName: cfg.fromName, fromEmail: process.env.EMAIL_USER || cfg.fromEmail,
        }
        const result = await buildTransporter(envCfg).sendMail({ ...mailOptions, from: `"${envCfg.fromName}" <${envCfg.fromEmail}>` })
        console.log('Email sent via env fallback:', result.messageId)
        return { success: true, messageId: result.messageId }
      } catch (e2) {
        console.error('Env fallback juga gagal:', e2)
      }
    }
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}

export async function sendCustomerConfirmation(data: ApplicationNotificationData) {
  // Skip email if EMAIL_DISABLED is set to true
  if (process.env.EMAIL_DISABLED === 'true') {
    console.log('Email notifications disabled. Skipping customer confirmation.')
    return { success: true, messageId: 'disabled' }
  }

  try {
    // Get working transporter
    const transporter = await getWorkingTransporter()
    const formattedAmount = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
    }).format(data.amount)

    const emailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #0f766e 0%, #14b8a6 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="margin: 0; font-size: 24px;">🏦 AGGRE CAPITAL</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">Konfirmasi Pengajuan Pinjaman</p>
        </div>
        
        <div style="background: white; padding: 30px; border: 1px solid #e5e7eb; border-radius: 0 0 10px 10px;">
          <h2 style="color: #1f2937; margin-bottom: 20px;">✅ Pengajuan Berhasil Diterima</h2>
          
          <p style="color: #374151; line-height: 1.6; margin-bottom: 20px;">
            Halo <strong>${data.customerName}</strong>,<br>
            Terima kasih telah mengajukan permohonan pinjaman kepada AGGRE CAPITAL. Pengajuan Anda telah berhasil diterima dan sedang dalam proses review.
          </p>
          
          <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: #1f2937; margin-bottom: 15px;">📋 Detail Pengajuan</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #374151;">ID Pengajuan:</td>
                <td style="padding: 8px 0; color: #1f2937; font-family: monospace;">${data.applicationId}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #374151;">Jumlah Pinjaman:</td>
                <td style="padding: 8px 0; color: #1f2937; font-weight: bold;">${formattedAmount}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #374151;">Tujuan Pinjaman:</td>
                <td style="padding: 8px 0; color: #1f2937;">${data.purpose}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #374151;">Status:</td>
                <td style="padding: 8px 0;">
                  <span style="background: #fef3c7; color: #92400e; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: bold;">
                    ${data.status.toUpperCase()}
                  </span>
                </td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #374151;">Tanggal Pengajuan:</td>
                <td style="padding: 8px 0; color: #1f2937;">${data.submittedAt.toLocaleDateString('id-ID', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}</td>
              </tr>
            </table>
          </div>

          <div style="background: #ecfdf5; border: 1px solid #a7f3d0; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: #065f46; margin: 0 0 10px 0;">📞 Langkah Selanjutnya</h3>
            <ul style="color: #065f46; margin: 0; padding-left: 20px; line-height: 1.6;">
              <li>Tim kami akan menghubungi Anda dalam waktu 1-2 hari kerja</li>
              <li>Pastikan nomor telepon Anda aktif dan dapat dihubungi</li>
              <li>Siapkan dokumen pendukung yang diperlukan</li>
              <li>Simpan ID Pengajuan ini untuk referensi</li>
            </ul>
          </div>

          <div style="background: #fef3c7; border: 1px solid #f59e0b; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: #92400e; margin: 0 0 10px 0;">⚠️ Informasi Penting</h3>
            <p style="color: #92400e; margin: 0; line-height: 1.6;">
              AGGRE CAPITAL tidak akan meminta biaya apapun di muka. Semua biaya administrasi dan provisi akan dipotong setelah pinjaman disetujui dan dana dicairkan.
            </p>
          </div>

          <div style="text-align: center; margin-top: 30px;">
            <p style="color: #6b7280; margin-bottom: 15px;">Jika ada pertanyaan, silakan hubungi kami:</p>
            <p style="color: #1f2937; font-weight: bold; margin: 5px 0;">📞 (021) 1234-5678</p>
            <p style="color: #1f2937; font-weight: bold; margin: 5px 0;">📧 info@aggrecapital.com</p>
          </div>
        </div>
        
        <div style="text-align: center; margin-top: 20px; color: #6b7280; font-size: 12px;">
          <p>© 2025 AGGRE CAPITAL. All rights reserved.</p>
          <p>Jalan Iskandarsyah Raya No 1 A, Menara Sentraya Lantai 18, Melawai, Kec. Kebayoran Baru, Kota Jakarta Selatan, DKI Jakarta 12160</p>
        </div>
      </div>
    `

    const mailOptions = {
      from: process.env.EMAIL_USER || 'noreply@aggrecapital.com',
      to: data.customerEmail,
      subject: `✅ Konfirmasi Pengajuan Pinjaman - ${data.applicationId}`,
      html: emailContent
    }

    const result = await transporter.sendMail(mailOptions)
    console.log('Customer confirmation email sent successfully:', result.messageId)
    return { success: true, messageId: result.messageId }

  } catch (error) {
    console.error('Failed to send customer confirmation email:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}
