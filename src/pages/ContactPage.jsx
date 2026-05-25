import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Mail, Phone, MapPin, Send, Github, Linkedin, CheckCircle, AlertCircle } from 'lucide-react'
import personal from '../data/personal.json'
import { useForm } from '../hooks/usePortfolio'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.55, delay: i * 0.1 } })
}

export default function ContactPage() {
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true })
  const [status, setStatus] = useState(null)

  const { values, errors, setErrors, isSubmitting, setIsSubmitting, handleChange, validate, reset } = useForm({
    name: '', email: '', subject: '', message: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate(values)
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setIsSubmitting(true)
    await new Promise(r => setTimeout(r, 2000))
    setStatus('success')
    setIsSubmitting(false)
    reset()
    setTimeout(() => setStatus(null), 5000)
  }

  const contactItems = [
    { icon: Mail, label: 'Email', value: personal.email, href: `mailto:${personal.email}` },
    { icon: Phone, label: 'Phone', value: personal.phone, href: `tel:${personal.phone}` },
    { icon: MapPin, label: 'Location', value: personal.location, href: '#' },
  ]

  return (
    <main>
      <div className="page-header">
        <div className="section-container text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-block font-mono text-sm text-accent-500 tracking-widest uppercase mb-3">Get in touch</span>
            <h1 className="section-title text-gray-900 dark:text-white">
              Contact <span className="gradient-text">Me</span>
            </h1>
            <div className="w-16 h-1 bg-gradient-to-r from-accent-500 to-blue-400 rounded-full mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
              Have a project in mind? I'm always open to new opportunities and collaborations.
            </p>
          </motion.div>
        </div>
      </div>

      <section className="py-16 bg-white dark:bg-dark-900" ref={ref}>
        <div className="section-container">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Info */}
            <motion.div
              className="lg:col-span-2 space-y-6"
              variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={0}
            >
              <div>
                <h2 className="font-display text-2xl font-bold text-gray-900 dark:text-white mb-3">Let's talk!</h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Whether you need a full-stack developer, a data-driven application, or just want to connect — my inbox is always open.
                </p>
              </div>

              <div className="space-y-3">
                {contactItems.map(({ icon: Icon, label, value, href }) => (
                  <a key={label} href={href}
                    className="flex items-center gap-4 p-4 glass-card rounded-2xl hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
                    <div className="w-10 h-10 rounded-xl bg-accent-50 dark:bg-accent-500/10 flex items-center justify-center group-hover:bg-accent-500 transition-colors duration-300">
                      <Icon size={17} className="text-accent-500 group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 font-medium">{label}</div>
                      <div className="text-sm font-semibold text-gray-900 dark:text-white">{value}</div>
                    </div>
                  </a>
                ))}
              </div>

              <div>
                <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Find me on</h4>
                <div className="flex gap-3">
                  {[
                    { href: personal.github, Icon: Github, label: 'GitHub' },
                    { href: personal.linkedin, Icon: Linkedin, label: 'LinkedIn' },
                  ].map(({ href, Icon, label }) => (
                    <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 py-3 glass-card rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-accent-500 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200">
                      <Icon size={16} /> {label}
                    </a>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 rounded-2xl bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20">
                <span className="w-3 h-3 rounded-full bg-green-400 animate-pulse flex-shrink-0" />
                <div>
                  <div className="text-sm font-semibold text-green-700 dark:text-green-400">Available for work</div>
                  <div className="text-xs text-green-600 dark:text-green-500">Open to remote & on-site opportunities</div>
                </div>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              className="lg:col-span-3"
              variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={1}
            >
              <div className="glass-card p-8 rounded-3xl">
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Full Name *</label>
                      <input type="text" name="name" value={values.name} onChange={handleChange}
                        placeholder="John Doe"
                        className={`w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-dark-700 border text-gray-900 dark:text-white placeholder-gray-400 text-sm outline-none transition-all focus:ring-2 focus:ring-accent-500/30 ${errors.name ? 'border-red-400' : 'border-gray-200 dark:border-dark-600 focus:border-accent-500'}`} />
                      {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email *</label>
                      <input type="email" name="email" value={values.email} onChange={handleChange}
                        placeholder="john@example.com"
                        className={`w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-dark-700 border text-gray-900 dark:text-white placeholder-gray-400 text-sm outline-none transition-all focus:ring-2 focus:ring-accent-500/30 ${errors.email ? 'border-red-400' : 'border-gray-200 dark:border-dark-600 focus:border-accent-500'}`} />
                      {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Subject</label>
                    <input type="text" name="subject" value={values.subject} onChange={handleChange}
                      placeholder="Project discussion, Job opportunity..."
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-dark-700 border border-gray-200 dark:border-dark-600 focus:border-accent-500 text-gray-900 dark:text-white placeholder-gray-400 text-sm outline-none transition-all focus:ring-2 focus:ring-accent-500/30" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Message *</label>
                    <textarea name="message" value={values.message} onChange={handleChange} rows={5}
                      placeholder="Tell me about your project..."
                      className={`w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-dark-700 border text-gray-900 dark:text-white placeholder-gray-400 text-sm outline-none transition-all focus:ring-2 focus:ring-accent-500/30 resize-none ${errors.message ? 'border-red-400' : 'border-gray-200 dark:border-dark-600 focus:border-accent-500'}`} />
                    {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
                  </div>

                  {status === 'success' && (
                    <motion.div
                      className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20 rounded-xl text-green-700 dark:text-green-400 text-sm"
                      initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                    >
                      <CheckCircle size={16} /> Message sent! I'll get back to you soon.
                    </motion.div>
                  )}

                  <button type="submit" disabled={isSubmitting}
                    className="w-full btn-primary justify-center disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0">
                    {isSubmitting ? (
                      <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Sending...</>
                    ) : (
                      <><Send size={17} /> Send Message</>
                    )}
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  )
}
