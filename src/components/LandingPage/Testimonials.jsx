'use client'

import { motion } from 'motion/react'
import Image from 'next/image'

const testimonials = [
  {
    id: 'priya',
    image: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?w=700&q=80&fit=crop&crop=top',
    quote: 'As a mid-tier creator, I was always underselling myself. CollabXSphere helped me find brands that value my engagement rate, not just follower count.',
    author: 'Priya Sharma',
    role: 'Lifestyle Creator · 180K followers',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80&fit=crop&crop=top',
    rating: 5
  },
  {
    id: 'arjun',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=700&q=80&fit=crop&crop=top',
    quote: "Found three incredible fitness creators within a week. Our campaign ROI was better than any agency we'd worked with. The platform just works.",
    author: 'Arjun Mehta',
    role: 'Marketing Head · NutriBlend',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80&fit=crop&crop=top',
    rating: 5
  }
]

export default function Testimonials() {
  return (
    <section
      className="py-14 px-5 sm:px-10 lg:py-24 lg:px-20"
      style={{ background: '#0a0a0a' }}
    >
      {/* Header */}
      <motion.div
        className="mb-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <div
          className="flex items-center gap-2.5 mb-4"
          style={{ fontSize: '0.6875rem', fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase' }}
        >
          <span style={{ width: '28px', height: '1px', background: '#c9a84c' }} />
          <span style={{ color: '#c9a84c' }}>What They Say</span>
        </div>
        <h2
          className="leading-tight"
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 'clamp(42px, 5.5vw, 80px)',
            letterSpacing: '0.02em',
            color: 'white'
          }}
        >
          REAL STORIES.<br />REAL <span style={{ color: '#d43a2a' }}>RESULTS.</span>
        </h2>
      </motion.div>

      {/* Testimonials Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-5"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {testimonials.map((testi, i) => (
          <motion.div
            key={testi.id}
            className="relative overflow-hidden rounded-3xl cursor-pointer"
            style={{ minHeight: '300px' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
          >
            <Image
              src={testi.image}
              alt={testi.author}
              className="absolute inset-0 w-full h-full object-cover"
              style={{ filter: 'brightness(0.45)' }}
              fill
            />
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(to top, rgba(0,0,0,.85), transparent 60%)' }}
            />
            <div
              className="relative z-10 h-full flex flex-col justify-end"
              style={{ padding: '28px' }}
            >
              <div style={{ color: '#c9a84c', fontSize: '13px', letterSpacing: '2px', marginBottom: '14px' }}>
                ★★★★★
              </div>
              <p
                className="mb-5"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontStyle: 'italic',
                  fontSize: 'clamp(16px, 2.2vw, 22px)',
                  fontWeight: 300,
                  lineHeight: 1.5,
                  color: 'white'
                }}
              >
                <span style={{ color: '#d43a2a', fontSize: '1.3em', lineHeight: 0, verticalAlign: '-0.2em' }}>"</span>
                {testi.quote}
                <span style={{ color: '#d43a2a', fontSize: '1.3em', lineHeight: 0, verticalAlign: '-0.2em' }}>"</span>
              </p>
              <div className="flex items-center gap-3">
                <div
                  className="w-11 h-11 rounded-2xl overflow-hidden shrink-0 border-2"
                  style={{ borderColor: 'rgba(255, 255, 255, 0.25)' }}
                >
                  <Image src={testi.avatar} alt={testi.author} className="w-full h-full object-cover object-top" fill/>
                </div>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 500, color: 'white' }}>{testi.author}</div>
                  <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginTop: '2px' }}>{testi.role}</div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
