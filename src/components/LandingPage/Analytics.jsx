'use client'

import { motion } from 'motion/react'
import { TrendingUp, Users, Target, Star } from 'lucide-react'

const metrics = [
  { label: 'Engagement Rate', value: '8.4%', prev: '5.2%', up: true },
  { label: 'Audience Quality', value: '94/100', prev: '81/100', up: true },
  { label: 'Follower Growth', value: '+12.4K', prev: '+8.2K', up: true },
  { label: 'Avg CPE', value: '$0.04', prev: '$0.09', up: false },
]

const demographics = [
  { label: '18–24', pct: 42, color: '#5B7EFF' },
  { label: '25–34', pct: 33, color: '#93B4F8' },
  { label: '35–44', pct: 16, color: '#7c3aed' },
  { label: '45+', pct: 9, color: '#a5b4fc' },
]

export default function Analytics() {
  return (
    <section id="analytics" className="relative py-32 overflow-hidden bg-slate-50">
      <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-200 mb-6">
              <TrendingUp size={14} className="text-[--primary]" />
              <span className="text-xs font-medium text-blue-600 font-body tracking-wide">Deep Analytics</span>
            </div>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-slate-900 mb-6 leading-tight">
              Know Your Numbers.<br />
              <span className="gradient-text">Grow With Confidence.</span>
            </h2>
            <p className="text-slate-500 font-body text-lg leading-relaxed mb-8">
              Every influencer profile comes with a full analytics suite — real follower growth, genuine engagement rates, 
              audience demographics, and campaign history. No smoke and mirrors.
            </p>

            {/* Metric chips */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: TrendingUp, text: 'Real-time tracking' },
                { icon: Users, text: 'Audience demographics' },
                { icon: Target, text: 'Campaign benchmarks' },
                { icon: Star, text: 'Authenticity score' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 bg-white rounded-xl px-4 py-3 border border-slate-200 shadow-sm">
                  <Icon size={14} className="text-[--primary]" />
                  <span className="text-sm text-slate-600 font-body">{text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — mock analytics panel */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="bg-white rounded-3xl p-7 border border-slate-200 shadow-xl shadow-blue-100/40">
              {/* Profile header */}
              <div className="flex items-center gap-4 mb-7 pb-7 border-b border-slate-100">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[--primary] to-[--secondary] flex items-center justify-center font-display font-bold text-white text-xl">
                  MK
                </div>
                <div>
                  <p className="font-display font-bold text-slate-900 text-lg">@mikekenzo</p>
                  <p className="text-sm text-slate-400 font-body">Fashion &amp; Lifestyle · 2.4M followers</p>
                </div>
                <div className="ml-auto px-3 py-1.5 bg-blue-50 rounded-full border border-blue-200">
                  <span className="text-xs font-semibold text-[--primary]">Top Creator</span>
                </div>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-2 gap-4 mb-7">
                {metrics.map(({ label, value, prev, up }) => (
                  <div key={label} className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                    <p className="text-xs text-slate-400 font-body mb-2">{label}</p>
                    <p className="font-display font-bold text-xl text-slate-900 mb-1">{value}</p>
                    <p className={`text-xs font-medium ${up ? 'text-green-600' : 'text-[--primary]'}`}>
                      {up ? '↑' : '↓'} from {prev}
                    </p>
                  </div>
                ))}
              </div>

              {/* Demographics */}
              <div>
                <p className="text-xs text-slate-400 font-body mb-4 uppercase tracking-wider">Audience Age Split</p>
                <div className="space-y-3">
                  {demographics.map(({ label, pct, color }, i) => (
                    <div key={label} className="flex items-center gap-3">
                      <span className="text-xs text-slate-500 font-body w-12">{label}</span>
                      <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${pct}%` }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.3 + i * 0.1, duration: 0.8, ease: 'easeOut' }}
                          className="h-full rounded-full"
                          style={{ background: color }}
                        />
                      </div>
                      <span className="text-xs text-slate-500 font-body w-8 text-right">{pct}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
