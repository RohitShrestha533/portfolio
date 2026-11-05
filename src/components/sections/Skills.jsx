import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import skillsData from '../../data/skills.json'

function SkillBar({ name, level, icon, index, inView }) {
  return (
    <motion.div
      className="group p-3 sm:p-4 rounded-xl bg-white dark:bg-dark-800/80 border border-gray-100 dark:border-dark-700 shadow-sm hover:shadow-md transition-all duration-200"
      initial={{ opacity: 0, x: -16 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.45, delay: index * 0.05 }}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2.5">
          <span className="text-lg flex-shrink-0">{icon}</span>
          <span className="text-xs sm:text-sm font-semibold text-gray-800 dark:text-gray-200">
            {name}
          </span>
        </div>
        <span className="text-xs font-mono font-bold text-accent-500 dark:text-accent-400">
          {level}%
        </span>
      </div>
      <div className="h-2 bg-gray-100 dark:bg-dark-700 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-accent-500 via-blue-500 to-indigo-500 rounded-full"
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1, delay: 0.2 + index * 0.05, ease: 'easeOut' }}
        />
      </div>
    </motion.div>
  )
}

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState('frontend')
  const [ref, inView] = useInView({ threshold: 0.08, triggerOnce: true })

  return (
    <section id="skills" className="py-20 sm:py-24 bg-gray-50/70 dark:bg-dark-800/80" ref={ref}>
      <div className="section-container">
        {/* Header */}
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block font-mono text-xs sm:text-sm text-accent-500 dark:text-accent-400 tracking-widest uppercase mb-2 px-3.5 py-1 bg-accent-50 dark:bg-accent-500/10 rounded-full border border-accent-200 dark:border-accent-500/20 font-semibold">
            Technical Stack
          </span>
          <h2 className="section-title text-gray-900 dark:text-white">
            Core <span className="gradient-text">Skills</span> &amp; Technologies
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-accent-500 to-blue-400 rounded-full mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
            Specialized in building end-to-end fullstack platforms, responsive frontend architectures with TanStack &amp; React, and reliable Node.js backends.
          </p>
        </motion.div>

        {/* Category Filter Pills (Horizontal scroll on narrow mobile) */}
        <motion.div
          className="flex items-center justify-start sm:justify-center gap-2 mb-10 overflow-x-auto pb-2 scrollbar-none"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          {skillsData.categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                activeCategory === cat.id
                  ? 'bg-accent-500 text-white shadow-md shadow-accent-500/25'
                  : 'bg-white dark:bg-dark-700 text-gray-600 dark:text-gray-300 hover:text-accent-500 border border-gray-200 dark:border-dark-600'
              }`}
            >
              <span>{cat.emoji}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </motion.div>

        {/* Skills Grid: 1 col on mobile, 2 cols on md+ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-16 max-w-5xl mx-auto">
          {(skillsData[activeCategory] || []).map((skill, i) => (
            <SkillBar
              key={`${activeCategory}-${skill.name}`}
              {...skill}
              index={i}
              inView={inView}
            />
          ))}
        </div>

        {/* All Technologies Cloud */}
        <motion.div
          className="text-center pt-8 border-t border-gray-200 dark:border-dark-700/80"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h3 className="font-display text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-4">
            Complete Ecosystem &amp; Developer Tools
          </h3>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-2.5 max-w-4xl mx-auto">
            {skillsData.all.map((tech, i) => (
              <motion.span
                key={tech}
                className="skill-tag text-xs sm:text-sm"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.3, delay: 0.3 + i * 0.02 }}
                whileHover={{ scale: 1.05, y: -2 }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
