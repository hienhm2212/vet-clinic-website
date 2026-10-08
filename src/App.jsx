import { useEffect } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { LangProvider } from './context/LangContext'
import Navbar      from './components/Navbar/Navbar'
import Hero        from './components/Hero/Hero'
import Services    from './components/Services/Services'
import About       from './components/About/About'
import Testimonials from './components/Testimonials/Testimonials'
import Gallery     from './components/Gallery/Gallery'
import Contact     from './components/Contact/Contact'
import Footer      from './components/Footer/Footer'
import ZaloFloat   from './components/ZaloFloat/ZaloFloat'

export default function App() {
  useEffect(() => {
    // Refresh ScrollTrigger after fonts load to avoid miscalculated positions
    document.fonts.ready.then(() => ScrollTrigger.refresh())
  }, [])

  return (
    <LangProvider>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <About />
        <Testimonials />
        <Gallery />
        <Contact />
      </main>
      <Footer />
      <ZaloFloat />
    </LangProvider>
  )
}
