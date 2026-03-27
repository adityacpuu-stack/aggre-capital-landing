import { NextRequest, NextResponse } from 'next/server';
import { authenticate } from '@/lib/auth-middleware';
import nodemailer from 'nodemailer';

// POST test SMTP connection
export async function POST(request: NextRequest) {
  try {
    // Authenticate the request
    const authResult = await authenticate(request);
    if (!authResult.isAuthenticated) {
      return authResult.response || NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const {
      smtp_host,
      smtp_port,
      smtp_secure,
      smtp_username,
      smtp_password,
      from_email,
      from_name
    } = body;

    // Validate required fields
    if (!smtp_host || !smtp_username || !from_email) {
      return NextResponse.json(
        { success: false, error: 'SMTP host, username, and from email are required' },
        { status: 400 }
      );
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: smtp_host,
      port: smtp_port || 587,
      secure: smtp_secure || false,
      auth: {
        user: smtp_username,
        pass: smtp_password || process.env.EMAIL_PASSWORD || '',
      },
      tls: {
        rejectUnauthorized: false
      },
      connectionTimeout: 15000,
      greetingTimeout: 10000,
      socketTimeout: 15000
    });

    // Test connection
    await transporter.verify();

    // Send test email
    const testEmailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #0f766e 0%, #14b8a6 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="margin: 0; font-size: 24px;">🏦 AGGRE CAPITAL</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">Test Email Configuration</p>
        </div>
        
        <div style="background: white; padding: 30px; border: 1px solid #e5e7eb; border-radius: 0 0 10px 10px;">
          <h2 style="color: #1f2937; margin-bottom: 20px;">✅ SMTP Test Successful</h2>
          
          <p style="color: #374151; line-height: 1.6; margin-bottom: 20px;">
            Congratulations! Your SMTP configuration is working correctly.
          </p>
          
          <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: #1f2937; margin-bottom: 15px;">📧 Configuration Details</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #374151;">SMTP Host:</td>
                <td style="padding: 8px 0; color: #1f2937; font-family: monospace;">${smtp_host}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #374151;">Port:</td>
                <td style="padding: 8px 0; color: #1f2937;">${smtp_port || 587}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #374151;">Security:</td>
                <td style="padding: 8px 0; color: #1f2937;">${smtp_secure ? 'SSL/TLS' : 'STARTTLS'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #374151;">From Email:</td>
                <td style="padding: 8px 0; color: #1f2937;">${from_email}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #374151;">Test Time:</td>
                <td style="padding: 8px 0; color: #1f2937;">${new Date().toLocaleString('id-ID')}</td>
              </tr>
            </table>
          </div>

          <div style="background: #ecfdf5; border: 1px solid #a7f3d0; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: #065f46; margin: 0 0 10px 0;">🎉 Ready to Send Emails</h3>
            <p style="color: #065f46; margin: 0; line-height: 1.6;">
              Your SMTP configuration is now ready. Email notifications will be sent automatically when applications are submitted.
            </p>
          </div>
        </div>
        
        <div style="text-align: center; margin-top: 20px; color: #6b7280; font-size: 12px;">
          <p>This is a test email from AGGRE CAPITAL system</p>
          <p>© 2024 AGGRE CAPITAL. All rights reserved.</p>
        </div>
      </div>
    `;

    const info = await transporter.sendMail({
      from: `"${from_name || 'AGGRE CAPITAL'}" <${from_email}>`,
      to: smtp_username, // Send test email to the SMTP username
      subject: '✅ SMTP Test Email - AGGRE CAPITAL',
      html: testEmailContent
    });

    return NextResponse.json({
      success: true,
      message: 'SMTP test email sent successfully',
      messageId: info.messageId,
      details: {
        host: smtp_host,
        port: smtp_port || 587,
        secure: smtp_secure || false,
        from: from_email
      }
    });

  } catch (error) {
    console.error('SMTP Test error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to test SMTP connection',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}