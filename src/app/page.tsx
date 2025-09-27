import Header from '@/components/Header'
import Hero from '@/components/Hero'
import About from '@/components/About'
import NewsPreview from '@/components/NewsPreview'
import Newsletter from '@/components/Newsletter'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <About />
      <NewsPreview />
      <Newsletter />
      <Footer />
    </main>
  )
}