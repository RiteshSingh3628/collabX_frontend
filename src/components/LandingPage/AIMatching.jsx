'use client'

import { motion } from 'motion/react'
import { Sparkles, Zap } from 'lucide-react'

const brandNodes = [
  { label: 'Nike', x: 8, y: 20, size: 'lg' },
  { label: 'Spotify', x: 6, y: 55, size: 'md' },
  { label: 'Airbnb', x: 10, y: 80, size: 'md' },
]

const influencerNodes = [
  { label: '@sarah_j', followers: '1.2M', match: '98%', x: 72, y: 10 },
  { label: '@mikekenzo', followers: '2.4M', match: '95%', x: 74, y: 35 },
  { label: '@lenafit', followers: '890K', match: '91%', x: 70, y: 58 },
  { label: '@travel_tim', followers: '3.1M', match: '87%', x: 73, y: 80 },
]

const connections = [
  { from: { x: 22, y: 23 }, to: { x: 72, y: 13 }, delay: 0 },
  { from: { x: 22, y: 23 }, to: { x: 72, y: 38 }, delay: 0.2 },
  { from: { x: 20, y: 58 }, to: { x: 72, y: 61 }, delay: 0.4 },
  { from: { x: 22, y: 82 }, to: { x: 72, y: 83 }, delay: 0.6 },
]

export default function AIMatching() {
  return (
    <section id="ai-matching" className="relative py-32 overflow-hidden bg-white">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 pointer-events-none" />
      <div className="absolute inset-0 spotlight pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-50 border border-violet-200 mb-6">
            <Sparkles size={14} className="text-violet-500" />
            <span className="text-xs font-medium text-violet-600 font-body tracking-wide">Powered by AI</span>
          </div>
          <h2 className="font-display font-bold text-4xl md:text-6xl text-slate-900 mb-4 leading-tight">
            AI Finds The Perfect<br />
            <span className="gradient-text">Influencer For Your Brand</span>
          </h2>
          <p className="max-w-xl mx-auto text-slate-500 font-body text-lg">
            Our machine learning models analyze 50+ signals — engagement authenticity, audience overlap, conversion history — 
            to rank every applicant for your campaign.
          </p>
        </motion.div>

        {/* Visual: connection diagram */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="relative"
        >
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl shadow-blue-100/40 p-8 md:p-12 overflow-hidden min-h-72">
            {/* SVG connections */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              {connections.map((conn, i) => (
                <motion.line
                  key={i}
                  x1={`${conn.from.x}%`} y1={`${conn.from.y}%`}
                  x2={`${conn.to.x}%`} y2={`${conn.to.y}%`}
                  stroke="url(#lineGrad)"
                  strokeWidth="0.3"
                  strokeDasharray="2 1"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: conn.delay + 0.5, duration: 1 }}
                />
              ))}
              <defs>
                <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#5B7EFF" stopOpacity="0.4" />
                  <stop offset="50%" stopColor="#7c3aed" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#93B4F8" stopOpacity="0.4" />
                </linearGradient>
              </defs>
            </svg>

            {/* AI Center node */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <motion.div
                animate={{ scale: [1, 1.08, 1], opacity: [0.8, 1, 0.8] }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-100 to-violet-100 border border-blue-200 flex items-center justify-center shadow-lg shadow-blue-200/60"
              >
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[--primary] to-violet-500 flex items-center justify-center">
                  <Sparkles size={22} className="text-white" />
                </div>
              </motion.div>
              <p className="text-center text-xs font-display font-bold text-[--primary] mt-2">AI Engine</p>
            </div>

            {/* Brand nodes */}
            {brandNodes.map(({ label, x, y, size }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5, type: 'spring' }}
                className="absolute"
                style={{ left: `${x}%`, top: `${y}%` }}
              >
                <div className={`bg-white rounded-2xl border border-blue-200 shadow-sm px-4 py-2.5 ${size === 'lg' ? 'w-28' : 'w-24'}`}>
                  <div className="w-6 h-6 bg-blue-50 rounded-lg mb-1.5 flex items-center justify-center">
                    <Zap size={12} className="text-[--primary]" />
                  </div>
                  <p className="font-display font-bold text-slate-900 text-sm">{label}</p>
                  <p className="text-xs text-slate-400 font-body">Brand</p>
                </div>
              </motion.div>
            ))}

            {/* Influencer nodes */}
            {influencerNodes.map(({ label, followers, match, x, y }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.15, duration: 0.5, type: 'spring' }}
                className="absolute"
                style={{ left: `${x}%`, top: `${y}%`, transform: 'translateX(-100%)' }}
              >
                <div className="bg-white rounded-2xl border border-blue-100 shadow-sm px-4 py-2.5 w-36">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-display font-semibold text-slate-900 text-sm">{label}</p>
                    <span className="text-xs text-green-600 font-bold">{match}</span>
                  </div>
                  <p className="text-xs text-slate-400 font-body">{followers} followers</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Feature list */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {[
            { title: '50+ Signals Analyzed', desc: 'From engagement rate to audience authenticity and niche relevance.' },
            { title: 'Real-time Scoring', desc: 'Every applicant gets ranked and scored as they apply to your campaign.' },
            { title: 'Learns Over Time', desc: 'The more campaigns you run, the smarter the recommendations get.' },
          ].map(({ title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="bg-white rounded-2xl p-6 border border-slate-200 text-center shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-display font-bold text-slate-900 mb-2">{title}</h3>
              <p className="text-sm text-slate-500 font-body">{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
