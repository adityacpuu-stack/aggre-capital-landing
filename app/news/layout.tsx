import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Berita & Artikel',
  description: 'Baca artikel terbaru seputar fintech, keuangan, dan tips modal usaha dari AGGRE CAPITAL. Update informasi industri keuangan Indonesia untuk UMKM dan pengusaha.',
  keywords: ['berita fintech indonesia', 'artikel modal usaha', 'tips keuangan UMKM', 'berita aggre capital', 'pinjaman usaha terbaru'],
  alternates: {
    canonical: '/news',
  },
  openGraph: {
    title: 'Berita & Artikel - AGGRE CAPITAL',
    description: 'Artikel terbaru seputar fintech, keuangan, dan tips modal usaha dari AGGRE CAPITAL.',
    url: 'https://aggrecapital.com/news',
  },
}

export default function NewsLayout({ children }: { children: React.ReactNode }) {
  return children
}
