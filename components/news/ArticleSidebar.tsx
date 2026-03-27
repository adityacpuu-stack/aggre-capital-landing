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
  Share2,
  ArrowUp,
  List,
  Calendar,
  User,
  Tag,
  ExternalLink
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

interface ArticleSidebarProps {
  article: NewsArticle
  readingProgress: number
  onScrollToTop: () => void
  onLike: () => void
  onBookmark: () => void
  onShare: () => void
  isLiked: boolean
  isBookmarked: boolean
}

export default function ArticleSidebar({ 
  article, 
  readingProgress, 
  onScrollToTop, 
  onLike, 
  onBookmark, 
  onShare,
  isLiked,
  isBookmarked
}: ArticleSidebarProps) {
  const [relatedArticles, setRelatedArticles] = useState<NewsArticle[]>([])
  const [tableOfContents, setTableOfContents] = useState<{id: string, text: string, level: number}[]>([])
  const [showTOC, setShowTOC] = useState(false)

  // Generate table of contents from article content
  useEffect(() => {
    if (article?.content) {
      const parser = new DOMParser()
      const doc = parser.parseFromString(article.content, 'text/html')
      const headings = doc.querySelectorAll('h1, h2, h3, h4, h5, h6')
      
      const toc = Array.from(headings).map((heading, index) => {
        // Generate a more reliable ID based on heading text
        const text = heading.textContent || ''
        const id = text.toLowerCase()
          .replace(/[^a-z0-9\s-]/g, '')
          .replace(/\s+/g, '-')
          .replace(/-+/g, '-')
          .trim() || `heading-${index}`
        
        return {
          id: id,
          text: text,
          level: parseInt(heading.tagName.charAt(1))
        }
      })
      
      setTableOfContents(toc)
    }
  }, [article?.content])

  // Fetch related articles
  useEffect(() => {
    const fetchRelatedArticles = async () => {
      try {
        const response = await fetch(`/api/news/public?category=${article.category}&limit=4&exclude=${article.id}`)
        const result = await response.json()
        if (result.success && result.data) {
          setRelatedArticles(result.data)
        }
      } catch (error) {
        console.error('Failed to fetch related articles:', error)
      }
    }

    if (article?.category) {
      fetchRelatedArticles()
    }
  }, [article?.category, article?.id])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const scrollToHeading = (headingId: string) => {
    // First try to find by ID
    let element = document.getElementById(headingId)
    
    // If not found by ID, try to find by text content
    if (!element) {
      const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6')
      for (const heading of headings) {
        const text = heading.textContent || ''
        const normalizedText = text.toLowerCase()
          .replace(/[^a-z0-9\s-]/g, '')
          .replace(/\s+/g, '-')
          .replace(/-+/g, '-')
          .trim()
        
        if (normalizedText === headingId) {
          element = heading as HTMLElement
          break
        }
      }
    }
    
    if (element) {
      // Add some offset to account for sticky header
      const offset = 100
      const elementPosition = element.offsetTop - offset
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      })
    }
  }

  return (
    <div className="space-y-6">
      {/* Table of Contents */}
      {tableOfContents.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center space-x-2">
              <List className="h-5 w-5" />
              <span>Daftar Isi</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-2 max-h-80 overflow-y-auto">
              {tableOfContents.map((item, index) => (
                <button
                  key={index}
                  onClick={() => scrollToHeading(item.id)}
                  className={`block w-full text-left p-2 rounded-lg text-sm transition-colors hover:bg-gray-100 ${
                    item.level === 1 ? 'font-semibold text-gray-900' :
                    item.level === 2 ? 'font-medium text-gray-800 ml-2' :
                    'text-gray-600 ml-4'
                  }`}
                >
                  {item.text}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Reading Progress */}
      <Card>
        <CardContent className="p-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">Progress Membaca</span>
              <span className="text-sm text-gray-500">{Math.round(readingProgress)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-teal-500 to-teal-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${readingProgress}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>Waktu baca: {article.read_time} menit</span>
              <span>{article.content.replace(/<[^>]*>/g, '').split(/\s+/).length} kata</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Aksi Cepat</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onScrollToTop}
            className="w-full justify-start"
          >
            <ArrowUp className="h-4 w-4 mr-2" />
            Ke Atas
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onLike}
            className={`w-full justify-start ${
              isLiked ? 'text-red-500 border-red-200 bg-red-50' : ''
            }`}
          >
            <Heart className={`h-4 w-4 mr-2 ${isLiked ? 'fill-current' : ''}`} />
            {isLiked ? 'Disukai' : 'Suka'}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onBookmark}
            className={`w-full justify-start ${
              isBookmarked ? 'text-yellow-500 border-yellow-200 bg-yellow-50' : ''
            }`}
          >
            <Bookmark className={`h-4 w-4 mr-2 ${isBookmarked ? 'fill-current' : ''}`} />
            {isBookmarked ? 'Disimpan' : 'Simpan'}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onShare}
            className="w-full justify-start"
          >
            <Share2 className="h-4 w-4 mr-2" />
            Bagikan
          </Button>
        </CardContent>
      </Card>

      {/* Article Info */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Info Artikel</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center space-x-3">
            <Calendar className="h-4 w-4 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Diterbitkan</p>
              <p className="text-sm font-medium">{formatDate(article.created_at)}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <User className="h-4 w-4 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Penulis</p>
              <p className="text-sm font-medium">{article.author}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Tag className="h-4 w-4 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Kategori</p>
              <Badge variant="secondary" className="text-xs">
                {article.category}
              </Badge>
            </div>
          </div>
          {article.tags && (
            <div className="space-y-2">
              <p className="text-sm text-gray-500">Tag</p>
              <div className="flex flex-wrap gap-1">
                {article.tags.split(',').slice(0, 3).map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs"
                  >
                    #{tag.trim()}
                  </span>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center space-x-2">
              <TrendingUp className="h-5 w-5" />
              <span>Artikel Terkait</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {relatedArticles.map((relatedArticle) => (
              <Link
                key={relatedArticle.id}
                href={`/news/${relatedArticle.slug}`}
                className="block group"
              >
                <div className="flex space-x-3">
                  <div className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden">
                    {relatedArticle.featured_image ? (
                      <Image
                        src={relatedArticle.featured_image}
                        alt={relatedArticle.title}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-teal-100 to-teal-200 flex items-center justify-center">
                        <span className="text-teal-600 font-bold text-lg">
                          {relatedArticle.title.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-900 group-hover:text-teal-600 transition-colors line-clamp-2">
                      {relatedArticle.title}
                    </h4>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-xs text-gray-500">
                        {formatDate(relatedArticle.created_at)}
                      </span>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs text-gray-500">
                        {relatedArticle.read_time} min
                      </span>
                    </div>
                    <Badge variant="outline" className="text-xs mt-1">
                      {relatedArticle.category}
                    </Badge>
                  </div>
                </div>
              </Link>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Back to News */}
      <Card>
        <CardContent className="p-4">
          <Link href="/news" className="block">
            <Button variant="outline" className="w-full">
              <ArrowUp className="h-4 w-4 mr-2 rotate-90" />
              Lihat Semua Berita
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
