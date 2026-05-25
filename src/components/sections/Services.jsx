import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Check } from 'lucide-react'
import { Link } from 'react-router-dom'
import servicesData from '../../data/services.json'

export default function Services() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section id="services" className="py-24 bg-white dark:bg-dark-900" ref={ref}>
      <div className="section-container">
        <motion.div className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <span className="inline-block font-mono text-sm text-accent-500 tracking-widest uppercase mb-3">What I offer</span>
          <h2 className="section-title text-gray-900 dark:text-white">My <span className="gradient-text">Services</span></h2>
          <div className="w-16 h-1 bg-gradient-to-r from-accent-500 to-blue-400 rounded-full mx-auto mb-6" />
          <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
            End-to-end development services tailored to bring your vision to life.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {servicesData.map((service, i) => (
            <motion.div key={service.title}
              className="group relative glass-card p-6 rounded-2xl overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-default"
              initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}>
              <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 dark:group-hover:opacity-10 transition-opacity duration-400 rounded-2xl`} />
              <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${service.color} scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left`} />
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center text-2xl mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                {service.icon}
              </div>
              <h3 className="font-display text-lg font-bold text-gray-900 dark:text-white mb-3">{service.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-5">{service.description}</p>
              <ul className="space-y-2">
                {service.features.map(feat => (
                  <li key={feat} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <div className={`w-4 h-4 rounded-full bg-gradient-to-br ${service.color} flex items-center justify-center flex-shrink-0`}>
                      <Check size={10} className="text-white" />
                    </div>
                    {feat}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* CTA Banner */}
        <motion.div
          className="mt-16 relative overflow-hidden rounded-3xl bg-gradient-to-r from-accent-500 via-blue-500 to-accent-600 p-8 md:p-12 text-center"
          initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.5 }}>
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-white blur-3xl" />
          </div>
          <div className="relative">
            <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-3">Have a project in mind?</h3>
            <p className="text-white/80 mb-8 max-w-md mx-auto">
              Let's collaborate and build something amazing together.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link to="/contact"
                className="px-8 py-3 bg-white text-accent-500 font-semibold rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200">
                Start a Project
              </Link>
              <a href="https://www.linkedin.com/in/rohitshrestha533" target="_blank" rel="noopener noreferrer"
                className="px-8 py-3 bg-white/10 text-white font-semibold rounded-xl border border-white/30 hover:bg-white/20 hover:-translate-y-0.5 transition-all duration-200 backdrop-blur-sm">
                Connect on LinkedIn
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
