import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'
import ChunkErrorBoundary from '@/components/ChunkErrorBoundary'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    default: 'AGGRE CAPITAL - Solusi Pendanaan Terpercaya',
    template: '%s | AGGRE CAPITAL'
  },
  description: 'Proses Cepat dan Mudah! Bisa Balloon Payment & Installment 60 Bulan. Limit Pendanaan Besar Mulai Rp 100 juta. Solusi pendanaan multiguna untuk modal usaha, renovasi rumah, dan kebutuhan lainnya.',
  keywords: [
    'pendanaan',
    'pinjaman',
    'modal usaha',
    'renovasi rumah',
    'pendidikan',
    'pernikahan',
    'take over',
    'balloon payment',
    'installment',
    'fintech',
    'keuangan',
    'jakarta',
    'indonesia'
  ],
  authors: [{ name: 'AGGRE CAPITAL' }],
  creator: 'AGGRE CAPITAL',
  publisher: 'AGGRE CAPITAL',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://aggre-capital-landing.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: 'https://aggre-capital-landing.vercel.app',
    title: 'AGGRE CAPITAL - Solusi Pendanaan Terpercaya',
    description: 'Proses Cepat dan Mudah! Bisa Balloon Payment & Installment 60 Bulan. Limit Pendanaan Besar Mulai Rp 100 juta.',
    siteName: 'AGGRE CAPITAL',
    images: [
      {
        url: '/images/landing.jpg',
        width: 1200,
        height: 630,
        alt: 'AGGRE CAPITAL - Solusi Pendanaan Terpercaya',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AGGRE CAPITAL - Solusi Pendanaan Terpercaya',
    description: 'Proses Cepat dan Mudah! Bisa Balloon Payment & Installment 60 Bulan. Limit Pendanaan Besar Mulai Rp 100 juta.',
    images: ['/images/landing.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0f766e" />
        <meta name="msapplication-TileColor" content="#0f766e" />
        <link rel="icon" href="/images/logo.ico" />
        <link rel="apple-touch-icon" href="/images/logo.png" />
        <link rel="manifest" href="/manifest.json" />
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body>
        <ChunkErrorBoundary>
          {children}
        </ChunkErrorBoundary>
      </body>
    </html>
  )
}
