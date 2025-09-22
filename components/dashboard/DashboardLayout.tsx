"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { 
  LayoutDashboard,
  Users,
  FileText,
  Newspaper,
  Star,
  Building2,
  Settings,
  LogOut,
  Bell,
  Menu,
  X
} from "lucide-react"
import Image from "next/image"

interface DashboardLayoutProps {
  children: React.ReactNode
  activeTab: string
  onTabChange: (tab: string) => void
  userEmail: string
  onLogout: () => void
}

const sidebarItems = [
  { id: 'overview', name: 'Overview', icon: LayoutDashboard },
  { id: 'applications', name: 'Applications', icon: FileText },
  { id: 'news', name: 'News & Articles', icon: Newspaper },
  { id: 'testimonials', name: 'Testimoni', icon: Star },
  { id: 'partners', name: 'Strategic Partners', icon: Building2 },
  { id: 'settings', name: 'Settings', icon: Settings },
]

export default function DashboardLayout({ 
  children, 
  activeTab, 
  onTabChange, 
  userEmail, 
  onLogout 
}: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-gray-900 to-gray-800 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:inset-0 transition duration-200 ease-in-out`}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-700">
          <Image
            src="/images/logo.png"
            alt="AGGRE CAPITAL"
            width={120}
            height={32}
            className="object-contain filter brightness-0 invert"
          />
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden text-gray-400 hover:text-white"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <nav className="mt-8 px-4">
          {sidebarItems.map((item) => (
            <Button
              key={item.id}
              variant="ghost"
              className={`w-full justify-start mb-2 h-12 ${
                activeTab === item.id 
                  ? 'bg-teal-600 text-white hover:bg-teal-700' 
                  : 'text-gray-300 hover:text-white hover:bg-gray-700'
              }`}
              onClick={() => {
                onTabChange(item.id)
                setSidebarOpen(false)
              }}
            >
              <item.icon className="h-5 w-5 mr-3" />
              {item.name}
            </Button>
          ))}
        </nav>
        
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-gray-800 rounded-lg p-4 mb-4">
            <p className="text-sm text-gray-300">Logged in as</p>
            <p className="text-white font-medium truncate">{userEmail}</p>
          </div>
          <div className="space-y-2">
            <Button
              variant="ghost"
              className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-900/20"
              onClick={onLogout}
            >
              <LogOut className="h-5 w-5 mr-3" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm border-b h-16 flex items-center justify-between px-6">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <Bell className="h-5 w-5" />
            </Button>
            <div className="h-8 w-8 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-semibold">
                {userEmail.charAt(0).toUpperCase()}
              </span>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}


