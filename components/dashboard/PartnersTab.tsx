"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import ImageUpload from "@/components/ui/image-upload"
import { 
  Plus,
  Building2,
  Globe,
  Edit,
  Trash2,
  Save,
  Star,
  Calendar,
  MapPin
} from "lucide-react"

interface PartnersTabProps {
  allPartners: any[]
  allEcosystemPartners: any[]
  onSavePartner: (partnerData: any, isEdit: boolean) => void
  onDeletePartner: (partnerId: number) => void
  onSaveEcosystemPartner: (partnerData: any, isEdit: boolean) => void
  onDeleteEcosystemPartner: (partnerId: number) => void
}

export default function PartnersTab({
  allPartners,
  allEcosystemPartners,
  onSavePartner,
  onDeletePartner,
  onSaveEcosystemPartner,
  onDeleteEcosystemPartner
}: PartnersTabProps) {
  const [selectedPartner, setSelectedPartner] = useState<any>(null)
  const [showPartnerForm, setShowPartnerForm] = useState(false)
  const [partnerFormData, setPartnerFormData] = useState({
    id: undefined as number | undefined,
    name: '',
    subtitle: '',
    description: '',
    logo: '',
    established: '',
    location: '',
    services: [] as string[],
    achievements: [] as string[],
    contact: { phone: '', email: '', address: '' },
    color: 'from-teal-500 to-teal-600',
    type: 'BPR',
    featured: false,
    sort_order: 0,
    status: 'active'
  })
  
  // Separate state for input text fields
  const [servicesInput, setServicesInput] = useState('')
  const [achievementsInput, setAchievementsInput] = useState('')

  const [selectedEcosystemPartner, setSelectedEcosystemPartner] = useState<any>(null)
  const [showEcosystemPartnerForm, setShowEcosystemPartnerForm] = useState(false)
  const [ecosystemPartnerFormData, setEcosystemPartnerFormData] = useState({
    id: undefined as number | undefined,
    name: '',
    subtitle: '',
    logo: '',
    category: 'Other',
    sort_order: 0
  })

  const handleSavePartner = async () => {
    try {
      await onSavePartner(partnerFormData, !!selectedPartner)
      setShowPartnerForm(false)
      setSelectedPartner(null)
      setPartnerFormData({
        id: undefined, name: '', subtitle: '', description: '', logo: '', established: '', location: '',
        services: [], achievements: [], contact: { phone: '', email: '', address: '' },
        color: 'from-teal-500 to-teal-600', type: 'BPR', featured: false, sort_order: 0, status: 'active'
      })
      // Reset input fields
      setServicesInput('')
      setAchievementsInput('')
    } catch (error) {
      console.error('Failed to save partner:', error)
      alert('Gagal menyimpan partner. Silakan coba lagi.')
    }
  }

  const handleEditPartner = (partner: any) => {
    setSelectedPartner(partner)
    setPartnerFormData({
      id: partner.id, // Pastikan ID ter-include
      name: partner.name || '',
      subtitle: partner.subtitle || '',
      description: partner.description || '',
      logo: partner.logo || '',
      established: partner.established || '',
      location: partner.location || '',
      services: Array.isArray(partner.services) ? partner.services : [],
      achievements: Array.isArray(partner.achievements) ? partner.achievements : [],
      contact: partner.contact || { phone: '', email: '', address: '' },
      color: partner.color || 'from-teal-500 to-teal-600',
      type: partner.type || 'BPR',
      featured: partner.featured || false,
      sort_order: partner.sort_order || 0,
      status: partner.status || 'active'
    })
    // Update input fields for display
    setServicesInput(Array.isArray(partner.services) ? partner.services.join(', ') : '')
    setAchievementsInput(Array.isArray(partner.achievements) ? partner.achievements.join(', ') : '')
    setShowPartnerForm(true)
  }

  const handleSaveEcosystemPartner = async () => {
    try {
      await onSaveEcosystemPartner(ecosystemPartnerFormData, !!selectedEcosystemPartner)
      setShowEcosystemPartnerForm(false)
      setSelectedEcosystemPartner(null)
      setEcosystemPartnerFormData({
        id: undefined, name: '', subtitle: '', logo: '', category: 'Other', sort_order: 0
      })
    } catch (error) {
      console.error('Failed to save ecosystem partner:', error)
      alert('Gagal menyimpan ecosystem partner. Silakan coba lagi.')
    }
  }

  const handleEditEcosystemPartner = (partner: any) => {
    setSelectedEcosystemPartner(partner)
    setEcosystemPartnerFormData({
      id: partner.id, // Pastikan ID ter-include
      name: partner.name || '',
      subtitle: partner.subtitle || '',
      logo: partner.logo || '',
      category: partner.category || 'Other',
      sort_order: partner.sort_order || 0
    })
    setShowEcosystemPartnerForm(true)
  }

  return (
    <div className="space-y-6">
      {/* Strategic Partners Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Strategic Partners Management</h2>
          <Button
            onClick={() => {
              setShowPartnerForm(true)
              // Reset input fields for new partner
              setServicesInput('')
              setAchievementsInput('')
            }}
            className="bg-teal-600 hover:bg-teal-700 text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            Tambah Partner
          </Button>
        </div>

        {/* Partner Form */}
        {showPartnerForm && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Building2 className="h-5 w-5 mr-2 text-teal-600" />
                {selectedPartner ? 'Edit Partner' : 'Tambah Partner Baru'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nama Partner</label>
                  <input
                    type="text"
                    value={partnerFormData.name}
                    onChange={(e) => setPartnerFormData({...partnerFormData, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="Nama institusi/perusahaan"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
                  <input
                    type="text"
                    value={partnerFormData.subtitle}
                    onChange={(e) => setPartnerFormData({...partnerFormData, subtitle: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="Subtitle partner"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tipe</label>
                  <select
                    value={partnerFormData.type}
                    onChange={(e) => setPartnerFormData({...partnerFormData, type: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="BPR">🏪 BPR</option>
                    <option value="Bank">🏦 Bank</option>
                    <option value="Fintech">💳 Fintech</option>
                    <option value="Technology">💻 Technology</option>
                    <option value="Insurance">🛡️ Asuransi</option>
                    <option value="Government">🏛️ Pemerintah</option>
                    <option value="Other">🤝 Lainnya</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tahun Berdiri</label>
                  <input
                    type="text"
                    value={partnerFormData.established}
                    onChange={(e) => setPartnerFormData({...partnerFormData, established: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="2010"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Lokasi</label>
                <input
                  type="text"
                  value={partnerFormData.location}
                  onChange={(e) => setPartnerFormData({...partnerFormData, location: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Jakarta, Indonesia"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
                <textarea
                  value={partnerFormData.description}
                  onChange={(e) => setPartnerFormData({...partnerFormData, description: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Deskripsi partnership dan manfaatnya..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Layanan Utama (pisahkan dengan koma)</label>
                <input
                  type="text"
                  value={servicesInput}
                  onChange={(e) => {
                    setServicesInput(e.target.value)
                    // Update the services array when user types
                    const services = e.target.value.split(',').map(s => s.trim()).filter(s => s)
                    setPartnerFormData({...partnerFormData, services})
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Kredit Modal Kerja, Kredit Investasi, Kredit Konsumsi, Simpanan Berjangka"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Pencapaian & Prestasi (pisahkan dengan koma)</label>
                <input
                  type="text"
                  value={achievementsInput}
                  onChange={(e) => {
                    setAchievementsInput(e.target.value)
                    // Update the achievements array when user types
                    const achievements = e.target.value.split(',').map(s => s.trim()).filter(s => s)
                    setPartnerFormData({...partnerFormData, achievements})
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Aset Rp 500+ Miliar, 15.000+ Nasabah Aktif, Rating A- (Excellent), ISO 9001:2015 Certified"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Telepon</label>
                  <input
                    type="text"
                    value={partnerFormData.contact.phone}
                    onChange={(e) => setPartnerFormData({...partnerFormData, contact: {...partnerFormData.contact, phone: e.target.value}})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="+62 21 7890 1111"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={partnerFormData.contact.email}
                    onChange={(e) => setPartnerFormData({...partnerFormData, contact: {...partnerFormData.contact, email: e.target.value}})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="info@bpr-olympindo-sejahtera.co.id"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Alamat</label>
                <textarea
                  value={partnerFormData.contact.address}
                  onChange={(e) => setPartnerFormData({...partnerFormData, contact: {...partnerFormData.contact, address: e.target.value}})}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Jl. Sudirman No. 45, Jakarta Pusat"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Warna Tema</label>
                <select
                  value={partnerFormData.color}
                  onChange={(e) => setPartnerFormData({...partnerFormData, color: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <option value="from-teal-500 to-teal-600">Teal</option>
                  <option value="from-blue-500 to-blue-600">Blue</option>
                  <option value="from-green-500 to-green-600">Green</option>
                  <option value="from-purple-500 to-purple-600">Purple</option>
                  <option value="from-orange-500 to-orange-600">Orange</option>
                  <option value="from-red-500 to-red-600">Red</option>
                  <option value="from-indigo-500 to-indigo-600">Indigo</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Logo</label>
                <ImageUpload
                  value={partnerFormData.logo}
                  onChange={(value) => setPartnerFormData({...partnerFormData, logo: value})}
                  placeholder="Upload logo partner (PNG, JPG, GIF)"
                  maxSize={5}
                />
                {partnerFormData.logo && (
                  <div className="mt-2 text-xs text-gray-500">
                    💡 Tip: Gunakan gambar dengan resolusi tinggi untuk hasil terbaik
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2">
                  <Switch
                    checked={partnerFormData.featured}
                    onCheckedChange={(checked) => setPartnerFormData({...partnerFormData, featured: checked})}
                  />
                  <span className="text-sm font-medium text-gray-700">Featured</span>
                </label>
                <label className="flex items-center space-x-2">
                  <Switch
                    checked={partnerFormData.status === 'active'}
                    onCheckedChange={(checked) => setPartnerFormData({...partnerFormData, status: checked ? 'active' : 'inactive'})}
                  />
                  <span className="text-sm font-medium text-gray-700">Aktif</span>
                </label>
              </div>

              <div className="flex justify-end space-x-3">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowPartnerForm(false)
                    setSelectedPartner(null)
                    // Reset input fields
                    setServicesInput('')
                    setAchievementsInput('')
                  }}
                >
                  Batal
                </Button>
                <Button 
                  onClick={handleSavePartner}
                  className="bg-teal-600 hover:bg-teal-700 text-white"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Simpan
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Partners List */}
        <Card>
          <CardHeader>
            <CardTitle>Daftar Strategic Partners</CardTitle>
          </CardHeader>
          <CardContent>
            {allPartners.length === 0 ? (
              <div className="text-center py-12">
                <Building2 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Belum ada strategic partners</h3>
                <p className="text-gray-600 mb-4">Mulai tambahkan partner strategis untuk memperkuat ekosistem bisnis.</p>
                <Button
                  onClick={() => {
                    setShowPartnerForm(true)
                    // Reset input fields for new partner
                    setServicesInput('')
                    setAchievementsInput('')
                  }}
                  className="bg-teal-600 hover:bg-teal-700 text-white"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Tambah Partner Pertama
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {allPartners.map((partner) => (
                  <div key={partner.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        {partner.logo && (
                          <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                            <img src={partner.logo} alt={partner.name} className="w-10 h-10 object-contain" />
                          </div>
                        )}
                        <div>
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="font-semibold text-lg text-gray-900">{partner.name}</h3>
                            {partner.subtitle && (
                              <span className="text-sm text-gray-500">- {partner.subtitle}</span>
                            )}
                            {partner.featured && (
                              <Badge className="bg-yellow-100 text-yellow-800">
                                <Star className="h-3 w-3 mr-1" />
                                Featured
                              </Badge>
                            )}
                          </div>
                          <p className="text-gray-600 text-sm mb-2">{partner.description}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            {partner.type && (
                              <span className="flex items-center">
                                <Building2 className="h-4 w-4 mr-1" />
                                {partner.type}
                              </span>
                            )}
                            {partner.established && (
                              <span className="flex items-center">
                                <Calendar className="h-4 w-4 mr-1" />
                                {partner.established}
                              </span>
                            )}
                            {partner.location && (
                              <span className="flex items-center">
                                <MapPin className="h-4 w-4 mr-1" />
                                {partner.location}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditPartner(partner)}
                        >
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onDeletePartner(partner.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Hapus
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

      {/* Ecosystem Partners Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Ecosystem Partners Management</h2>
          <Button
            onClick={() => setShowEcosystemPartnerForm(true)}
            className="bg-lime-600 hover:bg-lime-700 text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            Tambah Ecosystem Partner
          </Button>
        </div>

        {/* Ecosystem Partner Form */}
        {showEcosystemPartnerForm && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="h-5 w-5 mr-2 text-lime-600" />
                {selectedEcosystemPartner ? 'Edit Ecosystem Partner' : 'Tambah Ecosystem Partner Baru'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nama Partner</label>
                  <input
                    type="text"
                    value={ecosystemPartnerFormData.name}
                    onChange={(e) => setEcosystemPartnerFormData({...ecosystemPartnerFormData, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500"
                    placeholder="Nama partner ekosistem"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
                  <input
                    type="text"
                    value={ecosystemPartnerFormData.subtitle}
                    onChange={(e) => setEcosystemPartnerFormData({...ecosystemPartnerFormData, subtitle: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500"
                    placeholder="Tagline/subtitle partner"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
                  <select
                    value={ecosystemPartnerFormData.category}
                    onChange={(e) => setEcosystemPartnerFormData({...ecosystemPartnerFormData, category: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500"
                  >
                    <option value="Bank">🏦 Bank</option>
                    <option value="Fintech">💳 Fintech</option>
                    <option value="Marketplace">🛒 Marketplace</option>
                    <option value="Technology">💻 Technology</option>
                    <option value="Finance">💰 Finance</option>
                    <option value="Other">🤝 Lainnya</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sort Order</label>
                  <input
                    type="number"
                    value={ecosystemPartnerFormData.sort_order}
                    onChange={(e) => setEcosystemPartnerFormData({...ecosystemPartnerFormData, sort_order: parseInt(e.target.value) || 0})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500"
                    placeholder="0"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Logo</label>
                <ImageUpload
                  value={ecosystemPartnerFormData.logo}
                  onChange={(value) => setEcosystemPartnerFormData({...ecosystemPartnerFormData, logo: value})}
                  placeholder="Upload logo ecosystem partner (PNG, JPG, GIF)"
                  maxSize={5}
                />
                {ecosystemPartnerFormData.logo && (
                  <div className="mt-2 text-xs text-gray-500">
                    💡 Tip: Gunakan gambar dengan resolusi tinggi untuk hasil terbaik
                  </div>
                )}
              </div>

              <div className="flex justify-end space-x-3">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowEcosystemPartnerForm(false)
                    setSelectedEcosystemPartner(null)
                  }}
                >
                  Batal
                </Button>
                <Button 
                  onClick={handleSaveEcosystemPartner}
                  className="bg-lime-600 hover:bg-lime-700 text-white"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Simpan
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Ecosystem Partners List */}
        <Card>
          <CardHeader>
            <CardTitle>Daftar Ecosystem Partners</CardTitle>
          </CardHeader>
          <CardContent>
            {allEcosystemPartners.length === 0 ? (
              <div className="text-center py-12">
                <Globe className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Belum ada ecosystem partners</h3>
                <p className="text-gray-600 mb-4">Tambahkan partner ekosistem untuk memperkuat jaringan layanan.</p>
                <Button
                  onClick={() => setShowEcosystemPartnerForm(true)}
                  className="bg-lime-600 hover:bg-lime-700 text-white"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Tambah Ecosystem Partner Pertama
                </Button>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {allEcosystemPartners.map((partner) => (
                  <div key={partner.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="text-center space-y-3">
                      {partner.logo ? (
                        <div className="w-12 h-12 mx-auto bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden border border-gray-200">
                          <img src={partner.logo} alt={partner.name} className="w-10 h-10 object-contain" />
                        </div>
                      ) : (
                        <div className="w-12 h-12 mx-auto bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                          <Building2 className="h-6 w-6 text-gray-500" />
                        </div>
                      )}
                      <div>
                        <h3 className="font-semibold text-gray-900">{partner.name}</h3>
                        <p className="text-sm text-gray-500">{partner.subtitle}</p>
                        <Badge className="mt-2 bg-lime-100 text-lime-800 text-xs">
                          {partner.category}
                        </Badge>
                      </div>
                      <div className="flex justify-center space-x-2 pt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditEcosystemPartner(partner)}
                        >
                          <Edit className="h-3 w-3 mr-1" />
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onDeleteEcosystemPartner(partner.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-3 w-3 mr-1" />
                          Hapus
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
    </div>
  )
}
