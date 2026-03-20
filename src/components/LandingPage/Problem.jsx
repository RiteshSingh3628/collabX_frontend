'use client'

import { motion } from 'motion/react'
import { AlertCircle, DollarSign, Search } from 'lucide-react'

const problems = [
  {
    icon: Search,
    title: "Brands Can't Find The Right Fit",
    desc: 'Sorting through thousands of profiles manually is exhausting, slow, and full of fake accounts with inflated metrics.',
    accent: '#ef4444',
    bg: '#fef2f2',
    border: '#fecaca',
  },
  {
    icon: AlertCircle,
    title: 'Influencers Miss Brand Deals',
    desc: 'Without connections or an agent, talented creators never get discovered — regardless of their engagement or audience quality.',
    accent: '#f59e0b',
    bg: '#fffbeb',
    border: '#fde68a',
  },
  {
    icon: DollarSign,
    title: 'Agencies Take 30–40% Commission',
    desc: 'Middlemen charge both sides. Brands overpay, influencers earn less, and neither gets full transparency into the deal.',
    accent: '#f97316',
    bg: '#fff7ed',
    border: '#fed7aa',
  },
]

export default function Problem() {
  return (
    <section id="problem" className="relative py-32 overflow-hidden bg-white">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-white to-white pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 border border-red-200 mb-6">
            <AlertCircle size={14} className="text-red-500" />
            <span className="text-xs font-medium text-red-500 font-body tracking-wide">The Broken Status Quo</span>
          </div>
          <h2 className="font-display font-bold text-4xl md:text-6xl text-slate-900 mb-4 leading-tight">
            The Current System Is<br />
            <span className="text-red-500">Broken For Everyone</span>
          </h2>
          <p className="max-w-xl mx-auto text-slate-500 font-body text-lg">
            Traditional influencer marketing is expensive, opaque, and inefficient. Here&apos;s what brands and creators deal with every day.
          </p>
        </motion.div>

        {/* Problem cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {problems.map(({ icon: Icon, title, desc, accent, bg, border }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.7 }}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
              className="group relative bg-white rounded-3xl p-7 border border-slate-200 overflow-hidden cursor-default shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Hover tint */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"
                style={{ background: `radial-gradient(ellipse at 30% 30%, ${accent}0a 0%, transparent 60%)` }}
              />

              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                style={{ background: bg, border: `1px solid ${border}` }}
              >
                <Icon size={22} style={{ color: accent }} />
              </div>

              <h3 className="font-display font-bold text-xl text-slate-900 mb-3">{title}</h3>
              <p className="text-slate-500 font-body text-sm leading-relaxed">{desc}</p>

              {/* Bottom accent line */}
              <div
                className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `linear-gradient(to right, transparent, ${accent}60, transparent)` }}
              />
            </motion.div>
          ))}
        </div>

        {/* Arrow pointing down */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="flex flex-col items-center gap-2 mt-16"
        >
          <p className="text-sm text-slate-400 font-body">There&apos;s a better way</p>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-6 h-6 border-b-2 border-r-2 border-blue-300 rotate-45"
          />
        </motion.div>
      </div>
    </section>
  )
}
