import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { query } from '@/lib/database';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Find user by email
    const userResult = await query(
      'SELECT id, email, password_hash, full_name, role FROM users WHERE email = $1',
      [email]
    );

    if (userResult.rows.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const user = userResult.rows[0];

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password_hash);
    if (!isValidPassword) {
      return NextResponse.json(
        { success: false, error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        fullName: user.full_name,
        role: user.role,
      },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    // Generate session ID
    const sessionId = require('crypto').randomBytes(32).toString('hex');

    // Store session in database
    await query(
      `INSERT INTO user_sessions (session_id, user_id, user_email, user_agent, ip_address, expires_at, device_info, login_method, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW())
       RETURNING id, session_id`,
      [
        sessionId,
        user.id,
        user.email,
        request.headers.get('user-agent') || '',
        request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || '127.0.0.1',
        new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
        JSON.stringify({ browser: 'unknown', os: 'unknown' }),
        'password'
      ]
    );

    // Log login activity
    await query(
      'INSERT INTO audit_logs (user_id, action, details, ip_address) VALUES ($1, $2, $3, $4)',
      [
        user.id,
        'login',
        JSON.stringify({ email: user.email, timestamp: new Date().toISOString() }),
        request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || '127.0.0.1'
      ]
    );

    // Create response with session cookie
    const response = NextResponse.json({
      success: true,
      data: {
        token,
        sessionId,
        user: {
          id: user.id,
          email: user.email,
          fullName: user.full_name,
          role: user.role,
        },
      },
    });

    // Set session cookie
    response.cookies.set('session_id', sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60, // 24 hours
      path: '/'
    });

    // Login successful, session cookie set
    return response;

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
