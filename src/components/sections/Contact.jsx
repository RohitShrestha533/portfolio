import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Github,
  Linkedin,
  CheckCircle2,
  AlertCircle,
  Download,
  FileText,
} from 'lucide-react'
import personal from '../../data/personal.json'
import { useForm } from '../../hooks/usePortfolio'

export default function Contact() {
  const [ref, inView] = useInView({ threshold: 0.08, triggerOnce: true })
  const [status, setStatus] = useState(null)

  const contactItems = [
    {
      icon: Mail,
      label: 'Email',
      value: personal.email,
      href: `mailto:${personal.email}`,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: personal.phone,
      href: `tel:${personal.phone.replace(/\s+/g, '')}`,
      color: 'from-emerald-500 to-teal-500',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: personal.location,
      href: 'https://maps.google.com/?q=Bharatpur+Chitwan+Nepal',
      color: 'from-purple-500 to-indigo-500',
    },
  ]

  const {
    values,
    errors,
    setErrors,
    isSubmitting,
    setIsSubmitting,
    handleChange,
    validate,
    reset,
  } = useForm({
    name: '',
    email: '',
    organization: '',
    subject: '',
    message: '',
  })

  const handleSubmit = async (e) => {
    e.preventDefault()

    const errs = validate(values)
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }

    setIsSubmitting(true)
    setStatus(null)

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key:
            import.meta.env.VITE_WEB3FORMS_KEY ||
            '55d570b2-e1af-42a8-80ba-7e3e4f854339',
          name: values.name,
          email: values.email,
          organization: values.organization,
          subject: values.subject || `New Contact Message from ${values.name}`,
          message: values.message,
          from_name: values.name,
        }),
      })

      const data = await response.json()

      if (data.success) {
        setStatus({
          type: 'success',
          message: 'Thank you! Your message has been sent successfully. I will get back to you shortly.',
        })
        reset()
      } else {
        setStatus({
          type: 'error',
          message: data.message || 'Something went wrong. Please reach out directly via email.',
        })
      }
    } catch (err) {
      setStatus({
        type: 'error',
        message: 'Network error. Please check your connection or email me directly.',
      })
    } finally {
      setIsSubmitting(false)
      setTimeout(() => setStatus(null), 7000)
    }
  }

  return (
    <section id="contact" className="py-20 sm:py-24 bg-white dark:bg-dark-900" ref={ref}>
      <div className="section-container">
        {/* Header */}
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block font-mono text-xs sm:text-sm text-accent-500 dark:text-accent-400 tracking-widest uppercase mb-2 px-3.5 py-1 bg-accent-50 dark:bg-accent-500/10 rounded-full border border-accent-200 dark:border-accent-500/20 font-semibold">
            Get in touch
          </span>
          <h2 className="section-title text-gray-900 dark:text-white">
            Let's <span className="gradient-text">Connect</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-accent-500 to-blue-400 rounded-full mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
            Have an open role, an exciting project, or want to discuss modern fullstack architecture? Drop a message and let's talk.
          </p>
        </motion.div>

        {/* Content: 1 col on mobile/tablet, 5 cols grid on lg */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 max-w-5xl mx-auto">
          {/* Left Column: Direct Info (2 cols on lg) */}
          <motion.div
            className="lg:col-span-2 space-y-6"
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div>
              <h3 className="font-display text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Let's build something together
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                Whether you need a fullstack engineer, high-performance React frontends, or robust API backends, I'm always open to discuss opportunities.
              </p>
            </div>

            {/* Contact Information Cards */}
            <div className="space-y-3">
              {contactItems.map(({ icon: Icon, label, value, href, color }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="flex items-center gap-3.5 p-3.5 sm:p-4 glass-card rounded-2xl hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 group border border-gray-200/60 dark:border-white/5"
                >
                  <div
                    className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-white flex-shrink-0 shadow-md group-hover:scale-105 transition-transform duration-200`}
                  >
                    <Icon size={18} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[11px] font-medium text-gray-500 dark:text-gray-400">
                      {label}
                    </div>
                    <div className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white truncate group-hover:text-accent-500 transition-colors">
                      {value}
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {/* Social Channels */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gray-50/70 dark:bg-dark-800/60 border border-gray-200/60 dark:border-dark-700">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3 font-mono">
                Connect Across Platforms
              </h4>
              <div className="flex flex-wrap gap-2">
                <a
                  href={personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white dark:bg-dark-700 text-gray-700 dark:text-gray-200 text-xs font-semibold shadow-sm hover:text-accent-500 transition-colors"
                >
                  <Github size={14} /> GitHub
                </a>
                <a
                  href={personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white dark:bg-dark-700 text-gray-700 dark:text-gray-200 text-xs font-semibold shadow-sm hover:text-accent-500 transition-colors"
                >
                  <Linkedin size={14} /> LinkedIn
                </a>
                <a
                  href={personal.resume}
                  download="Rohit_Shrestha_Fullstack_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-accent-500 text-white text-xs font-bold shadow-sm hover:bg-accent-600 transition-colors"
                >
                  <Download size={14} /> Resume (PDF)
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Contact Form (3 cols on lg) */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div className="glass-card p-6 sm:p-8 rounded-3xl border border-gray-200/70 dark:border-white/5 shadow-xl">
              <h3 className="font-display text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Send a Message
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-6">
                Fill in the details below, and I'll respond within 24 hours.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                      placeholder="e.g. John Doe"
                      className={`w-full px-4 py-3 min-h-[44px] rounded-xl bg-gray-50 dark:bg-dark-700/80 border text-gray-900 dark:text-white placeholder-gray-400 text-sm outline-none transition-all focus:ring-2 focus:ring-accent-500/30 ${
                        errors.name
                          ? 'border-red-400'
                          : 'border-gray-200 dark:border-dark-600 focus:border-accent-500'
                      }`}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      placeholder="e.g. john@company.com"
                      className={`w-full px-4 py-3 min-h-[44px] rounded-xl bg-gray-50 dark:bg-dark-700/80 border text-gray-900 dark:text-white placeholder-gray-400 text-sm outline-none transition-all focus:ring-2 focus:ring-accent-500/30 ${
                        errors.email
                          ? 'border-red-400'
                          : 'border-gray-200 dark:border-dark-600 focus:border-accent-500'
                      }`}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                      Organization / Company
                    </label>
                    <input
                      type="text"
                      name="organization"
                      value={values.organization}
                      onChange={handleChange}
                      placeholder="Company or agency name"
                      className="w-full px-4 py-3 min-h-[44px] rounded-xl bg-gray-50 dark:bg-dark-700/80 border border-gray-200 dark:border-dark-600 focus:border-accent-500 text-gray-900 dark:text-white placeholder-gray-400 text-sm outline-none transition-all focus:ring-2 focus:ring-accent-500/30"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={values.subject}
                      onChange={handleChange}
                      placeholder="e.g. Job Opportunity / Fullstack Project"
                      className="w-full px-4 py-3 min-h-[44px] rounded-xl bg-gray-50 dark:bg-dark-700/80 border border-gray-200 dark:border-dark-600 focus:border-accent-500 text-gray-900 dark:text-white placeholder-gray-400 text-sm outline-none transition-all focus:ring-2 focus:ring-accent-500/30"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                    Your Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={values.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Tell me about your project, timeline, or requirements..."
                    className={`w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-dark-700/80 border text-gray-900 dark:text-white placeholder-gray-400 text-sm outline-none transition-all focus:ring-2 focus:ring-accent-500/30 resize-none ${
                      errors.message
                        ? 'border-red-400'
                        : 'border-gray-200 dark:border-dark-600 focus:border-accent-500'
                    }`}
                  />
                  {errors.message && (
                    <p className="text-red-500 text-xs mt-1">{errors.message}</p>
                  )}
                </div>

                {status?.type === 'success' && (
                  <motion.div
                    className="flex items-center gap-2 p-3.5 bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20 rounded-xl text-green-700 dark:text-green-400 text-xs sm:text-sm font-medium"
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <CheckCircle2 size={16} className="flex-shrink-0" />
                    <span>{status.message}</span>
                  </motion.div>
                )}

                {status?.type === 'error' && (
                  <motion.div
                    className="flex items-center gap-2 p-3.5 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-xl text-red-700 dark:text-red-400 text-xs sm:text-sm font-medium"
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <AlertCircle size={16} className="flex-shrink-0" />
                    <span>{status.message}</span>
                  </motion.div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary justify-center min-h-[46px] text-sm font-bold shadow-lg shadow-accent-500/20 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Sending Message...</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Send size={16} />
                      <span>Send Message</span>
                    </div>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
