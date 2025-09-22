"use client"

import { useState, useEffect } from "react"
import { apiClient } from "@/lib/api-client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  ArrowLeft, 
  Building2, 
  Handshake, 
  Shield, 
  Award, 
  TrendingUp, 
  Users, 
  CheckCircle,
  Star,
  MapPin,
  Phone,
  Mail,
  RefreshCw
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function PartnersPage() {
  const [partners, setPartners] = useState<any[]>([])
  const [additionalPartners, setAdditionalPartners] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPartners()
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(() => {
      fetchPartners()
    }, 30000)
    
    return () => clearInterval(interval)
  }, [])

  const fetchPartners = async () => {
    try {
      // Add cache busting to ensure fresh data
      const result = await fetch(`/api/partners?t=${Date.now()}`, {
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      
      if (result.ok) {
        const data = await result.json()
        if (data.success) {
          setPartners(data.data?.strategic_partners || [])
          setAdditionalPartners(data.data?.ecosystem_partners || [])
        }
      } else {
        throw new Error('Failed to fetch partners')
      }
    } catch (error) {
      console.error('Failed to fetch partners:', error)
      // Fallback to static data if API fails
      setPartners(staticPartners)
      setAdditionalPartners(staticAdditionalPartners)
    } finally {
      setLoading(false)
    }
  }
  const staticPartners = [
    {
      id: 1,
      name: "BPR OLYMPINDO",
      subtitle: "SEJAHTERA",
      logo: "/images/bpr-olympindo-sejahtera.png",
      established: "2010",
      location: "Jakarta, Indonesia",
      description: "BPR Olympindo Sejahtera adalah mitra strategis yang telah dipercaya dalam menyediakan solusi pendanaan berkualitas dengan fokus pada pelayanan prima dan kepercayaan nasabah.",
      services: [
        "Kredit Modal Kerja",
        "Kredit Investasi", 
        "Kredit Konsumsi",
        "Simpanan Berjangka"
      ],
      achievements: [
        "Aset Rp 500+ Miliar",
        "15.000+ Nasabah Aktif",
        "Rating A- (Excellent)",
        "ISO 9001:2015 Certified"
      ],
      contact: {
        phone: "+62 21 7890 1111",
        email: "info@bpr-olympindo-sejahtera.co.id",
        address: "Jl. Sudirman No. 45, Jakarta Pusat"
      },
      color: "from-blue-500 to-blue-600",
      type: "BPR"
    },
    {
      id: 2,
      name: "BPR OLYMPINDO",
      subtitle: "PRIMADANA",
      logo: "/images/bpr-olympindo-primadana.png",
      established: "2012",
      location: "Jakarta, Indonesia", 
      description: "BPR Olympindo Primadana hadir sebagai mitra terpercaya dalam ekosistem keuangan mikro dengan komitmen memberikan akses pendanaan yang mudah dan terjangkau bagi masyarakat.",
      services: [
        "Kredit Usaha Mikro",
        "Kredit Multiguna",
        "Kredit Kendaraan",
        "Tabungan & Deposito"
      ],
      achievements: [
        "Aset Rp 750+ Miliar", 
        "20.000+ Nasabah Aktif",
        "Rating A (Very Good)",
        "Award Best BPR 2023"
      ],
      contact: {
        phone: "+62 21 7890 2222",
        email: "info@bpr-olympindo-primadana.co.id", 
        address: "Jl. Thamrin No. 67, Jakarta Pusat"
      },
      color: "from-teal-500 to-teal-600",
      type: "BPR"
    },
    {
      id: 3,
      name: "BPR DHANA",
      subtitle: "SEMESTA",
      logo: "/images/bpr-dhana-semesta.png",
      established: "2015",
      location: "Jakarta, Indonesia",
      description: "BPR Dhana Semesta berkomitmen untuk memberikan solusi keuangan terbaik dengan tagline 'Bersama Menuju Sejahtera', melayani kebutuhan finansial masyarakat dengan profesional.",
      services: [
        "Kredit Properti",
        "Kredit Bisnis",
        "Kredit Personal",
        "Investasi Deposito"
      ],
      achievements: [
        "Aset Rp 400+ Miliar",
        "12.000+ Nasabah Aktif", 
        "Rating B+ (Good)",
        "Best Growth 2023"
      ],
      contact: {
        phone: "+62 21 7890 3333",
        email: "info@bpr-dhanasemesta.co.id",
        address: "Jl. Kemang Raya No. 88, Jakarta Selatan"
      },
      color: "from-orange-500 to-orange-600",
      type: "BPR"
    }
  ]

  const staticAdditionalPartners = [
    { name: "Danamon", subtitle: "A member of MUFG", logo: "/images/danamon.png" },
    { name: "Bank Sampoerna", subtitle: "Trusted Financial Partner", logo: "/images/bank-sampoerna.png" },
    { name: "Venteny", subtitle: "Digital Innovation", logo: "/images/venteny.png" },
    { name: "Bank Dassa", subtitle: "PT Bank Perkreditan Rakyat", logo: "/images/bank-dassa.png" },
    { name: "Bank Bahtera Masyarakat", subtitle: "Melayani dengan Hati", logo: "/images/bbm.png" },
    { name: "KB Financial Group", subtitle: "Global Financial Services", logo: "/images/kb-financial.png" },
    { name: "Bank Vima", subtitle: "PT Bank Pembangunan Daerah Bali", logo: "/images/bank-vima.png" },
    { name: "Ralali", subtitle: "B2B Marketplace", logo: "/images/ralali.png" },
    { name: "MNC Finance", subtitle: "Multifinance Solutions", logo: "/images/mnc-finance.png" },
    { name: "Mekar", subtitle: "Fintech Platform", logo: "/images/mekar.png" },
    { name: "Pepper Advantage", subtitle: "Credit Solutions", logo: "/images/pepper-advantage.png" }
  ]

  const partnershipBenefits = [
    {
      icon: Shield,
      title: "Keamanan Terjamin",
      description: "Semua partner telah tersertifikasi OJK dan menerapkan standar keamanan tertinggi",
      color: "from-green-500 to-green-600"
    },
    {
      icon: TrendingUp,
      title: "Pertumbuhan Berkelanjutan", 
      description: "Track record pertumbuhan yang konsisten dengan manajemen risiko yang baik",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Award,
      title: "Prestasi Terbukti",
      description: "Meraih berbagai penghargaan dan sertifikasi dari lembaga kredibel",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: Users,
      title: "Jaringan Luas",
      description: "Melayani ribuan nasabah dengan jangkauan layanan yang komprehensif",
      color: "from-orange-500 to-orange-600"
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
                <Handshake className="h-8 w-8 text-white" />
              </div>
            </div>
            <div className="flex items-center justify-center gap-4 mb-4">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                <span className="bg-gradient-to-r from-teal-600 to-lime-600 bg-clip-text text-transparent">
                  Strategic
                </span>{" "}
                Partner
              </h1>
              <Button
                onClick={fetchPartners}
                disabled={loading}
                variant="outline"
                size="sm"
                className="bg-white/80 hover:bg-white"
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Kemitraan strategis dengan lembaga keuangan terpercaya untuk memberikan solusi pendanaan terbaik bagi nasabah
            </p>
            
            {/* Partnership Stats */}
            <div className="flex flex-wrap justify-center gap-6 mb-12">
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                <div className="text-3xl font-bold text-teal-600">14+</div>
                <div className="text-sm text-gray-600">Strategic Partners</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                <div className="text-3xl font-bold text-lime-600">47K+</div>
                <div className="text-sm text-gray-600">Total Nasabah</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                <div className="text-3xl font-bold text-teal-600">Rp 1.7T+</div>
                <div className="text-sm text-gray-600">Total Aset</div>
              </div>
            </div>
          </div>

          {/* Loading State */}
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <div className="text-center">
                <div className="animate-spin w-12 h-12 border-4 border-teal-600 border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-gray-600">Loading partners...</p>
              </div>
            </div>
          ) : (
            <>
              {/* Partners Grid */}
              <div className="space-y-8 mb-16">
                {partners.map((partner, index) => (
              <Card
                key={partner.id}
                className="shadow-2xl border-0 bg-white overflow-hidden animate-fade-in-up hover:shadow-3xl transition-all duration-500"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader className={`bg-gradient-to-r ${partner.color} text-white relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/10"></div>
                  <div className="relative z-10">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-6">
                        <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl shadow-lg">
                          <Building2 className="h-10 w-10 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-3xl font-bold mb-1">
                            {partner.name}
                          </CardTitle>
                          <p className="text-xl font-medium opacity-95">
                            {partner.subtitle}
                          </p>
                        </div>
                      </div>
                      <Badge className="bg-white/25 backdrop-blur-sm text-white text-sm px-4 py-2 rounded-full font-semibold shadow-lg">
                        Sejak {partner.established}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="p-10">
                  <div className="grid lg:grid-cols-2 gap-10">
                    {/* Partner Info */}
                    <div className="space-y-8">
                      <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6">
                        <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                          <div className="w-1 h-8 bg-gradient-to-b from-teal-500 to-teal-600 rounded-full mr-3"></div>
                          Tentang Partner
                        </h3>
                        <p className="text-gray-700 leading-relaxed mb-6 text-lg">
                          {partner.description}
                        </p>
                        <div className="flex items-center space-x-3 text-gray-600 bg-white rounded-lg p-3 shadow-sm">
                          <MapPin className="h-5 w-5 text-teal-600" />
                          <span className="font-medium">{partner.location}</span>
                        </div>
                      </div>

                      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                        <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                          <div className="w-1 h-6 bg-gradient-to-b from-lime-500 to-lime-600 rounded-full mr-3"></div>
                          Layanan Utama
                        </h4>
                        <div className="grid grid-cols-1 gap-3">
                          {partner.services.map((service: string, idx: number) => (
                            <div key={idx} className="flex items-center space-x-3 bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-colors">
                              <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                              <span className="text-gray-700 font-medium">{service}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Contact Info */}
                      <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-2xl p-6">
                        <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                          <div className="w-1 h-6 bg-gradient-to-b from-teal-500 to-teal-600 rounded-full mr-3"></div>
                          Informasi Kontak
                        </h4>
                        <div className="space-y-3">
                          <div className="flex items-center space-x-3 text-gray-700 bg-white rounded-lg p-3 shadow-sm">
                            <Phone className="h-5 w-5 text-teal-600" />
                            <span className="font-medium">{partner.contact.phone}</span>
                          </div>
                          <div className="flex items-center space-x-3 text-gray-700 bg-white rounded-lg p-3 shadow-sm">
                            <Mail className="h-5 w-5 text-teal-600" />
                            <span className="font-medium">{partner.contact.email}</span>
                          </div>
                          <div className="flex items-start space-x-3 text-gray-700 bg-white rounded-lg p-3 shadow-sm">
                            <MapPin className="h-5 w-5 text-teal-600 mt-0.5" />
                            <span className="font-medium">{partner.contact.address}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Achievements */}
                    <div className="space-y-8">
                      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                        <h4 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                          <div className="w-1 h-8 bg-gradient-to-b from-orange-500 to-orange-600 rounded-full mr-3"></div>
                          Pencapaian & Prestasi
                        </h4>
                        <div className="grid grid-cols-1 gap-4">
                          {partner.achievements.map((achievement: string, idx: number) => (
                            <div 
                              key={idx} 
                              className={`bg-gradient-to-r ${partner.color} p-6 rounded-2xl text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105`}
                            >
                              <div className="flex items-center space-x-4">
                                <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                                  <Award className="h-8 w-8 text-white" />
                                </div>
                                <p className="text-lg font-semibold">{achievement}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Rating Display */}
                      <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-8 shadow-lg border border-yellow-100">
                        <h4 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                          <div className="w-1 h-8 bg-gradient-to-b from-yellow-500 to-orange-500 rounded-full mr-3"></div>
                          Rating Kemitraan
                        </h4>
                        <div className="flex items-center justify-center space-x-2 mb-4">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-8 w-8 fill-yellow-400 text-yellow-400 drop-shadow-sm" />
                          ))}
                        </div>
                        <p className="text-center text-lg font-semibold text-gray-700">
                          Partner Terpercaya & Berkualitas
                        </p>
                        <div className="mt-4 text-center">
                          <span className="inline-block bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                            ⭐ 5.0/5.0 Rating
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Additional Partners Grid */}
          <div className="mb-16">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Partner <span className="bg-gradient-to-r from-teal-600 to-lime-600 bg-clip-text text-transparent">Ekosistem</span> Lainnya
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Jaringan mitra strategis yang memperkuat layanan AGGRE CAPITAL
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {additionalPartners.map((partner, index) => (
                <Card
                  key={index}
                  className="group p-6 bg-white hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0 animate-fade-in-up rounded-2xl"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <CardContent className="text-center space-y-4">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-all duration-300 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 shadow-lg border border-gray-200">
                      {partner.logo ? (
                        <img 
                          src={partner.logo} 
                          alt={partner.name}
                          className="w-12 h-12 object-contain"
                          onError={(e) => {
                            // Fallback to icon if image fails to load
                            e.currentTarget.style.display = 'none'
                            const nextSibling = e.currentTarget.nextElementSibling as HTMLElement
                            if (nextSibling) {
                              nextSibling.style.display = 'flex'
                            }
                          }}
                        />
                      ) : null}
                      <div 
                        className={`bg-gradient-to-br from-gray-50 to-gray-100 w-full h-full rounded-2xl flex items-center justify-center ${partner.logo ? 'hidden' : 'flex'}`}
                      >
                        <Building2 className="h-8 w-8 text-gray-500" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-base group-hover:text-teal-700 transition-colors duration-300 mb-2">
                        {partner.name}
                      </h3>
                      <p className="text-sm text-gray-600 group-hover:text-teal-600 transition-colors duration-300 leading-relaxed">
                        {partner.subtitle}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Partnership Benefits */}
          <div className="mb-20">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Keunggulan <span className="bg-gradient-to-r from-teal-600 to-lime-600 bg-clip-text text-transparent">Kemitraan</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Mengapa kami memilih partner strategis terbaik untuk melayani kebutuhan finansial Anda
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {partnershipBenefits.map((benefit, index) => (
                <Card
                  key={index}
                  className="group text-center p-8 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border-0 bg-white animate-fade-in-up rounded-2xl"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="space-y-6">
                    <div className={`bg-gradient-to-r ${benefit.color} w-20 h-20 rounded-3xl flex items-center justify-center mx-auto group-hover:scale-110 transition-all duration-300 shadow-xl`}>
                      <benefit.icon className="h-10 w-10 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-teal-700 transition-colors duration-300">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600 text-base leading-relaxed">
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <Card className="shadow-2xl border-0 bg-gradient-to-r from-teal-600 via-teal-700 to-lime-600 text-white overflow-hidden relative rounded-3xl">
              <div className="absolute inset-0 bg-gradient-to-r from-lime-500/10 to-transparent"></div>
              <div className="absolute inset-0 bg-black/5"></div>
              <CardContent className="p-16 relative z-10">
                <h2 className="text-4xl md:text-5xl font-bold mb-8">
                  Bergabunglah dengan Ekosistem Keuangan Terpercaya
                </h2>
                <p className="text-2xl mb-12 text-teal-100 max-w-4xl mx-auto leading-relaxed">
                  Manfaatkan jaringan partner strategis kami untuk mendapatkan solusi pendanaan terbaik
                </p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <Link href="/pengajuan">
                    <Button
                      size="lg"
                      className="bg-white text-teal-700 hover:bg-gray-100 px-12 py-4 font-bold text-lg shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 rounded-2xl"
                    >
                      Ajukan Pendanaan Sekarang
                    </Button>
                  </Link>
                  <Link href="/kontak">
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-2 border-white text-white hover:bg-white hover:text-teal-700 px-12 py-4 font-bold text-lg rounded-2xl"
                    >
                      Konsultasi Partner
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