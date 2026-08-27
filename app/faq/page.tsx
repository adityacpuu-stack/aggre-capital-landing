"use client"

import { useState } from "react"
import { ArrowLeft, ChevronDown, HelpCircle, Phone, MessageSquare } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const faqs = [
  {
    category: "Pengajuan & Proses",
    items: [
      {
        q: "Berapa limit pendanaan yang bisa diajukan?",
        a: "AGGRE CAPITAL menyediakan limit pendanaan mulai dari Rp 100 juta. Besaran limit disesuaikan dengan profil dan kemampuan finansial pemohon.",
      },
      {
        q: "Berapa lama proses pengajuan pendanaan?",
        a: "Proses pengajuan pendanaan di AGGRE CAPITAL dirancang cepat dan efisien. Setelah dokumen lengkap diterima, tim kami akan memproses dan memberikan keputusan dalam waktu singkat. Hubungi kami untuk informasi lebih lanjut mengenai estimasi waktu proses.",
      },
      {
        q: "Bagaimana cara mengajukan pendanaan?",
        a: "Pengajuan bisa dilakukan secara online melalui halaman Pengajuan di website kami, atau langsung menghubungi tim AGGRE CAPITAL melalui telepon di +62 21 27881921. Tim kami akan memandu Anda melalui seluruh proses.",
      },
      {
        q: "Apakah bisa mengajukan secara online?",
        a: "Ya, AGGRE CAPITAL menyediakan formulir pengajuan online yang bisa diakses 24 jam. Isi data diri dan kebutuhan pendanaan Anda, lalu tim kami akan menghubungi Anda untuk tindak lanjut.",
      },
    ],
  },
  {
    category: "Syarat & Dokumen",
    items: [
      {
        q: "Apa saja syarat pengajuan pendanaan?",
        a: "Syarat umum meliputi: WNI berusia 21-60 tahun, memiliki penghasilan tetap atau usaha yang berjalan, dan dokumen identitas yang valid (KTP, NPWP). Syarat lengkap akan diinformasikan oleh tim kami saat proses konsultasi.",
      },
      {
        q: "Dokumen apa saja yang diperlukan?",
        a: "Dokumen yang umumnya diperlukan antara lain: KTP, NPWP, slip gaji atau laporan keuangan usaha, dan dokumen pendukung lainnya sesuai jenis pendanaan. Tim kami akan memberikan checklist dokumen lengkap setelah konsultasi awal.",
      },
      {
        q: "Apakah perlu agunan atau jaminan?",
        a: "Ketentuan agunan bergantung pada jenis dan besaran pendanaan yang diajukan. Tim kami akan menjelaskan opsi yang tersedia sesuai dengan profil dan kebutuhan Anda saat proses konsultasi.",
      },
    ],
  },
  {
    category: "Produk & Layanan",
    items: [
      {
        q: "Apa itu pendanaan multiguna?",
        a: "Pendanaan multiguna adalah fasilitas pinjaman yang dapat digunakan untuk berbagai kebutuhan seperti modal usaha, renovasi rumah, biaya pendidikan, biaya pernikahan, atau kebutuhan finansial lainnya. Fleksibel dan bisa disesuaikan dengan tujuan Anda.",
      },
      {
        q: "Apa itu balloon payment?",
        a: "Balloon payment adalah skema pembayaran di mana sebagian besar pokok pinjaman dilunasi di akhir tenor. Skema ini cocok untuk nasabah yang ingin menikmati cicilan bulanan lebih ringan dengan melunasi sisa pokok di akhir periode.",
      },
      {
        q: "Berapa lama tenor atau jangka waktu cicilan?",
        a: "AGGRE CAPITAL menawarkan fleksibilitas tenor hingga 60 bulan (5 tahun), sehingga cicilan bulanan bisa disesuaikan dengan kemampuan finansial Anda.",
      },
      {
        q: "Apakah bisa melakukan take over dari bank atau lembaga lain?",
        a: "Ya, AGGRE CAPITAL melayani take over pinjaman dari bank atau lembaga keuangan lain. Hubungi tim kami untuk mengetahui syarat dan ketentuan take over yang berlaku.",
      },
      {
        q: "Untuk kebutuhan apa saja pendanaan bisa digunakan?",
        a: "Pendanaan AGGRE CAPITAL bisa digunakan untuk: modal usaha & pengembangan bisnis, renovasi atau pembelian properti, biaya pendidikan, biaya pernikahan, take over pinjaman, dan kebutuhan finansial produktif lainnya.",
      },
    ],
  },
  {
    category: "Legalitas & Kepercayaan",
    items: [
      {
        q: "Apakah AGGRE CAPITAL terdaftar dan diawasi OJK?",
        a: "AGGRE CAPITAL beroperasi sesuai dengan regulasi yang berlaku di Indonesia. Untuk informasi lebih detail mengenai legalitas dan perizinan, silakan hubungi tim kami atau kunjungi kantor kami di Menara Sentraya Lantai 18, Jakarta Selatan.",
      },
      {
        q: "Apakah data pribadi saya aman?",
        a: "Keamanan data nasabah adalah prioritas utama AGGRE CAPITAL. Semua data yang diberikan dijaga kerahasiaannya sesuai dengan Kebijakan Privasi dan regulasi perlindungan data yang berlaku di Indonesia.",
      },
      {
        q: "Di daerah mana saja AGGRE CAPITAL melayani?",
        a: "AGGRE CAPITAL melayani nasabah di seluruh Indonesia. Kantor pusat kami berlokasi di Jakarta Selatan, dan tim kami siap melayani Anda secara online maupun offline.",
      },
    ],
  },
]

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({})

  const toggle = (key: string) => {
    setOpenItems(prev => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.flatMap(cat =>
              cat.items.map(item => ({
                '@type': 'Question',
                name: item.q,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: item.a,
                },
              }))
            ),
          }),
        }}
      />

      <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-950">
        {/* Background effects */}
        <div className="fixed inset-0 opacity-[0.03] pointer-events-none">
          <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        </div>
        <div className="fixed top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="fixed bottom-0 left-0 w-96 h-96 bg-lime-500/5 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <header className="bg-gray-900/80 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center group">
                <Image
                  src="/images/logo.png"
                  alt="AGGRE CAPITAL"
                  width={120}
                  height={40}
                  className="object-contain transition-all duration-300 group-hover:scale-105"
                />
              </Link>
              <Link
                href="/"
                className="flex items-center space-x-2 text-gray-400 hover:text-lime-400 transition-colors duration-300"
              >
                <ArrowLeft className="h-5 w-5" />
                <span className="font-medium">Kembali ke Beranda</span>
              </Link>
            </div>
          </div>
        </header>

        {/* Main */}
        <main className="flex-1 container mx-auto px-4 py-16 relative z-10">
          <div className="max-w-3xl mx-auto">

            {/* Page Header */}
            <div className="text-center mb-16">
              <span className="inline-block text-xs font-bold tracking-widest text-lime-400 uppercase mb-4 bg-lime-400/10 px-4 py-2 rounded-full border border-lime-400/20">
                PUSAT BANTUAN
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Pertanyaan yang{" "}
                <span className="bg-gradient-to-r from-teal-400 to-lime-400 bg-clip-text text-transparent">
                  Sering Ditanyakan
                </span>
              </h1>
              <p className="text-xl text-gray-400">
                Temukan jawaban atas pertanyaan umum seputar layanan pendanaan AGGRE CAPITAL.
              </p>
            </div>

            {/* FAQ Categories */}
            <div className="space-y-10">
              {faqs.map((cat) => (
                <section key={cat.category}>
                  <div className="flex items-center gap-3 mb-4">
                    <HelpCircle className="h-5 w-5 text-teal-400 shrink-0" />
                    <h2 className="text-lg font-semibold text-teal-400 uppercase tracking-wider">
                      {cat.category}
                    </h2>
                  </div>

                  <div className="space-y-3">
                    {cat.items.map((item, i) => {
                      const key = `${cat.category}-${i}`
                      const isOpen = !!openItems[key]
                      return (
                        <div
                          key={key}
                          className="border border-white/10 rounded-xl bg-white/5 backdrop-blur-sm overflow-hidden"
                        >
                          <button
                            onClick={() => toggle(key)}
                            className="w-full flex items-center justify-between px-6 py-5 text-left gap-4 hover:bg-white/5 transition-colors"
                          >
                            <span className="text-white font-medium leading-snug">{item.q}</span>
                            <ChevronDown
                              className={`h-5 w-5 text-teal-400 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                            />
                          </button>
                          {isOpen && (
                            <div className="px-6 pb-5 text-gray-400 leading-relaxed border-t border-white/10 pt-4">
                              {item.a}
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </section>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-16 rounded-2xl border border-white/10 bg-gradient-to-br from-teal-500/10 to-lime-500/10 p-8 text-center">
              <h3 className="text-xl font-bold text-white mb-2">Masih ada pertanyaan?</h3>
              <p className="text-gray-400 mb-6">Tim kami siap membantu Anda 24/7.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/kontak"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-teal-500 hover:bg-teal-400 text-white font-semibold rounded-xl transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  Hubungi Kami
                </Link>
                <Link
                  href="/pengajuan"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-lime-400/40 text-lime-400 hover:bg-lime-400/10 font-semibold rounded-xl transition-colors"
                >
                  <MessageSquare className="h-4 w-4" />
                  Ajukan Sekarang
                </Link>
              </div>
            </div>

          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-white/10 py-6 text-center text-gray-600 text-sm">
          © {new Date().getFullYear()} AGGRE CAPITAL. All rights reserved.
        </footer>
      </div>
    </>
  )
}
