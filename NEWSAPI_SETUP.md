# 📰 NewsAPI Setup Guide - Victoria Terragrove

## Step 1: Get Your Free NewsAPI Key

1. **Visit**: https://newsapi.org/register
2. **Sign up** with your email address
3. **Verify** your email
4. **Copy your API key** from the dashboard

## Step 2: Add Your API Key

1. **Open** the file `/app/.env.local`
2. **Replace** `your-newsapi-key-here` with your actual API key:

```env
NEWS_API_KEY=your-actual-api-key-here
```

Example:
```env
NEWS_API_KEY=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6
```

## Step 3: Restart the Server

After adding your key:
1. **Stop** the development server (Ctrl+C)
2. **Restart** with: `yarn dev`

## Step 4: Verify It's Working

Visit your website and check:
- ✅ Hero carousel shows live Nigerian agriculture news
- ✅ News page has real-time articles with actual URLs
- ✅ Articles update automatically

## What You'll Get With NewsAPI:

### 🔴 **LIVE FEATURES**:
- **Real-time Nigerian agriculture news** from multiple sources
- **Automatic updates** every 3 minutes
- **Actual article URLs** that link to original sources
- **High-quality images** from news articles
- **Fresh content** that changes throughout the day

### 📊 **Sources Include**:
- BusinessDay Nigeria
- Guardian Nigeria  
- Punch Nigeria
- Vanguard News
- Premium Times
- And many more!

### 🎯 **Content Focus**:
- Nigerian agriculture developments
- Farming innovations
- Government agricultural policies
- Rice, cocoa, cassava production
- Agricultural technology adoption
- Investment opportunities

## Troubleshooting:

**If news isn't updating:**
1. Check your API key is correct in `.env.local`
2. Restart the development server
3. Check browser console for any errors
4. Ensure you haven't exceeded NewsAPI free tier limits (1000 requests/month)

## API Limits (Free Tier):
- **1,000 requests per month**
- **100 requests per day**
- **Perfect for development and testing**

For production, consider upgrading to a paid plan for higher limits.

---

**Need Help?** The system will automatically fall back to curated content if there are any issues with the live feed.