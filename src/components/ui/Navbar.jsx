import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Moon, Sun, Menu, X, Github, Linkedin, FileText, Download } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { useThemeStore, usePortfolioStore } from '../../store/useStore'
import personal from '../../data/personal.json'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/projects', label: 'Projects' },
  { to: '/experience', label: 'Experience' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const { isDark, toggleTheme } = useThemeStore()
  const { isMenuOpen, setMenuOpen } = usePortfolioStore()
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname, setMenuOpen])

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])

  const isActive = (to) => (to === '/' ? location.pathname === '/' : location.pathname.startsWith(to))

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 dark:bg-dark-900/95 backdrop-blur-md shadow-md shadow-black/5 border-b border-gray-200/60 dark:border-white/10 py-2.5'
            : 'bg-transparent py-4'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <div className="section-container">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 group py-1">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent-500 via-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-accent-500/25 group-hover:scale-105 transition-transform duration-200">
                <span className="font-display text-lg font-bold text-white">R</span>
              </div>
              <div className="flex flex-col">
                <span className="font-display text-lg font-bold tracking-tight text-gray-900 dark:text-white leading-none">
                  Rohit<span className="text-accent-500">.</span>
                </span>
                <span className="text-[10px] font-mono text-accent-500 dark:text-accent-400 font-medium">
                  Fullstack Dev
                </span>
              </div>
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-1 bg-gray-100/70 dark:bg-dark-800/70 backdrop-blur-md px-2.5 py-1.5 rounded-full border border-gray-200/50 dark:border-white/5">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 ${
                    isActive(link.to)
                      ? 'text-white bg-accent-500 shadow-sm shadow-accent-500/30'
                      : 'text-gray-600 dark:text-gray-300 hover:text-accent-500 dark:hover:text-white hover:bg-white/60 dark:hover:bg-dark-700/60'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              {/* Resume CTA (Desktop) */}
              <a
                href={personal.resume}
                download="Rohit_Shrestha_Fullstack_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-accent-50 hover:bg-accent-100 dark:bg-accent-500/10 dark:hover:bg-accent-500/20 text-accent-600 dark:text-accent-400 border border-accent-200 dark:border-accent-500/20 transition-all duration-200"
                aria-label="Download Resume"
              >
                <Download size={13} />
                <span>Resume</span>
              </a>

              {/* GitHub */}
              <a
                href={personal.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Rohit Shrestha GitHub Profile"
                className="p-2 rounded-xl text-gray-600 dark:text-gray-400 hover:text-accent-500 hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors hidden sm:flex"
              >
                <Github size={18} />
              </a>

              {/* LinkedIn */}
              <a
                href={personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Rohit Shrestha LinkedIn Profile"
                className="p-2 rounded-xl text-gray-600 dark:text-gray-400 hover:text-accent-500 hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors hidden sm:flex"
              >
                <Linkedin size={18} />
              </a>

              {/* Theme Toggle */}
              <motion.button
                onClick={toggleTheme}
                aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                className="p-2 rounded-xl text-gray-600 dark:text-gray-400 hover:text-accent-500 hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors"
                whileTap={{ scale: 0.9 }}
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={isDark ? 'sun' : 'moon'}
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {isDark ? <Sun size={18} /> : <Moon size={18} />}
                  </motion.div>
                </AnimatePresence>
              </motion.button>

              {/* Mobile Menu Button */}
              <motion.button
                onClick={() => setMenuOpen(!isMenuOpen)}
                aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                className="md:hidden p-2 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors"
                whileTap={{ scale: 0.9 }}
              >
                {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setMenuOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              className="absolute top-16 left-3 right-3 sm:left-4 sm:right-4 bg-white dark:bg-dark-800 rounded-3xl shadow-2xl border border-gray-200/80 dark:border-dark-600 p-5 max-h-[calc(100vh-5rem)] overflow-y-auto"
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              {/* Profile pill in mobile menu */}
              <div className="flex items-center gap-3 pb-4 mb-3 border-b border-gray-100 dark:border-dark-700">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-500 to-blue-600 flex items-center justify-center text-white font-display font-bold">
                  R
                </div>
                <div>
                  <div className="font-display font-bold text-sm text-gray-900 dark:text-white">
                    Rohit Shrestha
                  </div>
                  <div className="text-xs text-accent-500 font-medium">
                    Fullstack Developer • Nepal
                  </div>
                </div>
              </div>

              {/* Navigation links */}
              <div className="space-y-1 mb-4">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.to}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                  >
                    <Link
                      to={link.to}
                      onClick={() => setMenuOpen(false)}
                      className={`flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-semibold transition-all ${
                        isActive(link.to)
                          ? 'bg-accent-500 text-white shadow-md shadow-accent-500/25'
                          : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-dark-700'
                      }`}
                    >
                      <span>{link.label}</span>
                      {isActive(link.to) && (
                        <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                      )}
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Resume download button in mobile drawer */}
              <a
                href={personal.resume}
                download="Rohit_Shrestha_Fullstack_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-gradient-to-r from-accent-500 to-blue-600 text-white text-sm font-bold shadow-lg shadow-accent-500/25 mb-3"
              >
                <Download size={16} /> Download Resume (PDF)
              </a>

              {/* Social links */}
              <div className="grid grid-cols-2 gap-2 pt-3 border-t border-gray-100 dark:border-dark-700">
                <a
                  href={personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gray-50 dark:bg-dark-700/80 text-gray-700 dark:text-gray-300 text-xs font-semibold hover:bg-gray-100 dark:hover:bg-dark-600 transition-colors"
                >
                  <Github size={15} /> GitHub
                </a>
                <a
                  href={personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gray-50 dark:bg-dark-700/80 text-gray-700 dark:text-gray-300 text-xs font-semibold hover:bg-gray-100 dark:hover:bg-dark-600 transition-colors"
                >
                  <Linkedin size={15} /> LinkedIn
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
