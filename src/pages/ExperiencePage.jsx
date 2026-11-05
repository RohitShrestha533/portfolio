import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Briefcase,
  MapPin,
  Calendar,
  ExternalLink,
  Award,
  BookOpen,
  Download,
  FileText,
  Star,
  CheckCircle2,
} from "lucide-react";
import experienceData from "../data/experience.json";
import achievementsData from "../data/achievements.json";
import personal from "../data/personal.json";
import SEO from "../components/common/SEO";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08 },
  }),
};

const fadeLeft = {
  hidden: { opacity: 0, x: -20 },
  visible: (i = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, delay: i * 0.08 },
  }),
};

const statItems = [
  { value: `${experienceData.length}`, label: "Roles Held", icon: "💼" },
  { value: "4+", label: "Years Coding", icon: "📅" },
  { value: "10+", label: "Projects Delivered", icon: "🚀" },
  { value: "4+", label: "Certifications", icon: "🎓" },
];

const experienceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  name: "Work Experience & Achievements - Rohit Shrestha",
  description:
    "Professional work experience, certifications, and awards of Rohit Shrestha, Fullstack Developer.",
  mainEntity: {
    "@type": "Person",
    name: "Rohit Shrestha",
    jobTitle: "Fullstack Developer",
    hasCredential: achievementsData
      .filter((a) => a.category === "certification")
      .map((c) => ({
        "@type": "EducationalOccupationalCredential",
        name: c.title,
        recognizedBy: {
          "@type": "Organization",
          name: c.issuer,
        },
        url: c.link,
      })),
  },
};

