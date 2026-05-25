import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Moon, Sun, Menu, X, Github, Linkedin } from 'lucide-react'
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

  // close menu on route change
  useEffect(() => { setMenuOpen(false) }, [location.pathname, setMenuOpen])

  const isActive = (to) => to === '/' ? location.pathname === '/' : location.pathname.startsWith(to)

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-white/90 dark:bg-dark-900/90 backdrop-blur-xl shadow-lg shadow-black/5 border-b border-gray-100/50 dark:border-white/5'
            : 'bg-transparent'
        }`}
        initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent-500 to-blue-600 flex items-center justify-center shadow-lg shadow-accent-500/30 group-hover:shadow-accent-500/50 transition-shadow">
                <span className="font-display text-lg font-bold text-white">R</span>
              </div>
              <span className="font-display text-lg font-bold hidden sm:block">
                <span className="text-gray-900 dark:text-white">Rohit</span>
                <span className="text-accent-500">.</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map(link => (
                <Link key={link.to} to={link.to}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive(link.to)
                      ? 'text-accent-500 dark:text-accent-400 bg-accent-50 dark:bg-accent-500/10'
                      : 'text-gray-600 dark:text-gray-400 hover:text-accent-500 dark:hover:text-accent-400 hover:bg-gray-50 dark:hover:bg-dark-700/50'
                  }`}>
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-1.5">
              <a href={personal.github} target="_blank" rel="noopener noreferrer"
                className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:text-accent-500 hover:bg-gray-100 dark:hover:bg-dark-700 transition-all duration-200 hidden sm:flex">
                <Github size={18} />
              </a>
              <a href={personal.linkedin} target="_blank" rel="noopener noreferrer"
                className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:text-accent-500 hover:bg-gray-100 dark:hover:bg-dark-700 transition-all duration-200 hidden sm:flex">
                <Linkedin size={18} />
              </a>
              <motion.button onClick={toggleTheme}
                className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:text-accent-500 hover:bg-gray-100 dark:hover:bg-dark-700 transition-all duration-200"
                whileTap={{ scale: 0.9 }}>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div key={isDark ? 'sun' : 'moon'}
                    initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}>
                    {isDark ? <Sun size={18} /> : <Moon size={18} />}
                  </motion.div>
                </AnimatePresence>
              </motion.button>
              <motion.button onClick={() => setMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-700 transition-all"
                whileTap={{ scale: 0.9 }}>
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMenuOpen(false)} />
            <motion.div
              className="absolute top-16 left-4 right-4 bg-white dark:bg-dark-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-dark-600 p-4"
              initial={{ opacity: 0, y: -20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }} transition={{ duration: 0.2 }}>
              {navLinks.map((link, i) => (
                <motion.div key={link.to} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                  <Link to={link.to}
                    className={`block w-full text-left px-4 py-3 rounded-xl mb-1 text-sm font-medium transition-all ${
                      isActive(link.to)
                        ? 'bg-accent-50 dark:bg-accent-500/10 text-accent-500'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-700'
                    }`}>
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <div className="flex gap-2 mt-3 pt-3 border-t border-gray-100 dark:border-dark-600">
                <a href={personal.github} target="_blank" rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gray-50 dark:bg-dark-700 text-gray-700 dark:text-gray-300 text-sm font-medium">
                  <Github size={16} /> GitHub
                </a>
                <a href={personal.linkedin} target="_blank" rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gray-50 dark:bg-dark-700 text-gray-700 dark:text-gray-300 text-sm font-medium">
                  <Linkedin size={16} /> LinkedIn
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
