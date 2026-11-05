import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Github, ExternalLink, Star, ChevronRight, Layers } from 'lucide-react'
import { Link } from 'react-router-dom'
import projectsData from '../../data/projects.json'

const filters = [
  { id: 'all', label: 'All Projects' },
  { id: 'fullstack', label: 'Full Stack & SaaS' },
  { id: 'frontend', label: 'Frontend' },
  { id: 'mobile', label: 'Mobile Apps' },
  { id: 'ecommerce', label: 'E-commerce' },
  { id: 'robotics', label: 'Robotics' },
]

function ProjectCard({ project, index }) {
  const hasGithub = Boolean(project.github && project.github !== '#' && project.github.trim() !== '')
  const hasLive = Boolean(project.live && project.live !== '#' && project.live.trim() !== '')
  const hasLinks = hasGithub || hasLive

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.3) }}
      className="group glass-card rounded-2xl overflow-hidden hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between border border-gray-200/70 dark:border-white/5"
    >
      <div>
        {/* Card Image Banner */}
        <div className="relative aspect-video w-full overflow-hidden bg-dark-800">
          <img
            src={project.image}
            alt={`${project.title} - ${project.category} project by Rohit Shrestha`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />

          {/* Desktop Hover Overlay with Action Buttons */}
          {hasLinks && (
            <div className="hidden sm:flex absolute inset-0 bg-black/70 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 items-center justify-center gap-3">
              {hasGithub && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View GitHub repository for ${project.title}`}
                  className="flex items-center gap-1.5 px-3.5 py-2 bg-white text-gray-900 rounded-xl text-xs font-bold hover:bg-gray-100 shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-all duration-200"
                >
                  <Github size={14} /> Code
                </a>
              )}
              {hasLive && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View live demo of ${project.title}`}
                  className="flex items-center gap-1.5 px-3.5 py-2 bg-accent-500 text-white rounded-xl text-xs font-bold hover:bg-accent-600 shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-all duration-200"
                >
                  <ExternalLink size={14} /> Live Demo
                </a>
              )}
            </div>
          )}

          {/* Featured Pill */}
          {project.featured && (
            <div className="absolute top-3 left-3 flex items-center gap-1 px-2.5 py-1 bg-accent-500 text-white text-[11px] font-bold rounded-full shadow-md">
              <Star size={10} fill="currentColor" /> Featured
            </div>
          )}

          {/* Category Tag */}
          <div className="absolute top-3 right-3 px-2.5 py-1 bg-black/60 text-white text-[10px] font-semibold rounded-full capitalize backdrop-blur-md uppercase tracking-wide">
            {project.category}
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5 sm:p-6 pb-2">
          {/* Company & Duration meta */}
          <div className="flex flex-wrap items-center gap-2 mb-2">
            {project.company && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-[11px] font-semibold rounded-md bg-accent-50 dark:bg-accent-500/10 text-accent-700 dark:text-accent-300 border border-accent-200 dark:border-accent-500/20">
                🏢 {project.company}
              </span>
            )}
            {project.duration && (
              <span className="text-[11px] font-mono text-gray-500 dark:text-gray-400">
                {project.duration}
              </span>
            )}
          </div>

          <h3 className="font-display text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-accent-500 transition-colors duration-200 leading-snug">
            {project.title}
          </h3>

          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-4 line-clamp-3">
            {project.description}
          </p>

          {/* Highlights checklist if present */}
          {project.highlights && project.highlights.length > 0 && (
            <div className="mb-4 space-y-1">
              {project.highlights.slice(0, 2).map((hl, k) => (
                <div key={k} className="flex items-center gap-1.5 text-[11px] text-gray-500 dark:text-gray-400">
                  <span className="text-accent-500 font-bold">✓</span>
                  <span className="truncate">{hl}</span>
                </div>
              ))}
            </div>
          )}

          {/* Tech stack badges */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.tech.map((t) => (
              <span
                key={t}
                className="px-2 py-0.5 text-[11px] font-medium bg-gray-100 dark:bg-dark-700 text-gray-700 dark:text-gray-300 rounded-md"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Card Footer: Always accessible links on mobile & touch devices */}
      {hasLinks && (
        <div className="px-5 sm:px-6 py-3 border-t border-gray-100 dark:border-dark-700/80 flex items-center justify-between gap-3 bg-gray-50/50 dark:bg-dark-800/40">
          <div className="flex items-center gap-3">
            {hasGithub && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${project.title} on GitHub`}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-700 dark:text-gray-300 hover:text-accent-500 transition-colors"
              >
                <Github size={13} /> GitHub
              </a>
            )}
            {hasLive && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View live demo of ${project.title}`}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-accent-600 dark:text-accent-400 hover:text-accent-700 transition-colors"
              >
                <ExternalLink size={13} /> Live Demo
              </a>
            )}
          </div>
        </div>
      )}
    </motion.article>
  )
}

export default function Projects({ featured = false }) {
  const [activeFilter, setActiveFilter] = useState('all')
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true })

  let displayed = featured ? projectsData.filter((p) => p.featured) : projectsData
  if (!featured && activeFilter !== 'all') {
    displayed = projectsData.filter((p) => p.category === activeFilter)
  }

  return (
    <section id="projects" className="py-20 sm:py-24 bg-white dark:bg-dark-900" ref={ref}>
      <div className="section-container">
        {/* Header */}
        <motion.div
          className="text-center mb-10 sm:mb-14"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block font-mono text-xs sm:text-sm text-accent-500 tracking-widest uppercase mb-2 px-3.5 py-1 bg-accent-50 dark:bg-accent-500/10 rounded-full border border-accent-200 dark:border-accent-500/20 font-semibold">
            {featured ? 'Featured Work' : 'Portfolio Showcase'}
          </span>
          <h2 className="section-title text-gray-900 dark:text-white">
            {featured ? 'Featured' : 'All'} <span className="gradient-text">Projects</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-accent-500 to-blue-400 rounded-full mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
            Enterprise SaaS platforms, learning management systems, healthcare apps, and full-stack solutions built with clean code and modern architecture.
          </p>
        </motion.div>

        {/* Filter Chips (on non-featured view) */}
        {!featured && (
          <motion.div
            className="flex items-center justify-start sm:justify-center gap-2 mb-10 overflow-x-auto pb-2 scrollbar-none"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            {filters.map((f) => (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                  activeFilter === f.id
                    ? 'bg-accent-500 text-white shadow-md shadow-accent-500/25'
                    : 'bg-gray-100 dark:bg-dark-800 text-gray-600 dark:text-gray-400 hover:text-accent-500 hover:bg-gray-200 dark:hover:bg-dark-700'
                }`}
              >
                {f.label}
              </button>
            ))}
          </motion.div>
        )}

        {/* Projects Grid: 1 col on mobile, 2 on sm, 3 on lg */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {displayed.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-12 sm:mt-16 flex flex-wrap items-center justify-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {featured ? (
            <Link to="/projects" className="btn-secondary text-sm py-3 px-6">
              <span>View All {projectsData.length} Projects</span>
              <ChevronRight size={16} />
            </Link>
          ) : (
            <a
              href="https://github.com/rohitshrestha533"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary text-sm py-3 px-6"
            >
              <Github size={16} />
              <span>Explore More on GitHub</span>
            </a>
          )}
        </motion.div>
      </div>
    </section>
  )
}
