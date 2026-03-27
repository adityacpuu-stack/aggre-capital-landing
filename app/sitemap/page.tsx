"use client"

import { Map, Home, Users, FileText, MessageCircle, Building2, CreditCard, Phone, Mail, ExternalLink, ArrowLeft } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import SEO from "@/components/SEO"
import { seoConfigs } from "@/lib/seo"
import Link from "next/link"

export default function Sitemap() {
  const siteStructure = [
    {
      title: "Beranda",
      icon: Home,
      href: "/",
      description: "Halaman utama dengan informasi lengkap tentang AGGRE CAPITAL",
      pages: [
        { name: "Hero Section", href: "/#hero" },
        { name: "Layanan Kami", href: "/#layanan" },
        { name: "Keunggulan", href: "/#keunggulan" },
        { name: "Tim Leadership", href: "/#tim" },
        { name: "Testimoni", href: "/#testimoni" },
        { name: "Call to Action", href: "/#cta" }
      ]
    },
    {
      title: "Layanan",
      icon: CreditCard,
      href: "/pengajuan",
      description: "Formulir pengajuan pendanaan multiguna",
      pages: [
        { name: "Form Pengajuan", href: "/pengajuan" }
      ]
    },
    {
      title: "Tentang Kami",
      icon: Building2,
      href: "/about",
      description: "Informasi tentang perusahaan dan visi misi",
      pages: [
        { name: "Tentang AGGRE CAPITAL", href: "/about" },
        { name: "Visi & Misi", href: "/about#visi-misi" },
        { name: "Sejarah Perusahaan", href: "/about#sejarah" },
        { name: "Nilai-nilai Perusahaan", href: "/about#nilai" }
      ]
    },
    {
      title: "Tim Kami",
      icon: Users,
      href: "/team",
      description: "Profil leadership team dan tim AGGRE CAPITAL",
      pages: [
        { name: "Leadership Team", href: "/team" },
        { name: "Profil Founder", href: "/team#founder" },
        { name: "Profil Co-Founder", href: "/team#co-founder" }
      ]
    },
    {
      title: "Berita & Artikel",
      icon: FileText,
      href: "/news",
      description: "Artikel terbaru dan informasi industri keuangan",
      pages: [
        { name: "Daftar Berita", href: "/news" },
        { name: "Artikel Fintech", href: "/news?category=fintech" },
        { name: "Artikel Bisnis", href: "/news?category=business" },
        { name: "Artikel Finance", href: "/news?category=finance" }
      ]
    },
    {
      title: "Testimoni",
      icon: MessageCircle,
      href: "/testimoni",
      description: "Kisah sukses dan pengalaman pelanggan",
      pages: [
        { name: "Semua Testimoni", href: "/testimoni" },
        { name: "Testimoni Modal Usaha", href: "/testimoni?category=modal-usaha" },
        { name: "Testimoni Renovasi", href: "/testimoni?category=renovasi" },
        { name: "Testimoni Pendidikan", href: "/testimoni?category=pendidikan" }
      ]
    },
    {
      title: "Partner Strategis",
      icon: Building2,
      href: "/partners",
      description: "Mitra strategis dan ekosistem AGGRE CAPITAL",
      pages: [
        { name: "Strategic Partners", href: "/partners" },
        { name: "Ecosystem Partners", href: "/partners#ecosystem" },
        { name: "BPR Partners", href: "/partners#bpr" }
      ]
    },
    {
      title: "Kontak",
      icon: Phone,
      href: "/kontak",
      description: "Informasi kontak dan lokasi kantor",
      pages: [
        { name: "Informasi Kontak", href: "/kontak" },
        { name: "Lokasi Kantor", href: "/kontak#lokasi" },
        { name: "Form Kontak", href: "/kontak#form" },
        { name: "Jam Operasional", href: "/kontak#jam-operasional" }
      ]
    }
  ]

  const legalPages = [
    { name: "Kebijakan Privasi", href: "/privacy", description: "Kebijakan perlindungan data pribadi" },
    { name: "Syarat & Ketentuan", href: "/terms", description: "Ketentuan penggunaan layanan" },
    { name: "Kebijakan Cookie", href: "/cookies", description: "Penggunaan cookie di website" },
    { name: "Sitemap", href: "/sitemap", description: "Peta situs website" }
  ]


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-teal-50/30">
      <SEO seo={seoConfigs.sitemap} />
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <Link href="/">
                <Button variant="outline" className="bg-white/10 text-white border-white/30 hover:bg-white/20">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Kembali ke Beranda
                </Button>
              </Link>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-6">
                <Map className="h-12 w-12 mr-4" />
                <h1 className="text-4xl md:text-5xl font-bold">Sitemap</h1>
              </div>
              <p className="text-xl text-teal-100">
                Peta lengkap halaman dan fitur website AGGRE CAPITAL
              </p>
              <div className="mt-4">
                <Badge variant="outline" className="bg-white/20 text-white border-white/30">
                  Terakhir diperbarui: {new Date().toLocaleDateString('id-ID', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="space-y-12">
            
            {/* Main Pages */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Halaman Utama</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {siteStructure.map((section, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <section.icon className="h-8 w-8 text-teal-600 mr-3" />
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">{section.title}</h3>
                          <p className="text-sm text-gray-600">{section.description}</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        {section.pages.map((page, pageIndex) => (
                          <div key={pageIndex} className="flex items-center justify-between">
                            <Link 
                              href={page.href}
                              className="text-teal-600 hover:text-teal-800 text-sm hover:underline flex items-center"
                            >
                              {page.name}
                              <ExternalLink className="h-3 w-3 ml-1" />
                            </Link>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Legal Pages */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Halaman Legal</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {legalPages.map((page, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-6">
                      <div className="text-center">
                        <FileText className="h-8 w-8 text-teal-600 mx-auto mb-3" />
                        <h3 className="text-lg font-bold text-gray-900 mb-2">{page.name}</h3>
                        <p className="text-sm text-gray-600 mb-4">{page.description}</p>
                        <Link 
                          href={page.href}
                          className="inline-flex items-center text-teal-600 hover:text-teal-800 text-sm hover:underline"
                        >
                          Buka Halaman
                          <ExternalLink className="h-3 w-3 ml-1" />
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>


            {/* Quick Links */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Quick Links</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { name: "Beranda", href: "/", icon: Home },
                  { name: "Pengajuan", href: "/pengajuan", icon: CreditCard },
                  { name: "Tim Kami", href: "/team", icon: Users },
                  { name: "Berita", href: "/news", icon: FileText },
                  { name: "Testimoni", href: "/testimoni", icon: MessageCircle },
                  { name: "Partner", href: "/partners", icon: Building2 },
                  { name: "Kontak", href: "/kontak", icon: Phone },
                  { name: "Login", href: "/login", icon: Mail }
                ].map((link, index) => (
                  <Link
                    key={index}
                    href={link.href}
                    className="flex items-center p-4 bg-white rounded-lg border border-gray-200 hover:border-teal-300 hover:shadow-md transition-all duration-300 group"
                  >
                    <link.icon className="h-5 w-5 text-teal-600 mr-3 group-hover:text-teal-800" />
                    <span className="text-gray-700 group-hover:text-teal-800 font-medium">{link.name}</span>
                  </Link>
                ))}
              </div>
            </section>

            {/* Footer Info */}
            <section className="bg-gray-50 rounded-lg p-8">
              <div className="text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Butuh Bantuan?</h3>
                <p className="text-gray-600 mb-6">
                  Jika Anda tidak dapat menemukan halaman yang Anda cari, silakan hubungi tim kami.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/kontak"
                    className="inline-flex items-center px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Hubungi Kami
                  </Link>
                  <Link
                    href="/pengajuan"
                    className="inline-flex items-center px-6 py-3 border border-teal-600 text-teal-600 rounded-lg hover:bg-teal-50 transition-colors"
                  >
                    <CreditCard className="h-4 w-4 mr-2" />
                    Ajukan Pendanaan
                  </Link>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
