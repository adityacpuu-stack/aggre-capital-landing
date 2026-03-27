"use client"

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  ArrowLeft,
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Building,
  Target,
  Home,
  Calendar,
  FileText,
  CheckCircle,
  Clock,
  Eye,
  XCircle,
  CreditCard
} from "lucide-react"
import ApplicationPDFExport from "@/components/pdf/ApplicationPDFExport"

interface ApplicationData {
  id: number
  application_id: string
  customer_name: string
  email: string
  phone: string
  amount: string
  purpose: string
  alamat: string
  pekerjaan: string
  tempat_kerja: string
  alamat_kantor: string
  nama_istri: string
  jenis_jaminan: string
  alamat_jaminan: string
  nomor_ktp: string
  tempat_tanggal_lahir: string
  nama_ibu: string
  pendidikan_terakhir: string
  aset_atas_nama: string
  nomor_hp_pasangan: string
  status: string
  created_at: string
  updated_at: string
}

export default function ApplicationDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [application, setApplication] = useState<ApplicationData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/applications/${params.id}`)
        
        if (!response.ok) {
          throw new Error('Application not found')
        }
        
        const result = await response.json()
        setApplication(result.data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch application')
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchApplication()
    }
  }, [params.id])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800 border-green-200'
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'reviewing': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle className="w-5 h-5" />
      case 'pending': return <Clock className="w-5 h-5" />
      case 'reviewing': return <Eye className="w-5 h-5" />
      case 'rejected': return <XCircle className="w-5 h-5" />
      default: return <Clock className="w-5 h-5" />
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'approved': return 'APPROVED'
      case 'pending': return 'PENDING'
      case 'reviewing': return 'REVIEWING'
      case 'rejected': return 'REJECTED'
      default: return status.toUpperCase()
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }


  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading application details...</p>
        </div>
      </div>
    )
  }

  if (error || !application) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Error</h2>
          <p className="text-gray-600 mb-4">{error || 'Application not found'}</p>
          <Button onClick={() => router.back()} className="bg-teal-600 hover:bg-teal-700">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali
          </Button>
        </div>
      </div>
    )
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => router.back()}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Detail Pengajuan</h1>
                <p className="text-gray-600">ID: {application.application_id}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <ApplicationPDFExport application={application} />
              <Badge className={`px-4 py-2 text-sm font-semibold border-2 ${getStatusColor(application.status)}`}>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(application.status)}
                  <span>{getStatusText(application.status)}</span>
                </div>
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid gap-8">
          {/* Loan Amount Card */}
          <Card className="bg-gradient-to-r from-teal-500 to-blue-600 text-white">
            <CardContent className="p-8">
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-2">Jumlah Pinjaman yang Diajukan</h2>
                <div className="text-4xl font-bold mb-2">
                  Rp {parseInt(application.amount).toLocaleString('id-ID')}
                </div>
                <p className="text-teal-100 text-lg">untuk {application.purpose}</p>
              </div>
            </CardContent>
          </Card>

          {/* Data Pribadi Debitur */}
          <Card>
            <CardHeader className="bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-t-lg">
              <CardTitle className="flex items-center space-x-3">
                <User className="w-6 h-6" />
                <span>Data Pribadi Debitur</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <User className="w-5 h-5 text-gray-500 mt-1" />
                    <div>
                      <p className="text-sm text-gray-600">Nama Debitur</p>
                      <p className="font-semibold text-gray-900">{application.customer_name}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Mail className="w-5 h-5 text-gray-500 mt-1" />
                    <div>
                      <p className="text-sm text-gray-600">Email</p>
                      <p className="font-semibold text-gray-900">{application.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Calendar className="w-5 h-5 text-gray-500 mt-1" />
                    <div>
                      <p className="text-sm text-gray-600">Tempat & Tanggal Lahir</p>
                      <p className="font-semibold text-gray-900">{application.tempat_tanggal_lahir || 'Tidak diisi'}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <FileText className="w-5 h-5 text-gray-500 mt-1" />
                    <div>
                      <p className="text-sm text-gray-600">Nomor KTP</p>
                      <p className="font-semibold text-gray-900">{application.nomor_ktp || 'Tidak diisi'}</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Phone className="w-5 h-5 text-gray-500 mt-1" />
                    <div>
                      <p className="text-sm text-gray-600">Nomor Handphone (HP) Debitur</p>
                      <p className="font-semibold text-gray-900">{application.phone}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-gray-500 mt-1" />
                    <div>
                      <p className="text-sm text-gray-600">Alamat Debitur</p>
                      <p className="font-semibold text-gray-900">{application.alamat || 'Tidak diisi'}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <User className="w-5 h-5 text-gray-500 mt-1" />
                    <div>
                      <p className="text-sm text-gray-600">Nama Ibu Kandung</p>
                      <p className="font-semibold text-gray-900">{application.nama_ibu || 'Tidak diisi'}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <FileText className="w-5 h-5 text-gray-500 mt-1" />
                    <div>
                      <p className="text-sm text-gray-600">Pendidikan Terakhir</p>
                      <p className="font-semibold text-gray-900">{application.pendidikan_terakhir || 'Tidak diisi'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Data Pekerjaan */}
          <Card>
            <CardHeader className="bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-t-lg">
              <CardTitle className="flex items-center space-x-3">
                <Building className="w-6 h-6" />
                <span>Data Pekerjaan</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Briefcase className="w-5 h-5 text-gray-500 mt-1" />
                    <div>
                      <p className="text-sm text-gray-600">Jenis Pekerjaan / Usaha</p>
                      <p className="font-semibold text-gray-900">{application.pekerjaan || 'Tidak diisi'}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Building className="w-5 h-5 text-gray-500 mt-1" />
                    <div>
                      <p className="text-sm text-gray-600">Nama Usaha / Tempat Kerja</p>
                      <p className="font-semibold text-gray-900">{application.tempat_kerja || 'Tidak diisi'}</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-gray-500 mt-1" />
                    <div>
                      <p className="text-sm text-gray-600">Alamat Kantor / Usaha</p>
                      <p className="font-semibold text-gray-900">{application.alamat_kantor || 'Tidak diisi'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Data Pasangan (Bila Menikah) */}
          <Card>
            <CardHeader className="bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-t-lg">
              <CardTitle className="flex items-center space-x-3">
                <User className="w-6 h-6" />
                <span>Data Pasangan (Bila Menikah)</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <User className="w-5 h-5 text-gray-500 mt-1" />
                    <div>
                      <p className="text-sm text-gray-600">Nama Pasangan Debitur</p>
                      <p className="font-semibold text-gray-900">{application.nama_istri || 'Tidak diisi'}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Phone className="w-5 h-5 text-gray-500 mt-1" />
                    <div>
                      <p className="text-sm text-gray-600">Nomor Handphone Pasangan</p>
                      <p className="font-semibold text-gray-900">{application.nomor_hp_pasangan || 'Tidak diisi'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Data Pinjaman */}
          <Card>
            <CardHeader className="bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-t-lg">
              <CardTitle className="flex items-center space-x-3">
                <CreditCard className="w-6 h-6" />
                <span>Data Pinjaman</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Target className="w-5 h-5 text-gray-500 mt-1" />
                    <div>
                      <p className="text-sm text-gray-600">Limit Pengajuan (Rp, dalam angka)</p>
                      <p className="font-semibold text-gray-900">
                        Rp {parseInt(application.amount).toLocaleString('id-ID')}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Target className="w-5 h-5 text-gray-500 mt-1" />
                    <div>
                      <p className="text-sm text-gray-600">Tujuan Peminjaman</p>
                      <p className="font-semibold text-gray-900">{application.purpose}</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Calendar className="w-5 h-5 text-gray-500 mt-1" />
                    <div>
                      <p className="text-sm text-gray-600">Tanggal Pengajuan</p>
                      <p className="font-semibold text-gray-900">{formatDate(application.created_at)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Data Jaminan */}
          <Card>
            <CardHeader className="bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-t-lg">
              <CardTitle className="flex items-center space-x-3">
                <Building className="w-6 h-6" />
                <span>Data Jaminan</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-gray-500 mt-1" />
                    <div>
                      <p className="text-sm text-gray-600">Alamat Jaminan</p>
                      <p className="font-semibold text-gray-900">{application.alamat_jaminan || 'Tidak diisi'}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Home className="w-5 h-5 text-gray-500 mt-1" />
                    <div>
                      <p className="text-sm text-gray-600">Aset Dijaminkan</p>
                      <p className="font-semibold text-gray-900">{application.jenis_jaminan || 'Tidak diisi'}</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <User className="w-5 h-5 text-gray-500 mt-1" />
                    <div>
                      <p className="text-sm text-gray-600">Aset Dijaminkan atasnama</p>
                      <p className="font-semibold text-gray-900">{application.aset_atas_nama || 'Tidak diisi'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-center space-x-4">
            <Button
              onClick={() => router.back()}
              className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}