'use client'

import { motion } from 'motion/react'
import Image from 'next/image'

export default function SplitSection() {
  const sections = [
    {
      id: 'creators',
      tag: 'For Creators',
      title: 'TURN YOUR\nAUDIENCE INTO\nINCOME',
      image: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=900&q=80&fit=crop&crop=top',
      description: 'Get discovered by top brands actively seeking creators in your niche. Set your own rates, manage all your deals, and get paid on time — every time.',
      features: [
        'Get discovered by brands actively looking for your niche',
        'Set your own rates — no race-to-the-bottom bidding',
        'Manage multiple brand deals in one dashboard',
        'Guaranteed, on-time payments'
      ],
      cta: 'Join as a Creator →',
      href: '/auth/creator/register'
    },
    {
      id: 'brands',
      tag: 'For Brands',
      title: 'BUILD CAMPAIGNS\nTHAT ACTUALLY\nCONVERT',
      image: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?w=900&q=80&fit=crop&crop=top',
      description: 'Find creators who genuinely align with your brand values. Set budgets, manage briefs, track performance — all in one place.',
      features: [
        'Find creators by niche, platform, location & audience size',
        'Set budgets, briefs, and deliverable timelines easily',
        'Track performance metrics across all campaigns',
        'Secure escrow payments released on delivery'
      ],
      cta: 'Start as a Brand →',
      href: '/auth/brand/register'
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2" style={{ background: '#f7f4ef' }}>
      {sections.map((section, idx) => (
        <div
          key={section.id}
          className="relative overflow-hidden flex flex-col justify-end cursor-pointer group"
          style={{
            background: '#0a0a0a',
            padding: 'clamp(32px, 5vw, 60px)',
            minHeight: 'clamp(480px, 70vh, 700px)'
          }}
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src={section.image}
              alt={section.title}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              style={{ filter: 'brightness(0.5)' }}
              fill
            
            />
          </div>

          {/* Overlay gradient */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to top, rgba(0,0,0,.85) 0%, transparent 55%)'
            }}
          />

          {/* Content */}
          <motion.div
            className="relative z-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
          >
            {/* Tag */}
            <span
              className="inline-block px-3.5 py-1.5 rounded-full text-white mb-5 text-xs font-semibold uppercase tracking-wider"
              style={{ background: '#d43a2a', letterSpacing: '0.16em' }}
            >
              {section.tag}
            </span>

            {/* Title */}
            <h2
              className="mb-4 leading-tight"
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 'clamp(42px, 5vw, 82px)',
                color: 'white',
                letterSpacing: '0.02em',
                lineHeight: 0.95
              }}
            >
              {section.title.split('\n').map((line, i) => (
                <span key={i}>{line}<br /></span>
              ))}
            </h2>

            {/* Description */}
            <p
              className="mb-7 leading-relaxed"
              style={{
                fontSize: '14px',
                fontWeight: 300,
                lineHeight: 1.7,
                color: 'rgba(255, 255, 255, 0.65)',
                maxWidth: '380px'
              }}
            >
              {section.description}
            </p>

            {/* Features */}
            <ul className="mb-8 space-y-2">
              {section.features.map((feature, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2.5"
                  style={{
                    fontSize: '13.5px',
                    fontWeight: 300,
                    color: 'rgba(255, 255, 255, 0.7)'
                  }}
                >
                  <span style={{ color: '#d43a2a', marginRight: '5px' }}>→</span>
                  {feature}
                </li>
              ))}
            </ul>

            {/* CTA Button */}
            <motion.a
              href={section.href}
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full border backdrop-blur-sm"
              style={{
                borderColor: 'rgba(255, 255, 255, 0.35)',
                background: 'rgba(255, 255, 255, 0.1)',
                color: 'white',
                fontSize: '13px',
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                width: 'fit-content'
              }}
              whileHover={{ background: '#d43a2a', borderColor: '#d43a2a', y: -2 }}
            >
              {section.cta}
            </motion.a>
          </motion.div>
        </div>
      ))}
    </div>
  )
}
