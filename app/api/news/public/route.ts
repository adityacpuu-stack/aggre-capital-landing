import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/database';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const featured = searchParams.get('featured') === 'true';
    const category = searchParams.get('category');
    const search = searchParams.get('search');

    let whereClause = 'WHERE status = $1';
    const params: any[] = ['published'];
    let paramCount = 1;

    if (featured) {
      paramCount++;
      whereClause += ` AND featured = $${paramCount}`;
      params.push(true);
    }

    if (category && category !== 'all') {
      paramCount++;
      whereClause += ` AND category = $${paramCount}`;
      params.push(category);
    }

    if (search) {
      paramCount++;
      whereClause += ` AND (title ILIKE $${paramCount} OR content ILIKE $${paramCount} OR excerpt ILIKE $${paramCount})`;
      params.push(`%${search}%`);
    }

    // Get total count
    const countResult = await query(`SELECT COUNT(*) as count FROM news ${whereClause}`, params);
    const total = parseInt(countResult.rows[0]?.count || '0');

    // Get news with pagination
    const offset = (page - 1) * limit;
    paramCount++;
    const newsResult = await query(`
      SELECT id, title, slug, excerpt, content, author, category, tags, 
             meta_description, read_time, featured, featured_image, 
             created_at, updated_at, published_at,
             EXTRACT(EPOCH FROM (NOW() - created_at)) as time_ago
      FROM news 
      ${whereClause}
      ORDER BY created_at DESC 
      LIMIT $${paramCount} OFFSET $${paramCount + 1}
    `, [...params, limit, offset]);

    // Format the data for frontend
    const formattedData = newsResult.rows.map(article => ({
      id: article.id,
      title: article.title,
      slug: article.slug,
      excerpt: article.excerpt,
      content: article.content,
      author: article.author,
      category: article.category,
      tags: article.tags,
      meta_description: article.meta_description,
      read_time: article.read_time,
      featured: article.featured,
      featured_image: article.featured_image,
      image: article.featured_image, // For backward compatibility
      date: new Date(article.published_at || article.created_at).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      }),
      created_at: article.created_at,
      updated_at: article.updated_at,
      published_at: article.published_at,
      views: Math.floor(Math.random() * 2000) + 100 // Random views for demo
    }));

    return NextResponse.json({
      success: true,
      data: formattedData,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('News public GET error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch news' },
      { status: 500 }
    );
  }
}