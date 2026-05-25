import { motion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import { Download, Mail, ArrowDown, Github, Linkedin, ExternalLink } from 'lucide-react'
import { Link } from 'react-router-dom'
import personal from '../../data/personal.json'

// Floating particles background
const Particle = ({ style }) => (
  <motion.div
    className="absolute rounded-full bg-accent-500/20 dark:bg-accent-500/10"
    style={style}
    animate={{ y: [0, -40, 0], x: [0, 20, 0], opacity: [0.3, 0.8, 0.3], scale: [1, 1.2, 1] }}
    transition={{ duration: style.duration, repeat: Infinity, delay: style.delay, ease: 'easeInOut' }}
  />
)

const particles = Array.from({ length: 12 }, () => ({
  width:  `${6 + Math.random() * 18}px`,
  height: `${6 + Math.random() * 18}px`,
  left:   `${Math.random() * 100}%`,
  top:    `${Math.random() * 100}%`,
  duration: 4 + Math.random() * 4,
  delay:    Math.random() * 4,
}))

// Decorative orbit ring with tech icons
const OrbitItem = ({ angle, radius, delay, children }) => {
  const rad = (angle * Math.PI) / 180
  const x = Math.cos(rad) * radius
  const y = Math.sin(rad) * radius
  return (
    <motion.div
      className="absolute"
      style={{ left: '50%', top: '50%', x: x - 20, y: y - 20 }}
      animate={{ rotate: [0, 360] }}
      transition={{ duration: 20, repeat: Infinity, ease: 'linear', delay }}
    >
      <motion.div
        animate={{ rotate: [0, -360] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear', delay }}
        className="w-10 h-10 rounded-xl glass-card flex items-center justify-center text-base shadow-lg border border-accent-200/30 dark:border-accent-500/20"
      >
        {children}
      </motion.div>
    </motion.div>
  )
}

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-gray-50 via-white to-blue-50/40 dark:from-dark-900 dark:via-dark-900 dark:to-dark-800"
    >
      {/* Mesh gradient overlay */}
      <div className="absolute inset-0 mesh-gradient opacity-50 dark:opacity-20" />

      {/* Subtle grid */}
      <div className="absolute inset-0 opacity-[0.025] dark:opacity-[0.04]"
        style={{ backgroundImage: 'linear-gradient(#000 1px,transparent 1px),linear-gradient(90deg,#000 1px,transparent 1px)', backgroundSize: '60px 60px' }} />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((p, i) => <Particle key={i} style={p} />)}
      </div>

      {/* Glow blobs */}
      <div className="absolute top-1/4 -right-40 w-[500px] h-[500px] bg-accent-500/8 dark:bg-accent-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 -left-40 w-[500px] h-[500px] bg-blue-500/8 dark:bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* ── Main content ── */}
      <div className="section-container relative z-10 py-28 lg:py-0">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-10 items-center min-h-screen lg:min-h-0">

          {/* ── Left: text ── */}
          <div className="order-2 lg:order-1">

            {/* Available badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-dark-800 border border-accent-200 dark:border-accent-500/25 shadow-sm mb-7"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
              </span>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Open to opportunities</span>
            </motion.div>

            {/* Headline */}
            <motion.div
              initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            >
              <p className="text-base font-mono text-accent-500 dark:text-accent-400 mb-2 tracking-wide">
                Hello, I'm
              </p>
              <h1 className="font-display text-5xl md:text-6xl lg:text-[4.2rem] font-bold leading-[1.05] mb-4">
                <span className="text-gray-900 dark:text-white">{personal.name}</span>
              </h1>
            </motion.div>

            {/* Animated roles */}
            <motion.div className="mb-6 flex items-center gap-3"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>
              <span className="w-8 h-0.5 bg-accent-500 rounded-full flex-shrink-0" />
              <TypeAnimation
                sequence={[
                  'Full Stack Developer',   2200,
                  'React.js Specialist',    2200,
                  'Node.js Developer',      2200,
                  'Data Science Enthusiast',2200,
                  'UI / UX Developer',      2200,
                ]}
                wrapper="span"
                speed={55}
                deletionSpeed={75}
                repeat={Infinity}
                className="text-xl md:text-2xl font-semibold text-accent-500 dark:text-accent-400 font-mono"
              />
            </motion.div>

            {/* Bio */}
            <motion.p
              className="text-gray-600 dark:text-gray-400 text-[16px] leading-relaxed mb-9 max-w-lg"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}
            >
              {personal.bio}
            </motion.p>

            {/* CTA buttons */}
            <motion.div className="flex flex-wrap gap-3 mb-10"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4 }}>
              <a href={personal.resume}
                className="btn-primary relative overflow-hidden shine">
                <Download size={17} /> Download Resume
              </a>
              <Link to="/contact" className="btn-secondary">
                <Mail size={17} /> Contact Me
              </Link>
              <Link to="/projects"
                className="inline-flex items-center gap-2 px-5 py-3 text-gray-600 dark:text-gray-400 font-medium rounded-xl hover:text-accent-500 transition-colors duration-200 text-sm">
                <ExternalLink size={16} /> View Projects
              </Link>
            </motion.div>

            {/* Social row */}
            <motion.div className="flex items-center gap-4"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.5 }}>
              <span className="text-xs text-gray-400 dark:text-gray-600 uppercase tracking-widest font-mono">Follow</span>
              <div className="flex items-center gap-2">
                {[
                  { href: personal.github,   Icon: Github,   label: 'GitHub' },
                  { href: personal.linkedin, Icon: Linkedin, label: 'LinkedIn' },
                ].map(({ href, Icon, label }) => (
                  <motion.a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                    className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-dark-700 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-accent-500 hover:text-white transition-all duration-300 hover:shadow-lg hover:shadow-accent-500/25"
                    whileHover={{ y: -3 }} whileTap={{ scale: 0.92 }}>
                    <Icon size={17} />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Stats bar */}
            <motion.div
              className="grid grid-cols-4 gap-4 mt-12 pt-8 border-t border-gray-100 dark:border-dark-700/80"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.6 }}
            >
              {personal.stats.map((stat, i) => (
                <div key={i} className="text-center group">
                  <div className="font-display text-2xl md:text-3xl font-bold gradient-text group-hover:scale-110 transition-transform duration-200 inline-block">
                    {stat.value}
                  </div>
                  <div className="text-[11px] text-gray-500 dark:text-gray-500 mt-1 leading-tight">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── Right: profile photo ── */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.85, delay: 0.15, type: 'spring', bounce: 0.35 }}
            >
              {/* Outer slow-spin ring */}
              <motion.div
                className="absolute rounded-full border-2 border-dashed border-accent-400/25 dark:border-accent-500/20"
                style={{ inset: '-52px' }}
                animate={{ rotate: 360 }}
                transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
              />

              {/* Inner counter-spin ring */}
              <motion.div
                className="absolute rounded-full border border-dashed border-blue-400/20"
                style={{ inset: '-24px' }}
                animate={{ rotate: -360 }}
                transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
              />

              {/* Orbit tech icons */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ inset: '-52px' }}>
                <OrbitItem angle={0}   radius={148} delay={0}>⚛️</OrbitItem>
                <OrbitItem angle={72}  radius={148} delay={0}>🟢</OrbitItem>
                <OrbitItem angle={144} radius={148} delay={0}>🐍</OrbitItem>
                <OrbitItem angle={216} radius={148} delay={0}>🍃</OrbitItem>
                <OrbitItem angle={288} radius={148} delay={0}>🐙</OrbitItem>
              </div>

              {/* Glow behind photo */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-accent-500/25 to-blue-600/25 blur-2xl scale-110" />

              {/* Photo container */}
              <motion.div
                className="relative w-[280px] h-[320px] md:w-[310px] md:h-[355px]"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                {/* Gradient border frame */}
                <div className="w-full h-full rounded-3xl bg-gradient-to-br from-accent-500 via-blue-500 to-accent-600 p-[3px] shadow-2xl shadow-accent-500/30">
                  {/* Photo */}
                  <div className="w-full h-full rounded-[22px] overflow-hidden bg-dark-900">
                    <img
                      src="/profile.png"
                      alt="Rohit Shrestha"
                      className="w-full h-full object-cover object-top"
                      draggable={false}
                    />
                  </div>
                </div>

                {/* Floating tag – top left */}
                <motion.div
                  className="absolute -left-10 top-8 glass-card px-3.5 py-2.5 rounded-xl flex items-center gap-2.5 shadow-xl border border-white/30 dark:border-white/10"
                  animate={{ x: [0, -4, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
                >
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-500 to-blue-500 flex items-center justify-center text-white text-sm font-bold shadow">
                    3+
                  </div>
                  <div>
                    <div className="text-xs font-bold text-gray-900 dark:text-white leading-tight">Years Exp.</div>
                    <div className="text-[10px] text-gray-500">Full Stack Dev</div>
                  </div>
                </motion.div>

                {/* Floating tag – bottom right */}
                <motion.div
                  className="absolute -right-10 bottom-10 glass-card px-3.5 py-2.5 rounded-xl flex items-center gap-2.5 shadow-xl border border-white/30 dark:border-white/10"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 1.8 }}
                >
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-emerald-400 flex items-center justify-center shadow">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-gray-900 dark:text-white leading-tight">20+ Projects</div>
                    <div className="text-[10px] text-gray-500">Completed</div>
                  </div>
                </motion.div>

                {/* Floating tag – top right */}
                <motion.div
                  className="absolute -right-8 top-6 glass-card px-3 py-1.5 rounded-xl shadow-xl border border-white/30 dark:border-white/10"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
                >
                  <div className="text-xs font-semibold text-gray-900 dark:text-white flex items-center gap-1.5">
                    <span className="text-base">🇳🇵</span> Nepal
                  </div>
                </motion.div>

                {/* Bottom gradient fade for natural crop */}
                <div className="absolute bottom-0 left-[3px] right-[3px] h-12 rounded-b-[22px] bg-gradient-to-t from-dark-900/40 to-transparent pointer-events-none" />
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>

      {/* Scroll hint */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-gray-400 dark:text-gray-600 select-none"
        animate={{ y: [0, 7, 0] }}
        transition={{ duration: 2.2, repeat: Infinity }}
      >
        <span className="text-[10px] tracking-widest uppercase font-mono">Scroll</span>
        <ArrowDown size={14} />
      </motion.div>
    </section>
  )
}
