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
    const status = searchParams.get('status');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const featured = searchParams.get('featured') === 'true';

    let whereClause = 'WHERE 1=1';
    const params: any[] = [];
    let paramCount = 0;

    if (status && status !== 'all') {
      paramCount++;
      whereClause += ` AND status = $${paramCount}`;
      params.push(status);
    }

    if (featured) {
      paramCount++;
      whereClause += ` AND featured = $${paramCount}`;
      params.push(true);
    }

    // Get total count
    const countResult = await query(`SELECT COUNT(*) as count FROM testimonials ${whereClause}`, params);
    const total = parseInt(countResult.rows[0]?.count || '0');

    // Get testimonials with pagination
    const offset = (page - 1) * limit;
    paramCount++;
    const testimonialsResult = await query(`
      SELECT id, name, role, category, content, rating, avatar, amount,
             featured, status, sort_order, created_at, updated_at
      FROM testimonials
      ${whereClause}
      ORDER BY sort_order ASC, created_at DESC
      LIMIT $${paramCount} OFFSET $${paramCount + 1}
    `, [...params, limit, offset]);

    return NextResponse.json({
      success: true,
      data: testimonialsResult.rows,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('Testimonials GET error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch testimonials' },
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
      role,
      category,
      content,
      rating,
      avatar,
      amount,
      featured,
      status
    } = body;

    // Validate required fields
    if (!name || !content) {
      return NextResponse.json(
        { success: false, error: 'Name and content are required' },
        { status: 400 }
      );
    }

    // Insert testimonial
    const result = await query(`
      INSERT INTO testimonials (
        name, role, category, content, rating, avatar, amount, featured, status, created_at, updated_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW(), NOW())
      RETURNING id, name, created_at
    `, [
      name,
      role || '',
      category || '',
      content,
      rating || 5,
      avatar || '',
      amount || '',
      featured || false,
      status || 'active'
    ]);

    return NextResponse.json({
      success: true,
      data: result.rows[0],
      message: 'Testimonial created successfully'
    });

  } catch (error) {
    console.error('Testimonials POST error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create testimonial' },
      { status: 500 }
    );
  }
}