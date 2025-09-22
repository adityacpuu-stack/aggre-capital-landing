"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { apiClient } from "@/lib/api-client"
import DashboardLayout from "@/components/dashboard/DashboardLayout"
import OverviewTab from "@/components/dashboard/OverviewTab"
import ApplicationsTab from "@/components/dashboard/ApplicationsTabSimple"
import NewsTab from "@/components/dashboard/NewsTab"
import TestimonialsTab from "@/components/dashboard/TestimonialsTab"
import PartnersTab from "@/components/dashboard/PartnersTab"
import SettingsTab from "@/components/dashboard/SettingsTab"
import ChunkErrorBoundary from "@/components/ChunkErrorBoundary"

export default function DashboardPage() {
  const router = useRouter()
  const [userEmail, setUserEmail] = useState("")
  const [activeTab, setActiveTab] = useState("overview")
  
  // Dashboard Data
  const [dashboardData, setDashboardData] = useState<any>(null)
  
  // Applications Data
  const [allApplications, setAllApplications] = useState<any[]>([])
  
  // News Data
  const [allNews, setAllNews] = useState<any[]>([])
  
  // Testimonials Data
  const [allTestimonials, setAllTestimonials] = useState<any[]>([])
  
  // Partners Data
  const [allPartners, setAllPartners] = useState<any[]>([])
  const [allEcosystemPartners, setAllEcosystemPartners] = useState<any[]>([])
  
  // SMTP Settings
  const [smtpSettings, setSmtpSettings] = useState({
    smtp_host: 'smtpout.secureserver.net',
    smtp_port: 587,
    smtp_secure: false, // Port 587 uses STARTTLS, not SSL
    smtp_username: 'support@pfigroup.id',
    smtp_password: '',
    from_name: 'AGGRE CAPITAL',
    from_email: 'support@pfigroup.id',
    reply_to: 'support@pfigroup.id',
    enabled: false // Start with false, will be updated from API
  })
  const [smtpLoading, setSmtpLoading] = useState(false)
  const [smtpTestLoading, setSmtpTestLoading] = useState(false)
  const [smtpSettingsLoading, setSmtpSettingsLoading] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    // Get user info and initialize dashboard
    const initializeDashboard = async () => {
      try {
        const result = await apiClient.verifySession()
        
        if (result.success && result.data) {
          setUserEmail(result.data.user?.email || '')

          const savedTab = localStorage.getItem('dashboardActiveTab')
          if (savedTab && ['overview', 'applications', 'news', 'testimonials', 'partners', 'settings'].includes(savedTab)) {
            setActiveTab(savedTab)
          }

          fetchDataForTab(savedTab || 'overview')
        }
      } catch (error) {
        console.error('Failed to get user info:', error)
      }
    }

    initializeDashboard()
  }, [])

  // SMTP settings state management
  useEffect(() => {
    // SMTP settings state changed
  }, [smtpSettings])

  const fetchDataForTab = async (tab: string) => {
    try {
      switch (tab) {
        case 'applications':
          await fetchAllApplications()
          break
        case 'news':
          await fetchAllNews()
          break
        case 'testimonials':
          await fetchAllTestimonials()
          break
        case 'partners':
          await fetchAllPartners()
          await fetchAllEcosystemPartners()
          break
        case 'settings':
          await fetchSmtpSettings()
          break
        default:
          await fetchDashboardData()
          break
      }
    } catch (error) {
      console.error(`Failed to fetch data for tab ${tab}:`, error)
    }
  }

  const handleTabChange = async (tab: string) => {
    setActiveTab(tab)
    localStorage.setItem('dashboardActiveTab', tab)
    
    // Force reload SMTP settings when switching to settings tab
    if (tab === 'settings') {
      await fetchSmtpSettings()
    } else {
      await fetchDataForTab(tab)
    }
  }

  // Data fetching functions
  const fetchDashboardData = async () => {
    try {
      const result = await apiClient.getDashboardStats()
      setDashboardData(result.data)
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error)
      localStorage.clear()
      router.push('/login')
    }
  }

  const fetchAllApplications = async () => {
    try {
      const result = await apiClient.getApplications()
      setAllApplications(Array.isArray(result.data) ? result.data : [])
    } catch (error) {
      console.error('Failed to fetch applications:', error)
      setAllApplications([])
    }
  }

  const fetchAllNews = async () => {
    try {
      const result = await apiClient.getNews({ status: 'all' })
      setAllNews(Array.isArray(result.data) ? result.data : [])
    } catch (error) {
      console.error('Failed to fetch news:', error)
      setAllNews([])
    }
  }

  const fetchAllTestimonials = async () => {
    try {
      const result = await apiClient.getTestimonials()
      setAllTestimonials(Array.isArray(result.data) ? result.data : [])
    } catch (error) {
      console.error('Failed to fetch testimonials:', error)
      setAllTestimonials([])
    }
  }

  const fetchAllPartners = async () => {
    try {
      const response = await fetch('/api/partners')
      if (response.ok) {
        const result = await response.json()
        setAllPartners(result.data.strategic_partners || [])
      }
    } catch (error) {
      console.error('Failed to fetch partners:', error)
    }
  }

  const fetchAllEcosystemPartners = async () => {
    try {
      const response = await fetch('/api/partners/ecosystem')
      if (response.ok) {
        const result = await response.json()
        setAllEcosystemPartners(result.data || [])
      }
    } catch (error) {
      console.error('Failed to fetch ecosystem partners:', error)
    }
  }

  const fetchSmtpSettings = async () => {
    setSmtpSettingsLoading(true)
    try {
      const response = await fetch('/api/settings/smtp', {
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Include cookies for authentication
      })
      
      if (response.ok) {
        const result = await response.json()
        
        if (result.success && result.data) {
          setSmtpSettings(result.data)
        }
      }
    } catch (error) {
      // Error fetching SMTP settings
    } finally {
      setSmtpSettingsLoading(false)
    }
  }

  // Application handlers
  const updateApplicationStatus = async (applicationId: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/applications/${applicationId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      })

      if (response.ok) {
        fetchAllApplications()
        fetchDashboardData()
      }
    } catch (error) {
      console.error('Failed to update application status:', error)
    }
  }

  // News handlers
  const handleSaveNews = async (newsData: any, isEdit: boolean) => {
    try {
      const method = isEdit ? 'PUT' : 'POST'
      const url = isEdit ? `/api/news/${newsData.slug}` : '/api/news'
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newsData),
      })

      if (response.ok) {
        fetchAllNews()
      }
    } catch (error) {
      console.error('Failed to save news:', error)
    }
  }

  const handleDeleteNews = async (id: string) => {
    if (confirm('Are you sure you want to delete this article?')) {
      try {
        const response = await fetch(`/api/news/${id}`, {
          method: 'DELETE',
        })

        if (response.ok) {
          fetchAllNews()
        } else {
          const errorData = await response.json()
          alert(`Failed to delete news: ${errorData.error || 'Unknown error'}`)
        }
      } catch (error) {
        console.error('Failed to delete news:', error)
        alert('Failed to delete news. Please try again.')
      }
    }
  }

  // Testimonial handlers
  const handleSaveTestimonial = async (testimonialData: any, isEdit: boolean) => {
    try {
      const method = isEdit ? 'PUT' : 'POST'
      const url = isEdit ? `/api/testimonials/${testimonialData.id}` : '/api/testimonials'
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: testimonialData.name,
          role: testimonialData.position,
          content: testimonialData.content,
          rating: testimonialData.rating,
          category: testimonialData.company,
          avatar: testimonialData.image,
          featured: testimonialData.featured,
          status: testimonialData.status,
          amount: '',
          loan_amount_numeric: 0,
          icon: 'User',
          color: 'from-teal-500 to-teal-600',
          sort_order: 0
        }),
      })

      if (response.ok) {
        fetchAllTestimonials()
      }
    } catch (error) {
      console.error('Failed to save testimonial:', error)
    }
  }

  const handleDeleteTestimonial = async (testimonialId: number) => {
    try {
      const response = await fetch(`/api/testimonials/${testimonialId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        fetchAllTestimonials()
      }
    } catch (error) {
      console.error('Failed to delete testimonial:', error)
    }
  }

  // Partner handlers
  const handleSavePartner = async (partnerData: any, isEdit: boolean) => {
    try {
      const method = isEdit ? 'PUT' : 'POST'
      const url = isEdit ? `/api/partners/strategic/${partnerData.id}` : '/api/partners/strategic'
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(partnerData),
      })

      if (response.ok) {
        fetchAllPartners()
      } else {
        const errorData = await response.json()
        console.error('Failed to save partner:', errorData)
        throw new Error(errorData.error || 'Failed to save partner')
      }
    } catch (error) {
      console.error('Failed to save partner:', error)
      throw error
    }
  }

  const handleDeletePartner = async (partnerId: number) => {
    if (confirm('Apakah Anda yakin ingin menghapus partner ini?')) {
      try {
        const response = await fetch(`/api/partners/strategic/${partnerId}`, {
          method: 'DELETE',
        })
        if (response.ok) {
          fetchAllPartners()
        } else {
          const errorData = await response.json()
          console.error('Failed to delete partner:', errorData)
          alert('Gagal menghapus partner. Silakan coba lagi.')
        }
      } catch (error) {
        console.error('Failed to delete partner:', error)
        alert('Gagal menghapus partner. Silakan coba lagi.')
      }
    }
  }

  const handleSaveEcosystemPartner = async (partnerData: any, isEdit: boolean) => {
    try {
      const method = isEdit ? 'PUT' : 'POST'
      const url = isEdit ? `/api/partners/ecosystem/${partnerData.id}` : '/api/partners/ecosystem'
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(partnerData),
      })

      if (response.ok) {
        fetchAllEcosystemPartners()
      } else {
        const errorData = await response.json()
        console.error('Failed to save ecosystem partner:', errorData)
        throw new Error(errorData.error || 'Failed to save ecosystem partner')
      }
    } catch (error) {
      console.error('Failed to save ecosystem partner:', error)
      throw error
    }
  }

  const handleDeleteEcosystemPartner = async (partnerId: number) => {
    if (confirm('Apakah Anda yakin ingin menghapus partner ini?')) {
      try {
        const response = await fetch(`/api/partners/ecosystem/${partnerId}`, {
          method: 'DELETE',
        })
        if (response.ok) {
          fetchAllEcosystemPartners()
        } else {
          const errorData = await response.json()
          console.error('Failed to delete ecosystem partner:', errorData)
          alert('Gagal menghapus ecosystem partner. Silakan coba lagi.')
        }
      } catch (error) {
        console.error('Failed to delete ecosystem partner:', error)
        alert('Gagal menghapus ecosystem partner. Silakan coba lagi.')
      }
    }
  }

  // SMTP handlers
  const saveSmtpSettings = async () => {
    setSmtpLoading(true)
    try {
      const response = await fetch('/api/settings/smtp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Include cookies for authentication
        body: JSON.stringify(smtpSettings),
      })

      if (response.ok) {
        const result = await response.json()
        if (result.success) {
          alert('SMTP settings saved successfully!')
          fetchSmtpSettings()
        } else {
          alert(result.error || 'Failed to save SMTP settings')
        }
      } else {
        const errorData = await response.json()
        alert(errorData.error || 'Failed to save SMTP settings')
      }
    } catch (error) {
      console.error('Failed to save SMTP settings:', error)
      alert('Error saving SMTP settings')
    } finally {
      setSmtpLoading(false)
    }
  }

  const testSmtpConnection = async () => {
    setSmtpTestLoading(true)
    try {
      // Validate required fields
      if (!smtpSettings.smtp_host || !smtpSettings.smtp_username) {
        alert('SMTP settings are required. Please fill in SMTP Host and Username.')
        return
      }

      const response = await fetch('/api/settings/smtp/test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Include cookies for authentication
        body: JSON.stringify({
          ...smtpSettings,
          smtp_password: smtpSettings.smtp_password || 'PathFinder@123' // Use default password if empty
        }),
      })

      const result = await response.json()
      
      if (result.success) {
        alert('SMTP test email sent successfully! Check your inbox.')
      } else {
        alert(result.error || 'SMTP test failed')
      }
    } catch (error) {
      alert('Error testing SMTP connection')
    } finally {
      setSmtpTestLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      await apiClient.logout()
      localStorage.clear()
      router.push('/')
    } catch (error) {
      console.error('Logout error:', error)
      localStorage.clear()
      router.push('/')
    }
  }


  const renderActiveTab = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewTab dashboardData={dashboardData} />
      case 'applications':
        return (
          <ApplicationsTab
            allApplications={allApplications}
            onRefresh={fetchAllApplications}
            onUpdateStatus={updateApplicationStatus}
          />
        )
      case 'news':
        return (
          <NewsTab
            allNews={allNews}
            onRefresh={fetchAllNews}
            onSave={handleSaveNews}
            onDelete={handleDeleteNews}
          />
        )
      case 'testimonials':
        return (
          <TestimonialsTab
            allTestimonials={allTestimonials}
            onSave={handleSaveTestimonial}
            onDelete={handleDeleteTestimonial}
          />
        )
      case 'partners':
        return (
          <PartnersTab
            allPartners={allPartners}
            allEcosystemPartners={allEcosystemPartners}
            onSavePartner={handleSavePartner}
            onDeletePartner={handleDeletePartner}
            onSaveEcosystemPartner={handleSaveEcosystemPartner}
            onDeleteEcosystemPartner={handleDeleteEcosystemPartner}
          />
        )
      case 'settings':
        return (
          <SettingsTab
            userEmail={userEmail}
            smtpSettings={smtpSettings}
            onSmtpSettingsChange={setSmtpSettings}
            onSaveSmtpSettings={saveSmtpSettings}
            onTestSmtpConnection={testSmtpConnection}
            onRefreshSmtpSettings={fetchSmtpSettings}
            smtpLoading={smtpLoading}
            smtpTestLoading={smtpTestLoading}
            smtpSettingsLoading={smtpSettingsLoading}
          />
        )
      default:
        return <OverviewTab dashboardData={dashboardData} />
    }
  }

  return (
    <ChunkErrorBoundary>
      <DashboardLayout
        activeTab={activeTab}
        onTabChange={handleTabChange}
        userEmail={userEmail}
        onLogout={handleLogout}
      >
        {renderActiveTab()}
      </DashboardLayout>
    </ChunkErrorBoundary>
  )
}
