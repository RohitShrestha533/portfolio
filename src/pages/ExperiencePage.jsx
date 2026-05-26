import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Briefcase, MapPin, Calendar, ExternalLink, Award, BookOpen, TrendingUp, Star } from 'lucide-react'
import experienceData from '../data/experience.json'
import achievementsData from '../data/achievements.json'

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.1 } })
}

const fadeLeft = {
  hidden: { opacity: 0, x: -24 },
  visible: (i = 0) => ({ opacity: 1, x: 0, transition: { duration: 0.5, delay: i * 0.08 } })
}

const statItems = [
  { value: `${experienceData.length}`, label: 'Roles Held', icon: '💼' },
  { value: '3+', label: 'Years Active', icon: '📅' },
  { value: '10+', label: 'Projects Delivered', icon: '🚀' },
  { value: '4+', label: 'Certifications', icon: '🎓' },
]

export default function ExperiencePage() {
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true })
  const certifications = achievementsData.filter(a => a.category === 'certification')
  const awards = achievementsData.filter(a => a.category === 'award')

  return (
    <main>
      {/* ── Page Header ── */}
      <div className="page-header relative overflow-hidden">
        {/* Subtle decorative blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="section-container text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>
            <span className="inline-block font-mono text-xs text-accent-500 tracking-[0.25em] uppercase mb-4 px-4 py-1.5 bg-accent-50 dark:bg-accent-500/10 rounded-full border border-accent-200 dark:border-accent-500/20">
              My Journey
            </span>
            <h1 className="section-title text-gray-900 dark:text-white">
              Experience &amp; <span className="gradient-text">Achievements</span>
            </h1>
            <p className="text-gray-500 dark:text-gray-400 max-w-lg mx-auto mt-2 text-[15px] leading-relaxed">
              A timeline of my professional roles, certifications, and recognitions that shaped my growth as a developer.
            </p>
            <div className="w-16 h-1 bg-gradient-to-r from-accent-500 to-blue-400 rounded-full mx-auto mt-6" />
          </motion.div>
        </div>

        {/* Quick stats bar */}
        <motion.div
          className="section-container mt-10 relative z-10"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-2xl mx-auto">
            {statItems.map((s, i) => (
              <motion.div
                key={s.label}
                className="glass-card px-4 py-3.5 rounded-2xl text-center group hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.08 }}
              >
                <div className="text-xl mb-1">{s.icon}</div>
                <div className="font-display text-2xl font-bold gradient-text">{s.value}</div>
                <div className="text-[10px] text-gray-500 dark:text-gray-500 uppercase tracking-wider mt-0.5">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── Work Experience Timeline ── */}
      <section className="py-20 bg-white dark:bg-dark-900" ref={ref}>
        <div className="section-container">

          {/* Section label */}
          <motion.div
            className="flex items-center gap-4 mb-14"
            variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={0}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-500 to-blue-600 flex items-center justify-center shadow-lg shadow-accent-500/25">
              <Briefcase size={18} className="text-white" />
            </div>
            <div>
              <h2 className="font-display text-2xl font-bold text-gray-900 dark:text-white leading-tight">Work Experience</h2>
              <p className="text-sm text-gray-500 dark:text-gray-500 mt-0.5">Professional roles and internships</p>
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-accent-500/30 to-transparent ml-4 hidden md:block" />
          </motion.div>

          {/* Timeline */}
          <div className="relative max-w-3xl mx-auto mb-24">
            {/* Vertical line */}
            <motion.div
              className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent-500 via-accent-400/40 to-transparent"
              initial={{ scaleY: 0 }} animate={inView ? { scaleY: 1 } : {}}
              transition={{ duration: 1.4, ease: 'easeOut' }}
              style={{ transformOrigin: 'top' }}
            />

            {experienceData.map((exp, i) => (
              <motion.div
                key={exp.id}
                className="relative flex gap-8 mb-10 last:mb-0"
                variants={fadeLeft} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={i}
              >
                {/* Timeline dot */}
                <div className="relative flex-shrink-0 w-12 flex flex-col items-center">
                  <motion.div
                    className={`w-4 h-4 rounded-full bg-gradient-to-br ${exp.color} border-2 border-white dark:border-dark-900 shadow-lg z-10 mt-6`}
                    initial={{ scale: 0 }} animate={inView ? { scale: 1 } : {}}
                    transition={{ delay: 0.3 + i * 0.15, type: 'spring', bounce: 0.5 }}
                  />
                </div>

                {/* Card */}
                <motion.div
                  className="flex-1 glass-card p-6 rounded-2xl hover:shadow-2xl transition-all duration-300 group border border-white/50 dark:border-white/5"
                  whileHover={{ y: -3 }}
                >
                  {/* Header row */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${exp.color} flex items-center justify-center flex-shrink-0 shadow-md`}>
                      <Briefcase size={17} className="text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className={`inline-flex items-center px-2.5 py-0.5 text-[10px] font-bold rounded-full bg-gradient-to-r ${exp.color} text-white uppercase tracking-wide`}>
                          {exp.type}
                        </span>
                      </div>
                      <h3 className="font-display font-bold text-lg text-gray-900 dark:text-white leading-snug">{exp.role}</h3>
                      <p className="text-accent-500 dark:text-accent-400 font-semibold text-sm">{exp.company}</p>
                    </div>
                  </div>

                  {/* Meta */}
                  <div className="flex flex-wrap gap-4 text-xs text-gray-500 dark:text-gray-500 mb-4 pb-4 border-b border-gray-100 dark:border-dark-700">
                    <span className="flex items-center gap-1.5"><Calendar size={12} className="text-accent-400" />{exp.duration}</span>
                    <span className="flex items-center gap-1.5"><MapPin size={12} className="text-accent-400" />{exp.location}</span>
                  </div>

                  {/* Bullet points */}
                  <ul className="space-y-2 mb-4">
                    {exp.description.map((item, j) => (
                      <li key={j} className="flex items-start gap-2.5 text-sm text-gray-600 dark:text-gray-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent-500 mt-2 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  {/* Tech chips */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {exp.tech.map(t => (
                      <span key={t} className="px-2.5 py-1 text-[11px] font-semibold bg-accent-50 dark:bg-accent-500/10 text-accent-600 dark:text-accent-400 rounded-lg border border-accent-100 dark:border-accent-500/20">
                        {t}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* ── Certifications & Awards ── */}
          <div className="grid lg:grid-cols-2 gap-12">

            {/* Certifications */}
            <div>
              <motion.div
                className="flex items-center gap-3 mb-8"
                variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={0}
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-500 to-blue-600 flex items-center justify-center shadow-lg shadow-accent-500/25">
                  <BookOpen size={17} className="text-white" />
                </div>
                <div>
                  <h2 className="font-display text-xl font-bold text-gray-900 dark:text-white">Certifications</h2>
                  <p className="text-xs text-gray-500 mt-0.5">Verified courses &amp; credentials</p>
                </div>
                <div className="flex-1 h-px bg-gradient-to-r from-accent-500/30 to-transparent ml-2 hidden sm:block" />
              </motion.div>

              <div className="space-y-3">
                {certifications.map((cert, i) => (
                  <motion.div
                    key={cert.title}
                    className="glass-card p-4 rounded-2xl flex items-center gap-4 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group border border-white/50 dark:border-white/5"
                    variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={i * 0.12}
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-50 to-blue-50 dark:from-accent-500/10 dark:to-blue-500/10 flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-110 transition-transform duration-200 border border-accent-100 dark:border-accent-500/20">
                      {cert.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900 dark:text-white text-sm leading-snug">{cert.title}</h4>
                      <p className="text-xs text-accent-500 font-medium mt-0.5">{cert.issuer}</p>
                      <p className="text-xs text-gray-400 dark:text-gray-600 mt-0.5">{cert.date}</p>
                    </div>
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-dark-700 flex items-center justify-center text-gray-400 hover:bg-accent-500 hover:text-white transition-all duration-200 flex-shrink-0"
                      aria-label="View certificate"
                    >
                      <ExternalLink size={13} />
                    </a>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Awards & GitHub */}
            <div>
              <motion.div
                className="flex items-center gap-3 mb-8"
                variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={0}
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/25">
                  <Award size={17} className="text-white" />
                </div>
                <div>
                  <h2 className="font-display text-xl font-bold text-gray-900 dark:text-white">Awards &amp; Recognition</h2>
                  <p className="text-xs text-gray-500 mt-0.5">Honours received</p>
                </div>
                <div className="flex-1 h-px bg-gradient-to-r from-amber-500/30 to-transparent ml-2 hidden sm:block" />
              </motion.div>

              <div className="space-y-3">
                {awards.map((award, i) => (
                  <motion.div
                    key={award.title}
                    className="glass-card p-4 rounded-2xl flex items-center gap-4 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group border-l-4 border-amber-400 border border-white/50 dark:border-white/5"
                    variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={i * 0.15}
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-500/10 dark:to-orange-500/10 flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-110 transition-transform duration-200">
                      {award.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <Star size={10} fill="currentColor" className="text-amber-400" />
                        <h4 className="font-semibold text-gray-900 dark:text-white text-sm leading-snug">{award.title}</h4>
                      </div>
                      <p className="text-xs text-amber-500 font-medium">{award.issuer}</p>
                      <p className="text-xs text-gray-400 dark:text-gray-600 mt-0.5">{award.date}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* GitHub Stats */}
              <motion.div
                className="mt-6 glass-card p-5 rounded-2xl border border-white/50 dark:border-white/5"
                variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={0.5}
              >
                <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2 text-sm">
                  <span>🐙</span> GitHub Activity
                  <TrendingUp size={14} className="text-green-500 ml-auto" />
                </h4>
                <div className="space-y-3">
                  <img
                    src="https://github-readme-stats.vercel.app/api?username=RohitShrestha533&show_icons=true&theme=transparent&hide_border=true&title_color=0ea5e9&text_color=94a3b8&icon_color=0ea5e9"
                    alt="GitHub Stats"
                    className="w-full rounded-xl"
                    loading="lazy"
                    onError={e => { e.target.style.display = 'none' }}
                  />
                  <img
                    src="https://github-readme-stats.vercel.app/api/top-langs/?username=RohitShrestha533&layout=compact&theme=transparent&hide_border=true&title_color=0ea5e9&text_color=94a3b8"
                    alt="Top Languages"
                    className="w-full rounded-xl"
                    loading="lazy"
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
