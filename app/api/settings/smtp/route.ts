import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/database';
import { authenticate } from '@/lib/auth-middleware';

// GET SMTP settings
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

    const result = await query(`
      SELECT smtp_host, smtp_port, smtp_secure, smtp_username, smtp_password, 
             from_name, from_email, reply_to, enabled
      FROM smtp_settings 
      WHERE id = 1
    `);

    if (result.rows.length === 0) {
      return NextResponse.json(
        { success: false, error: 'SMTP settings not found' },
        { status: 404 }
      );
    }

    const smtpSettings = result.rows[0];
    
    // Don't return password in response
    const { smtp_password, ...safeSettings } = smtpSettings;

    return NextResponse.json({
      success: true,
      data: {
        ...safeSettings,
        smtp_password: '' // Return empty password for security
      }
    });

  } catch (error) {
    console.error('SMTP Settings GET error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch SMTP settings' },
      { status: 500 }
    );
  }
}

// POST/UPDATE SMTP settings
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
      smtp_host,
      smtp_port,
      smtp_secure,
      smtp_username,
      smtp_password,
      from_name,
      from_email,
      reply_to,
      enabled
    } = body;

    // Validate required fields
    if (!smtp_host || !smtp_username || !from_email) {
      return NextResponse.json(
        { success: false, error: 'SMTP host, username, and from email are required' },
        { status: 400 }
      );
    }

    // Check if SMTP settings exist
    const existingResult = await query('SELECT id FROM smtp_settings WHERE id = 1');
    
    if (existingResult.rows.length > 0) {
      // Update existing settings
      await query(`
        UPDATE smtp_settings SET 
          smtp_host = $1,
          smtp_port = $2,
          smtp_secure = $3,
          smtp_username = $4,
          smtp_password = COALESCE($5, smtp_password),
          from_name = $6,
          from_email = $7,
          reply_to = $8,
          enabled = $9,
          updated_at = NOW()
        WHERE id = 1
      `, [
        smtp_host,
        smtp_port || 587,
        smtp_secure || false,
        smtp_username,
        smtp_password || null, // Only update password if provided
        from_name || 'AGGRE CAPITAL',
        from_email,
        reply_to || from_email,
        enabled || false
      ]);
    } else {
      // Insert new settings
      await query(`
        INSERT INTO smtp_settings (
          smtp_host, smtp_port, smtp_secure, smtp_username, smtp_password,
          from_name, from_email, reply_to, enabled, created_at, updated_at
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW(), NOW())
      `, [
        smtp_host,
        smtp_port || 587,
        smtp_secure || false,
        smtp_username,
        smtp_password || '',
        from_name || 'AGGRE CAPITAL',
        from_email,
        reply_to || from_email,
        enabled || false
      ]);
    }

    return NextResponse.json({
      success: true,
      message: 'SMTP settings saved successfully'
    });

  } catch (error) {
    console.error('SMTP Settings POST error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to save SMTP settings' },
      { status: 500 }
    );
  }
}