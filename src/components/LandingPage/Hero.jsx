'use client'

import { motion } from 'motion/react'
import { ArrowRight, TrendingUp, Users, Sparkles, Star, ShieldCheck, BarChart3 } from 'lucide-react'

const floatingCard1 = {
  initial: { opacity: 0, x: -40, y: 20 },
  animate: { opacity: 1, x: 0, y: 0 },
  transition: { delay: 0.9, duration: 0.8, ease: [0.22, 1, 0.36, 1] },
}

const floatingCard2 = {
  initial: { opacity: 0, x: 40, y: 20 },
  animate: { opacity: 1, x: 0, y: 0 },
  transition: { delay: 1.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] },
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16">
      {/* Animated light background */}
      <div className="absolute inset-0 animated-bg grid-pattern" />
      
      {/* Radial spotlight */}
      <div className="absolute inset-0 spotlight" />

      {/* Pastel orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-100/60 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-100/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-50/80 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-200 mb-8"
        >
          <Sparkles size={14} className="text-[--primary]" />
          <span className="text-xs font-medium text-blue-600 font-body tracking-wide">AI-Powered Influencer Matching</span>
          <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight mb-6"
        >
          <span className="text-slate-900">Connect Brands With</span>
          <br />
          <span className="gradient-text glow-text">The Right Influencers</span>
          <br />
          <span className="text-slate-600 text-4xl md:text-6xl lg:text-7xl">Without Middlemen.</span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="max-w-2xl mx-auto text-lg md:text-xl text-slate-500 font-body leading-relaxed mb-10"
        >
          The first platform where brands post campaigns, influencers apply directly, and AI finds perfect matches — 
          zero commissions, full transparency.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
        >
          <motion.a
            href="#"
            whileHover={{ scale: 1.04, boxShadow: '0 20px 60px rgba(91, 126, 255, 0.25)' }}
            whileTap={{ scale: 0.97 }}
            className="group flex items-center gap-2 px-8 py-4 bg-[--primary] text-blue-600 border border-slate-200 font-display font-bold text-base rounded-2xl shadow-lg shadow-blue-200 hover:bg-blue-600 hover:text-white transition-all"
          >
            Start as Brand
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </motion.a>
          <motion.a
            href="#"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 px-8 py-4 bg-white border border-slate-200 text-slate-700 font-display font-semibold text-base rounded-2xl hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm"
          >
            <Star size={16} className="text-[--primary]" />
            Join as Influencer
          </motion.a>
        </motion.div>

        {/* Floating analytics dashboard preview */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative max-w-4xl mx-auto"
        >
          {/* Main dashboard card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-2xl shadow-blue-100/60">
            {/* Dashboard header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-xs text-slate-400 font-body mb-1">Campaign Performance</p>
                <p className="font-display font-bold text-xl text-slate-900">Nike — Summer Drop 2025</p>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 rounded-full border border-green-200">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                <span className="text-xs text-green-600 font-medium">Live</span>
              </div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {[
                { label: 'Total Reach', value: '4.2M', change: '+18%', icon: Users },
                { label: 'Engagement', value: '8.4%', change: '+3.2%', icon: TrendingUp },
                { label: 'Conversions', value: '12.8K', change: '+41%', icon: BarChart3 },
                { label: 'ROI', value: '6.4x', change: '+120%', icon: ShieldCheck },
              ].map(({ label, value, change, icon: Icon }) => (
                <div key={label} className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon size={14} className="text-[--primary]" />
                    <span className="text-xs text-slate-400 font-body">{label}</span>
                  </div>
                  <p className="font-display font-bold text-xl text-slate-900">{value}</p>
                  <p className="text-xs text-green-600 font-medium mt-1">{change}</p>
                </div>
              ))}
            </div>

            {/* Chart bars */}
            <div className="flex items-end gap-2 h-20">
              {[40, 65, 45, 80, 55, 90, 70, 95, 60, 85, 75, 100].map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ delay: 1.2 + i * 0.05, duration: 0.5, ease: 'easeOut' }}
                  className="flex-1 rounded-t-lg"
                  style={{
                    background: `linear-gradient(to top, #5B7EFF${i % 3 === 2 ? 'ff' : '66'}, #93B4F8${i % 3 === 2 ? 'aa' : '33'})`,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Floating card — AI Match */}
          <motion.div
            {...floatingCard1}
            className="animate-float absolute -left-8 top-12 hidden lg:block"
          >
            <div className="bg-white rounded-2xl p-4 w-52 border border-blue-100 shadow-xl shadow-blue-100/60">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 bg-blue-50 rounded-lg flex items-center justify-center">
                  <Sparkles size={12} className="text-[--primary]" />
                </div>
                <span className="text-xs font-semibold text-slate-700 font-body">AI Match Found</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-linear-to-br from-[--primary] to-[--secondary] flex items-center justify-center text-xs font-bold text-white">SJ</div>
                <div>
                  <p className="text-sm font-semibold text-slate-900 font-display">@sarah_j</p>
                  <p className="text-xs text-slate-400">98% brand match</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Floating card — Secure Payment */}
          <motion.div
            {...floatingCard2}
            className="animate-float-delay absolute -right-8 top-16 hidden lg:block"
          >
            <div className="bg-white rounded-2xl p-4 w-52 border border-green-100 shadow-xl shadow-green-100/60">
              <div className="flex items-center gap-2 mb-2">
                <ShieldCheck size={14} className="text-green-500" />
                <span className="text-xs font-semibold text-green-600 font-body">Payment Secured</span>
              </div>
              <p className="text-lg font-bold text-slate-900 font-display">$12,000</p>
              <p className="text-xs text-slate-400 font-body">Escrow released on delivery</p>
            </div>
          </motion.div>

          {/* Floating card — Influencer count */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3 }}
            className="animate-float-delay-2 absolute -bottom-6 left-1/2 -translate-x-1/2 hidden md:block"
          >
            <div className="bg-white rounded-2xl px-5 py-3 border border-slate-200 shadow-xl shadow-slate-100/80 flex items-center gap-3">
              <div className="flex -space-x-2">
                {['#5B7EFF', '#93B4F8', '#a5b4fc', '#d4b8ff'].map((c, i) => (
                  <div key={i} className="w-7 h-7 rounded-full border-2 border-white" style={{ background: c }} />
                ))}
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900 font-display">50K+ Influencers</p>
                <p className="text-xs text-slate-400 font-body">actively applying</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
