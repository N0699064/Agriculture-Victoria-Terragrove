'use client'

import { ArrowRight, Play, TrendingUp, Users, MapPin } from 'lucide-react'

const Hero = () => {
  const stats = [
    { icon: TrendingUp, value: '25%+', label: 'Average Returns' },
    { icon: Users, value: '500+', label: 'Investors' },
    { icon: MapPin, value: '70+', label: 'Projects' }
  ]

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-green-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 hero-pattern opacity-40"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-emerald-400/30 to-green-500/30 rounded-full blur-2xl animate-float"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-green-400/20 to-emerald-500/20 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
      <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-gradient-to-r from-amber-400/25 to-yellow-500/25 rounded-full blur-xl animate-float" style={{animationDelay: '4s'}}></div>

      <div className="container relative z-10 pt-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Announcement Badge */}
          <div className="inline-flex items-center space-x-2 bg-emerald-100/80 text-emerald-800 px-6 py-3 rounded-full text-sm font-semibold mb-8 animate-fade-in border border-emerald-200/50">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            <span>New investment opportunities available</span>
          </div>

          {/* Main Heading */}
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight animate-slide-up">
            Transform
            <span className="gradient-text block">
              Agricultural Landscapes
            </span>
            Into Wealth
          </h1>

          {/* Subtitle */}
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-in">
            Join the agricultural revolution in Africa. Victoria Terragrove offers premium investment opportunities that combine sustainable farming practices with exceptional returns, creating lasting value for communities and investors.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-16 animate-scale-in">
            <button className="btn-primary group">
              <span>Explore Opportunities</span>
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
            
            <button className="flex items-center space-x-3 text-gray-700 hover:text-emerald-700 transition-colors duration-200 group">
              <div className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-200 border border-gray-100">
                <Play className="w-5 h-5 ml-0.5 text-emerald-600" />
              </div>
              <span className="font-semibold">Watch Our Story</span>
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto animate-fade-in">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div key={stat.label} className="text-center group cursor-pointer">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-emerald-100 rounded-xl mb-4 group-hover:bg-emerald-200 transition-colors duration-200">
                    <Icon className="w-6 h-6 text-emerald-700" />
                  </div>
                  <div className="text-3xl font-bold font-display text-gray-900 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 font-medium">
                    {stat.label}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}

export default Hero