export const defaultSEO = {
  title: 'AGGRE CAPITAL - Solusi Pendanaan Terpercaya',
  description: 'Proses Cepat dan Mudah! Bisa Balloon Payment & Installment 60 Bulan. Limit Pendanaan Besar Mulai Rp 100 juta.',
  canonical: 'https://aggrecapital.com',
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: 'https://aggrecapital.com',
    siteName: 'AGGRE CAPITAL',
    title: 'AGGRE CAPITAL - Solusi Pendanaan Terpercaya',
    description: 'Proses Cepat dan Mudah! Bisa Balloon Payment & Installment 60 Bulan. Limit Pendanaan Besar Mulai Rp 100 juta.',
    images: [
      {
        url: 'https://aggrecapital.com/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'AGGRE CAPITAL - Solusi Pendanaan Terpercaya',
      },
    ],
  },
  twitter: {
    handle: '@aggrecapital',
    site: '@aggrecapital',
    cardType: 'summary_large_image',
  },
  additionalMetaTags: [
    {
      name: 'keywords',
      content: 'pendanaan, kredit, modal usaha, AGGRE CAPITAL, fintech, keuangan, UMKM, investasi',
    },
    {
      name: 'author',
      content: 'AGGRE CAPITAL',
    },
    {
      name: 'robots',
      content: 'index, follow',
    },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1',
    },
  ],
}

export const createSEO = (overrides: any = {}) => {
  return {
    ...defaultSEO,
    ...overrides,
    openGraph: {
      ...defaultSEO.openGraph,
      ...overrides.openGraph,
    },
    twitter: {
      ...defaultSEO.twitter,
      ...overrides.twitter,
    },
  }
}

// SEO untuk halaman spesifik
export const seoConfigs = {
  home: createSEO({
    title: 'AGGRE CAPITAL - Solusi Pendanaan Terpercaya',
    description: 'Proses Cepat dan Mudah! Bisa Balloon Payment & Installment 60 Bulan. Limit Pendanaan Besar Mulai Rp 100 juta.',
  }),
  
  about: createSEO({
    title: 'Tentang Kami - AGGRE CAPITAL',
    description: 'Pelajari lebih lanjut tentang AGGRE CAPITAL, visi misi, dan komitmen kami dalam memberikan solusi pendanaan terbaik.',
  }),
  
  team: createSEO({
    title: 'Tim Leadership - AGGRE CAPITAL',
    description: 'Kenali tim leadership AGGRE CAPITAL yang berpengalaman dan berdedikasi dalam industri keuangan.',
  }),
  
  partners: createSEO({
    title: 'Partner Strategis - AGGRE CAPITAL',
    description: 'Temukan partner strategis dan ekosistem AGGRE CAPITAL yang mendukung layanan pendanaan kami.',
  }),
  
  news: createSEO({
    title: 'Berita & Artikel - AGGRE CAPITAL',
    description: 'Baca artikel terbaru dan informasi industri keuangan dari AGGRE CAPITAL.',
  }),
  
  testimonials: createSEO({
    title: 'Testimoni Pelanggan - AGGRE CAPITAL',
    description: 'Dengarkan kisah sukses dan pengalaman pelanggan AGGRE CAPITAL dalam menggunakan layanan pendanaan kami.',
  }),
  
  contact: createSEO({
    title: 'Kontak - AGGRE CAPITAL',
    description: 'Hubungi AGGRE CAPITAL untuk informasi lebih lanjut tentang layanan pendanaan kami.',
  }),
  
  application: createSEO({
    title: 'Form Pengajuan Pendanaan - AGGRE CAPITAL',
    description: 'Ajukan pendanaan dengan mudah melalui form online AGGRE CAPITAL. Proses cepat dan aman.',
  }),
  
  privacy: createSEO({
    title: 'Kebijakan Privasi - AGGRE CAPITAL',
    description: 'Kebijakan privasi AGGRE CAPITAL dalam melindungi informasi pribadi pengguna.',
  }),
  
  terms: createSEO({
    title: 'Syarat & Ketentuan - AGGRE CAPITAL',
    description: 'Syarat dan ketentuan penggunaan layanan AGGRE CAPITAL.',
  }),
  
  cookies: createSEO({
    title: 'Kebijakan Cookie - AGGRE CAPITAL',
    description: 'Informasi tentang penggunaan cookie di website AGGRE CAPITAL.',
  }),
  
  sitemap: createSEO({
    title: 'Sitemap - AGGRE CAPITAL',
    description: 'Peta lengkap halaman dan fitur website AGGRE CAPITAL.',
  }),
}
