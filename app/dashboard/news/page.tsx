"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { 
  Plus,
  Eye,
  Edit,
  Trash2,
  ArrowLeft,
  RefreshCw,
  Search,
  Filter,
  X,
  MoreHorizontal
} from "lucide-react"
import RichTextEditor from "@/components/RichTextEditor"
import ImageUpload from "@/components/ImageUpload"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"

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

export default function NewsManagementPage() {
  const router = useRouter()
  const [allNews, setAllNews] = useState<NewsArticle[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [showNewsForm, setShowNewsForm] = useState(false)
  const [selectedNews, setSelectedNews] = useState<NewsArticle | null>(null)
  const [isEdit, setIsEdit] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [activeTab, setActiveTab] = useState("write")
  const [openDropdown, setOpenDropdown] = useState<number | null>(null)

  // Generate slug from title
  const generateSlugFromTitle = (title: string, id: number) => {
    if (!title) return `article-${id}`
    
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
    
    return slug || `article-${id}`
  }

  // Form state
  const [newsFormData, setNewsFormData] = useState({
    title: "",
    content: "",
    excerpt: "",
    featured_image: "",
    author: "AGGRE CAPITAL",
    status: "draft",
    category: "News",
    tags: "",
    meta_description: "",
    read_time: 5,
    featured: false
  })

  useEffect(() => {
    fetchAllNews()
    
    // Check URL parameters
    const urlParams = new URLSearchParams(window.location.search)
    const action = urlParams.get('action')
    const editId = urlParams.get('edit')
    
    if (action === 'create') {
      handleAddNew()
    } else if (editId) {
      // Handle edit parameter
      handleEditById(parseInt(editId))
    }
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (openDropdown !== null) {
        setOpenDropdown(null)
      }
    }

    if (openDropdown !== null) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [openDropdown])

  const fetchAllNews = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/news', {
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        const result = await response.json()
        if (result.success && result.data) {
          setAllNews(result.data)
        }
      }
    } catch (error) {
      console.error('Failed to fetch news:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSaveNews = async () => {
    try {
      const method = isEdit ? 'PUT' : 'POST'
      const url = isEdit ? `/api/news/${selectedNews?.id}` : '/api/news'
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newsFormData),
      })

      if (response.ok) {
        fetchAllNews()
        handleCancelForm()
        alert(isEdit ? 'News updated successfully!' : 'News created successfully!')
      } else {
        const errorData = await response.json()
        alert(`Failed to save news: ${errorData.error || 'Unknown error'}`)
      }
    } catch (error) {
      console.error('Failed to save news:', error)
      alert('Failed to save news. Please try again.')
    }
  }

  const handleDeleteNews = async (id: string) => {
    if (confirm('Are you sure you want to delete this article?')) {
      try {
        const response = await fetch(`/api/news/${id}`, {
          method: 'DELETE',
        })

        if (response.ok) {
          fetchAllNews()
          alert('News deleted successfully!')
        } else {
          const errorData = await response.json()
          alert(`Failed to delete news: ${errorData.error || 'Unknown error'}`)
        }
      } catch (error) {
        console.error('Failed to delete news:', error)
        alert('Failed to delete news. Please try again.')
      }
    }
  }

  const handleEdit = (news: NewsArticle) => {
    setSelectedNews(news)
    setIsEdit(true)
    setNewsFormData({
      title: news.title || '',
      content: news.content || '',
      excerpt: news.excerpt || '',
      featured_image: news.featured_image || '',
      author: news.author || '',
      status: news.status || 'draft',
      category: news.category || 'News',
      tags: news.tags || '',
      meta_description: news.meta_description || '',
      read_time: news.read_time || 5,
      featured: news.featured || false
    })
    setShowNewsForm(true)
  }

  const handleEditById = async (id: number) => {
    try {
      // Find news by ID from the current list
      const news = allNews.find(n => n.id === id)
      if (news) {
        handleEdit(news)
      } else {
        // If not found in current list, fetch from API
        const response = await fetch(`/api/news/${id}`)
        if (response.ok) {
          const result = await response.json()
          if (result.success && result.data) {
            handleEdit(result.data)
          } else {
            alert('Article not found')
          }
        } else {
          alert('Failed to load article')
        }
      }
    } catch (error) {
      console.error('Error loading article for edit:', error)
      alert('Failed to load article')
    }
  }

  const handleAddNew = () => {
    setSelectedNews(null)
    setIsEdit(false)
    setNewsFormData({
      title: "",
      content: "",
      excerpt: "",
      featured_image: "",
      author: "AGGRE CAPITAL",
      status: "draft",
      category: "News",
      tags: "",
      meta_description: "",
      read_time: 5,
      featured: false
    })
    setShowNewsForm(true)
    
    // Update URL with create parameter
    const url = new URL(window.location.href)
    url.searchParams.set('action', 'create')
    url.searchParams.delete('edit')
    window.history.pushState({}, '', url.toString())
  }

  const handleCancelForm = () => {
    setShowNewsForm(false)
    setSelectedNews(null)
    setIsEdit(false)
    setNewsFormData({
      title: "",
      content: "",
      excerpt: "",
      featured_image: "",
      author: "AGGRE CAPITAL",
      status: "draft",
      category: "News",
      tags: "",
      meta_description: "",
      read_time: 5,
      featured: false
    })
    
    // Clear URL parameters
    const url = new URL(window.location.href)
    url.searchParams.delete('edit')
    url.searchParams.delete('action')
    window.history.pushState({}, '', url.toString())
  }

  const handleInputChange = (field: string, value: any) => {
    setNewsFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const filteredNews = allNews.filter(news => {
    const matchesSearch = news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         news.content.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || news.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800'
      case 'draft': return 'bg-yellow-100 text-yellow-800'
      case 'archived': return 'bg-gray-100 text-gray-800'
      default: return 'bg-blue-100 text-blue-800'
    }
  }

  if (showNewsForm) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={handleCancelForm}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to News List</span>
              </Button>
              <h1 className="text-2xl font-bold text-gray-900">
                {isEdit ? 'Edit News Article' : 'Create New Article'}
              </h1>
            </div>
          </div>

          {/* News Form */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Article Details</CardTitle>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="preview-mode" className="text-sm font-medium">
                      Preview Mode
                    </Label>
                    <Switch
                      id="preview-mode"
                      checked={showPreview}
                      onCheckedChange={setShowPreview}
                    />
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Title */}
              <div>
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={newsFormData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="Enter article title"
                  className="mt-1"
                />
              </div>

              {/* Excerpt */}
              <div>
                <Label htmlFor="excerpt">Excerpt</Label>
                <Textarea
                  id="excerpt"
                  value={newsFormData.excerpt}
                  onChange={(e) => handleInputChange('excerpt', e.target.value)}
                  placeholder="Brief description of the article"
                  className="mt-1"
                  rows={3}
                />
              </div>

              {/* Featured Image */}
              <div>
                <Label>Featured Image</Label>                <div className="mt-1">
                  <ImageUpload
                    value={newsFormData.featured_image}
                    onChange={(value) => handleInputChange('featured_image', value)}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Upload a featured image for this article. This will be displayed as the main image.
                </p>
              </div>

              {/* Content */}
              <div>
                <Label>Content *</Label>
                <div className="mt-1">
                  <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="write">Write</TabsTrigger>
                      <TabsTrigger value="preview">Preview</TabsTrigger>
                    </TabsList>
                    <TabsContent value="write" className="mt-4">
                      <div className="border rounded-lg">
                        <RichTextEditor
                          value={newsFormData.content}
                          onChange={(value) => handleInputChange('content', value)}
                          placeholder="Write your article content here... You can add images, format text, and more!"
                        />
                      </div>
                      <div className="mt-2 text-sm text-gray-500">
                        💡 <strong>Tip:</strong> You can upload images directly in the editor or use the Featured Image above. 
                        Markdown and HTML are supported for advanced formatting.
                      </div>
                    </TabsContent>
                    <TabsContent value="preview" className="mt-4">
                      <div className="border rounded-lg p-6 bg-gray-50 min-h-[400px]">
                        {newsFormData.content ? (
                          <div 
                            className="prose prose-sm max-w-none"
                            dangerouslySetInnerHTML={{ __html: newsFormData.content }}
                          />
                        ) : (
                          <div className="text-gray-500 text-center py-8">
                            <p>No content to preview yet.</p>
                            <p className="text-sm">Switch to "Write" tab to add content.</p>
                          </div>
                        )}
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>

              {/* Meta Information */}
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="author">Author</Label>
                    <Input
                      id="author"
                      value={newsFormData.author}
                      onChange={(e) => handleInputChange('author', e.target.value)}
                      className="mt-1"
                      placeholder="Enter author name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <select
                      id="category"
                      value={newsFormData.category}
                      onChange={(e) => handleInputChange('category', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                    >
                      <option value="News">News</option>
                      <option value="Business">Business</option>
                      <option value="Finance">Finance</option>
                      <option value="Technology">Technology</option>
                      <option value="Lifestyle">Lifestyle</option>
                      <option value="Education">Education</option>
                      <option value="Health">Health</option>
                      <option value="Sports">Sports</option>
                      <option value="Entertainment">Entertainment</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="tags">Tags (comma separated)</Label>
                  <Input
                    id="tags"
                    value={newsFormData.tags}
                    onChange={(e) => handleInputChange('tags', e.target.value)}
                    placeholder="news, business, finance, technology"
                    className="mt-1"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Separate multiple tags with commas. This helps with SEO and content discovery.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="read_time">Read Time (minutes)</Label>
                    <Input
                      id="read_time"
                      type="number"
                      min="1"
                      max="60"
                      value={newsFormData.read_time}
                      onChange={(e) => handleInputChange('read_time', parseInt(e.target.value) || 5)}
                      className="mt-1"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Estimated reading time for this article.
                    </p>
                  </div>
                  <div>
                    <Label htmlFor="word_count">Word Count</Label>
                    <Input
                      id="word_count"
                      value={newsFormData.content ? newsFormData.content.replace(/<[^>]*>/g, '').split(/\s+/).length : 0}
                      readOnly
                      className="mt-1 bg-gray-50"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Automatic word count based on content.
                    </p>
                  </div>
                </div>
              </div>

              {/* Meta Description */}
              <div>
                <Label htmlFor="meta_description">Meta Description</Label>
                <Textarea
                  id="meta_description"
                  value={newsFormData.meta_description || ''}
                  onChange={(e) => handleInputChange('meta_description', e.target.value)}
                  placeholder="Write a compelling meta description for SEO (150-160 characters recommended)"
                  className="mt-1"
                  rows={3}
                />
                <div className="flex justify-between items-center mt-1">
                  <p className="text-xs text-gray-500">
                    This appears in search engine results and social media previews.
                  </p>
                  <span className={`text-xs ${(newsFormData.meta_description || '').length > 160 ? 'text-red-500' : 'text-gray-400'}`}>
                    {(newsFormData.meta_description || '').length}/160 characters
                  </span>
                </div>
              </div>

              {/* Status and Featured */}
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="status">Publication Status</Label>
                    <select
                      id="status"
                      value={newsFormData.status}
                      onChange={(e) => handleInputChange('status', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                    >
                      <option value="draft">📝 Draft - Not visible to public</option>
                      <option value="published">✅ Published - Visible to public</option>
                      <option value="archived">📦 Archived - Hidden from public</option>
                    </select>
                    <p className="text-xs text-gray-500 mt-1">
                      Choose when this article should be visible to readers.
                    </p>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <Label htmlFor="featured" className="text-sm font-medium">
                          Featured Article
                        </Label>
                        <p className="text-xs text-gray-500">
                          Highlight this article on the homepage
                        </p>
                      </div>
                      <Switch
                        id="featured"
                        checked={newsFormData.featured}
                        onCheckedChange={(checked) => handleInputChange('featured', checked)}
                      />
                    </div>
                  </div>
                </div>

                {/* SEO Preview */}
                <div className="border rounded-lg p-4 bg-gray-50">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">SEO Preview</h4>
                  <div className="space-y-2">
                    <div className="text-blue-600 text-lg hover:underline cursor-pointer">
                      {newsFormData.title || "Your article title will appear here"}
                    </div>
                    <div className="text-green-600 text-sm">
                      {window?.location?.origin || "https://aggrecapital.com"}/news/{(newsFormData.title || '').toLowerCase().replace(/[^a-z0-9]+/g, '-') || "article-slug"}
                    </div>
                    <div className="text-gray-600 text-sm">
                      {(newsFormData.meta_description || '') || "Your meta description will appear here..."}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between items-center pt-6 border-t">
                <div className="flex items-center space-x-4">
                  <Button
                    variant="outline"
                    onClick={() => setActiveTab(activeTab === "write" ? "preview" : "write")}
                    className="flex items-center space-x-2"
                  >
                    <Eye className="h-4 w-4" />
                    <span>{activeTab === "write" ? "Preview" : "Write"}</span>
                  </Button>
                  <div className="text-sm text-gray-500">
                    {newsFormData.title && newsFormData.content ? (
                      <span className="text-green-600">✓ Ready to publish</span>
                    ) : (
                      <span className="text-yellow-600">⚠ Complete required fields</span>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Button
                    variant="outline"
                    onClick={handleCancelForm}
                    className="flex items-center space-x-2"
                  >
                    <X className="h-4 w-4" />
                    <span>Cancel</span>
                  </Button>
                  <Button
                    onClick={() => {
                      if (newsFormData.status === 'draft') {
                        handleInputChange('status', 'published')
                      }
                      handleSaveNews()
                    }}
                    className="bg-teal-600 hover:bg-teal-700 flex items-center space-x-2"
                    disabled={!newsFormData.title || !newsFormData.content}
                  >
                    <Plus className="h-4 w-4" />
                    <span>
                      {isEdit 
                        ? (newsFormData.status === 'draft' ? 'Save & Publish' : 'Update Article')
                        : (newsFormData.status === 'draft' ? 'Create & Publish' : 'Create Draft')
                      }
                    </span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={() => router.push('/dashboard')}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Dashboard</span>
            </Button>
            <h1 className="text-3xl font-bold text-gray-900">News Management</h1>
          </div>
          
          {/* Quick Create Button */}
          <div className="flex items-center space-x-3">
            <Button
              onClick={handleAddNew}
              className="bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white flex items-center space-x-2 shadow-lg hover:shadow-xl transition-all duration-200 px-6 py-3"
            >
              <Plus className="h-5 w-5" />
              <span className="font-semibold">Buat Artikel Baru</span>
            </Button>
          </div>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search articles..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-gray-400" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                >
                  <option value="all">All Status</option>
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* News List */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Articles ({filteredNews.length})</CardTitle>
              <div className="flex items-center space-x-2">
                <Button
                  onClick={handleAddNew}
                  size="sm"
                  className="bg-teal-600 hover:bg-teal-700"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  New Article
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <RefreshCw className="h-8 w-8 animate-spin text-teal-600 mx-auto mb-4" />
                  <p className="text-gray-600">Loading articles...</p>
                </div>
              </div>
            ) : filteredNews.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg mb-4">No articles found</p>
                <Button onClick={handleAddNew} className="bg-teal-600 hover:bg-teal-700">
                  Create Your First Article
                </Button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Title</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Author</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Category</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Created</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredNews.map((news) => (
                      <tr key={news.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <div>
                            <p className="font-medium text-gray-900">{news.title}</p>
                            <p className="text-sm text-gray-500 truncate max-w-xs">
                              {news.excerpt || 'No excerpt available'}
                            </p>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-gray-600">{news.author}</td>
                        <td className="py-3 px-4">
                          <Badge className={getStatusColor(news.status)}>
                            {news.status}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-gray-600">{news.category}</td>
                        <td className="py-3 px-4 text-gray-600">
                          {new Date(news.created_at).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-2">
                            {/* Quick Actions */}
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                const slug = news.slug || generateSlugFromTitle(news.title, news.id)
                                window.open(`/news/${slug}`, '_blank')
                              }}
                              className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                              title="View Article"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                handleEdit(news)
                                // Update URL with edit parameter
                                const url = new URL(window.location.href)
                                url.searchParams.set('edit', news.id.toString())
                                window.history.pushState({}, '', url.toString())
                              }}
                              className="text-green-600 hover:text-green-700 hover:bg-green-50"
                              title="Edit Article"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            
                            {/* Dropdown Menu */}
                            <div className="relative">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setOpenDropdown(openDropdown === news.id ? null : news.id)}
                                className="text-gray-600 hover:text-gray-700"
                              >
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                              
                              {openDropdown === news.id && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border">
                                  <div className="py-1">
                                    <button
                                      onClick={() => {
                                        const slug = news.slug || generateSlugFromTitle(news.title, news.id)
                                        window.open(`/news/${slug}`, '_blank')
                                        setOpenDropdown(null)
                                      }}
                                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                      <Eye className="h-4 w-4 mr-2" />
                                      View Article
                                    </button>
                                    <button
                                      onClick={() => {
                                        handleEdit(news)
                                        // Update URL with edit parameter
                                        const url = new URL(window.location.href)
                                        url.searchParams.set('edit', news.id.toString())
                                        window.history.pushState({}, '', url.toString())
                                        setOpenDropdown(null)
                                      }}
                                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                      <Edit className="h-4 w-4 mr-2" />
                                      Edit Article
                                    </button>
                                    <button
                                      onClick={() => {
                                        handleDeleteNews(news.id.toString())
                                        setOpenDropdown(null)
                                      }}
                                      className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                                    >
                                      <Trash2 className="h-4 w-4 mr-2" />
                                      Delete Article
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
