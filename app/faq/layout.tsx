import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'FAQ - Pertanyaan yang Sering Ditanyakan',
  description: 'Temukan jawaban atas pertanyaan umum seputar AGGRE CAPITAL: limit pendanaan, syarat pengajuan, lama proses, balloon payment, tenor cicilan, dan informasi layanan lainnya.',
  keywords: [
    'FAQ aggre capital',
    'syarat pengajuan pinjaman',
    'berapa limit pinjaman aggre capital',
    'berapa lama proses pendanaan',
    'apa itu balloon payment',
    'tenor cicilan aggre capital',
    'cara mengajukan pinjaman',
    'dokumen pengajuan kredit',
    'take over pinjaman',
    'pendanaan multiguna syarat',
  ],
  alternates: {
    canonical: '/faq',
  },
  openGraph: {
    title: 'FAQ - Pertanyaan yang Sering Ditanyakan | AGGRE CAPITAL',
    description: 'Jawaban lengkap atas pertanyaan umum seputar layanan pendanaan AGGRE CAPITAL — limit, syarat, proses, dan produk.',
    url: 'https://aggrecapital.com/faq',
  },
}

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return children
}
