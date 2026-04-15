import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Syarat & Ketentuan',
  description: 'Syarat dan ketentuan penggunaan layanan pendanaan AGGRE CAPITAL. Baca dengan cermat sebelum menggunakan layanan kami.',
  alternates: {
    canonical: '/terms',
  },
}

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return children
}
