import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Github, ExternalLink, Star } from 'lucide-react'
import projectsData from '../data/projects.json'

const filters = [
  { id: 'all', label: 'All Projects' },
  { id: 'fullstack', label: 'Full Stack' },
  { id: 'frontend', label: 'Frontend' },
  { id: 'mobile', label: 'Mobile Apps' },
  { id: 'ecommerce', label: 'E-commerce' },
  { id: 'robotics', label: 'Robotics & IoT' },
]

function ProjectCard({ project, index }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{ duration: 0.45, delay: index * 0.07 }}
      className="group glass-card rounded-2xl overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-3 group-hover:translate-y-0">
          <a href={project.github} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-2 bg-white/90 text-gray-900 rounded-lg text-sm font-medium hover:bg-white shadow-lg">
            <Github size={14} /> Code
          </a>
          <a href={project.live} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-2 bg-accent-500/90 text-white rounded-lg text-sm font-medium hover:bg-accent-500 shadow-lg">
            <ExternalLink size={14} /> Live
          </a>
        </div>
        {project.featured && (
          <div className="absolute top-3 left-3 flex items-center gap-1 px-2.5 py-1 bg-accent-500 text-white text-xs font-semibold rounded-full shadow-lg">
            <Star size={10} fill="currentColor" /> Featured
          </div>
        )}
        <div className="absolute top-3 right-3 px-2.5 py-1 bg-black/60 text-white text-xs rounded-full capitalize backdrop-blur-sm">
          {project.category}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="font-display text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-accent-500 transition-colors duration-200">
          {project.title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4 line-clamp-3">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tech.map(t => (
            <span key={t} className="px-2.5 py-1 text-xs font-medium bg-gray-100 dark:bg-dark-700 text-gray-600 dark:text-gray-400 rounded-lg">{t}</span>
          ))}
        </div>
        <div className="flex items-center gap-4 pt-3 border-t border-gray-100 dark:border-dark-700">
          <a href={project.github} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-accent-500 transition-colors font-medium">
            <Github size={14} /> GitHub
          </a>
          <a href={project.live} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-accent-500 transition-colors font-medium">
            <ExternalLink size={14} /> Live Demo
          </a>
        </div>
      </div>
    </motion.div>
  )
}

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true })

  const filtered = activeFilter === 'all'
    ? projectsData
    : projectsData.filter(p => p.category === activeFilter)

  return (
    <main>
      <div className="page-header">
        <div className="section-container text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-block font-mono text-sm text-accent-500 tracking-widest uppercase mb-3">My work</span>
            <h1 className="section-title text-gray-900 dark:text-white">
              Featured <span className="gradient-text">Projects</span>
            </h1>
            <div className="w-16 h-1 bg-gradient-to-r from-accent-500 to-blue-400 rounded-full mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
              A selection of my best work — built with care, focusing on performance, UX, and clean architecture.
            </p>
          </motion.div>
        </div>
      </div>

      <section className="py-16 bg-white dark:bg-dark-900" ref={ref}>
        <div className="section-container">
          {/* Filters */}
          <motion.div
            className="flex flex-wrap justify-center gap-2 mb-10"
            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}
          >
            {filters.map(f => (
              <button key={f.id} onClick={() => setActiveFilter(f.id)}
                className={`px-5 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                  activeFilter === f.id
                    ? 'bg-accent-500 text-white shadow-lg shadow-accent-500/30'
                    : 'bg-gray-100 dark:bg-dark-700 text-gray-600 dark:text-gray-400 hover:text-accent-500'
                }`}>
                {f.label}
              </button>
            ))}
          </motion.div>

          {/* Grid */}
          <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
              ))}
            </AnimatePresence>
          </motion.div>

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.4 }}
          >
            <a href="https://github.com/RohitShrestha533" target="_blank" rel="noopener noreferrer"
              className="btn-secondary">
              <Github size={18} /> View All on GitHub
            </a>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
