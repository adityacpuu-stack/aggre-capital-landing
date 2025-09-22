import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/database';
import { authenticate } from '@/lib/auth-middleware';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Authenticate the request
    const authResult = await authenticate(request);
    if (!authResult.isAuthenticated) {
      return authResult.response || NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const { id } = await params;

    const result = await query(`
      SELECT 
        id, application_id, customer_name, email, phone, amount, purpose, status, created_at, updated_at,
        alamat, pekerjaan, tempat_kerja, alamat_kantor, nama_istri, 
        jenis_jaminan, alamat_jaminan,
        nomor_ktp, tempat_tanggal_lahir, nama_ibu, pendidikan_terakhir,
        aset_atas_nama, nomor_hp_pasangan
      FROM applications
      WHERE application_id = $1
    `, [id]);

    if (result.rows.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Application not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: result.rows[0]
    });

  } catch (error) {
    console.error('Application GET by ID error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch application' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Authenticate the request
    const authResult = await authenticate(request);
    if (!authResult.isAuthenticated) {
      return authResult.response || NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const { id } = await params;
    const body = await request.json();
    const { status } = body;

    // Validate status
    const validStatuses = ['pending', 'reviewing', 'approved', 'rejected', 'under_review'];
    if (status && !validStatuses.includes(status)) {
      return NextResponse.json(
        { success: false, error: 'Invalid status. Must be one of: pending, reviewing, approved, rejected, under_review' },
        { status: 400 }
      );
    }

    // Get current application status for workflow validation
    const currentApp = await query(`
      SELECT status FROM applications WHERE application_id = $1
    `, [id]);

    if (currentApp.rows.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Application not found' },
        { status: 404 }
      );
    }

    const currentStatus = currentApp.rows[0].status;

    // Define status workflow - what statuses can be changed to from current status
    const getAvailableStatuses = (currentStatus: string) => {
      switch (currentStatus) {
        case 'pending':
          return ['pending', 'reviewing', 'rejected'];
        case 'reviewing':
          return ['reviewing', 'approved', 'rejected'];
        case 'approved':
          return ['approved']; // Once approved, cannot change
        case 'rejected':
          return ['rejected']; // Once rejected, cannot change
        default:
          return ['pending', 'reviewing', 'approved', 'rejected'];
      }
    };

    // Validate status workflow
    if (status && !getAvailableStatuses(currentStatus).includes(status)) {
      return NextResponse.json(
        { 
          success: false, 
          error: `Cannot change status from ${currentStatus} to ${status}. Available statuses: ${getAvailableStatuses(currentStatus).join(', ')}` 
        },
        { status: 400 }
      );
    }

    // Update application
    const result = await query(`
      UPDATE applications SET
        status = COALESCE($1, status),
        updated_at = NOW()
      WHERE application_id = $2
      RETURNING id, application_id, status, updated_at
    `, [status, id]);

    if (result.rows.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Application not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: result.rows[0],
      message: 'Application updated successfully'
    });

  } catch (error) {
    console.error('Application PATCH error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update application' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Authenticate the request
    const authResult = await authenticate(request);
    if (!authResult.isAuthenticated) {
      return authResult.response || NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const { id } = await params;

    const result = await query('DELETE FROM applications WHERE application_id = $1 RETURNING id, application_id, customer_name', [id]);

    if (result.rows.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Application not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Application deleted successfully'
    });

  } catch (error) {
    console.error('Application DELETE error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete application' },
      { status: 500 }
    );
  }
}
