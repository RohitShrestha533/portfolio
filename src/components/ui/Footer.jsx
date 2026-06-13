import { motion } from "framer-motion";
import { Github, Linkedin, Heart, ArrowUp, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import personal from "../../data/personal.json";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/projects", label: "Projects" },
  { to: "/experience", label: "Experience" },
  { to: "/contact", label: "Contact" },
];

const socialLinks = [
  { href: personal.github, icon: Github, label: "GitHub" },
  { href: personal.linkedin, icon: Linkedin, label: "LinkedIn" },
  { href: `mailto:${personal.email}`, icon: Mail, label: "Email" },
];

export default function Footer() {
  return (
    <footer className="bg-dark-900 text-gray-400 pt-16 pb-8">
      <div className="section-container">
        <div className="grid md:grid-cols-3 gap-20 mb-12">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent-500 to-blue-600 flex items-center justify-center">
                <span className="font-display text-lg font-bold text-white">
                  R
                </span>
              </div>
              <span className="font-display text-xl font-bold text-white">
                Rohit<span className="text-accent-500">.</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed mb-5 max-w-xs text-gray-500">
              Full Stack Developer passionate about building elegant, performant
              web applications. Based in Nepal, working globally.
            </p>
            <div className="flex gap-2">
              {socialLinks.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel={
                    href.startsWith("mailto")
                      ? undefined
                      : "noopener noreferrer"
                  }
                  aria-label={label}
                  className="w-9 h-9 rounded-xl bg-dark-700 flex items-center justify-center text-gray-400 hover:bg-accent-500 hover:text-white transition-all duration-200"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Nav */}
          <div>
            <h4 className="font-display font-bold text-white mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {navLinks.map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-sm text-gray-500 hover:text-accent-400 transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-bold text-white mb-4">Contact</h4>
            <div className="space-y-2 text-sm text-gray-500">
              <p>📧 {personal.email}</p>
              <p>📍 {personal.location}</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
