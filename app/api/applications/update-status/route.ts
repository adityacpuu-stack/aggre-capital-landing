import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/database';
import { authenticate } from '@/lib/auth-middleware';

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

    // Send email notification
    try {
      const emailResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/notifications/email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          applicationId: application.application_id,
          status: status,
          email: application.email,
          customerName: application.customer_name
        })
      });

      if (emailResponse.ok) {
        // Status update email notification sent successfully
      } else {
        // Failed to send status update email notification
      }
    } catch (emailError) {
      console.error('Status update email notification error:', emailError);
      // Don't fail the status update if email fails
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


