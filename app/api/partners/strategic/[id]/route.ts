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
      SELECT id, name, subtitle, description, logo, established, location,
             services, achievements, contact, color, type, status, featured, 
             sort_order, created_at, updated_at
      FROM strategic_partners 
      WHERE id = $1
    `, [id]);

    if (result.rows.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Strategic partner not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: result.rows[0]
    });

  } catch (error) {
    console.error('Strategic Partner GET by ID error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch strategic partner' },
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
      description,
      logo,
      established,
      location,
      services,
      achievements,
      contact,
      color,
      type,
      status,
      featured,
      sort_order
    } = body;

    // Validate required fields
    if (!name) {
      return NextResponse.json(
        { success: false, error: 'Name is required' },
        { status: 400 }
      );
    }

    // Update strategic partner
    const result = await query(`
      UPDATE strategic_partners SET
        name = $1,
        subtitle = $2,
        description = $3,
        logo = $4,
        established = $5,
        location = $6,
        services = $7,
        achievements = $8,
        contact = $9,
        color = $10,
        type = $11,
        status = $12,
        featured = $13,
        sort_order = $14,
        updated_at = NOW()
      WHERE id = $15
      RETURNING id, name, updated_at
    `, [
      name,
      subtitle || '',
      description || '',
      logo || '',
      established || '',
      location || '',
      JSON.stringify(services || []),
      JSON.stringify(achievements || []),
      JSON.stringify(contact || {}),
      color || 'from-teal-500 to-teal-600',
      type || 'BPR',
      status || 'active',
      featured || false,
      sort_order || 0,
      id
    ]);

    if (result.rows.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Strategic partner not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: result.rows[0],
      message: 'Strategic partner updated successfully'
    });

  } catch (error) {
    console.error('Strategic Partner PUT error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update strategic partner' },
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

    const result = await query('DELETE FROM strategic_partners WHERE id = $1 RETURNING id, name', [id]);

    if (result.rows.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Strategic partner not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Strategic partner deleted successfully'
    });

  } catch (error) {
    console.error('Strategic Partner DELETE error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete strategic partner' },
      { status: 500 }
    );
  }
}
