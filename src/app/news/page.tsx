import { Metadata } from 'next'
import Header from '@/components/Header'
import NewsPage from '@/components/NewsPage'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Agriculture News - Victoria Terragrove',
  description: 'Latest Nigerian agriculture news, trends, and insights. Stay informed with comprehensive coverage of farming, livestock, and agricultural policy updates.',
}

export default function News() {
  return (
    <main>
      <Header />
      <NewsPage />
      <Footer />
    </main>
  )
}