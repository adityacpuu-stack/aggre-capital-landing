"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import ImageUpload from "@/components/ui/image-upload"
import { 
  Plus,
  Star,
  Edit,
  Trash2,
  Save
} from "lucide-react"

interface TestimonialsTabProps {
  allTestimonials: any[]
  onSave: (testimonialData: any, isEdit: boolean) => void
  onDelete: (testimonialId: number) => void
}

export default function TestimonialsTab({ 
  allTestimonials, 
  onSave, 
  onDelete 
}: TestimonialsTabProps) {
  const [selectedTestimonial, setSelectedTestimonial] = useState<any>(null)
  const [showTestimonialForm, setShowTestimonialForm] = useState(false)
  const [testimonialFormData, setTestimonialFormData] = useState({
    id: undefined as number | undefined,
    name: '',
    position: '',
    company: '',
    content: '',
    rating: 5,
    image: '',
    featured: false,
    status: 'active'
  })

  const handleSave = () => {
    onSave(testimonialFormData, !!selectedTestimonial)
    setShowTestimonialForm(false)
    setSelectedTestimonial(null)
    setTestimonialFormData({
      id: undefined,
      name: '', position: '', company: '', content: '', rating: 5, image: '', featured: false, status: 'active'
    })
  }

  const handleEdit = (testimonial: any) => {
    setSelectedTestimonial(testimonial)
    setTestimonialFormData({
      id: testimonial.id,
      name: testimonial.name,
      position: testimonial.role || '',
      company: testimonial.category || '',
      content: testimonial.content,
      rating: testimonial.rating,
      image: testimonial.avatar || '',
      featured: testimonial.featured || false,
      status: testimonial.status || 'active'
    })
    setShowTestimonialForm(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Testimoni Management</h2>
        <Button
          onClick={() => setShowTestimonialForm(true)}
          className="bg-teal-600 hover:bg-teal-700 text-white"
        >
          <Plus className="h-4 w-4 mr-2" />
          Tambah Testimoni
        </Button>
      </div>

      {/* Testimonials Form */}
      {showTestimonialForm && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Star className="h-5 w-5 mr-2 text-teal-600" />
              {selectedTestimonial ? 'Edit Testimoni' : 'Tambah Testimoni Baru'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama</label>
                <input
                  type="text"
                  value={testimonialFormData.name}
                  onChange={(e) => setTestimonialFormData({...testimonialFormData, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Nama customer"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Posisi</label>
                <input
                  type="text"
                  value={testimonialFormData.position}
                  onChange={(e) => setTestimonialFormData({...testimonialFormData, position: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Jabatan/Posisi"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Perusahaan</label>
                <input
                  type="text"
                  value={testimonialFormData.company}
                  onChange={(e) => setTestimonialFormData({...testimonialFormData, company: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Nama perusahaan"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                <select
                  value={testimonialFormData.rating}
                  onChange={(e) => setTestimonialFormData({...testimonialFormData, rating: parseInt(e.target.value)})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <option value={5}>⭐⭐⭐⭐⭐ (5 bintang)</option>
                  <option value={4}>⭐⭐⭐⭐ (4 bintang)</option>
                  <option value={3}>⭐⭐⭐ (3 bintang)</option>
                  <option value={2}>⭐⭐ (2 bintang)</option>
                  <option value={1}>⭐ (1 bintang)</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Testimoni</label>
              <textarea
                value={testimonialFormData.content}
                onChange={(e) => setTestimonialFormData({...testimonialFormData, content: e.target.value})}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Isi testimoni..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Foto</label>
              <ImageUpload
                value={testimonialFormData.image}
                onChange={(value) => setTestimonialFormData({...testimonialFormData, image: value})}
                placeholder="Upload foto testimoni (PNG, JPG, GIF)"
                maxSize={5}
              />
              {testimonialFormData.image && (
                <div className="mt-2 text-xs text-gray-500">
                  💡 Tip: Gunakan foto dengan resolusi tinggi untuk hasil terbaik
                </div>
              )}
            </div>

            <div className="flex items-center space-x-4">
              <label className="flex items-center space-x-2">
                <Switch
                  checked={testimonialFormData.featured}
                  onCheckedChange={(checked) => setTestimonialFormData({...testimonialFormData, featured: checked})}
                />
                <span className="text-sm font-medium text-gray-700">Featured</span>
              </label>
              <label className="flex items-center space-x-2">
                <Switch
                  checked={testimonialFormData.status === 'active'}
                  onCheckedChange={(checked) => setTestimonialFormData({...testimonialFormData, status: checked ? 'active' : 'inactive'})}
                />
                <span className="text-sm font-medium text-gray-700">Aktif</span>
              </label>
            </div>

            <div className="flex justify-end space-x-3">
              <Button
                variant="outline"
                onClick={() => {
                  setShowTestimonialForm(false)
                  setSelectedTestimonial(null)
                  setTestimonialFormData({
                    id: undefined,
                    name: '', position: '', company: '', content: '', rating: 5, image: '', featured: false, status: 'active'
                  })
                }}
              >
                Batal
              </Button>
              <Button 
                onClick={handleSave}
                className="bg-teal-600 hover:bg-teal-700 text-white"
              >
                <Save className="h-4 w-4 mr-2" />
                Simpan
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Testimonials List */}
      <Card>
        <CardHeader>
          <CardTitle>Daftar Testimoni ({allTestimonials.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {allTestimonials.length === 0 ? (
            <div className="text-center py-12">
              <Star className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Belum ada testimoni</h3>
              <p className="text-gray-600 mb-4">Mulai tambahkan testimoni dari customer untuk meningkatkan kredibilitas.</p>
              <Button
                onClick={() => setShowTestimonialForm(true)}
                className="bg-teal-600 hover:bg-teal-700 text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                Tambah Testimoni Pertama
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {allTestimonials.map((testimonial) => (
                <div key={testimonial.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
                          <Star className="h-5 w-5 text-teal-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                          <p className="text-sm text-gray-600">{testimonial.role}</p>
                        </div>
                      </div>
                      <p className="text-gray-700 mb-2">{testimonial.content}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 mr-1" />
                          {testimonial.rating}/5
                        </div>
                        <span className="px-2 py-1 bg-teal-100 text-teal-800 rounded-full text-xs">
                          {testimonial.category}
                        </span>
                        {testimonial.featured && (
                          <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">
                            Featured
                          </span>
                        )}
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          testimonial.status === 'active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {testimonial.status}
                        </span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(testimonial)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600 hover:text-red-700"
                        onClick={() => {
                          if (confirm('Apakah Anda yakin ingin menghapus testimoni ini?')) {
                            onDelete(testimonial.id)
                          }
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
