import { query } from './database'
import crypto from 'crypto'

export interface SessionData {
  id: number
  sessionId: string
  userId: number
  userEmail: string
  userAgent?: string
  ipAddress?: string
  createdAt: Date
  lastAccessed: Date
  expiresAt: Date
  isActive: boolean
  loginMethod: string
  deviceInfo?: any
}

export interface CreateSessionOptions {
  userId: number
  userEmail: string
  userAgent?: string
  ipAddress?: string
  deviceInfo?: any
  expiresInHours?: number
}

// Generate cryptographically secure session ID
export function generateSessionId(): string {
  return crypto.randomBytes(64).toString('hex')
}

// Create a new session in the database
export async function createSession(options: CreateSessionOptions): Promise<string> {
  const sessionId = generateSessionId()
  const expiresAt = new Date()
  expiresAt.setHours(expiresAt.getHours() + (options.expiresInHours || 24)) // Default 24 hours

  await query(`
    INSERT INTO user_sessions (
      session_id, user_id, user_email, user_agent, ip_address, 
      expires_at, device_info, login_method
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
  `, [
    sessionId,
    options.userId,
    options.userEmail,
    options.userAgent || null,
    options.ipAddress || null,
    expiresAt,
    options.deviceInfo ? JSON.stringify(options.deviceInfo) : null,
    'password'
  ])

  return sessionId
}

// Validate and get session data
export async function validateSession(sessionId: string): Promise<SessionData | null> {
  if (!sessionId) return null

  const result = await query(`
    SELECT * FROM user_sessions 
    WHERE session_id = $1 
    AND expires_at > NOW() 
    AND is_active = TRUE
  `, [sessionId])

  if (result.rows.length === 0) {
    return null
  }

  const session = result.rows[0]

  // Update last accessed time
  await query(`
    UPDATE user_sessions 
    SET last_accessed = NOW() 
    WHERE session_id = $1
  `, [sessionId])

  return {
    id: session.id,
    sessionId: session.session_id,
    userId: session.user_id,
    userEmail: session.user_email,
    userAgent: session.user_agent,
    ipAddress: session.ip_address,
    createdAt: session.created_at,
    lastAccessed: session.last_accessed,
    expiresAt: session.expires_at,
    isActive: session.is_active,
    loginMethod: session.login_method,
    deviceInfo: session.device_info
  }
}

// Invalidate a specific session
export async function invalidateSession(sessionId: string): Promise<void> {
  await query(`
    UPDATE user_sessions 
    SET is_active = FALSE 
    WHERE session_id = $1
  `, [sessionId])
}

// Invalidate all sessions for a user (useful for "logout all devices")
export async function invalidateAllUserSessions(userId: number): Promise<void> {
  await query(`
    UPDATE user_sessions 
    SET is_active = FALSE 
    WHERE user_id = $1
  `, [userId])
}

// Clean up expired sessions (should be run periodically)
export async function cleanupExpiredSessions(): Promise<number> {
  const result = await query(`
    DELETE FROM user_sessions 
    WHERE expires_at < NOW() OR is_active = FALSE
    RETURNING id
  `)

  return result.rows.length
}

// Get active sessions for a user
export async function getUserActiveSessions(userId: number): Promise<SessionData[]> {
  const result = await query(`
    SELECT * FROM user_sessions 
    WHERE user_id = $1 
    AND expires_at > NOW() 
    AND is_active = TRUE
    ORDER BY last_accessed DESC
  `, [userId])

  return result.rows.map(session => ({
    id: session.id,
    sessionId: session.session_id,
    userId: session.user_id,
    userEmail: session.user_email,
    userAgent: session.user_agent,
    ipAddress: session.ip_address,
    createdAt: session.created_at,
    lastAccessed: session.last_accessed,
    expiresAt: session.expires_at,
    isActive: session.is_active,
    loginMethod: session.login_method,
    deviceInfo: session.device_info
  }))
}

// Extend session expiration
export async function extendSession(sessionId: string, hours: number = 24): Promise<boolean> {
  const newExpiresAt = new Date()
  newExpiresAt.setHours(newExpiresAt.getHours() + hours)

  const result = await query(`
    UPDATE user_sessions 
    SET expires_at = $1, last_accessed = NOW()
    WHERE session_id = $2 AND is_active = TRUE
    RETURNING id
  `, [newExpiresAt, sessionId])

  return result.rows.length > 0
}