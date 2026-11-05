import { motion } from 'framer-motion'
import personal from '../data/personal.json'
import SEO from '../components/common/SEO'
import Contact from '../components/sections/Contact'

const contactSchema = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Contact Rohit Shrestha',
  description: 'Contact information and messaging form for Rohit Shrestha, Fullstack Developer.',
  mainEntity: {
    '@type': 'Person',
    name: 'Rohit Shrestha',
    email: personal.email,
    telephone: personal.phone,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Bharatpur',
      addressRegion: 'Chitwan',
      addressCountry: 'Nepal',
    },
  },
}

export default function ContactPage() {
  return (
    <main>
      <SEO
        title="Contact Rohit Shrestha | Hire Fullstack Developer"
        description="Get in touch with Rohit Shrestha for software engineering roles, fullstack web development, React consulting, and freelance inquiries."
        keywords="Contact Rohit Shrestha, Hire Fullstack Developer, Web Engineer Nepal, React Developer Chitwan"
        path="/contact"
        schema={contactSchema}
      />
      <div className="page-header relative overflow-hidden">
        <div className="section-container text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block font-mono text-xs sm:text-sm text-accent-500 tracking-[0.2em] uppercase mb-3 px-3.5 py-1 bg-accent-50 dark:bg-accent-500/10 rounded-full border border-accent-200 dark:border-accent-500/20 font-semibold">
              Open for Discussion
            </span>
            <h1 className="section-title text-gray-900 dark:text-white">
              Let's <span className="gradient-text">Connect</span>
            </h1>
            <div className="w-16 h-1 bg-gradient-to-r from-accent-500 to-blue-400 rounded-full mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
              Available for full-time engineering positions, remote opportunities, and technical collaborations.
            </p>
          </motion.div>
        </div>
      </div>

      <Contact />
    </main>
  )
}
