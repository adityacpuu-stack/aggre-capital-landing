import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/database';
import { authenticate } from '@/lib/auth-middleware';

export async function GET(request: NextRequest) {
  try {
    // Public endpoint - no authentication required for viewing partners

    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const featured = searchParams.get('featured') === 'true';

    let whereClause = 'WHERE 1=1';
    const params: any[] = [];
    let paramCount = 0;

    if (type === 'strategic') {
      whereClause = 'WHERE partner_type = $1';
      params.push('strategic');
      paramCount = 1;
    } else if (type === 'ecosystem') {
      whereClause = 'WHERE partner_type = $1';
      params.push('ecosystem');
      paramCount = 1;
    }

    if (featured) {
      paramCount++;
      whereClause += ` AND featured = $${paramCount}`;
      params.push(true);
    }

    // Get strategic partners
    const strategicResult = await query(`
      SELECT id, name, subtitle, logo, established, location, description,
             services, achievements, contact, color, type, featured, sort_order, created_at, updated_at
      FROM strategic_partners
      WHERE status = 'active'
      ${featured ? 'AND featured = true' : ''}
      ORDER BY sort_order ASC, created_at DESC
    `);

    // Get ecosystem partners
    const ecosystemResult = await query(`
      SELECT id, name, subtitle, logo, category, sort_order, created_at, updated_at
      FROM ecosystem_partners
      ORDER BY sort_order ASC, created_at DESC
    `);

    return NextResponse.json({
      success: true,
      data: {
        strategic_partners: strategicResult.rows,
        ecosystem_partners: ecosystemResult.rows
      }
    });

  } catch (error) {
    console.error('Partners GET error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch partners' },
      { status: 500 }
    );
  }
}