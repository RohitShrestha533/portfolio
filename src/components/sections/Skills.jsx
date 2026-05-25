import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import skillsData from '../../data/skills.json'

function SkillBar({ name, level, icon, index, inView }) {
  return (
    <motion.div className="group"
      initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-lg">{icon}</span>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{name}</span>
        </div>
        <span className="text-xs font-mono text-accent-500 dark:text-accent-400 font-semibold">{level}%</span>
      </div>
      <div className="h-2 bg-gray-100 dark:bg-dark-700 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-accent-500 to-blue-400 rounded-full"
          initial={{ width: 0 }} animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1.2, delay: 0.3 + index * 0.08, ease: 'easeOut' }}
        />
      </div>
    </motion.div>
  )
}

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState('frontend')
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section id="skills" className="py-24 bg-gray-50/80 dark:bg-dark-800" ref={ref}>
      <div className="section-container">
        <motion.div className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <span className="inline-block font-mono text-sm text-accent-500 tracking-widest uppercase mb-3">What I work with</span>
          <h2 className="section-title text-gray-900 dark:text-white">Tech <span className="gradient-text">Stack</span></h2>
          <div className="w-16 h-1 bg-gradient-to-r from-accent-500 to-blue-400 rounded-full mx-auto mb-6" />
          <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
            A carefully curated toolkit built over years of hands-on development.
          </p>
        </motion.div>

        <motion.div className="flex flex-wrap justify-center gap-2 mb-12"
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }}>
          {skillsData.categories.map(cat => (
            <button key={cat.id} onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                activeCategory === cat.id
                  ? 'bg-accent-500 text-white shadow-lg shadow-accent-500/30'
                  : 'bg-white dark:bg-dark-700 text-gray-600 dark:text-gray-400 hover:text-accent-500 border border-gray-200 dark:border-dark-600'
              }`}>
              <span>{cat.emoji}</span>{cat.label}
            </button>
          ))}
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {(skillsData[activeCategory] || []).map((skill, i) => (
            <SkillBar key={`${activeCategory}-${skill.name}`} {...skill} index={i} inView={inView} />
          ))}
        </div>

        <motion.div className="text-center"
          initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.4 }}>
          <h3 className="font-display text-xl font-bold text-gray-900 dark:text-white mb-6">All Technologies I work with</h3>
          <div className="flex flex-wrap justify-center gap-2 max-w-3xl mx-auto">
            {skillsData.all.map((tech, i) => (
              <motion.span key={tech} className="skill-tag"
                initial={{ opacity: 0, scale: 0.8 }} animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.5 + i * 0.03 }}
                whileHover={{ scale: 1.05, y: -2 }}>
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
