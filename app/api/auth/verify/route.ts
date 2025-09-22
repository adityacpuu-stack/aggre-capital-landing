import { NextRequest, NextResponse } from 'next/server';
import { validateSession } from '@/lib/session';

export async function GET(request: NextRequest) {
  try {
    // Get session ID from cookie
    const sessionId = request.cookies.get('session_id')?.value;
    
    if (!sessionId) {
      return NextResponse.json(
        { success: false, error: 'No session found' },
        { status: 401 }
      );
    }
    
    // Validate session
    const session = await validateSession(sessionId);
    
    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Invalid or expired session' },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        user: {
          id: session.userId,
          email: session.userEmail,
          role: 'admin' // You can extend this with actual role from user table
        },
        session: {
          id: session.sessionId,
          expiresAt: session.expiresAt,
          lastAccessed: session.lastAccessed
        }
      }
    });

  } catch (error) {
    console.error('Session verification error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
