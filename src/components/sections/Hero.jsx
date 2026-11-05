import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import {
  Download,
  Mail,
  ArrowDown,
  Github,
  Linkedin,
  ExternalLink,
  Code2,
  Sparkles,
  MapPin,
  CheckCircle2,
} from "lucide-react";
import { Link } from "react-router-dom";
import personal from "../../data/personal.json";

// Floating particles background
const Particle = ({ style }) => (
  <motion.div
    className="absolute rounded-full bg-accent-500/20 dark:bg-accent-500/10 pointer-events-none"
    style={style}
    animate={{
      y: [0, -35, 0],
      x: [0, 15, 0],
      opacity: [0.2, 0.7, 0.2],
      scale: [1, 1.2, 1],
    }}
    transition={{
      duration: style.duration,
      repeat: Infinity,
      delay: style.delay,
      ease: "easeInOut",
    }}
  />
);

const particles = Array.from({ length: 10 }, () => ({
  width: `${6 + Math.random() * 14}px`,
  height: `${6 + Math.random() * 14}px`,
  left: `${Math.random() * 100}%`,
  top: `${Math.random() * 100}%`,
  duration: 4 + Math.random() * 4,
  delay: Math.random() * 3,
}));

// Decorative orbit ring with tech icons (visible on sm+ screens to guarantee zero mobile horizontal overflow)
const OrbitItem = ({ angle, radius, delay, children }) => {
  const rad = (angle * Math.PI) / 180;
  const x = Math.cos(rad) * radius;
  const y = Math.sin(rad) * radius;
  return (
    <motion.div
      className="absolute"
      style={{ left: "50%", top: "50%", x: x - 18, y: y - 18 }}
      animate={{ rotate: [0, 360] }}
      transition={{ duration: 24, repeat: Infinity, ease: "linear", delay }}
    >
      <motion.div
        animate={{ rotate: [0, -360] }}
        transition={{ duration: 24, repeat: Infinity, ease: "linear", delay }}
        className="w-9 h-9 rounded-xl glass-card flex items-center justify-center text-sm shadow-md border border-accent-200/40 dark:border-accent-500/20"
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-[92vh] flex items-center overflow-x-clip bg-gradient-to-br from-gray-50 via-white to-blue-50/40 dark:from-dark-900 dark:via-dark-900 dark:to-dark-800 pt-20 sm:pt-24 lg:pt-0"
    >
      {/* Mesh gradient overlay */}
      <div className="absolute inset-0 mesh-gradient opacity-40 dark:opacity-20 pointer-events-none" />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#000 1px,transparent 1px),linear-gradient(90deg,#000 1px,transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((p, i) => (
          <Particle key={i} style={p} />
        ))}
      </div>

      {/* Ambient glow blobs */}
      <div className="absolute top-1/4 -right-32 w-80 h-80 sm:w-96 sm:h-96 bg-accent-500/10 dark:bg-accent-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -left-32 w-80 h-80 sm:w-96 sm:h-96 bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* ── Main content container ── */}
      <div className="section-container relative z-10 w-full py-12 sm:py-16 lg:py-24">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* ── Left Column: Intro & Info (7 cols on lg) ── */}
          <div className="order-2 lg:order-1 lg:col-span-7 text-center lg:text-left">
            {/* Top Badges */}
            <motion.div
              className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 mb-5 sm:mb-6"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-dark-800 border border-green-500/30 dark:border-green-500/20 shadow-sm">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
                </span>
                <span className="text-xs font-semibold text-gray-800 dark:text-gray-200">
                  Open to Opportunities
                </span>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent-50 dark:bg-accent-500/10 border border-accent-200 dark:border-accent-500/20 text-accent-700 dark:text-accent-300 text-xs font-semibold">
                <Sparkles size={12} className="text-accent-500" />
                <span>Dean's List Graduate (3.76 CGPA)</span>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <p className="text-sm sm:text-base font-mono text-accent-500 dark:text-accent-400 font-semibold mb-2 tracking-wide">
                Hello, I'm
              </p>
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] font-bold tracking-tight text-gray-900 dark:text-white leading-[1.1] mb-3">
                Rohit Shrestha
              </h1>
            </motion.div>

            {/* Animated Role / Typing animation */}
            <motion.div
              className="flex items-center justify-center lg:justify-start gap-2 h-10 mb-4 sm:mb-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="text-accent-500 font-mono text-base sm:text-lg">&gt;</span>
              <TypeAnimation
                sequence={[
                  "Fullstack Developer",
                  2200,
                  "React & TypeScript Specialist",
                  2200,
                  "TanStack Query & Zustand Expert",
                  2200,
                  "Node.js & REST API Engineer",
                  2200,
                  "SaaS & Admin Portal Builder",
                  2200,
                ]}
                wrapper="span"
                speed={55}
                deletionSpeed={75}
                repeat={Infinity}
                className="text-lg sm:text-xl md:text-2xl font-bold gradient-text font-mono"
              />
            </motion.div>

            {/* Bio summary */}
            <motion.p
              className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
            >
              {personal.bio}
            </motion.p>

            {/* Action buttons (Responsive stack on mobile, inline on sm+) */}
            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 mb-8"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <a
                href={personal.resume}
                download="Rohit_Shrestha_Fullstack_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto btn-primary justify-center shadow-lg shadow-accent-500/25 py-3 px-6 text-sm font-bold"
              >
                <Download size={17} /> Download Resume
              </a>
              <Link
                to="/projects"
                className="w-full sm:w-auto btn-secondary justify-center py-3 px-6 text-sm font-semibold"
              >
                <Code2 size={17} /> View Projects
              </Link>
              <Link
                to="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 text-gray-700 dark:text-gray-300 font-semibold rounded-xl hover:text-accent-500 hover:bg-gray-100 dark:hover:bg-dark-800 transition-colors text-sm"
              >
                <Mail size={16} /> Contact Me
              </Link>
            </motion.div>

            {/* Social Links & Location */}
            <motion.div
              className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.35 }}
            >
              <div className="flex items-center gap-2">
                <a
                  href={personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                  className="w-9 h-9 rounded-xl bg-gray-100 dark:bg-dark-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-accent-500 hover:text-white transition-all shadow-sm"
                >
                  <Github size={17} />
                </a>
                <a
                  href={personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                  className="w-9 h-9 rounded-xl bg-gray-100 dark:bg-dark-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-accent-500 hover:text-white transition-all shadow-sm"
                >
                  <Linkedin size={17} />
                </a>
                <a
                  href={`mailto:${personal.email}`}
                  aria-label="Email Rohit"
                  className="w-9 h-9 rounded-xl bg-gray-100 dark:bg-dark-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-accent-500 hover:text-white transition-all shadow-sm"
                >
                  <Mail size={17} />
                </a>
              </div>

              <div className="h-4 w-px bg-gray-300 dark:bg-dark-700 hidden sm:block" />

              <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                <MapPin size={14} className="text-accent-500 flex-shrink-0" />
                <span>{personal.location}</span>
              </div>
            </motion.div>

            {/* Stats Grid: 2 columns on mobile, 4 columns on sm+ */}
            <motion.div
              className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-8 sm:mt-10 pt-6 border-t border-gray-200/70 dark:border-dark-700/80 max-w-xl mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {personal.stats.map((stat, i) => (
                <div
                  key={i}
                  className="p-3 rounded-2xl bg-white/60 dark:bg-dark-800/60 backdrop-blur-sm border border-gray-100 dark:border-dark-700 text-center"
                >
                  <div className="font-display text-2xl sm:text-3xl font-bold gradient-text">
                    {stat.value}
                  </div>
                  <div className="text-[11px] font-medium text-gray-600 dark:text-gray-400 mt-0.5 leading-snug">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── Right Column: Responsive Profile Card & Visuals (5 cols on lg) ── */}
          <div className="order-1 lg:order-2 lg:col-span-5 flex flex-col items-center justify-center">
            <motion.div
              className="relative max-w-full flex flex-col items-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              {/* Outer orbit decoration (displayed on sm+ to prevent horizontal overflow on narrow phones) */}
              <div className="hidden sm:block absolute inset-0 pointer-events-none">
                <motion.div
                  className="absolute rounded-full border border-dashed border-accent-400/30 dark:border-accent-500/20"
                  style={{ inset: "-36px" }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
                />
                <div className="absolute inset-0 flex items-center justify-center" style={{ inset: "-36px" }}>
                  <OrbitItem angle={0} radius={140} delay={0}>⚛️</OrbitItem>
                  <OrbitItem angle={72} radius={140} delay={0}>🟢</OrbitItem>
                  <OrbitItem angle={144} radius={140} delay={0}>⚡</OrbitItem>
                  <OrbitItem angle={216} radius={140} delay={0}>🔷</OrbitItem>
                  <OrbitItem angle={288} radius={140} delay={0}>🐙</OrbitItem>
                </div>
              </div>

              {/* Ambient Glow behind photo */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-accent-500/20 via-blue-500/20 to-indigo-600/20 blur-2xl scale-105 pointer-events-none" />

              {/* Main Photo Frame */}
              <motion.div
                className="relative w-64 h-72 xs:w-72 xs:h-80 sm:w-80 sm:h-96 rounded-3xl p-1 bg-gradient-to-br from-accent-500 via-blue-500 to-indigo-600 shadow-2xl shadow-accent-500/20"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="w-full h-full rounded-[22px] overflow-hidden bg-dark-900 relative">
                  <img
                    src="/profile.png"
                    alt="Rohit Shrestha - Fullstack Developer"
                    className="w-full h-full object-cover object-top"
                    loading="eager"
                  />
                  {/* Subtle gradient vignette at bottom */}
                  <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-dark-900/70 to-transparent pointer-events-none" />
                </div>

                {/* Floating pill badge – Top Right (Works on all viewports) */}
                <div className="absolute -top-3.5 right-3 px-3 py-1.5 rounded-full bg-white dark:bg-dark-800 shadow-lg border border-accent-200/50 dark:border-accent-500/20 flex items-center gap-1.5 text-xs font-semibold text-gray-800 dark:text-gray-200">
                  <span>🇳🇵</span> Nepal
                </div>
              </motion.div>

              {/* Floating badges row for mobile / tablet / desktop */}
              <div className="mt-4 sm:mt-6 flex flex-wrap items-center justify-center gap-2.5 max-w-sm">
                <div className="glass-card px-3.5 py-2 rounded-2xl flex items-center gap-2 shadow-md">
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-accent-500 to-blue-500 flex items-center justify-center text-white text-xs font-bold shadow-sm">
                    4+
                  </div>
                  <div>
                    <div className="text-xs font-bold text-gray-900 dark:text-white leading-tight">
                      Years Active
                    </div>
                    <div className="text-[10px] text-gray-500 dark:text-gray-400">
                      Coding &amp; SaaS
                    </div>
                  </div>
                </div>

                <div className="glass-card px-3.5 py-2 rounded-2xl flex items-center gap-2 shadow-md">
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-400 flex items-center justify-center text-white text-xs font-bold shadow-sm">
                    ✓
                  </div>
                  <div>
                    <div className="text-xs font-bold text-gray-900 dark:text-white leading-tight">
                      10+ Projects
                    </div>
                    <div className="text-[10px] text-gray-500 dark:text-gray-400">
                      Delivered
                    </div>
                  </div>
                </div>

                <div className="glass-card px-3.5 py-2 rounded-2xl flex items-center gap-2 shadow-md">
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white text-xs font-bold shadow-sm">
                    ★
                  </div>
                  <div>
                    <div className="text-xs font-bold text-gray-900 dark:text-white leading-tight">
                      Dean's List
                    </div>
                    <div className="text-[10px] text-gray-500 dark:text-gray-400">
                      Academic Award
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
