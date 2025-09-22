"use client"

import React from 'react'
import { Button } from '@/components/ui/button'
import { AlertCircle, RefreshCw } from 'lucide-react'

interface ChunkErrorBoundaryState {
  hasError: boolean
  error?: Error
}

interface ChunkErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export class ChunkErrorBoundary extends React.Component<ChunkErrorBoundaryProps, ChunkErrorBoundaryState> {
  constructor(props: ChunkErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ChunkErrorBoundaryState {
    // Check if it's a chunk loading error
    if (error.message.includes('Loading chunk') || error.message.includes('ChunkLoadError')) {
      return { hasError: true, error }
    }
    return { hasError: false }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Chunk Error Boundary caught an error:', error, errorInfo)
    
    // If it's a chunk loading error, try to reload the page
    if (error.message.includes('Loading chunk') || error.message.includes('ChunkLoadError')) {
      console.log('Chunk loading error detected, will reload page')
    }
  }

  handleRetry = () => {
    // Clear the error state
    this.setState({ hasError: false, error: undefined })
    
    // Reload the page to get fresh chunks
    window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="min-h-screen bg-gradient-to-br from-teal-900 via-gray-900 to-lime-900 flex items-center justify-center p-4">
          <div className="max-w-md w-full">
            <div className="bg-white/95 backdrop-blur-md rounded-2xl p-8 text-center shadow-2xl">
              <div className="mb-6">
                <div className="bg-red-100 rounded-full p-4 w-16 h-16 mx-auto mb-4">
                  <AlertCircle className="h-8 w-8 text-red-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Loading Error
                </h2>
                <p className="text-gray-600 mb-6">
                  There was an error loading the page. This usually happens when the application is updated.
                </p>
              </div>
              
              <div className="space-y-4">
                <Button
                  onClick={this.handleRetry}
                  className="w-full bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white font-semibold"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Reload Page
                </Button>
                
                <Button
                  onClick={() => window.location.href = '/'}
                  variant="outline"
                  className="w-full"
                >
                  Go to Homepage
                </Button>
              </div>
              
              <div className="mt-6 text-xs text-gray-500">
                <p>If this problem persists, please clear your browser cache and try again.</p>
              </div>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ChunkErrorBoundary
