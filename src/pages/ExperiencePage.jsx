import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Briefcase, MapPin, Calendar } from 'lucide-react'
import experienceData from '../data/experience.json'
import achievementsData from '../data/achievements.json'
import { ExternalLink, Award, BookOpen } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.55, delay: i * 0.12 } })
}

export default function ExperiencePage() {
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true })
  const certifications = achievementsData.filter(a => a.category === 'certification')
  const awards = achievementsData.filter(a => a.category === 'award')

  return (
    <main>
      <div className="page-header">
        <div className="section-container text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-block font-mono text-sm text-accent-500 tracking-widest uppercase mb-3">My journey</span>
            <h1 className="section-title text-gray-900 dark:text-white">
              Experience & <span className="gradient-text">Achievements</span>
            </h1>
            <div className="w-16 h-1 bg-gradient-to-r from-accent-500 to-blue-400 rounded-full mx-auto" />
          </motion.div>
        </div>
      </div>

      {/* Timeline */}
      <section className="py-16 bg-white dark:bg-dark-900" ref={ref}>
        <div className="section-container">
          <h2 className="font-display text-2xl font-bold text-gray-900 dark:text-white mb-12 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-accent-500 flex items-center justify-center">
              <Briefcase size={16} className="text-white" />
            </div>
            Work Experience
          </h2>

          <div className="relative max-w-4xl mx-auto mb-20">
            {/* Vertical line */}
            <motion.div
              className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-accent-500 via-accent-500/50 to-transparent"
              initial={{ scaleY: 0 }} animate={inView ? { scaleY: 1 } : {}}
              transition={{ duration: 1.4, ease: 'easeOut' }}
              style={{ transformOrigin: 'top' }}
            />

            {experienceData.map((exp, i) => {
              const isRight = i % 2 === 0
              return (
                <motion.div
                  key={exp.id}
                  className={`relative flex items-start gap-8 mb-16 last:mb-0 flex-row pl-12 md:pl-0 ${isRight ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                  variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={i}
                >
                  <div className={`flex-1 md:max-w-[calc(50%-3rem)] ${isRight ? '' : 'md:text-right'}`}>
                    <motion.div
                      className="glass-card p-6 rounded-2xl hover:shadow-xl transition-all duration-300"
                      whileHover={{ y: -4 }}
                    >
                      <div className={`flex items-start gap-3 mb-4 ${isRight ? '' : 'md:flex-row-reverse'}`}>
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${exp.color} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                          <Briefcase size={17} className="text-white" />
                        </div>
                        <div className={isRight ? '' : 'md:text-right'}>
                          <span className={`inline-flex items-center px-2.5 py-0.5 text-xs font-semibold rounded-full mb-1 bg-gradient-to-r ${exp.color} text-white`}>
                            {exp.type}
                          </span>
                          <h3 className="font-display font-bold text-lg text-gray-900 dark:text-white leading-tight">{exp.role}</h3>
                          <p className="text-accent-500 dark:text-accent-400 font-semibold text-sm">{exp.company}</p>
                        </div>
                      </div>
                      <div className={`flex flex-wrap gap-3 text-xs text-gray-500 mb-4 ${isRight ? '' : 'md:justify-end'}`}>
                        <span className="flex items-center gap-1"><Calendar size={11} /> {exp.duration}</span>
                        <span className="flex items-center gap-1"><MapPin size={11} /> {exp.location}</span>
                      </div>
                      <ul className={`space-y-2 mb-4 ${isRight ? '' : 'md:text-right'}`}>
                        {exp.description.map((item, j) => (
                          <li key={j} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                            <span className={`w-1.5 h-1.5 rounded-full bg-accent-500 mt-2 flex-shrink-0 ${isRight ? '' : 'md:order-last'}`} />
                            {item}
                          </li>
                        ))}
                      </ul>
                      <div className={`flex flex-wrap gap-1.5 ${isRight ? '' : 'md:justify-end'}`}>
                        {exp.tech.map(t => (
                          <span key={t} className="px-2.5 py-1 text-xs font-medium bg-accent-50 dark:bg-accent-500/10 text-accent-600 dark:text-accent-400 rounded-lg">{t}</span>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                  <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-6 timeline-dot" />
                  <div className="hidden md:block flex-1" />
                </motion.div>
              )
            })}
          </div>

          {/* Achievements */}
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Certifications */}
            <div>
              <h2 className="font-display text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-accent-500 flex items-center justify-center">
                  <BookOpen size={16} className="text-white" />
                </div>
                Certifications
              </h2>
              <div className="space-y-4">
                {certifications.map((cert, i) => (
                  <motion.div
                    key={cert.title}
                    className="glass-card p-5 rounded-2xl flex items-start gap-4 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
                    variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={i * 0.15}
                  >
                    <div className="text-3xl flex-shrink-0 group-hover:scale-110 transition-transform">{cert.icon}</div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900 dark:text-white text-sm leading-tight mb-1">{cert.title}</h4>
                      <p className="text-xs text-accent-500 font-medium">{cert.issuer}</p>
                      <p className="text-xs text-gray-500 mt-1">{cert.date}</p>
                    </div>
                    <a href={cert.link} target="_blank" rel="noopener noreferrer"
                      className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-dark-700 flex items-center justify-center text-gray-400 hover:bg-accent-500 hover:text-white transition-all duration-200 flex-shrink-0">
                      <ExternalLink size={13} />
                    </a>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Awards */}
            <div>
              <h2 className="font-display text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center">
                  <Award size={16} className="text-white" />
                </div>
                Awards & Recognition
              </h2>
              <div className="space-y-4">
                {awards.map((award, i) => (
                  <motion.div
                    key={award.title}
                    className="glass-card p-5 rounded-2xl flex items-start gap-4 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group border-l-4 border-amber-500"
                    variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={i * 0.2}
                  >
                    <div className="text-3xl flex-shrink-0 group-hover:scale-110 transition-transform">{award.icon}</div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white text-sm leading-tight mb-1">{award.title}</h4>
                      <p className="text-xs text-amber-500 font-medium">{award.issuer}</p>
                      <p className="text-xs text-gray-500 mt-1">{award.date}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* GitHub stats */}
              <motion.div
                className="mt-6 glass-card p-6 rounded-2xl"
                variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={0.5}
              >
                <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <span>🐙</span> GitHub Stats
                </h4>
                <div className="space-y-3">
                  <img
                    src="https://github-readme-stats.vercel.app/api?username=RohitShrestha533&show_icons=true&theme=transparent&hide_border=true&title_color=0ea5e9&text_color=94a3b8&icon_color=0ea5e9"
                    alt="GitHub Stats" className="w-full rounded-xl" loading="lazy"
                    onError={e => { e.target.style.display = 'none' }}
                  />
                  <img
                    src="https://github-readme-stats.vercel.app/api/top-langs/?username=RohitShrestha533&layout=compact&theme=transparent&hide_border=true&title_color=0ea5e9&text_color=94a3b8"
                    alt="Top Languages" className="w-full rounded-xl" loading="lazy"
                    onError={e => { e.target.style.display = 'none' }}
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
