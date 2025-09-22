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

    // Validate id parameter
    if (!id || id === 'undefined') {
      return NextResponse.json(
        { success: false, error: 'Invalid news ID provided' },
        { status: 400 }
      );
    }

    // Convert id to integer for database query
    const newsId = parseInt(id);
    if (isNaN(newsId)) {
      return NextResponse.json(
        { success: false, error: 'News ID must be a valid number' },
        { status: 400 }
      );
    }

    const result = await query(`
      SELECT id, title, slug, content, excerpt, featured_image, author, 
             status, category, tags, meta_description, read_time, featured,
             created_at, updated_at, published_at
      FROM news 
      WHERE id = $1
    `, [newsId]);

    if (result.rows.length === 0) {
      return NextResponse.json(
        { success: false, error: 'News article not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: result.rows[0]
    });

  } catch (error) {
    console.error('News GET by ID error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch news article' },
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

    // Validate id parameter
    if (!id || id === 'undefined') {
      return NextResponse.json(
        { success: false, error: 'Invalid news ID provided' },
        { status: 400 }
      );
    }

    // Convert id to integer for database query
    const newsId = parseInt(id);
    if (isNaN(newsId)) {
      return NextResponse.json(
        { success: false, error: 'News ID must be a valid number' },
        { status: 400 }
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

    // Check if slug already exists (excluding current article)
    const existingResult = await query(
      'SELECT id FROM news WHERE slug = $1 AND id != $2', 
      [slug, newsId]
    );
    let finalSlug = slug;
    if (existingResult.rows.length > 0) {
      finalSlug = `${slug}-${Date.now()}`;
    }

    // Update news article
    const result = await query(`
      UPDATE news SET
        title = $1,
        slug = $2,
        content = $3,
        excerpt = $4,
        featured_image = $5,
        author = $6,
        status = $7,
        category = $8,
        tags = $9,
        meta_description = $10,
        read_time = $11,
        featured = $12,
        updated_at = NOW()
      WHERE id = $13
      RETURNING id, title, slug, updated_at
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
      featured || false,
      newsId
    ]);

    if (result.rows.length === 0) {
      return NextResponse.json(
        { success: false, error: 'News article not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: result.rows[0],
      message: 'News article updated successfully'
    });

  } catch (error) {
    console.error('News PUT error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update news article' },
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

    // Validate id parameter
    if (!id || id === 'undefined') {
      return NextResponse.json(
        { success: false, error: 'Invalid news ID provided' },
        { status: 400 }
      );
    }

    // Convert id to integer for database query
    const newsId = parseInt(id);
    if (isNaN(newsId)) {
      return NextResponse.json(
        { success: false, error: 'News ID must be a valid number' },
        { status: 400 }
      );
    }

    const result = await query('DELETE FROM news WHERE id = $1 RETURNING id, title', [newsId]);

    if (result.rows.length === 0) {
      return NextResponse.json(
        { success: false, error: 'News article not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'News article deleted successfully'
    });

  } catch (error) {
    console.error('News DELETE error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete news article' },
      { status: 500 }
    );
  }
}
