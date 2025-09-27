import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  try {
    // Using NewsAPI to fetch Nigerian agriculture news
    const API_KEY = process.env.NEWS_API_KEY || 'demo-key'
    const baseUrl = 'https://newsapi.org/v2/everything'
    
    // Search for Nigerian agriculture news
    const params = new URLSearchParams({
      q: 'agriculture Nigeria farming crops livestock',
      language: 'en',
      sortBy: 'publishedAt',
      pageSize: '6',
      apiKey: API_KEY
    })

    const response = await fetch(`${baseUrl}?${params}`, {
      headers: {
        'User-Agent': 'Victoria-Terragrove/1.0'
      }
    })

    if (!response.ok) {
      // Fallback to demo data if API fails
      return NextResponse.json({
        articles: [
          {
            title: "Nigeria's Agricultural Revolution: Modern Farming Techniques Transform Rural Communities",
            description: "Innovative farming methods are revolutionizing agriculture across Nigeria, with new irrigation systems and crop varieties increasing yields by up to 40% in rural communities.",
            url: "#",
            urlToImage: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&h=400&fit=crop",
            publishedAt: new Date().toISOString(),
            source: { name: "Agriculture Today" }
          },
          {
            title: "Cocoa Farmers in Southwest Nigeria Embrace Sustainable Practices",
            description: "Farmers in Ogun and Oyo states are implementing sustainable cocoa farming practices, resulting in premium certifications and better market prices for their produce.",
            url: "#",
            urlToImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=400&fit=crop",
            publishedAt: new Date(Date.now() - 86400000).toISOString(),
            source: { name: "Cocoa News Nigeria" }
          },
          {
            title: "Rice Production Surges in Northern Nigeria with Government Support",
            description: "Federal government initiatives and improved seed varieties have led to record rice production in Kebbi, Sokoto, and Kano states, reducing import dependency.",
            url: "#",
            urlToImage: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800&h=400&fit=crop",
            publishedAt: new Date(Date.now() - 172800000).toISOString(),
            source: { name: "Nigeria Agricultural Review" }
          }
        ]
      })
    }

    const data = await response.json()
    
    // Filter and format the articles
    const articles = data.articles
      ?.filter((article: any) => 
        article.title && 
        article.description && 
        article.urlToImage &&
        !article.title.includes('[Removed]')
      )
      ?.slice(0, 3)
      ?.map((article: any) => ({
        title: article.title,
        description: article.description,
        url: article.url,
        urlToImage: article.urlToImage,
        publishedAt: article.publishedAt,
        source: article.source
      })) || []

    return NextResponse.json({ articles })

  } catch (error) {
    console.error('News API error:', error)
    
    // Return demo data on error
    return NextResponse.json({
      articles: [
        {
          title: "Nigeria's Agricultural Revolution: Modern Farming Techniques Transform Rural Communities",
          description: "Innovative farming methods are revolutionizing agriculture across Nigeria, with new irrigation systems and crop varieties increasing yields by up to 40% in rural communities.",
          url: "#",
          urlToImage: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&h=400&fit=crop",
          publishedAt: new Date().toISOString(),
          source: { name: "Agriculture Today" }
        },
        {
          title: "Cocoa Farmers in Southwest Nigeria Embrace Sustainable Practices",
          description: "Farmers in Ogun and Oyo states are implementing sustainable cocoa farming practices, resulting in premium certifications and better market prices for their produce.",
          url: "#",
          urlToImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=400&fit=crop",
          publishedAt: new Date(Date.now() - 86400000).toISOString(),
          source: { name: "Cocoa News Nigeria" }
        },
        {
          title: "Rice Production Surges in Northern Nigeria with Government Support",
          description: "Federal government initiatives and improved seed varieties have led to record rice production in Kebbi, Sokoto, and Kano states, reducing import dependency.",
          url: "#",
          urlToImage: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800&h=400&fit=crop",
          publishedAt: new Date(Date.now() - 172800000).toISOString(),
          source: { name: "Nigeria Agricultural Review" }
        }
      ]
    })
  }
}