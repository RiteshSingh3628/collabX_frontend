'use client'

import { motion } from 'motion/react'

const brands = ['NIKE', 'PUMA', 'ZOMATO', 'NYKAA', 'boAT', 'MYNTRA']

export default function BrandsTrust() {
  return (
    <section
      className="py-12 px-5 sm:px-10 lg:py-20 lg:px-20 border-t border-b"
      style={{
        background: '#ffffff',
        borderColor: 'rgba(10, 10, 10, 0.1)'
      }}
    >
      {/* Header */}
      <motion.div
        className="text-center mb-10 lg:mb-14"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <div
          className="flex items-center justify-center gap-2.5 mb-4"
          style={{
            fontSize: '0.6875rem',
            fontWeight: 500,
            letterSpacing: '0.18em',
            textTransform: 'uppercase'
          }}
        >
          <span style={{ width: '28px', height: '1px', background: '#d43a2a' }} />
          <span style={{ color: '#d43a2a' }}>Brand Partners</span>
          <span style={{ width: '28px', height: '1px', background: '#d43a2a' }} />
        </div>

        <h2
          className="leading-tight"
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 'clamp(32px, 4vw, 56px)',
            letterSpacing: '0.02em',
            color: '#0a0a0a'
          }}
        >
          BRANDS THAT<br />TRUST US
        </h2>
      </motion.div>

      {/* Brand Grid */}
      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 lg:gap-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {brands.map((brand, i) => (
          <motion.div
            key={brand}
            className="relative overflow-hidden rounded-2xl lg:rounded-3xl border aspect-video cursor-pointer group"
            style={{
              borderColor: 'rgba(10, 10, 10, 0.1)',
              background: '#ede8df'
            }}
            whileHover={{
              borderColor: 'rgba(10, 10, 10, 0.18)',
              y: -3,
              boxShadow: '0 12px 32px rgba(0, 0, 0, 0.07)'
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05, duration: 0.5 }}
          >
            <div
              className="w-full h-full flex items-center justify-center group-hover:opacity-100 opacity-50 transition-opacity"
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 'clamp(16px, 2vw, 22px)',
                letterSpacing: '0.1em',
                color: '#2a2a2a',
                fontWeight: 600
              }}
            >
              {brand}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
