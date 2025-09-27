'use client'

import { Award, Globe, Users, Zap } from 'lucide-react'

const About = () => {
  const values = [
    {
      icon: Award,
      title: 'Excellence',
      description: 'We maintain the highest standards in agricultural investment and sustainable farming practices.'
    },
    {
      icon: Globe,
      title: 'Sustainability',
      description: 'Environmental responsibility guides every investment decision we make.'
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Creating positive impact for local communities and rural development.'
    },
    {
      icon: Zap,
      title: 'Innovation',
      description: 'Leveraging modern technology to maximize agricultural productivity.'
    }
  ]

  const stats = [
    { number: '12+', label: 'Years Experience' },
    { number: '$50M+', label: 'Assets Under Management' },
    { number: '5,000+', label: 'Hectares Managed' },
    { number: '15+', label: 'African Countries' }
  ]

  return (
    <section id="about" className="section-padding bg-white">
      <div className="container">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="text-emerald-600 font-semibold text-sm uppercase tracking-wider mb-4">
            About Victoria Terragrove
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Cultivating Africa's
            <span className="gradient-text block">Agricultural Future</span>
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            For over a decade, Victoria Terragrove has been at the forefront of agricultural transformation in Africa. We specialize in identifying, developing, and managing premium agricultural investments that deliver sustainable returns while creating positive environmental and social impact.
          </p>
        </div>

        {/* Mission Statement */}
        <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-3xl p-8 lg:p-12 mb-16">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-xl text-gray-700 leading-relaxed font-medium">
              "Our deep understanding of African markets, combined with modern agricultural technology and sustainable practices, positions us uniquely to unlock the continent's vast agricultural potential."
            </p>
            <div className="mt-6">
              <div className="text-emerald-600 font-semibold">Leadership Team</div>
              <div className="text-gray-600">Victoria Terragrove</div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl lg:text-4xl font-bold font-display text-gray-900 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Values */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => {
            const Icon = value.icon
            return (
              <div key={index} className="card p-8 text-center group hover:bg-emerald-50 transition-colors duration-300">
                <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-emerald-200 transition-colors duration-300">
                  <Icon className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="font-display text-xl font-semibold text-gray-900 mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default About