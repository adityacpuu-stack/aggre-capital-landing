"use client"

import { useState } from "react"
import { apiClient } from "@/lib/api-client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ArrowLeft, FileText, User, Building2, CreditCard } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function PengajuanPage() {
  const [formData, setFormData] = useState({
    namaDebitur: "",
    email: "",
    tempatTanggalLahir: "",
    nomorKTP: "",
    alamatDebitur: "",
    jenisPekerjaan: "",
    namaUsaha: "",
    alamatKantor: "",
    nomorHP: "",
    namaPasangan: "",
    nomorHPPasangan: "",
    namaIbu: "",
    pendidikanTerakhir: "",
    limitPengajuan: "",
    tujuanPeminjaman: "",
    alamatJaminan: "",
    asetDijaminkan: "",
    asetAtasNama: "",
    agreement: false
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{type: 'success' | 'error', message: string} | null>(null)
  const [missingFields, setMissingFields] = useState<string[]>([])

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    
    // Remove field from missing fields when user starts typing
    if (value && missingFields.length > 0) {
      const fieldMap: { [key: string]: string } = {
        namaDebitur: 'Nama Debitur',
        email: 'Email',
        nomorKTP: 'Nomor KTP',
        tempatTanggalLahir: 'Tempat & Tanggal Lahir',
        namaIbu: 'Nama Ibu Kandung',
        pendidikanTerakhir: 'Pendidikan Terakhir',
        alamatDebitur: 'Alamat Debitur',
        jenisPekerjaan: 'Jenis Pekerjaan',
        namaUsaha: 'Nama Usaha / Tempat Kerja',
        limitPengajuan: 'Limit Pengajuan',
        tujuanPeminjaman: 'Tujuan Peminjaman',
        alamatJaminan: 'Alamat Jaminan',
        asetDijaminkan: 'Aset Dijaminkan',
        asetAtasNama: 'Aset Dijaminkan atasnama'
      }
      
      const fieldName = fieldMap[field]
      if (fieldName && missingFields.includes(fieldName)) {
        setMissingFields(prev => prev.filter(f => f !== fieldName))
      }
    }
  }

  // Function to check if field is missing
  const isFieldMissing = (fieldName: string) => {
    const fieldMap: { [key: string]: string } = {
      namaDebitur: 'Nama Debitur',
      email: 'Email',
      nomorKTP: 'Nomor KTP',
      tempatTanggalLahir: 'Tempat & Tanggal Lahir',
      namaIbu: 'Nama Ibu Kandung',
      pendidikanTerakhir: 'Pendidikan Terakhir',
      alamatDebitur: 'Alamat Debitur',
      jenisPekerjaan: 'Jenis Pekerjaan',
      namaUsaha: 'Nama Usaha / Tempat Kerja',
      limitPengajuan: 'Limit Pengajuan',
      tujuanPeminjaman: 'Tujuan Peminjaman',
      alamatJaminan: 'Alamat Jaminan',
      asetDijaminkan: 'Aset Dijaminkan',
      asetAtasNama: 'Aset Dijaminkan atasnama'
    }
    
    return missingFields.includes(fieldMap[fieldName])
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate required fields with specific messages
    const missingFields = []
    
    if (!formData.namaDebitur) missingFields.push('Nama Debitur')
    if (!formData.email) missingFields.push('Email')
    if (!formData.nomorKTP) missingFields.push('Nomor KTP')
    if (!formData.tempatTanggalLahir) missingFields.push('Tempat & Tanggal Lahir')
    if (!formData.namaIbu) missingFields.push('Nama Ibu Kandung')
    if (!formData.pendidikanTerakhir) missingFields.push('Pendidikan Terakhir')
    if (!formData.alamatDebitur) missingFields.push('Alamat Debitur')
    if (!formData.jenisPekerjaan) missingFields.push('Jenis Pekerjaan')
    if (!formData.namaUsaha) missingFields.push('Nama Usaha / Tempat Kerja')
    if (!formData.limitPengajuan) missingFields.push('Limit Pengajuan')
    if (!formData.tujuanPeminjaman) missingFields.push('Tujuan Peminjaman')
    if (!formData.alamatJaminan) missingFields.push('Alamat Jaminan')
    if (!formData.asetDijaminkan) missingFields.push('Aset Dijaminkan')
    if (!formData.asetAtasNama) missingFields.push('Aset Dijaminkan atasnama')
    
    if (missingFields.length > 0) {
      setMissingFields(missingFields)
      setSubmitStatus({
        type: 'error',
        message: `Harap lengkapi field berikut: ${missingFields.join(', ')}`
      })
      
      // Focus to first missing field
      setTimeout(() => {
        const firstMissingField = document.querySelector('input[required], select[required], textarea[required]') as HTMLElement
        if (firstMissingField) {
          firstMissingField.focus()
          firstMissingField.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
      }, 100)
      
      return
    }
    
    // Clear missing fields if validation passes
    setMissingFields([])
    
    if (!formData.agreement) {
      setSubmitStatus({
        type: 'error',
        message: 'Harap setujui syarat dan ketentuan terlebih dahulu'
      })
      return
    }

    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      // Map form data to API format
      const applicationData = {
        namaDebitur: formData.namaDebitur,
        email: formData.email,
        nomorTelepon: formData.nomorHP,
        alamat: formData.alamatDebitur,
        pekerjaan: formData.jenisPekerjaan,
        tempatKerja: formData.namaUsaha,
        alamatKantor: formData.alamatKantor,
        namaIstri: formData.namaPasangan,
        jumlahPinjaman: parseFloat(formData.limitPengajuan) || 0,
        tujuanPenggunaan: formData.tujuanPeminjaman,
        jenisJaminan: formData.asetDijaminkan,
        alamatJaminan: formData.alamatJaminan,
        nomorKtp: formData.nomorKTP,
        tempatTanggalLahir: formData.tempatTanggalLahir,
        namaIbuKandung: formData.namaIbu,
        pendidikanTerakhir: formData.pendidikanTerakhir,
        asetAtasNama: formData.asetAtasNama,
        nomorHpPasangan: formData.nomorHPPasangan,
        asetDijaminkan: formData.asetDijaminkan,
        persetujuan: formData.agreement
      }

      const result = await apiClient.createApplication(applicationData)

      if (result.success) {
        setSubmitStatus({
          type: 'success',
          message: `Pengajuan berhasil dikirim! ID Pengajuan: ${(result.data as any)?.application_id}`
        })
        
        // Reset form
        setFormData({
          namaDebitur: "",
          email: "",
          tempatTanggalLahir: "",
          nomorKTP: "",
          alamatDebitur: "",
          jenisPekerjaan: "",
          namaUsaha: "",
          alamatKantor: "",
          nomorHP: "",
          namaPasangan: "",
          nomorHPPasangan: "",
          namaIbu: "",
          pendidikanTerakhir: "",
          limitPengajuan: "",
          tujuanPeminjaman: "",
          alamatJaminan: "",
          asetDijaminkan: "",
          asetAtasNama: "",
          agreement: false
        })
      } else {
        setSubmitStatus({
          type: 'error',
          message: result.error || 'Terjadi kesalahan saat mengirim pengajuan'
        })
      }
    } catch (error) {
      console.error('Submission error:', error)
      console.error('Error details:', {
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
        type: typeof error,
        error: error
      })
      
      // Get more specific error message
      let errorMessage = 'Terjadi kesalahan jaringan. Silakan coba lagi.'
      if (error && typeof error === 'object' && 'error' in error) {
        errorMessage = (error as any).error || errorMessage
      } else if (error instanceof Error) {
        errorMessage = error.message
      }
      
      setSubmitStatus({
        type: 'error',
        message: errorMessage
      })
    } finally {
      setIsSubmitting(false)
    }
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
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-gradient-to-r from-teal-500 to-teal-600 p-3 rounded-full">
                <FileText className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Form Pengajuan <span className="bg-gradient-to-r from-teal-600 to-lime-600 bg-clip-text text-transparent">Pendanaan</span>
            </h1>
            <p className="text-xl text-gray-600">
              Silakan lengkapi formulir di bawah ini untuk mengajukan pendanaan
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Data Pribadi */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-t-lg">
                <CardTitle className="flex items-center space-x-3">
                  <User className="h-6 w-6" />
                  <span>Data Pribadi Debitur</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="namaDebitur" className="text-sm font-semibold text-gray-700">
                      Nama Debitur <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="namaDebitur"
                      value={formData.namaDebitur}
                      onChange={(e) => handleInputChange("namaDebitur", e.target.value)}
                      className={`mt-2 ${isFieldMissing('namaDebitur') ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                      placeholder="Masukkan nama lengkap"
                      required
                    />
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
                      className={`mt-2 ${isFieldMissing('email') ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                      placeholder="contoh@email.com"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="tempatTanggalLahir" className="text-sm font-semibold text-gray-700">
                      Tempat & Tanggal Lahir <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="tempatTanggalLahir"
                      value={formData.tempatTanggalLahir}
                      onChange={(e) => handleInputChange("tempatTanggalLahir", e.target.value)}
                      className={`mt-2 ${isFieldMissing('tempatTanggalLahir') ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                      placeholder="Jakarta, 01 Januari 1990"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="nomorKTP" className="text-sm font-semibold text-gray-700">
                      Nomor KTP <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="nomorKTP"
                      value={formData.nomorKTP}
                      onChange={(e) => handleInputChange("nomorKTP", e.target.value)}
                      className={`mt-2 ${isFieldMissing('nomorKTP') ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                      placeholder="16 digit nomor KTP"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="nomorHP" className="text-sm font-semibold text-gray-700">
                      Nomor Handphone (HP) Debitur <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="nomorHP"
                      value={formData.nomorHP}
                      onChange={(e) => handleInputChange("nomorHP", e.target.value)}
                      className="mt-2"
                      placeholder="08xxxxxxxxxx"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="alamatDebitur" className="text-sm font-semibold text-gray-700">
                    Alamat Debitur <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="alamatDebitur"
                    value={formData.alamatDebitur}
                    onChange={(e) => handleInputChange("alamatDebitur", e.target.value)}
                    className={`mt-2 ${isFieldMissing('alamatDebitur') ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                    placeholder="Alamat lengkap sesuai KTP"
                    rows={3}
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="namaIbu" className="text-sm font-semibold text-gray-700">
                      Nama Ibu Kandung <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="namaIbu"
                      value={formData.namaIbu}
                      onChange={(e) => handleInputChange("namaIbu", e.target.value)}
                      className={`mt-2 ${isFieldMissing('namaIbu') ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                      placeholder="Nama ibu kandung"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="pendidikanTerakhir" className="text-sm font-semibold text-gray-700">
                      Pendidikan Terakhir <span className="text-red-500">*</span>
                    </Label>
                    <Select onValueChange={(value) => handleInputChange("pendidikanTerakhir", value)} required>
                      <SelectTrigger className={`mt-2 ${isFieldMissing('pendidikanTerakhir') ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}>
                        <SelectValue placeholder="Pilih pendidikan terakhir" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="SD">SD</SelectItem>
                        <SelectItem value="SMP">SMP</SelectItem>
                        <SelectItem value="SMA">SMA</SelectItem>
                        <SelectItem value="D3">D3</SelectItem>
                        <SelectItem value="S1">S1</SelectItem>
                        <SelectItem value="S2">S2</SelectItem>
                        <SelectItem value="S3">S3</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Data Pekerjaan */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-t-lg">
                <CardTitle className="flex items-center space-x-3">
                  <Building2 className="h-6 w-6" />
                  <span>Data Pekerjaan</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="jenisPekerjaan" className="text-sm font-semibold text-gray-700">
                      Jenis Pekerjaan / Usaha <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="jenisPekerjaan"
                      value={formData.jenisPekerjaan}
                      onChange={(e) => handleInputChange("jenisPekerjaan", e.target.value)}
                      className={`mt-2 ${isFieldMissing('jenisPekerjaan') ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                      placeholder="Contoh: Wiraswasta, Karyawan, PNS"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="namaUsaha" className="text-sm font-semibold text-gray-700">
                      Nama Usaha / Tempat Kerja <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="namaUsaha"
                      value={formData.namaUsaha}
                      onChange={(e) => handleInputChange("namaUsaha", e.target.value)}
                      className={`mt-2 ${isFieldMissing('namaUsaha') ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                      placeholder="Nama perusahaan atau usaha"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="alamatKantor" className="text-sm font-semibold text-gray-700">
                    Alamat Kantor / Usaha
                  </Label>
                  <Textarea
                    id="alamatKantor"
                    value={formData.alamatKantor}
                    onChange={(e) => handleInputChange("alamatKantor", e.target.value)}
                    className="mt-2"
                    placeholder="Alamat lengkap tempat kerja atau usaha"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Data Pasangan */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-t-lg">
                <CardTitle className="flex items-center space-x-3">
                  <User className="h-6 w-6" />
                  <span>Data Pasangan (Bila Menikah)</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="namaPasangan" className="text-sm font-semibold text-gray-700">
                      Nama Pasangan Debitur
                    </Label>
                    <Input
                      id="namaPasangan"
                      value={formData.namaPasangan}
                      onChange={(e) => handleInputChange("namaPasangan", e.target.value)}
                      className="mt-2"
                      placeholder="Nama lengkap pasangan (jika menikah)"
                    />
                  </div>
                  <div>
                    <Label htmlFor="nomorHPPasangan" className="text-sm font-semibold text-gray-700">
                      Nomor Handphone Pasangan
                    </Label>
                    <Input
                      id="nomorHPPasangan"
                      value={formData.nomorHPPasangan}
                      onChange={(e) => handleInputChange("nomorHPPasangan", e.target.value)}
                      className="mt-2"
                      placeholder="08xxxxxxxxxx"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Data Pinjaman */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-t-lg">
                <CardTitle className="flex items-center space-x-3">
                  <CreditCard className="h-6 w-6" />
                  <span>Data Pinjaman</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="limitPengajuan" className="text-sm font-semibold text-gray-700">
                      Limit Pengajuan (Rp, dalam angka) <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="limitPengajuan"
                      type="number"
                      value={formData.limitPengajuan}
                      onChange={(e) => handleInputChange("limitPengajuan", e.target.value)}
                      className={`mt-2 ${isFieldMissing('limitPengajuan') ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                      placeholder="Contoh: 100000000"
                      required
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-semibold text-gray-700">
                      Tujuan Peminjaman <span className="text-red-500">*</span>
                    </Label>
                    <RadioGroup
                      value={formData.tujuanPeminjaman}
                      onValueChange={(value) => handleInputChange("tujuanPeminjaman", value)}
                      className={`mt-2 ${isFieldMissing('tujuanPeminjaman') ? 'ring-2 ring-red-500 rounded-md p-2' : ''}`}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Modal Usaha" id="modal-usaha" />
                        <Label htmlFor="modal-usaha">Modal Usaha</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Take Over dari Bank / BPR / Multifinance" id="take-over" />
                        <Label htmlFor="take-over">Take Over dari Bank / BPR / Multifinance</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Dana Pernikahan" id="dana-pernikahan" />
                        <Label htmlFor="dana-pernikahan">Dana Pernikahan</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Dana Darurat" id="dana-darurat" />
                        <Label htmlFor="dana-darurat">Dana Darurat</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Dana Pendidikan" id="dana-pendidikan" />
                        <Label htmlFor="dana-pendidikan">Dana Pendidikan</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Data Jaminan */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-t-lg">
                <CardTitle className="flex items-center space-x-3">
                  <Building2 className="h-6 w-6" />
                  <span>Data Jaminan</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div>
                  <Label htmlFor="alamatJaminan" className="text-sm font-semibold text-gray-700">
                    Alamat Jaminan <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="alamatJaminan"
                    value={formData.alamatJaminan}
                    onChange={(e) => handleInputChange("alamatJaminan", e.target.value)}
                    className={`mt-2 ${isFieldMissing('alamatJaminan') ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                    placeholder="Alamat lengkap aset yang dijaminkan"
                    rows={3}
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label className="text-sm font-semibold text-gray-700">
                      Aset Dijaminkan <span className="text-red-500">*</span>
                    </Label>
                    <RadioGroup
                      value={formData.asetDijaminkan}
                      onValueChange={(value) => handleInputChange("asetDijaminkan", value)}
                      className={`mt-2 ${isFieldMissing('asetDijaminkan') ? 'ring-2 ring-red-500 rounded-md p-2' : ''}`}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Rumah Tinggal" id="rumah-tinggal" />
                        <Label htmlFor="rumah-tinggal">Rumah Tinggal</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Ruko" id="ruko" />
                        <Label htmlFor="ruko">Ruko</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Apartemen" id="apartemen" />
                        <Label htmlFor="apartemen">Apartemen</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Tanah Kosong" id="tanah-kosong" />
                        <Label htmlFor="tanah-kosong">Tanah Kosong</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Gedung / Kantor" id="gedung-kantor" />
                        <Label htmlFor="gedung-kantor">Gedung / Kantor</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div>
                    <Label className="text-sm font-semibold text-gray-700">
                      Aset Dijaminkan atasnama <span className="text-red-500">*</span>
                    </Label>
                    <RadioGroup
                      value={formData.asetAtasNama}
                      onValueChange={(value) => handleInputChange("asetAtasNama", value)}
                      className={`mt-2 ${isFieldMissing('asetAtasNama') ? 'ring-2 ring-red-500 rounded-md p-2' : ''}`}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Pribadi / Pasangan Nikah" id="pribadi-pasangan" />
                        <Label htmlFor="pribadi-pasangan">Pribadi / Pasangan Nikah</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Orang Tua" id="orang-tua" />
                        <Label htmlFor="orang-tua">Orang Tua</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Kakak / Adik" id="kakak-adik" />
                        <Label htmlFor="kakak-adik">Kakak / Adik</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Perusahaan" id="perusahaan" />
                        <Label htmlFor="perusahaan">Perusahaan</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Pengurus Perusahaan" id="pengurus-perusahaan" />
                        <Label htmlFor="pengurus-perusahaan">Pengurus Perusahaan</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Agreement */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="bg-gradient-to-r from-teal-50 to-lime-50 p-6 rounded-lg">
                  <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
                    <p>
                      Dengan ini menyatakan benar bahwa saya mengajukan permohonan pinjaman atau pendanaan kepada Aggre Capital dan segala informasi yang saya isi dan sampaikan <strong>BENAR</strong> adanya dan <strong>TANPA PAKSAAN</strong> dari pihak mana pun.
                    </p>
                    <p>
                      Saya <strong>SETUJU</strong> untuk memberikan informasi atau Data yang saya isi atau upload pada Form Registrasi ini kepada Aggre Capital serta untuk diperiksa dan diserahkan kepada pihak ketiga lainnya atau kepada kredit biro.
                    </p>
                    <p>
                      Saya <strong>SETUJU</strong> untuk mengikuti semua proses peminjaman dari Aggre Capital.
                    </p>
                    <p>
                      Saya setuju dikemudian hari tidak akan melakukan tuntutatan dalam bentuk apapun kepada Aggre Capital.
                    </p>
                  </div>

                  <div className="flex items-center space-x-3 mt-6">
                    <Checkbox
                      id="agreement"
                      checked={formData.agreement}
                      onCheckedChange={(checked) => handleInputChange("agreement", checked as boolean)}
                      required
                    />
                    <Label htmlFor="agreement" className="text-sm font-semibold text-gray-700">
                      SAYA SETUJU <span className="text-red-500">*</span>
                    </Label>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Status Messages */}
            {submitStatus && (
              <Card className={`border-0 ${submitStatus.type === 'success' ? 'bg-green-50' : 'bg-red-50'}`}>
                <CardContent className="p-4">
                  <div className={`text-center ${submitStatus.type === 'success' ? 'text-green-800' : 'text-red-800'}`}>
                    <p className="font-semibold">{submitStatus.message}</p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Submit Button */}
            <div className="text-center pt-6">
              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 disabled:from-gray-400 disabled:to-gray-500 text-white px-12 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 disabled:transform-none transition-all duration-300"
              >
                {isSubmitting ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Mengirim Pengajuan...</span>
                  </div>
                ) : (
                  'Kirim Pengajuan'
                )}
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}