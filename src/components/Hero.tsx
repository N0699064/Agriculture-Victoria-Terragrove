'use client'

import { useState, useEffect } from 'react'
import { ArrowRight, Play, TrendingUp, Users, MapPin, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react'

interface NewsArticle {
  title: string
  description: string
  url: string
  urlToImage: string
  publishedAt: string
  source: { name: string }
}

const Hero = () => {
  const [newsArticles, setNewsArticles] = useState<NewsArticle[]>([])
  const [currentSlide, setCurrentSlide] = useState(0)
  const [loading, setLoading] = useState(true)

  const stats = [
    { icon: TrendingUp, value: '25%+', label: 'Average Returns' },
    { icon: Users, value: '500+', label: 'Investors' },
    { icon: MapPin, value: '70+', label: 'Projects' }
  ]

  useEffect(() => {
    const fetchNews = async () => {
      try {
        console.log('Hero: Fetching news...')
        
        // Set fallback articles immediately to avoid blank state
        const fallbackArticles = [
          {
            title: "Nigeria Rice Production Hits New Record",
            description: "Nigerian farmers achieve unprecedented rice yields this season, with production increasing by 35% across major producing states.",
            url: "/news",
            urlToImage: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800&h=400&fit=crop",
            publishedAt: new Date().toISOString(),
            source: { name: "Nigeria Agricultural Review" }
          },
          {
            title: "Lagos State Launches N500bn Agricultural Initiative", 
            description: "Lagos government unveils ambitious agricultural program targeting food security and farmer empowerment across six zones.",
            url: "/news",
            urlToImage: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&h=400&fit=crop",
            publishedAt: new Date(Date.now() - 86400000).toISOString(),
            source: { name: "Lagos Agriculture" }
          },
          {
            title: "Cocoa Farmers Embrace Digital Technology",
            description: "Southwest Nigerian cocoa farmers adopt mobile apps and digital tools to improve crop monitoring and market access.",
            url: "/news", 
            urlToImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=400&fit=crop",
            publishedAt: new Date(Date.now() - 172800000).toISOString(),
            source: { name: "Cocoa News Nigeria" }
          }
        ]
        
        setNewsArticles(fallbackArticles)
        
        // Try to fetch live data in background
        try {
          const response = await fetch('/api/news', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          })
          
          if (response.ok) {
            const data = await response.json()
            if (data.articles && data.articles.length > 0) {
              console.log('Hero: Got live news data')
              setNewsArticles(data.articles.slice(0, 3))
            }
          }
        } catch (apiError) {
          console.log('Hero: API failed, using fallback articles')
        }
        
      } catch (error) {
        console.error('Hero: Error setting up news:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [])

  // Auto-slide functionality - updates every 4 seconds for latest 3 articles
  useEffect(() => {
    if (newsArticles.length === 0) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % Math.min(newsArticles.length, 3))
    }, 4000) // Change slide every 4 seconds

    return () => clearInterval(interval)
  }, [newsArticles.length])

  // Auto-refresh news every 2 minutes to get latest articles
  useEffect(() => {
    const refreshInterval = setInterval(() => {
      console.log('🔄 Auto-refreshing news articles...')
      const fetchNews = async () => {
        try {
          const response = await fetch('/api/news')
          if (response.ok) {
            const data = await response.json()
            setNewsArticles(data.articles?.slice(0, 3) || []) // Always get latest 3
          }
        } catch (error) {
          console.log('Auto-refresh failed:', error)
        }
      }
      fetchNews()
    }, 120000) // Refresh every 2 minutes

    return () => clearInterval(refreshInterval)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % newsArticles.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + newsArticles.length) % newsArticles.length)
  }

  const currentArticle = newsArticles[currentSlide]

  return (
    <section id="home" className="relative min-h-screen overflow-hidden">
      {/* Netflix-inspired Background with News Carousel */}
      <div className="absolute inset-0">
        {/* Background Image/Video Area */}
        <div className="relative h-full">
          {!loading && currentArticle && (
            <>
              {/* Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
                style={{
                  backgroundImage: `url(${currentArticle.urlToImage})`,
                }}
              />
              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent"></div>
            </>
          )}
          
          {/* Fallback gradient background */}
          {(loading || !currentArticle) && (
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-green-800 to-emerald-900"></div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Main Content */}
            <div className="text-white">
              {/* Badge */}
              <div className="inline-flex items-center space-x-2 bg-emerald-600/90 backdrop-blur-sm text-white px-6 py-3 rounded-full text-sm font-semibold mb-8 border border-emerald-400/30">
                <div className="w-2 h-2 bg-emerald-300 rounded-full animate-pulse"></div>
                <span>Leading Agricultural Investment Platform</span>
              </div>

              {/* Main Heading */}
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Transform
                <span className="block bg-gradient-to-r from-emerald-300 to-green-200 bg-clip-text text-transparent">
                  Agricultural Landscapes
                </span>
                Into Wealth
              </h1>

              {/* Subtitle */}
              <p className="text-xl text-gray-200 mb-8 max-w-lg leading-relaxed">
                Discover premium agricultural investment opportunities across Africa. Sustainable farming meets exceptional returns.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6 mb-12">
                <button className="btn-primary bg-emerald-600 hover:bg-emerald-700 text-white shadow-2xl group">
                  <span>Explore Opportunities</span>
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                </button>
                
                <button className="flex items-center space-x-3 text-white hover:text-emerald-300 transition-colors duration-200 group">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white/30 transition-all duration-200 border border-white/30">
                    <Play className="w-5 h-5 ml-0.5" />
                  </div>
                  <span className="font-semibold">Watch Our Story</span>
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8">
                {stats.map((stat, index) => {
                  const Icon = stat.icon
                  return (
                    <div key={stat.label} className="text-center group">
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl mb-3 group-hover:bg-white/20 transition-all duration-200 border border-white/20">
                        <Icon className="w-6 h-6 text-emerald-300" />
                      </div>
                      <div className="text-2xl font-bold font-display text-white mb-1">
                        {stat.value}
                      </div>
                      <div className="text-gray-300 text-sm font-medium">
                        {stat.label}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Right Side - News Carousel */}
            <div className="lg:pl-8">
              {loading ? (
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 animate-pulse">
                  <div className="h-4 bg-white/20 rounded mb-4"></div>
                  <div className="space-y-3">
                    <div className="h-3 bg-white/20 rounded"></div>
                    <div className="h-3 bg-white/20 rounded w-5/6"></div>
                  </div>
                </div>
              ) : (
                <div className="relative">
                  {/* News Card */}
                  {currentArticle && (
                    <div className="bg-white/95 backdrop-blur-lg rounded-2xl overflow-hidden shadow-2xl border border-white/20 transform transition-all duration-500 hover:scale-105">
                      {/* News Header */}
                      <div className="bg-gradient-to-r from-emerald-600 to-green-600 px-6 py-4">
                        <div className="flex items-center justify-between">
                          <h3 className="text-white font-bold text-lg">Latest Agriculture News</h3>
                          <a 
                            href="/news"
                            className="text-emerald-100 hover:text-white text-sm font-medium flex items-center space-x-1"
                          >
                            <span>View All</span>
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </div>
                      </div>

                      {/* News Content */}
                      <div className="p-6">
                        <div className="flex items-center space-x-2 text-xs text-emerald-600 font-semibold mb-3">
                          <span className="px-2 py-1 bg-emerald-100 rounded-full">{currentArticle.source.name}</span>
                          <span className="text-gray-500">•</span>
                          <span className="text-gray-500">
                            {new Date(currentArticle.publishedAt).toLocaleDateString()}
                          </span>
                        </div>
                        
                        <h4 className="font-display text-xl font-bold text-gray-900 mb-3 leading-tight">
                          {currentArticle.title}
                        </h4>
                        
                        <p className="text-gray-600 text-sm leading-relaxed mb-4">
                          {currentArticle.description.substring(0, 150)}...
                        </p>

                        <a
                          href={currentArticle.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center space-x-2 text-emerald-600 font-semibold hover:text-emerald-700 transition-colors duration-200 group/link"
                        >
                          <span>Read More</span>
                          <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform duration-200" />
                        </a>
                      </div>
                    </div>
                  )}

                  {/* Carousel Controls */}
                  {newsArticles.length > 1 && (
                    <>
                      <button
                        onClick={prevSlide}
                        className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-12 w-10 h-10 bg-black/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/50 transition-all duration-200"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      
                      <button
                        onClick={nextSlide}
                        className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-12 w-10 h-10 bg-black/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/50 transition-all duration-200"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>

                      {/* Slide Indicators */}
                      <div className="flex justify-center space-x-2 mt-6">
                        {newsArticles.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`w-2 h-2 rounded-full transition-all duration-200 ${
                              index === currentSlide 
                                ? 'bg-white w-8' 
                                : 'bg-white/50 hover:bg-white/70'
                            }`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero