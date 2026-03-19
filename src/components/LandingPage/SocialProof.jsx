'use client'

import { motion } from 'framer-motion'

const brands = [
  'Nike', 'Spotify', 'Airbnb', 'Shopify', 'Notion', 'Figma',
  'Stripe', 'Vercel', 'Linear', 'Loom', 'Framer', 'Webflow',
  'Nike', 'Spotify', 'Airbnb', 'Shopify', 'Notion', 'Figma',
  'Stripe', 'Vercel', 'Linear', 'Loom', 'Framer', 'Webflow',
]

const stats = [
  { value: '50K+', label: 'Influencers' },
  { value: '8K+', label: 'Brands' },
  { value: '$42M+', label: 'Campaigns Run' },
  { value: '0%', label: 'Commission' },
]

export default function SocialProof() {
  return (
    <section className="relative py-24 overflow-hidden bg-slate-50">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50/80 to-slate-50 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 text-center mb-12">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-sm font-body text-slate-400 uppercase tracking-widest mb-2"
        >
          Trusted by brands and creators worldwide
        </motion.p>
      </div>

      {/* Scrolling marquee */}
      <div className="relative overflow-hidden mb-16">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />

        <div className="flex w-max animate-marquee">
          {brands.map((brand, i) => (
            <div
              key={i}
              className="flex items-center justify-center mx-8 px-8 py-3 bg-white rounded-full border border-slate-200 w-36 shrink-0 shadow-sm"
            >
              <span className="font-display font-semibold text-sm text-slate-500 tracking-wide">{brand}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-4xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map(({ value, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="text-center"
            >
              <p className="font-display font-bold text-4xl md:text-5xl gradient-text mb-2">{value}</p>
              <p className="text-sm text-slate-500 font-body">{label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
