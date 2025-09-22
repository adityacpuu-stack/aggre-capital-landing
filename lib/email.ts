import nodemailer from 'nodemailer'
import { query } from '@/lib/database'

interface EmailOptions {
  to: string | string[]
  subject: string
  html?: string
  text?: string
  attachments?: any[]
}

export async function sendEmail(options: EmailOptions) {
  try {
    // Get SMTP settings from database
    const result = await query('SELECT * FROM smtp_settings WHERE enabled = true ORDER BY id DESC LIMIT 1')
    
    if (result.rows.length === 0) {
      throw new Error('SMTP not configured or disabled')
    }

    const settings = result.rows[0]
    
    // Use environment password if not set in database
    const password = settings.smtp_password || process.env.EMAIL_PASSWORD
    
    if (!password) {
      throw new Error('SMTP password not configured')
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: settings.smtp_host,
      port: settings.smtp_port,
      secure: false, // Always use STARTTLS, not SSL
      auth: {
        user: settings.smtp_username,
        pass: password,
      },
      // Try without TLS for debugging
      ignoreTLS: true,
      tls: {
        rejectUnauthorized: false,
        minVersion: 'TLSv1'
      }
    })

    // Send email
    const emailOptions = {
      from: `${settings.from_name} <${settings.from_email}>`,
      to: Array.isArray(options.to) ? options.to.join(', ') : options.to,
      subject: options.subject,
      html: options.html,
      text: options.text,
      replyTo: settings.reply_to,
      attachments: options.attachments
    }

    const info = await transporter.sendMail(emailOptions)
    
    console.log('Email sent successfully:', info.messageId)
    return { success: true, messageId: info.messageId }
    
  } catch (error: any) {
    console.error('Failed to send email:', error)
    return { success: false, error: error.message }
  }
}

// Email templates
export const emailTemplates = {
  applicationReceived: (customerName: string, applicationId: string) => ({
    subject: 'Pengajuan Pinjaman Diterima - AGGRE CAPITAL',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #0d9488 0%, #06b6d4 100%); padding: 40px 20px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px;">AGGRE CAPITAL</h1>
          <p style="color: #e0f2fe; margin: 10px 0 0 0; font-size: 16px;">Solusi Permasalahan Finansial</p>
        </div>
        
        <div style="padding: 40px 20px; background: #f9fafb;">
          <h2 style="color: #1f2937; margin-top: 0;">Halo ${customerName},</h2>
          
          <p style="color: #4b5563; line-height: 1.6; font-size: 16px;">
            Terima kasih telah mengajukan pinjaman di AGGRE CAPITAL. Pengajuan Anda telah kami terima dengan nomor:
          </p>
          
          <div style="background: white; border: 2px solid #0d9488; border-radius: 8px; padding: 20px; text-align: center; margin: 20px 0;">
            <h3 style="margin: 0; color: #0d9488; font-size: 24px;">
              ID Pengajuan: ${applicationId}
            </h3>
          </div>
          
          <p style="color: #4b5563; line-height: 1.6; font-size: 16px;">
            Tim kami akan segera meninjau pengajuan Anda dan menghubungi Anda dalam 1-2 hari kerja. 
            Pastikan nomor telepon Anda selalu aktif untuk memudahkan proses komunikasi.
          </p>
          
          <div style="background: #e0f2fe; border-left: 4px solid #0d9488; padding: 15px; margin: 20px 0;">
            <h4 style="margin: 0 0 10px 0; color: #0d9488;">Langkah Selanjutnya:</h4>
            <ul style="margin: 0; color: #1f2937; line-height: 1.6;">
              <li>Tim kami akan menghubungi Anda untuk verifikasi data</li>
              <li>Proses evaluasi dokumen dan kelayakan</li>
              <li>Pemberitahuan hasil pengajuan</li>
              <li>Pencairan dana (jika disetujui)</li>
            </ul>
          </div>
          
          <p style="color: #6b7280; line-height: 1.6; font-size: 14px;">
            Jika ada pertanyaan, silakan hubungi customer service kami di WhatsApp atau email support.
          </p>
        </div>
        
        <div style="background: #1f2937; padding: 20px; text-align: center; color: #9ca3af;">
          <p style="margin: 0; font-size: 14px;">
            © 2024 AGGRE CAPITAL. All rights reserved.<br>
            Email ini dikirim otomatis, mohon tidak membalas email ini.
          </p>
        </div>
      </div>
    `
  }),

  applicationStatusUpdate: (customerName: string, applicationId: string, status: string, message?: string) => {
    const statusInfo = {
      approved: { title: 'Pengajuan Disetujui! 🎉', color: '#059669', bgColor: '#d1fae5' },
      rejected: { title: 'Pengajuan Ditolak', color: '#dc2626', bgColor: '#fee2e2' },
      reviewing: { title: 'Pengajuan Sedang Ditinjau', color: '#d97706', bgColor: '#fef3c7' }
    }[status] || { title: 'Update Status Pengajuan', color: '#0d9488', bgColor: '#e0f2fe' }

    return {
      subject: `${statusInfo.title} - AGGRE CAPITAL (${applicationId})`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #0d9488 0%, #06b6d4 100%); padding: 40px 20px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px;">AGGRE CAPITAL</h1>
            <p style="color: #e0f2fe; margin: 10px 0 0 0; font-size: 16px;">Update Status Pengajuan</p>
          </div>
          
          <div style="padding: 40px 20px; background: #f9fafb;">
            <h2 style="color: #1f2937; margin-top: 0;">Halo ${customerName},</h2>
            
            <div style="background: ${statusInfo.bgColor}; border: 2px solid ${statusInfo.color}; border-radius: 8px; padding: 20px; text-align: center; margin: 20px 0;">
              <h3 style="margin: 0; color: ${statusInfo.color}; font-size: 20px;">
                ${statusInfo.title}
              </h3>
              <p style="margin: 10px 0 0 0; color: #374151; font-size: 16px;">
                ID Pengajuan: ${applicationId}
              </p>
            </div>
            
            ${message ? `
              <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid ${statusInfo.color};">
                <p style="color: #4b5563; line-height: 1.6; margin: 0;">
                  ${message}
                </p>
              </div>
            ` : ''}
            
            <p style="color: #6b7280; line-height: 1.6; font-size: 14px;">
              Untuk informasi lebih lanjut, silakan hubungi customer service kami.
            </p>
          </div>
          
          <div style="background: #1f2937; padding: 20px; text-align: center; color: #9ca3af;">
            <p style="margin: 0; font-size: 14px;">
              © 2024 AGGRE CAPITAL. All rights reserved.<br>
              Email ini dikirim otomatis, mohon tidak membalas email ini.
            </p>
          </div>
        </div>
      `
    }
  }
}