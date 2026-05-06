'use client'

import { motion } from 'motion/react'

const footerLinks = {
  Platform: ['For brands', 'For creators', 'How it works', 'Pricing', 'Success stories'],
  Company: ['About us', 'Blog', 'Careers', 'Press kit', 'Contact'],
  Legal: ['Privacy policy', 'Terms of service', 'Cookie policy', 'Creator agreement']
}

const socials = ['in', 'tw', 'ig', 'yt']

export default function Footer() {
  return (
    <footer className="px-5 pt-14 sm:px-10 sm:pt-16 lg:px-20 lg:pt-20" style={{ background: '#0a0a0a' }}>
      {/* Top Section */}
      <div
        className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr] gap-10 lg:gap-16 pb-12 lg:pb-14"
        style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}
      >
        {/* Brand Section — full width on mobile */}
        <div className="col-span-2 sm:col-span-2 lg:col-span-1">
          <div
            className="flex items-center gap-2.5 mb-4"
            style={{
              fontFamily: "var(--serif)",
              fontSize: '22px',
              fontWeight: 400,
              color: 'white'
            }}
          >
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
              style={{ background: '#d43a2a' }}
            >
              <span className="w-2 h-2 rounded-full shrink-0" style={{ background: 'white' }} />
            </div>
            CollabXSphere
          </div>

          <p
            style={{
              fontSize: '13px',
              fontWeight: 300,
              lineHeight: 1.7,
              color: 'rgba(255, 255, 255, 0.35)',
              maxWidth: '240px',
              marginBottom: '24px'
            }}
          >
            The platform where authentic creators and ambitious brands find each other across India.
          </p>

          <div className="flex gap-2">
            {socials.map((social) => (
              <motion.a
                key={social}
                href="#"
                className="w-9 h-9 rounded-lg border flex items-center justify-center"
                style={{
                  borderColor: 'rgba(255, 255, 255, 0.12)',
                  color: 'rgba(255, 255, 255, 0.4)',
                  fontSize: '13px'
                }}
                whileHover={{ borderColor: 'rgba(255, 255, 255, 0.3)', color: 'white' }}
              >
                {social}
              </motion.a>
            ))}
          </div>
        </div>

        {/* Links Columns */}
        {Object.entries(footerLinks).map(([category, links]) => (
          <div key={category}>
            <div
              style={{
                fontSize: '11px',
                fontWeight: 500,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'white',
                marginBottom: '16px'
              }}
            >
              {category}
            </div>
            <ul className="space-y-2.5">
              {links.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    style={{ fontSize: '13px', fontWeight: 300, color: 'rgba(255, 255, 255, 0.35)', transition: 'color 0.2s' }}
                    onMouseEnter={(e) => (e.target.style.color = 'rgba(255, 255, 255, 0.7)')}
                    onMouseLeave={(e) => (e.target.style.color = 'rgba(255, 255, 255, 0.35)')}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom Section */}
      <div
        className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 py-6"
        style={{ fontSize: '12px' }}
      >
        <p style={{ color: 'rgba(255, 255, 255, 0.2)' }}>
          © 2025 CollabXSphere. All rights reserved.
        </p>
        <div className="flex gap-6">
          {['Privacy', 'Terms', 'Cookies'].map((item) => (
            <a
              key={item}
              href="#"
              style={{ color: 'rgba(255, 255, 255, 0.2)', transition: 'color 0.2s' }}
              onMouseEnter={(e) => (e.target.style.color = 'rgba(255, 255, 255, 0.5)')}
              onMouseLeave={(e) => (e.target.style.color = 'rgba(255, 255, 255, 0.2)')}
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
