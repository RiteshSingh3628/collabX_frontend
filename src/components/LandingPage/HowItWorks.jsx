'use client'

import { motion } from 'motion/react'
import { Users, Search, DollarSign } from 'lucide-react'

const steps = [
  {
    num: '01',
    icon: Users,
    title: 'Create your profile',
    desc: 'Brands set up campaign goals and budgets. Creators showcase their niche, audience, and past work. Onboarding takes under 5 minutes.',
    accent: '#d43a2a',
    bg: '#fff8f7',
    border: '#f5d0cb'
  },
  {
    num: '02',
    icon: Search,
    title: 'Discover & match',
    desc: 'Brands browse creators filtered by niche, platform, and reach. Creators get discovered by brands actively looking for their profile.',
    accent: '#c9a84c',
    bg: '#fffbf0',
    border: '#f0e0b0'
  },
  {
    num: '03',
    icon: DollarSign,
    title: 'Collaborate & earn',
    desc: 'Agree on deliverables, track campaign milestones, and get paid securely — all within CollabXSphere. No back-and-forth emails needed.',
    accent: '#2a7a4a',
    bg: '#f2faf5',
    border: '#b8e0c8'
  }
]

export default function HowItWorks() {
  return (
    <section
      id="how"
      className="py-16 px-5 sm:py-24 sm:px-12 lg:py-28 lg:px-20"
      style={{ background: '#f7f4ef' }}
    >
      {/* Header */}
      <motion.div
        className="mb-14 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <div>
          <div
            className="flex items-center gap-2.5 mb-4"
            style={{ fontSize: '0.6875rem', fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase' }}
          >
            <span style={{ width: '28px', height: '1px', background: '#d43a2a' }} />
            <span style={{ color: '#d43a2a' }}>Process</span>
          </div>
          <h2
            className="leading-tight"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 'clamp(42px, 5.5vw, 80px)',
              letterSpacing: '0.02em',
              color: '#0a0a0a'
            }}
          >
            HOW IT<br />
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: '0.8em', color: '#6a6a6a' }}>actually</span> WORKS
          </h2>
        </div>
        <p
          style={{
            fontSize: '15px',
            fontWeight: 300,
            lineHeight: 1.7,
            color: '#6a6a6a',
            maxWidth: '260px',
          }}
        >
          From signup to your first paid collaboration in under 48 hours.
        </p>
      </motion.div>

      {/* Steps */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {steps.map((step, i) => {
          const Icon = step.icon
          return (
            <motion.div
              key={step.num}
              className="relative rounded-3xl overflow-hidden p-8 lg:p-10 border"
              style={{
                background: step.bg,
                borderColor: step.border,
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.6 }}
              whileHover={{ y: -4, boxShadow: `0 16px 40px ${step.accent}18` }}
            >
              {/* Large step number watermark */}
              <div
                className="absolute top-4 right-6 font-['Bebas_Neue'] select-none pointer-events-none"
                style={{
                  fontSize: '100px',
                  lineHeight: 1,
                  color: step.accent,
                  opacity: 0.07,
                  letterSpacing: '-0.02em'
                }}
              >
                {step.num}
              </div>

              {/* Step badge */}
              <div
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full mb-6 text-xs font-semibold"
                style={{
                  background: step.accent,
                  color: 'white',
                  letterSpacing: '0.08em',
                  fontSize: '10px',
                  textTransform: 'uppercase'
                }}
              >
                Step {step.num}
              </div>

              {/* Icon circle */}
              <div
                className="w-13 h-13 rounded-2xl flex items-center justify-center mb-5"
                style={{
                  background: 'white',
                  border: `1.5px solid ${step.border}`,
                  boxShadow: `0 4px 12px ${step.accent}15`,
                  width: '52px',
                  height: '52px'
                }}
              >
                <Icon size={22} style={{ stroke: step.accent, strokeWidth: 1.8 }} />
              </div>

              {/* Title */}
              <h3
                className="mb-3"
                style={{ fontSize: '19px', fontWeight: 600, color: '#0a0a0a', lineHeight: 1.3 }}
              >
                {step.title}
              </h3>

              {/* Description */}
              <p
                style={{ fontSize: '14px', fontWeight: 300, lineHeight: 1.75, color: '#5a5a5a' }}
              >
                {step.desc}
              </p>

              {/* Bottom accent line */}
              <div
                className="absolute bottom-0 left-0 right-0 h-0.5 rounded-b-3xl"
                style={{ background: `linear-gradient(to right, ${step.accent}, transparent)` }}
              />
            </motion.div>
          )
        })}
      </div>

      {/* Connector dots between cards on desktop */}
      <div className="hidden md:flex items-center justify-center gap-2 mt-8">
        {steps.map((step, i) => (
          <div key={i} className="flex items-center gap-2">
            <div
              className="w-2 h-2 rounded-full"
              style={{ background: step.accent }}
            />
            {i < steps.length - 1 && (
              <div style={{ width: '80px', height: '1px', background: 'rgba(10,10,10,0.12)' }} />
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
