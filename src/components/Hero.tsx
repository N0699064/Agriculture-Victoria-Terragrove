"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play, TrendingUp, Users, MapPin } from "lucide-react";

const Hero = () => {
  const stats = [
    { icon: TrendingUp, value: "25%+", label: "Average Returns" },
    { icon: Users, value: "500+", label: "Investors" },
    { icon: MapPin, value: "50+", label: "Projects" }
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Enhanced Background with multiple layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-100 via-green-50 to-amber-100">
        {/* Primary Pattern */}
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23059669' fill-opacity='0.1'%3E%3Ccircle cx='50' cy='50' r='3'/%3E%3Ccircle cx='10' cy='10' r='2'/%3E%3Ccircle cx='90' cy='90' r='2'/%3E%3Ccircle cx='10' cy='90' r='1.5'/%3E%3Ccircle cx='90' cy='10' r='1.5'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        {/* Secondary overlay with subtle gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/5 via-transparent to-amber-900/5"></div>
        {/* Radial gradient for depth */}
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-emerald-50/20 to-green-100/10"></div>
      </div>

      {/* Enhanced Floating elements with glass morphism */}
      <motion.div
        className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-emerald-400/40 to-green-600/30 rounded-full blur-2xl backdrop-blur-sm"
        animate={{
          y: [0, -30, 0],
          x: [0, 15, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-amber-400/30 to-orange-500/20 rounded-full blur-xl backdrop-blur-sm"
        animate={{
          y: [0, 25, 0],
          x: [0, -20, 0],
          scale: [1, 0.9, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-32 right-16 w-40 h-40 bg-gradient-to-br from-emerald-300/25 to-green-500/15 rounded-full blur-3xl backdrop-blur-sm"
        animate={{
          y: [0, 20, 0],
          x: [0, -15, 0],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-20 left-20 w-28 h-28 bg-gradient-to-br from-yellow-400/20 to-amber-600/15 rounded-full blur-2xl backdrop-blur-sm"
        animate={{
          y: [0, -25, 0],
          x: [0, 10, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Announcement Badge */}
          <motion.div
            className="inline-flex items-center space-x-2 glass-effect bg-emerald-100/80 text-emerald-900 px-6 py-3 rounded-full text-sm font-medium mb-8 backdrop-blur-md border border-emerald-200/30 shadow-lg animate-fade-in"
          >
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span>New investment opportunities available</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            className="font-display text-4xl sm:text-5xl lg:text-7xl font-bold text-stone-800 mb-6 leading-tight animate-fade-in"
          >
            Transform
            <span className="text-gradient block">
              Agricultural Landscapes
            </span>
            Into Wealth
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-lg sm:text-xl text-stone-600 mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-in"
          >
            Join the agricultural revolution in Africa. Victoria Terragrove offers
            premium investment opportunities that combine sustainable farming practices
            with exceptional returns, creating lasting value for communities and investors.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-16 animate-fade-in"
          >
            <motion.button
              className="btn-primary flex items-center space-x-2 group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Explore Opportunities</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
            </motion.button>
            
            <motion.button
              className="flex items-center space-x-3 text-stone-700 hover:text-emerald-700 transition-all duration-300 group"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-14 h-14 glass-effect bg-white/60 backdrop-blur-md rounded-full flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all duration-300 border border-white/30 group-hover:bg-white/80">
                <Play className="h-6 w-6 ml-0.5 text-emerald-700" />
              </div>
              <span className="font-semibold">Watch Our Story</span>
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto animate-fade-in"
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  className="text-center group"
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mb-4 group-hover:bg-green-200 transition-colors duration-200">
                    <Icon className="h-6 w-6 text-green-700" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold font-display text-stone-800 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-stone-600 font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-stone-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-stone-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;