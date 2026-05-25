import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { MapPin, Calendar, GraduationCap, Briefcase, Heart, Code2 } from 'lucide-react'
import { personalInfo, education } from '../../utils/data'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: 'easeOut' }
  })
}

const highlights = [
  { icon: Code2, label: 'Clean Code', desc: 'Maintainable & scalable' },
  { icon: Heart, label: 'Passionate', desc: 'Love what I build' },
  { icon: Briefcase, label: 'Professional', desc: 'On-time delivery' },
  { icon: GraduationCap, label: 'Learning', desc: 'Always growing' },
]

export default function About() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section id="about" className="py-24 bg-white dark:bg-dark-900" ref={ref}>
      <div className="section-container">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <span className="inline-block font-mono text-sm text-accent-500 dark:text-accent-400 tracking-widest uppercase mb-3">
            Get to know me
          </span>
          <h2 className="section-title text-gray-900 dark:text-white">
            About <span className="gradient-text">Me</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-accent-500 to-blue-400 rounded-full mx-auto" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left – Story */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            custom={1}
          >
            <div className="relative">
              {/* Decorative element */}
              <div className="absolute -left-4 top-0 w-1 h-32 bg-gradient-to-b from-accent-500 to-transparent rounded-full" />

              <h3 className="font-display text-2xl font-bold text-gray-900 dark:text-white mb-4 pl-4">
                Full Stack Developer from Nepal 🇳🇵
              </h3>

              <div className="space-y-4 pl-4 text-gray-600 dark:text-gray-400 leading-relaxed">
                <p>
                  I'm a passionate Full Stack Developer based in Pokhara, Nepal, with a strong foundation in
                  both frontend and backend technologies. I love turning complex problems into elegant,
                  user-friendly solutions.
                </p>
                <p>
                  My journey started with pure HTML/CSS curiosity, evolved through vanilla JavaScript,
                  and grew into building sophisticated full-stack applications. Today, I work across the
                  entire stack — from pixel-perfect React UIs to scalable Node.js APIs.
                </p>
                <p>
                  I'm currently pursuing opportunities in international tech companies and exploring
                  graduate studies in Data Science, where I can combine my development skills with
                  machine learning and analytics.
                </p>
              </div>

              {/* Meta info */}
              <div className="mt-8 pl-4 space-y-3">
                {[
                  { icon: MapPin, text: 'Pokhara, Gandaki, Nepal' },
                  { icon: Calendar, text: 'Available from January 2025' },
                  { icon: GraduationCap, text: 'BSc CSIT – Tribhuvan University' },
                  { icon: Briefcase, text: '3+ Years of Experience' },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-3 text-sm">
                    <Icon size={16} className="text-accent-500 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">{text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Highlights grid */}
            <div className="grid grid-cols-2 gap-4 mt-10">
              {highlights.map(({ icon: Icon, label, desc }, i) => (
                <motion.div
                  key={label}
                  className="glass-card p-5 rounded-2xl hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
                  variants={fadeUp}
                  initial="hidden"
                  animate={inView ? "visible" : "hidden"}
                  custom={2 + i * 0.2}
                >
                  <div className="w-10 h-10 rounded-xl bg-accent-50 dark:bg-accent-500/10 flex items-center justify-center mb-3 group-hover:bg-accent-500 transition-colors duration-300">
                    <Icon size={20} className="text-accent-500 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div className="font-semibold text-gray-900 dark:text-white text-sm">{label}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">{desc}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right – Education */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            custom={2}
          >
            <h3 className="font-display text-2xl font-bold text-gray-900 dark:text-white mb-8">
              Education
            </h3>

            <div className="space-y-6">
              {education.map((edu, i) => (
                <motion.div
                  key={i}
                  className="glass-card p-6 rounded-2xl hover:shadow-xl transition-all duration-300 border-l-4 border-accent-500"
                  variants={fadeUp}
                  initial="hidden"
                  animate={inView ? "visible" : "hidden"}
                  custom={3 + i * 0.3}
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

                  <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-500 mb-3">
                    <span className="flex items-center gap-1">
                      <MapPin size={12} /> {edu.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar size={12} /> {edu.year}
                    </span>
                  </div>

                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {edu.description}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Fun facts */}
            <div className="mt-8 glass-card p-6 rounded-2xl">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4">When I'm not coding...</h4>
              <div className="flex flex-wrap gap-2">
                {['📚 Reading tech blogs', '🏔️ Trekking in Himalayas', '🎮 Gaming', '☕ Coffee addict', '🎵 Music lover', '📸 Photography'].map(item => (
                  <span key={item} className="skill-tag text-xs px-3 py-1.5">{item}</span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
