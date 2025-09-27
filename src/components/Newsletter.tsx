'use client'

import { useState } from 'react'
import { Mail, CheckCircle, ArrowRight } from 'lucide-react'

const Newsletter = () => {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setStatus('loading')

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus('success')
        setMessage('Successfully subscribed to our newsletter!')
        setEmail('')
      } else {
        setStatus('error')
        setMessage(data.error || 'Something went wrong. Please try again.')
      }
    } catch (error) {
      setStatus('error')
      setMessage('Network error. Please check your connection and try again.')
    }

    // Reset status after 5 seconds
    setTimeout(() => {
      setStatus('idle')
      setMessage('')
    }, 5000)
  }

  const benefits = [
    'Weekly Market Updates',
    'Exclusive Investment Deals',
    'Expert Industry Insights'
  ]

  return (
    <section id="newsletter" className="section-padding bg-gradient-to-r from-emerald-600 to-green-600">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-white">
              <div className="flex items-center space-x-2 mb-6">
                <Mail className="w-8 h-8" />
                <span className="text-xl font-display font-bold">Newsletter</span>
              </div>
              
              <h2 className="font-display text-3xl lg:text-4xl font-bold mb-6">
                Stay Ahead of
                <span className="block text-emerald-200">Agricultural Opportunities</span>
              </h2>
              
              <p className="text-emerald-100 text-lg mb-8 leading-relaxed">
                Get exclusive insights, investment opportunities, and market updates delivered straight to your inbox. Join over 2,000 investors who trust our agricultural expertise.
              </p>

              {/* Benefits */}
              <div className="space-y-3">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-emerald-200" />
                    <span className="text-emerald-100">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Content - Newsletter Form */}
            <div className="bg-white rounded-2xl p-8 shadow-2xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      required
                      disabled={status === 'loading'}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                    <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading' || !email}
                  className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  {status === 'loading' ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Subscribing...
                    </div>
                  ) : (
                    <>
                      <span>Subscribe to Newsletter</span>
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                    </>
                  )}
                </button>

                {/* Status Messages */}
                {message && (
                  <div className={`p-4 rounded-lg text-sm font-medium ${
                    status === 'success' 
                      ? 'bg-green-50 text-green-800 border border-green-200' 
                      : 'bg-red-50 text-red-800 border border-red-200'
                  }`}>
                    {message}
                  </div>
                )}

                <p className="text-xs text-gray-500 text-center">
                  By subscribing, you agree to receive marketing emails from Victoria Terragrove. You can unsubscribe at any time. We respect your privacy and never share your information.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Newsletter