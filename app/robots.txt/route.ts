import { NextResponse } from 'next/server'

export async function GET() {
  const robotsTxt = `User-agent: *
Allow: /

# Sitemap
Sitemap: https://aggre-capital-landing.vercel.app/sitemap.xml

# Disallow admin and API routes
Disallow: /api/
Disallow: /dashboard/
Disallow: /login/
Disallow: /aplikasi/

# Allow important pages
Allow: /
Allow: /pengajuan
Allow: /team
Allow: /news
Allow: /testimoni
Allow: /partners
Allow: /kontak
Allow: /privacy
Allow: /terms
Allow: /cookies
Allow: /sitemap`

  return new NextResponse(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
    },
  })
}
