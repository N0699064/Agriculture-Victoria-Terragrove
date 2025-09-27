"use client";

import { motion } from "framer-motion";
import { Award, Shield, Users2, Target } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Award,
      title: "Excellence",
      description: "We maintain the highest standards in agricultural investment and sustainable farming practices."
    },
    {
      icon: Shield,
      title: "Integrity",
      description: "Transparent operations and ethical business practices guide every decision we make."
    },
    {
      icon: Users2,
      title: "Community",
      description: "Building lasting partnerships with local communities and stakeholders across Africa."
    },
    {
      icon: Target,
      title: "Innovation",
      description: "Pioneering modern agricultural techniques while respecting traditional wisdom."
    }
  ];

  return (
    <section id="about" className="section-padding bg-stone-50">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-green-700 font-semibold text-sm uppercase tracking-wider mb-4">
              About Victoria Terragrove
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-800 mb-6 leading-tight">
              Cultivating
              <span className="text-gradient block">
                Africa's Agricultural Future
              </span>
            </h2>
            <p className="text-lg text-stone-600 mb-8 leading-relaxed">
              For over a decade, Victoria Terragrove has been at the forefront of agricultural 
              transformation in Africa. We specialize in identifying, developing, and managing 
              premium agricultural investments that deliver sustainable returns while creating 
              positive environmental and social impact.
            </p>
            <p className="text-stone-600 mb-8 leading-relaxed">
              Our deep understanding of African markets, combined with modern agricultural 
              technology and sustainable practices, positions us uniquely to unlock the 
              continent's vast agricultural potential.
            </p>
            
            <div className="bg-white p-6 rounded-xl shadow-lg border border-stone-200">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold font-display text-green-700 mb-1">12+</div>
                  <div className="text-sm text-stone-600">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold font-display text-green-700 mb-1">$50M+</div>
                  <div className="text-sm text-stone-600">Assets Under Management</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold font-display text-green-700 mb-1">5,000+</div>
                  <div className="text-sm text-stone-600">Hectares Managed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold font-display text-green-700 mb-1">15+</div>
                  <div className="text-sm text-stone-600">African Countries</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Values Grid */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  className="bg-white p-6 rounded-xl shadow-lg card-hover border border-stone-200"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-green-700" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-stone-800 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-stone-600 leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;