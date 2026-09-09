import {
  createPageMetadata,
  DEFAULT_TITLE,
  DEFAULT_DESCRIPTION,
  SITE_URL,
  jsonLdStringify,
} from "@/lib/site-metadata";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import "./portal.css";
import "./admin.css";
import ChunkErrorBoundary from "@/components/ChunkErrorBoundary";
import CookieConsent from "@/components/CookieConsent";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";

export const metadata: Metadata = {
  ...createPageMetadata({
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    path: "/",
  }),
  title: {
    default: "AGGRE CAPITAL - Solusi Pendanaan Terpercaya",
    template: "%s | AGGRE CAPITAL",
  },
  keywords: [
    "pendanaan",
    "pinjaman",
    "modal usaha",
    "renovasi rumah",
    "pendidikan",
    "pernikahan",
    "take over",
    "balloon payment",
    "installment",
    "fintech",
    "keuangan",
    "jakarta",
    "indonesia",
  ],
  authors: [{ name: "AGGRE CAPITAL" }],
  creator: "AGGRE CAPITAL",
  publisher: "AGGRE CAPITAL",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(SITE_URL),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "kO1_CLCRAF-80wQ5YutuqW0S-hCxi0Kh1QHZ7bkDRWA",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FinancialService",
  name: "AGGRE CAPITAL",
  url: SITE_URL,
  logo: `${SITE_URL}/images/logo.png`,
  description:
    "Solusi pendanaan multiguna mulai Rp 100 juta. Proses cepat, balloon payment & installment 60 bulan.",
  telephone: "+622127881921",
  address: {
    "@type": "PostalAddress",
    streetAddress:
      "Jalan Iskandarsyah Raya No 1 A, Menara Sentraya Lantai 18, Melawai, Kec. Kebayoran Baru",
    addressLocality: "Jakarta Selatan",
    postalCode: "12160",
    addressRegion: "DKI Jakarta",
    addressCountry: "ID",
  },
  areaServed: "ID",
  currenciesAccepted: "IDR",
  priceRange: "Rp 100.000.000+",
  sameAs: ["https://www.instagram.com/aggrecapital"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
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
          dangerouslySetInnerHTML={{ __html: jsonLdStringify(jsonLd) }}
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
        <ChunkErrorBoundary>{children}</ChunkErrorBoundary>
        <CookieConsent />
        <SpeedInsights />
      </body>
    </html>
  );
}
