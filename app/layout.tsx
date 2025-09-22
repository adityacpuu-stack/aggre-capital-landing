import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'
import ChunkErrorBoundary from '@/components/ChunkErrorBoundary'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id">
      <head>
        <title>AGGRE CAPITAL - Solusi Pendanaan Terpercaya</title>
        <meta name="description" content="Proses Cepat dan Mudah! Bisa Balloon Payment & Installment 60 Bulan. Limit Pendanaan Besar Mulai Rp 100 juta." />
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
