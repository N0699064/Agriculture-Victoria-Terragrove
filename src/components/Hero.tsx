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
      {/* Background with overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-stone-50 to-amber-50">
        <div className="absolute inset-0 opacity-40" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23059669' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      {/* Floating elements */}
      <motion.div
        className="absolute top-20 left-10 w-20 h-20 bg-green-200/30 rounded-full blur-xl"
        animate={{
          y: [0, -20, 0],
          x: [0, 10, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-32 right-16 w-32 h-32 bg-amber-200/20 rounded-full blur-2xl"
        animate={{
          y: [0, 20, 0],
          x: [0, -15, 0],
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
            className="inline-flex items-center space-x-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-8 animate-fade-in"
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
              className="flex items-center space-x-3 text-stone-700 hover:text-green-700 transition-colors duration-200 group"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-200">
                <Play className="h-5 w-5 ml-0.5" />
              </div>
              <span className="font-medium">Watch Our Story</span>
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