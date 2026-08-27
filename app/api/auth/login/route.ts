import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { query } from '@/lib/database';

export async function POST(request: NextRequest) {
  try {
    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET environment variable is not set');
      return NextResponse.json(
        { success: false, error: 'Internal server error' },
        { status: 500 }
      );
    }
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Find user by email. Ikut ambil is_active bila kolomnya ada; sebagian DB
    // belum punya kolom itu, jadi fallback ke query tanpa is_active agar login
    // tidak error.
    let userResult;
    try {
      userResult = await query(
        'SELECT id, email, password_hash, full_name, role, is_active FROM users WHERE email = $1',
        [email]
      );
    } catch {
      userResult = await query(
        'SELECT id, email, password_hash, full_name, role FROM users WHERE email = $1',
        [email]
      );
    }

    const user = userResult.rows[0];

    // Timing-safe: selalu jalankan bcrypt.compare, walau user tidak ditemukan,
    // memakai hash dummy. Ini mencegah penyerang menebak email admin yang valid
    // dari selisih waktu respons (bcrypt hanya jalan bila email ada).
    const DUMMY_HASH = '$2a$10$CwTycUXWue0Thq9StjUM0uJ8f6.0YqZ8p8m5Zzz8pZzZzZzZzZzZu';
    const passwordMatches = await bcrypt.compare(
      password,
      user?.password_hash || DUMMY_HASH
    );

    if (!user || !passwordMatches) {
      return NextResponse.json(
        { success: false, error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Tolak akun yang dinonaktifkan.
    if (user.is_active === false) {
      return NextResponse.json(
        { success: false, error: 'Akun Anda tidak aktif. Hubungi administrator.' },
        { status: 403 }
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
      process.env.JWT_SECRET!,
      { expiresIn: '24h' }
    );

    // Generate session ID
    const sessionId = crypto.randomBytes(32).toString('hex');

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

    // Jangan kembalikan session id / token di body — cukup lewat cookie httpOnly.
    // Mengembalikannya di JSON berisiko bocor ke log proxy/APM.
    void token;
    const response = NextResponse.json({
      success: true,
      data: {
        user: {
          id: user.id,
          email: user.email,
          fullName: user.full_name,
          role: user.role,
        },
      },
    });

    // Jangan cache respons login (berisi konteks sesi).
    response.headers.set('Cache-Control', 'no-store');

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
