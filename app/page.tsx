"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import SEO from "@/components/SEO"
import { seoConfigs } from "@/lib/seo"
import {
  CheckCircle,
  Home,
  GraduationCap,
  Heart,
  AlertTriangle,
  CreditCard,
  Building2,
  Star,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  TrendingUp,
  Shield,
  Zap,
  Users,
  Banknote,
  Timer,
  Award,
  Menu,
  X,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import Footer from "@/components/Footer"

interface Testimonial {
  id: number
  name: string
  role: string
  content: string
  avatar: string
  rating: number
}

interface StrategicPartner {
  id: number
  name: string
  subtitle: string
  logo: string
  established: string
  location: string
  description: string
  services: string[]
  achievements: string[]
  contact: any
  color: string
  type: string
  featured: boolean
  sort_order: number
}

export default function AggreCapitalLanding() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [strategicPartners, setStrategicPartners] = useState<StrategicPartner[]>([])
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch('/api/testimonials/public?featured=true&limit=3')
        const data = await response.json()
        if (data.success) {
          setTestimonials(data.data)
        }
      } catch (error) {
        console.error('Failed to fetch testimonials:', error)
      }
    }

    const fetchStrategicPartners = async () => {
      try {
        const response = await fetch('/api/partners?featured=true')
        const data = await response.json()
        if (data.success) {
          setStrategicPartners(data.data.strategic_partners || [])
        }
      } catch (error) {
        console.error('Failed to fetch strategic partners:', error)
        // Fallback to hardcoded data
        setStrategicPartners([
          { id: 1, name: "BPR OLYMPINDO", subtitle: "SEJAHTERA", logo: "", established: "", location: "", description: "", services: [], achievements: [], contact: {}, color: "from-blue-500 to-blue-600", type: "BPR", featured: true, sort_order: 1 },
          { id: 2, name: "BPR OLYMPINDO", subtitle: "PRIMADANA", logo: "", established: "", location: "", description: "", services: [], achievements: [], contact: {}, color: "from-teal-500 to-teal-600", type: "BPR", featured: true, sort_order: 2 }
        ])
      }
    }

    fetchTestimonials()
    fetchStrategicPartners()
  }, [])
  return (
    <div className="flex flex-col min-h-screen bg-white overflow-x-hidden">
      <SEO seo={seoConfigs.home} />
      {/* Header */}
      <header className="bg-gradient-to-br from-gray-900 to-gray-800 shadow-sm border-b border-white/10 transition-all duration-300">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center group">
              <Image
                src="/images/logo.png"
                alt="AGGRE CAPITAL - LOAN SOLUTIONS"
                width={120}
                height={40}
                className="object-contain transition-all duration-300 group-hover:scale-105"
              />
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {[
                { name: "Layanan", href: "#layanan" },
                { name: "Keunggulan", href: "#keunggulan" },
                { name: "Tim Kami", href: "/team" },
                { name: "FAQ", href: "/faq" },
                { name: "Testimoni", href: "/testimoni" },
                { name: "Kontak", href: "/kontak" }
              ].map((item, index) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="relative text-gray-300 hover:text-lime-400 transition-all duration-300 group py-2"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <span className="relative z-10">{item.name}</span>
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-lime-500 to-teal-500 group-hover:w-full transition-all duration-300"></div>
                </Link>
              ))}
              <Link href="/pengajuan">
                <Button className="bg-gradient-to-r from-lime-500 to-lime-600 hover:from-lime-400 hover:to-lime-500 text-gray-900 font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                  <span>Ajukan Sekarang</span>
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-gray-300 hover:text-lime-400 transition-colors duration-300"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <nav className="md:hidden mt-4 pb-4 border-t border-gray-700">
              <div className="flex flex-col space-y-4 pt-4">
                {[
                  { name: "Layanan", href: "#layanan" },
                  { name: "Keunggulan", href: "#keunggulan" },
                  { name: "Tim Kami", href: "/team" },
                  { name: "FAQ", href: "/faq" },
                  { name: "Testimoni", href: "/testimoni" },
                  { name: "Kontak", href: "/kontak" }
                ].map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-gray-300 hover:text-lime-400 transition-colors duration-300 py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <Link href="/pengajuan" className="mt-4">
                  <Button className="w-full bg-gradient-to-r from-lime-500 to-lime-600 hover:from-lime-400 hover:to-lime-500 text-gray-900 font-semibold">
                    <span>Ajukan Sekarang</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </nav>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-teal-950 to-gray-900 py-20 md:py-36 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-lime-500/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-teal-900/20 rounded-full blur-3xl"></div>
          {/* Grid Pattern */}
          <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '60px 60px'}}></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div className="space-y-6 lg:space-y-8">
              <div className="space-y-4 lg:space-y-6">
                <div className="inline-flex items-center gap-2 bg-lime-400/10 border border-lime-400/30 text-lime-400 px-4 py-2 rounded-full text-sm font-semibold">
                  <Zap className="w-4 h-4" />
                  FAST & RELIABLE
                </div>

                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight">
                  <span className="block text-white">Ajukan</span>
                  <span className="block bg-gradient-to-r from-teal-400 via-teal-300 to-lime-400 bg-clip-text text-transparent">
                    PENDANAAN
                  </span>
                  <span className="block bg-gradient-to-r from-lime-400 via-teal-300 to-teal-400 bg-clip-text text-transparent">
                    MULTIGUNA
                  </span>
                </h1>

                <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 leading-relaxed">
                  Proses Cepat dan Mudah! Bisa Balloon Payment & Installment 60 Bulan
                </p>

                {/* Feature Points */}
                <div className="space-y-3 lg:space-y-4">
                  {[
                    "Limit Pendanaan Besar Mulai Rp 100 juta",
                    "Proses Cepat dan Mudah!",
                    "Bisa Balloon Payment & Installment 60 Bulan",
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="bg-lime-400/20 border border-lime-400/40 p-1.5 rounded-full flex-shrink-0">
                        <CheckCircle className="h-4 w-4 text-lime-400" />
                      </div>
                      <p className="text-sm sm:text-base lg:text-lg font-medium text-gray-200">{feature}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/pengajuan">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto bg-gradient-to-r from-lime-400 to-lime-500 hover:from-lime-300 hover:to-lime-400 text-gray-900 font-bold text-base lg:text-lg px-8 py-4 shadow-xl shadow-lime-500/25 hover:shadow-lime-400/40 transform hover:scale-105 transition-all duration-300 group rounded-xl"
                  >
                    <span>Ajukan Pendanaan</span>
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Button
                  size="lg"
                  className="w-full sm:w-auto border-2 border-white/20 text-white hover:bg-white/10 hover:border-white/40 text-base lg:text-lg px-8 py-4 backdrop-blur-sm transition-all duration-300 rounded-xl bg-white/5"
                >
                  Konsultasi Gratis
                </Button>
              </div>
            </div>

            <div className="relative mt-8 lg:mt-0">
              <div className="relative z-10">
                <Image
                  src="/images/banner.jpg"
                  alt="AGGRE CAPITAL Loan Services"
                  width={600}
                  height={500}
                  className="w-full h-auto rounded-2xl shadow-2xl ring-1 ring-white/10"
                />
                {/* Floating Cards */}
                <div className="absolute -top-4 -left-4 bg-gradient-to-br from-lime-400 to-lime-500 p-3 lg:p-4 rounded-2xl shadow-xl shadow-lime-500/30 animate-float">
                  <TrendingUp className="h-5 w-5 lg:h-8 lg:w-8 text-gray-900" />
                </div>
                <div className="absolute -bottom-4 -right-4 bg-gradient-to-br from-teal-400 to-teal-600 p-3 lg:p-4 rounded-2xl shadow-xl shadow-teal-500/30 animate-float" style={{ animationDelay: "1s" }}>
                  <Shield className="h-5 w-5 lg:h-8 lg:w-8 text-white" />
                </div>
                {/* Floating stat card */}
                <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-3 shadow-xl">
                  <p className="text-white text-xs font-medium">Dana Cair</p>
                  <p className="text-lime-400 text-lg font-black">≤ 1 Minggu</p>
                </div>
              </div>
              {/* Glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-teal-500/20 to-lime-500/20 rounded-2xl blur-3xl scale-110 -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-gradient-to-r from-teal-600 to-teal-700 py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: "500+", label: "Nasabah Terlayani", icon: Users },
              { value: "Rp 50M+", label: "Dana Disalurkan", icon: Banknote },
              { value: "10+", label: "Tahun Pengalaman", icon: Award },
              { value: "≤ 1 Minggu", label: "Proses Persetujuan", icon: Timer },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center space-y-2">
                <stat.icon className="h-6 w-6 text-lime-300" />
                <p className="text-2xl md:text-3xl font-black text-white">{stat.value}</p>
                <p className="text-sm text-teal-100">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section id="layanan" className="py-24 bg-gradient-to-br from-gray-900 via-slate-900 to-gray-950 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '60px 60px' }}></div>
        </div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <span className="inline-block text-lime-400 font-semibold text-sm uppercase tracking-widest mb-4 bg-lime-400/10 border border-lime-400/20 px-4 py-2 rounded-full">Layanan Kami</span>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
              Dapatkan Dana dari{" "}
              <span className="bg-gradient-to-r from-teal-400 to-lime-400 bg-clip-text text-transparent">
                Propertimu
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              AGGRE CAPITAL memberikan solusi untuk mengakses pendanaan dari properti dengan aman, cepat, dan nyaman
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Users,
                title: "Satu Pintu, Banyak Kemudahan",
                description: "Layanan terintegrasi untuk semua kebutuhan pendanaan Anda",
                color: "from-teal-500 to-teal-600",
                accent: "border-t-teal-400",
              },
              {
                icon: Banknote,
                title: "Limit Sesuai Kebutuhanmu",
                description: "Pinjaman mulai Rp100 juta sesuai dengan kebutuhan Anda",
                color: "from-green-500 to-green-600",
                accent: "border-t-green-400",
              },
              {
                icon: Timer,
                title: "Proses Cepat",
                description: "Persetujuan Maksimal 1 Minggu dengan proses yang efisien",
                color: "from-orange-500 to-orange-600",
                accent: "border-t-orange-400",
              },
              {
                icon: Award,
                title: "Penawaran Terbaik",
                description: "Solusi pendanaan dengan terms dan kondisi terbaik",
                color: "from-purple-500 to-purple-600",
                accent: "border-t-purple-400",
              },
            ].map((item, index) => (
              <div
                key={index}
                className={`group p-8 rounded-2xl bg-white/5 border border-white/10 border-t-2 ${item.accent} hover:bg-white/10 hover:border-white/20 transition-all duration-500 hover:-translate-y-2 backdrop-blur-sm`}
              >
                <div className={`bg-gradient-to-br ${item.color} w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-300 shadow-lg`}>
                  <item.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-3 group-hover:text-lime-400 transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-gray-400 leading-relaxed text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="keunggulan" className="py-24 bg-gradient-to-br from-slate-900 via-gray-900 to-teal-950 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-lime-500/10 rounded-full blur-3xl"></div>
          <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '60px 60px'}}></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <span className="inline-block text-lime-400 font-semibold text-sm uppercase tracking-widest mb-4 bg-lime-400/10 border border-lime-400/30 px-4 py-2 rounded-full">Keunggulan</span>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              Mengapa Mengajukan Pendanaan di{" "}
              <span className="bg-gradient-to-r from-teal-400 to-lime-400 bg-clip-text text-transparent">
                AGGRE CAPITAL?
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Building2,
                title: "Modal Usaha",
                description: "Kembangkan bisnis Anda dengan modal yang cukup untuk ekspansi dan operasional",
                color: "from-teal-500 to-teal-600",
              },
              {
                icon: Home,
                title: "Renovasi",
                description: "Wujudkan rumah impian dengan dana renovasi yang fleksibel",
                color: "from-green-500 to-green-600",
              },
              {
                icon: GraduationCap,
                title: "Biaya Pendidikan",
                description: "Investasi terbaik untuk masa depan dengan pendanaan pendidikan",
                color: "from-purple-500 to-purple-600",
              },
              {
                icon: AlertTriangle,
                title: "Kondisi Darurat",
                description: "Solusi cepat untuk kebutuhan mendesak dengan proses yang mudah",
                color: "from-red-500 to-red-600",
              },
              {
                icon: CreditCard,
                title: "Melunasi Hutang Bunga Tinggi",
                description: "Konsolidasi hutang dengan bunga yang lebih kompetitif",
                color: "from-yellow-500 to-yellow-600",
              },
              {
                icon: Heart,
                title: "Biaya Pernikahan",
                description: "Wujudkan pernikahan impian dengan pendanaan yang fleksibel",
                color: "from-pink-500 to-pink-600",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="group p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-500 hover:-translate-y-2 backdrop-blur-sm"
              >
                <div className={`bg-gradient-to-r ${item.color} w-14 h-14 rounded-xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-all duration-300`}>
                  <item.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-lime-400 transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-gray-400 leading-relaxed text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900 relative overflow-hidden">
        {/* Background grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '60px 60px' }}></div>
        </div>
        <div className="absolute top-20 right-20 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-lime-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16 animate-fade-in-up">
            <span className="inline-block text-xs font-bold tracking-widest text-lime-400 uppercase mb-4 bg-lime-400/10 px-4 py-2 rounded-full border border-lime-400/20">
              TIM KAMI
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Meet Our{" "}
              <span className="bg-gradient-to-r from-teal-400 to-lime-400 bg-clip-text text-transparent">
                Leadership Team
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Tim berpengalaman yang berkomitmen memberikan solusi keuangan terbaik untuk Anda
            </p>
          </div>

          {/* Team Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Rian Card */}
            <div className="group relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 hover:border-white/20 transition-all duration-500 hover:-translate-y-2 backdrop-blur-sm">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-400 to-lime-400"></div>
              <div className="p-8 flex flex-col items-center text-center">
                <div className="w-40 h-52 rounded-xl overflow-hidden shadow-xl ring-2 ring-teal-400/30 mb-6 group-hover:ring-teal-400/60 transition-all duration-300">
                  <Image
                    src="/images/rians.png"
                    alt="Rian - Founder"
                    width={300}
                    height={400}
                    className="w-full h-full object-cover object-[center_25%] scale-110 group-hover:scale-115 transition-transform duration-500"
                  />
                </div>
                <div className="inline-block bg-gradient-to-r from-teal-400/20 to-lime-400/20 border border-teal-400/30 rounded-full px-5 py-1.5 mb-3">
                  <span className="text-lime-400 font-bold text-sm tracking-widest">FOUNDER</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Rian</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Lebih dari 10 tahun di Institusi Keuangan
                </p>
              </div>
            </div>

            {/* Silvester Card */}
            <div className="group relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 hover:border-white/20 transition-all duration-500 hover:-translate-y-2 backdrop-blur-sm">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-lime-400 to-teal-400"></div>
              <div className="p-8 flex flex-col items-center text-center">
                <div className="w-40 h-52 rounded-xl overflow-hidden shadow-xl ring-2 ring-lime-400/30 mb-6 group-hover:ring-lime-400/60 transition-all duration-300">
                  <Image
                    src="/images/adi.png"
                    alt="Silvester - CO-Founder"
                    width={300}
                    height={400}
                    className="w-full h-full object-cover object-[center_30%] group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="inline-block bg-gradient-to-r from-lime-400/20 to-teal-400/20 border border-lime-400/30 rounded-full px-5 py-1.5 mb-3">
                  <span className="text-lime-400 font-bold text-sm tracking-widest">CO-FOUNDER</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Silvester</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Lebih dari 10 tahun di Institusi Keuangan &amp; Fintech
                </p>
              </div>
            </div>
          </div>

          {/* View Full Team Button */}
          <div className="text-center mt-12">
            <Link href="/team">
              <Button
                size="lg"
                className="bg-white/5 border border-white/20 text-white hover:bg-white/10 hover:border-white/30 px-8 py-3 font-semibold transition-all duration-300"
              >
                Lihat Profil Lengkap Tim
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimoni" className="py-20 bg-gradient-to-br from-slate-900 via-teal-950 to-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '60px 60px' }}></div>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16 animate-fade-in-up">
            <span className="inline-block text-xs font-bold tracking-widest text-lime-400 uppercase mb-4 bg-lime-400/10 px-4 py-2 rounded-full border border-lime-400/20">
              TESTIMONI
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Testimoni Pengguna{" "}
              <span className="bg-gradient-to-r from-teal-400 to-lime-400 bg-clip-text text-transparent">
                AGGRE CAPITAL
              </span>
            </h2>
            <p className="text-xl text-gray-400">Solusi Permasalahan Finansial</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.length > 0 ? (
              testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className="group relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 hover:border-white/20 transition-all duration-500 hover:-translate-y-2 backdrop-blur-sm animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal-400/50 to-transparent"></div>
                  <div className="p-8 flex flex-col items-center text-center">
                    <div className="relative mb-5">
                      <div className="w-24 h-24 rounded-full overflow-hidden ring-2 ring-teal-400/30 group-hover:ring-teal-400/60 transition-all duration-300">
                        <Image
                          src={testimonial.avatar || "/images/default-avatar.jpg"}
                          alt={`${testimonial.name} - ${testimonial.role}`}
                          width={96}
                          height={96}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    </div>
                    <div className="flex justify-center space-x-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < testimonial.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'}`}
                        />
                      ))}
                    </div>
                    <h3 className="text-lg font-bold text-white mb-1">{testimonial.name}</h3>
                    <p className="text-lime-400 text-sm font-medium mb-5">{testimonial.role}</p>
                    <div className="relative">
                      <span className="text-5xl text-teal-400/30 absolute -top-3 -left-1 font-serif leading-none">"</span>
                      <p className="text-gray-400 italic text-sm leading-relaxed relative z-10 px-4">
                        {testimonial.content}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              // Fallback testimonials jika API belum tersedia
              [
                {
                  name: "Bapak Angga",
                  role: "Pengusaha",
                  avatar: "/images/customer-angga.jpg",
                  content: "Awalnya saya sempat ragu mengingat riwayat pinjaman saya sebelumnya. Tetapi, Tim Aggre sangat ramah dan sabar dalam mencari solusi permasalahan saya. Saya bersyukur pinjaman saya akhirnya disetujui dan cair",
                  rating: 5
                },
                {
                  name: "Ibu Mita",
                  role: "Ibu Rumah Tangga",
                  avatar: "/images/customer-mita.jpg",
                  content: "Tim Aggre sangat membantu dari proses awal sampai dana cair. Proses pengajuan lebih terarah dan komunikasi yang baik membuat saya merasa nyaman",
                  rating: 5
                },
                {
                  name: "Ibu Usy",
                  role: "Pemilik Usaha",
                  avatar: "/images/customer-usy.jpg",
                  content: "Berkat bantuan Aggre usaha tambah maju, dibantu pendanaan usaha yang sesuai dengan kebutuhan saya. Terima kasih AGGRE CAPITAL!",
                  rating: 5
                },
              ].map((testimonial, index) => (
                <div
                  key={index}
                  className="group relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 hover:border-white/20 transition-all duration-500 hover:-translate-y-2 backdrop-blur-sm animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal-400/50 to-transparent"></div>
                  <div className="p-8 flex flex-col items-center text-center">
                    <div className="relative mb-5">
                      <div className="w-24 h-24 rounded-full overflow-hidden ring-2 ring-teal-400/30 group-hover:ring-teal-400/60 transition-all duration-300">
                        <Image
                          src={testimonial.avatar}
                          alt={`${testimonial.name} - ${testimonial.role}`}
                          width={96}
                          height={96}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    </div>
                    <div className="flex justify-center space-x-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <h3 className="text-lg font-bold text-white mb-1">{testimonial.name}</h3>
                    <p className="text-lime-400 text-sm font-medium mb-5">{testimonial.role}</p>
                    <div className="relative">
                      <span className="text-5xl text-teal-400/30 absolute -top-3 -left-1 font-serif leading-none">"</span>
                      <p className="text-gray-400 italic text-sm leading-relaxed relative z-10 px-4">
                        {testimonial.content}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          
          {/* View All Testimonials Button */}
          <div className="text-center mt-12">
            <Link href="/testimoni">
              <Button
                size="lg"
                className="bg-white/5 border border-white/20 text-white hover:bg-white/10 hover:border-white/30 px-8 py-3 font-semibold transition-all duration-300"
              >
                Lihat Semua Testimoni
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-20 bg-gradient-to-br from-gray-950 via-slate-900 to-gray-950 relative overflow-hidden">
        {/* Subtle grid */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '60px 60px' }}></div>
        </div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-transparent via-teal-500/20 to-transparent"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16 animate-fade-in-up">
            <span className="inline-block text-xs font-bold tracking-widest text-lime-400 uppercase mb-4 bg-lime-400/10 px-4 py-2 rounded-full border border-lime-400/20">
              MITRA STRATEGIS
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              <span className="bg-gradient-to-r from-teal-400 to-lime-400 bg-clip-text text-transparent">
                Strategic
              </span>{" "}
              Partner
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Didukung oleh institusi keuangan terpercaya untuk memberikan layanan terbaik
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            {strategicPartners.map((partner, index) => (
              <div
                key={partner.id}
                className="group relative bg-white/5 border border-white/10 rounded-2xl p-10 hover:bg-white/10 hover:border-white/20 transition-all duration-500 hover:-translate-y-2 backdrop-blur-sm animate-fade-in-up min-w-[260px]"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal-400/50 to-transparent"></div>
                <div className="text-center">
                  <div className="relative mb-6">
                    {partner.logo ? (
                      <div className="relative w-28 h-28 mx-auto group-hover:scale-110 transition-all duration-300">
                        <Image
                          src={partner.logo}
                          alt={`${partner.name} ${partner.subtitle} logo`}
                          fill
                          className="object-contain rounded-lg"
                          sizes="112px"
                        />
                      </div>
                    ) : (
                      <div className="w-28 h-28 mx-auto bg-gradient-to-br from-teal-500/20 to-lime-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-all duration-300 border border-teal-400/20">
                        <Building2 className="h-14 w-14 text-teal-400" />
                      </div>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-white group-hover:text-teal-400 transition-colors duration-300 mb-1">
                    {partner.name}
                  </h3>
                  <p className="text-lime-400 font-semibold text-sm">{partner.subtitle}</p>
                </div>
              </div>
            ))}
          </div>

          {/* View Partners Button */}
          <div className="text-center mt-12">
            <Link href="/partners">
              <Button
                size="lg"
                className="bg-white/5 border border-white/20 text-white hover:bg-white/10 hover:border-white/30 px-8 py-3 font-semibold transition-all duration-300"
              >
                Lihat Detail Partner
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-teal-600 via-teal-700 to-teal-800 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-lime-500/10 to-transparent animate-pulse"></div>
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-lime-400/20 rounded-full blur-3xl animate-float"></div>
          <div
            className="absolute -bottom-40 -left-40 w-96 h-96 bg-teal-400/20 rounded-full blur-3xl animate-float"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto space-y-6 lg:space-y-8 animate-fade-in-up">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-white leading-tight">
              Siap Mengajukan <span className="text-lime-400">Pendanaan?</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-teal-100 leading-relaxed">
              Dapatkan solusi pendanaan terbaik untuk kebutuhan Anda. Proses cepat, aman, dan terpercaya.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 lg:gap-6 justify-center pt-6 lg:pt-8">
              <Link href="/pengajuan">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-gradient-to-r from-lime-400 to-lime-500 text-teal-800 hover:from-lime-300 hover:to-lime-400 text-base sm:text-lg lg:text-xl px-8 lg:px-12 py-4 lg:py-6 shadow-2xl hover:shadow-lime-500/25 transform hover:scale-105 transition-all duration-300 group font-bold"
                >
                  <span>Ajukan Pendanaan Sekarang</span>
                  <ArrowRight className="ml-2 lg:ml-3 h-4 w-4 lg:h-6 lg:w-6 transition-transform group-hover:translate-x-2" />
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-2 border-lime-400 text-white hover:bg-lime-400 hover:text-teal-800 text-base sm:text-lg lg:text-xl px-8 lg:px-12 py-4 lg:py-6 bg-white/30 backdrop-blur-sm shadow-2xl hover:shadow-lime-500/25 transform hover:scale-105 transition-all duration-300 font-bold"
              >
                Konsultasi Gratis
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
