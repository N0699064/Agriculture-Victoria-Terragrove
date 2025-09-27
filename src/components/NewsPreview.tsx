'use client'

import { useState, useEffect } from 'react'
import { ArrowRight, Calendar, ExternalLink, Newspaper } from 'lucide-react'

interface NewsArticle {
  title: string
  description: string
  url: string
  urlToImage: string
  publishedAt: string
  source: { name: string }
}

const NewsPreview = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true)
        
        // Set fallback articles first
        const fallbackArticles = [
          {
            title: "Nigerian Agriculture Sector Records 35% Growth",
            description: "The agriculture sector shows remarkable improvement with increased production across rice, cocoa, and cassava farming operations nationwide.",
            url: "/news",
            urlToImage: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=250&fit=crop",
            publishedAt: new Date().toISOString(),
            source: { name: "Agricultural Review" }
          },
          {
            title: "Digital Tools Transform Farming Practices",
            description: "Modern technology adoption helps Nigerian farmers increase yields and reduce costs through smart farming techniques and mobile applications.",
            url: "/news",
            urlToImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=250&fit=crop",
            publishedAt: new Date(Date.now() - 86400000).toISOString(),
            source: { name: "AgriTech Nigeria" }
          },
          {
            title: "Youth Lead Agricultural Innovation Movement",
            description: "Young entrepreneurs drive change in Nigeria's agriculture sector with innovative approaches to sustainable farming and value chain development.",
            url: "/news", 
            urlToImage: "https://images.unsplash.com/photo-1607082349566-187342175e2f?w=400&h=250&fit=crop",
            publishedAt: new Date(Date.now() - 172800000).toISOString(),
            source: { name: "Youth Agribusiness" }
          }
        ]
        
        setArticles(fallbackArticles)
        
        // Try to get live data
        try {
          const response = await fetch('/api/news')
          if (response.ok) {
            const data = await response.json()
            if (data.articles && data.articles.length >= 3) {
              setArticles(data.articles.slice(0, 3))
            }
          }
        } catch (apiError) {
          console.log('Using fallback articles for preview')
        }
        
      } catch (error) {
        console.error('News preview error:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <section className="section-padding bg-gradient-to-b from-gray-50 to-white">
      <div className="container">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="flex items-center justify-center space-x-2 text-emerald-600 font-semibold text-sm uppercase tracking-wider mb-4">
            <Newspaper className="w-5 h-5" />
            <span>Agriculture News</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Stay Informed with
            <span className="gradient-text block">Latest Industry Updates</span>
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Get the most recent news and insights from Nigeria's agriculture sector
          </p>
        </div>

        {/* News Preview Cards - Limited Width */}
        <div className="max-w-5xl mx-auto">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-xl p-6 shadow-lg animate-pulse">
                  <div className="h-32 bg-gray-200 rounded-lg mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-3"></div>
                  <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {articles.map((article, index) => (
                <div key={index} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                  {/* Article Image */}
                  <div className="h-40 overflow-hidden">
                    <img
                      src={article.urlToImage}
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=250&fit=crop'
                      }}
                    />
                  </div>

                  {/* Article Content */}
                  <div className="p-5">
                    {/* Date and Source */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(article.publishedAt)}</span>
                      </div>
                      <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-medium rounded-full">
                        {article.source.name}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-display text-lg font-bold text-gray-900 mb-3 leading-tight">
                      {article.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      {article.description.length > 100 
                        ? article.description.substring(0, 100) + '...'
                        : article.description
                      }
                    </p>

                    {/* Read More Link */}
                    <a
                      href={article.url === '#' ? '/news' : article.url}
                      className="inline-flex items-center space-x-2 text-emerald-600 font-semibold hover:text-emerald-700 transition-colors duration-200 group/link text-sm"
                    >
                      <span>Read More</span>
                      <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform duration-200" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* View All News CTA */}
          <div className="text-center">
            <a
              href="/news"
              className="inline-flex items-center space-x-3 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <Newspaper className="w-5 h-5" />
              <span>View All Agriculture News</span>
              <ExternalLink className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default NewsPreview