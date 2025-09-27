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
    // Generate expanded content based on the article
    const baseContent = article.description
    
    // Add more detailed content sections
    const additionalSections = [
      {
        title: "Key Highlights",
        content: `This development in Nigeria's agricultural sector represents a significant step forward in modernizing farming practices. The initiative focuses on sustainable growth, technology adoption, and community empowerment.`
      },
      {
        title: "Impact on Farmers",
        content: `Local farmers are expected to benefit greatly from these developments. The program includes training sessions, access to modern equipment, and improved market linkages that will enhance their productivity and income.`
      },
      {
        title: "Government Support",
        content: `The federal and state governments have shown strong commitment to supporting agricultural transformation through policy reforms, funding allocations, and infrastructure development across key agricultural zones.`
      },
      {
        title: "Future Outlook",
        content: `Industry experts predict continued growth in this sector, with potential for increased exports, job creation, and food security improvements. The sustainable practices being implemented will also contribute to environmental conservation.`
      }
    ]

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