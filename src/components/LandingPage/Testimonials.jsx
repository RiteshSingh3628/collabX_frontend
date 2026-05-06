'use client'

import { motion } from 'motion/react'
import Image from 'next/image'

const testimonials = [
  {
    id: 'priya',
    quote: 'As a mid-tier creator, I was always underselling myself. CollabXSphere helped me find brands that value my engagement rate, not just follower count.',
    author: 'Priya Sharma',
    role: 'Lifestyle Creator · 180K followers',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80&fit=crop&crop=faces',
    accent: '#d43a2a'
  },
  {
    id: 'arjun',
    quote: "Found three incredible fitness creators within a week. Our campaign ROI was better than any agency we'd worked with. The platform just works.",
    author: 'Arjun Mehta',
    role: 'Marketing Head · NutriBlend',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80&fit=crop&crop=faces',
    accent: '#c9a84c'
  }
]

export default function Testimonials() {
  return (
    <section className="bg-[#0a0a0a] py-14 px-5 sm:px-10 lg:py-24 lg:px-20">
      {/* Header */}
      <motion.div
        className="mb-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <div className="mb-4 flex items-center gap-2.5 text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-[#c9a84c]">
          <span className="h-px w-7 bg-[#c9a84c]" />
          <span>What They Say</span>
        </div>
        <h2 className="font-display text-[clamp(42px,5.5vw,80px)] leading-tight tracking-[0.02em] text-white">
          REAL STORIES.<br />REAL <span className="text-[#d43a2a]">RESULTS.</span>
        </h2>
      </motion.div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {testimonials.map((testi, i) => (
          <motion.article
            key={testi.id}
            style={{ '--accent': testi.accent }}
            className="relative overflow-hidden rounded-3xl border border-white/6 bg-linear-to-br from-[#161616] to-[#0e0e0e] p-7 sm:p-9 lg:p-11"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
          >
            {/* Decorative corner glow */}
            <div
              aria-hidden
              className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[radial-gradient(circle,var(--accent)_0%,transparent_70%)] opacity-20 blur-3xl"
            />

            {/* Big decorative quote mark */}
            <div
              aria-hidden
              className="-mb-2.5 font-serif text-[clamp(70px,10vw,120px)] leading-[0.8] text-(--accent) opacity-35"
            >
              &ldquo;
            </div>

            {/* Stars */}
            <div className="mb-4.5 text-sm tracking-[3px] text-[#c9a84c]">
              ★★★★★
            </div>

            {/* Quote */}
            <p className="mb-7 font-serif text-[clamp(17px,1.6vw,22px)] font-light italic leading-[1.55] text-white/90">
              {testi.quote}
            </p>

            {/* Divider */}
            <div className="mb-5 h-px bg-linear-to-r from-white/10 to-transparent" />

            {/* Author */}
            <div className="flex items-center gap-4">
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border-2 border-(--accent)">
                <Image
                  src={testi.avatar}
                  alt={testi.author}
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </div>
              <div>
                <div className="text-[15px] font-semibold tracking-[0.01em] text-white">
                  {testi.author}
                </div>
                <div className="mt-0.5 text-xs tracking-[0.02em] text-white/50">
                  {testi.role}
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  )
}
