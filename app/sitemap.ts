import { MetadataRoute } from 'next'
import { query } from '@/lib/database'

// Regenerasi sitemap tiap jam supaya artikel berita baru ikut terindeks.
export const revalidate = 3600

const baseUrl = 'https://www.aggrecapital.com'

async function getNewsUrls(lastModified: Date): Promise<MetadataRoute.Sitemap> {
  try {
    const r = await query(
      "SELECT slug, updated_at, created_at FROM news WHERE status = 'published' AND slug IS NOT NULL ORDER BY created_at DESC LIMIT 500"
    )
    return r.rows.map((n: any) => ({
      url: `${baseUrl}/news/${n.slug}`,
      lastModified: n.updated_at || n.created_at || lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }))
  } catch {
    return []
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date()

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/pengajuan`, lastModified, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/team`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/news`, lastModified, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/faq`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/testimoni`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/partners`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/kontak`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/privacy`, lastModified, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/cookies`, lastModified, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/sitemap`, lastModified, changeFrequency: 'monthly', priority: 0.4 },
  ]

  const newsPages = await getNewsUrls(lastModified)
  return [...staticPages, ...newsPages]
}
