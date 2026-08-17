import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Github,
  Linkedin,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import personal from "../../data/personal.json";
import { useForm } from "../../hooks/usePortfolio";

export default function Contact() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [status, setStatus] = useState(null);

  const contactItems = [
    {
      icon: Mail,
      label: "Email",
      value: personal.email,
      href: `mailto:${personal.email}`,
    },
    {
      icon: Phone,
      label: "Phone",
      value: personal.phone,
      href: `tel:${personal.phone}`,
    },
    { icon: MapPin, label: "Location", value: personal.location, href: "#" },
  ];

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
    name: "",
    email: "",
    organization: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errs = validate(values);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setIsSubmitting(true);
    setStatus(null);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_KEY,
          name: values.name,
          email: values.email,
          organization: values.organization,
          subject: values.subject || `New Contact Message from ${values.name}`,
          message: values.message,
          from_name: values.name,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setStatus({
          type: "success",
          message: "Message sent! I'll get back to you soon.",
        });
        reset();
      } else {
        setStatus({
          type: "error",
          message:
            data.message || "Something went wrong. Please try again later.",
        });
      }
    } catch (err) {
      setStatus({
        type: "error",
        message: "Network error. Please check your connection and try again.",
      });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setStatus(null), 6000);
    }
  };

  return (
    <section id="contact" className="py-24 bg-white dark:bg-dark-900" ref={ref}>
      <div className="section-container">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block font-mono text-sm text-accent-500 dark:text-accent-400 tracking-widest uppercase mb-3">
            Get in touch
          </span>
          <h2 className="section-title text-gray-900 dark:text-white">
            Let's <span className="gradient-text">Connect</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-accent-500 to-blue-400 rounded-full mx-auto mb-6" />
          <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
            Have a project in mind, an opportunity to discuss, or just want to
            say hello? My inbox is always open.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 max-w-5xl mx-auto">
          {/* Contact info */}
          <motion.div
            className="lg:col-span-2 space-y-6"
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div>
              <h3 className="font-display text-2xl font-bold text-gray-900 dark:text-white mb-3">
                Let's talk!
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                Whether you need a full-stack developer, a data-driven
                application, or just want to connect — I'm here.
              </p>
            </div>

            {/* Contact cards */}
            <div className="space-y-3">
              {contactItems.map(({ icon: Icon, label, value, href }) => (
                <a
                  key={label}
                  href={href}
                  className="flex items-center gap-4 p-4 glass-card rounded-2xl hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-accent-50 dark:bg-accent-500/10 flex items-center justify-center group-hover:bg-accent-500 transition-colors duration-300">
                    <Icon
                      size={18}
                      className="text-accent-500 group-hover:text-white transition-colors"
                    />
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 font-medium">
                      {label}
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-white">
                      {value}
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {/* Socials */}
            <div>
              <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                Find me online
              </h4>
              <div className="flex gap-3">
                {[
                  { href: personal.github, icon: Github, label: "GitHub" },
                  {
                    href: personal.linkedin,
                    icon: Linkedin,
                    label: "LinkedIn",
                  },
                ].map(({ href, icon: Icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-3 glass-card rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-accent-500 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                  >
                    <Icon size={16} />
                    {label}
                  </a>
                ))}
              </div>
            </div>

            {/* Availability badge */}
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20">
              <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse flex-shrink-0" />
              <div>
                <div className="text-sm font-semibold text-green-700 dark:text-green-400">
                  Available for opportunities
                </div>
                <div className="text-xs text-green-600 dark:text-green-500">
                  {personal.availabilityText}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="glass-card p-8 rounded-3xl">
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className={`w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-dark-700 border text-gray-900 dark:text-white placeholder-gray-400 text-sm outline-none transition-all focus:ring-2 focus:ring-accent-500/30 ${
                        errors.name
                          ? "border-red-400"
                          : "border-gray-200 dark:border-dark-600 focus:border-accent-500"
                      }`}
                    />
                    {errors.name && (
                      <p className="text-red-400 text-xs mt-1">{errors.name}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className={`w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-dark-700 border text-gray-900 dark:text-white placeholder-gray-400 text-sm outline-none transition-all focus:ring-2 focus:ring-accent-500/30 ${
                        errors.email
                          ? "border-red-400"
                          : "border-gray-200 dark:border-dark-600 focus:border-accent-500"
                      }`}
                    />
                    {errors.email && (
                      <p className="text-red-400 text-xs mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Organization / Company
                    </label>
                    <input
                      type="text"
                      name="organization"
                      value={values.organization}
                      onChange={handleChange}
                      placeholder="Company or Organization"
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-dark-700 border border-gray-200 dark:border-dark-600 focus:border-accent-500 text-gray-900 dark:text-white placeholder-gray-400 text-sm outline-none transition-all focus:ring-2 focus:ring-accent-500/30"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={values.subject}
                      onChange={handleChange}
                      placeholder="Project discussion, Job opportunity..."
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-dark-700 border border-gray-200 dark:border-dark-600 focus:border-accent-500 text-gray-900 dark:text-white placeholder-gray-400 text-sm outline-none transition-all focus:ring-2 focus:ring-accent-500/30"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={values.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Tell me about your project..."
                    className={`w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-dark-700 border text-gray-900 dark:text-white placeholder-gray-400 text-sm outline-none transition-all focus:ring-2 focus:ring-accent-500/30 resize-none ${
                      errors.message
                        ? "border-red-400"
                        : "border-gray-200 dark:border-dark-600 focus:border-accent-500"
                    }`}
                  />
                  {errors.message && (
                    <p className="text-red-400 text-xs mt-1">
                      {errors.message}
                    </p>
                  )}
                </div>

                {status?.type === "success" && (
                  <motion.div
                    className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20 rounded-xl text-green-700 dark:text-green-400 text-sm"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <CheckCircle size={16} /> {status.message}
                  </motion.div>
                )}

                {status?.type === "error" && (
                  <motion.div
                    className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-xl text-red-700 dark:text-red-400 text-sm"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <AlertCircle size={16} /> {status.message}
                  </motion.div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary justify-center disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />{" "}
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={17} /> Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