export default function ExperiencePage() {
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true });
  const certifications = achievementsData.filter(
    (a) => a.category === "certification",
  );
  const awards = achievementsData.filter((a) => a.category === "award");

  return (
    <main>
      <SEO
        title="Experience & Achievements | Rohit Shrestha - Fullstack Developer"
        description="Professional experience timeline, certifications, and awards of Rohit Shrestha – Fullstack Developer specializing in React, TypeScript, TanStack, and Node.js."
        keywords="Rohit Shrestha Experience, Work History, Developer Certifications, Awards, Fullstack Engineer Nepal"
        path="/experience"
        schema={experienceSchema}
      />

      {/* ── Page Header ── */}
      <div className="page-header relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-accent-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="section-container text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block font-mono text-xs text-accent-500 tracking-[0.2em] uppercase mb-3 px-3.5 py-1 bg-accent-50 dark:bg-accent-500/10 rounded-full border border-accent-200 dark:border-accent-500/20 font-semibold">
              Career Journey &amp; Milestones
            </span>
            <h1 className="section-title text-gray-900 dark:text-white">
              Experience &amp;{" "}
              <span className="gradient-text">Achievements</span>
            </h1>
            <p className="text-gray-600 dark:text-gray-400 max-w-lg mx-auto text-sm sm:text-base leading-relaxed">
              A comprehensive timeline of my professional roles, engineering achievements, and certifications that define my technical expertise.
            </p>
            <div className="w-16 h-1 bg-gradient-to-r from-accent-500 to-blue-400 rounded-full mx-auto mt-5" />

            {/* Resume Download Action Bar */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <a
                href={personal.resume}
                download="Rohit_Shrestha_Fullstack_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary py-2.5 px-5 text-xs sm:text-sm shadow-md shadow-accent-500/25"
              >
                <Download size={15} /> Download Latest Resume (PDF)
              </a>
              <a
                href={personal.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary py-2.5 px-5 text-xs sm:text-sm"
              >
                <FileText size={15} /> View Full Resume
              </a>
            </div>
          </motion.div>
        </div>

        {/* Quick stats bar: 2 cols on mobile, 4 cols on sm+ */}
        <motion.div
          className="section-container mt-8 sm:mt-10 relative z-10"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto">
            {statItems.map((s, i) => (
              <motion.div
                key={s.label}
                className="glass-card px-3 py-3 rounded-2xl text-center group hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.06 }}
              >
                <div className="text-lg sm:text-xl mb-1">{s.icon}</div>
                <div className="font-display text-xl sm:text-2xl font-bold gradient-text">
                  {s.value}
                </div>
                <div className="text-[10px] sm:text-[11px] text-gray-500 dark:text-gray-400 uppercase tracking-wider mt-0.5">
                  {s.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── Work Experience Timeline ── */}
      <section className="py-16 sm:py-20 bg-white dark:bg-dark-900" ref={ref}>
        <div className="section-container">
          {/* Section label */}
          <motion.div
            className="flex items-center gap-3.5 mb-10 sm:mb-14"
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            custom={0}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-500 to-blue-600 flex items-center justify-center shadow-lg shadow-accent-500/25 flex-shrink-0">
              <Briefcase size={18} className="text-white" />
            </div>
            <div>
              <h2 className="font-display text-2xl font-bold text-gray-900 dark:text-white leading-tight">
                Work Experience
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                Full-time positions, internships &amp; technical instruction
              </p>
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-accent-500/30 to-transparent ml-4 hidden sm:block" />
          </motion.div>

          {/* Timeline */}
          <div className="relative max-w-3xl mx-auto mb-20">
            {/* Vertical line: placed at left-4 on mobile, left-5 on sm+ */}
            <motion.div
              className="absolute left-4 sm:left-5 top-2 bottom-2 w-0.5 bg-gradient-to-b from-accent-500 via-accent-400/40 to-transparent"
              initial={{ scaleY: 0 }}
              animate={inView ? { scaleY: 1 } : {}}
              transition={{ duration: 1.2, ease: "easeOut" }}
              style={{ transformOrigin: "top" }}
            />

            <div className="space-y-8 sm:space-y-10">
              {experienceData.map((exp, i) => (
                <motion.div
                  key={exp.id}
                  className="relative flex items-start gap-4 sm:gap-6"
                  variants={fadeLeft}
                  initial="hidden"
                  animate={inView ? "visible" : "hidden"}
                  custom={i}
                >
                  {/* Timeline dot */}
                  <div className="relative flex-shrink-0 w-8 sm:w-10 flex flex-col items-center">
                    <motion.div
                      className={`w-4 h-4 rounded-full bg-gradient-to-br ${exp.color} ring-4 ring-white dark:ring-dark-900 shadow-md z-10 mt-5`}
                      initial={{ scale: 0 }}
                      animate={inView ? { scale: 1 } : {}}
                      transition={{
                        delay: 0.2 + i * 0.1,
                        type: "spring",
                        bounce: 0.4,
                      }}
                    />
                  </div>

                  {/* Experience Card */}
                  <motion.div
                    className="flex-1 glass-card p-5 sm:p-6 rounded-2xl hover:shadow-xl transition-all duration-300 group border border-gray-200/60 dark:border-white/5"
                    whileHover={{ y: -2 }}
                  >
                    {/* Header */}
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-xl bg-gradient-to-br ${exp.color} flex items-center justify-center flex-shrink-0 shadow-md`}
                        >
                          <Briefcase size={17} className="text-white" />
                        </div>
                        <div>
                          <span
                            className={`inline-block px-2.5 py-0.5 text-[10px] font-bold rounded-full bg-gradient-to-r ${exp.color} text-white uppercase tracking-wider mb-1`}
                          >
                            {exp.type}
                          </span>
                          <h3 className="font-display font-bold text-base sm:text-lg text-gray-900 dark:text-white leading-snug">
                            {exp.role}
                          </h3>
                          <p className="text-accent-500 dark:text-accent-400 font-semibold text-sm">
                            {exp.company}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Metadata */}
                    <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 dark:text-gray-400 mb-3 pb-3 border-b border-gray-100 dark:border-dark-700">
                      <span className="flex items-center gap-1.5 font-medium">
                        <Calendar size={12} className="text-accent-400" />
                        {exp.duration}
                      </span>
                      <span className="flex items-center gap-1.5 font-medium">
                        <MapPin size={12} className="text-accent-400" />
                        {exp.location}
                      </span>
                    </div>

                    {/* Bullet Points */}
                    <ul className="space-y-2 mb-4">
                      {exp.description.map((item, j) => (
                        <li
                          key={j}
                          className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-accent-500 mt-2 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Tech Chips */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {exp.tech.map((t) => (
                        <span
                          key={t}
                          className="px-2.5 py-1 text-[11px] font-medium bg-accent-50 dark:bg-accent-500/10 text-accent-700 dark:text-accent-300 rounded-lg border border-accent-100 dark:border-accent-500/20"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ── Certifications & Awards Section ── */}
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-10">
            {/* Awards Column */}
            <div>
              <motion.div
                className="flex items-center gap-3 mb-6"
                variants={fadeUp}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                custom={0}
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/25 flex-shrink-0">
                  <Award size={18} className="text-white" />
                </div>
                <div>
                  <h2 className="font-display text-xl font-bold text-gray-900 dark:text-white">
                    Awards &amp; Recognition
                  </h2>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    Academic excellence &amp; competition wins
                  </p>
                </div>
              </motion.div>

              <div className="space-y-3">
                {awards.map((award, i) => (
                  <motion.div
                    key={award.title}
                    className="glass-card p-4 rounded-2xl flex items-start gap-3.5 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 group border-l-4 border-amber-400 border border-gray-200/60 dark:border-white/5"
                    variants={fadeUp}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    custom={i * 0.1}
                  >
                    <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-500/10 flex items-center justify-center text-xl flex-shrink-0 group-hover:scale-105 transition-transform duration-200">
                      {award.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <Star
                          size={11}
                          fill="currentColor"
                          className="text-amber-400 flex-shrink-0"
                        />
                        <h4 className="font-semibold text-gray-900 dark:text-white text-sm leading-snug">
                          {award.title}
                        </h4>
                      </div>
                      <p className="text-xs text-amber-600 dark:text-amber-400 font-medium">
                        {award.issuer}
                      </p>
                      <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1">
                        {award.description}
                      </p>
                      <span className="inline-block text-[10px] font-mono text-gray-400 dark:text-gray-500 mt-1">
                        {award.date}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Certifications Column */}
            <div>
              <motion.div
                className="flex items-center gap-3 mb-6"
                variants={fadeUp}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                custom={0}
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-500 to-blue-600 flex items-center justify-center shadow-lg shadow-accent-500/25 flex-shrink-0">
                  <BookOpen size={18} className="text-white" />
                </div>
                <div>
                  <h2 className="font-display text-xl font-bold text-gray-900 dark:text-white">
                    Certifications
                  </h2>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    Verified industry courses &amp; credentials
                  </p>
                </div>
              </motion.div>

              <div className="space-y-3">
                {certifications.map((cert, i) => (
                  <motion.div
                    key={cert.title}
                    className="glass-card p-4 rounded-2xl flex items-start gap-3.5 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 group border border-gray-200/60 dark:border-white/5"
                    variants={fadeUp}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    custom={i * 0.1}
                  >
                    <div className="w-10 h-10 rounded-xl bg-accent-50 dark:bg-accent-500/10 flex items-center justify-center text-xl flex-shrink-0 group-hover:scale-105 transition-transform duration-200">
                      {cert.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900 dark:text-white text-sm leading-snug">
                        {cert.title}
                      </h4>
                      <p className="text-xs text-accent-500 font-medium mt-0.5">
                        {cert.issuer}
                      </p>
                      <div className="flex flex-wrap items-center gap-2 mt-1">
                        <span className="text-[11px] text-gray-400 dark:text-gray-500">
                          {cert.date}
                        </span>
                        {cert.credentialId && (
                          <span className="text-[10px] font-mono px-1.5 py-0.5 bg-gray-100 dark:bg-dark-700 text-gray-600 dark:text-gray-400 rounded">
                            ID: {cert.credentialId}
                          </span>
                        )}
                      </div>
                    </div>
                    {cert.link && cert.link !== "#" && (
                      <a
                        href={cert.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-dark-700 flex items-center justify-center text-gray-400 hover:bg-accent-500 hover:text-white transition-all flex-shrink-0"
                        aria-label="Verify credential"
                      >
                        <ExternalLink size={13} />
                      </a>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
