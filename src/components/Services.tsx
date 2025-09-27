"use client";

import { motion } from "framer-motion";
import { Sprout, BarChart3, Handshake, Settings } from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: Sprout,
      title: "Agricultural Development",
      description: "End-to-end agricultural project development from land acquisition to harvest optimization.",
      features: ["Land Assessment & Acquisition", "Crop Planning & Implementation", "Sustainable Farming Practices", "Yield Optimization"]
    },
    {
      icon: BarChart3,
      title: "Investment Management",
      description: "Professional portfolio management with transparent reporting and consistent returns.",
      features: ["Portfolio Diversification", "Risk Management", "Performance Tracking", "Regular Reporting"]
    },
    {
      icon: Handshake,
      title: "Partnership Development",
      description: "Strategic partnerships with local communities, governments, and international organizations.",
      features: ["Community Engagement", "Government Relations", "International Partnerships", "Stakeholder Management"]
    },
    {
      icon: Settings,
      title: "Technology Integration",
      description: "Modern agricultural technology and data-driven decision making for optimal results.",
      features: ["Precision Agriculture", "IoT Monitoring Systems", "Data Analytics", "Automation Solutions"]
    }
  ];

  return (
    <section id="services" className="section-padding bg-white">
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
            Our Services
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-800 mb-6 leading-tight">
            Comprehensive
            <span className="text-gradient block">
              Agricultural Solutions
            </span>
          </h2>
          <p className="text-lg text-stone-600 leading-relaxed">
            From initial investment to harvest optimization, we provide end-to-end 
            agricultural investment services that maximize returns while promoting sustainability.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                className="bg-stone-50 p-8 rounded-2xl card-hover border border-stone-200"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="flex items-start space-x-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center">
                      <Icon className="h-8 w-8 text-green-700" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-2xl font-semibold text-stone-800 mb-4">
                      {service.title}
                    </h3>
                    <p className="text-stone-600 mb-6 leading-relaxed">
                      {service.description}
                    </p>
                    <ul className="space-y-3">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                          <span className="text-stone-700 font-medium">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA Section */}
        <motion.div
          className="mt-16 bg-gradient-to-r from-green-700 to-green-800 rounded-2xl p-8 lg:p-12 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h3 className="font-display text-2xl lg:text-3xl font-bold text-white mb-4">
            Ready to Start Your Agricultural Investment Journey?
          </h3>
          <p className="text-green-100 text-lg mb-8 max-w-2xl mx-auto">
            Join hundreds of investors who trust Victoria Terragrove to manage their agricultural investments.
          </p>
          <motion.button
            className="bg-white text-green-700 hover:bg-stone-50 px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Schedule a Consultation
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;