"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Upload, X, Image as ImageIcon } from "lucide-react"

interface ImageUploadProps {
  value?: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
  accept?: string
  maxSize?: number // in MB
}

export default function ImageUpload({
  value,
  onChange,
  placeholder = "Pilih gambar...",
  className = "",
  accept = "image/*",
  maxSize = 5
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (file: File) => {
    setError("")
    
    // Validate file size
    if (file.size > maxSize * 1024 * 1024) {
      setError(`File terlalu besar. Maksimal ${maxSize}MB`)
      return
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError("File harus berupa gambar")
      return
    }

    setIsUploading(true)

    try {
      // Convert file to base64
      const base64 = await convertToBase64(file)
      onChange(base64)
    } catch (err) {
      setError("Gagal mengupload file")
      console.error("Upload error:", err)
    } finally {
      setIsUploading(false)
    }
  }

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = error => reject(error)
    })
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  const handleRemove = () => {
    onChange("")
    setError("")
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  return (
    <div className={`space-y-2 ${className}`}>
      <div
        className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors ${
          value 
            ? 'border-teal-300 bg-teal-50' 
            : 'border-gray-300 hover:border-teal-400 hover:bg-gray-50'
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={handleClick}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleFileInputChange}
          className="hidden"
        />
        
        {value ? (
          <div className="space-y-2">
            <div className="w-20 h-20 mx-auto bg-white rounded-lg border border-gray-200 overflow-hidden">
              <img 
                src={value} 
                alt="Preview" 
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-sm text-gray-600">Gambar dipilih</p>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation()
                handleRemove()
              }}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <X className="h-4 w-4 mr-1" />
              Hapus
            </Button>
          </div>
        ) : (
          <div className="space-y-2">
            {isUploading ? (
              <div className="space-y-2">
                <div className="w-8 h-8 mx-auto border-2 border-teal-600 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-sm text-gray-600">Mengupload...</p>
              </div>
            ) : (
              <div className="space-y-2">
                <Upload className="h-8 w-8 mx-auto text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-700">Klik untuk upload atau drag & drop</p>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF hingga {maxSize}MB</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
      
      {!value && (
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <ImageIcon className="h-4 w-4" />
          <span>{placeholder}</span>
        </div>
      )}
    </div>
  )
}
