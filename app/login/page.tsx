"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { 
  Eye, 
  EyeOff, 
  LogIn, 
  Shield, 
  Mail,
  Lock,
  ArrowLeft,
  AlertCircle
} from "lucide-react"
import Link from "next/link"
import { apiClient } from "@/lib/api-client"
import ChunkErrorBoundary from "@/components/ChunkErrorBoundary"

export default function LoginPage() {
  const router = useRouter()
  
  // Form state
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })
  
  // UI state
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isCheckingAuth, setIsCheckingAuth] = useState(true)
  const [error, setError] = useState("")

  // Check if user is already logged in
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check if session_id cookie exists
        const hasSessionCookie = document.cookie.includes('session_id=')
        
        if (hasSessionCookie) {
          // Verify session with server
          const result = await apiClient.verifySession()
          
          if (result.success) {
            // User is already logged in, redirect to dashboard
            window.location.href = '/dashboard'
            return
          }
        }
      } catch (error) {
        // No valid session found
      } finally {
        setIsCheckingAuth(false)
      }
    }

    checkAuth()
  }, [])

  // Handle form input changes
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (error) setError("")
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const result = await apiClient.login(formData.email, formData.password)

      if (result.success && result.data) {
        // Login successful, redirect to dashboard
        window.location.href = '/dashboard'
      } else {
        setError(result.error || 'Login failed')
      }
    } catch (error: any) {
      console.error('Login error:', error)
      
      let errorMessage = 'Login failed. Please try again.'
      
      if (error?.error) {
        errorMessage = error.error
      } else if (error?.message?.includes('Failed to fetch')) {
        errorMessage = 'Unable to connect to server. Please check your connection.'
      }
      
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }


  // Show loading screen while checking authentication
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-900 via-gray-900 to-lime-900 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl inline-block mb-4">
            <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-white text-lg">Checking authentication...</p>
        </div>
      </div>
    )
  }

  return (
    <ChunkErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-teal-900 via-gray-900 to-lime-900 flex items-center justify-center p-4">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-lime-500/20 to-teal-500/20 animate-pulse"></div>
          <div className="absolute top-20 left-20 w-64 h-64 bg-teal-500/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-lime-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        </div>

        {/* Back to Homepage */}
        <Link 
          href="/"
          className="absolute top-6 left-6 flex items-center space-x-2 text-gray-300 hover:text-lime-400 transition-colors duration-300 z-10"
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="font-medium">Kembali ke Beranda</span>
        </Link>

        <div className="w-full max-w-md relative z-10">
          {/* Logo Section */}
          <div className="text-center mb-8">
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl inline-block mb-4">
              <img
                src="/images/logo.png"
                alt="AGGRE CAPITAL"
                width="120"
                height="40"
                className="object-contain"
              />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Dashboard Login</h1>
            <p className="text-gray-300">Akses ke portal manajemen AGGRE CAPITAL</p>
          </div>

          {/* Login Card */}
          <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-md">
            <CardHeader className="space-y-1 pb-6">
              <div className="flex items-center justify-center mb-4">
                <div className="bg-gradient-to-r from-teal-500 to-teal-600 p-3 rounded-full">
                  <Shield className="h-6 w-6 text-white" />
                </div>
              </div>
              <CardTitle className="text-2xl font-bold text-center text-gray-900">
                Secure Login
              </CardTitle>
              <div className="flex justify-center">
                <Badge className="bg-gradient-to-r from-lime-500 to-lime-600 text-white px-3 py-1">
                  Admin Portal
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-2">
                  <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
                  <p className="text-red-800 text-sm">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Field */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-semibold text-gray-700 flex items-center">
                    <Mail className="h-4 w-4 mr-2 text-teal-600" />
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="admin@aggrecapital.com"
                    className="h-12 border-gray-300 focus:border-teal-500 focus:ring-teal-500"
                    required
                    disabled={isLoading}
                  />
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-semibold text-gray-700 flex items-center">
                    <Lock className="h-4 w-4 mr-2 text-teal-600" />
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
                      placeholder="••••••••"
                      className="h-12 border-gray-300 focus:border-teal-500 focus:ring-teal-500 pr-12"
                      required
                      disabled={isLoading}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={isLoading}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="remember"
                      className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                      disabled={isLoading}
                    />
                    <Label htmlFor="remember" className="text-sm text-gray-600">
                      Remember me
                    </Label>
                  </div>
                  <Link 
                    href="#" 
                    className="text-sm text-teal-600 hover:text-teal-700 font-medium"
                  >
                    Forgot password?
                  </Link>
                </div>

                {/* Login Button */}
                <Button
                  type="submit"
                  className="w-full h-12 bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Signing In...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <LogIn className="h-5 w-5" />
                      <span>Sign In to Dashboard</span>
                    </div>
                  )}
                </Button>
              </form>

              {/* Security Notice */}
              <div className="text-center">
                <p className="text-xs text-gray-500">
                  Protected by enterprise-grade security. Your data is encrypted and secure.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="text-center mt-8">
            <p className="text-sm text-gray-400">
              &copy; 2024 AGGRE CAPITAL. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </ChunkErrorBoundary>
  )
}