import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ExternalLink, Award, BookOpen } from 'lucide-react'
import { achievements } from '../../utils/data'

export default function Achievements() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })

  const certifications = achievements.filter(a => a.category === 'certification')
  const awards = achievements.filter(a => a.category === 'award')

  return (
    <section id="achievements" className="py-24 bg-gray-50/80 dark:bg-dark-800" ref={ref}>
      <div className="section-container">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block font-mono text-sm text-accent-500 dark:text-accent-400 tracking-widest uppercase mb-3">
            Recognition
          </span>
          <h2 className="section-title text-gray-900 dark:text-white">
            Achievements & <span className="gradient-text">Certifications</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-accent-500 to-blue-400 rounded-full mx-auto" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Certifications */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-accent-500 flex items-center justify-center">
                <BookOpen size={16} className="text-white" />
              </div>
              <h3 className="font-display text-xl font-bold text-gray-900 dark:text-white">
                Certifications
              </h3>
            </div>

            <div className="space-y-4">
              {certifications.map((cert, i) => (
                <motion.div
                  key={cert.title}
                  className="glass-card p-5 rounded-2xl flex items-start gap-4 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                >
                  <div className="text-3xl flex-shrink-0 group-hover:scale-110 transition-transform duration-200">
                    {cert.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm leading-tight mb-1">
                      {cert.title}
                    </h4>
                    <p className="text-xs text-accent-500 dark:text-accent-400 font-medium">{cert.issuer}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{cert.date}</p>
                  </div>
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 w-8 h-8 rounded-lg bg-gray-100 dark:bg-dark-700 flex items-center justify-center text-gray-400 hover:bg-accent-500 hover:text-white transition-all duration-200"
                  >
                    <ExternalLink size={13} />
                  </a>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Awards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-gold-500 flex items-center justify-center">
                <Award size={16} className="text-white" />
              </div>
              <h3 className="font-display text-xl font-bold text-gray-900 dark:text-white">
                Awards & Recognition
              </h3>
            </div>

            <div className="space-y-4">
              {awards.map((award, i) => (
                <motion.div
                  key={award.title}
                  className="glass-card p-5 rounded-2xl flex items-start gap-4 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group border-l-4 border-gold-500"
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                >
                  <div className="text-3xl flex-shrink-0 group-hover:scale-110 transition-transform duration-200">
                    {award.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm leading-tight mb-1">
                      {award.title}
                    </h4>
                    <p className="text-xs text-gold-500 font-medium">{award.issuer}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{award.date}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* GitHub stats card */}
            <motion.div
              className="mt-6 glass-card p-6 rounded-2xl overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <span>🐙</span> GitHub Activity
              </h4>
              <div className="space-y-3">
                <img
                  src="https://github-readme-stats.vercel.app/api?username=RohitShrestha533&show_icons=true&theme=transparent&hide_border=true&title_color=0ea5e9&text_color=94a3b8&icon_color=0ea5e9"
                  alt="GitHub Stats"
                  className="w-full rounded-xl"
                  loading="lazy"
                  onError={(e) => { e.target.style.display = 'none' }}
                />
                <img
                  src="https://github-readme-stats.vercel.app/api/top-langs/?username=RohitShrestha533&layout=compact&theme=transparent&hide_border=true&title_color=0ea5e9&text_color=94a3b8"
                  alt="Top Languages"
                  className="w-full rounded-xl"
                  loading="lazy"
                  onError={(e) => { e.target.style.display = 'none' }}
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
