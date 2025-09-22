import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email-service';

export async function POST(request: NextRequest) {
  try {
    const { to, subject, message } = await request.json();

    if (!to || !subject || !message) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: to, subject, message' },
        { status: 400 }
      );
    }

    console.log('Testing email service...');
    console.log('To:', to);
    console.log('Subject:', subject);
    console.log('Message:', message);

    // Test email sending
    const emailResult = await sendEmail({
      to: to,
      subject: subject,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">Test Email - Aggre Capital</h2>
          <p>This is a test email to verify email functionality.</p>
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>Test Details:</h3>
            <p><strong>To:</strong> ${to}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message:</strong> ${message}</p>
            <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
          </div>
          <p>If you receive this email, the email service is working correctly!</p>
          <hr style="margin: 20px 0; border: none; border-top: 1px solid #e5e7eb;">
          <p style="color: #6b7280; font-size: 12px;">
            This is an automated test email from Aggre Capital Landing Page.
          </p>
        </div>
      `,
    });

    console.log('Email result:', emailResult);

    return NextResponse.json({
      success: true,
      message: 'Test email sent successfully',
      data: {
        to: to,
        subject: subject,
        timestamp: new Date().toISOString(),
        result: emailResult
      }
    });

  } catch (error: any) {
    console.error('Test email error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error.message || 'Failed to send test email',
        details: error
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  return NextResponse.json({
    success: true,
    message: 'Email test endpoint is ready',
    usage: {
      method: 'POST',
      endpoint: '/api/test-email',
      body: {
        to: 'recipient@example.com',
        subject: 'Test Subject',
        message: 'Test message content'
      }
    }
  });
}
