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
    const category = searchParams.get('category');

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

    if (category) {
      paramCount++;
      whereClause += ` AND category = $${paramCount}`;
      params.push(category);
    }

    // Get total count
    const countResult = await query(`SELECT COUNT(*) as count FROM news ${whereClause}`, params);
    const total = parseInt(countResult.rows[0]?.count || '0');

    // Get news with pagination
    const offset = (page - 1) * limit;
    paramCount++;
    const newsResult = await query(`
      SELECT id, title, slug, excerpt, content, author, status, category, tags, 
             meta_description, read_time, featured, featured_image, 
             created_at, updated_at, published_at
      FROM news 
      ${whereClause}
      ORDER BY created_at DESC 
      LIMIT $${paramCount} OFFSET $${paramCount + 1}
    `, [...params, limit, offset]);

    return NextResponse.json({
      success: true,
      data: newsResult.rows,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('News GET error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch news' },
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
      title,
      content,
      excerpt,
      featured_image,
      author,
      status,
      category,
      tags,
      meta_description,
      read_time,
      featured
    } = body;

    // Validate required fields
    if (!title || !content) {
      return NextResponse.json(
        { success: false, error: 'Title and content are required' },
        { status: 400 }
      );
    }

    // Generate slug from title
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();

    // Check if slug already exists
    const existingResult = await query('SELECT id FROM news WHERE slug = $1', [slug]);
    let finalSlug = slug;
    if (existingResult.rows.length > 0) {
      finalSlug = `${slug}-${Date.now()}`;
    }

    // Insert news article
    const result = await query(`
      INSERT INTO news (
        title, slug, content, excerpt, featured_image, author, status, 
        category, tags, meta_description, read_time, featured, created_at, updated_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, NOW(), NOW())
      RETURNING id, title, slug, created_at
    `, [
      title,
      finalSlug,
      content,
      excerpt || '',
      featured_image || '',
      author || 'AGGRE CAPITAL',
      status || 'draft',
      category || 'News',
      tags || '',
      meta_description || '',
      read_time || 5,
      featured || false
    ]);

    return NextResponse.json({
      success: true,
      data: result.rows[0],
      message: 'News article created successfully'
    });

  } catch (error) {
    console.error('News POST error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create news article' },
      { status: 500 }
    );
  }
}