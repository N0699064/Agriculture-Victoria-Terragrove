# Victoria Terragrove - Agricultural Investment Website

A professional agricultural investment website built with **Next.js 15**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**.

## 🌱 Project Overview

Victoria Terragrove is a modern, conversion-optimized website for agricultural investment opportunities in Africa. The site showcases premium investment opportunities with sustainable farming practices and exceptional returns.

## ✨ Features

### Core Sections
- **Hero Section**: Compelling headline with animated elements and key statistics
- **About Section**: Company overview with core values and achievements
- **Services Section**: Comprehensive agricultural solutions and offerings
- **Investment Opportunities**: Featured investment projects with detailed information
- **Newsletter Signup**: Functional email subscription with API integration
- **Footer**: Complete contact information and navigation

### Technical Features
- **Next.js 15** with App Router and TypeScript
- **Responsive Design** with Tailwind CSS
- **Smooth Animations** using Framer Motion and CSS animations
- **Professional Color Palette**: Deep greens, warm browns, creamy off-whites
- **Modern Typography**: Playfair Display (headings) + Inter (body)
- **Email Integration**: Nodemailer with transactional emails
- **Performance Optimized**: Fast loading and smooth interactions

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- Yarn package manager

### Installation

1. **Install dependencies**:
   ```bash
   yarn install
   ```

2. **Configure email settings** (optional):
   ```bash
   # Update .env.local with your email service credentials
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-app-password
   ```

3. **Start development server**:
   ```bash
   yarn dev
   ```

4. **Open in browser**:
   ```
   http://localhost:3000
   ```

## 📧 Newsletter Functionality

The newsletter subscription sends emails to `jeff4conrad@hotmail.com` with:
- **Admin Notification**: New subscriber details with styling
- **Welcome Email**: Professional onboarding email to subscriber
- **Error Handling**: Graceful fallbacks and user feedback

### API Endpoint
```bash
POST /api/newsletter
Content-Type: application/json

{
  "email": "user@example.com"
}
```

## 🎨 Design Guidelines

### Color Palette
- **Primary Green**: `#059669` (Professional agricultural theme)
- **Stone/Earth Tones**: `#78716c`, `#57534e` (Natural, earthy feel)
- **Warm Accents**: `#a67c52` (Complementary brown tones)
- **Light Backgrounds**: `#f9f9f7`, `#f5f5f4` (Clean, modern)

### Typography
- **Display Font**: Playfair Display (Elegant serif for headings)
- **Body Font**: Inter (Clean, readable sans-serif)

### Animation Principles
- **Subtle Entrance**: Fade-in animations for content sections
- **Hover Effects**: Scale and color transitions on interactive elements
- **Smooth Scrolling**: CSS scroll-behavior for navigation
- **Floating Elements**: Background decorative animations

## 📈 Investment Opportunities Showcased

- **Premium Cocoa Plantation** (Ghana): 18-22% annual returns
- **Modern Rice Farming** (Nigeria): 15-20% annual returns  
- **Cashew Processing Facility** (Ivory Coast): 25-30% annual returns

## 🤝 Contact Information

- **Email**: info@victoriaterragrove.com
- **Phone**: +234 901 234 5678
- **Address**: Plot 123, Victoria Island, Lagos, Nigeria

---

*Built with ❤️ for sustainable agricultural investment in Africa*
