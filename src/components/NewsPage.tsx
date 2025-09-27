'use client'

import { useState, useEffect } from 'react'
import { Calendar, ExternalLink, Newspaper, RefreshCw, Clock, Tag, Search } from 'lucide-react'

interface NewsArticle {
  title: string
  description: string
  url: string
  urlToImage: string
  publishedAt: string
  source: { name: string }
  summary?: string
}

const NewsPage = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredArticles, setFilteredArticles] = useState<NewsArticle[]>([])

  const fetchNews = async () => {
    try {
      setLoading(true)
      setError(null)
      console.log('Fetching news from /api/news...')
      
      const response = await fetch('/api/news', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      
      console.log('Response status:', response.status)
      console.log('Response ok:', response.ok)
      
      if (!response.ok) {
        const errorText = await response.text()
        console.error('API Error:', errorText)
        throw new Error(`API returned ${response.status}: ${errorText}`)
      }
      
      const data = await response.json()
      console.log('Data received:', data)
      
      // Add summaries and expand with more demo articles
      const articlesWithSummaries = [
        ...data.articles.map((article: NewsArticle) => ({
          ...article,
          summary: generateSummary(article.description)
        })),
        // Additional demo articles for a fuller page
        {
          title: "Digital Agriculture: How Technology is Transforming Nigerian Farms",
          description: "From drone surveillance to IoT sensors, Nigerian farmers are embracing digital tools to optimize crop yields, monitor soil health, and predict weather patterns with unprecedented accuracy.",
          url: "#",
          urlToImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=400&fit=crop",
          publishedAt: new Date(Date.now() - 259200000).toISOString(),
          source: { name: "AgriTech Nigeria" },
          summary: "Nigerian farmers adopt digital tools including drones and IoT sensors to improve crop monitoring and yields."
        },
        {
          title: "Export Opportunities: Nigerian Palm Oil Gains International Recognition",
          description: "Quality improvements in Nigerian palm oil production have opened new export markets in Europe and Asia, with local producers securing premium contracts worth millions of dollars.",
          url: "#",
          urlToImage: "https://images.unsplash.com/photo-1615671524827-c1fe3973b648?w=800&h=400&fit=crop",
          publishedAt: new Date(Date.now() - 345600000).toISOString(),
          source: { name: "Export Nigeria" },
          summary: "Nigerian palm oil secures premium export contracts in European and Asian markets."
        },
        {
          title: "Climate-Smart Agriculture: Adapting to Changing Weather Patterns",
          description: "Research institutions collaborate with farmers to develop climate-resilient crop varieties and sustainable farming practices that can withstand Nigeria's changing rainfall patterns.",
          url: "#",
          urlToImage: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&h=400&fit=crop",
          publishedAt: new Date(Date.now() - 432000000).toISOString(),
          source: { name: "Climate Agriculture Review" },
          summary: "Researchers develop climate-resilient farming practices for Nigeria's changing weather patterns."
        }
      ]
      
      setArticles(articlesWithSummaries)
      setFilteredArticles(articlesWithSummaries)
    } catch (err) {
      console.error('News fetch error details:', err)
      setError(`Unable to load latest news: ${err.message}`)
      console.error('Full error:', err)
    } finally {
      setLoading(false)
    }
  }

  const generateSummary = (description: string): string => {
    const sentences = description.split('. ')
    return sentences.length > 1 ? sentences[0] + '.' : description.substring(0, 100) + '...'
  }

  const handleSearch = (term: string) => {
    setSearchTerm(term)
    if (!term.trim()) {
      setFilteredArticles(articles)
    } else {
      const filtered = articles.filter(article =>
        article.title.toLowerCase().includes(term.toLowerCase()) ||
        article.description.toLowerCase().includes(term.toLowerCase()) ||
        article.source.name.toLowerCase().includes(term.toLowerCase())
      )
      setFilteredArticles(filtered)
    }
  }

  useEffect(() => {
    fetchNews()
  }, [])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getTimeAgo = (dateString: string) => {
    const now = new Date()
    const publishedDate = new Date(dateString)
    const diffInHours = Math.floor((now.getTime() - publishedDate.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return 'Just published'
    if (diffInHours < 24) return `${diffInHours} hours ago`
    
    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays === 1) return '1 day ago'
    if (diffInDays < 7) return `${diffInDays} days ago`
    
    return formatDate(dateString)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-16">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-green-600 py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center text-white">
            <div className="flex items-center justify-center space-x-2 mb-6">
              <Newspaper className="w-8 h-8" />
              <span className="text-xl font-semibold">Agriculture News Center</span>
            </div>
            <h1 className="font-display text-4xl lg:text-6xl font-bold mb-6">
              Nigerian Agriculture
              <span className="block text-emerald-200">News & Insights</span>
            </h1>
            <p className="text-xl text-emerald-100 mb-8 max-w-3xl mx-auto">
              Comprehensive coverage of farming trends, policy updates, market analysis, and innovative agricultural practices across Nigeria.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-md mx-auto relative">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search news articles..."
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/40"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-16">
        {/* Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
          <div className="flex items-center space-x-4 mb-4 sm:mb-0">
            <h2 className="font-display text-2xl font-bold text-gray-900">
              Latest Articles ({filteredArticles.length})
            </h2>
            {searchTerm && (
              <button
                onClick={() => handleSearch('')}
                className="text-sm text-emerald-600 hover:text-emerald-700 font-medium"
              >
                Clear search
              </button>
            )}
          </div>
          
          <button
            onClick={fetchNews}
            disabled={loading}
            className="inline-flex items-center space-x-2 px-4 py-2 text-sm font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg hover:bg-emerald-100 transition-colors duration-200 disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="card p-0 overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-200"></div>
                <div className="p-6 space-y-4">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="space-y-2">
                    <div className="h-3 bg-gray-200 rounded"></div>
                    <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ExternalLink className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="font-display text-xl font-semibold text-gray-900 mb-2">
              Unable to Load News
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">{error}</p>
            <button onClick={fetchNews} className="btn-primary">
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </button>
          </div>
        )}

        {/* News Articles Grid */}
        {!loading && !error && filteredArticles.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article, index) => (
              <article key={index} className="card p-0 overflow-hidden group hover:shadow-2xl transition-all duration-300">
                {/* Article Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={article.urlToImage}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&h=400&fit=crop'
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                  
                  {/* Source Badge */}
                  <div className="absolute top-4 left-4">
                    <div className="flex items-center space-x-1 px-3 py-1 bg-emerald-600/90 backdrop-blur-sm text-xs font-semibold text-white rounded-full">
                      <Tag className="w-3 h-3" />
                      <span>{article.source.name}</span>
                    </div>
                  </div>

                  {/* Time badge */}
                  <div className="absolute top-4 right-4">
                    <div className="flex items-center space-x-1 px-2 py-1 bg-black/50 backdrop-blur-sm text-xs text-white rounded-full">
                      <Clock className="w-3 h-3" />
                      <span>{getTimeAgo(article.publishedAt)}</span>
                    </div>
                  </div>
                </div>

                {/* Article Content */}
                <div className="p-6">
                  {/* Date */}
                  <div className="flex items-center space-x-2 text-sm text-gray-500 mb-3">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(article.publishedAt)}</span>
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-emerald-700 transition-colors duration-200">
                    {article.title}
                  </h3>

                  {/* Summary */}
                  <div className="mb-4">
                    <p className="text-emerald-700 font-medium text-sm mb-2">Quick Summary:</p>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {article.summary}
                    </p>
                  </div>

                  {/* Full Description */}
                  <p className="text-gray-600 leading-relaxed mb-6 text-sm">
                    {article.description}
                  </p>

                  {/* Read More Link */}
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 text-emerald-600 font-semibold hover:text-emerald-700 transition-colors duration-200 group/link"
                  >
                    <span>Read Full Article</span>
                    <ExternalLink className="w-4 h-4 group-hover/link:translate-x-1 transition-transform duration-200" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* No Results */}
        {!loading && !error && filteredArticles.length === 0 && searchTerm && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="font-display text-xl font-semibold text-gray-900 mb-2">
              No articles found
            </h3>
            <p className="text-gray-600 max-w-md mx-auto mb-4">
              No articles match your search for "{searchTerm}". Try different keywords.
            </p>
            <button
              onClick={() => handleSearch('')}
              className="btn-secondary"
            >
              Show All Articles
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default NewsPage