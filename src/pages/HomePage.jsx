import Hero from '../components/sections/Hero'
import Skills from '../components/sections/Skills'
import Experience from '../components/sections/Experience'
import Projects from '../components/sections/Projects'
import Services from '../components/sections/Services'
import Testimonials from '../components/sections/Testimonials'
import SEO from '../components/common/SEO'

export default function HomePage() {
  return (
    <main>
      <SEO
        title="Rohit Shrestha | Fullstack Developer & Modern Web Specialist"
        description="Portfolio of Rohit Shrestha – Fullstack Developer and Dean's List Graduate from Nepal specializing in React, TypeScript, TanStack, Node.js, and scalable web applications."
        path="/"
      />
      <Hero />
      <Skills />
      <Experience showHeader={true} limit={3} />
      <Projects featured={true} />
      <Services />
      <Testimonials />
    </main>
  )
}
