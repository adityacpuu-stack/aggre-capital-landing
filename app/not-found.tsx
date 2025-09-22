'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Home, ArrowLeft } from 'lucide-react'
import Image from 'next/image'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-lime-50 to-emerald-50 flex items-center justify-center px-4">
      <div className="text-center max-w-2xl mx-auto">
        {/* Logo */}
        <div className="mb-8">
          <Image
            src="/images/logo.png"
            alt="Aggre Capital"
            width={200}
            height={67}
            className="mx-auto"
          />
        </div>

        {/* 404 Content */}
        <div className="space-y-6">
          <h1 className="text-9xl font-bold text-teal-600">404</h1>
          <h2 className="text-3xl font-bold text-gray-900">Halaman Tidak Ditemukan</h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            Maaf, halaman yang Anda cari tidak ditemukan. 
            Mungkin halaman tersebut telah dipindahkan atau dihapus.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Link href="/">
            <Button className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white px-8 py-3 text-lg font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
              <Home className="mr-2 h-5 w-5" />
              Kembali ke Beranda
            </Button>
          </Link>
          
          <Button
            onClick={() => window.history.back()}
            variant="outline"
            className="border-2 border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Kembali
          </Button>
        </div>

        {/* Helpful Links */}
        <div className="mt-12">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Halaman Populer</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { name: 'Pengajuan Pendanaan', href: '/pengajuan' },
              { name: 'Kontak Kami', href: '/kontak' },
              { name: 'Tim Kami', href: '/team' },
              { name: 'Testimoni', href: '/testimoni' }
            ].map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-teal-600 hover:text-teal-700 font-medium transition-colors duration-300"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
