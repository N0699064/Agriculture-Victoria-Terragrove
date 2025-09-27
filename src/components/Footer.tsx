"use client";

import { motion } from "framer-motion";
import { Leaf, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  const quickLinks = [
    { name: "About Us", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Investment Opportunities", href: "#investment" },
    { name: "Contact", href: "#contact" }
  ];

  const services = [
    { name: "Agricultural Development", href: "#" },
    { name: "Investment Management", href: "#" },
    { name: "Partnership Development", href: "#" },
    { name: "Technology Integration", href: "#" }
  ];

  const socialLinks = [
    { name: "Facebook", icon: Facebook, href: "#" },
    { name: "Twitter", icon: Twitter, href: "#" },
    { name: "Instagram", icon: Instagram, href: "#" },
    { name: "LinkedIn", icon: Linkedin, href: "#" }
  ];

  return (
    <footer id="contact" className="bg-stone-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      <div className="container relative z-10">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Company Info */}
            <motion.div
              className="lg:col-span-1"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {/* Logo */}
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-green-700 p-2 rounded-lg">
                  <Leaf className="h-6 w-6 text-white" />
                </div>
                <div className="font-display font-bold text-xl text-white">
                  Victoria Terragrove
                </div>
              </div>
              
              <p className="text-stone-300 mb-6 leading-relaxed">
                Leading agricultural investment opportunities in Africa. 
                Transform landscapes, grow wealth, and build sustainable futures.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 text-green-400 flex-shrink-0" />
                  <span className="text-stone-300">info@victoriaterragrove.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-4 w-4 text-green-400 flex-shrink-0" />
                  <span className="text-stone-300">+234 901 234 5678</span>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-stone-300">
                    Plot 123, Victoria Island<br />
                    Lagos, Nigeria
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h3 className="font-display text-lg font-semibold text-white mb-6">
                Quick Links
              </h3>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <motion.a
                      href={link.href}
                      className="text-stone-300 hover:text-green-400 transition-colors duration-200 relative group"
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      {link.name}
                      <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-green-400 transition-all duration-300 group-hover:w-full"></span>
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Services */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="font-display text-lg font-semibold text-white mb-6">
                Our Services
              </h3>
              <ul className="space-y-3">
                {services.map((service) => (
                  <li key={service.name}>
                    <motion.a
                      href={service.href}
                      className="text-stone-300 hover:text-green-400 transition-colors duration-200 relative group"
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      {service.name}
                      <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-green-400 transition-all duration-300 group-hover:w-full"></span>
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Newsletter & Social */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h3 className="font-display text-lg font-semibold text-white mb-6">
                Stay Connected
              </h3>
              <p className="text-stone-300 mb-6 leading-relaxed">
                Follow us for the latest updates on agricultural investment opportunities.
              </p>
              
              {/* Social Links */}
              <div className="flex space-x-4 mb-8">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      className="w-10 h-10 bg-stone-800 rounded-lg flex items-center justify-center hover:bg-green-700 transition-colors duration-200 group"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Icon className="h-5 w-5 text-stone-400 group-hover:text-white transition-colors duration-200" />
                    </motion.a>
                  );
                })}
              </div>

              {/* Newsletter CTA */}
              <div className="bg-stone-800 p-6 rounded-lg">
                <h4 className="font-semibold text-white mb-2">Newsletter</h4>
                <p className="text-stone-400 text-sm mb-4">
                  Get weekly insights and exclusive opportunities.
                </p>
                <motion.button
                  className="w-full bg-green-700 hover:bg-green-600 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Subscribe Now
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Footer */}
        <motion.div
          className="border-t border-stone-800 py-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-stone-400 text-sm">
              © 2024 Victoria Terragrove. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-stone-400 hover:text-green-400 transition-colors duration-200">
                Privacy Policy
              </a>
              <a href="#" className="text-stone-400 hover:text-green-400 transition-colors duration-200">
                Terms of Service
              </a>
              <a href="#" className="text-stone-400 hover:text-green-400 transition-colors duration-200">
                Cookie Policy
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;