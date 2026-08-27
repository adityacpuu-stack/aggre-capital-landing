import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/database';
import { authenticate } from '@/lib/auth-middleware';
import { isAllowedStatus, sendStatusEmail } from '@/lib/status-email';

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const authResult = await authenticate(request);
    if (!authResult.isAuthenticated) {
      return authResult.response || NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { applicationId, status, adminNotes } = body;

    if (!applicationId || !status) {
      return NextResponse.json(
        { success: false, error: 'Application ID and status are required' },
        { status: 400 }
      );
    }

    // Update application status
    const updateResult = await query(`
      UPDATE applications 
      SET status = $1, admin_notes = $2, updated_at = NOW()
      WHERE application_id = $3
      RETURNING id, application_id, customer_name, email, status, created_at, updated_at
    `, [status, adminNotes || null, applicationId]);

    if (updateResult.rows.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Application not found' },
        { status: 404 }
      );
    }

    const application = updateResult.rows[0];

    // Kirim notifikasi email langsung (tanpa HTTP internal) supaya tidak
    // bergantung pada NEXT_PUBLIC_BASE_URL dan tetap jalan setelah endpoint
    // notifikasi diproteksi auth.
    if (application.email && isAllowedStatus(status)) {
      try {
        await sendStatusEmail({
          applicationId: application.application_id,
          status,
          email: application.email,
          customerName: application.customer_name,
        });
      } catch (emailError) {
        console.error('Status update email notification error:', emailError);
        // Jangan gagalkan update status jika email gagal.
      }
    }

    return NextResponse.json({
      success: true,
      data: application,
      message: 'Application status updated successfully'
    });

  } catch (error) {
    console.error('Update application status error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update application status' },
      { status: 500 }
    );
  }
}


