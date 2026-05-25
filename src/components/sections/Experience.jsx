import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Briefcase, MapPin, Calendar } from 'lucide-react'
import { experience } from '../../utils/data'

export default function Experience() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section id="experience" className="py-24 bg-gray-50/80 dark:bg-dark-800" ref={ref}>
      <div className="section-container">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block font-mono text-sm text-accent-500 dark:text-accent-400 tracking-widest uppercase mb-3">
            My journey
          </span>
          <h2 className="section-title text-gray-900 dark:text-white">
            Work <span className="gradient-text">Experience</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-accent-500 to-blue-400 rounded-full mx-auto" />
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical line */}
          <motion.div
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-accent-500 via-accent-500/50 to-transparent"
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            style={{ transformOrigin: 'top' }}
          />

          {experience.map((exp, i) => {
            const isRight = i % 2 === 0
            return (
              <motion.div
                key={exp.id}
                className={`relative flex items-start gap-8 mb-16 last:mb-0 ${
                  isRight ? 'md:flex-row' : 'md:flex-row-reverse'
                } flex-row pl-12 md:pl-0`}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.2 }}
              >
                {/* Content */}
                <div className={`flex-1 md:max-w-[calc(50%-3rem)] ${isRight ? '' : 'md:text-right'}`}>
                  <motion.div
                    className="glass-card p-6 rounded-2xl hover:shadow-xl transition-all duration-300 group"
                    whileHover={{ y: -4 }}
                  >
                    {/* Header */}
                    <div className={`flex items-start gap-3 mb-4 ${isRight ? '' : 'md:flex-row-reverse'}`}>
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${exp.color} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                        <Briefcase size={18} className="text-white" />
                      </div>
                      <div className={isRight ? '' : 'md:text-right'}>
                        <span className={`inline-flex items-center px-2.5 py-0.5 text-xs font-semibold rounded-full mb-1 bg-gradient-to-r ${exp.color} text-white`}>
                          {exp.type}
                        </span>
                        <h3 className="font-display font-bold text-lg text-gray-900 dark:text-white leading-tight">
                          {exp.role}
                        </h3>
                        <p className="text-accent-500 dark:text-accent-400 font-semibold text-sm">
                          {exp.company}
                        </p>
                      </div>
                    </div>

                    {/* Meta */}
                    <div className={`flex flex-wrap gap-3 text-xs text-gray-500 dark:text-gray-500 mb-4 ${isRight ? '' : 'md:justify-end'}`}>
                      <span className="flex items-center gap-1">
                        <Calendar size={11} /> {exp.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin size={11} /> {exp.location}
                      </span>
                    </div>

                    {/* Responsibilities */}
                    <ul className={`space-y-2 mb-4 ${isRight ? '' : 'md:text-right'}`}>
                      {exp.description.map((item, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <span className={`w-1.5 h-1.5 rounded-full bg-accent-500 mt-2 flex-shrink-0 ${isRight ? '' : 'md:order-last'}`} />
                          {item}
                        </li>
                      ))}
                    </ul>

                    {/* Tech */}
                    <div className={`flex flex-wrap gap-1.5 ${isRight ? '' : 'md:justify-end'}`}>
                      {exp.tech.map((t) => (
                        <span key={t} className="px-2.5 py-1 text-xs font-medium bg-accent-50 dark:bg-accent-500/10 text-accent-600 dark:text-accent-400 rounded-lg">
                          {t}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </div>

                {/* Center dot */}
                <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-6 timeline-dot" />

                {/* Spacer for opposite side on desktop */}
                <div className="hidden md:block flex-1" />
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
