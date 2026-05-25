import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react'
import testimonialsData from '../../data/testimonials.json'

export default function Testimonials() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })

  const navigate = (dir) => {
    setDirection(dir)
    setCurrent(prev => (prev + dir + testimonialsData.length) % testimonialsData.length)
  }

  const t = testimonialsData[current]

  return (
    <section id="testimonials" className="py-24 bg-gray-50/80 dark:bg-dark-800" ref={ref}>
      <div className="section-container">
        <motion.div className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <span className="inline-block font-mono text-sm text-accent-500 tracking-widest uppercase mb-3">What people say</span>
          <h2 className="section-title text-gray-900 dark:text-white">Client <span className="gradient-text">Testimonials</span></h2>
          <div className="w-16 h-1 bg-gradient-to-r from-accent-500 to-blue-400 rounded-full mx-auto" />
        </motion.div>

        <motion.div className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }}>
          <div className="relative">
            <div className="absolute -top-6 -left-6 text-accent-500/10">
              <Quote size={80} />
            </div>
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div key={current} custom={direction}
                initial={{ opacity: 0, x: direction * 60 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -direction * 60 }}
                transition={{ duration: 0.4 }}
                className="glass-card p-8 md:p-12 rounded-3xl text-center relative">
                <div className="flex justify-center gap-1 mb-6">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} size={18} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <blockquote className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-8 italic">
                  "{t.text}"
                </blockquote>
                <div className="flex items-center justify-center gap-4">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${t.color} flex items-center justify-center shadow-lg`}>
                    <span className="font-display text-xl font-bold text-white">{t.avatar}</span>
                  </div>
                  <div className="text-left">
                    <div className="font-display font-bold text-gray-900 dark:text-white">{t.name}</div>
                    <div className="text-sm text-accent-500 font-medium">{t.role}</div>
                    <div className="text-xs text-gray-500">{t.company}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex items-center justify-center gap-4 mt-8">
              <button onClick={() => navigate(-1)}
                className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-dark-700 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-accent-500 hover:text-white transition-all duration-200">
                <ChevronLeft size={20} />
              </button>
              <div className="flex gap-2">
                {testimonialsData.map((_, i) => (
                  <button key={i} onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i) }}
                    className={`rounded-full transition-all duration-300 ${i === current ? 'w-8 h-2.5 bg-accent-500' : 'w-2.5 h-2.5 bg-gray-200 dark:bg-dark-600'}`} />
                ))}
              </div>
              <button onClick={() => navigate(1)}
                className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-dark-700 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-accent-500 hover:text-white transition-all duration-200">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
