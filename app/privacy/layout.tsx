import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Kebijakan Privasi',
  description: 'Kebijakan privasi AGGRE CAPITAL dalam melindungi data pribadi pengguna sesuai regulasi OJK dan peraturan perlindungan data Indonesia.',
  alternates: {
    canonical: '/privacy',
  },
}

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return children
}
