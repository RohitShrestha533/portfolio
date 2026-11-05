import { motion } from 'framer-motion'
import { Github, Linkedin, Heart, ArrowUp, Mail, Download, MapPin, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import personal from '../../data/personal.json'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/projects', label: 'Projects' },
  { to: '/experience', label: 'Experience' },
  { to: '/contact', label: 'Contact' },
]

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-dark-900 text-gray-400 pt-16 pb-8 border-t border-white/5 relative overflow-hidden">
      <div className="section-container">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 mb-12">
          {/* Col 1: Brand & Bio */}
          <div>
            <Link to="/" className="flex items-center gap-2.5 mb-3 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent-500 via-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-md">
                <span className="font-display text-lg font-bold">R</span>
              </div>
              <span className="font-display text-xl font-bold text-white tracking-tight">
                Rohit<span className="text-accent-500">.</span>
              </span>
            </Link>
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed mb-4">
              Fullstack Developer &amp; Dean's List graduate (3.76 CGPA). Crafting responsive, scalable web platforms and SaaS solutions.
            </p>
            <div className="flex items-center gap-2">
              <a
                href={personal.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="w-9 h-9 rounded-xl bg-dark-800 border border-white/5 flex items-center justify-center text-gray-400 hover:bg-accent-500 hover:text-white transition-all shadow-sm"
              >
                <Github size={16} />
              </a>
              <a
                href={personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="w-9 h-9 rounded-xl bg-dark-800 border border-white/5 flex items-center justify-center text-gray-400 hover:bg-accent-500 hover:text-white transition-all shadow-sm"
              >
                <Linkedin size={16} />
              </a>
              <a
                href={`mailto:${personal.email}`}
                aria-label="Email Rohit"
                className="w-9 h-9 rounded-xl bg-dark-800 border border-white/5 flex items-center justify-center text-gray-400 hover:bg-accent-500 hover:text-white transition-all shadow-sm"
              >
                <Mail size={16} />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider mb-4">
              Navigation
            </h4>
            <ul className="space-y-2">
              {navLinks.map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-xs sm:text-sm text-gray-400 hover:text-accent-400 transition-colors inline-block"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Core Competencies */}
          <div>
            <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider mb-4">
              Specialties
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {[
                'React.js',
                'TypeScript',
                'TanStack Query',
                'Zustand',
                'Node.js',
                'REST APIs',
                'Tailwind CSS',
                'React Native',
                'SaaS & LMS',
                'CI/CD Workflows',
              ].map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 text-[11px] rounded-lg bg-dark-800 text-gray-300 border border-white/5"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Col 4: Contact & Resume */}
          <div>
            <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider mb-4">
              Contact &amp; Resume
            </h4>
            <div className="space-y-2 text-xs sm:text-sm text-gray-400 mb-4">
              <p className="flex items-center gap-2 truncate">
                <Mail size={13} className="text-accent-500 flex-shrink-0" />
                <a href={`mailto:${personal.email}`} className="hover:text-accent-400 transition-colors">
                  {personal.email}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <MapPin size={13} className="text-accent-500 flex-shrink-0" />
                <span>{personal.location}</span>
              </p>
            </div>
            <a
              href={personal.resume}
              download="Rohit_Shrestha_Fullstack_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-accent-500 hover:bg-accent-600 text-white text-xs font-bold transition-all shadow-md shadow-accent-500/20"
            >
              <Download size={14} /> Download Resume (PDF)
            </a>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-8 border-t border-dark-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>
            &copy; {new Date().getFullYear()} Rohit Shrestha. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              Built with React &amp; Tailwind CSS
            </span>
            <button
              onClick={scrollToTop}
              aria-label="Back to top"
              className="p-2 rounded-xl bg-dark-800 hover:bg-accent-500 hover:text-white text-gray-400 transition-all flex items-center gap-1.5"
            >
              <span>Top</span>
              <ArrowUp size={13} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
