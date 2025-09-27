'use client'

import { MapPin, DollarSign, TrendingUp, Calendar, ArrowRight } from 'lucide-react'

const Investments = () => {
  const opportunities = [
    {
      title: 'Premium Cocoa Plantation',
      location: 'Ghana',
      investment: '$50,000 - $500,000',
      returns: '18-22% Annual Returns',
      duration: '5-7 Years',
      status: 'Available',
      statusColor: 'bg-green-100 text-green-800',
      image: 'bg-gradient-to-br from-amber-400 to-orange-500',
      highlights: ['Organic Certification', 'Direct Trade Partnerships', 'Climate Resilient Varieties']
    },
    {
      title: 'Modern Rice Farming',
      location: 'Nigeria',
      investment: '$25,000 - $250,000',
      returns: '15-20% Annual Returns',
      duration: '3-5 Years',
      status: 'Limited Slots',
      statusColor: 'bg-amber-100 text-amber-800',
      image: 'bg-gradient-to-br from-green-400 to-emerald-500',
      highlights: ['Advanced Irrigation', 'High-Yield Varieties', 'Government Support']
    },
    {
      title: 'Cashew Processing Facility',
      location: 'Ivory Coast',
      investment: '$100,000 - $1,000,000',
      returns: '25-30% Annual Returns',
      duration: '7-10 Years',
      status: 'Launching Soon',
      statusColor: 'bg-blue-100 text-blue-800',
      image: 'bg-gradient-to-br from-purple-400 to-pink-500',
      highlights: ['Value-Added Processing', 'Export Markets', 'Scalable Operations']
    }
  ]

  const features = [
    {
      icon: TrendingUp,
      title: 'Consistent Returns',
      description: 'Average 20%+ annual returns with transparent reporting'
    },
    {
      icon: MapPin,
      title: 'Strategic Locations',
      description: 'Prime agricultural regions across Africa with optimal conditions'
    },
    {
      icon: DollarSign,
      title: 'Flexible Investment',
      description: 'Multiple investment tiers to suit different portfolio sizes'
    }
  ]

  return (
    <section id="investments" className="section-padding bg-gradient-to-b from-gray-50 to-white">
      <div className="container">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="text-emerald-600 font-semibold text-sm uppercase tracking-wider mb-4">
            Investment Opportunities
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Premium
            <span className="gradient-text block">Agricultural Investments</span>
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Discover carefully selected agricultural investment opportunities across Africa, each vetted for profitability, sustainability, and positive community impact.
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Icon className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="font-display text-xl font-semibold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>

        {/* Investment Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {opportunities.map((opportunity, index) => (
            <div key={index} className="card overflow-hidden group">
              {/* Image Header */}
              <div className={`h-48 ${opportunity.image} relative`}>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute top-4 right-4">
                  <span className={`px-4 py-2 rounded-full text-xs font-semibold ${opportunity.statusColor}`}>
                    {opportunity.status}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="font-display text-xl font-bold mb-1">
                    {opportunity.title}
                  </h3>
                  <div className="flex items-center space-x-1 text-sm">
                    <MapPin className="w-4 h-4" />
                    <span>{opportunity.location}</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Investment Details */}
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2 text-gray-600">
                      <DollarSign className="w-4 h-4" />
                      <span className="text-sm">Investment</span>
                    </div>
                    <span className="font-semibold text-gray-900">{opportunity.investment}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2 text-gray-600">
                      <TrendingUp className="w-4 h-4" />
                      <span className="text-sm">Returns</span>
                    </div>
                    <span className="font-semibold text-emerald-600">{opportunity.returns}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">Duration</span>
                    </div>
                    <span className="font-semibold text-gray-900">{opportunity.duration}</span>
                  </div>
                </div>

                {/* Highlights */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Key Highlights</h4>
                  <div className="space-y-2">
                    {opportunity.highlights.map((highlight, highlightIndex) => (
                      <div key={highlightIndex} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full flex-shrink-0"></div>
                        <span className="text-sm text-gray-600">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <button className="w-full btn-primary group">
                  <span>Learn More</span>
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Don't see an investment that fits your criteria? We regularly develop new opportunities based on market conditions and investor demand.
          </p>
          <button className="btn-secondary">
            Request Custom Investment
          </button>
        </div>
      </div>
    </section>
  )
}

export default Investments