import { NextRequest, NextResponse } from 'next/server';
import { authenticate } from '@/lib/auth-middleware';
import { isValidEmail } from '@/lib/sanitize';
import { isAllowedStatus, sendStatusEmail } from '@/lib/status-email';

export async function POST(request: NextRequest) {
  try {
    // Wajib terautentikasi. Endpoint ini mengirim email dari SMTP resmi
    // perusahaan, jadi tidak boleh bisa dipanggil publik.
    const authResult = await authenticate(request);
    if (!authResult.isAuthenticated) {
      return authResult.response || NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { applicationId, status, email, customerName } = body;

    if (!applicationId || !status || !email) {
      return NextResponse.json(
        { success: false, error: 'Application ID, status, and email are required' },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { success: false, error: 'Format email tidak valid' },
        { status: 400 }
      );
    }

    if (!isAllowedStatus(status)) {
      return NextResponse.json(
        { success: false, error: 'Status tidak dikenal' },
        { status: 400 }
      );
    }

    const emailResult = await sendStatusEmail({
      applicationId: String(applicationId),
      status,
      email: String(email),
      customerName: customerName ? String(customerName) : undefined,
    });

    if (emailResult.success) {
      return NextResponse.json({
        success: true,
        message: 'Email notification sent successfully',
        messageId: emailResult.messageId,
      });
    }

    return NextResponse.json(
      { success: false, error: 'Failed to send email notification', details: emailResult.error },
      { status: 500 }
    );
  } catch (error) {
    console.error('Email notification error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to send email notification' },
      { status: 500 }
    );
  }
}
