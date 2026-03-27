"use client"

import { useState, useEffect } from "react"
import { apiClient } from "@/lib/api-client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import SEO from "@/components/SEO"
import { seoConfigs } from "@/lib/seo"
import { 
  ArrowLeft, 
  Calendar, 
  User, 
  TrendingUp, 
  Award,
  Building2,
  Users,
  Star,
  Zap,
  Shield,
  ChevronDown,
  ChevronUp,
  Search,
  Filter,
  Globe,
  BookOpen,
  Newspaper,
  Clock,
  Eye,
  Tag,
  ChevronRight,
  X,
  ArrowRight,
  Heart,
  Share2,
  Bookmark,
  MoreHorizontal,
  Home,
  Phone
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function NewsPage() {
  const [expandedArticles, setExpandedArticles] = useState<number[]>([])
  const [newsArticles, setNewsArticles] = useState<any[]>([])
  const [featuredArticles, setFeaturedArticles] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [showFilters, setShowFilters] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalArticles, setTotalArticles] = useState(0)
  const articlesPerPage = 9

  useEffect(() => {
    fetchNews()
  }, [currentPage, searchTerm, selectedCategory])

  // Fallback data if API fails
  const fallbackArticles = [
    {
      id: 1,
      title: "AGGRE CAPITAL Meraih Penghargaan 'Best Fintech Innovation 2024'",
      excerpt: "Atas inovasi dalam digitalisasi proses pendanaan yang memudahkan nasabah, AGGRE CAPITAL meraih pengakuan sebagai fintech terdepan.",
      content: "AGGRE CAPITAL berhasil meraih penghargaan bergengsi 'Best Fintech Innovation 2024' dari Indonesian Fintech Association.",
      author: "Tim AGGRE CAPITAL",
      category: "Achievement",
      featured: true,
      views: 1250,
      read_time: 5,
      slug: "aggre-capital-best-fintech-2024",
      date: "15 Januari 2024"
    },
    {
      id: 2,
      title: "Ekspansi Partnership: Kerjasama dengan 3 BPR Baru",
      excerpt: "AGGRE CAPITAL memperluas jaringan kemitraan dengan menandatangani MOU dengan tiga Bank Perkreditan Rakyat terpercaya.",
      content: "Dalam rangka memperkuat ekosistem keuangan, AGGRE CAPITAL telah menandatangani Memorandum of Understanding dengan tiga Bank Perkreditan Rakyat ternama.",
      author: "Rian - Founder & CEO",
      category: "Partnership",
      featured: false,
      views: 890,
      read_time: 4,
      slug: "ekspansi-partnership-3-bpr-baru",
      date: "8 Januari 2024"
    },
    {
      id: 3,
      title: "Tips Memilih Pinjaman Online yang Aman dan Terpercaya",
      excerpt: "Panduan lengkap memilih pinjaman online yang aman dari AGGRE CAPITAL, termasuk tips memeriksa legalitas dan keamanan data.",
      content: "Panduan lengkap memilih pinjaman online yang aman dari AGGRE CAPITAL, termasuk tips memeriksa legalitas dan keamanan data.",
      author: "AGGRE CAPITAL",
      category: "Education",
      featured: false,
      views: 2100,
      read_time: 6,
      slug: "tips-memilih-pinjaman-online-aman",
      date: "5 Januari 2024"
    }
  ]

  const fetchNews = async () => {
    try {
      setLoading(true)
      
      // Build query parameters for public API
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: articlesPerPage.toString()
      })
      
      if (searchTerm) {
        params.set('search', searchTerm)
      }
      
      if (selectedCategory !== 'all') {
        params.set('category', selectedCategory)
      }

      // Fetch all published articles with pagination using public API
      const [allResponse, featuredResponse] = await Promise.all([
        fetch(`/api/news/public?${params.toString()}`),
        fetch('/api/news/public?featured=true&limit=3')
      ])

      const [allResult, featuredResult] = await Promise.all([
        allResponse.json(),
        featuredResponse.json()
      ])

      if (allResult.success && featuredResult.success) {
        setNewsArticles(Array.isArray(allResult.data) ? allResult.data : [])
        setTotalArticles(allResult.pagination?.total || 0)
        setFeaturedArticles(Array.isArray(featuredResult.data) ? featuredResult.data : [])
      } else {
        console.error('API returned error:', allResult.error || featuredResult.error)
        setNewsArticles([])
        setFeaturedArticles([])
      }
    } catch (error) {
      console.error('Failed to fetch news:', error)
      setNewsArticles([])
      setFeaturedArticles([])
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setCurrentPage(1)
    fetchNews()
  }

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category)
    setCurrentPage(1)
  }

  const toggleArticle = (articleId: number) => {
    setExpandedArticles(prev => 
      prev.includes(articleId) 
        ? prev.filter(id => id !== articleId)
        : [...prev, articleId]
    )
  }

  if (loading && newsArticles.length === 0) {
    return (
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 via-white to-teal-50">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin w-12 h-12 border-4 border-teal-600 border-t-transparent rounded-full mx-auto mb-6"></div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Memuat Berita</h3>
            <p className="text-gray-600">Mohon tunggu sebentar...</p>
          </div>
        </div>
      </div>
    )
  }


  const categories = [
    { id: 'all', name: 'Semua Artikel', icon: Globe, count: totalArticles, color: 'gray' },
    { id: 'News', name: 'Berita', icon: Newspaper, color: 'blue' },
    { id: 'Achievement', name: 'Prestasi', icon: Award, color: 'yellow' },
    { id: 'Partnership', name: 'Kemitraan', icon: Building2, color: 'green' },
    { id: 'Innovation', name: 'Inovasi', icon: Zap, color: 'purple' },
    { id: 'Education', name: 'Edukasi', icon: BookOpen, color: 'indigo' },
    { id: 'Analysis', name: 'Analisis', icon: TrendingUp, color: 'teal' },
    { id: 'Press Release', name: 'Press Release', icon: Users, color: 'orange' },
    { id: 'Event', name: 'Event', icon: Star, color: 'pink' },
    { id: 'CSR', name: 'CSR', icon: Shield, color: 'emerald' }
  ]

  const getCategoryIcon = (category: string) => {
    const categoryData = categories.find(cat => cat.id === category)
    return categoryData ? categoryData.icon : Newspaper
  }

  const getCategoryColor = (category: string) => {
    const categoryData = categories.find(cat => cat.id === category)
    if (categoryData) {
      const color = categoryData.color
      return `from-${color}-500 to-${color}-600`
    }
    return 'from-blue-500 to-blue-600'
  }

  const totalPages = Math.ceil(totalArticles / articlesPerPage)

  // Use database articles or fallback
  const displayArticles = newsArticles.length > 0 ? newsArticles : fallbackArticles
  const displayFeatured = featuredArticles.length > 0 ? featuredArticles : fallbackArticles.filter(article => article.featured)
  const regularArticles = displayArticles.filter(article => !article.featured)

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 via-white to-teal-50">
      <SEO seo={seoConfigs.news} />
      

      {/* Back Home Button */}
      <div className="fixed top-6 left-6 z-50">
        <Link 
          href="/"
          className="flex items-center space-x-2 bg-white/90 backdrop-blur-md text-gray-700 hover:text-teal-600 hover:bg-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 font-medium group"
        >
          <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform duration-300" />
          <span className="hidden sm:inline">Kembali ke Beranda</span>
          <span className="sm:hidden">Kembali</span>
        </Link>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-teal-600 via-teal-700 to-blue-800 text-white py-12 md:py-16 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-white/5 to-transparent"></div>
          <div className="absolute -top-20 -right-20 w-60 h-60 bg-lime-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-teal-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }}></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <Badge className="bg-gradient-to-r from-lime-500 to-lime-400 text-white px-4 py-2 text-sm font-semibold mb-6 shadow-lg">
                <Newspaper className="w-4 h-4 mr-2" />
                Berita & Update Terkini
              </Badge>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                <span className="block">News &</span>
                <span className="block bg-gradient-to-r from-lime-300 to-yellow-300 bg-clip-text text-transparent">
                  Updates
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-teal-100 mb-8 leading-relaxed max-w-3xl mx-auto">
                Berita terkini dan pencapaian terbaru dari tim AGGRE CAPITAL dalam mengembangkan solusi keuangan inovatif
              </p>
            </div>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <form onSubmit={handleSearch} className="relative">
                <div className="flex gap-2 bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/20 shadow-xl">
                  <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/70 h-5 w-5" />
                    <input
                      type="text"
                      placeholder="Cari artikel, berita, atau topik..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 text-white placeholder-white/70 bg-transparent border-0 focus:outline-none font-medium"
                    />
                  </div>
                  <Button
                    type="submit"
                    size="sm"
                    className="bg-white text-teal-700 hover:bg-gray-100 px-6 py-3 font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
                  >
                    <Search className="h-4 w-4 mr-2" />
                    Cari
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setShowFilters(!showFilters)}
                    className={`px-4 py-3 backdrop-blur-sm transition-all duration-300 ${
                      showFilters 
                        ? 'bg-white text-teal-700 border-white hover:bg-gray-100' 
                        : 'border-white/30 text-white hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Category Navigation */}
      <nav className="bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center py-6">
            <div className="flex items-center space-x-3 overflow-x-auto scrollbar-hide">
              {categories.slice(0, 7).map((category) => {
                const Icon = category.icon
                const isActive = selectedCategory === category.id
                return (
                  <Button
                    key={category.id}
                    variant={isActive ? "default" : "ghost"}
                    size="sm"
                    onClick={() => handleCategoryFilter(category.id)}
                    className={`whitespace-nowrap px-6 py-3 text-sm font-semibold transition-all duration-300 rounded-full group ${
                      isActive 
                        ? 'bg-gradient-to-r from-teal-600 to-teal-700 text-white hover:from-teal-700 hover:to-teal-800 shadow-lg transform hover:scale-105' 
                        : 'text-gray-600 hover:text-teal-600 hover:bg-teal-50 hover:shadow-md'
                    }`}
                  >
                    <Icon className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform duration-300" />
                    {category.name}
                    {category.count && (
                      <Badge className={`ml-2 text-xs px-2 py-1 ${
                        isActive 
                          ? 'bg-white/20 text-white' 
                          : 'bg-teal-100 text-teal-700'
                      }`}>
                        {category.count}
                      </Badge>
                    )}
                  </Button>
                )
              })}
            </div>
          </div>
        </div>
      </nav>

        {/* Main Content */}
        <main className="flex-1 px-8 py-12">
          <div className="max-w-6xl mx-auto">
          {/* Filter Section */}
          {showFilters && (
            <div className="mb-12">
              <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 flex items-center">
                      <Filter className="h-6 w-6 mr-3 text-teal-600" />
                      Filter Kategori
                    </h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowFilters(false)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {categories.map((category) => {
                      const Icon = category.icon
                      const isSelected = selectedCategory === category.id
                      return (
                        <Button
                          key={category.id}
                          variant={isSelected ? "default" : "outline"}
                          size="sm"
                          onClick={() => handleCategoryFilter(category.id)}
                          className={`justify-start text-left h-auto py-4 px-6 rounded-xl transition-all duration-300 ${
                            isSelected 
                              ? 'bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white shadow-lg' 
                              : 'border-gray-200 hover:bg-gray-50 text-gray-700 hover:border-teal-200'
                          }`}
                        >
                          <Icon className="h-5 w-5 mr-3 flex-shrink-0" />
                          <div className="flex flex-col items-start">
                            <span className="text-sm font-semibold">{category.name}</span>
                            {category.count && (
                              <span className="text-xs text-gray-500">{category.count} artikel</span>
                            )}
                          </div>
                        </Button>
                      )
                    })}
                  </div>

                  {/* Active Filters */}
                  {(selectedCategory !== 'all' || searchTerm) && (
                    <div className="mt-8 pt-6 border-t border-gray-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-semibold text-gray-700">Filter aktif:</span>
                          {selectedCategory !== 'all' && (
                            <Badge 
                              className="bg-teal-100 text-teal-800 cursor-pointer hover:bg-teal-200 px-3 py-1"
                              onClick={() => handleCategoryFilter('all')}
                            >
                              {categories.find(c => c.id === selectedCategory)?.name}
                              <X className="h-3 w-3 ml-2" />
                            </Badge>
                          )}
                          {searchTerm && (
                            <Badge 
                              className="bg-blue-100 text-blue-800 cursor-pointer hover:bg-blue-200 px-3 py-1"
                              onClick={() => {
                                setSearchTerm('')
                                setCurrentPage(1)
                              }}
                            >
                              "{searchTerm}"
                              <X className="h-3 w-3 ml-2" />
                            </Badge>
                          )}
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedCategory('all')
                            setSearchTerm('')
                            setCurrentPage(1)
                          }}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          Reset Semua
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {/* Featured Articles */}
          {displayFeatured.length > 0 && (
            <div className="mb-20">
              <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mb-6">
                  <Star className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                  Featured News
                </h2>
                <div className="w-32 h-1 bg-gradient-to-r from-teal-500 to-lime-500 mx-auto rounded-full"></div>
              </div>
              
              <div className="grid lg:grid-cols-2 gap-8">
                {displayFeatured.slice(0, 2).map((article, index) => {
                  const category = article.tags ? article.tags.split(',')[0].trim() : (article.category || 'News')
                  const CategoryIcon = getCategoryIcon(category)
                  return (
                    <Card
                      key={article.id}
                      className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0 bg-white overflow-hidden"
                    >
                      <div className="relative h-80 overflow-hidden">
                        <Image
                          src={article.featured_image || article.image || "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop&auto=format"}
                          alt={article.title}
                          width={600}
                          height={400}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                        
                        <div className="absolute top-6 left-6">
                          <Badge className={`bg-gradient-to-r ${getCategoryColor(category)} text-white px-4 py-2 text-sm font-semibold shadow-lg`}>
                            <CategoryIcon className="h-4 w-4 mr-2" />
                            {category}
                          </Badge>
                        </div>
                        
                        <div className="absolute top-6 right-6">
                          <div className="flex space-x-2">
                            <Button size="sm" variant="ghost" className="bg-white/20 text-white hover:bg-white/30">
                              <Heart className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost" className="bg-white/20 text-white hover:bg-white/30">
                              <Bookmark className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost" className="bg-white/20 text-white hover:bg-white/30">
                              <Share2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        
                        {article.views && (
                          <div className="absolute bottom-6 right-6">
                            <div className="bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full flex items-center text-sm">
                              <Eye className="h-4 w-4 mr-1" />
                              {article.views}
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <CardContent className="p-8">
                        <Link href={`/news/${article.slug}`} className="block">
                          <h3 className="text-2xl font-bold text-gray-900 group-hover:text-teal-700 transition-colors duration-300 mb-4 cursor-pointer leading-tight">
                            {article.title}
                          </h3>
                        </Link>
                        
                        <p className="text-gray-600 leading-relaxed mb-6 text-lg">
                          {article.excerpt || (article.content ? article.content.substring(0, 150) + '...' : '')}
                        </p>
                        
                        <div className="flex items-center justify-between mb-6">
                          <div className="flex items-center space-x-6 text-sm text-gray-500">
                            <div className="flex items-center space-x-2">
                              <User className="h-4 w-4" />
                              <span className="font-semibold">{article.author}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Calendar className="h-4 w-4" />
                              <span>{article.date || new Date(article.published_at || article.created_at).toLocaleDateString('id-ID')}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Clock className="h-4 w-4" />
                              <span>{article.read_time || 5} min baca</span>
                            </div>
                          </div>
                        </div>
                        
                        <Link href={`/news/${article.slug}`}>
                          <Button
                            size="lg"
                            className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white w-full group-hover:shadow-lg transition-all duration-300"
                          >
                            Baca Selengkapnya
                            <ChevronRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>
          )}

          {/* Results Info */}
          {(searchTerm || selectedCategory !== 'all') && (
            <div className="mb-12">
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full flex items-center justify-center">
                      <Search className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">
                        Hasil Pencarian
                      </h2>
                      <div className="flex items-center gap-3 mt-2">
                        <Badge className="bg-teal-100 text-teal-800 px-4 py-2 text-sm font-semibold">
                          {totalArticles} artikel ditemukan
                        </Badge>
                        {searchTerm && (
                          <span className="text-gray-600">
                            untuk "{searchTerm}"
                          </span>
                        )}
                        {selectedCategory !== 'all' && (
                          <span className="text-gray-600">
                            dalam kategori {categories.find(c => c.id === selectedCategory)?.name}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  {totalPages > 1 && (
                    <div className="text-right">
                      <p className="text-gray-600 text-sm">
                        Halaman {currentPage} dari {totalPages}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Regular Articles */}
          <div className="mb-20">
            {displayArticles.length === 0 ? (
              <Card className="p-20 text-center border-dashed border-2 border-gray-200 bg-white/50">
                <div className="flex flex-col items-center justify-center">
                  <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mb-8">
                    <Search className="h-16 w-16 text-gray-400" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">
                    Tidak Ada Artikel Ditemukan
                  </h3>
                  <p className="text-gray-600 mb-10 max-w-md text-lg">
                    Coba ubah kata kunci pencarian atau filter kategori untuk menemukan artikel yang Anda cari.
                  </p>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => {
                      setSelectedCategory('all')
                      setSearchTerm('')
                      setCurrentPage(1)
                    }}
                    className="border-teal-200 text-teal-700 hover:bg-teal-50 px-8 py-4"
                  >
                    <X className="h-5 w-5 mr-2" />
                    Reset Filter
                  </Button>
                </div>
              </Card>
            ) : (
              <>
                {/* Results Header */}
                {!searchTerm && selectedCategory === 'all' && (
                  <div className="mb-12">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">
                      Latest Updates
                    </h2>
                    <p className="text-xl text-gray-600">
                      Berita terbaru dari AGGRE CAPITAL
                    </p>
                  </div>
                )}

                {/* Articles Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {displayArticles.map((article, index) => {
                    const category = article.tags ? article.tags.split(',')[0].trim() : (article.category || 'News')
                    const CategoryIcon = getCategoryIcon(category)
                    return (
                      <Card
                        key={article.id}
                        className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border-0 bg-white overflow-hidden"
                      >
                        <div className="relative h-64 overflow-hidden">
                          <Image
                            src={article.featured_image || article.image || "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop&auto=format"}
                            alt={article.title}
                            width={400}
                            height={300}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          
                          <div className="absolute top-4 left-4">
                            <Badge className={`bg-gradient-to-r ${getCategoryColor(category)} text-white px-3 py-2 text-sm font-semibold shadow-lg`}>
                              <CategoryIcon className="h-4 w-4 mr-2" />
                              {category}
                            </Badge>
                          </div>
                          
                          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="flex space-x-2">
                              <Button size="sm" variant="ghost" className="bg-white/20 text-white hover:bg-white/30">
                                <Heart className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="ghost" className="bg-white/20 text-white hover:bg-white/30">
                                <Bookmark className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="ghost" className="bg-white/20 text-white hover:bg-white/30">
                                <Share2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          
                          {article.views && (
                            <div className="absolute bottom-4 right-4">
                              <div className="bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full flex items-center text-sm">
                                <Eye className="h-4 w-4 mr-1" />
                                {article.views}
                              </div>
                            </div>
                          )}
                        </div>
                        
                        <CardContent className="p-6">
                          <div className="mb-4">
                            <Link href={`/news/${article.slug}`} className="block">
                              <h3 className="text-xl font-bold text-gray-900 group-hover:text-teal-700 transition-colors duration-300 mb-3 cursor-pointer line-clamp-2 leading-tight">
                                {article.title}
                              </h3>
                            </Link>
                            <p className="text-gray-600 leading-relaxed line-clamp-3">
                              {article.excerpt || (article.content ? article.content.substring(0, 120) + '...' : '')}
                            </p>
                          </div>
                          
                          <div className="border-t pt-4">
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center space-x-4 text-sm text-gray-500">
                                <div className="flex items-center space-x-1">
                                  <User className="h-4 w-4" />
                                  <span className="font-semibold">{article.author}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Clock className="h-4 w-4" />
                                  <span>{article.read_time || 5} min</span>
                                </div>
                              </div>
                              <div className="text-sm text-gray-400">
                                {article.date || new Date(article.published_at || article.created_at).toLocaleDateString('id-ID', { 
                                  day: 'numeric', 
                                  month: 'short' 
                                })}
                              </div>
                            </div>
                            
                            <Link href={`/news/${article.slug}`}>
                              <Button
                                size="sm"
                                className="w-full bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white group-hover:shadow-lg transition-all duration-300"
                              >
                                Baca Selengkapnya
                                <ChevronRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                              </Button>
                            </Link>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </>
            )}

            {/* Enhanced Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-16">
                <div className="flex items-center space-x-3 bg-white rounded-2xl shadow-lg p-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 rounded-xl"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Previous
                  </Button>
                  
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNumber
                    if (totalPages <= 5) {
                      pageNumber = i + 1
                    } else if (currentPage <= 3) {
                      pageNumber = i + 1
                    } else if (currentPage >= totalPages - 2) {
                      pageNumber = totalPages - 4 + i
                    } else {
                      pageNumber = currentPage - 2 + i
                    }

                    return (
                      <Button
                        key={pageNumber}
                        variant={currentPage === pageNumber ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(pageNumber)}
                        className={`px-4 py-2 rounded-xl ${
                          currentPage === pageNumber 
                            ? 'bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white shadow-lg' 
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {pageNumber}
                      </Button>
                    )
                  })}

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 rounded-xl"
                  >
                    Next
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </div>
            )}
          </div>
          </div>

        </main>
      </div>

    </div>
  )
}