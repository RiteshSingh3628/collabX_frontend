'use client'

import { motion } from 'motion/react'
import { ArrowRight, Star, Zap } from 'lucide-react'

export default function CTA() {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Vivid blue gradient background — intentionally kept rich for CTA contrast */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-600" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Glowing orbs */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-64 h-64 bg-indigo-300/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 border border-white/20 mb-8">
            <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
            <span className="text-xs font-medium text-white/80 font-body">Join 8,000+ brands and 50,000+ creators</span>
          </div>

          <h2 className="font-display font-bold text-5xl md:text-7xl text-white mb-6 leading-tight">
            Start Your First<br />
            <span className="text-white/90">Campaign Today</span>
          </h2>

          <p className="text-xl text-white/70 font-body leading-relaxed mb-12 max-w-2xl mx-auto">
            No middlemen. No commissions. Just brands and creators building something great together — with AI to guide the way.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.a
              href="#"
              whileHover={{ scale: 1.05, boxShadow: '0 25px 70px rgba(0,0,0,0.2)' }}
              whileTap={{ scale: 0.97 }}
              className="group flex items-center gap-2 px-10 py-5 bg-white text-blue-600 font-display font-bold text-lg rounded-2xl shadow-xl hover:bg-slate-50 transition-all"
            >
              <Zap size={20} className="fill-blue-600 text-blue-600" />
              Join as Brand
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-10 py-5 bg-white/15 text-white font-display font-semibold text-lg rounded-2xl hover:bg-white/20 transition-all border border-white/20"
            >
              <Star size={18} className="text-yellow-300" />
              Become an Influencer
            </motion.a>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-12 pt-12 border-t border-white/10">
            {['No credit card required', '14-day free trial', '0% commission', 'Cancel anytime'].map(t => (
              <div key={t} className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center">
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                    <path d="M1 4L3 6L7 2" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className="text-sm text-white/60 font-body">{t}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
