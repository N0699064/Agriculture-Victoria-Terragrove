import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  try {
    console.log('🔄 Fetching latest Nigerian agriculture news...')
    
    // Try to get live news from BusinessDay RSS
    try {
      const rssUrl = 'https://businessday.ng/category/agriculture/feed/'
      const rssToJsonUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}&count=8`
      
      const response = await fetch(rssToJsonUrl, {
        method: 'GET',
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; Victoria-Terragrove/1.0)',
        },
      })

      if (response.ok) {
        const data = await response.json()
        console.log('RSS Response:', data.status, 'Items:', data.items?.length || 0)
        
        if (data.status === 'ok' && data.items && data.items.length > 0) {
          console.log('✅ SUCCESS! Got LIVE articles from BusinessDay Agriculture')
          
          const liveArticles = data.items.slice(0, 8).map((item: any) => ({
            title: cleanTitle(item.title),
            description: cleanDescription(item.description || item.content),
            url: item.link || item.guid || '/news',
            urlToImage: extractImage(item) || getDefaultImage(),
            publishedAt: item.pubDate || new Date().toISOString(),
            source: { name: 'BusinessDay Agriculture' }
          }))

          return NextResponse.json({
            articles: liveArticles,
            source: 'live-businessday',
            timestamp: new Date().toISOString(),
            message: 'Live Nigerian agriculture news from BusinessDay',
            total_articles: liveArticles.length
          })
        }
      }
    } catch (rssError) {
      console.log('❌ RSS fetch failed:', rssError.message)
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
    console.error('❌ News API error:', error)
    
    // Return fallback articles for carousel
    const fallbackArticles = [
      {
        title: "Nigerian Agriculture: Record Rice Harvest Boosts Food Security",
        description: "Nigerian farmers celebrate record rice production this season, with yields exceeding expectations across major producing states including Kebbi, Sokoto, and Niger.",
        url: "#",
        urlToImage: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800&h=400&fit=crop",
        publishedAt: new Date().toISOString(),
        source: { name: "Nigeria Agricultural Review" }
      },
      {
        title: "Technology Transforms Nigerian Cocoa Farming",
        description: "Cocoa farmers in Southwest Nigeria adopt digital tools and sustainable practices, improving crop quality and securing premium market prices for their produce.",
        url: "#",
        urlToImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=400&fit=crop",
        publishedAt: new Date(Date.now() - 86400000).toISOString(),
        source: { name: "Cocoa News Nigeria" }
      },
      {
        title: "Youth Lead Nigeria's Agricultural Innovation Drive",
        description: "Young entrepreneurs drive agricultural innovation across Nigeria, leveraging modern technology and business practices to transform traditional farming methods.",
        url: "#",
        urlToImage: "https://images.unsplash.com/photo-1607082349566-187342175e2f?w=800&h=400&fit=crop",
        publishedAt: new Date(Date.now() - 172800000).toISOString(),
        source: { name: "Youth Agribusiness" }
      }
    ]

    return NextResponse.json({
      articles: fallbackArticles,
      source: 'error-fallback',
      timestamp: new Date().toISOString(),
      message: 'Latest 3 Nigerian agriculture news (error fallback)'
    })
  }
}

// Helper functions
function cleanTitle(title: string): string {
  if (!title) return 'Nigerian Agriculture News'
  return title.replace(/read more.*$/i, '').trim()
}

function cleanDescription(description: string): string {
  if (!description) return 'Latest updates from Nigerian agriculture sector'
  
  // Remove HTML tags and "read more" links
  let cleaned = description
    .replace(/<[^>]*>/g, '')
    .replace(/read more.*$/i, '')
    .trim()
  
  // Limit length for carousel
  if (cleaned.length > 200) {
    cleaned = cleaned.substring(0, 200) + '...'
  }
  
  return cleaned || 'Latest updates from Nigerian agriculture sector'
}

function extractImage(item: any): string | null {
  if (item.thumbnail) return item.thumbnail
  if (item.enclosure?.link) return item.enclosure.link
  
  // Try to extract from description
  const imgMatch = item.description?.match(/src="([^"]+)"/i)
  if (imgMatch) return imgMatch[1]
  
  return null
}

function getDefaultImage(): string {
  const images = [
    'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&h=400&fit=crop',
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=400&fit=crop',
    'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800&h=400&fit=crop'
  ]
  return images[Math.floor(Math.random() * images.length)]
}