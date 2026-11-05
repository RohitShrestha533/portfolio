import { motion } from 'framer-motion'
import { MapPin, Calendar, GraduationCap, Briefcase, Heart, Code2, Download } from 'lucide-react'
import { useInView } from 'react-intersection-observer'
import personal from '../data/personal.json'
import education from '../data/education.json'
import SEO from '../components/common/SEO'
import About from '../components/sections/About'

const aboutSchema = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: 'About Rohit Shrestha',
  description: 'Background, education, experience, and skills of Rohit Shrestha – Fullstack Developer.',
  mainEntity: {
    '@type': 'Person',
    name: 'Rohit Shrestha',
    jobTitle: 'Fullstack Developer',
    alumniOf: 'Boston International College (Pokhara University)',
    description: personal.bioLong,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Bharatpur',
      addressRegion: 'Chitwan',
      addressCountry: 'Nepal',
    },
  },
}

export default function AboutPage() {
  return (
    <main>
      <SEO
        title="About Rohit Shrestha | Fullstack Developer & Dean's List Graduate"
        description="Learn more about Rohit Shrestha – Dean's List graduate (3.76 CGPA), Fullstack Developer specializing in React, Node.js, TypeScript, TanStack, and modern web architectures."
        keywords="About Rohit Shrestha, Fullstack Developer Nepal, BCIS Boston International College, Frontend Engineer, React Specialist"
        path="/about"
        schema={aboutSchema}
      />

      <About />
    </main>
  )
}
