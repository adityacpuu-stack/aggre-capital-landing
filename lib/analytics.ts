interface DeviceInfo {
  deviceType: 'mobile' | 'tablet' | 'desktop'
  browser: string
  browserVersion: string
  os: string
  osVersion: string
  isBot: boolean
}

interface LocationInfo {
  country?: string
  city?: string
}

export function parseUserAgent(userAgent: string): DeviceInfo {
  const ua = userAgent.toLowerCase()
  
  // Detect bots
  const botPatterns = [
    'googlebot', 'bingbot', 'slurp', 'duckduckbot', 'baiduspider', 
    'yandexbot', 'facebookexternalhit', 'twitterbot', 'linkedinbot',
    'whatsapp', 'telegrambot', 'crawler', 'spider'
  ]
  const isBot = botPatterns.some(pattern => ua.includes(pattern))
  
  // Detect device type
  let deviceType: 'mobile' | 'tablet' | 'desktop' = 'desktop'
  if (ua.includes('mobile') && !ua.includes('tablet')) {
    deviceType = 'mobile'
  } else if (ua.includes('tablet') || ua.includes('ipad')) {
    deviceType = 'tablet'
  }
  
  // Detect browser
  let browser = 'Unknown'
  let browserVersion = ''
  
  if (ua.includes('firefox')) {
    browser = 'Firefox'
    const match = ua.match(/firefox\/(\d+\.?\d*)/)
    browserVersion = match ? match[1] : ''
  } else if (ua.includes('chrome') && !ua.includes('edge')) {
    browser = 'Chrome'
    const match = ua.match(/chrome\/(\d+\.?\d*)/)
    browserVersion = match ? match[1] : ''
  } else if (ua.includes('safari') && !ua.includes('chrome')) {
    browser = 'Safari'
    const match = ua.match(/version\/(\d+\.?\d*)/)
    browserVersion = match ? match[1] : ''
  } else if (ua.includes('edge')) {
    browser = 'Edge'
    const match = ua.match(/edge\/(\d+\.?\d*)/)
    browserVersion = match ? match[1] : ''
  } else if (ua.includes('opera')) {
    browser = 'Opera'
    const match = ua.match(/opera\/(\d+\.?\d*)/)
    browserVersion = match ? match[1] : ''
  }
  
  // Detect OS
  let os = 'Unknown'
  let osVersion = ''
  
  if (ua.includes('windows')) {
    os = 'Windows'
    if (ua.includes('windows nt 10')) osVersion = '10'
    else if (ua.includes('windows nt 6.3')) osVersion = '8.1'
    else if (ua.includes('windows nt 6.2')) osVersion = '8'
    else if (ua.includes('windows nt 6.1')) osVersion = '7'
  } else if (ua.includes('mac os x')) {
    os = 'macOS'
    const match = ua.match(/mac os x (\d+[._]\d+)/)
    osVersion = match ? match[1].replace('_', '.') : ''
  } else if (ua.includes('linux')) {
    os = 'Linux'
  } else if (ua.includes('android')) {
    os = 'Android'
    const match = ua.match(/android (\d+\.?\d*)/)
    osVersion = match ? match[1] : ''
  } else if (ua.includes('ios') || ua.includes('iphone') || ua.includes('ipad')) {
    os = 'iOS'
    const match = ua.match(/os (\d+[._]\d+)/)
    osVersion = match ? match[1].replace('_', '.') : ''
  }
  
  return {
    deviceType,
    browser,
    browserVersion,
    os,
    osVersion,
    isBot
  }
}

export function generateSessionId(): string {
  return 'sess_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
}

export function getClientIP(request: Request): string {
  // Check various headers for client IP
  const forwardedFor = request.headers.get('x-forwarded-for')
  const realIP = request.headers.get('x-real-ip')
  const cfConnectingIP = request.headers.get('cf-connecting-ip')
  
  if (cfConnectingIP) return cfConnectingIP
  if (realIP) return realIP
  if (forwardedFor) return forwardedFor.split(',')[0].trim()
  
  return '127.0.0.1' // fallback
}

// Simple location detection based on IP (in real app, use IP geolocation service)
export async function getLocationFromIP(ip: string): Promise<LocationInfo> {
  try {
    // For demo purposes, return mock data
    // In production, integrate with ipapi.co, maxmind, or similar service
    if (ip === '127.0.0.1' || ip.startsWith('192.168.') || ip.startsWith('10.')) {
      return { country: 'Indonesia', city: 'Jakarta' }
    }
    
    // You can integrate with a real IP geolocation service here
    // const response = await fetch(`http://ip-api.com/json/${ip}`)
    // const data = await response.json()
    // return { country: data.country, city: data.city }
    
    return { country: 'Indonesia', city: 'Jakarta' }
  } catch (error) {
    console.error('Error getting location from IP:', error)
    return {}
  }
}