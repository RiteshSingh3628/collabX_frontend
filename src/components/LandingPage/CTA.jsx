'use client'

import { motion } from 'motion/react'
import Image from 'next/image'

export default function CTA() {
  return (
    <section
      className="relative py-20 px-5 sm:py-24 sm:px-10 lg:py-28 lg:px-20 overflow-hidden"
      style={{ minHeight: '60vh' }}
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1600&q=80&fit=crop&crop=center"
          alt="Content creation studio"
          className="w-full h-full object-cover"
          fill
        />
      </div>

      {/* Overlay */}
      <div
        className="absolute inset-0 z-10"
        style={{ background: 'linear-gradient(135deg, rgba(10,10,10,.7), rgba(212,58,42,.25))' }}
      />

      {/* Content */}
      <motion.div
        className="relative z-20 flex flex-col items-center justify-center text-center mx-auto"
        style={{ maxWidth: '760px' }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {/* Eyebrow */}
        <div
          className="flex items-center justify-center gap-2.5 mb-5 flex-wrap"
          style={{ fontSize: '0.6875rem', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase' }}
        >
          <span style={{ width: '36px', height: '1px', background: '#c9a84c' }} />
          <span style={{ color: '#c9a84c' }}>Join 12,000+ creators & 800+ brands</span>
          <span style={{ width: '36px', height: '1px', background: '#c9a84c' }} />
        </div>

        {/* Title */}
        <h2
          className="mb-6 leading-tight"
          style={{
            fontFamily: "var(--bebas)",
            fontSize: 'clamp(52px, 8vw, 110px)',
            letterSpacing: '0.02em',
            color: 'white'
          }}
        >
          START YOUR<br />NEXT <span style={{ color: '#d43a2a' }}>COLLAB</span><br />TODAY
        </h2>

        {/* Subtitle */}
        <p
          className="mb-10"
          style={{
            fontSize: 'clamp(14px, 1.5vw, 16px)',
            fontWeight: 300,
            lineHeight: 1.7,
            color: 'rgba(255, 255, 255, 0.6)',
            maxWidth: '520px'
          }}
        >
          Whether you&apos;re a brand looking to amplify your reach, or a creator ready to monetise your audience — CollabXSphere is where it all begins.
        </p>

        {/* CTAs */}
        <div className="flex gap-3.5 justify-center flex-wrap">
          <motion.a
            href="/auth/brand/register"
            className="rounded-full font-semibold uppercase"
            style={{
              backgroundColor: '#d43a2a',
              color: 'white',
              padding: '14px 32px',
              fontSize: '14px',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              fontWeight: 600
            }}
            whileHover={{ scale: 1.02, y: -2, boxShadow: '0 14px 36px rgba(212, 58, 42, 0.4)' }}
            whileTap={{ scale: 0.98 }}
          >
            Join as a Brand
          </motion.a>
          <motion.a
            href="/auth/creator/register"
            className="rounded-full font-medium uppercase border backdrop-blur-sm"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              borderColor: 'rgba(255, 255, 255, 0.3)',
              borderWidth: '1px',
              color: 'white',
              padding: '14px 32px',
              fontSize: '14px',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              fontWeight: 500
            }}
            whileHover={{ scale: 1.02, y: -2, backgroundColor: 'rgba(255, 255, 255, 0.18)' }}
            whileTap={{ scale: 0.98 }}
          >
            Join as a Creator
          </motion.a>
        </div>
      </motion.div>
    </section>
  )
}
