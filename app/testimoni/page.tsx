"use client"

import { useState, useEffect } from "react"
import { apiClient } from "@/lib/api-client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Star, Quote, User, Briefcase, Home, Building2, Heart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function TestimoniPage() {
  const [testimonials, setTestimonials] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTestimonials()
  }, [])

  const fetchTestimonials = async () => {
    try {
      const result = await apiClient.getTestimonials()
      if (result.success && result.data && Array.isArray(result.data) && result.data.length > 0) {
        const transformedData = transformTestimonials(result.data as any[])
        setTestimonials(transformedData)
      } else {
        setTestimonials(staticTestimonials)
      }
    } catch (error) {
      // Fallback to static data if API fails
      setTestimonials(staticTestimonials)
    } finally {
      setLoading(false)
    }
  }

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Briefcase': return Briefcase
      case 'Home': return Home
      case 'Building2': return Building2
      case 'Heart': return Heart
      default: return User
    }
  }

  // Transform data from database to match frontend expectations
  const transformTestimonials = (testimonials: any[]) => {
    return testimonials.map(testimonial => ({
      ...testimonial,
      icon: testimonial.icon || 'User', // Ensure icon is always a string
      rating: parseInt(testimonial.rating) || 5, // Ensure rating is a number
      loan_amount_numeric: parseInt(testimonial.loan_amount_numeric) || 0
    }))
  }
  const staticTestimonials = [
    {
      id: 1,
      name: "Bapak Angga",
      role: "Pengusaha",
      avatar: "/images/avatar-1.jpg",
      content: "Awalnya saya sempat ragu mengingat riwayat pinjaman saya sebelumnya. Tetapi, Tim Aggre sangat ramah dan sabar dalam mencari solusi permasalahan saya. Saya bersyukur pinjaman saya akhirnya disetujui dan cair",
      rating: 5,
      category: "Modal Usaha",
      amount: "Rp 250 juta",
      icon: Briefcase,
      color: "from-blue-500 to-blue-600"
    },
    {
      id: 2,
      name: "Ibu Mita",
      role: "Ibu Rumah Tangga",
      avatar: "/images/avatar-2.jpg",
      content: "Tim Aggre sangat membantu dari proses awal sampai dana cair. Proses pengajuan lebih terarah dan komunikasi yang baik membuat saya merasa nyaman",
      rating: 5,
      category: "Renovasi Rumah",
      amount: "Rp 150 juta",
      icon: Home,
      color: "from-green-500 to-green-600"
    },
    {
      id: 3,
      name: "Ibu Usy",
      role: "Pemilik Usaha",
      avatar: "/images/avatar-3.jpg",
      content: "Berkat bantuan Aggre usaha tambah maju, dibantu pendanaan usaha yang sesuai dengan kebutuhan saya. Terima kasih AGGRE CAPITAL!",
      rating: 5,
      category: "Pengembangan Usaha",
      amount: "Rp 300 juta",
      icon: Building2,
      color: "from-purple-500 to-purple-600"
    },
    {
      id: 4,
      name: "Bapak Rudi",
      role: "Karyawan Swasta",
      avatar: "/images/avatar-4.jpg",
      content: "Prosesnya sangat cepat dan mudah dipahami. Tim customer service selalu responsif menjawab pertanyaan saya. Dalam waktu 1 minggu dana sudah cair. Sangat membantu untuk kebutuhan mendesak saya.",
      rating: 5,
      category: "Dana Darurat",
      amount: "Rp 100 juta",
      icon: User,
      color: "from-red-500 to-red-600"
    },
    {
      id: 5,
      name: "Ibu Sari",
      role: "Pedagang",
      avatar: "/images/avatar-5.jpg",
      content: "Saya sudah mencoba beberapa tempat pinjaman tapi tidak ada yang cocok. Di Aggre Capital, prosesnya transparan dan tidak ada biaya tersembunyi. Sangat direkomendasikan untuk yang butuh pendanaan cepat.",
      rating: 5,
      category: "Modal Usaha",
      amount: "Rp 200 juta",
      icon: Briefcase,
      color: "from-teal-500 to-teal-600"
    },
    {
      id: 6,
      name: "Bapak Doni",
      role: "Wiraswasta",
      avatar: "/images/avatar-6.jpg",
      content: "Tim Aggre membantu saya untuk take over pinjaman dari bank lain dengan bunga yang lebih kompetitif. Cicilan per bulan jadi lebih ringan dan prosesnya tidak berbelit-belit.",
      rating: 5,
      category: "Take Over",
      amount: "Rp 400 juta",
      icon: Building2,
      color: "from-orange-500 to-orange-600"
    },
    {
      id: 7,
      name: "Ibu Fitri",
      role: "Ibu Rumah Tangga",
      avatar: "/images/avatar-7.jpg",
      content: "Alhamdulillah, dengan bantuan Aggre Capital pernikahan anak saya bisa terlaksana dengan lancar. Prosesnya cepat dan pelayanannya sangat baik. Tim nya profesional dan terpercaya.",
      rating: 5,
      category: "Dana Pernikahan",
      amount: "Rp 180 juta",
      icon: Heart,
      color: "from-pink-500 to-pink-600"
    },
    {
      id: 8,
      name: "Bapak Joko",
      role: "Pegawai Negeri",
      avatar: "/images/avatar-8.jpg",
      content: "Untuk biaya pendidikan anak, Aggre Capital memberikan solusi terbaik. Bunga kompetitif dan tenor yang fleksibel sesuai kemampuan bayar saya. Highly recommended!",
      rating: 5,
      category: "Dana Pendidikan",
      amount: "Rp 120 juta",
      icon: User,
      color: "from-indigo-500 to-indigo-600"
    }
  ]

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-teal-50 via-lime-50 to-emerald-50">
      {/* Header */}
      <header className="bg-gradient-to-br from-gray-900 to-gray-800 shadow-sm border-b transition-all duration-300">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center group">
              <Image
                src="/images/logo.png"
                alt="AGGRE CAPITAL - LOAN SOLUTIONS"
                width={120}
                height={40}
                className="object-contain transition-all duration-300 group-hover:scale-105"
              />
            </Link>
            <Link 
              href="/"
              className="flex items-center space-x-2 text-gray-300 hover:text-lime-400 transition-colors duration-300"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="font-medium">Kembali ke Beranda</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-gradient-to-r from-teal-500 to-teal-600 p-3 rounded-full">
                <Quote className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Testimoni Pengguna{" "}
              <span className="bg-gradient-to-r from-teal-600 to-lime-600 bg-clip-text text-transparent">
                AGGRE CAPITAL
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Solusi Permasalahan Finansial - Kepercayaan dan kepuasan nasabah adalah prioritas utama kami
            </p>
            
            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-6 mb-12">
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                <div className="text-3xl font-bold text-teal-600">500+</div>
                <div className="text-sm text-gray-600">Nasabah Terlayani</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                <div className="text-3xl font-bold text-lime-600">98%</div>
                <div className="text-sm text-gray-600">Tingkat Kepuasan</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                <div className="text-3xl font-bold text-teal-600">4.9</div>
                <div className="text-sm text-gray-600">Rating Rata-rata</div>
              </div>
            </div>
          </div>

          {/* Loading State */}
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <div className="text-center">
                <div className="animate-spin w-12 h-12 border-4 border-teal-600 border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-gray-600">Loading testimonials...</p>
              </div>
            </div>
          ) : (
            <>
              {/* Testimonials Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {testimonials.map((testimonial, index) => {
                  const IconComponent = getIcon(testimonial.icon)
                  return (
                    <Card
                      key={testimonial.id}
                      className="group overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0 bg-gradient-to-br from-white to-gray-50 animate-fade-in-up"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <CardContent className="p-0">
                        <div className="grid grid-cols-1">
                          {/* Photo Section */}
                          <div className="bg-gradient-to-br from-teal-50 to-lime-50 p-8 flex flex-col items-center justify-center text-center">
                            <div className="relative mb-6">
                              <div className="w-32 h-32 rounded-full overflow-hidden shadow-2xl ring-4 ring-white/20">
                                {testimonial.avatar ? (
                                  <Image
                                    src={testimonial.avatar}
                                    alt={testimonial.name}
                                    width={128}
                                    height={128}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                  />
                                ) : (
                                  <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                                    <User className="h-12 w-12 text-gray-500" />
                                  </div>
                                )}
                              </div>
                              <div className={`absolute -bottom-2 -right-2 bg-gradient-to-r ${testimonial.color} p-3 rounded-full shadow-lg`}>
                                <IconComponent className="h-6 w-6 text-white" />
                              </div>
                            </div>
                            
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">{testimonial.name}</h3>
                            <p className="text-gray-800 font-medium mb-2">{testimonial.role}</p>
                            
                            {/* Category Badge */}
                            <Badge 
                              className={`bg-gradient-to-r ${testimonial.color} text-white text-sm px-4 py-2 mb-4`}
                            >
                              {testimonial.category}
                            </Badge>
                            
                            {/* Rating Stars */}
                            <div className="flex justify-center space-x-1 mb-2">
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
                            
                            {/* Amount */}
                            <p className="text-sm text-gray-600 font-medium">{testimonial.amount}</p>
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
                              
                              {/* Verified Badge */}
                              <div className="text-center">
                                <div className="inline-flex items-center space-x-2 text-sm text-gray-500">
                                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                  <span>Verified Customer</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>

              {/* CTA Section */}
              <div className="text-center">
                <Card className="shadow-xl border-0 bg-gradient-to-r from-teal-600 via-teal-700 to-lime-600 text-white overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-lime-500/10 to-transparent animate-pulse"></div>
                  <CardContent className="p-12 relative z-10">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                      Bergabunglah dengan Nasabah yang Puas!
                    </h2>
                    <p className="text-xl mb-8 text-teal-100">
                      Dapatkan pendanaan yang Anda butuhkan dengan pelayanan terbaik dan proses yang mudah
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Link href="/pengajuan">
                        <Button
                          size="lg"
                          className="bg-white text-teal-700 hover:bg-gray-100 px-8 py-3 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                        >
                          Ajukan Pendanaan Sekarang
                        </Button>
                      </Link>
                      <Link href="/kontak">
                        <Button
                          size="lg"
                          variant="outline"
                          className="border-2 border-white text-white hover:bg-white hover:text-teal-700 px-8 py-3 font-semibold"
                        >
                          Konsultasi Gratis
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  )
}