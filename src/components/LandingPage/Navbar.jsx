'use client'

import { useState, useEffect } from 'react'
import { motion, useMotionValueEvent, useScroll } from 'motion/react'
import { Zap, Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Analytics', href: '#analytics' },
  { label: 'AI Matching', href: '#ai-matching' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 30)
  })

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'py-3 bg-white/90 backdrop-blur-xl border-b border-slate-200 shadow-sm'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-[--primary] flex items-center justify-center group-hover:scale-110 transition-transform shadow-md shadow-blue-200">
            <Zap size={16} className="text-white fill-white" />
          </div>
          <span className="font-display font-bold text-lg text-slate-900 tracking-tight">
            collab<span className="text-[--primary]">.</span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="px-4 py-2 text-sm text-slate-500 hover:text-slate-900 font-body font-medium transition-colors rounded-lg hover:bg-slate-100"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA buttons */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="/auth/login"
            className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors font-body"
          >
            Login
          </a>
          <motion.a
            href="/auth/brand/register"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="px-5 py-2.5 bg-[--primary] text-blue-600 border border-slate-200 text-sm font-semibold rounded-xl hover:bg-blue-600 hover:text-white transition-all shadow-md shadow-blue-200 font-display"
          >
            Get Started
          </motion.a>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-slate-500 hover:text-slate-900 transition-colors"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden bg-white border-t border-slate-200 px-6 py-6 flex flex-col gap-3 shadow-lg"
        >
          {navLinks.map(link => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-sm text-slate-600 hover:text-slate-900 py-2 font-body transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="flex gap-3 pt-3 border-t border-slate-200">
            <a href="#" className="flex-1 text-center py-2.5 text-sm text-slate-600 border border-slate-200 rounded-xl font-body hover:border-slate-300 transition-colors">Login</a>
            <a href="#" className="flex-1 text-center py-2.5 text-sm bg-[--primary] text-white font-semibold rounded-xl font-display hover:bg-blue-600 transition-colors">Get Started</a>
          </div>
        </motion.div>
      )}
    </motion.header>
  )
}
