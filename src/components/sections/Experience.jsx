import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Briefcase, MapPin, Calendar, CheckCircle2, ChevronRight, FileText } from 'lucide-react'
import { Link } from 'react-router-dom'
import experienceData from '../../data/experience.json'
import personal from '../../data/personal.json'

export default function Experience({ showHeader = true, limit = null }) {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })
  const items = limit ? experienceData.slice(0, limit) : experienceData

  return (
    <section id="experience" className="py-20 sm:py-24 bg-gray-50/70 dark:bg-dark-800/80" ref={ref}>
      <div className="section-container">
        {/* Section Header */}
        {showHeader && (
          <motion.div
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block font-mono text-xs sm:text-sm text-accent-500 dark:text-accent-400 tracking-widest uppercase mb-2 px-3.5 py-1 bg-accent-50 dark:bg-accent-500/10 rounded-full border border-accent-200 dark:border-accent-500/20">
              Career Journey
            </span>
            <h2 className="section-title text-gray-900 dark:text-white">
              Work <span className="gradient-text">Experience</span>
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-accent-500 to-blue-400 rounded-full mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto text-sm sm:text-base">
              Hands-on software development experience building scalable web apps, SaaS platforms, and mentoring.
            </p>
          </motion.div>
        )}

        {/* Timeline Container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Timeline Center/Side Line */}
          <motion.div
            className="absolute left-4 md:left-1/2 top-2 bottom-2 w-0.5 bg-gradient-to-b from-accent-500 via-blue-500 to-transparent -translate-x-1/2"
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            style={{ transformOrigin: 'top' }}
          />

          <div className="space-y-8 sm:space-y-12">
            {items.map((exp, i) => {
              const isEven = i % 2 === 0
              return (
                <motion.div
                  key={exp.id}
                  className={`relative flex flex-col md:flex-row items-start ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                  initial={{ opacity: 0, y: 32 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                >
                  {/* Timeline Node Dot */}
                  <div className="absolute left-4 md:left-1/2 top-6 -translate-x-1/2 z-10">
                    <div
                      className={`w-4 h-4 rounded-full bg-gradient-to-br ${exp.color} ring-4 ring-white dark:ring-dark-800 shadow-md`}
                    />
                  </div>

                  {/* Card Content: offset on mobile, half-width on md+ */}
                  <div
                    className={`w-full pl-10 sm:pl-12 md:pl-0 md:w-[calc(50%-2rem)] ${
                      isEven ? 'md:mr-auto' : 'md:ml-auto'
                    }`}
                  >
                    <motion.div
                      className="glass-card p-5 sm:p-6 rounded-2xl hover:shadow-xl transition-all duration-300 group border border-gray-200/60 dark:border-white/5"
                      whileHover={{ y: -3 }}
                    >
                      {/* Header */}
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-10 h-10 rounded-xl bg-gradient-to-br ${exp.color} flex items-center justify-center text-white shadow-md flex-shrink-0`}
                          >
                            <Briefcase size={18} />
                          </div>
                          <div>
                            <span
                              className={`inline-block px-2.5 py-0.5 text-[10px] font-bold rounded-full bg-gradient-to-r ${exp.color} text-white uppercase tracking-wider mb-1`}
                            >
                              {exp.type}
                            </span>
                            <h3 className="font-display font-bold text-base sm:text-lg text-gray-900 dark:text-white leading-tight">
                              {exp.role}
                            </h3>
                            <p className="text-accent-500 dark:text-accent-400 font-semibold text-sm">
                              {exp.company}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Meta information */}
                      <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 dark:text-gray-400 mb-4 pb-3 border-b border-gray-100 dark:border-dark-700">
                        <span className="flex items-center gap-1.5 font-medium">
                          <Calendar size={13} className="text-accent-500" />
                          {exp.duration}
                        </span>
                        <span className="flex items-center gap-1.5 font-medium">
                          <MapPin size={13} className="text-accent-500" />
                          {exp.location}
                        </span>
                      </div>

                      {/* Responsibilities list */}
                      <ul className="space-y-2 mb-5">
                        {exp.description.map((item, j) => (
                          <li
                            key={j}
                            className="flex items-start gap-2 text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed text-left"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-accent-500 mt-2 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Tech Chips */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {exp.tech.map((t) => (
                          <span
                            key={t}
                            className="px-2.5 py-1 text-[11px] font-medium bg-accent-50 dark:bg-accent-500/10 text-accent-700 dark:text-accent-300 rounded-lg border border-accent-100 dark:border-accent-500/20"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Bottom Actions */}
          <div className="text-center mt-12 sm:mt-16 flex flex-wrap items-center justify-center gap-3">
            <Link to="/experience" className="btn-secondary text-sm py-2.5 px-5">
              <span>View Full Work Timeline &amp; Certifications</span>
              <ChevronRight size={16} />
            </Link>
            <a
              href={personal.resume}
              download="Rohit_Shrestha_Fullstack_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-sm py-2.5 px-5"
            >
              <FileText size={16} />
              <span>Download Resume (PDF)</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
