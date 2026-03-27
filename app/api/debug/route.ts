import { NextResponse } from 'next/server';
import { query } from '@/lib/database';

export async function GET() {
  // Only allow in development
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  try {
    const result = await query('SELECT NOW() as current_time');

    const tableCheck = await query(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
      AND table_name IN ('users', 'user_sessions', 'audit_logs')
    `);

    const envCheck = {
      DATABASE_URL: process.env.DATABASE_URL ? 'Set' : 'Not set',
      JWT_SECRET: process.env.JWT_SECRET ? 'Set' : 'Not set',
      NODE_ENV: process.env.NODE_ENV || 'Not set'
    };

    return NextResponse.json({
      success: true,
      data: {
        database: {
          connected: true,
          currentTime: result.rows[0]?.current_time,
          tables: tableCheck.rows.map(row => row.table_name)
        },
        environment: envCheck,
        timestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Debug error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}
