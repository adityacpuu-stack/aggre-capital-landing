import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Testimoni Pelanggan',
  description: 'Kisah sukses pelanggan AGGRE CAPITAL. Ribuan nasabah telah mempercayakan kebutuhan pendanaan modal usaha, renovasi rumah, dan pendidikan kepada kami.',
  keywords: ['testimoni aggre capital', 'review aggre capital', 'pengalaman pinjaman aggre capital', 'kisah sukses modal usaha', 'ulasan nasabah aggre capital'],
  alternates: {
    canonical: '/testimoni',
  },
  openGraph: {
    title: 'Testimoni Pelanggan - AGGRE CAPITAL',
    description: 'Kisah sukses pelanggan AGGRE CAPITAL dalam mendapatkan solusi pendanaan modal usaha dan renovasi.',
    url: 'https://aggrecapital.com/testimoni',
  },
}

export default function TestimoniLayout({ children }: { children: React.ReactNode }) {
  return children
}
