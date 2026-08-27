import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'
import ChunkErrorBoundary from '@/components/ChunkErrorBoundary'
import CookieConsent from '@/components/CookieConsent'
import { SpeedInsights } from '@vercel/speed-insights/next'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    default: 'AGGRE CAPITAL - Solusi Pendanaan Terpercaya',
    template: '%s | AGGRE CAPITAL'
  },
  description: 'Pendanaan multiguna mulai Rp 100 juta. Proses cepat, balloon payment & installment 60 bulan. Solusi modal usaha, renovasi, dan kebutuhan lainnya.',
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
  metadataBase: new URL('https://aggrecapital.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: 'https://aggrecapital.com',
    title: 'AGGRE CAPITAL - Solusi Pendanaan Terpercaya',
    description: 'Pendanaan multiguna mulai Rp 100 juta. Proses cepat, balloon payment & installment 60 bulan. Solusi modal usaha, renovasi, dan kebutuhan lainnya.',
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
    description: 'Pendanaan multiguna mulai Rp 100 juta. Proses cepat, balloon payment & installment 60 bulan. Solusi modal usaha, renovasi, dan kebutuhan lainnya.',
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
    google: 'kO1_CLCRAF-80wQ5YutuqW0S-hCxi0Kh1QHZ7bkDRWA',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FinancialService',
  name: 'AGGRE CAPITAL',
  url: 'https://aggrecapital.com',
  logo: 'https://aggrecapital.com/images/logo.png',
  description: 'Solusi pendanaan multiguna mulai Rp 100 juta. Proses cepat, balloon payment & installment 60 bulan.',
  telephone: '+622127881921',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Jalan Iskandarsyah Raya No 1 A, Menara Sentraya Lantai 18, Melawai, Kec. Kebayoran Baru',
    addressLocality: 'Jakarta Selatan',
    postalCode: '12160',
    addressRegion: 'DKI Jakarta',
    addressCountry: 'ID',
  },
  areaServed: 'ID',
  currenciesAccepted: 'IDR',
  priceRange: 'Rp 100.000.000+',
  sameAs: [
    'https://www.instagram.com/aggrecapital',
  ],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
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
        <CookieConsent />
        <SpeedInsights />
      </body>
    </html>
  )
}
