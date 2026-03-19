'use client'

import { motion } from 'framer-motion'
import { Zap, Twitter, Instagram, Linkedin, Github } from 'lucide-react'

const footerLinks = {
  Product: ['Features', 'How It Works', 'Pricing', 'Analytics', 'AI Matching', 'Changelog'],
  Company: ['About', 'Careers', 'Blog', 'Press'],
  Legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'GDPR'],
  Support: ['Help Center', 'Contact', 'Status', 'Community'],
}

const socials = [
  { icon: Twitter, label: 'Twitter' },
  { icon: Instagram, label: 'Instagram' },
  { icon: Linkedin, label: 'LinkedIn' },
  { icon: Github, label: 'GitHub' },
]

export default function Footer() {
  return (
    <footer className="relative border-t border-slate-200 overflow-hidden bg-slate-900">

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-6 gap-10 mb-16">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-[--primary] flex items-center justify-center shadow-md shadow-blue-900/40">
                <Zap size={16} className="text-white fill-white" />
              </div>
              <span className="font-display font-bold text-lg text-white">
                collab<span className="text-[--primary]">.</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 font-body leading-relaxed mb-6 max-w-xs">
              The AI-powered platform connecting brands and creators directly — no agents, no commissions.
            </p>
            <div className="flex gap-3">
              {socials.map(({ icon: Icon, label }) => (
                <motion.a
                  key={label}
                  href="#"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-9 h-9 bg-slate-800 rounded-xl flex items-center justify-center border border-slate-700 text-slate-400 hover:text-white hover:border-slate-500 transition-colors"
                  aria-label={label}
                >
                  <Icon size={16} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-500 font-body mb-4">{category}</p>
              <ul className="space-y-3">
                {links.map(link => (
                  <li key={link}>
                    <a href="#" className="text-sm text-slate-400 hover:text-white transition-colors font-body">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-slate-800">
          <p className="text-sm text-slate-500 font-body">
            © 2025 Collab Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-xs text-slate-500 font-body">All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
