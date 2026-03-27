"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Bold, 
  Italic, 
  Underline, 
  AlignLeft, 
  AlignCenter, 
  AlignRight,
  Image,
  List,
  ListOrdered,
  Upload,
  Link as LinkIcon,
  Heading1,
  Heading2,
  Heading3
} from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export default function RichTextEditor({ value, onChange, placeholder = "Tulis konten artikel di sini..." }: RichTextEditorProps) {
  const [showImageDialog, setShowImageDialog] = useState(false)
  const [showLinkDialog, setShowLinkDialog] = useState(false)
  const [imageUrl, setImageUrl] = useState("")
  const [linkUrl, setLinkUrl] = useState("")
  const [linkText, setLinkText] = useState("")
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState<{current: number, total: number}>({current: 0, total: 0})
  const [internalValue, setInternalValue] = useState(value || '')
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Sync internal value with prop value when it changes
  useEffect(() => {
    setInternalValue(value || '')
  }, [value])

  const insertText = (before: string, after: string = "", placeholder: string = "") => {
    const textarea = textareaRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = internalValue.slice(start, end)
    const textToInsert = selectedText || placeholder

    const newValue = 
      internalValue.slice(0, start) + 
      before + textToInsert + after + 
      internalValue.slice(end)

    setInternalValue(newValue)
    onChange(newValue)

    // Set cursor position after the inserted text
    setTimeout(() => {
      const newPosition = start + before.length + textToInsert.length + after.length
      textarea.setSelectionRange(newPosition, newPosition)
      textarea.focus()
    }, 0)
  }

  const insertAtCursor = (text: string) => {
    const textarea = textareaRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const newValue = value.slice(0, start) + text + value.slice(start)
    
    onChange(newValue)
    
    setTimeout(() => {
      const newPosition = start + text.length
      textarea.setSelectionRange(newPosition, newPosition)
      textarea.focus()
    }, 0)
  }

  const handleImageUpload = async (file: File, currentIndex?: number, totalFiles?: number) => {
    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })

      if (response.ok) {
        const result = await response.json()
        insertAtCursor(`\n\n![${file.name}](${result.url})\n\n`)
        
        // Update progress
        if (currentIndex && totalFiles) {
          setUploadProgress({current: currentIndex, total: totalFiles})
          
          // Close dialog after all uploads are complete
          if (currentIndex === totalFiles) {
            setShowImageDialog(false)
            setUploading(false)
          }
        } else {
          setShowImageDialog(false) // Close dialog after single upload
          setUploading(false)
        }
      } else {
        const error = await response.json()
        alert(`Upload failed: ${error.error}`)
        setUploading(false)
      }
    } catch (error) {
      console.error('Upload error:', error)
      alert('Upload failed. Please try again.')
      setUploading(false)
    }
  }

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files && files.length > 0) {
      const fileArray = Array.from(files)
      setUploadProgress({current: 0, total: fileArray.length})
      setUploading(true)
      
      // Upload all files at once
      handleMultipleImageUpload(fileArray)
    }
  }

  const handleMultipleImageUpload = async (files: File[]) => {
    try {
      const formData = new FormData()
      files.forEach(file => {
        formData.append('file', file)
      })

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })

      if (response.ok) {
        const result = await response.json()
        
        if (result.files && result.files.length > 0) {
          // Multiple files uploaded
          result.files.forEach((file: any, index: number) => {
            insertAtCursor(`\n\n![${file.originalName}](${file.url})\n\n`)
          })
        } else if (result.url) {
          // Single file uploaded
          insertAtCursor(`\n\n![${files[0].name}](${result.url})\n\n`)
        }
        
        setShowImageDialog(false)
        setUploading(false)
      } else {
        const error = await response.json()
        alert(`Upload failed: ${error.error}`)
        setUploading(false)
      }
    } catch (error) {
      console.error('Upload error:', error)
      alert('Upload failed. Please try again.')
      setUploading(false)
    }
  }

  const insertImage = () => {
    if (imageUrl) {
      insertAtCursor(`\n\n![Image](${imageUrl})\n\n`)
      setImageUrl("")
      setShowImageDialog(false)
    }
  }

  const insertLink = () => {
    if (linkUrl && linkText) {
      insertAtCursor(`[${linkText}](${linkUrl})`)
      setLinkUrl("")
      setLinkText("")
      setShowLinkDialog(false)
    }
  }

  const toolbarButtons = [
    { icon: Heading1, action: () => insertText("# ", "", "Heading 1"), title: "Heading 1" },
    { icon: Heading2, action: () => insertText("## ", "", "Heading 2"), title: "Heading 2" },
    { icon: Heading3, action: () => insertText("### ", "", "Heading 3"), title: "Heading 3" },
    { icon: Bold, action: () => insertText("**", "**", "bold text"), title: "Bold" },
    { icon: Italic, action: () => insertText("*", "*", "italic text"), title: "Italic" },
    { icon: Underline, action: () => insertText("<u>", "</u>", "underlined text"), title: "Underline" },
    { icon: AlignLeft, action: () => insertText('<div style="text-align: left;">', "</div>", "left aligned text"), title: "Align Left" },
    { icon: AlignCenter, action: () => insertText('<div style="text-align: center;">', "</div>", "centered text"), title: "Align Center" },
    { icon: AlignRight, action: () => insertText('<div style="text-align: right;">', "</div>", "right aligned text"), title: "Align Right" },
    { icon: List, action: () => insertText("\n- ", "", "list item"), title: "Bullet List" },
    { icon: ListOrdered, action: () => insertText("\n1. ", "", "list item"), title: "Numbered List" },
    { icon: LinkIcon, action: () => setShowLinkDialog(true), title: "Insert Link" },
    { icon: Image, action: () => setShowImageDialog(true), title: "Insert Image (Upload or URL)" },
  ]

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <Card className="border border-gray-200">
        <CardContent className="p-3">
          <div className="flex flex-wrap gap-1">
            {toolbarButtons.map((button, index) => (
              <Button
                key={index}
                variant="ghost"
                size="sm"
                onClick={button.action}
                title={button.title}
                disabled={uploading}
                className="p-2 h-8 w-8"
              >
                <button.icon className="h-4 w-4" />
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Editor */}
      <div className="relative">
        <Textarea
          ref={textareaRef}
          value={internalValue}
          onChange={(e) => {
            setInternalValue(e.target.value)
            onChange(e.target.value)
          }}
          placeholder={placeholder}
          className="min-h-[400px] font-mono text-sm resize-vertical"
        />
        
        {/* Upload indicator */}
        {uploading && (
          <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
            <div className="flex items-center space-x-2">
              <div className="animate-spin w-4 h-4 border-2 border-teal-600 border-t-transparent rounded-full"></div>
              <span className="text-sm text-gray-600">Uploading image...</span>
            </div>
          </div>
        )}
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Image Dialog */}
      {showImageDialog && (
        <Card className="border border-teal-200 bg-teal-50">
          <CardContent className="p-4">
            <div className="space-y-4">
              <Label className="text-sm font-medium">Insert Image</Label>
              
              {/* Upload Section */}
              <div className="space-y-3">
                <div className="text-xs font-medium text-gray-600 uppercase tracking-wide">Upload from Device</div>
                <div className="flex items-center space-x-3">
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    size="sm"
                    className="bg-teal-600 hover:bg-teal-700"
                  >
                    {uploading ? (
                      <div className="flex items-center space-x-2">
                        <div className="animate-spin w-3 h-3 border-2 border-white border-t-transparent rounded-full"></div>
                        <span>
                          {uploadProgress.total > 1 
                            ? `Uploading ${uploadProgress.total} files...`
                            : 'Uploading...'
                          }
                        </span>
                      </div>
                    ) : (
                      <>
                        <Upload className="h-3 w-3 mr-1" />
                        Choose Files
                      </>
                    )}
                  </Button>
                  <span className="text-xs text-gray-500">JPEG, PNG, WebP, GIF (max 5MB each) - Multiple files supported</span>
                </div>
                
                {/* Progress Bar */}
                {uploading && uploadProgress.total > 1 && (
                  <div className="mt-3">
                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                      <span>Upload Progress</span>
                      <span>{uploadProgress.total} files</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-teal-600 h-2 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                )}
              </div>

              {/* Divider */}
              <div className="flex items-center space-x-3">
                <div className="flex-1 border-t border-gray-300"></div>
                <span className="text-xs text-gray-500 uppercase">atau</span>
                <div className="flex-1 border-t border-gray-300"></div>
              </div>

              {/* URL Section */}
              <div className="space-y-3">
                <div className="text-xs font-medium text-gray-600 uppercase tracking-wide">Insert from URL</div>
                <Input
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  className="w-full"
                />
                <div className="flex space-x-2">
                  <Button 
                    onClick={insertImage} 
                    size="sm" 
                    className="bg-teal-600 hover:bg-teal-700"
                    disabled={!imageUrl || uploading}
                  >
                    Insert from URL
                  </Button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end pt-2">
                <Button onClick={() => setShowImageDialog(false)} variant="outline" size="sm">
                  Cancel
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Link Dialog */}
      {showLinkDialog && (
        <Card className="border border-teal-200 bg-teal-50">
          <CardContent className="p-4">
            <div className="space-y-3">
              <div>
                <Label className="text-sm font-medium">Link Text</Label>
                <Input
                  value={linkText}
                  onChange={(e) => setLinkText(e.target.value)}
                  placeholder="Link text"
                  className="w-full"
                />
              </div>
              <div>
                <Label className="text-sm font-medium">URL</Label>
                <Input
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  placeholder="https://example.com"
                  className="w-full"
                />
              </div>
              <div className="flex space-x-2">
                <Button onClick={insertLink} size="sm" className="bg-teal-600 hover:bg-teal-700">
                  Insert
                </Button>
                <Button onClick={() => setShowLinkDialog(false)} variant="outline" size="sm">
                  Cancel
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Preview */}
      <Card className="border border-gray-200">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <Label className="text-sm font-medium">Preview</Label>
            <Badge variant="outline" className="text-xs">
              Markdown + HTML supported
            </Badge>
          </div>
          <div 
            className="prose max-w-none text-sm border rounded p-3 bg-gray-50 min-h-[100px]"
            dangerouslySetInnerHTML={{ 
              __html: (internalValue || '')
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                .replace(/\*(.*?)\*/g, '<em>$1</em>')
                .replace(/# (.*?)$/gm, '<h1>$1</h1>')
                .replace(/## (.*?)$/gm, '<h2>$1</h2>')
                .replace(/### (.*?)$/gm, '<h3>$1</h3>')
                .replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1" style="max-width: 100%; height: auto;" />')
                .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank">$1</a>')
                .replace(/^\- (.*?)$/gm, '<li>$1</li>')
                .replace(/^(\d+)\. (.*?)$/gm, '<li>$1. $2</li>')
                .replace(/\n/g, '<br>')
            }}
          />
        </CardContent>
      </Card>
    </div>
  )
}