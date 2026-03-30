'use client'

import { motion } from 'motion/react'
import Image from 'next/image'

export default function Hero() {
  return (
    <section className="relative h-screen min-h-150 flex items-end overflow-hidden pt-24">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=1800&q=85&fit=crop"
          alt="Creator shooting content"
          className="w-full h-full object-cover object-top"
          style={{ filter: 'brightness(0.55)' }}
          fill
        />
      </div>

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background: `linear-gradient(
            to bottom,
            rgba(0,0,0,.1) 0%,
            rgba(0,0,0,.0) 40%,
            rgba(0,0,0,.6) 75%,
            rgba(0,0,0,.88) 100%
          )`
        }}
      />

      {/* Content */}
      <motion.div
        className="relative z-20 px-5 pb-10 sm:px-10 sm:pb-14 lg:px-20 lg:pb-20 w-full max-w-5xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {/* Eyebrow */}
        <motion.div
          className="flex items-center gap-2 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{
            fontSize: '0.6875rem',
            letterSpacing: '0.2em',
            fontWeight: 500,
          }}
        >
          <div className="w-9 h-px" style={{ backgroundColor: '#c9a84c' }} />
          <span style={{ color: '#c9a84c', textTransform: 'uppercase' }}>
            India&apos;s Creator Economy Platform
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          className="leading-tight mb-5"
          style={{
            fontSize: 'clamp(52px, 9vw, 110px)',
            letterSpacing: '0.02em',
            color: '#ffffff',
            fontFamily: "Bebas Neue",
            lineHeight: 0.95
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          WHERE<br />BRANDS MEET<br /><span style={{ color: '#d43a2a' }}>CREATORS</span>
        </motion.h1>

        {/* Bottom section with subtitle and CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {/* Subtitle */}
          <p
            className="max-w-sm"
            style={{
              color: 'rgba(255, 255, 255, 0.7)',
              fontSize: '15px',
              lineHeight: 1.7,
              fontWeight: 300,
            }}
          >
            The platform connecting India&apos;s top influencers with ambitious brands — discover, collaborate, and grow together.
          </p>

          {/* CTAs */}
          <div className="flex gap-3 shrink-0">
            <motion.a
              href="/auth/brand/register"
              className="rounded-full font-semibold uppercase"
              style={{
                backgroundColor: '#d43a2a',
                color: 'white',
                padding: '12px 24px',
                fontSize: '13px',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                fontWeight: 600
              }}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              I&apos;m a Brand
            </motion.a>
            <motion.a
              href="/auth/creator/register"
              className="rounded-full font-medium uppercase border backdrop-blur-sm"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.12)',
                borderColor: 'rgba(255, 255, 255, 0.35)',
                borderWidth: '1px',
                color: 'white',
                padding: '12px 24px',
                fontSize: '13px',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                fontWeight: 500
              }}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              I&apos;m a Creator
            </motion.a>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
      >
        <div
          className="w-px"
          style={{
            height: '40px',
            background: 'rgba(255, 255, 255, 0.25)',
            animation: 'scrollPulse 2s ease-in-out infinite'
          }}
        />
        <span
          style={{
            fontSize: '10px',
            color: 'rgba(255, 255, 255, 0.45)',
            letterSpacing: '0.14em',
            textTransform: 'uppercase'
          }}
        >
          Scroll
        </span>
      </motion.div>

      <style jsx>{`
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.3; transform: scaleY(1); }
          50% { opacity: 1; transform: scaleY(0.6); }
        }
      `}</style>
    </section>
  )
}
