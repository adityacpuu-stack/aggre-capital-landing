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
      <header className="bg-gradient-to-br from-gray-900 to-gray-800 shadow-sm border-b transition-all duration-300">
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
            <nav className="hidden md:flex items-center space-x-8">
              {[
                { name: "Layanan", href: "#layanan" },
                { name: "Keunggulan", href: "#keunggulan" },
                { name: "Tim Kami", href: "/team" },
                { name: "News", href: "/news" },
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
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-teal-50 via-lime-50 to-emerald-50 py-20 md:py-32 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-lime-200/30 to-teal-200/30 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-teal-200/20 to-lime-200/20 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 animate-fade-in-up">
              <div className="space-y-6">
                <Badge className="bg-gradient-to-r from-lime-500 to-lime-400 text-white px-6 py-3 text-sm font-semibold shadow-lg animate-bounce-subtle">
                  <Zap className="w-4 h-4 mr-2" />
                  FAST & RELIABLE
                </Badge>

                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                  <span className="block text-gray-900 animate-slide-in-left">Ajukan</span>
                  <span
                    className="block bg-gradient-to-r from-teal-700 via-teal-600 to-lime-600 bg-clip-text text-transparent animate-slide-in-right"
                    style={{ animationDelay: "0.2s" }}
                  >
                    PENDANAAN
                  </span>
                  <span
                    className="block bg-gradient-to-r from-lime-600 via-teal-600 to-teal-700 bg-clip-text text-transparent animate-slide-in-left"
                    style={{ animationDelay: "0.4s" }}
                  >
                    MULTIGUNA
                  </span>
                </h1>

                <p
                  className="text-xl md:text-2xl text-gray-600 leading-relaxed animate-fade-in"
                  style={{ animationDelay: "0.6s" }}
                >
                  Proses Cepat dan Mudah! Bisa Balloon Payment & Installment 60 Bulan
                </p>

                {/* Feature Points */}
                <div className="space-y-4">
                  {[
                    "Limit Pendanaan Besar Mulai Rp 100 juta",
                    "Proses Cepat dan Mudah!",
                    "Bisa Balloon Payment & Installment 60 Bulan",
                  ].map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-4 animate-slide-in-right"
                      style={{ animationDelay: `${0.8 + index * 0.2}s` }}
                    >
                      <div className="bg-gradient-to-r from-lime-500 to-lime-400 p-2 rounded-full shadow-lg">
                        <CheckCircle className="h-5 w-5 text-white" />
                      </div>
                      <p className="text-lg font-medium text-gray-700">{feature}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-6 animate-fade-in-up" style={{ animationDelay: "1.4s" }}>
                <Link href="/pengajuan">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-lg px-10 py-4 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 group"
                  >
                    <span>Ajukan Pendanaan</span>
                    <ArrowRight className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-2" />
                  </Button>
                </Link>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-teal-600 text-gray-900 hover:bg-teal-600 hover:text-white text-lg px-10 py-4 bg-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 font-bold"
                >
                  Konsultasi Gratis
                </Button>
              </div>
            </div>

            <div className="relative animate-fade-in-right" style={{ animationDelay: "0.8s" }}>
              <div className="relative z-10">
                <Image
                  src="/images/landing.jpg"
                  alt="AGGRE CAPITAL Loan Services"
                  width={600}
                  height={500}
                  className="rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-500"
                />
                {/* Floating Elements */}
                <div className="absolute -top-6 -left-6 bg-gradient-to-r from-lime-400 to-lime-500 p-4 rounded-2xl shadow-xl animate-float">
                  <TrendingUp className="h-8 w-8 text-white" />
                </div>
                <div
                  className="absolute -bottom-6 -right-6 bg-gradient-to-r from-teal-500 to-teal-600 p-4 rounded-2xl shadow-xl animate-float"
                  style={{ animationDelay: "1s" }}
                >
                  <Shield className="h-8 w-8 text-white" />
                </div>
              </div>
              {/* Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-lime-200/50 to-teal-200/50 rounded-2xl blur-2xl transform scale-110 -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section id="layanan" className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-50/50 to-transparent"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Dapatkan Dana dari{" "}
              <span className="bg-gradient-to-r from-teal-600 to-lime-600 bg-clip-text text-transparent">
                Propertimu
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              AGGRE CAPITAL memberikan solusi untuk mengakses pendanaan dari properti dengan aman, cepat, dan nyaman
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Users,
                title: "Satu Pintu, Banyak Kemudahan",
                description: "Layanan terintegrasi untuk semua kebutuhan pendanaan Anda",
                color: "from-teal-500 to-teal-600",
                bgColor: "from-teal-50 to-teal-100",
              },
              {
                icon: Banknote,
                title: "Limit Sesuai Kebutuhanmu",
                description: "Pinjaman mulai Rp100 juta sesuai dengan kebutuhan Anda",
                color: "from-green-500 to-green-600",
                bgColor: "from-green-50 to-green-100",
              },
              {
                icon: Timer,
                title: "Proses Cepat",
                description: "Persetujuan Maksimal 1 Minggu dengan proses yang efisien",
                color: "from-orange-500 to-orange-600",
                bgColor: "from-orange-50 to-orange-100",
              },
              {
                icon: Award,
                title: "Penawaran Terbaik",
                description: "Solusi pendanaan dengan terms dan kondisi terbaik",
                color: "from-purple-500 to-purple-600",
                bgColor: "from-purple-50 to-purple-100",
              },
            ].map((item, index) => (
              <Card
                key={index}
                className="group text-center p-8 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0 bg-gradient-to-br from-white to-gray-50 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <CardContent className="space-y-6">
                  <div
                    className={`bg-gradient-to-br ${item.color} w-20 h-20 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-all duration-300 shadow-lg`}
                  >
                    <item.icon className={`h-10 w-10 text-white`} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-teal-700 transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="keunggulan" className="py-20 bg-gradient-to-br from-gray-50 to-teal-50/30 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-lime-200/20 to-teal-200/20 rounded-full blur-3xl animate-pulse"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Mengapa Mengajukan Pendanaan di{" "}
              <span className="bg-gradient-to-r from-teal-600 to-lime-600 bg-clip-text text-transparent">
                AGGRE CAPITAL?
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
              <Card
                key={index}
                className="group p-8 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border-0 bg-white/80 backdrop-blur-sm animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="space-y-6">
                  <div className="relative">
                    <div
                      className={`bg-gradient-to-r ${item.color} w-16 h-16 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-300`}
                    >
                      <item.icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-lime-400/20 to-teal-400/20 rounded-xl scale-0 group-hover:scale-150 transition-transform duration-500 -z-10"></div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-teal-700 transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-teal-50/30 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-lime-200/20 to-teal-200/20 rounded-full blur-3xl animate-pulse"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Meet Our{" "}
              <span className="bg-gradient-to-r from-teal-600 to-lime-600 bg-clip-text text-transparent">
                Leadership Team
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Tim berpengalaman yang berkomitmen memberikan solusi keuangan terbaik untuk Anda
            </p>
          </div>

          {/* Plus-shaped Team Layout */}
          <div className="relative max-w-6xl mx-auto">
            {/* Main Plus Shape Container */}
            <div className="relative bg-gradient-to-br from-lime-400 via-lime-300 to-lime-500 rounded-[4rem] p-12 shadow-2xl">
              
              {/* Team Photos Container */}
              <div className="flex justify-center items-center space-x-16 mb-8">
                {/* Rian Photo */}
                <div className="relative">
                  <div className="w-48 h-64 rounded-3xl overflow-hidden shadow-xl ring-8 ring-white/30">
                    <Image
                      src="/images/rians.png"
                      alt="Rian - Founder & CEO"
                      width={300}
                      height={400}
                      className="w-full h-full object-cover object-[center_25%] scale-110"
                    />
                  </div>
                </div>
                
                {/* Silverster Photo */}
                <div className="relative">
                  <div className="w-48 h-64 rounded-3xl overflow-hidden shadow-xl ring-8 ring-white/30">
                    <Image
                      src="/images/adi.png"
                      alt="Silverster - CO-Founder & COO"
                      width={300}
                      height={400}
                      className="w-full h-full object-cover object-[center_30%]"
                    />
                  </div>
                </div>
              </div>

              {/* Info Cards Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Rian Info Card */}
                <div className="bg-lime-300/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Rian</h3>
                  <p className="text-gray-800 font-medium mb-4">
                    Lebih dari 10 tahun di Institusi Keuangan
                  </p>
                  <div className="bg-white rounded-full px-6 py-2 inline-block shadow-md">
                    <span className="text-gray-900 font-bold text-lg">FOUNDER</span>
                  </div>
                </div>

                {/* Silverster Info Card */}
                <div className="bg-lime-300/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Silverster</h3>
                  <p className="text-gray-800 font-medium mb-4">
                    Lebih dari 10 tahun di Institusi Keuangan & Fintech
                  </p>
                  <div className="bg-white rounded-full px-6 py-2 inline-block shadow-md">
                    <span className="text-gray-900 font-bold text-lg">CO-FOUNDER</span>
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-white rounded-full opacity-70"></div>
              <div className="absolute -top-2 -right-6 w-6 h-6 bg-white rounded-full opacity-50"></div>
              <div className="absolute -bottom-3 left-1/3 w-10 h-10 bg-white rounded-full opacity-60"></div>
              <div className="absolute -bottom-6 -right-2 w-12 h-12 bg-white rounded-full opacity-40"></div>
            </div>

            {/* Background Decorative Elements */}
            <div className="absolute -inset-8">
              <div className="absolute top-10 -left-6 w-20 h-20 bg-lime-200/30 rounded-full blur-xl"></div>
              <div className="absolute -top-4 right-10 w-16 h-16 bg-teal-200/40 rounded-full blur-lg"></div>
              <div className="absolute -bottom-8 left-1/4 w-24 h-24 bg-lime-300/20 rounded-full blur-2xl"></div>
              <div className="absolute bottom-4 -right-8 w-18 h-18 bg-teal-300/30 rounded-full blur-xl"></div>
            </div>
          </div>

          {/* View Full Team Button */}
          <div className="text-center mt-12">
            <Link href="/team">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white px-8 py-3 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                Lihat Profil Lengkap Tim
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimoni" className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-teal-50/30 to-transparent"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Testimoni Pengguna{" "}
              <span className="bg-gradient-to-r from-teal-600 to-lime-600 bg-clip-text text-transparent">
                AGGRE CAPITAL
              </span>
            </h2>
            <p className="text-xl text-gray-600">Solusi Permasalahan Finansial</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.length > 0 ? (
              testimonials.map((testimonial, index) => (
                <Card
                  key={testimonial.id}
                  className="group overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0 bg-gradient-to-br from-white to-gray-50 animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <CardContent className="p-0">
                    <div className="grid grid-cols-1">
                      {/* Photo Section */}
                      <div className="bg-gradient-to-br from-teal-50 to-lime-50 p-8 flex flex-col items-center justify-center text-center">
                        <div className="relative mb-6">
                          <div className="w-32 h-32 rounded-full overflow-hidden shadow-2xl ring-4 ring-white/20">
                            <Image
                              src={testimonial.avatar || "/images/default-avatar.jpg"}
                              alt={`${testimonial.name} - ${testimonial.role}`}
                              width={128}
                              height={128}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                          <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-teal-500 to-teal-600 p-3 rounded-full shadow-lg">
                            <Star className="h-6 w-6 text-white" />
                          </div>
                        </div>
                        
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{testimonial.name}</h3>
                        <p className="text-gray-800 font-medium mb-4">{testimonial.role}</p>
                        
                        {/* Rating Stars */}
                        <div className="flex justify-center space-x-1 mb-4">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < testimonial.rating 
                                  ? 'fill-yellow-400 text-yellow-400' 
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Content Section */}
                      <div className="p-8">
                        <div className="space-y-6">
                          {/* Testimonial Content */}
                          <div className="bg-gradient-to-r from-teal-50 to-lime-50 p-6 rounded-lg relative">
                            <div className="text-4xl text-teal-200 absolute -top-2 -left-2">"</div>
                            <p className="text-gray-700 italic text-base leading-relaxed relative z-10">
                              {testimonial.content}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
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
                <Card
                  key={index}
                  className="group overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0 bg-gradient-to-br from-white to-gray-50 animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <CardContent className="p-0">
                    <div className="grid grid-cols-1">
                      {/* Photo Section */}
                      <div className="bg-gradient-to-br from-teal-50 to-lime-50 p-8 flex flex-col items-center justify-center text-center">
                        <div className="relative mb-6">
                          <div className="w-32 h-32 rounded-full overflow-hidden shadow-2xl ring-4 ring-white/20">
                            <Image
                              src={testimonial.avatar}
                              alt={`${testimonial.name} - ${testimonial.role}`}
                              width={128}
                              height={128}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                          <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-teal-500 to-teal-600 p-3 rounded-full shadow-lg">
                            <Star className="h-6 w-6 text-white" />
                          </div>
                        </div>
                        
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{testimonial.name}</h3>
                        <p className="text-gray-800 font-medium mb-4">{testimonial.role}</p>
                        
                        {/* Rating Stars */}
                        <div className="flex justify-center space-x-1 mb-4">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className="h-4 w-4 fill-yellow-400 text-yellow-400"
                            />
                          ))}
                        </div>
                      </div>

                      {/* Content Section */}
                      <div className="p-8">
                        <div className="space-y-6">
                          {/* Testimonial Content */}
                          <div className="bg-gradient-to-r from-teal-50 to-lime-50 p-6 rounded-lg relative">
                            <div className="text-4xl text-teal-200 absolute -top-2 -left-2">"</div>
                            <p className="text-gray-700 italic text-base leading-relaxed relative z-10">
                              {testimonial.content}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
          
          {/* View All Testimonials Button */}
          <div className="text-center mt-12">
            <Link href="/testimoni">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white px-8 py-3 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                Lihat Semua Testimoni
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-teal-50/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              <span className="bg-gradient-to-r from-teal-600 to-lime-600 bg-clip-text text-transparent">
                Strategic
              </span>{" "}
              Partner
            </h2>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-12">
            {strategicPartners.map((partner, index) => (
              <Card
                key={partner.id}
                className="group p-12 bg-white hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border-0 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <CardContent className="text-center">
                  <div className="relative mb-6">
                    {partner.logo ? (
                      <div className="relative w-32 h-32 mx-auto group-hover:scale-110 transition-all duration-300">
                        <Image
                          src={partner.logo}
                          alt={`${partner.name} ${partner.subtitle} logo`}
                          fill
                          className="object-contain rounded-lg"
                          sizes="128px"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-lime-400/20 to-teal-400/20 rounded-lg scale-0 group-hover:scale-150 transition-transform duration-500"></div>
                      </div>
                    ) : (
                      <>
                        <Building2 className="h-32 w-32 text-teal-600 mx-auto group-hover:scale-110 transition-all duration-300" />
                        <div className="absolute inset-0 bg-gradient-to-r from-lime-400/20 to-teal-400/20 rounded-full scale-0 group-hover:scale-150 transition-transform duration-500"></div>
                      </>
                    )}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 group-hover:text-teal-700 transition-colors duration-300">
                    {partner.name}
                  </h3>
                  <p className="text-xl text-teal-600 font-semibold">{partner.subtitle}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* View Partners Button */}
          <div className="text-center mt-12">
            <Link href="/partners">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white px-8 py-3 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
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
          <div className="max-w-4xl mx-auto space-y-8 animate-fade-in-up">
            <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight">
              Siap Mengajukan <span className="text-lime-400">Pendanaan?</span>
            </h2>
            <p className="text-xl md:text-2xl text-teal-100 leading-relaxed">
              Dapatkan solusi pendanaan terbaik untuk kebutuhan Anda. Proses cepat, aman, dan terpercaya.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
              <Link href="/pengajuan">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-lime-400 to-lime-500 text-teal-800 hover:from-lime-300 hover:to-lime-400 text-xl px-12 py-6 shadow-2xl hover:shadow-lime-500/25 transform hover:scale-105 transition-all duration-300 group font-bold"
                >
                  <span>Ajukan Pendanaan Sekarang</span>
                  <ArrowRight className="ml-3 h-6 w-6 transition-transform group-hover:translate-x-2" />
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-lime-400 text-white hover:bg-lime-400 hover:text-teal-800 text-xl px-12 py-6 bg-white/30 backdrop-blur-sm shadow-2xl hover:shadow-lime-500/25 transform hover:scale-105 transition-all duration-300 font-bold"
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
