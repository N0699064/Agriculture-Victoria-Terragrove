"use client";

import { motion } from "framer-motion";
import { TrendingUp, MapPin, Calendar, DollarSign, Users, Zap } from "lucide-react";

const Investment = () => {
  const opportunities = [
    {
      title: "Premium Cocoa Plantation",
      location: "Ghana",
      investment: "$50,000 - $500,000",
      returns: "18-22% Annual Returns",
      duration: "5-7 Years",
      status: "Available",
      image: "/api/placeholder/400/250",
      highlights: ["Organic Certification", "Direct Trade Partnerships", "Climate Resilient Varieties"]
    },
    {
      title: "Modern Rice Farming",
      location: "Nigeria",
      investment: "$25,000 - $250,000",
      returns: "15-20% Annual Returns",
      duration: "3-5 Years",
      status: "Limited Slots",
      image: "/api/placeholder/400/250",
      highlights: ["Advanced Irrigation", "High-Yield Varieties", "Government Support"]
    },
    {
      title: "Cashew Processing Facility",
      location: "Ivory Coast",
      investment: "$100,000 - $1,000,000",
      returns: "25-30% Annual Returns",
      duration: "7-10 Years",
      status: "Launching Soon",
      image: "/api/placeholder/400/250",
      highlights: ["Value-Added Processing", "Export Markets", "Scalable Operations"]
    }
  ];

  const benefits = [
    {
      icon: TrendingUp,
      title: "Consistent Returns",
      description: "Average 20%+ annual returns with transparent reporting"
    },
    {
      icon: Users,
      title: "Community Impact",
      description: "Create jobs and improve livelihoods in rural communities"
    },
    {
      icon: Zap,
      title: "Sustainable Practices",
      description: "Environmentally responsible farming that protects the land"
    }
  ];

  return (
    <section id="investment" className="section-padding relative bg-gradient-to-br from-stone-50 via-emerald-50/30 to-amber-50/40 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23059669' fill-opacity='0.06'%3E%3Cpath d='M40 0c22.091 0 40 17.909 40 40s-17.909 40-40 40S0 62.091 0 40 17.909 0 40 0zm0 8c-17.673 0-32 14.327-32 32s14.327 32 32 32 32-14.327 32-32S57.673 8 40 8z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>
      <div className="container">
        {/* Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-green-700 font-semibold text-sm uppercase tracking-wider mb-4">
            Investment Opportunities
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-800 mb-6 leading-tight">
            Premium
            <span className="text-gradient block">
              Agricultural Investments
            </span>
          </h2>
          <p className="text-lg text-stone-600 leading-relaxed">
            Discover carefully selected agricultural investment opportunities across Africa, 
            each vetted for profitability, sustainability, and positive community impact.
          </p>
        </motion.div>

        {/* Benefits */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={benefit.title}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Icon className="h-8 w-8 text-green-700" />
                </div>
                <h3 className="font-display text-xl font-semibold text-stone-800 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-stone-600 leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Investment Opportunities */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {opportunities.map((opportunity, index) => (
            <motion.div
              key={opportunity.title}
              className="glass-effect bg-white/90 backdrop-blur-md rounded-3xl overflow-hidden shadow-xl card-hover border border-white/40 hover:border-emerald-200/50 hover:shadow-2xl transition-all duration-500"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              {/* Enhanced Image with glass overlay */}
              <div className="h-56 bg-gradient-to-br from-emerald-200 via-green-100 to-amber-200 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/30 via-transparent to-amber-900/10"></div>
                {/* Floating glass elements */}
                <div className="absolute top-4 left-4 w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full border border-white/30"></div>
                <div className="absolute bottom-6 right-6 w-12 h-12 bg-emerald-500/20 backdrop-blur-sm rounded-full border border-emerald-300/40"></div>
                <div className="absolute top-4 right-4">
                  <span className={`px-4 py-2 rounded-full text-xs font-bold backdrop-blur-md border shadow-lg ${
                    opportunity.status === 'Available' ? 'glass-effect bg-emerald-100/80 text-emerald-900 border-emerald-200/50' :
                    opportunity.status === 'Limited Slots' ? 'glass-effect bg-amber-100/80 text-amber-900 border-amber-200/50' :
                    'glass-effect bg-blue-100/80 text-blue-900 border-blue-200/50'
                  }`}>
                    {opportunity.status}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-display text-xl font-semibold text-stone-800 mb-2">
                  {opportunity.title}
                </h3>
                
                <div className="flex items-center space-x-2 text-stone-600 mb-4">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm">{opportunity.location}</span>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <DollarSign className="h-4 w-4 text-stone-500" />
                      <span className="text-sm text-stone-600">Investment</span>
                    </div>
                    <span className="text-sm font-semibold text-stone-800">{opportunity.investment}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="h-4 w-4 text-stone-500" />
                      <span className="text-sm text-stone-600">Returns</span>
                    </div>
                    <span className="text-sm font-semibold text-green-700">{opportunity.returns}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-stone-500" />
                      <span className="text-sm text-stone-600">Duration</span>
                    </div>
                    <span className="text-sm font-semibold text-stone-800">{opportunity.duration}</span>
                  </div>
                </div>

                {/* Highlights */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-stone-800 mb-3">Key Highlights</h4>
                  <div className="space-y-2">
                    {opportunity.highlights.map((highlight, highlightIndex) => (
                      <div key={highlightIndex} className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full flex-shrink-0"></div>
                        <span className="text-sm text-stone-600">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <motion.button
                  className="w-full btn-primary text-center"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Learn More
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <p className="text-stone-600 mb-6 max-w-2xl mx-auto">
            Don't see an investment that fits your criteria? We regularly develop new opportunities 
            based on market conditions and investor demand.
          </p>
          <motion.button
            className="btn-secondary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Request Custom Investment
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Investment;