import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/database';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get('featured') === 'true';
    const limit = parseInt(searchParams.get('limit') || '3');

    let whereClause = 'WHERE status = $1';
    const params: any[] = ['active'];

    if (featured) {
      params.push(true);
      whereClause += ' AND featured = $2';
    }

    // Get testimonials
    const testimonialsResult = await query(`
      SELECT id, name, role, category, content, rating, avatar, amount,
             featured, status, sort_order, created_at, updated_at
      FROM testimonials
      ${whereClause}
      ORDER BY sort_order ASC, created_at DESC
      LIMIT $${params.length + 1}
    `, [...params, limit]);

    return NextResponse.json({
      success: true,
      data: testimonialsResult.rows
    });

  } catch (error) {
    console.error('Public testimonials GET error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch testimonials' },
      { status: 500 }
    );
  }
}


