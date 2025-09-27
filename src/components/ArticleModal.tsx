'use client'

import { useState, useEffect } from 'react'
import { X, Calendar, ExternalLink, Tag } from 'lucide-react'

interface NewsArticle {
  title: string
  description: string
  url: string
  urlToImage: string
  publishedAt: string
  source: { name: string }
  summary?: string
}

interface ArticleModalProps {
  article: NewsArticle | null
  isOpen: boolean
  onClose: () => void
}

const ArticleModal: React.FC<ArticleModalProps> = ({ article, isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  if (!isOpen || !article) return null

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const generateFullContent = (article: NewsArticle) => {
    // Use the full description as base content
    const baseContent = article.description
    
    // Generate contextual content based on article title and content
    const isAboutRice = article.title.toLowerCase().includes('rice') || article.description.toLowerCase().includes('rice')
    const isAboutCocoa = article.title.toLowerCase().includes('cocoa') || article.description.toLowerCase().includes('cocoa')
    const isAboutTechnology = article.title.toLowerCase().includes('digital') || article.title.toLowerCase().includes('technology')
    const isAboutYouth = article.title.toLowerCase().includes('youth') || article.description.toLowerCase().includes('young')
    const isAboutGovernment = article.title.toLowerCase().includes('lagos') || article.title.toLowerCase().includes('government')
    
    let additionalSections = []
    
    if (isAboutRice) {
      additionalSections = [
        {
          title: "Rice Production Impact",
          content: `Nigeria's rice sector has seen remarkable transformation with the Anchor Borrowers Programme supporting over 100,000 farmers. Local production now meets 70% of domestic demand, reducing import dependency significantly.`
        },
        {
          title: "Key Growing Regions",
          content: `Major rice-producing states including Kebbi, Sokoto, Niger, and Kano have reported record harvests. Modern irrigation systems and improved seedlings contribute to yields averaging 6-8 tons per hectare.`
        },
        {
          title: "Market Opportunities",
          content: `With growing demand from Nigeria's 220 million population, rice farming presents excellent investment opportunities. Processing facilities and value chain development offer additional revenue streams.`
        }
      ]
    } else if (isAboutCocoa) {
      additionalSections = [
        {
          title: "Cocoa Industry Overview",
          content: `Nigeria ranks as the world's 4th largest cocoa producer, with Southwest states of Ondo, Osun, Oyo, and Cross River leading production. Premium quality Nigerian cocoa commands excellent prices in international markets.`
        },
        {
          title: "Sustainable Practices",
          content: `Farmers are adopting shade-grown cocoa systems, organic certification, and fair trade practices. These sustainable methods not only protect the environment but also secure premium market access.`
        },
        {
          title: "Technology Integration",
          content: `Mobile apps for weather forecasting, pest management, and market price tracking are transforming cocoa farming. Digital tools help farmers optimize harvest timing and quality control.`
        }
      ]
    } else if (isAboutTechnology) {
      additionalSections = [
        {
          title: "Digital Agriculture Revolution",
          content: `Nigerian farmers are embracing precision agriculture with GPS-guided tractors, drone surveillance, and IoT soil sensors. These technologies optimize resource use and maximize yields.`
        },
        {
          title: "Mobile Solutions",
          content: `Agricultural apps provide real-time weather data, market prices, and expert advice. Mobile money platforms enable easy access to credit and insurance for smallholder farmers.`
        },
        {
          title: "Future Technologies",
          content: `Emerging technologies like AI-powered crop monitoring, blockchain for supply chain transparency, and satellite imagery for farm management are being piloted across Nigeria.`
        }
      ]
    } else if (isAboutGovernment) {
      additionalSections = [
        {
          title: "Government Initiatives",
          content: `Federal and state governments have launched comprehensive agricultural transformation programs with funding, infrastructure development, and policy reforms to support modern farming.`
        },
        {
          title: "Investment Support",
          content: `The Central Bank's agricultural financing schemes provide low-interest loans to farmers and agribusiness enterprises. Special economic zones offer tax incentives for agricultural investments.`
        },
        {
          title: "Infrastructure Development",
          content: `Ongoing projects include rural road networks, irrigation systems, storage facilities, and processing centers to reduce post-harvest losses and improve market access.`
        }
      ]
    } else {
      // Generic agricultural content
      additionalSections = [
        {
          title: "Agricultural Sector Impact",
          content: `Nigeria's agricultural sector contributes 22% to GDP and employs over 70% of the rural population. Continued modernization and investment are crucial for food security and economic growth.`
        },
        {
          title: "Investment Opportunities",
          content: `The sector offers diverse investment options from crop production to agro-processing, livestock farming, and agricultural technology. Returns typically range from 15-30% annually.`
        },
        {
          title: "Market Outlook",
          content: `With Africa's largest population and growing middle class, Nigeria presents enormous market opportunities for agricultural products and value-added processing.`
        }
      ]
    }

    return { baseContent, additionalSections }
  }

  const { baseContent, additionalSections } = generateFullContent(article)

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/20 hover:bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-200 hover:scale-110"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Modal Content */}
          <div className="overflow-y-auto max-h-[90vh]">
            {/* Header Image */}
            <div className="relative h-64 md:h-80 overflow-hidden">
              <img
                src={article.urlToImage}
                alt={article.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src = 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&h=400&fit=crop'
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              {/* Article Meta in Image */}
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="flex items-center space-x-2 px-3 py-1 bg-emerald-600/90 backdrop-blur-sm rounded-full">
                    <Tag className="w-4 h-4" />
                    <span className="text-sm font-semibold">{article.source.name}</span>
                  </div>
                  <div className="flex items-center space-x-2 px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">{formatDate(article.publishedAt)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Article Content */}
            <div className="p-6 md:p-8">
              {/* Title */}
              <h1 className="font-display text-2xl md:text-3xl font-bold text-gray-900 mb-6 leading-tight">
                {article.title}
              </h1>

              {/* Summary */}
              {article.summary && (
                <div className="bg-emerald-50 border-l-4 border-emerald-500 p-4 mb-6 rounded-r-lg">
                  <p className="text-emerald-800 font-medium text-lg">
                    <span className="font-bold">Quick Summary: </span>
                    {article.summary}
                  </p>
                </div>
              )}

              {/* Main Content */}
              <div className="prose prose-lg max-w-none mb-8">
                <p className="text-gray-700 leading-relaxed text-lg mb-6">
                  {baseContent}
                </p>

                {/* Additional Content Sections */}
                {additionalSections.map((section, index) => (
                  <div key={index} className="mb-6">
                    <h3 className="font-display text-xl font-semibold text-gray-900 mb-3">
                      {section.title}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {section.content}
                    </p>
                  </div>
                ))}
              </div>

              {/* Article Footer */}
              <div className="border-t border-gray-200 pt-6 mt-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
                  <div className="text-sm text-gray-500">
                    <p>Published by <span className="font-semibold text-emerald-600">{article.source.name}</span></p>
                    <p>on {formatDate(article.publishedAt)}</p>
                  </div>
                  
                  {article.url !== '#' && article.url !== '/news' && (
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
                    >
                      <span>Visit Original Source</span>
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>

              {/* Related Articles CTA */}
              <div className="bg-gray-50 rounded-xl p-6 mt-8">
                <div className="text-center">
                  <h4 className="font-display text-lg font-semibold text-gray-900 mb-2">
                    Stay Updated with More Agriculture News
                  </h4>
                  <p className="text-gray-600 mb-4">
                    Discover more insights and updates from Nigeria's agriculture sector
                  </p>
                  <a
                    href="/news"
                    className="inline-flex items-center space-x-2 text-emerald-600 hover:text-emerald-700 font-semibold transition-colors duration-200 group"
                  >
                    <span>Browse More Articles</span>
                    <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ArticleModal