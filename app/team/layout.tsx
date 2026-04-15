import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tim Leadership',
  description: 'Kenali tim leadership AGGRE CAPITAL — para profesional berpengalaman di industri keuangan dan fintech Indonesia yang mendorong inovasi pendanaan UMKM.',
  keywords: ['tim aggre capital', 'leadership aggre capital', 'manajemen fintech indonesia', 'founder aggre capital'],
  alternates: {
    canonical: '/team',
  },
  openGraph: {
    title: 'Tim Leadership - AGGRE CAPITAL',
    description: 'Kenali tim leadership AGGRE CAPITAL — para profesional berpengalaman di industri keuangan dan fintech Indonesia.',
    url: 'https://aggrecapital.com/team',
  },
}

export default function TeamLayout({ children }: { children: React.ReactNode }) {
  return children
}
