"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  FileText,
  Eye,
  User,
  CreditCard,
  Calendar,
  X
} from "lucide-react"

interface ApplicationsTabProps {
  allApplications: any[]
  onRefresh: () => void
  onUpdateStatus: (applicationId: string, newStatus: string) => void
}

export default function ApplicationsTab({ 
  allApplications, 
  onRefresh, 
  onUpdateStatus 
}: ApplicationsTabProps) {
  const router = useRouter()
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null)
  const [selectedApplication, setSelectedApplication] = useState<any>(null)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'reviewing': return 'bg-blue-100 text-blue-800'
      case 'rejected': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  // Define status workflow - what statuses can be changed to from current status
  const getAvailableStatuses = (currentStatus: string) => {
    switch (currentStatus) {
      case 'pending':
        return ['pending', 'reviewing', 'rejected'] // Can stay pending, move to reviewing, or be rejected
      case 'reviewing':
        return ['reviewing', 'approved', 'rejected'] // Can stay reviewing, be approved, or rejected
      case 'approved':
        return ['approved'] // Once approved, cannot change
      case 'rejected':
        return ['rejected'] // Once rejected, cannot change
      default:
        return ['pending', 'reviewing', 'approved', 'rejected']
    }
  }

  return (
    <div className="space-y-6">
      {/* Applications Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Kelola Pengajuan</h2>
        <Button
          onClick={onRefresh}
          className="bg-teal-600 hover:bg-teal-700 text-white"
        >
          Refresh Data
        </Button>
      </div>

      {/* Applications Table */}
      <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Semua Pengajuan Pinjaman</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">ID</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Nama</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Telepon</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Jumlah</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Tujuan</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Tanggal</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {allApplications.map((app) => (
                  <tr key={app.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium text-gray-900">{app.application_id}</td>
                    <td className="py-3 px-4 text-gray-700">{app.customer_name}</td>
                    <td className="py-3 px-4 text-gray-700">{app.phone}</td>
                    <td className="py-3 px-4 text-gray-700">Rp {parseInt(app.amount).toLocaleString('id-ID')}</td>
                    <td className="py-3 px-4 text-gray-700">{app.purpose}</td>
                    <td className="py-3 px-4">
                      <select
                        value={app.status}
                        onChange={async (e) => {
                          setUpdatingStatus(app.application_id)
                          await onUpdateStatus(app.application_id, e.target.value)
                          setUpdatingStatus(null)
                        }}
                        disabled={updatingStatus === app.application_id}
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(app.status)} border-0 ${updatingStatus === app.application_id ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                      >
                        {getAvailableStatuses(app.status).map(status => (
                          <option key={status} value={status}>
                            {status === 'pending' && '⏳ Pending'}
                            {status === 'reviewing' && '🔍 Reviewing'}
                            {status === 'approved' && '✅ Approved'}
                            {status === 'rejected' && '❌ Rejected'}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="py-3 px-4 text-gray-700">
                      {new Date(app.created_at).toLocaleDateString('id-ID')}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => router.push(`/pengajuan/${app.application_id}`)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Application Detail Modal */}
      {selectedApplication && (
        <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-6xl my-4 sm:my-8 max-h-[95vh] overflow-hidden rounded-xl sm:rounded-2xl bg-white shadow-2xl">
            {/* Header */}
            <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <h2 className="text-xl sm:text-2xl font-bold truncate">Detail Pengajuan</h2>
                  <p className="text-teal-100 mt-1 text-sm sm:text-base truncate">ID: {selectedApplication.application_id}</p>
                </div>
                <div className="flex items-center justify-between sm:justify-end space-x-2 sm:space-x-4">
                  <Badge className={`${getStatusColor(selectedApplication.status)} text-white px-3 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm font-bold shadow-lg`}>
                    {selectedApplication.status.toUpperCase()}
                  </Badge>
                  <Button
                    variant="ghost"
                    onClick={() => setSelectedApplication(null)}
                    className="text-white hover:bg-white/20 p-1.5 sm:p-2 rounded-full flex-shrink-0"
                  >
                    <X className="h-5 w-5 sm:h-6 sm:w-6" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-3 sm:p-6 overflow-y-auto max-h-[calc(95vh-100px)] sm:max-h-[calc(95vh-120px)]">
              {/* Amount Highlight */}
              <div className="relative bg-gradient-to-br from-teal-50 via-lime-50 to-emerald-50 rounded-2xl p-6 sm:p-8 mb-6 sm:mb-8 border border-teal-200 shadow-lg overflow-hidden">
                {/* Background decoration */}
                <div className="absolute inset-0 bg-gradient-to-r from-teal-500/5 to-lime-500/5"></div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-teal-200/20 rounded-full -translate-y-8 translate-x-8"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-lime-200/20 rounded-full translate-y-6 -translate-x-6"></div>

                <div className="relative text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full mb-4 shadow-lg">
                    <CreditCard className="h-8 w-8 text-white" />
                  </div>
                  <p className="text-sm sm:text-base text-gray-600 mb-3 font-medium">Jumlah Pinjaman yang Diajukan</p>
                  <p className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-600 break-words mb-2">
                    Rp {parseInt(selectedApplication.amount).toLocaleString('id-ID')}
                  </p>
                  <div className="inline-flex items-center px-4 py-2 bg-white/70 backdrop-blur-sm rounded-full border border-teal-200 shadow-sm">
                    <span className="text-sm sm:text-base text-gray-700 font-semibold">untuk {selectedApplication.purpose}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-8">
                {/* Data Pemohon */}
                <Card className="shadow-xl border-0 bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/50 backdrop-blur-sm overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-blue-600 via-blue-600 to-indigo-600 text-white p-4 sm:p-6 relative overflow-hidden">
                    {/* Header decoration */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-indigo-500/20"></div>
                    <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-4 translate-x-4"></div>

                    <CardTitle className="flex items-center text-base sm:text-lg font-bold relative z-10">
                      <div className="flex items-center justify-center w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full mr-3">
                        <User className="h-5 w-5 text-white" />
                      </div>
                      <span>Data Pemohon</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6">
                    <div className="space-y-4 sm:space-y-5">
                      {[
                        { label: 'Nama Lengkap', value: selectedApplication.customer_name, icon: '👤', color: 'bg-blue-50 border-blue-200' },
                        { label: 'Email', value: selectedApplication.email, icon: '📧', color: 'bg-indigo-50 border-indigo-200' },
                        { label: 'Telepon', value: selectedApplication.phone, icon: '📱', color: 'bg-purple-50 border-purple-200' },
                        { label: 'Alamat', value: selectedApplication.alamat, icon: '🏠', color: 'bg-blue-50 border-blue-200' },
                        { label: 'Pekerjaan', value: selectedApplication.pekerjaan, icon: '💼', color: 'bg-indigo-50 border-indigo-200' },
                        { label: 'Tempat Kerja', value: selectedApplication.tempat_kerja, icon: '🏢', color: 'bg-purple-50 border-purple-200' }
                      ].map((item, index) => (
                        <div key={index} className={`flex items-start space-x-3 sm:space-x-4 p-3 sm:p-4 rounded-xl border ${item.color} hover:shadow-md transition-all duration-200 group`}>
                          <div className="flex items-center justify-center w-10 h-10 bg-white rounded-full shadow-sm group-hover:scale-110 transition-transform duration-200">
                            <span className="text-lg">{item.icon}</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs sm:text-sm font-bold text-gray-600 uppercase tracking-wide mb-1">{item.label}</p>
                            <p className="text-sm sm:text-base text-gray-900 font-medium break-words leading-relaxed">
                              {item.value || <span className="text-gray-400 italic">Tidak disebutkan</span>}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Data Pinjaman */}
                <Card className="shadow-xl border-0 bg-gradient-to-br from-white via-emerald-50/30 to-teal-50/50 backdrop-blur-sm overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 text-white p-4 sm:p-6 relative overflow-hidden">
                    {/* Header decoration */}
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-teal-500/20"></div>
                    <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-4 translate-x-4"></div>

                    <CardTitle className="flex items-center text-base sm:text-lg font-bold relative z-10">
                      <div className="flex items-center justify-center w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full mr-3">
                        <CreditCard className="h-5 w-5 text-white" />
                      </div>
                      <span>Data Pinjaman & Jaminan</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6">
                    <div className="space-y-4 sm:space-y-5">
                      {[
                        { label: 'Tujuan Pinjaman', value: selectedApplication.purpose, icon: '🎯', color: 'bg-emerald-50 border-emerald-200' },
                        { label: 'Jenis Jaminan', value: selectedApplication.jenis_jaminan, icon: '🏛️', color: 'bg-green-50 border-green-200' },
                        { label: 'Alamat Jaminan', value: selectedApplication.alamat_jaminan, icon: '📍', color: 'bg-teal-50 border-teal-200' },
                        { label: 'Tanggal Pengajuan', value: new Date(selectedApplication.created_at).toLocaleDateString('id-ID', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        }), icon: '📅', color: 'bg-emerald-50 border-emerald-200' }
                      ].map((item, index) => (
                        <div key={index} className={`flex items-start space-x-3 sm:space-x-4 p-3 sm:p-4 rounded-xl border ${item.color} hover:shadow-md transition-all duration-200 group`}>
                          <div className="flex items-center justify-center w-10 h-10 bg-white rounded-full shadow-sm group-hover:scale-110 transition-transform duration-200">
                            <span className="text-lg">{item.icon}</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs sm:text-sm font-bold text-gray-600 uppercase tracking-wide mb-1">{item.label}</p>
                            <p className="text-sm sm:text-base text-gray-900 font-medium break-words leading-relaxed">
                              {item.value || <span className="text-gray-400 italic">Tidak disebutkan</span>}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Catatan Tambahan */}
              {selectedApplication.catatan_tambahan && (
                <Card className="mt-6 sm:mt-8 shadow-xl border-0 bg-gradient-to-br from-white via-amber-50/30 to-orange-50/50 backdrop-blur-sm overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-amber-600 via-amber-600 to-orange-600 text-white p-4 sm:p-6 relative overflow-hidden">
                    {/* Header decoration */}
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-orange-500/20"></div>
                    <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-4 translate-x-4"></div>

                    <CardTitle className="flex items-center text-base sm:text-lg font-bold relative z-10">
                      <div className="flex items-center justify-center w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full mr-3">
                        <FileText className="h-5 w-5 text-white" />
                      </div>
                      <span>Informasi Tambahan</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6">
                    <div className="bg-gradient-to-r from-white to-amber-50/50 rounded-xl p-4 sm:p-6 border border-amber-200 shadow-inner">
                      <div className="flex items-start space-x-3 mb-4">
                        <div className="flex items-center justify-center w-8 h-8 bg-amber-100 rounded-full">
                          <span className="text-lg">📝</span>
                        </div>
                        <div>
                          <p className="text-xs sm:text-sm font-bold text-amber-700 uppercase tracking-wide">Detail Informasi</p>
                        </div>
                      </div>
                      <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-amber-200/50">
                        <p className="text-sm sm:text-base text-gray-800 leading-relaxed whitespace-pre-line break-words font-medium">
                          {selectedApplication.catatan_tambahan.replace(/KTP:|Tempat\/Tgl Lahir:|Nama Ibu:|Pendidikan:|Aset atas nama:/g, '\n$&')}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Action Buttons */}
              <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row justify-center gap-4 pt-6 sm:pt-8 border-t border-gray-200/80">
                <div className="flex flex-col sm:flex-row gap-4 items-center">
                  {/* Status Selector */}
                  <div className="relative">
                    <select
                      value={selectedApplication.status}
                      onChange={async (e) => {
                        setUpdatingStatus(selectedApplication.application_id)
                        await onUpdateStatus(selectedApplication.application_id, e.target.value)
                        setUpdatingStatus(null)
                        // Don't update local state - let the parent refresh the data
                      }}
                      disabled={updatingStatus === selectedApplication.application_id}
                      className={`w-full sm:w-auto px-6 py-3 rounded-xl border-2 border-teal-200 focus:border-teal-400 focus:ring-4 focus:ring-teal-200/50 bg-gradient-to-r from-white to-teal-50/50 text-gray-800 font-bold shadow-lg hover:shadow-xl transition-all duration-200 text-sm sm:text-base appearance-none ${updatingStatus === selectedApplication.application_id ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                    >
                      {getAvailableStatuses(selectedApplication.status).map(status => (
                        <option key={status} value={status}>
                          {status === 'pending' && '⏳ Pending'}
                          {status === 'reviewing' && '🔍 Reviewing'}
                          {status === 'approved' && '✅ Approved'}
                          {status === 'rejected' && '❌ Rejected'}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg className="w-5 h-5 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>

                  {/* Close Button */}
                  <Button
                    onClick={() => setSelectedApplication(null)}
                    className="w-full sm:w-auto bg-gradient-to-r from-slate-600 via-slate-700 to-slate-800 hover:from-slate-700 hover:via-slate-800 hover:to-slate-900 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl font-bold text-sm sm:text-base transition-all duration-200 transform hover:scale-105"
                  >
                    <X className="h-5 w-5 mr-2" />
                    Tutup Detail
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
