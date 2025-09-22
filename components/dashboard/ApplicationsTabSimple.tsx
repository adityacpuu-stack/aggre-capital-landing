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
  Calendar
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
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5 text-teal-600" />
            <span>Daftar Pengajuan</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">ID</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Customer</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Phone</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Amount</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Purpose</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {allApplications.map((app, index) => (
                  <tr key={app.application_id || app.id} className="border-b hover:bg-gray-50">
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
    </div>
  )
}


