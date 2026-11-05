import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import {
  MapPin,
  Calendar,
  GraduationCap,
  Briefcase,
  Heart,
  Code2,
  Smartphone,
  ShoppingBag,
  Download,
  Award,
  Sparkles,
} from 'lucide-react'
import personal from '../../data/personal.json'
import education from '../../data/education.json'

const iconMap = { Code2, Smartphone, ShoppingBag, GraduationCap, Heart, Briefcase, Award }

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.08, ease: 'easeOut' },
  }),
}

export default function About() {
  const [ref, inView] = useInView({ threshold: 0.08, triggerOnce: true })

  return (
    <section id="about" className="py-20 sm:py-24 bg-white dark:bg-dark-900" ref={ref}>
      <div className="section-container">
        {/* Header */}
        <motion.div
          className="text-center mb-12 sm:mb-16"
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <span className="inline-block font-mono text-xs sm:text-sm text-accent-500 dark:text-accent-400 tracking-widest uppercase mb-2 px-3.5 py-1 bg-accent-50 dark:bg-accent-500/10 rounded-full border border-accent-200 dark:border-accent-500/20 font-semibold">
            About Me
          </span>
          <h2 className="section-title text-gray-900 dark:text-white">
            Developer <span className="gradient-text">Profile</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-accent-500 to-blue-400 rounded-full mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
            Dean's List graduate and Fullstack Developer with production experience building SaaS platforms, LMS systems, and scalable web apps.
          </p>
        </motion.div>

        {/* Content Grid: 1 col on mobile/tablet, 2 cols on lg+ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          {/* Left Column: Personal Story & Highlights */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            custom={1}
          >
            <div className="relative">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-3 py-1 rounded-full bg-accent-50 dark:bg-accent-500/10 text-accent-600 dark:text-accent-400 text-xs font-bold border border-accent-200 dark:border-accent-500/20">
                  Fullstack Engineer
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  🇳🇵 Nepal
                </span>
              </div>

              <h3 className="font-display text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Engineering performant software from concept to deployment
              </h3>

              <div className="space-y-4 text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                <p>{personal.bio}</p>
                <p>{personal.bioLong}</p>
              </div>

              {/* Quick Details List */}
              <div className="mt-8 space-y-3 bg-gray-50/70 dark:bg-dark-800/60 p-4 sm:p-5 rounded-2xl border border-gray-100 dark:border-dark-700">
                {[
                  { icon: MapPin, text: personal.location },
                  { icon: Calendar, text: personal.availabilityText },
                  {
                    icon: GraduationCap,
                    text: 'BCIS (IT) – Boston International College, Pokhara University (3.76 CGPA)',
                  },
                  { icon: Briefcase, text: 'Full Stack Developer at Cloud Sathi' },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-start gap-3 text-xs sm:text-sm">
                    <Icon size={16} className="text-accent-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-800 dark:text-gray-200 font-medium">{text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Highlights Grid: 1 col on mobile xs, 2 cols on sm+ */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-8">
              {personal.highlights.map(({ icon, label, desc }, i) => {
                const Icon = iconMap[icon] || Code2
                return (
                  <motion.div
                    key={label}
                    className="glass-card p-4 sm:p-5 rounded-2xl hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group border border-gray-200/60 dark:border-white/5"
                    variants={fadeUp}
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                    custom={2 + i * 0.1}
                  >
                    <div className="w-9 h-9 rounded-xl bg-accent-50 dark:bg-accent-500/10 flex items-center justify-center mb-3 group-hover:bg-accent-500 transition-colors duration-200">
                      <Icon
                        size={18}
                        className="text-accent-500 group-hover:text-white transition-colors duration-200"
                      />
                    </div>
                    <div className="font-bold text-gray-900 dark:text-white text-sm">
                      {label}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-snug">
                      {desc}
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          {/* Right Column: Education & Interests */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            custom={2}
          >
            <h3 className="font-display text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2.5">
              <GraduationCap className="text-accent-500" size={24} />
              <span>Education &amp; Academics</span>
            </h3>

            <div className="space-y-5">
              {education.map((edu, i) => (
                <motion.div
                  key={i}
                  className="glass-card p-5 sm:p-6 rounded-2xl hover:shadow-xl transition-all duration-300 border-l-4 border-accent-500 border border-gray-200/60 dark:border-white/5"
                  variants={fadeUp}
                  initial="hidden"
                  animate={inView ? 'visible' : 'hidden'}
                  custom={2 + i * 0.15}
                >
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white text-base leading-snug">
                        {edu.degree}
                      </h4>
                      <p className="text-accent-500 dark:text-accent-400 text-xs sm:text-sm font-semibold mt-0.5">
                        {edu.school}
                      </p>
                    </div>
                    <span className="px-2.5 py-1 bg-accent-50 dark:bg-accent-500/10 text-accent-700 dark:text-accent-300 text-xs font-mono font-bold rounded-lg border border-accent-200/60 dark:border-accent-500/20">
                      {edu.grade}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 dark:text-gray-400 mb-3">
                    <span className="flex items-center gap-1 font-medium">
                      <MapPin size={12} className="text-accent-500" /> {edu.location}
                    </span>
                    <span className="flex items-center gap-1 font-medium">
                      <Calendar size={12} className="text-accent-500" /> {edu.year}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                    {edu.description}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Activities & Hobbies Card */}
            <div className="mt-6 glass-card p-5 sm:p-6 rounded-2xl border border-gray-200/60 dark:border-white/5">
              <h4 className="font-bold text-gray-900 dark:text-white text-sm mb-3 flex items-center gap-2">
                <span>⚡</span> Beyond the Terminal
              </h4>
              <div className="flex flex-wrap gap-2">
                {personal.hobbies.map((item) => (
                  <span key={item} className="skill-tag text-xs font-medium">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Resume Callout Card */}
            <div className="mt-6 p-5 rounded-2xl bg-gradient-to-r from-accent-500/10 via-blue-500/10 to-transparent border border-accent-200 dark:border-accent-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white text-sm">
                  Looking for my full resume?
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  Download the latest October edition with full work breakdown.
                </p>
              </div>
              <a
                href={personal.resume}
                download="Rohit_Shrestha_Fullstack_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-xs py-2.5 px-4 shadow-sm"
              >
                <Download size={14} /> Resume (PDF)
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
