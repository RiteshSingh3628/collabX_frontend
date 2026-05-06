'use client'

import { motion } from 'motion/react'

const stats = [
  { number: '12', suffix: 'K+', label: 'Active Creators' },
  { number: '800', suffix: '+', label: 'Brand Partners' },
  { number: '₹4', suffix: 'Cr+', label: 'Paid to Creators' },
  { number: '98', suffix: '%', label: 'On-Time Payments' },
]

export default function SocialProof() {
  return (
    <motion.div
      className="grid grid-cols-2 md:grid-cols-4 border-t border-b"
      style={{
        background: '#ffffff',
        borderColor: 'rgba(10, 10, 10, 0.1)'
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {stats.map((stat, i) => (
        <div
          key={stat.label}
          className="py-8 px-6 text-center border-b md:border-b-0 border-r"
          style={{
            borderColor: 'rgba(10, 10, 10, 0.1)',
            borderRightColor: i % 2 === 1 ? 'transparent' : 'rgba(10, 10, 10, 0.1)',
          }}
        >
          <div
            className="leading-none mb-1"
            style={{
              fontFamily: "var(--bebas)",
              fontSize: 'clamp(36px, 5vw, 52px)',
              letterSpacing: '0.02em',
              color: '#0a0a0a'
            }}
          >
            {stat.number}<span style={{ color: '#d43a2a' }}>{stat.suffix}</span>
          </div>
          <div
            style={{
              fontSize: '11px',
              fontWeight: 400,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#6a6a6a'
            }}
          >
            {stat.label}
          </div>
        </div>
      ))}
    </motion.div>
  )
}
