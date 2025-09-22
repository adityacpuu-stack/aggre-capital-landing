import { NextRequest, NextResponse } from 'next/server'
import { validateSession, SessionData } from './session'

export interface AuthenticatedRequest extends NextRequest {
  session?: SessionData
  user?: {
    id: number
    email: string
    fullName?: string
    role?: string
  }
}

// Extract session ID from request (cookies or Authorization header)
function extractSessionId(request: NextRequest): string | null {
  // Try to get from cookie first (more secure for web apps)
  const sessionCookie = request.cookies.get('session_id')
  if (sessionCookie) {
    return sessionCookie.value
  }

  // Fallback to Authorization header for API requests
  const authHeader = request.headers.get('Authorization')
  if (authHeader && authHeader.startsWith('Session ')) {
    return authHeader.substring(8) // Remove 'Session ' prefix
  }

  // Legacy JWT support (we'll keep this for backward compatibility)
  if (authHeader && authHeader.startsWith('Bearer ')) {
    // For now, return null to force session-based auth
    // In production, you might want to validate JWT and create session
    return null
  }

  return null
}

// Get client IP address
function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for')
  const realIP = request.headers.get('x-real-ip')
  
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }
  if (realIP) {
    return realIP
  }
  
  return 'unknown'
}

// Main authentication middleware
export async function authenticate(request: NextRequest): Promise<{
  isAuthenticated: boolean
  session?: SessionData
  user?: any
  response?: NextResponse
}> {
  try {
    const sessionId = extractSessionId(request)
    
    if (!sessionId) {
      return {
        isAuthenticated: false,
        response: NextResponse.json(
          { error: 'No session provided' },
          { status: 401 }
        )
      }
    }

    const session = await validateSession(sessionId)
    
    if (!session) {
      return {
        isAuthenticated: false,
        response: NextResponse.json(
          { error: 'Invalid or expired session' },
          { status: 401 }
        )
      }
    }

    // Optional: Verify IP address hasn't changed (for extra security)
    const currentIP = getClientIP(request)
    if (session.ipAddress && session.ipAddress !== currentIP) {
      // Log suspicious activity but don't block (IPs can change legitimately)
      console.warn(`IP changed for session ${sessionId}: ${session.ipAddress} -> ${currentIP}`)
    }

    return {
      isAuthenticated: true,
      session,
      user: {
        id: session.userId,
        email: session.userEmail,
        role: 'admin' // You can extend this with actual role from user table
      }
    }

  } catch (error) {
    console.error('Authentication error:', error)
    return {
      isAuthenticated: false,
      response: NextResponse.json(
        { error: 'Authentication failed' },
        { status: 500 }
      )
    }
  }
}

// Wrapper for API routes that require authentication
export function withAuth(handler: (request: NextRequest, context: any, session: SessionData) => Promise<NextResponse>) {
  return async (request: NextRequest, context: any) => {
    const authResult = await authenticate(request)
    
    if (!authResult.isAuthenticated || !authResult.session) {
      return authResult.response || NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    return handler(request, context, authResult.session)
  }
}