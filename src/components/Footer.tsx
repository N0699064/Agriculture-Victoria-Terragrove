'use client'

import { Leaf, Mail, Phone, MapPin, Facebook, Twitter, Linkedin } from 'lucide-react'

const Footer = () => {
  const quickLinks = [
    { name: 'About Us', href: '#about' },
    { name: 'Investment Opportunities', href: '#investments' },
    { name: 'Contact', href: '#contact' },
    { name: 'Privacy Policy', href: '#' },
    { name: 'Terms of Service', href: '#' }
  ]

  const services = [
    { name: 'Agricultural Development', href: '#' },
    { name: 'Investment Management', href: '#' },
    { name: 'Partnership Development', href: '#' },
    { name: 'Technology Integration', href: '#' },
    { name: 'Sustainability Consulting', href: '#' }
  ]

  const socialLinks = [
    { icon: Facebook, href: '#', name: 'Facebook' },
    { icon: Twitter, href: '#', name: 'Twitter' },
    { icon: Linkedin, href: '#', name: 'LinkedIn' }
  ]

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-8 h-8 bg-gradient-to-r from-emerald-600 to-green-600 rounded-lg flex items-center justify-center">
                  <Leaf className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-display font-bold">Victoria Terragrove</span>
              </div>
              
              <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
                Leading agricultural investment opportunities in Africa. Transform landscapes, grow wealth, and build sustainable futures.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-emerald-400" />
                  <span className="text-gray-300">info@victoriaterragrove.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-emerald-400" />
                  <span className="text-gray-300">+234 901 234 5678</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-emerald-400" />
                  <div className="text-gray-300">
                    <div>Plot 123, Victoria Island</div>
                    <div>Lagos, Nigeria</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-display text-lg font-semibold mb-6">Quick Links</h3>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.href}
                      className="text-gray-300 hover:text-emerald-400 transition-colors duration-200"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="font-display text-lg font-semibold mb-6">Our Services</h3>
              <ul className="space-y-3">
                {services.map((service, index) => (
                  <li key={index}>
                    <a 
                      href={service.href}
                      className="text-gray-300 hover:text-emerald-400 transition-colors duration-200"
                    >
                      {service.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Newsletter CTA */}
        <div className="border-t border-gray-800 py-8">
          <div className="bg-gradient-to-r from-emerald-900/50 to-green-900/50 rounded-2xl p-8">
            <div className="max-w-2xl mx-auto text-center">
              <h3 className="font-display text-2xl font-bold mb-4">Stay Connected</h3>
              <p className="text-gray-300 mb-6">
                Follow us for the latest updates on agricultural investment opportunities.
              </p>
              
              {/* Social Links */}
              <div className="flex justify-center space-x-6">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon
                  return (
                    <a
                      key={index}
                      href={social.href}
                      aria-label={social.name}
                      className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors duration-200 group"
                    >
                      <Icon className="w-5 h-5 text-gray-300 group-hover:text-white" />
                    </a>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © 2024 Victoria Terragrove. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors duration-200">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors duration-200">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors duration-200">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer