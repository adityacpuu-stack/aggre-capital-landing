import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Kebijakan Cookie',
  description: 'Informasi tentang penggunaan cookie di website AGGRE CAPITAL untuk meningkatkan pengalaman pengguna.',
  alternates: {
    canonical: '/cookies',
  },
}

export default function CookiesLayout({ children }: { children: React.ReactNode }) {
  return children
}
