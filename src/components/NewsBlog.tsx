'use client'

import { useState, useEffect } from 'react'
import { Calendar, ExternalLink, Newspaper, RefreshCw } from 'lucide-react'

interface NewsArticle {
  title: string
  description: string
  url: string
  urlToImage: string
  publishedAt: string
  source: { name: string }
}

const NewsBlog = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchNews = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch('/api/news')
      
      if (!response.ok) {
        throw new Error('Failed to fetch news')
      }
      
      const data = await response.json()
      setArticles(data.articles || [])
    } catch (err) {
      setError('Unable to load latest news. Please try again later.')
      console.error('News fetch error:', err)
    } finally {
      setLoading(false)
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
    
    if (diffInHours < 1) return 'Just now'
    if (diffInHours < 24) return `${diffInHours} hours ago`
    
    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays === 1) return '1 day ago'
    if (diffInDays < 7) return `${diffInDays} days ago`
    
    return formatDate(dateString)
  }

  return (
    <section id="news" className="section-padding bg-gradient-to-b from-white to-gray-50">
      <div className="container">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="flex items-center justify-center space-x-2 text-emerald-600 font-semibold text-sm uppercase tracking-wider mb-4">
            <Newspaper className="w-5 h-5" />
            <span>Latest Agriculture News</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Stay Informed with
            <span className="gradient-text block">Nigerian Agriculture Updates</span>
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-8">
            Get the latest insights, trends, and developments in Nigerian agriculture. From policy changes to innovative farming techniques, stay ahead of the curve.
          </p>
          
          {/* Refresh Button */}
          <button
            onClick={fetchNews}
            disabled={loading}
            className="inline-flex items-center space-x-2 px-6 py-3 text-sm font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg hover:bg-emerald-100 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            <span>{loading ? 'Loading...' : 'Refresh News'}</span>
          </button>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
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
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              {error}
            </p>
            <button
              onClick={fetchNews}
              className="btn-primary"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </button>
          </div>
        )}

        {/* News Articles */}
        {!loading && !error && articles.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {articles.map((article, index) => (
              <article key={index} className="card p-0 overflow-hidden group">
                {/* Article Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={article.urlToImage}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&h=400&fit=crop'
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  
                  {/* Source Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-xs font-semibold text-gray-900 rounded-full">
                      {article.source.name}
                    </span>
                  </div>
                </div>

                {/* Article Content */}
                <div className="p-6">
                  {/* Date */}
                  <div className="flex items-center space-x-2 text-sm text-gray-500 mb-3">
                    <Calendar className="w-4 h-4" />
                    <span>{getTimeAgo(article.publishedAt)}</span>
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-emerald-700 transition-colors duration-200">
                    {article.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {article.description.length > 120 
                      ? `${article.description.substring(0, 120)}...` 
                      : article.description
                    }
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

        {/* Empty State */}
        {!loading && !error && articles.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Newspaper className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="font-display text-xl font-semibold text-gray-900 mb-2">
              No News Available
            </h3>
            <p className="text-gray-600 max-w-md mx-auto">
              We couldn't find any recent agriculture news at the moment. Please check back later.
            </p>
          </div>
        )}

        {/* Call-to-Action */}
        {!loading && !error && articles.length > 0 && (
          <div className="text-center mt-12 pt-8 border-t border-gray-200">
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Stay updated with the latest developments in Nigerian agriculture. Subscribe to our newsletter for weekly insights and investment opportunities.
            </p>
            <a
              href="#newsletter"
              className="btn-primary"
            >
              Subscribe to Newsletter
            </a>
          </div>
        )}
      </div>
    </section>
  )
}

export default NewsBlog