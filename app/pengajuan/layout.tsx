import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Ajukan Pendanaan',
  description: 'Ajukan pendanaan multiguna mulai Rp 100 juta secara online. Proses cepat, syarat mudah, bisa balloon payment & cicilan 60 bulan. Modal usaha, renovasi, pendidikan, pernikahan.',
  keywords: [
    'ajukan pinjaman online',
    'pengajuan modal usaha',
    'kredit multiguna jakarta',
    'pinjaman renovasi rumah',
    'pendanaan UMKM online',
    'kredit tanpa agunan jakarta',
    'pinjaman pendidikan',
    'balloon payment',
    'cicilan 60 bulan',
  ],
  alternates: {
    canonical: '/pengajuan',
  },
  openGraph: {
    title: 'Ajukan Pendanaan - AGGRE CAPITAL',
    description: 'Ajukan pendanaan multiguna mulai Rp 100 juta. Proses cepat, syarat mudah, cicilan hingga 60 bulan.',
    url: 'https://aggrecapital.com/pengajuan',
  },
}

export default function PengajuanLayout({ children }: { children: React.ReactNode }) {
  return children
}
