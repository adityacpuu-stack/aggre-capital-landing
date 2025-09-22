import nodemailer from 'nodemailer'

// Primary SMTP configuration (GoDaddy) - WORKING CONFIG
const primaryTransporter = nodemailer.createTransport({
  host: 'smtpout.secureserver.net',
  port: 465,
  secure: true, // use SSL for port 465
  auth: {
    user: process.env.EMAIL_USER || 'support@pfigroup.id',
    pass: process.env.EMAIL_PASSWORD || 'PathFinder@123'
  },
  tls: {
    rejectUnauthorized: false
  },
  connectionTimeout: 15000, // 15 seconds
  greetingTimeout: 10000, // 10 seconds
  socketTimeout: 15000, // 15 seconds
  pool: true,
  maxConnections: 5,
  maxMessages: 100
})

// Fallback SMTP configuration (Gmail)
const fallbackTransporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER || 'your-gmail@gmail.com',
    pass: process.env.GMAIL_APP_PASSWORD || 'your-app-password'
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
            <a href="${process.env.NEXT_PUBLIC_DASHBOARD_URL || 'http://localhost:3000/dashboard'}" 
               style="background: #0f766e; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold;">
              📊 Lihat di Dashboard
            </a>
          </div>
        </div>
        
        <div style="text-align: center; margin-top: 20px; color: #6b7280; font-size: 12px;">
          <p>Email ini dikirim otomatis dari sistem AGGRE CAPITAL</p>
          <p>© 2024 AGGRE CAPITAL. All rights reserved.</p>
        </div>
      </div>
    `

    const mailOptions = {
      from: process.env.EMAIL_USER || 'noreply@aggrecapital.com',
      to: process.env.ADMIN_EMAIL || 'admin@aggrecapital.com',
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
export async function sendEmail({ to, subject, html }: { to: string; subject: string; html: string }) {
  // Skip email if EMAIL_DISABLED is set to true
  if (process.env.EMAIL_DISABLED === 'true') {
    console.log('Email notifications disabled. Skipping email send.')
    return { success: true, messageId: 'disabled' }
  }

  try {
    // Get working transporter
    const transporter = await getWorkingTransporter()

    const mailOptions = {
      from: `"Aggre Capital" <${process.env.EMAIL_USER || 'support@pfigroup.id'}>`,
      to: to,
      subject: subject,
      html: html
    }

    const result = await transporter.sendMail(mailOptions)
    console.log('Email sent successfully:', result.messageId)
    return { success: true, messageId: result.messageId }

  } catch (error) {
    console.error('Failed to send email:', error)
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
          <p>© 2024 AGGRE CAPITAL. All rights reserved.</p>
          <p>Jl. Sudirman No. 123, Jakarta Pusat, DKI Jakarta 12345</p>
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
