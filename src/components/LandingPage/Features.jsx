'use client'

import { motion } from 'motion/react'
import { Users, BarChart2, ShieldCheck, Sparkles, TrendingUp, LayoutDashboard } from 'lucide-react'

const features = [
  {
    icon: Users,
    title: 'Multi-Influencer Campaigns',
    desc: 'Collaborate with multiple creators simultaneously. Scale your campaigns with coordinated multi-influencer strategies.',
    color: '#5B7EFF',
    bg: '#eff4ff',
    size: 'lg',
  },
  {
    icon: BarChart2,
    title: 'Auto Campaign Tracking',
    desc: 'Track posts, clicks, conversions, and ROI automatically in real time.',
    color: '#93B4F8',
    bg: '#f0f6ff',
    size: 'sm',
  },
  {
    icon: ShieldCheck,
    title: 'Secure Transactions',
    desc: 'Escrow-based payments protect both brands and creators.',
    color: '#16a34a',
    bg: '#f0fdf4',
    size: 'sm',
  },
  {
    icon: Sparkles,
    title: 'AI Influencer Matching',
    desc: 'Our AI analyzes audience overlap, engagement patterns, and brand fit to recommend the perfect influencer for every campaign.',
    color: '#7c3aed',
    bg: '#f5f3ff',
    size: 'lg',
  },
  {
    icon: TrendingUp,
    title: 'Influencer Profile Analytics',
    desc: 'Followers growth, engagement rate, audience quality, and demographic breakdowns.',
    color: '#d97706',
    bg: '#fffbeb',
    size: 'sm',
  },
  {
    icon: LayoutDashboard,
    title: 'Campaign Dashboard',
    desc: 'Manage all campaigns from one powerful dashboard.',
    color: '#ea580c',
    bg: '#fff7ed',
    size: 'sm',
  },
]

export default function Features() {
  return (
    <section id="features" className="relative py-32 overflow-hidden bg-slate-50">
      <div className="absolute inset-0 grid-pattern opacity-50 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-200 mb-6">
            <Sparkles size={14} className="text-[--primary]" />
            <span className="text-xs font-medium text-blue-600 font-body tracking-wide">Everything You Need</span>
          </div>
          <h2 className="font-display font-bold text-4xl md:text-6xl text-slate-900 mb-4 leading-tight">
            Built for the Future of<br />
            <span className="gradient-text">Influencer Marketing</span>
          </h2>
          <p className="max-w-xl mx-auto text-slate-500 font-body text-lg">
            Every tool brands and creators need — from AI matching to secure payments — in one seamless platform.
          </p>
        </motion.div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {features.map(({ icon: Icon, title, desc, color, bg, size }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              whileHover={{ y: -4, transition: { duration: 0.25 } }}
              className={`group relative bg-white rounded-3xl p-7 border border-slate-200 overflow-hidden cursor-default shadow-sm hover:shadow-md transition-shadow ${
                size === 'lg' ? 'md:col-span-2' : 'md:col-span-1'
              }`}
            >
              {/* Hover glow */}
              <div
                className="absolute -top-12 -right-12 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: `${color}18` }}
              />

              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 transition-transform group-hover:scale-110 duration-300"
                style={{ background: bg, border: `1px solid ${color}30` }}
              >
                <Icon size={22} style={{ color }} />
              </div>

              <h3 className="font-display font-bold text-xl text-slate-900 mb-3">{title}</h3>
              <p className="text-slate-500 font-body text-sm leading-relaxed">{desc}</p>

              {/* Arrow on hover */}
              <motion.div
                className="absolute bottom-7 right-7 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ background: bg, border: `1px solid ${color}40` }}
                >
                  <span style={{ color }} className="text-sm font-bold">→</span>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
