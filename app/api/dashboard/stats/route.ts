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

    // Get dashboard statistics
    const [
      applicationsResult,
      newsResult,
      testimonialsResult,
      partnersResult,
      ecosystemPartnersResult
    ] = await Promise.all([
      query('SELECT COUNT(*) as count FROM applications'),
      query('SELECT COUNT(*) as count FROM news'),
      query('SELECT COUNT(*) as count FROM testimonials'),
      query('SELECT COUNT(*) as count FROM strategic_partners'),
      query('SELECT COUNT(*) as count FROM ecosystem_partners')
    ]);

    // Get recent applications
    const recentApplicationsResult = await query(`
      SELECT id, customer_name, email, phone, status, created_at
      FROM applications
      ORDER BY created_at DESC
      LIMIT 5
    `);

    // Get recent news
    const recentNewsResult = await query(`
      SELECT id, title, status, created_at 
      FROM news 
      ORDER BY created_at DESC 
      LIMIT 5
    `);

    // Get pending testimonials
    const pendingTestimonialsResult = await query(`
      SELECT COUNT(*) as count 
      FROM testimonials 
      WHERE status = 'pending'
    `);

    // Get pending applications
    const pendingApplicationsResult = await query(`
      SELECT COUNT(*) as count 
      FROM applications 
      WHERE status = 'pending'
    `);

    const stats = {
      totalApplications: parseInt(applicationsResult.rows[0]?.count || '0'),
      totalNews: parseInt(newsResult.rows[0]?.count || '0'),
      totalTestimonials: parseInt(testimonialsResult.rows[0]?.count || '0'),
      totalStrategicPartners: parseInt(partnersResult.rows[0]?.count || '0'),
      totalEcosystemPartners: parseInt(ecosystemPartnersResult.rows[0]?.count || '0'),
      pendingApplications: parseInt(pendingApplicationsResult.rows[0]?.count || '0'),
      pendingTestimonials: parseInt(pendingTestimonialsResult.rows[0]?.count || '0'),
      recentApplications: recentApplicationsResult.rows,
      recentNews: recentNewsResult.rows
    };

    return NextResponse.json({
      success: true,
      data: stats
    });

  } catch (error) {
    console.error('Dashboard stats error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch dashboard statistics' },
      { status: 500 }
    );
  }
}
