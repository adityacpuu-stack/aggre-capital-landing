import { NextResponse } from 'next/server';
import { query } from '@/lib/database';

export async function GET() {
  try {
    // Test basic database connection
    const result = await query('SELECT NOW() as current_time');
    
    // Test if users table exists
    const tableCheck = await query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name IN ('users', 'user_sessions', 'audit_logs')
    `);
    
    // Test environment variables
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
      stack: error instanceof Error ? error.stack : undefined,
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}
