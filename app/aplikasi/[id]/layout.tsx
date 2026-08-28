import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Detail Pengajuan | AGGRE CAPITAL',
  robots: { index: false, follow: false },
}

export default function AplikasiLayout({ children }: { children: React.ReactNode }) {
  return children
}
