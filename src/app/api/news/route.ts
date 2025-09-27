import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  try {
    console.log('🔄 Fetching latest 3 Nigerian agriculture news...')
    
    // Direct RSS to JSON approach (avoiding internal fetch calls)
    const rssFeeds = [
      {
        url: 'https://businessday.ng/category/agriculture/feed/',
        name: 'BusinessDay Agriculture'
      },
      {
        url: 'https://guardian.ng/category/features/agric/feed/',
        name: 'Guardian Nigeria Agriculture'
      },
      {
        url: 'https://punchng.com/topics/agriculture/feed/',
        name: 'Punch Agriculture'
      }
    ]

    for (const feed of rssFeeds) {
      try {
        console.log(`🔄 Trying ${feed.name}...`)
        
        const rssToJsonUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feed.url)}&count=5`
        
        const response = await fetch(rssToJsonUrl, {
          method: 'GET',
          headers: {
            'User-Agent': 'Victoria-Terragrove-News/1.0',
            'Accept': 'application/json'
          },
          timeout: 10000
        })

        if (response.ok) {
          const data = await response.json()
          
          if (data.status === 'ok' && data.items && data.items.length > 0) {
            console.log(`✅ Success! Got ${data.items.length} articles from ${feed.name}`)
            
            // Get exactly 3 latest articles for carousel
            const articles = data.items.slice(0, 3).map((item: any) => ({
              title: cleanTitle(item.title),
              description: cleanDescription(item.description || item.content),
              url: item.link || '#',
              urlToImage: extractImage(item) || getDefaultImage(),
              publishedAt: item.pubDate || new Date().toISOString(),
              source: { name: feed.name }
            }))

            return NextResponse.json({
              articles,
              source: 'live-rss',
              timestamp: new Date().toISOString(),
              feed_name: feed.name,
              total_articles: articles.length
            })
          }
        }
      } catch (feedError) {
        console.log(`❌ ${feed.name} failed:`, feedError.message)
        continue
      }
    }

    // Return latest 3 fallback articles for carousel
    console.log('⚠️ Using fallback articles for carousel')
    const fallbackArticles = [
      {
        title: "Nigerian Rice Production Reaches Record High in 2024",
        description: "Nigerian farmers achieved unprecedented rice yields this season, with production increasing by 35% compared to 2023. The Anchor Borrowers Programme continues to support over 100,000 farmers nationwide.",
        url: "#",
        urlToImage: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800&h=400&fit=crop",
        publishedAt: new Date().toISOString(),
        source: { name: "Nigeria Agricultural Review" }
      },
      {
        title: "Lagos State Launches N500bn Agricultural Initiative",
        description: "Lagos State government unveils ambitious agricultural program targeting food security and farmer empowerment across the state's six agricultural zones.",
        url: "#",
        urlToImage: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&h=400&fit=crop",
        publishedAt: new Date(Date.now() - 86400000).toISOString(),
        source: { name: "Lagos Agriculture" }
      },
      {
        title: "Cocoa Farmers Embrace Digital Technology for Better Yields",
        description: "Southwest Nigerian cocoa farmers adopt mobile apps and digital tools to improve crop monitoring, pest control, and market access, boosting productivity significantly.",
        url: "#",
        urlToImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=400&fit=crop",
        publishedAt: new Date(Date.now() - 172800000).toISOString(),
        source: { name: "Cocoa News Nigeria" }
      }
    ]

    return NextResponse.json({
      articles: fallbackArticles,
      source: 'fallback',
      timestamp: new Date().toISOString(),
      message: 'Latest 3 Nigerian agriculture news (fallback data)'
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