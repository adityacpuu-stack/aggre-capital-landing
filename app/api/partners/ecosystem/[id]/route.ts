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
      SELECT id, name, subtitle, logo, category, status, sort_order, 
             created_at, updated_at
      FROM ecosystem_partners 
      WHERE id = $1
    `, [id]);

    if (result.rows.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Ecosystem partner not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: result.rows[0]
    });

  } catch (error) {
    console.error('Ecosystem Partner GET by ID error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch ecosystem partner' },
      { status: 500 }
    );
  }
}

export async function PUT(
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
    const {
      name,
      subtitle,
      logo,
      category,
      sort_order
    } = body;

    // Validate required fields
    if (!name) {
      return NextResponse.json(
        { success: false, error: 'Name is required' },
        { status: 400 }
      );
    }

    // Update ecosystem partner
    const result = await query(`
      UPDATE ecosystem_partners SET
        name = $1,
        subtitle = $2,
        logo = $3,
        category = $4,
        sort_order = $5,
        updated_at = NOW()
      WHERE id = $6
      RETURNING id, name, updated_at
    `, [
      name,
      subtitle || '',
      logo || '',
      category || 'Other',
      sort_order || 0,
      id
    ]);

    if (result.rows.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Ecosystem partner not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: result.rows[0],
      message: 'Ecosystem partner updated successfully'
    });

  } catch (error) {
    console.error('Ecosystem Partner PUT error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update ecosystem partner' },
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

    const result = await query('DELETE FROM ecosystem_partners WHERE id = $1 RETURNING id, name', [id]);

    if (result.rows.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Ecosystem partner not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Ecosystem partner deleted successfully'
    });

  } catch (error) {
    console.error('Ecosystem Partner DELETE error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete ecosystem partner' },
      { status: 500 }
    );
  }
}
