import { motion } from 'framer-motion'
import { MapPin, Calendar, GraduationCap, Briefcase, Heart, Code2 } from 'lucide-react'
import { useInView } from 'react-intersection-observer'
import personal from '../data/personal.json'
import education from '../data/education.json'

const iconMap = { Code2, Heart, Briefcase, GraduationCap }

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.55, delay: i * 0.1 } })
}

export default function AboutPage() {
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true })

  return (
    <main>
      {/* Page header */}
      <div className="page-header">
        <div className="section-container text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-block font-mono text-sm text-accent-500 tracking-widest uppercase mb-3">Who I am</span>
            <h1 className="section-title text-gray-900 dark:text-white">
              About <span className="gradient-text">Me</span>
            </h1>
            <div className="w-16 h-1 bg-gradient-to-r from-accent-500 to-blue-400 rounded-full mx-auto" />
          </motion.div>
        </div>
      </div>

      {/* Main content */}
      <section className="py-20 bg-white dark:bg-dark-900" ref={ref}>
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-16 items-start">

            {/* Left – story */}
            <motion.div variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={0}>
              <div className="relative">
                <div className="absolute -left-4 top-0 w-1 h-32 bg-gradient-to-b from-accent-500 to-transparent rounded-full" />
                <h2 className="font-display text-2xl font-bold text-gray-900 dark:text-white mb-4 pl-4">
                  Full Stack Developer from Nepal 🇳🇵
                </h2>
                <div className="space-y-4 pl-4 text-gray-600 dark:text-gray-400 leading-relaxed text-[15px]">
                  <p>{personal.bio}</p>
                  <p>{personal.bioLong}</p>
                </div>

                {/* Meta */}
                <div className="mt-8 pl-4 space-y-3">
                  {[
                    { Icon: MapPin, text: personal.location },
                    { Icon: Calendar, text: personal.availabilityText },
                    { Icon: GraduationCap, text: 'BSc CSIT – Tribhuvan University' },
                    { Icon: Briefcase, text: '3+ Years of Experience' },
                  ].map(({ Icon, text }) => (
                    <div key={text} className="flex items-center gap-3 text-sm">
                      <Icon size={15} className="text-accent-500 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">{text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Highlights */}
              <div className="grid grid-cols-2 gap-4 mt-10">
                {personal.highlights.map(({ icon, label, desc }, i) => {
                  const Icon = iconMap[icon] || Code2
                  return (
                    <motion.div
                      key={label}
                      className="glass-card p-5 rounded-2xl hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
                      variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={1 + i * 0.2}
                    >
                      <div className="w-10 h-10 rounded-xl bg-accent-50 dark:bg-accent-500/10 flex items-center justify-center mb-3 group-hover:bg-accent-500 transition-colors duration-300">
                        <Icon size={18} className="text-accent-500 group-hover:text-white transition-colors duration-300" />
                      </div>
                      <div className="font-semibold text-gray-900 dark:text-white text-sm">{label}</div>
                      <div className="text-xs text-gray-500 mt-1">{desc}</div>
                    </motion.div>
                  )
                })}
              </div>

              {/* Hobbies */}
              <motion.div
                className="mt-8 glass-card p-6 rounded-2xl"
                variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={2}
              >
                <h4 className="font-semibold text-gray-900 dark:text-white mb-4">When I'm not coding...</h4>
                <div className="flex flex-wrap gap-2">
                  {personal.hobbies.map(item => (
                    <span key={item} className="skill-tag text-xs">{item}</span>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Right – education */}
            <motion.div variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={1}>
              <h2 className="font-display text-2xl font-bold text-gray-900 dark:text-white mb-8">Education</h2>
              <div className="space-y-6">
                {education.map((edu, i) => (
                  <motion.div
                    key={i}
                    className="glass-card p-6 rounded-2xl border-l-4 border-accent-500 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                    variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={2 + i * 0.3}
                  >
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div>
                        <h4 className="font-bold text-gray-900 dark:text-white leading-tight">{edu.degree}</h4>
                        <p className="text-accent-500 dark:text-accent-400 text-sm font-medium mt-1">{edu.school}</p>
                      </div>
                      <span className="flex-shrink-0 px-3 py-1 bg-accent-50 dark:bg-accent-500/10 text-accent-600 dark:text-accent-400 text-xs font-mono rounded-lg">
                        {edu.grade}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-4 text-xs text-gray-500 mb-3">
                      <span className="flex items-center gap-1"><MapPin size={11} /> {edu.location}</span>
                      <span className="flex items-center gap-1"><Calendar size={11} /> {edu.year}</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{edu.description}</p>
                  </motion.div>
                ))}
              </div>

              {/* Stats grid */}
              <motion.div
                className="grid grid-cols-2 gap-4 mt-8"
                variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={3}
              >
                {personal.stats.map((stat, i) => (
                  <div key={i} className="glass-card p-5 rounded-2xl text-center">
                    <div className="font-display text-3xl font-bold gradient-text">{stat.value}</div>
                    <div className="text-xs text-gray-500 mt-1 leading-tight">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  )
}
