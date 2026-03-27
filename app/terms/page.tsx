"use client"

import { FileText, Scale, AlertTriangle, CheckCircle, XCircle, Clock, Shield, User, CreditCard, Building2, ArrowLeft } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import SEO from "@/components/SEO"
import { seoConfigs } from "@/lib/seo"
import Link from "next/link"

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-teal-50/30">
      <SEO seo={seoConfigs.terms} />
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
                <Scale className="h-12 w-12 mr-4" />
                <h1 className="text-4xl md:text-5xl font-bold">Syarat & Ketentuan</h1>
              </div>
              <p className="text-xl text-teal-100">
                Ketentuan penggunaan layanan AGGRE CAPITAL
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
                      { id: "definisi", title: "2. Definisi" },
                      { id: "layanan", title: "3. Layanan" },
                      { id: "kewajiban", title: "4. Kewajiban Pengguna" },
                      { id: "kewajiban-kami", title: "5. Kewajiban Kami" },
                      { id: "pembayaran", title: "6. Pembayaran" },
                      { id: "pembatalan", title: "7. Pembatalan" },
                      { id: "keterbatasan", title: "8. Keterbatasan" },
                      { id: "perubahan", title: "9. Perubahan" },
                      { id: "hukum", title: "10. Hukum yang Berlaku" }
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
                          Syarat dan Ketentuan ini ("Ketentuan") mengatur penggunaan layanan 
                          yang disediakan oleh AGGRE CAPITAL ("Perusahaan", "kami", "kita"). 
                          Dengan mengakses atau menggunakan layanan kami, Anda menyetujui untuk 
                          terikat oleh ketentuan ini.
                        </p>
                        <p>
                          Jika Anda tidak menyetujui ketentuan ini, mohon untuk tidak menggunakan 
                          layanan kami.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </section>

                {/* Definisi */}
                <section id="definisi" className="scroll-mt-24">
                  <Card>
                    <CardContent className="p-8">
                      <div className="flex items-center mb-4">
                        <Building2 className="h-6 w-6 text-teal-600 mr-3" />
                        <h2 className="text-2xl font-bold text-gray-900">2. Definisi</h2>
                      </div>
                      <div className="space-y-4 text-gray-700">
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-3">
                            <div>
                              <strong>"Layanan"</strong> - Semua produk dan jasa keuangan yang disediakan oleh AGGRE CAPITAL
                            </div>
                            <div>
                              <strong>"Pengguna"</strong> - Individu atau entitas yang menggunakan layanan kami
                            </div>
                            <div>
                              <strong>"Aplikasi"</strong> - Permohonan pendanaan yang diajukan pengguna
                            </div>
                            <div>
                              <strong>"Dokumen"</strong> - Semua dokumen yang diperlukan untuk aplikasi
                            </div>
                          </div>
                          <div className="space-y-3">
                            <div>
                              <strong>"Situs Web"</strong> - Platform digital AGGRE CAPITAL
                            </div>
                            <div>
                              <strong>"Data Pribadi"</strong> - Informasi pribadi pengguna
                            </div>
                            <div>
                              <strong>"Kontrak"</strong> - Perjanjian pendanaan yang disepakati
                            </div>
                            <div>
                              <strong>"Bunga"</strong> - Biaya yang dikenakan atas pinjaman
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </section>

                {/* Layanan */}
                <section id="layanan" className="scroll-mt-24">
                  <Card>
                    <CardContent className="p-8">
                      <div className="flex items-center mb-4">
                        <CreditCard className="h-6 w-6 text-teal-600 mr-3" />
                        <h2 className="text-2xl font-bold text-gray-900">3. Layanan</h2>
                      </div>
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800 mb-3">Jenis Layanan</h3>
                          <ul className="space-y-2 text-gray-700">
                            <li className="flex items-start">
                              <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                              <span>Pendanaan multiguna dengan jaminan properti</span>
                            </li>
                            <li className="flex items-start">
                              <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                              <span>Konsultasi keuangan dan pendanaan</span>
                            </li>
                            <li className="flex items-start">
                              <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                              <span>Layanan administrasi dan dokumentasi</span>
                            </li>
                            <li className="flex items-start">
                              <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                              <span>Platform digital untuk pengajuan online</span>
                            </li>
                          </ul>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800 mb-3">Syarat Layanan</h3>
                          <ul className="space-y-2 text-gray-700">
                            <li className="flex items-start">
                              <span className="text-teal-500 mr-2">•</span>
                              <span>Layanan tersedia untuk warga negara Indonesia</span>
                            </li>
                            <li className="flex items-start">
                              <span className="text-teal-500 mr-2">•</span>
                              <span>Usia minimal 21 tahun atau sudah menikah</span>
                            </li>
                            <li className="flex items-start">
                              <span className="text-teal-500 mr-2">•</span>
                              <span>Memiliki dokumen identitas yang sah</span>
                            </li>
                            <li className="flex items-start">
                              <span className="text-teal-500 mr-2">•</span>
                              <span>Memiliki properti sebagai jaminan</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </section>

                {/* Kewajiban Pengguna */}
                <section id="kewajiban" className="scroll-mt-24">
                  <Card>
                    <CardContent className="p-8">
                      <div className="flex items-center mb-4">
                        <User className="h-6 w-6 text-teal-600 mr-3" />
                        <h2 className="text-2xl font-bold text-gray-900">4. Kewajiban Pengguna</h2>
                      </div>
                      <div className="space-y-4 text-gray-700">
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <h3 className="font-semibold text-gray-800">Informasi yang Benar</h3>
                            <ul className="space-y-2">
                              <li className="flex items-start">
                                <span className="text-teal-500 mr-2">•</span>
                                <span>Memberikan informasi yang akurat dan lengkap</span>
                              </li>
                              <li className="flex items-start">
                                <span className="text-teal-500 mr-2">•</span>
                                <span>Melaporkan perubahan informasi secara tepat waktu</span>
                              </li>
                              <li className="flex items-start">
                                <span className="text-teal-500 mr-2">•</span>
                                <span>Menyediakan dokumen pendukung yang valid</span>
                              </li>
                            </ul>
                          </div>
                          <div className="space-y-4">
                            <h3 className="font-semibold text-gray-800">Kepatuhan</h3>
                            <ul className="space-y-2">
                              <li className="flex items-start">
                                <span className="text-teal-500 mr-2">•</span>
                                <span>Mematuhi semua ketentuan perjanjian</span>
                              </li>
                              <li className="flex items-start">
                                <span className="text-teal-500 mr-2">•</span>
                                <span>Melakukan pembayaran sesuai jadwal</span>
                              </li>
                              <li className="flex items-start">
                                <span className="text-teal-500 mr-2">•</span>
                                <span>Menjaga kerahasiaan akun dan password</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                          <div className="flex items-start">
                            <AlertTriangle className="h-5 w-5 text-yellow-600 mr-2 mt-0.5" />
                            <div>
                              <p className="font-semibold text-yellow-800">Penting:</p>
                              <p className="text-yellow-700 text-sm">
                                Pelanggaran terhadap kewajiban ini dapat mengakibatkan pembatalan 
                                layanan dan tindakan hukum sesuai peraturan yang berlaku.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </section>

                {/* Kewajiban Kami */}
                <section id="kewajiban-kami" className="scroll-mt-24">
                  <Card>
                    <CardContent className="p-8">
                      <div className="flex items-center mb-4">
                        <Shield className="h-6 w-6 text-teal-600 mr-3" />
                        <h2 className="text-2xl font-bold text-gray-900">5. Kewajiban Kami</h2>
                      </div>
                      <div className="space-y-4 text-gray-700">
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <h3 className="font-semibold text-gray-800">Layanan Berkualitas</h3>
                            <ul className="space-y-2">
                              <li className="flex items-start">
                                <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-1" />
                                <span>Menyediakan layanan sesuai standar industri</span>
                              </li>
                              <li className="flex items-start">
                                <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-1" />
                                <span>Memproses aplikasi dengan efisien</span>
                              </li>
                              <li className="flex items-start">
                                <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-1" />
                                <span>Memberikan informasi yang jelas dan transparan</span>
                              </li>
                            </ul>
                          </div>
                          <div className="space-y-4">
                            <h3 className="font-semibold text-gray-800">Keamanan Data</h3>
                            <ul className="space-y-2">
                              <li className="flex items-start">
                                <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-1" />
                                <span>Melindungi data pribadi pengguna</span>
                              </li>
                              <li className="flex items-start">
                                <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-1" />
                                <span>Menerapkan standar keamanan tinggi</span>
                              </li>
                              <li className="flex items-start">
                                <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-1" />
                                <span>Mematuhi regulasi perlindungan data</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </section>

                {/* Pembayaran */}
                <section id="pembayaran" className="scroll-mt-24">
                  <Card>
                    <CardContent className="p-8">
                      <div className="flex items-center mb-4">
                        <CreditCard className="h-6 w-6 text-teal-600 mr-3" />
                        <h2 className="text-2xl font-bold text-gray-900">6. Pembayaran</h2>
                      </div>
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800 mb-3">Sistem Pembayaran</h3>
                          <ul className="space-y-2 text-gray-700">
                            <li className="flex items-start">
                              <span className="text-teal-500 mr-2">•</span>
                              <span>Pembayaran dapat dilakukan secara cicilan atau balloon payment</span>
                            </li>
                            <li className="flex items-start">
                              <span className="text-teal-500 mr-2">•</span>
                              <span>Jangka waktu maksimal 60 bulan</span>
                            </li>
                            <li className="flex items-start">
                              <span className="text-teal-500 mr-2">•</span>
                              <span>Bunga kompetitif sesuai ketentuan yang berlaku</span>
                            </li>
                            <li className="flex items-start">
                              <span className="text-teal-500 mr-2">•</span>
                              <span>Denda keterlambatan sesuai perjanjian</span>
                            </li>
                          </ul>
                        </div>
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                          <div className="flex items-start">
                            <XCircle className="h-5 w-5 text-red-600 mr-2 mt-0.5" />
                            <div>
                              <p className="font-semibold text-red-800">Keterlambatan Pembayaran:</p>
                              <p className="text-red-700 text-sm">
                                Keterlambatan pembayaran dapat mengakibatkan denda dan 
                                dampak negatif pada riwayat kredit Anda.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </section>

                {/* Pembatalan */}
                <section id="pembatalan" className="scroll-mt-24">
                  <Card>
                    <CardContent className="p-8">
                      <div className="flex items-center mb-4">
                        <XCircle className="h-6 w-6 text-teal-600 mr-3" />
                        <h2 className="text-2xl font-bold text-gray-900">7. Pembatalan</h2>
                      </div>
                      <div className="space-y-4 text-gray-700">
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <h3 className="font-semibold text-gray-800 mb-3">Pembatalan oleh Pengguna</h3>
                            <ul className="space-y-2">
                              <li className="flex items-start">
                                <span className="text-teal-500 mr-2">•</span>
                                <span>Dapat dilakukan sebelum pencairan dana</span>
                              </li>
                              <li className="flex items-start">
                                <span className="text-teal-500 mr-2">•</span>
                                <span>Biaya administrasi tetap berlaku</span>
                              </li>
                              <li className="flex items-start">
                                <span className="text-teal-500 mr-2">•</span>
                                <span>Proses pembatalan maksimal 3 hari kerja</span>
                              </li>
                            </ul>
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-800 mb-3">Pembatalan oleh Kami</h3>
                            <ul className="space-y-2">
                              <li className="flex items-start">
                                <span className="text-teal-500 mr-2">•</span>
                                <span>Informasi palsu atau tidak lengkap</span>
                              </li>
                              <li className="flex items-start">
                                <span className="text-teal-500 mr-2">•</span>
                                <span>Pelanggaran ketentuan perjanjian</span>
                              </li>
                              <li className="flex items-start">
                                <span className="text-teal-500 mr-2">•</span>
                                <span>Risiko kredit yang tidak dapat diterima</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </section>

                {/* Keterbatasan */}
                <section id="keterbatasan" className="scroll-mt-24">
                  <Card>
                    <CardContent className="p-8">
                      <div className="flex items-center mb-4">
                        <AlertTriangle className="h-6 w-6 text-teal-600 mr-3" />
                        <h2 className="text-2xl font-bold text-gray-900">8. Keterbatasan Tanggung Jawab</h2>
                      </div>
                      <div className="space-y-4 text-gray-700">
                        <p>
                          AGGRE CAPITAL tidak bertanggung jawab atas:
                        </p>
                        <ul className="space-y-2">
                          <li className="flex items-start">
                            <span className="text-teal-500 mr-2">•</span>
                            <span>Kerugian yang timbul dari penggunaan layanan pihak ketiga</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-teal-500 mr-2">•</span>
                            <span>Gangguan sistem yang di luar kendali kami</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-teal-500 mr-2">•</span>
                            <span>Keputusan investasi atau bisnis pengguna</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-teal-500 mr-2">•</span>
                            <span>Perubahan regulasi yang mempengaruhi layanan</span>
                          </li>
                        </ul>
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                          <p className="text-blue-800 text-sm">
                            <strong>Catatan:</strong> Tanggung jawab kami terbatas pada nilai 
                            layanan yang telah dibayar oleh pengguna.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </section>

                {/* Perubahan */}
                <section id="perubahan" className="scroll-mt-24">
                  <Card>
                    <CardContent className="p-8">
                      <div className="flex items-center mb-4">
                        <Clock className="h-6 w-6 text-teal-600 mr-3" />
                        <h2 className="text-2xl font-bold text-gray-900">9. Perubahan Ketentuan</h2>
                      </div>
                      <div className="space-y-4 text-gray-700">
                        <p>
                          Kami berhak mengubah ketentuan ini sewaktu-waktu dengan pemberitahuan 
                          sebelumnya melalui:
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
                            <span>Surat resmi untuk perubahan material</span>
                          </li>
                        </ul>
                        <p>
                          Penggunaan berkelanjutan layanan setelah perubahan dianggap sebagai 
                          persetujuan terhadap ketentuan yang diperbarui.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </section>

                {/* Hukum yang Berlaku */}
                <section id="hukum" className="scroll-mt-24">
                  <Card>
                    <CardContent className="p-8">
                      <div className="flex items-center mb-4">
                        <Scale className="h-6 w-6 text-teal-600 mr-3" />
                        <h2 className="text-2xl font-bold text-gray-900">10. Hukum yang Berlaku</h2>
                      </div>
                      <div className="space-y-4 text-gray-700">
                        <p>
                          Ketentuan ini diatur oleh dan ditafsirkan sesuai dengan hukum 
                          Republik Indonesia. Setiap sengketa yang timbul akan diselesaikan 
                          melalui:
                        </p>
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <h3 className="font-semibold text-gray-800 mb-3">Penyelesaian Sengketa</h3>
                            <ul className="space-y-2">
                              <li className="flex items-start">
                                <span className="text-teal-500 mr-2">•</span>
                                <span>Musyawarah dan mufakat</span>
                              </li>
                              <li className="flex items-start">
                                <span className="text-teal-500 mr-2">•</span>
                                <span>Mediasi melalui lembaga yang berwenang</span>
                              </li>
                              <li className="flex items-start">
                                <span className="text-teal-500 mr-2">•</span>
                                <span>Pengadilan Negeri Jakarta Pusat</span>
                              </li>
                            </ul>
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-800 mb-3">Regulasi Terkait</h3>
                            <ul className="space-y-2">
                              <li className="flex items-start">
                                <span className="text-teal-500 mr-2">•</span>
                                <span>Undang-Undang Perbankan</span>
                              </li>
                              <li className="flex items-start">
                                <span className="text-teal-500 mr-2">•</span>
                                <span>Peraturan OJK</span>
                              </li>
                              <li className="flex items-start">
                                <span className="text-teal-500 mr-2">•</span>
                                <span>Kode Etik Perbankan Indonesia</span>
                              </li>
                            </ul>
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
