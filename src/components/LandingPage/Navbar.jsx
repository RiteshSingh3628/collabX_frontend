'use client'

import { useState } from 'react'
import { motion, useMotionValueEvent, useScroll } from 'motion/react'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'How it works', href: '#how' },
  { label: 'For creators', href: '#creators' },
  { label: 'For brands', href: '#brands' },
  { label: 'Campaigns', href: '#campaigns' },
]

function NavLink({ link, scrolled }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <a
        href={link.href}
        style={{
          fontSize: '0.7rem',
          fontWeight: 600,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: scrolled
            ? (hovered ? '#d43a2a' : '#0a0a0a')
            : (hovered ? '#c9a84c' : 'rgba(255,255,255,0.9)'),
          transition: 'color 0.2s ease',
          textDecoration: 'none',
        }}
      >
        {link.label}
      </a>
      <span
        style={{
          position: 'absolute',
          bottom: '-4px',
          left: 0,
          height: '1.5px',
          width: hovered ? '100%' : '0%',
          background: scrolled ? '#d43a2a' : '#c9a84c',
          transition: 'width 0.25s ease',
          display: 'block',
          borderRadius: '2px',
        }}
      />
    </div>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [loginHovered, setLoginHovered] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 60)
  })

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        padding: scrolled ? '12px 0' : '20px 0',
        background: scrolled ? 'rgba(247, 244, 239, 0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(10, 10, 10, 0.1)' : 'none',
        transition: 'all 0.4s ease',
      }}
    >
      <div className="max-w-7xl mx-auto px-12 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group" style={{ textDecoration: 'none' }}>
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform"
            style={{ background: '#d43a2a' }}
          >
            <span className="w-2 h-2 rounded-full bg-white block" />
          </div>
          <span
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '1.2rem',
              fontWeight: 400,
              letterSpacing: '0.05em',
              color: scrolled ? '#0a0a0a' : '#ffffff',
              transition: 'color 0.4s ease',
            }}
          >
            CollabXSphere
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <NavLink key={link.label} link={link} scrolled={scrolled} />
          ))}
        </nav>

        {/* CTA buttons */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="/auth/login"
            onMouseEnter={() => setLoginHovered(true)}
            onMouseLeave={() => setLoginHovered(false)}
            style={{
              padding: '7px 20px',
              fontSize: '0.7rem',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              borderRadius: '999px',
              border: scrolled
                ? '1.5px solid rgba(10,10,10,0.25)'
                : '1.5px solid rgba(255,255,255,0.7)',
              color: scrolled
                ? (loginHovered ? '#d43a2a' : '#0a0a0a')
                : (loginHovered ? '#c9a84c' : '#ffffff'),
              background: loginHovered
                ? (scrolled ? '#ede8df' : 'rgba(255,255,255,0.12)')
                : 'transparent',
              transition: 'all 0.2s ease',
              textDecoration: 'none',
              display: 'inline-block',
            }}
          >
            Login
          </a>
          <motion.a
            href="/auth/login"
            whileHover={{ scale: 1.04, opacity: 0.9 }}
            whileTap={{ scale: 0.97 }}
            style={{
              padding: '8px 20px',
              background: '#d43a2a',
              color: '#ffffff',
              fontSize: '0.7rem',
              fontWeight: 700,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              borderRadius: '999px',
              textDecoration: 'none',
              display: 'inline-block',
              boxShadow: '0 2px 12px rgba(212, 58, 42, 0.35)',
            }}
          >
            Get Started
          </motion.a>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{
            color: scrolled ? '#0a0a0a' : '#ffffff',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            transition: 'color 0.3s ease',
          }}
          className="md:hidden"
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
          style={{
            background: '#f7f4ef',
            borderTop: '1px solid rgba(10,10,10,0.1)',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
          }}
          className="md:hidden"
        >
          {navLinks.map(link => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              style={{
                fontSize: '0.7rem',
                color: '#0a0a0a',
                padding: '8px 0',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                borderBottom: '1px solid rgba(10,10,10,0.06)',
              }}
            >
              {link.label}
            </a>
          ))}
          <div style={{ display: 'flex', gap: '12px', paddingTop: '12px' }}>
            <a
              href="/auth/login"
              style={{
                flex: 1,
                textAlign: 'center',
                padding: '8px',
                fontSize: '0.7rem',
                color: '#0a0a0a',
                border: '1.5px solid rgba(10,10,10,0.2)',
                borderRadius: '999px',
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                textDecoration: 'none',
              }}
            >
              Login
            </a>
            <a
              href="/auth/login"
              style={{
                flex: 1,
                textAlign: 'center',
                padding: '8px',
                fontSize: '0.7rem',
                background: '#d43a2a',
                color: '#ffffff',
                borderRadius: '999px',
                fontWeight: 700,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                textDecoration: 'none',
              }}
            >
              Get Started
            </a>
          </div>
        </motion.div>
      )}
    </motion.header>
  )
}
