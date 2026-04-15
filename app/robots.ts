import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: ['/', '/pengajuan', '/team', '/news', '/testimoni', '/partners', '/kontak', '/privacy', '/terms', '/cookies', '/sitemap'],
      disallow: ['/api/', '/dashboard/', '/login/', '/aplikasi/'],
    },
    sitemap: 'https://aggrecapital.com/sitemap.xml',
  }
}
