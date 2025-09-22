"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  FileText,
  Clock,
  DollarSign,
  CheckCircle,
  Filter,
  Download,
  Plus,
  TrendingUp
} from "lucide-react"

interface OverviewTabProps {
  dashboardData: any
}

export default function OverviewTab({ dashboardData }: OverviewTabProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'reviewing': return 'bg-blue-100 text-blue-800'
      case 'rejected': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {(dashboardData ? [
          { title: 'Total Applications', value: dashboardData.totalApplications?.toLocaleString() || '0', icon: FileText, color: 'text-blue-600', change: '+12%' },
          { title: 'Pending Applications', value: dashboardData.pendingApplications?.toLocaleString() || '0', icon: Clock, color: 'text-orange-600', change: '+8%' },
          { title: 'Total Disbursed', value: `Rp ${((dashboardData.totalDisbursed || 0) / 1000000000).toFixed(1)}B`, icon: DollarSign, color: 'text-green-600', change: '+15%' },
          { title: 'Approved Applications', value: dashboardData.approvedApplications?.toLocaleString() || '0', icon: CheckCircle, color: 'text-purple-600', change: '+3%' }
        ] : [
          { title: 'Total Applications', value: '...', icon: FileText, color: 'text-blue-600', change: '+12%' },
          { title: 'Pending Applications', value: '...', icon: Clock, color: 'text-orange-600', change: '+8%' },
          { title: 'Total Disbursed', value: '...', icon: DollarSign, color: 'text-green-600', change: '+15%' },
          { title: 'Approved Applications', value: '...', icon: CheckCircle, color: 'text-purple-600', change: '+3%' }
        ]).map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className={`text-sm ${stat.color} mt-1`}>{stat.change} from last month</p>
                </div>
                <div className={`p-3 rounded-full bg-gray-100`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Applications */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Applications</CardTitle>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">ID</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Customer</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Amount</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {(dashboardData?.recentApplications || []).map((app: any, index: number) => (
                  <tr key={app.application_id || app.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium text-gray-900">{app.application_id || app.id}</td>
                    <td className="py-3 px-4 text-gray-700">{app.customer_name || app.name}</td>
                    <td className="py-3 px-4 text-gray-700">{app.amount}</td>
                    <td className="py-3 px-4">
                      <Badge className={getStatusColor(app.status)}>
                        {app.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-gray-700">{app.date}</td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">
                          <FileText className="h-4 w-4" />
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

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start" variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              New Application
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <FileText className="h-4 w-4 mr-2" />
              View Applications
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <TrendingUp className="h-4 w-4 mr-2" />
              View Reports
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { service: 'Database', status: 'Online', color: 'text-green-600' },
              { service: 'API Services', status: 'Online', color: 'text-green-600' },
              { service: 'Authentication', status: 'Online', color: 'text-green-600' }
            ].map((service, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-gray-700">{service.service}</span>
                <Badge className={service.color === 'text-green-600' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                  {service.status}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


