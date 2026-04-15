import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sitemap',
  description: 'Peta lengkap halaman website AGGRE CAPITAL — temukan semua halaman layanan, informasi, dan konten kami.',
  alternates: {
    canonical: '/sitemap',
  },
}

export default function SitemapLayout({ children }: { children: React.ReactNode }) {
  return children
}
