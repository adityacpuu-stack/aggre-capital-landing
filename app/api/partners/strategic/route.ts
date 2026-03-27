import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/database';
import { authenticate } from '@/lib/auth-middleware';

export async function GET(request: NextRequest) {
  try {
    // Authenticate the request
    const authResult = await authenticate(request);
    if (!authResult.isAuthenticated) {
      return authResult.response || NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const featured = searchParams.get('featured') === 'true';

    let whereClause = '';
    const params: any[] = [];
    let paramCount = 0;

    if (featured) {
      whereClause = 'WHERE featured = $1';
      params.push(true);
      paramCount = 1;
    }

    const result = await query(`
      SELECT id, name, subtitle, description, logo, established, location,
             services, achievements, contact, color, type, status, featured, 
             sort_order, created_at, updated_at
      FROM strategic_partners 
      ${whereClause}
      ORDER BY sort_order ASC, created_at DESC
    `, params);

    return NextResponse.json({
      success: true,
      data: result.rows
    });

  } catch (error) {
    console.error('Strategic Partners GET error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch strategic partners' },
      { status: 500 }
    );
  }
}

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

    // Insert strategic partner
    const result = await query(`
      INSERT INTO strategic_partners (
        name, subtitle, description, logo, established, location,
        services, achievements, contact, color, type, status, featured, sort_order,
        created_at, updated_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, NOW(), NOW())
      RETURNING id, name, created_at
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
      sort_order || 0
    ]);

    return NextResponse.json({
      success: true,
      data: result.rows[0],
      message: 'Strategic partner created successfully'
    });

  } catch (error) {
    console.error('Strategic Partners POST error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create strategic partner' },
      { status: 500 }
    );
  }
}
