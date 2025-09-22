"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { 
  ArrowLeft, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Building2, 
  Send,
  MessageSquare,
  Navigation
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function KontakPage() {
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    nomor: "",
    pesan: ""
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Contact form submitted
    // Handle form submission here
  }

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
                <Phone className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Hubungi <span className="bg-gradient-to-r from-teal-600 to-lime-600 bg-clip-text text-transparent">Kami</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Siap membantu Anda dengan solusi pendanaan terbaik. Konsultasi gratis dan proses cepat!
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              {/* Office Address */}
              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader className="bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-t-lg">
                  <CardTitle className="flex items-center space-x-3">
                    <Building2 className="h-6 w-6" />
                    <span>Kantor Pusat</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-gradient-to-r from-teal-500 to-teal-600 p-2 rounded-lg flex-shrink-0">
                        <MapPin className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Alamat Lengkap</h4>
                        <p className="text-gray-600 leading-relaxed">
                          Jl. Banjarsari I No.12, RT.1/RW.8<br />
                          Cilandak Bar., Kec. Cilandak<br />
                          Kota Jakarta Selatan<br />
                          Daerah Khusus Ibukota Jakarta 12430
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="bg-gradient-to-r from-lime-500 to-lime-600 p-2 rounded-lg flex-shrink-0">
                        <Clock className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Jam Operasional</h4>
                        <div className="text-gray-600 space-y-1">
                          <p>Senin - Jumat: 08.00 - 17.00 WIB</p>
                          <p>Sabtu: 08.00 - 12.00 WIB</p>
                          <p className="text-red-600 font-medium">Minggu: Tutup</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Details */}
              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader className="bg-gradient-to-r from-lime-500 to-lime-600 text-white rounded-t-lg">
                  <CardTitle className="flex items-center space-x-3">
                    <MessageSquare className="h-6 w-6" />
                    <span>Informasi Kontak</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    {[
                      {
                        icon: Phone,
                        title: "Telepon & WhatsApp",
                        content: [
                          "Nomor telepon belum tersedia",
                          "WhatsApp: Segera hadir"
                        ],
                        color: "from-green-500 to-green-600"
                      },
                      {
                        icon: Mail,
                        title: "Email",
                        content: [
                          "corp@aggrercapital.com"
                        ],
                        color: "from-blue-500 to-blue-600"
                      },
                      {
                        icon: Navigation,
                        title: "Media Sosial",
                        content: [
                          "Instagram: @aggrecapital",
                          "Facebook: AGGRE CAPITAL"
                        ],
                        color: "from-purple-500 to-purple-600"
                      }
                    ].map((item, index) => (
                      <div key={index} className="flex items-start space-x-4">
                        <div className={`bg-gradient-to-r ${item.color} p-2 rounded-lg flex-shrink-0`}>
                          <item.icon className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">{item.title}</h4>
                          <div className="text-gray-600 space-y-1">
                            {item.content.map((line, i) => (
                              <p key={i}>{line}</p>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Services */}
              <Card className="shadow-lg border-0 bg-gradient-to-r from-teal-600 to-teal-700 text-white">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Layanan Cepat</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="bg-white/20 p-2 rounded-full">
                        <Phone className="h-4 w-4" />
                      </div>
                      <span>Konsultasi Gratis via WhatsApp</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="bg-white/20 p-2 rounded-full">
                        <Clock className="h-4 w-4" />
                      </div>
                      <span>Proses Persetujuan Maksimal 1 Minggu</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="bg-white/20 p-2 rounded-full">
                        <Building2 className="h-4 w-4" />
                      </div>
                      <span>Kunjungan Langsung ke Lokasi</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="space-y-8">
              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader className="bg-gradient-to-r from-lime-600 to-lime-700 text-white rounded-t-lg">
                  <CardTitle className="flex items-center space-x-3">
                    <Send className="h-6 w-6" />
                    <span>Kirim Pesan</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="nama" className="text-sm font-semibold text-gray-700">
                          Nama Lengkap <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="nama"
                          value={formData.nama}
                          onChange={(e) => handleInputChange("nama", e.target.value)}
                          className="mt-2"
                          placeholder="Masukkan nama lengkap Anda"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="nomor" className="text-sm font-semibold text-gray-700">
                          Nomor Telepon <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="nomor"
                          value={formData.nomor}
                          onChange={(e) => handleInputChange("nomor", e.target.value)}
                          className="mt-2"
                          placeholder="08xxxxxxxxxx"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email" className="text-sm font-semibold text-gray-700">
                        Email <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className="mt-2"
                        placeholder="nama@email.com"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="pesan" className="text-sm font-semibold text-gray-700">
                        Pesan / Pertanyaan <span className="text-red-500">*</span>
                      </Label>
                      <Textarea
                        id="pesan"
                        value={formData.pesan}
                        onChange={(e) => handleInputChange("pesan", e.target.value)}
                        className="mt-2"
                        placeholder="Tulis pertanyaan atau pesan Anda di sini..."
                        rows={6}
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white py-3 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                    >
                      <Send className="mr-2 h-5 w-5" />
                      Kirim Pesan
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Map Placeholder */}
              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader className="bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-t-lg">
                  <CardTitle className="flex items-center space-x-3">
                    <MapPin className="h-6 w-6" />
                    <span>Lokasi Kantor</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="rounded-lg overflow-hidden shadow-lg">
                    <iframe 
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4859.121954365273!2d106.79132827585325!3d-6.291688461582685!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f1e9258b6883%3A0xcf18b2399b2ee689!2sAggre%20capital!5e1!3m2!1sid!2sid!4v1754929129691!5m2!1sid!2sid"
                      width="100%" 
                      height="300" 
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy" 
                      referrerPolicy="no-referrer-when-downgrade"
                      className="w-full"
                    />
                  </div>
                  <div className="mt-4 text-center">
                    <a 
                      href="https://www.google.com/maps/place/Aggre+capital/@-6.291688,106.79132827585325,15z/data=!4m6!3m5!1s0x2e69f1e9258b6883:0xcf18b2399b2ee689!8m2!3d-6.291688!4d106.79132827585325!16s%2Fg%2F11y3k8qk7z"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        variant="outline"
                        className="border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white"
                      >
                        <Navigation className="mr-2 h-4 w-4" />
                        Buka di Google Maps
                      </Button>
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-16 text-center">
            <Card className="shadow-xl border-0 bg-gradient-to-r from-teal-600 via-teal-700 to-lime-600 text-white overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-r from-lime-500/10 to-transparent animate-pulse"></div>
              <CardContent className="p-12 relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Siap Mengajukan Pendanaan?
                </h2>
                <p className="text-xl mb-8 text-teal-100">
                  Dapatkan pendanaan yang Anda butuhkan dengan proses yang mudah dan cepat
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/pengajuan">
                    <Button
                      size="lg"
                      className="bg-white text-teal-700 hover:bg-gray-100 px-8 py-3 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                    >
                      Ajukan Sekarang
                    </Button>
                  </Link>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-white text-white hover:bg-white hover:text-teal-700 px-8 py-3 font-semibold"
                  >
                    <Phone className="mr-2 h-5 w-5" />
                    Hubungi WhatsApp
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}