import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  try {
    const API_KEY = process.env.NEWS_API_KEY
    
    // Enhanced demo data with more variety
    const demoArticles = [
      {
        title: "Nigeria's Agricultural Revolution: Modern Farming Techniques Transform Rural Communities",
        description: "Innovative farming methods are revolutionizing agriculture across Nigeria, with new irrigation systems and crop varieties increasing yields by up to 40% in rural communities. Smart farming technologies including GPS-guided tractors and soil sensors are being adopted by progressive farmers.",
        url: "#",
        urlToImage: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&h=400&fit=crop",
        publishedAt: new Date().toISOString(),
        source: { name: "Agriculture Today" }
      },
      {
        title: "Cocoa Farmers in Southwest Nigeria Embrace Sustainable Practices",
        description: "Farmers in Ogun and Oyo states are implementing sustainable cocoa farming practices, resulting in premium certifications and better market prices for their produce. The initiative includes organic farming methods and fair trade partnerships with international buyers.",
        url: "#",
        urlToImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=400&fit=crop",
        publishedAt: new Date(Date.now() - 86400000).toISOString(),
        source: { name: "Cocoa News Nigeria" }
      },
      {
        title: "Rice Production Surges in Northern Nigeria with Government Support",
        description: "Federal government initiatives and improved seed varieties have led to record rice production in Kebbi, Sokoto, and Kano states, reducing import dependency. The Anchor Borrowers' Programme has provided crucial financing to over 100,000 farmers.",
        url: "#",
        urlToImage: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800&h=400&fit=crop",
        publishedAt: new Date(Date.now() - 172800000).toISOString(),
        source: { name: "Nigeria Agricultural Review" }
      },
      {
        title: "Digital Agriculture: How Technology is Transforming Nigerian Farms",
        description: "From drone surveillance to IoT sensors, Nigerian farmers are embracing digital tools to optimize crop yields, monitor soil health, and predict weather patterns with unprecedented accuracy. Mobile apps for market access and weather forecasting are gaining widespread adoption.",
        url: "#",
        urlToImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=400&fit=crop",
        publishedAt: new Date(Date.now() - 259200000).toISOString(),
        source: { name: "AgriTech Nigeria" }
      },
      {
        title: "Export Opportunities: Nigerian Palm Oil Gains International Recognition",
        description: "Quality improvements in Nigerian palm oil production have opened new export markets in Europe and Asia, with local producers securing premium contracts worth millions of dollars. Sustainable production practices are driving this international recognition.",
        url: "#",
        urlToImage: "https://images.unsplash.com/photo-1615671524827-c1fe3973b648?w=800&h=400&fit=crop",
        publishedAt: new Date(Date.now() - 345600000).toISOString(),
        source: { name: "Export Nigeria" }
      },
      {
        title: "Climate-Smart Agriculture: Adapting to Changing Weather Patterns",
        description: "Research institutions collaborate with farmers to develop climate-resilient crop varieties and sustainable farming practices that can withstand Nigeria's changing rainfall patterns. Drought-resistant crops and improved irrigation systems are key focus areas.",
        url: "#",
        urlToImage: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&h=400&fit=crop",
        publishedAt: new Date(Date.now() - 432000000).toISOString(),
        source: { name: "Climate Agriculture Review" }
      },
      {
        title: "Youth in Agriculture: Young Entrepreneurs Drive Agricultural Innovation",
        description: "A new generation of young agricultural entrepreneurs is leveraging technology and modern business practices to transform Nigeria's farming sector. These agripreneurs are creating value chains from farm to market, generating employment and increasing food security.",
        url: "#",
        urlToImage: "https://images.unsplash.com/photo-1607082349566-187342175e2f?w=800&h=400&fit=crop",
        publishedAt: new Date(Date.now() - 518400000).toISOString(),
        source: { name: "Youth Agribusiness" }
      },
      {
        title: "Livestock Revolution: Modern Animal Husbandry Practices in Nigeria",
        description: "Nigerian livestock farmers are adopting modern animal husbandry practices including improved breeds, veterinary care, and feed management systems. These innovations are boosting productivity and meat quality while ensuring animal welfare standards.",
        url: "#",
        urlToImage: "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=800&h=400&fit=crop",
        publishedAt: new Date(Date.now() - 604800000).toISOString(),
        source: { name: "Livestock Today" }
      }
    ]

    // If API key is available, try to fetch live news
    if (API_KEY && API_KEY !== 'your-newsapi-key-here') {
      try {
        const queries = [
          'Nigeria agriculture farming',
          'Nigeria crops livestock',
          'African agriculture Nigeria'
        ]

        // Try multiple search queries for better coverage
        const promises = queries.map(query => 
          fetch(`https://newsapi.org/v2/everything?${new URLSearchParams({
            q: query,
            language: 'en',
            sortBy: 'publishedAt',
            pageSize: '10',
            apiKey: API_KEY
          })}`, {
            headers: { 'User-Agent': 'Victoria-Terragrove/1.0' }
          })
        )

        const responses = await Promise.allSettled(promises)
        const allArticles: any[] = []

        for (const response of responses) {
          if (response.status === 'fulfilled' && response.value.ok) {
            const data = await response.value.json()
            if (data.articles) {
              allArticles.push(...data.articles)
            }
          }
        }

        // Filter and deduplicate live articles
        const liveArticles = allArticles
          .filter((article, index, self) => 
            article.title && 
            article.description && 
            article.urlToImage &&
            !article.title.includes('[Removed]') &&
            article.description.length > 50 &&
            // Remove duplicates by title
            index === self.findIndex(a => a.title === article.title)
          )
          .map(article => ({
            title: article.title,
            description: article.description,
            url: article.url,
            urlToImage: article.urlToImage,
            publishedAt: article.publishedAt,
            source: article.source
          }))
          .slice(0, 6)

        // If we got good live articles, use them; otherwise use demo
        if (liveArticles.length >= 3) {
          return NextResponse.json({ 
            articles: liveArticles,
            source: 'live'
          })
        }
      } catch (apiError) {
        console.log('NewsAPI fetch failed, using demo data:', apiError)
      }
    }

    // Return enhanced demo data
    return NextResponse.json({ 
      articles: demoArticles.slice(0, 6),
      source: 'demo'
    })

  } catch (error) {
    console.error('News API error:', error)
    
    // Fallback demo data
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
      ],
      source: 'fallback'
    })
  }
}