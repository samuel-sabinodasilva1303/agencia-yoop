/*
 * Home Page - Yoop Landing Page
 * Main page component that assembles all sections
 */

import Topbar from '@/components/Topbar'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Services from '@/components/Services'
import Portfolio from '@/components/Portfolio'
import Briefing from '@/components/Briefing'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import FloatingSocial from '@/components/FloatingSocial'
import ScrollToTop from '@/components/ScrollToTop'

export default function Home() {
  return (
    <main>
      <Topbar />
      <Header />
      <FloatingSocial />
      <ScrollToTop />
      <Hero />
      <About />
      <Services />
      <Portfolio />
      <Briefing />
      <Contact />
      <Footer />
    </main>
  )
}
