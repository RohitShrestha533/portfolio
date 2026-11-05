import { motion } from 'framer-motion'
import Projects from '../components/sections/Projects'
import projectsData from '../data/projects.json'
import personal from '../data/personal.json'
import SEO from '../components/common/SEO'
import { Download, FileText } from 'lucide-react'

const projectsSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Projects Portfolio - Rohit Shrestha',
  description: 'Showcase of full stack, frontend, SaaS, and mobile applications developed by Rohit Shrestha.',
  mainEntity: {
    '@type': 'ItemList',
    itemListElement: projectsData.map((p, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'SoftwareSourceCode',
        name: p.title,
        description: p.description,
        programmingLanguage: p.tech.join(', '),
        codeRepository: p.github && p.github !== '#' ? p.github : undefined,
        url: p.live && p.live !== '#' ? p.live : undefined,
      },
    })),
  },
}

export default function ProjectsPage() {
  return (
    <main>
      <SEO
        title="Projects & Case Studies | Rohit Shrestha - Fullstack Developer"
        description="Explore production SaaS applications, Learning Management Systems, healthcare platforms, and mobile apps built by Rohit Shrestha with React, TypeScript, and Node.js."
        keywords="Rohit Shrestha Projects, Fullstack Portfolio, LMS React, Restaurant Management System SaaS, Smart Hospital App, React Native"
        path="/projects"
        schema={projectsSchema}
      />

      <div className="page-header relative overflow-hidden">
        <div className="section-container text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block font-mono text-xs sm:text-sm text-accent-500 tracking-[0.2em] uppercase mb-3 px-3.5 py-1 bg-accent-50 dark:bg-accent-500/10 rounded-full border border-accent-200 dark:border-accent-500/20 font-semibold">
              Engineered for Production
            </span>
            <h1 className="section-title text-gray-900 dark:text-white">
              Featured <span className="gradient-text">Projects</span>
            </h1>
            <div className="w-16 h-1 bg-gradient-to-r from-accent-500 to-blue-400 rounded-full mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
              Explore web and mobile applications designed and deployed with a focus on clean architecture, performance, usability, and maintainability.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <a
                href={personal.resume}
                download="Rohit_Shrestha_Fullstack_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary py-2.5 px-5 text-xs sm:text-sm shadow-md shadow-accent-500/25"
              >
                <Download size={15} /> Download Resume
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      <Projects featured={false} />
    </main>
  )
}
