'use client'

import { motion } from 'motion/react'
import { PlusCircle, SendHorizonal, Sparkles, LineChart } from 'lucide-react'

const steps = [
  {
    num: '01',
    icon: PlusCircle,
    title: 'Brand Creates Campaign Bid',
    desc: 'Set your goals, budget, niche, and target audience. Our smart form walks you through every detail in minutes.',
    color: '#5B7EFF',
    bg: '#eff4ff',
  },
  {
    num: '02',
    icon: SendHorizonal,
    title: 'Influencers Apply',
    desc: 'Relevant creators discover your campaign and apply with their analytics, rates, and proposal — no cold emails.',
    color: '#93B4F8',
    bg: '#f0f6ff',
  },
  {
    num: '03',
    icon: Sparkles,
    title: 'AI Suggests Best Matches',
    desc: 'Our AI scores each applicant on engagement quality, audience alignment, and past campaign performance.',
    color: '#7c3aed',
    bg: '#f5f3ff',
  },
  {
    num: '04',
    icon: LineChart,
    title: 'Track Campaign Performance',
    desc: 'Once live, monitor every post, click, and conversion. Payments auto-release when milestones are hit.',
    color: '#16a34a',
    bg: '#f0fdf4',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-32 overflow-hidden bg-white">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-white to-white pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-50/60 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-200 mb-6">
            <span className="text-xs font-medium text-blue-600 font-body tracking-wide">Simple Process</span>
          </div>
          <h2 className="font-display font-bold text-4xl md:text-6xl text-slate-900 mb-4 leading-tight">
            Launch a Campaign in<br />
            <span className="gradient-text">4 Simple Steps</span>
          </h2>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connector line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-blue-200 to-transparent hidden md:block" />

          <div className="grid md:grid-cols-2 gap-8 md:gap-16">
            {steps.map(({ num, icon: Icon, title, desc, color, bg }, i) => (
              <motion.div
                key={num}
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className={`relative flex gap-5 items-start ${i % 2 !== 0 ? 'md:mt-24' : ''}`}
              >
                {/* Number badge */}
                <div className="shrink-0">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center font-display font-bold text-sm border shadow-sm"
                    style={{
                      background: bg,
                      borderColor: `${color}30`,
                      color,
                    }}
                  >
                    {num}
                  </div>
                </div>

                <div className="bg-white rounded-3xl p-6 border border-slate-200 flex-1 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="w-8 h-8 rounded-xl flex items-center justify-center"
                      style={{ background: bg }}
                    >
                      <Icon size={16} style={{ color }} />
                    </div>
                    <h3 className="font-display font-bold text-lg text-slate-900">{title}</h3>
                  </div>
                  <p className="text-slate-500 font-body text-sm leading-relaxed">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
