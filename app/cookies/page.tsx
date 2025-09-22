"use client"

import { Cookie, Settings, Eye, Shield, Database, AlertTriangle, CheckCircle, XCircle, ArrowLeft } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import SEO from "@/components/SEO"
import { seoConfigs } from "@/lib/seo"
import { useState } from "react"
import Link from "next/link"

export default function CookiePolicy() {
  const [cookiePreferences, setCookiePreferences] = useState({
    necessary: true,
    analytics: false,
    marketing: false,
    functional: false
  })

  const handlePreferenceChange = (type: string, value: boolean) => {
    setCookiePreferences(prev => ({
      ...prev,
      [type]: value
    }))
  }

  const savePreferences = () => {
    // Simulate saving preferences
    alert('Preferensi cookie telah disimpan!')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-teal-50/30">
      <SEO seo={seoConfigs.cookies} />
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
                <Cookie className="h-12 w-12 mr-4" />
                <h1 className="text-4xl md:text-5xl font-bold">Kebijakan Cookie</h1>
              </div>
              <p className="text-xl text-teal-100">
                Informasi tentang penggunaan cookie di website AGGRE CAPITAL
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Table of Contents */}
            <div className="lg:col-span-1">
              <Card className="sticky top-8">
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-4 text-teal-700">Daftar Isi</h3>
                  <nav className="space-y-2">
                    {[
                      { id: "pengenalan", title: "1. Apa itu Cookie?" },
                      { id: "jenis", title: "2. Jenis Cookie" },
                      { id: "penggunaan", title: "3. Penggunaan Cookie" },
                      { id: "pihak-ketiga", title: "4. Cookie Pihak Ketiga" },
                      { id: "pengaturan", title: "5. Pengaturan Cookie" },
                      { id: "hak", title: "6. Hak Anda" },
                      { id: "perubahan", title: "7. Perubahan Kebijakan" }
                    ].map((item) => (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        className="block text-sm text-gray-600 hover:text-teal-600 transition-colors py-1"
                      >
                        {item.title}
                      </a>
                    ))}
                  </nav>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="space-y-8">
                {/* Pengenalan */}
                <section id="pengenalan" className="scroll-mt-24">
                  <Card>
                    <CardContent className="p-8">
                      <div className="flex items-center mb-4">
                        <Cookie className="h-6 w-6 text-teal-600 mr-3" />
                        <h2 className="text-2xl font-bold text-gray-900">1. Apa itu Cookie?</h2>
                      </div>
                      <div className="prose prose-lg max-w-none text-gray-700">
                        <p>
                          Cookie adalah file teks kecil yang disimpan di perangkat Anda ketika 
                          Anda mengunjungi website. Cookie membantu website mengingat informasi 
                          tentang kunjungan Anda, seperti preferensi bahasa dan pengaturan lainnya.
                        </p>
                        <p>
                          AGGRE CAPITAL menggunakan cookie untuk meningkatkan pengalaman pengguna, 
                          menganalisis penggunaan website, dan menyediakan layanan yang lebih baik.
                        </p>
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                          <div className="flex items-start">
                            <AlertTriangle className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                            <div>
                              <p className="font-semibold text-blue-800">Informasi Penting:</p>
                              <p className="text-blue-700 text-sm">
                                Cookie tidak dapat merusak komputer Anda atau membawa virus. 
                                Mereka hanya menyimpan informasi yang Anda berikan kepada website.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </section>

                {/* Jenis Cookie */}
                <section id="jenis" className="scroll-mt-24">
                  <Card>
                    <CardContent className="p-8">
                      <div className="flex items-center mb-4">
                        <Database className="h-6 w-6 text-teal-600 mr-3" />
                        <h2 className="text-2xl font-bold text-gray-900">2. Jenis Cookie yang Kami Gunakan</h2>
                      </div>
                      <div className="space-y-6">
                        {/* Necessary Cookies */}
                        <div className="border border-gray-200 rounded-lg p-6">
                          <div className="flex items-center mb-3">
                            <Shield className="h-5 w-5 text-green-600 mr-2" />
                            <h3 className="text-lg font-semibold text-gray-800">Cookie Penting (Necessary)</h3>
                            <Badge className="ml-2 bg-green-100 text-green-800">Selalu Aktif</Badge>
                          </div>
                          <p className="text-gray-700 mb-3">
                            Cookie ini diperlukan untuk fungsi dasar website dan tidak dapat dimatikan.
                          </p>
                          <ul className="space-y-1 text-sm text-gray-600">
                            <li>• Cookie sesi untuk keamanan login</li>
                            <li>• Cookie preferensi bahasa</li>
                            <li>• Cookie untuk mencegah serangan CSRF</li>
                            <li>• Cookie untuk mengingat pengaturan keamanan</li>
                          </ul>
                        </div>

                        {/* Functional Cookies */}
                        <div className="border border-gray-200 rounded-lg p-6">
                          <div className="flex items-center mb-3">
                            <Settings className="h-5 w-5 text-blue-600 mr-2" />
                            <h3 className="text-lg font-semibold text-gray-800">Cookie Fungsional</h3>
                            <Badge className="ml-2 bg-blue-100 text-blue-800">Opsional</Badge>
                          </div>
                          <p className="text-gray-700 mb-3">
                            Cookie ini meningkatkan fungsionalitas website dan personalisasi.
                          </p>
                          <ul className="space-y-1 text-sm text-gray-600">
                            <li>• Cookie untuk mengingat preferensi pengguna</li>
                            <li>• Cookie untuk tema dan tampilan</li>
                            <li>• Cookie untuk pengaturan form</li>
                            <li>• Cookie untuk fitur interaktif</li>
                          </ul>
                        </div>

                        {/* Analytics Cookies */}
                        <div className="border border-gray-200 rounded-lg p-6">
                          <div className="flex items-center mb-3">
                            <Eye className="h-5 w-5 text-purple-600 mr-2" />
                            <h3 className="text-lg font-semibold text-gray-800">Cookie Analitik</h3>
                            <Badge className="ml-2 bg-purple-100 text-purple-800">Opsional</Badge>
                          </div>
                          <p className="text-gray-700 mb-3">
                            Cookie ini membantu kami memahami bagaimana pengunjung menggunakan website.
                          </p>
                          <ul className="space-y-1 text-sm text-gray-600">
                            <li>• Google Analytics untuk statistik pengunjung</li>
                            <li>• Cookie untuk melacak halaman yang dikunjungi</li>
                            <li>• Cookie untuk mengukur performa website</li>
                            <li>• Cookie untuk analisis perilaku pengguna</li>
                          </ul>
                        </div>

                        {/* Marketing Cookies */}
                        <div className="border border-gray-200 rounded-lg p-6">
                          <div className="flex items-center mb-3">
                            <Cookie className="h-5 w-5 text-orange-600 mr-2" />
                            <h3 className="text-lg font-semibold text-gray-800">Cookie Pemasaran</h3>
                            <Badge className="ml-2 bg-orange-100 text-orange-800">Opsional</Badge>
                          </div>
                          <p className="text-gray-700 mb-3">
                            Cookie ini digunakan untuk menampilkan iklan yang relevan dan mengukur efektivitas kampanye.
                          </p>
                          <ul className="space-y-1 text-sm text-gray-600">
                            <li>• Cookie untuk iklan yang dipersonalisasi</li>
                            <li>• Cookie untuk melacak konversi</li>
                            <li>• Cookie untuk remarketing</li>
                            <li>• Cookie untuk social media integration</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </section>

                {/* Penggunaan Cookie */}
                <section id="penggunaan" className="scroll-mt-24">
                  <Card>
                    <CardContent className="p-8">
                      <div className="flex items-center mb-4">
                        <Eye className="h-6 w-6 text-teal-600 mr-3" />
                        <h2 className="text-2xl font-bold text-gray-900">3. Bagaimana Kami Menggunakan Cookie</h2>
                      </div>
                      <div className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <h3 className="font-semibold text-gray-800 mb-3">Tujuan Penggunaan</h3>
                            <ul className="space-y-2 text-gray-700">
                              <li className="flex items-start">
                                <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-1" />
                                <span>Memastikan website berfungsi dengan baik</span>
                              </li>
                              <li className="flex items-start">
                                <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-1" />
                                <span>Meningkatkan keamanan dan mencegah penipuan</span>
                              </li>
                              <li className="flex items-start">
                                <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-1" />
                                <span>Menganalisis penggunaan untuk perbaikan</span>
                              </li>
                              <li className="flex items-start">
                                <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-1" />
                                <span>Menyediakan konten yang relevan</span>
                              </li>
                            </ul>
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-800 mb-3">Durasi Penyimpanan</h3>
                            <ul className="space-y-2 text-gray-700">
                              <li className="flex items-start">
                                <span className="text-teal-500 mr-2">•</span>
                                <span><strong>Sesi:</strong> Hingga browser ditutup</span>
                              </li>
                              <li className="flex items-start">
                                <span className="text-teal-500 mr-2">•</span>
                                <span><strong>Persisten:</strong> 30 hari - 2 tahun</span>
                              </li>
                              <li className="flex items-start">
                                <span className="text-teal-500 mr-2">•</span>
                                <span><strong>Permanen:</strong> Hingga dihapus manual</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </section>

                {/* Cookie Pihak Ketiga */}
                <section id="pihak-ketiga" className="scroll-mt-24">
                  <Card>
                    <CardContent className="p-8">
                      <div className="flex items-center mb-4">
                        <Database className="h-6 w-6 text-teal-600 mr-3" />
                        <h2 className="text-2xl font-bold text-gray-900">4. Cookie Pihak Ketiga</h2>
                      </div>
                      <div className="space-y-4 text-gray-700">
                        <p>
                          Kami menggunakan layanan pihak ketiga yang dapat menempatkan cookie 
                          di perangkat Anda. Berikut adalah layanan yang kami gunakan:
                        </p>
                        <div className="space-y-4">
                          <div className="border border-gray-200 rounded-lg p-4">
                            <h3 className="font-semibold text-gray-800 mb-2">Google Analytics</h3>
                            <p className="text-sm text-gray-600 mb-2">
                              Untuk menganalisis penggunaan website dan meningkatkan pengalaman pengguna.
                            </p>
                            <a href="https://policies.google.com/privacy" className="text-teal-600 text-sm hover:underline">
                              Kebijakan Privasi Google →
                            </a>
                          </div>
                          <div className="border border-gray-200 rounded-lg p-4">
                            <h3 className="font-semibold text-gray-800 mb-2">Google Maps</h3>
                            <p className="text-sm text-gray-600 mb-2">
                              Untuk menampilkan peta lokasi kantor dan cabang kami.
                            </p>
                            <a href="https://policies.google.com/privacy" className="text-teal-600 text-sm hover:underline">
                              Kebijakan Privasi Google →
                            </a>
                          </div>
                          <div className="border border-gray-200 rounded-lg p-4">
                            <h3 className="font-semibold text-gray-800 mb-2">Social Media Widgets</h3>
                            <p className="text-sm text-gray-600 mb-2">
                              Untuk integrasi dengan platform media sosial.
                            </p>
                            <p className="text-xs text-gray-500">
                              Kebijakan privasi sesuai dengan platform masing-masing
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </section>

                {/* Pengaturan Cookie */}
                <section id="pengaturan" className="scroll-mt-24">
                  <Card>
                    <CardContent className="p-8">
                      <div className="flex items-center mb-4">
                        <Settings className="h-6 w-6 text-teal-600 mr-3" />
                        <h2 className="text-2xl font-bold text-gray-900">5. Pengaturan Cookie</h2>
                      </div>
                      <div className="space-y-6">
                        <p className="text-gray-700">
                          Anda dapat mengatur preferensi cookie menggunakan panel di bawah ini:
                        </p>
                        
                        {/* Cookie Preferences Panel */}
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                          <h3 className="font-semibold text-gray-800 mb-4">Preferensi Cookie Anda</h3>
                          
                          <div className="space-y-4">
                            {/* Necessary Cookies */}
                            <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded">
                              <div className="flex items-center">
                                <Shield className="h-5 w-5 text-green-600 mr-3" />
                                <div>
                                  <p className="font-medium text-gray-800">Cookie Penting</p>
                                  <p className="text-sm text-gray-600">Diperlukan untuk fungsi website</p>
                                </div>
                              </div>
                              <div className="flex items-center">
                                <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                                <span className="text-sm text-gray-600">Selalu Aktif</span>
                              </div>
                            </div>

                            {/* Functional Cookies */}
                            <div className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded">
                              <div className="flex items-center">
                                <Settings className="h-5 w-5 text-blue-600 mr-3" />
                                <div>
                                  <p className="font-medium text-gray-800">Cookie Fungsional</p>
                                  <p className="text-sm text-gray-600">Meningkatkan fungsionalitas</p>
                                </div>
                              </div>
                              <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={cookiePreferences.functional}
                                  onChange={(e) => handlePreferenceChange('functional', e.target.checked)}
                                  className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                              </label>
                            </div>

                            {/* Analytics Cookies */}
                            <div className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded">
                              <div className="flex items-center">
                                <Eye className="h-5 w-5 text-purple-600 mr-3" />
                                <div>
                                  <p className="font-medium text-gray-800">Cookie Analitik</p>
                                  <p className="text-sm text-gray-600">Menganalisis penggunaan website</p>
                                </div>
                              </div>
                              <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={cookiePreferences.analytics}
                                  onChange={(e) => handlePreferenceChange('analytics', e.target.checked)}
                                  className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                              </label>
                            </div>

                            {/* Marketing Cookies */}
                            <div className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded">
                              <div className="flex items-center">
                                <Cookie className="h-5 w-5 text-orange-600 mr-3" />
                                <div>
                                  <p className="font-medium text-gray-800">Cookie Pemasaran</p>
                                  <p className="text-sm text-gray-600">Iklan yang dipersonalisasi</p>
                                </div>
                              </div>
                              <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={cookiePreferences.marketing}
                                  onChange={(e) => handlePreferenceChange('marketing', e.target.checked)}
                                  className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                              </label>
                            </div>
                          </div>

                          <div className="flex justify-end mt-6">
                            <Button onClick={savePreferences} className="bg-teal-600 hover:bg-teal-700">
                              Simpan Preferensi
                            </Button>
                          </div>
                        </div>

                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                          <div className="flex items-start">
                            <AlertTriangle className="h-5 w-5 text-yellow-600 mr-2 mt-0.5" />
                            <div>
                              <p className="font-semibold text-yellow-800">Cara Mengatur Cookie di Browser:</p>
                              <p className="text-yellow-700 text-sm mt-1">
                                Anda juga dapat mengatur cookie melalui pengaturan browser Anda. 
                                Namun, menonaktifkan cookie tertentu dapat mempengaruhi fungsionalitas website.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </section>

                {/* Hak Anda */}
                <section id="hak" className="scroll-mt-24">
                  <Card>
                    <CardContent className="p-8">
                      <div className="flex items-center mb-4">
                        <Shield className="h-6 w-6 text-teal-600 mr-3" />
                        <h2 className="text-2xl font-bold text-gray-900">6. Hak Anda</h2>
                      </div>
                      <div className="space-y-4 text-gray-700">
                        <p>Anda memiliki hak-hak berikut terkait cookie:</p>
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-3">
                            <div className="flex items-start">
                              <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-1" />
                              <div>
                                <strong>Mengatur Preferensi:</strong> Memilih jenis cookie yang ingin Anda terima
                              </div>
                            </div>
                            <div className="flex items-start">
                              <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-1" />
                              <div>
                                <strong>Menghapus Cookie:</strong> Menghapus cookie yang sudah tersimpan
                              </div>
                            </div>
                            <div className="flex items-start">
                              <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-1" />
                              <div>
                                <strong>Menolak Cookie:</strong> Menolak cookie non-essential
                              </div>
                            </div>
                          </div>
                          <div className="space-y-3">
                            <div className="flex items-start">
                              <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-1" />
                              <div>
                                <strong>Informasi:</strong> Mendapatkan informasi tentang cookie yang digunakan
                              </div>
                            </div>
                            <div className="flex items-start">
                              <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-1" />
                              <div>
                                <strong>Portabilitas:</strong> Meminta data yang dikumpulkan melalui cookie
                              </div>
                            </div>
                            <div className="flex items-start">
                              <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-1" />
                              <div>
                                <strong>Keluhan:</strong> Mengajukan keluhan tentang penggunaan cookie
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </section>

                {/* Perubahan Kebijakan */}
                <section id="perubahan" className="scroll-mt-24">
                  <Card>
                    <CardContent className="p-8">
                      <div className="flex items-center mb-4">
                        <AlertTriangle className="h-6 w-6 text-teal-600 mr-3" />
                        <h2 className="text-2xl font-bold text-gray-900">7. Perubahan Kebijakan Cookie</h2>
                      </div>
                      <div className="space-y-4 text-gray-700">
                        <p>
                          Kami dapat memperbarui Kebijakan Cookie ini dari waktu ke waktu. 
                          Perubahan akan dikomunikasikan melalui:
                        </p>
                        <ul className="space-y-2">
                          <li className="flex items-start">
                            <span className="text-teal-500 mr-2">•</span>
                            <span>Notifikasi di website atau aplikasi</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-teal-500 mr-2">•</span>
                            <span>Email kepada pengguna terdaftar</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-teal-500 mr-2">•</span>
                            <span>Update banner di halaman utama</span>
                          </li>
                        </ul>
                        <p>
                          Penggunaan berkelanjutan website kami setelah perubahan dianggap sebagai 
                          persetujuan terhadap kebijakan yang diperbarui.
                        </p>
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                          <p className="text-blue-800 text-sm">
                            <strong>Kontak:</strong> Jika Anda memiliki pertanyaan tentang kebijakan cookie ini, 
                            silakan hubungi kami di privacy@aggrercapital.com
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
