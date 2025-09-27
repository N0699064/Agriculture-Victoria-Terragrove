import { NextResponse } from 'next/server'

interface RSSItem {
  title?: string;
  description?: string;
  content?: string;
  link?: string;
  guid?: string;
  thumbnail?: string;
  pubDate?: string;
}

interface RSSResponse {
  status: string;
  items?: RSSItem[];
}

export async function GET() {
  try {
    console.log('🔄 Fetching LIVE Nigerian agriculture news...')
    
    // Try to fetch live news from RSS feed
    try {
      const rssUrl = 'https://businessday.ng/category/agriculture/feed/'
      const rssToJsonUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}&count=10`
      
      console.log('Fetching from:', rssToJsonUrl)
      
      const response = await fetch(rssToJsonUrl, {
        method: 'GET',
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; Victoria-Terragrove/1.0)',
        },
      })

      console.log('Response status:', response.status)
      
      if (response.ok) {
        const data: RSSResponse = await response.json()
        console.log('RSS Response status:', data.status)
        console.log('Items found:', data.items?.length || 0)
        
        if (data.status === 'ok' && data.items && data.items.length > 0) {
          const liveArticles = data.items.slice(0, 6).map((item: RSSItem) => ({
            title: item.title || 'Nigerian Agriculture News',
            description: (item.description || item.content || 'Latest agriculture update')
              .replace(/<[^>]*>/g, '')
              .substring(0, 300) + '...',
            url: item.link || item.guid || '#',
            urlToImage: item.thumbnail || 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&h=400&fit=crop',
            publishedAt: item.pubDate || new Date().toISOString(),
            source: { name: 'BusinessDay Agriculture' }
          }))

          console.log('✅ Successfully returning', liveArticles.length, 'live articles')
          
          return NextResponse.json({
            articles: liveArticles,
            source: 'live-rss',
            timestamp: new Date().toISOString(),
            message: `Live Nigerian agriculture news from BusinessDay`
          })
        }
      }
    } catch (rssError) {
      console.log('RSS fetch failed:', rssError instanceof Error ? rssError.message : 'Unknown error')
    }

    // Return enhanced fallback articles
    const fallbackArticles = [
      {
        title: "Nigerian Agriculture: Record Rice Harvest Boosts Food Security",
        description: "Nigerian farmers celebrate record rice production this season, with yields exceeding expectations across major producing states including Kebbi, Sokoto, and Niger. The success is attributed to government support programs and improved farming techniques.",
        url: "/news",
        urlToImage: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800&h=400&fit=crop",
        publishedAt: new Date().toISOString(),
        source: { name: "Nigeria Agricultural Review" }
      },
      {
        title: "Technology Transforms Nigerian Cocoa Farming Practices",
        description: "Cocoa farmers in Southwest Nigeria are embracing digital tools and sustainable practices, improving crop quality and securing premium market prices. Mobile apps for weather monitoring and pest control are gaining widespread adoption.",
        url: "/news",
        urlToImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=400&fit=crop",
        publishedAt: new Date(Date.now() - 86400000).toISOString(),
        source: { name: "Cocoa News Nigeria" }
      },
      {
        title: "Youth Lead Nigeria's Agricultural Innovation Movement",
        description: "Young entrepreneurs drive agricultural innovation across Nigeria, leveraging modern technology and business practices to transform traditional farming methods. These agripreneurs are creating sustainable value chains and employment opportunities.",
        url: "/news",
        urlToImage: "https://images.unsplash.com/photo-1607082349566-187342175e2f?w=800&h=400&fit=crop",
        publishedAt: new Date(Date.now() - 172800000).toISOString(),
        source: { name: "Youth Agribusiness" }
      }
    ]

    return NextResponse.json({
      articles: fallbackArticles,
      source: 'curated-fallback',
      timestamp: new Date().toISOString(),
      message: 'High-quality curated Nigerian agriculture news'
    })

  } catch (error) {
    console.error('Live news API error:', error)
    
    return NextResponse.json({
      articles: [
        {
          title: "Nigerian Agriculture News",
          description: "Stay updated with the latest developments in Nigerian agriculture and farming innovations.",
          url: "/news",
          urlToImage: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&h=400&fit=crop",
          publishedAt: new Date().toISOString(),
          source: { name: "Agriculture Today" }
        }
      ],
      source: 'error-fallback',
      message: 'Error occurred fetching news'
    })
  }
}
