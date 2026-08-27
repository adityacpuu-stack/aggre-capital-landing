import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Kontak Kami',
  description: 'Hubungi AGGRE CAPITAL di Jakarta Selatan. Telepon +62 21 27881921. Konsultasi pendanaan multiguna, modal usaha, renovasi rumah, dan kebutuhan finansial lainnya.',
  keywords: ['kontak aggre capital', 'telepon aggre capital', 'alamat aggre capital', 'konsultasi pendanaan jakarta', 'hubungi aggre capital'],
  alternates: {
    canonical: '/kontak',
  },
  openGraph: {
    title: 'Kontak Kami - AGGRE CAPITAL',
    description: 'Hubungi AGGRE CAPITAL di Jakarta Selatan. Telepon +62 21 27881921 untuk konsultasi pendanaan.',
    url: 'https://aggrecapital.com/kontak',
  },
}

export default function KontakLayout({ children }: { children: React.ReactNode }) {
  return children
}
