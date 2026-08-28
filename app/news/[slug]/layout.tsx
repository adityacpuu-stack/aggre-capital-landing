import type { Metadata } from 'next'
import { query } from '@/lib/database'

const BASE = 'https://www.aggrecapital.com'

async function getArticle(slug: string) {
  try {
    const r = await query(
      "SELECT title, excerpt, featured_image, created_at, updated_at FROM news WHERE slug = $1 AND status = 'published' LIMIT 1",
      [slug]
    )
    return r.rows[0] || null
  } catch {
    return null
  }
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params
  const article = await getArticle(slug)

  // Artikel tidak ada → jangan diindeks (cegah soft-404 dimasukkan ke index Google).
  if (!article) {
    return {
      title: 'Artikel Tidak Ditemukan | AGGRE CAPITAL',
      robots: { index: false, follow: true },
    }
  }

  const title = `${article.title} | AGGRE CAPITAL`
  const description = String(article.excerpt || `Baca artikel "${article.title}" di AGGRE CAPITAL.`).slice(0, 160)
  const url = `${BASE}/news/${slug}`
  const image = /^https?:\/\//.test(String(article.featured_image || ''))
    ? article.featured_image
    : `${BASE}/images/og-image.jpg`

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: 'article',
      images: [{ url: image }],
      publishedTime: article.created_at ? new Date(article.created_at).toISOString() : undefined,
      modifiedTime: article.updated_at ? new Date(article.updated_at).toISOString() : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  }
}

export default function NewsArticleLayout({ children }: { children: React.ReactNode }) {
  return children
}
