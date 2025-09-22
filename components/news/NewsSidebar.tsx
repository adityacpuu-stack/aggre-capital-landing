"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  TrendingUp, 
  Clock, 
  Eye, 
  Heart, 
  Bookmark, 
  Star,
  Calendar,
  User,
  Tag,
  ExternalLink,
  ArrowRight,
  Flame,
  Award,
  BarChart3
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface NewsArticle {
  id: number
  title: string
  slug: string
  content: string
  excerpt: string
  featured_image: string
  author: string
  status: string
  category: string
  tags: string
  meta_description: string
  read_time: number
  featured: boolean
  created_at: string
  updated_at: string
  published_at: string
}

interface NewsSidebarProps {
  currentArticleId?: number
}

export default function NewsSidebar({ currentArticleId }: NewsSidebarProps) {
  const [trendingArticles, setTrendingArticles] = useState<NewsArticle[]>([])
  const [popularArticles, setPopularArticles] = useState<NewsArticle[]>([])
  const [featuredArticles, setFeaturedArticles] = useState<NewsArticle[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSidebarData = async () => {
      try {
        setLoading(true)
        
        // Fetch trending articles (most recent)
        const trendingResponse = await fetch('/api/news/public?limit=5&sort=created_at&order=desc')
        const trendingResult = await trendingResponse.json()
        
        // Fetch popular articles (featured)
        const popularResponse = await fetch('/api/news/public?featured=true&limit=4')
        const popularResult = await popularResponse.json()
        
        // Fetch featured articles
        const featuredResponse = await fetch('/api/news/public?featured=true&limit=3')
        const featuredResult = await featuredResponse.json()

        if (trendingResult.success) {
          setTrendingArticles(trendingResult.data.filter((article: NewsArticle) => article.id !== currentArticleId))
        }
        
        if (popularResult.success) {
          setPopularArticles(popularResult.data.filter((article: NewsArticle) => article.id !== currentArticleId))
        }
        
        if (featuredResult.success) {
          setFeaturedArticles(featuredResult.data.filter((article: NewsArticle) => article.id !== currentArticleId))
        }
      } catch (error) {
        console.error('Failed to fetch sidebar data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchSidebarData()
  }, [currentArticleId])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Finance': 'bg-green-100 text-green-800 border-green-200',
      'Technology': 'bg-blue-100 text-blue-800 border-blue-200',
      'Business': 'bg-purple-100 text-purple-800 border-purple-200',
      'News': 'bg-orange-100 text-orange-800 border-orange-200',
      'Economy': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'Default': 'bg-gray-100 text-gray-800 border-gray-200'
    }
    return colors[category] || colors['Default']
  }

  if (loading) {
    return (
      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardHeader>
              <div className="h-4 bg-gray-200 rounded animate-pulse" />
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[1, 2, 3].map((j) => (
                  <div key={j} className="flex space-x-3">
                    <div className="w-16 h-16 bg-gray-200 rounded animate-pulse" />
                    <div className="flex-1 space-y-2">
                      <div className="h-3 bg-gray-200 rounded animate-pulse" />
                      <div className="h-3 bg-gray-200 rounded w-2/3 animate-pulse" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Trending Articles */}
      {trendingArticles.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center space-x-2">
              <Flame className="h-5 w-5 text-orange-500" />
              <span>Trending Hari Ini</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {trendingArticles.slice(0, 4).map((article, index) => (
              <Link
                key={article.id}
                href={`/news/${article.slug}`}
                className="block group"
              >
                <div className="flex space-x-3">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-orange-100 to-orange-200 rounded-lg flex items-center justify-center">
                    <span className="text-orange-600 font-bold text-lg">
                      {index + 1}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-900 group-hover:text-orange-600 transition-colors line-clamp-2">
                      {article.title}
                    </h4>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-xs text-gray-500">
                        {formatDate(article.created_at)}
                      </span>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs text-gray-500">
                        {article.read_time} min
                      </span>
                    </div>
                    <Badge 
                      variant="outline" 
                      className={`text-xs mt-1 ${getCategoryColor(article.category)}`}
                    >
                      {article.category}
                    </Badge>
                  </div>
                </div>
              </Link>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Popular Articles */}
      {popularArticles.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center space-x-2">
              <BarChart3 className="h-5 w-5 text-blue-500" />
              <span>Populer Minggu Ini</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {popularArticles.slice(0, 3).map((article) => (
              <Link
                key={article.id}
                href={`/news/${article.slug}`}
                className="block group"
              >
                <div className="flex space-x-3">
                  <div className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden">
                    {article.featured_image ? (
                      <Image
                        src={article.featured_image}
                        alt={article.title}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                        <span className="text-blue-600 font-bold text-lg">
                          {article.title.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {article.title}
                    </h4>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-xs text-gray-500">
                        {formatDate(article.created_at)}
                      </span>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs text-gray-500">
                        {article.read_time} min
                      </span>
                    </div>
                    <div className="flex items-center space-x-1 mt-1">
                      <Star className="h-3 w-3 text-yellow-500 fill-current" />
                      <span className="text-xs text-gray-500">Featured</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Featured Articles */}
      {featuredArticles.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center space-x-2">
              <Award className="h-5 w-5 text-purple-500" />
              <span>Artikel Pilihan</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {featuredArticles.slice(0, 3).map((article) => (
              <Link
                key={article.id}
                href={`/news/${article.slug}`}
                className="block group"
              >
                <div className="space-y-3">
                  <div className="relative">
                    {article.featured_image ? (
                      <div className="w-full h-32 rounded-lg overflow-hidden">
                        <Image
                          src={article.featured_image}
                          alt={article.title}
                          width={300}
                          height={128}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                        />
                      </div>
                    ) : (
                      <div className="w-full h-32 bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg flex items-center justify-center">
                        <span className="text-purple-600 font-bold text-2xl">
                          {article.title.charAt(0)}
                        </span>
                      </div>
                    )}
                    <div className="absolute top-2 left-2">
                      <Badge className="bg-purple-600 text-white text-xs">
                        <Star className="h-3 w-3 mr-1 fill-current" />
                        Featured
                      </Badge>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 group-hover:text-purple-600 transition-colors line-clamp-2">
                      {article.title}
                    </h4>
                    <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-500">
                          {formatDate(article.created_at)}
                        </span>
                        <span className="text-xs text-gray-400">•</span>
                        <span className="text-xs text-gray-500">
                          {article.read_time} min
                        </span>
                      </div>
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${getCategoryColor(article.category)}`}
                      >
                        {article.category}
                      </Badge>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Categories */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center space-x-2">
            <Tag className="h-5 w-5 text-teal-500" />
            <span>Kategori Populer</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {['Finance', 'Technology', 'Business', 'News', 'Economy'].map((category) => (
              <Link
                key={category}
                href={`/news?category=${category.toLowerCase()}`}
                className="group"
              >
                <Badge 
                  variant="outline" 
                  className={`text-xs cursor-pointer group-hover:scale-105 transition-transform ${getCategoryColor(category)}`}
                >
                  {category}
                </Badge>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Newsletter Signup */}
      <Card className="bg-gradient-to-br from-teal-50 to-blue-50 border-teal-200">
        <CardContent className="p-6 text-center">
          <div className="space-y-3">
            <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto">
              <Heart className="h-6 w-6 text-teal-600" />
            </div>
            <h3 className="font-semibold text-gray-900">Dapatkan Update Terbaru</h3>
            <p className="text-sm text-gray-600">
              Langganan newsletter untuk mendapatkan artikel terbaru langsung di inbox Anda
            </p>
            <Button className="w-full bg-teal-600 hover:bg-teal-700">
              Langganan Sekarang
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Back to News */}
      <Card>
        <CardContent className="p-4">
          <Link href="/news" className="block">
            <Button variant="outline" className="w-full">
              <ArrowRight className="h-4 w-4 mr-2" />
              Lihat Semua Berita
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}