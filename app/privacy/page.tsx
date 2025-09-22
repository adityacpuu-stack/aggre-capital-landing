"use client"

import { Shield, Eye, Lock, Database, User, Mail, Phone, Calendar, FileText, AlertTriangle, ArrowLeft } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import SEO from "@/components/SEO"
import { seoConfigs } from "@/lib/seo"
import Link from "next/link"

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-teal-50/30">
      <SEO seo={seoConfigs.privacy} />
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
                <Shield className="h-12 w-12 mr-4" />
                <h1 className="text-4xl md:text-5xl font-bold">Kebijakan Privasi</h1>
              </div>
              <p className="text-xl text-teal-100">
                Melindungi informasi pribadi Anda adalah prioritas utama kami
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
                      { id: "pengenalan", title: "1. Pengenalan" },
                      { id: "informasi", title: "2. Informasi yang Kami Kumpulkan" },
                      { id: "penggunaan", title: "3. Penggunaan Informasi" },
                      { id: "berbagi", title: "4. Berbagi Informasi" },
                      { id: "keamanan", title: "5. Keamanan Data" },
                      { id: "hak", title: "6. Hak Anda" },
                      { id: "cookie", title: "7. Cookie & Teknologi" },
                      { id: "perubahan", title: "8. Perubahan Kebijakan" },
                      { id: "kontak", title: "9. Kontak Kami" }
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
                        <FileText className="h-6 w-6 text-teal-600 mr-3" />
                        <h2 className="text-2xl font-bold text-gray-900">1. Pengenalan</h2>
                      </div>
                      <div className="prose prose-lg max-w-none text-gray-700">
                        <p>
                          AGGRE CAPITAL ("kami", "kita", atau "perusahaan") berkomitmen untuk melindungi 
                          privasi dan keamanan informasi pribadi Anda. Kebijakan Privasi ini menjelaskan 
                          bagaimana kami mengumpulkan, menggunakan, menyimpan, dan melindungi informasi 
                          pribadi Anda ketika Anda menggunakan layanan kami.
                        </p>
                        <p>
                          Dengan menggunakan layanan AGGRE CAPITAL, Anda menyetujui pengumpulan dan 
                          penggunaan informasi sesuai dengan kebijakan ini.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </section>

                {/* Informasi yang Dikumpulkan */}
                <section id="informasi" className="scroll-mt-24">
                  <Card>
                    <CardContent className="p-8">
                      <div className="flex items-center mb-4">
                        <Database className="h-6 w-6 text-teal-600 mr-3" />
                        <h2 className="text-2xl font-bold text-gray-900">2. Informasi yang Kami Kumpulkan</h2>
                      </div>
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800 mb-3">Informasi Pribadi</h3>
                          <ul className="space-y-2 text-gray-700">
                            <li className="flex items-start">
                              <span className="text-teal-500 mr-2">•</span>
                              <span>Nama lengkap, alamat email, dan nomor telepon</span>
                            </li>
                            <li className="flex items-start">
                              <span className="text-teal-500 mr-2">•</span>
                              <span>Informasi identitas (KTP, NPWP, dll.)</span>
                            </li>
                            <li className="flex items-start">
                              <span className="text-teal-500 mr-2">•</span>
                              <span>Informasi keuangan dan pekerjaan</span>
                            </li>
                            <li className="flex items-start">
                              <span className="text-teal-500 mr-2">•</span>
                              <span>Alamat tempat tinggal dan kantor</span>
                            </li>
                          </ul>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800 mb-3">Informasi Teknis</h3>
                          <ul className="space-y-2 text-gray-700">
                            <li className="flex items-start">
                              <span className="text-teal-500 mr-2">•</span>
                              <span>Alamat IP dan informasi perangkat</span>
                            </li>
                            <li className="flex items-start">
                              <span className="text-teal-500 mr-2">•</span>
                              <span>Data penggunaan website dan aplikasi</span>
                            </li>
                            <li className="flex items-start">
                              <span className="text-teal-500 mr-2">•</span>
                              <span>Cookie dan teknologi pelacakan serupa</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </section>

                {/* Penggunaan Informasi */}
                <section id="penggunaan" className="scroll-mt-24">
                  <Card>
                    <CardContent className="p-8">
                      <div className="flex items-center mb-4">
                        <Eye className="h-6 w-6 text-teal-600 mr-3" />
                        <h2 className="text-2xl font-bold text-gray-900">3. Penggunaan Informasi</h2>
                      </div>
                      <div className="space-y-4 text-gray-700">
                        <p>Kami menggunakan informasi Anda untuk:</p>
                        <ul className="space-y-3">
                          <li className="flex items-start">
                            <span className="text-teal-500 mr-3 mt-1">•</span>
                            <div>
                              <strong>Penyediaan Layanan:</strong> Memproses aplikasi pendanaan, 
                              verifikasi identitas, dan memberikan layanan yang Anda minta
                            </div>
                          </li>
                          <li className="flex items-start">
                            <span className="text-teal-500 mr-3 mt-1">•</span>
                            <div>
                              <strong>Komunikasi:</strong> Mengirim notifikasi, update status, 
                              dan informasi penting terkait layanan
                            </div>
                          </li>
                          <li className="flex items-start">
                            <span className="text-teal-500 mr-3 mt-1">•</span>
                            <div>
                              <strong>Peningkatan Layanan:</strong> Menganalisis data untuk 
                              meningkatkan kualitas layanan dan pengalaman pengguna
                            </div>
                          </li>
                          <li className="flex items-start">
                            <span className="text-teal-500 mr-3 mt-1">•</span>
                            <div>
                              <strong>Kepatuhan Hukum:</strong> Memenuhi kewajiban hukum dan 
                              regulasi yang berlaku
                            </div>
                          </li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </section>

                {/* Berbagi Informasi */}
                <section id="berbagi" className="scroll-mt-24">
                  <Card>
                    <CardContent className="p-8">
                      <div className="flex items-center mb-4">
                        <User className="h-6 w-6 text-teal-600 mr-3" />
                        <h2 className="text-2xl font-bold text-gray-900">4. Berbagi Informasi</h2>
                      </div>
                      <div className="space-y-4 text-gray-700">
                        <p>Kami tidak menjual, menyewakan, atau membagikan informasi pribadi Anda kepada pihak ketiga, kecuali dalam situasi berikut:</p>
                        <ul className="space-y-3">
                          <li className="flex items-start">
                            <span className="text-teal-500 mr-3 mt-1">•</span>
                            <div>
                              <strong>Dengan Persetujuan Anda:</strong> Ketika Anda secara eksplisit 
                              memberikan persetujuan untuk berbagi informasi
                            </div>
                          </li>
                          <li className="flex items-start">
                            <span className="text-teal-500 mr-3 mt-1">•</span>
                            <div>
                              <strong>Penyedia Layanan:</strong> Dengan vendor tepercaya yang membantu 
                              kami menyediakan layanan (dengan perjanjian kerahasiaan)
                            </div>
                          </li>
                          <li className="flex items-start">
                            <span className="text-teal-500 mr-3 mt-1">•</span>
                            <div>
                              <strong>Kewajiban Hukum:</strong> Ketika diwajibkan oleh hukum atau 
                              untuk melindungi hak dan keamanan kami
                            </div>
                          </li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </section>

                {/* Keamanan Data */}
                <section id="keamanan" className="scroll-mt-24">
                  <Card>
                    <CardContent className="p-8">
                      <div className="flex items-center mb-4">
                        <Lock className="h-6 w-6 text-teal-600 mr-3" />
                        <h2 className="text-2xl font-bold text-gray-900">5. Keamanan Data</h2>
                      </div>
                      <div className="space-y-4 text-gray-700">
                        <p>Kami menerapkan langkah-langkah keamanan yang ketat untuk melindungi informasi Anda:</p>
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-3">
                            <h3 className="font-semibold text-gray-800">Enkripsi & Teknologi</h3>
                            <ul className="space-y-2">
                              <li className="flex items-start">
                                <span className="text-teal-500 mr-2">•</span>
                                <span>Enkripsi SSL/TLS untuk transmisi data</span>
                              </li>
                              <li className="flex items-start">
                                <span className="text-teal-500 mr-2">•</span>
                                <span>Enkripsi database dan penyimpanan</span>
                              </li>
                              <li className="flex items-start">
                                <span className="text-teal-500 mr-2">•</span>
                                <span>Firewall dan sistem deteksi intrusi</span>
                              </li>
                            </ul>
                          </div>
                          <div className="space-y-3">
                            <h3 className="font-semibold text-gray-800">Akses & Monitoring</h3>
                            <ul className="space-y-2">
                              <li className="flex items-start">
                                <span className="text-teal-500 mr-2">•</span>
                                <span>Akses terbatas berdasarkan kebutuhan</span>
                              </li>
                              <li className="flex items-start">
                                <span className="text-teal-500 mr-2">•</span>
                                <span>Monitoring 24/7 sistem keamanan</span>
                              </li>
                              <li className="flex items-start">
                                <span className="text-teal-500 mr-2">•</span>
                                <span>Audit keamanan berkala</span>
                              </li>
                            </ul>
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
                        <AlertTriangle className="h-6 w-6 text-teal-600 mr-3" />
                        <h2 className="text-2xl font-bold text-gray-900">6. Hak Anda</h2>
                      </div>
                      <div className="space-y-4 text-gray-700">
                        <p>Anda memiliki hak-hak berikut terkait informasi pribadi Anda:</p>
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-3">
                            <div className="flex items-start">
                              <span className="text-teal-500 mr-3 mt-1">•</span>
                              <div>
                                <strong>Akses:</strong> Meminta salinan informasi pribadi yang kami miliki
                              </div>
                            </div>
                            <div className="flex items-start">
                              <span className="text-teal-500 mr-3 mt-1">•</span>
                              <div>
                                <strong>Koreksi:</strong> Meminta perbaikan informasi yang tidak akurat
                              </div>
                            </div>
                            <div className="flex items-start">
                              <span className="text-teal-500 mr-3 mt-1">•</span>
                              <div>
                                <strong>Penghapusan:</strong> Meminta penghapusan informasi pribadi
                              </div>
                            </div>
                          </div>
                          <div className="space-y-3">
                            <div className="flex items-start">
                              <span className="text-teal-500 mr-3 mt-1">•</span>
                              <div>
                                <strong>Pembatasan:</strong> Membatasi penggunaan informasi Anda
                              </div>
                            </div>
                            <div className="flex items-start">
                              <span className="text-teal-500 mr-3 mt-1">•</span>
                              <div>
                                <strong>Portabilitas:</strong> Meminta transfer data ke layanan lain
                              </div>
                            </div>
                            <div className="flex items-start">
                              <span className="text-teal-500 mr-3 mt-1">•</span>
                              <div>
                                <strong>Keberatan:</strong> Menolak pemrosesan untuk tujuan tertentu
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </section>

                {/* Cookie */}
                <section id="cookie" className="scroll-mt-24">
                  <Card>
                    <CardContent className="p-8">
                      <div className="flex items-center mb-4">
                        <Database className="h-6 w-6 text-teal-600 mr-3" />
                        <h2 className="text-2xl font-bold text-gray-900">7. Cookie & Teknologi Pelacakan</h2>
                      </div>
                      <div className="space-y-4 text-gray-700">
                        <p>Kami menggunakan cookie dan teknologi serupa untuk:</p>
                        <ul className="space-y-2">
                          <li className="flex items-start">
                            <span className="text-teal-500 mr-2">•</span>
                            <span>Meningkatkan pengalaman pengguna di website</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-teal-500 mr-2">•</span>
                            <span>Menganalisis penggunaan website</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-teal-500 mr-2">•</span>
                            <span>Menyimpan preferensi pengguna</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-teal-500 mr-2">•</span>
                            <span>Menyediakan konten yang relevan</span>
                          </li>
                        </ul>
                        <p className="mt-4">
                          Anda dapat mengatur preferensi cookie melalui pengaturan browser Anda. 
                          Namun, menonaktifkan cookie tertentu dapat mempengaruhi fungsionalitas website.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </section>

                {/* Perubahan Kebijakan */}
                <section id="perubahan" className="scroll-mt-24">
                  <Card>
                    <CardContent className="p-8">
                      <div className="flex items-center mb-4">
                        <Calendar className="h-6 w-6 text-teal-600 mr-3" />
                        <h2 className="text-2xl font-bold text-gray-900">8. Perubahan Kebijakan</h2>
                      </div>
                      <div className="space-y-4 text-gray-700">
                        <p>
                          Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu. 
                          Perubahan material akan dikomunikasikan melalui:
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
                            <span>Update tanggal "Terakhir diperbarui" di halaman ini</span>
                          </li>
                        </ul>
                        <p>
                          Penggunaan berkelanjutan layanan kami setelah perubahan dianggap sebagai 
                          persetujuan terhadap kebijakan yang diperbarui.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </section>

                {/* Kontak */}
                <section id="kontak" className="scroll-mt-24">
                  <Card>
                    <CardContent className="p-8">
                      <div className="flex items-center mb-4">
                        <Mail className="h-6 w-6 text-teal-600 mr-3" />
                        <h2 className="text-2xl font-bold text-gray-900">9. Kontak Kami</h2>
                      </div>
                      <div className="space-y-6">
                        <p className="text-gray-700">
                          Jika Anda memiliki pertanyaan tentang Kebijakan Privasi ini atau ingin 
                          menggunakan hak-hak Anda, silakan hubungi kami:
                        </p>
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <div className="flex items-center space-x-3">
                              <Mail className="h-5 w-5 text-teal-600" />
                              <div>
                                <p className="font-semibold">Email</p>
                                <p className="text-gray-600">privacy@aggrercapital.com</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-3">
                              <Phone className="h-5 w-5 text-teal-600" />
                              <div>
                                <p className="font-semibold">Telepon</p>
                                <p className="text-gray-600">+62 21 1234 5678</p>
                              </div>
                            </div>
                          </div>
                          <div className="space-y-4">
                            <div>
                              <p className="font-semibold mb-2">Alamat Kantor</p>
                              <p className="text-gray-600">
                                AGGRE CAPITAL<br />
                                Jakarta, Indonesia
                              </p>
                            </div>
                            <div>
                              <p className="font-semibold mb-2">Jam Operasional</p>
                              <p className="text-gray-600">
                                Senin - Jumat: 08:00 - 17:00 WIB
                              </p>
                            </div>
                          </div>
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
