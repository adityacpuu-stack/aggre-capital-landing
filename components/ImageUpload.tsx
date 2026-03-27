"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Upload, X, Image as ImageIcon, Link as LinkIcon } from "lucide-react"
import Image from "next/image"

interface ImageUploadProps {
  value: string
  onChange: (url: string) => void
  label?: string
  placeholder?: string
}

export default function ImageUpload({ 
  value, 
  onChange, 
  label = "Featured Image", 
  placeholder = "https://example.com/image.jpg or upload file" 
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [showUrlInput, setShowUrlInput] = useState(false)
  const [urlInput, setUrlInput] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = async (file: File) => {
    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })

      if (response.ok) {
        const result = await response.json()
        onChange(result.url)
      } else {
        const error = await response.json()
        alert(`Upload failed: ${error.error}`)
      }
    } catch (error) {
      console.error('Upload error:', error)
      alert('Upload failed. Please try again.')
    } finally {
      setUploading(false)
    }
  }

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      handleFileUpload(file)
    }
  }

  const handleUrlSubmit = () => {
    if (urlInput) {
      onChange(urlInput)
      setUrlInput("")
      setShowUrlInput(false)
    }
  }

  const clearImage = () => {
    onChange("")
    setShowUrlInput(false)
    setUrlInput("")
  }

  return (
    <div className="space-y-3">
      <Label className="text-sm font-medium">{label}</Label>
      
      {value ? (
        <Card className="border border-gray-200">
          <CardContent className="p-4">
            <div className="relative">
              <div className="relative aspect-video w-full max-w-md mx-auto rounded-lg overflow-hidden">
                <Image
                  src={value}
                  alt="Preview"
                  fill
                  className="object-cover"
                />
              </div>
              <Button
                onClick={clearImage}
                variant="destructive"
                size="sm"
                className="absolute top-2 right-2"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-2 break-all">{value}</p>
          </CardContent>
        </Card>
      ) : (
        <Card className="border-2 border-dashed border-gray-300 hover:border-teal-400 transition-colors">
          <CardContent className="p-6">
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <ImageIcon className="h-12 w-12 text-gray-400" />
              </div>
              
              <div className="space-y-2">
                <p className="text-sm text-gray-600">Upload an image or enter URL</p>
                
                <div className="flex flex-col sm:flex-row gap-2 justify-center">
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    className="bg-teal-600 hover:bg-teal-700"
                  >
                    {uploading ? (
                      <div className="flex items-center space-x-2">
                        <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                        <span>Uploading...</span>
                      </div>
                    ) : (
                      <>
                        <Upload className="h-4 w-4 mr-2" />
                        Upload File
                      </>
                    )}
                  </Button>
                  
                  <Button
                    onClick={() => setShowUrlInput(!showUrlInput)}
                    variant="outline"
                  >
                    <LinkIcon className="h-4 w-4 mr-2" />
                    Add URL
                  </Button>
                </div>
              </div>

              {showUrlInput && (
                <div className="space-y-2 pt-4 border-t">
                  <Input
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    placeholder={placeholder}
                    className="w-full"
                  />
                  <div className="flex space-x-2 justify-center">
                    <Button onClick={handleUrlSubmit} size="sm" className="bg-teal-600 hover:bg-teal-700">
                      Add Image
                    </Button>
                    <Button onClick={() => setShowUrlInput(false)} variant="outline" size="sm">
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  )
}