import { Metadata } from 'next'
import Header from '@/components/Header'
import ContactPage from '@/components/ContactPage'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Contact Us - Victoria Terragrove',
  description: 'Get in touch with Victoria Terragrove for agricultural investment opportunities, partnerships, and inquiries. We are here to help you grow your agricultural investments.',
}

export default function Contact() {
  return (
    <main>
      <Header />
      <ContactPage />
      <Footer />
    </main>
  )
}