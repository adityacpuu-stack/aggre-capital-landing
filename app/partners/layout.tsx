import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Partner Strategis',
  description: 'Ekosistem mitra strategis AGGRE CAPITAL — BPR, bank, dan lembaga keuangan terpercaya yang mendukung solusi pendanaan multiguna terbaik di Indonesia.',
  keywords: ['partner aggre capital', 'mitra aggre capital', 'BPR partner fintech', 'ekosistem keuangan indonesia', 'kolaborasi pendanaan'],
  alternates: {
    canonical: '/partners',
  },
  openGraph: {
    title: 'Partner Strategis - AGGRE CAPITAL',
    description: 'Ekosistem mitra strategis AGGRE CAPITAL — BPR, bank, dan lembaga keuangan terpercaya di Indonesia.',
    url: 'https://aggrecapital.com/partners',
  },
}

export default function PartnersLayout({ children }: { children: React.ReactNode }) {
  return children
}
