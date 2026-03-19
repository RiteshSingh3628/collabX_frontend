'use client'

import { motion } from 'motion/react'
import { Check, Sparkles, Zap } from 'lucide-react'

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    desc: 'Perfect to explore the platform.',
    features: [
      'Up to 2 campaigns / month',
      'Basic influencer search',
      'Standard analytics',
      'Email support',
    ],
    cta: 'Get Started Free',
    highlight: false,
    color: '#64748b',
    bg: '#f8fafc',
    border: '#e2e8f0',
  },
  {
    name: 'Starter',
    price: '$49',
    period: '/ month',
    desc: 'For growing brands and creators.',
    features: [
      'Up to 10 campaigns / month',
      'Advanced influencer search',
      'Full profile analytics',
      'Secure escrow payments',
      'Priority support',
    ],
    cta: 'Start Starter',
    highlight: false,
    color: '#5B7EFF',
    bg: '#eff4ff',
    border: '#c7d8ff',
  },
  {
    name: 'Pro',
    price: '$149',
    period: '/ month',
    desc: 'Unlock the full AI-powered suite.',
    badge: 'Most Popular',
    features: [
      'Unlimited campaigns',
      'AI influencer recommendations',
      'Advanced audience analytics',
      'Profile & bid promotion',
      'White-glove onboarding',
      'Dedicated account manager',
    ],
    cta: 'Start Pro',
    highlight: true,
    color: '#5B7EFF',
    bg: '#eff4ff',
    border: '#5B7EFF',
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    desc: 'For large teams and agencies.',
    features: [
      'Everything in Pro',
      'Custom integrations & API',
      'Multi-seat team access',
      'Custom reporting',
      'SLA guarantee',
      'Custom contracts',
    ],
    cta: 'Contact Sales',
    highlight: false,
    color: '#7c3aed',
    bg: '#f5f3ff',
    border: '#ddd6fe',
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="relative py-32 overflow-hidden bg-slate-50">
      <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-blue-50/80 rounded-full blur-3xl pointer-events-none" />

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
            <Zap size={14} className="text-[--primary]" />
            <span className="text-xs font-medium text-blue-600 font-body tracking-wide">Simple Pricing</span>
          </div>
          <h2 className="font-display font-bold text-4xl md:text-6xl text-slate-900 mb-4 leading-tight">
            Pay For Results,<br />
            <span className="gradient-text">Not Middlemen</span>
          </h2>
          <p className="max-w-xl mx-auto text-slate-500 font-body text-lg">
            Flat subscription pricing. Zero commission on campaigns. Keep 100% of what you earn.
          </p>
        </motion.div>

        {/* Pricing cards */}
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">
          {plans.map(({ name, price, period, desc, badge, features, cta, highlight, color, bg, border }, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className={`relative rounded-3xl p-7 border flex flex-col shadow-sm transition-shadow hover:shadow-lg ${
                highlight
                  ? 'bg-white border-[--primary] shadow-blue-200/60 ring-1 ring-[--primary]/30'
                  : 'bg-white border-slate-200'
              }`}
            >
              {/* Badge */}
              {badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[--primary] rounded-full shadow-md shadow-blue-300/40">
                    <Sparkles size={11} className="text-white" />
                    <span className="text-xs font-bold text-white font-display">{badge}</span>
                  </div>
                </div>
              )}

              {/* Plan name */}
              <div className="mb-6">
                <p className="text-xs font-bold uppercase tracking-widest font-body mb-3" style={{ color }}>{name}</p>
                <div className="flex items-end gap-1 mb-2">
                  <span className="font-display font-bold text-4xl text-slate-900">{price}</span>
                  {period && <span className="text-slate-400 font-body text-sm mb-1">{period}</span>}
                </div>
                <p className="text-sm text-slate-500 font-body">{desc}</p>
              </div>

              {/* Features */}
              <ul className="space-y-3 flex-1 mb-7">
                {features.map(f => (
                  <li key={f} className="flex items-start gap-3">
                    <div
                      className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                      style={{ background: bg, border: `1px solid ${border}` }}
                    >
                      <Check size={10} style={{ color }} />
                    </div>
                    <span className="text-sm text-slate-600 font-body">{f}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`w-full py-3 rounded-2xl text-sm font-bold font-display transition-all ${
                  highlight
                    ? 'bg-[--primary] text-white shadow-md shadow-blue-200 hover:bg-blue-600'
                    : 'border border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                {cta}
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* Note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-sm text-slate-400 font-body mt-8"
        >
          All plans include 0% commission on campaigns. Cancel anytime. 14-day free trial on paid plans.
        </motion.p>
      </div>
    </section>
  )
}
