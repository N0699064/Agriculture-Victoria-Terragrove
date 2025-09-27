import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  try {
    console.log('Attempting to fetch live Nigerian agriculture news...')
    
    // Try multiple free sources
    const sources = [
      {
        name: 'Guardian Nigeria Agriculture',
        url: 'https://guardian.ng/category/features/agric/feed/',
        parser: 'rss'
      },
      {
        name: 'Punch Agriculture',
        url: 'https://punchng.com/topics/agriculture/feed/',
        parser: 'rss'  
      },
      {
        name: 'BusinessDay Agriculture',
        url: 'https://businessday.ng/category/agriculture/feed/',
        parser: 'rss'
      }
    ]

    let allArticles = []

    // Try RSS to JSON conversion service
    for (const source of sources) {
      try {
        console.log(`Trying source: ${source.name}`)
        
        // Use rss2json free service
        const rssToJsonUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(source.url)}`
        
        const response = await fetch(rssToJsonUrl, {
          method: 'GET',
          headers: {
            'User-Agent': 'Victoria-Terragrove/1.0'
          }
        })

        if (response.ok) {
          const data = await response.json()
          
          if (data.status === 'ok' && data.items && data.items.length > 0) {
            console.log(`Successfully fetched ${data.items.length} items from ${source.name}`)
            
            const articles = data.items.slice(0, 3).map((item: any) => ({
              title: item.title || 'Nigerian Agriculture News',
              description: cleanDescription(item.description || item.content || 'Latest updates from Nigerian agriculture sector'),
              url: item.link || '#',
              urlToImage: extractImageUrl(item) || getRandomAgricultureImage(),
              publishedAt: item.pubDate || new Date().toISOString(),
              source: { name: source.name }
            }))

            allArticles.push(...articles)
          }
        }
      } catch (sourceError) {
        console.log(`Failed to fetch from ${source.name}:`, sourceError.message)
        continue
      }
    }

    // If we got live articles, return them
    if (allArticles.length > 0) {
      console.log(`Returning ${allArticles.length} live articles`)
      return NextResponse.json({
        articles: allArticles.slice(0, 6),
        source: 'live-rss',
        fetched_at: new Date().toISOString(),
        sources_used: sources.map(s => s.name)
      })
    }

    // Fallback to curated demo data
    return NextResponse.json({
      articles: getFallbackArticles(),
      source: 'demo',
      message: 'Live sources unavailable, using curated content'
    })

  } catch (error) {
    console.error('Live news fetch error:', error)
    
    return NextResponse.json({
      articles: getFallbackArticles(),
      source: 'error-fallback',
      error: 'Failed to fetch live news'
    })
  }
}

function cleanDescription(description: string): string {
  if (!description) return 'Latest updates from Nigerian agriculture sector'
  
  // Remove HTML tags
  let cleaned = description.replace(/<[^>]*>/g, '')
  
  // Remove extra whitespace
  cleaned = cleaned.replace(/\s+/g, ' ').trim()
  
  // Limit length
  if (cleaned.length > 300) {
    cleaned = cleaned.substring(0, 300) + '...'
  }
  
  return cleaned || 'Latest updates from Nigerian agriculture sector'
}

function extractImageUrl(item: any): string | null {
  // Try different possible image fields
  if (item.enclosure?.link) return item.enclosure.link
  if (item.thumbnail) return item.thumbnail  
  if (item.image) return item.image
  
  // Try to extract image from content
  const imgMatch = item.description?.match(/<img[^>]+src="([^">]+)"/i)
  if (imgMatch) return imgMatch[1]
  
  return null
}

function getRandomAgricultureImage(): string {
  const images = [
    'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&h=400&fit=crop',
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=400&fit=crop',
    'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800&h=400&fit=crop',
    'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=400&fit=crop',
    'https://images.unsplash.com/photo-1615671524827-c1fe3973b648?w=800&h=400&fit=crop'
  ]
  return images[Math.floor(Math.random() * images.length)]
}

function getFallbackArticles() {
  return [
    {
      title: "Nigeria's Rice Production Hits Record High in 2024",
      description: "Nigerian rice farmers achieved unprecedented yields this season, with production increasing by 35% compared to 2023. The success is attributed to improved seedlings, better irrigation systems, and government support through the Anchor Borrowers Programme.",
      url: "#",
      urlToImage: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800&h=400&fit=crop",
      publishedAt: new Date().toISOString(),
      source: { name: "Nigeria Agricultural Review" }
    },
    {
      title: "Cocoa Farmers Embrace Technology for Better Yields",
      description: "Farmers in Southwest Nigeria are adopting digital tools including weather monitoring apps and soil testing devices. The initiative, supported by international partners, has improved crop quality and farm profitability significantly.",
      url: "#", 
      urlToImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=400&fit=crop",
      publishedAt: new Date(Date.now() - 86400000).toISOString(),
      source: { name: "AgriTech Nigeria" }
    },
    {
      title: "Youth Agriculture Program Launches Across 12 States",
      description: "Federal Ministry of Agriculture launches comprehensive youth engagement program targeting young entrepreneurs in agriculture. The program provides funding, training, and market access to participants aged 18-35.",
      url: "#",
      urlToImage: "https://images.unsplash.com/photo-1607082349566-187342175e2f?w=800&h=400&fit=crop",
      publishedAt: new Date(Date.now() - 172800000).toISOString(),
      source: { name: "Federal Ministry of Agriculture" }
    }
  ]
}