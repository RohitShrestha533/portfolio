import Hero from '../components/sections/Hero'
import Skills from '../components/sections/Skills'
import Projects from '../components/sections/Projects'
import Testimonials from '../components/sections/Testimonials'
import Services from '../components/sections/Services'

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Skills />
      <Projects featured />
      <Services />
      <Testimonials />
    </main>
  )
}
