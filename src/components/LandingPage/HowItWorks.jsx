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
  },
  {
    num: '02',
    icon: Search,
    title: 'Discover & match',
    desc: 'Brands browse creators filtered by niche, platform, and reach. Creators get discovered by brands actively looking for their profile.',
    accent: '#c9a84c',
  },
  {
    num: '03',
    icon: DollarSign,
    title: 'Collaborate & earn',
    desc: 'Agree on deliverables, track campaign milestones, and get paid securely — all within CollabXSphere. No back-and-forth emails needed.',
    accent: '#2a7a4a',
  }
]

export default function HowItWorks() {
  return (
    <section
      id="how"
      className="py-16 px-5 sm:py-24 sm:px-12 lg:py-28 lg:px-20 relative overflow-hidden"
      style={{ background: '#f7f4ef' }}
    >
      {/* Subtle background grain */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, #0a0a0a 1px, transparent 0)',
          backgroundSize: '24px 24px'
        }}
      />

      {/* Header */}
      <motion.div
        className="mb-20 lg:mb-24 max-w-4xl relative"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <div
          className="flex items-center gap-2.5 mb-5"
          style={{ fontSize: '0.6875rem', fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase' }}
        >
          <span style={{ width: '28px', height: '1px', background: '#d43a2a' }} />
          <span style={{ color: '#d43a2a' }}>The Process</span>
        </div>
        <h2
          className="leading-[0.95]"
          style={{
            fontFamily: 'var(--bebas)',
            fontSize: 'clamp(46px, 6.5vw, 96px)',
            letterSpacing: '0.01em',
            color: '#0a0a0a'
          }}
        >
          THREE STEPS.{' '}
          <span
            style={{
              fontFamily: 'var(--serif)',
              fontWeight: 300,
              fontStyle: 'italic',
              fontSize: '0.78em',
              color: '#6a6a6a'
            }}
          >
            zero
          </span>{' '}
          FRICTION.
        </h2>
        <p
          className="mt-6"
          style={{
            fontSize: '16px',
            fontWeight: 300,
            lineHeight: 1.65,
            color: '#6a6a6a',
            maxWidth: '460px'
          }}
        >
          From signup to your first paid collaboration in under 48 hours — no agencies, no cold emails, no friction.
        </p>
      </motion.div>

      {/* Timeline */}
      <div className="relative">
        {/* Horizontal connector (desktop) */}
        <div
          className="hidden md:block absolute left-0 right-0 h-px"
          style={{
            top: '28px',
            background:
              'linear-gradient(to right, transparent 0%, rgba(10,10,10,0.16) 6%, rgba(10,10,10,0.16) 94%, transparent 100%)'
          }}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-14 md:gap-10 relative">
          {steps.map((step, i) => {
            const Icon = step.icon
            return (
              <motion.div
                key={step.num}
                className="relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.7 }}
              >
                {/* Numbered marker on timeline */}
                <div
                  className="relative z-10 flex items-center justify-center rounded-full mb-8"
                  style={{
                    background: '#f7f4ef',
                    border: `1.5px solid ${step.accent}`,
                    color: step.accent,
                    width: '56px',
                    height: '56px',
                    fontFamily: 'var(--bebas)',
                    fontSize: '24px',
                    letterSpacing: '0.04em',
                    boxShadow: `0 0 0 6px #f7f4ef, 0 8px 24px ${step.accent}22`
                  }}
                >
                  {step.num}
                </div>

                {/* Icon + Title */}
                <div className="flex items-center gap-2.5 mb-4">
                  <Icon size={18} style={{ stroke: step.accent, strokeWidth: 2 }} />
                  <h3
                    style={{
                      fontSize: '22px',
                      fontWeight: 600,
                      color: '#0a0a0a',
                      lineHeight: 1.25,
                      letterSpacing: '-0.01em'
                    }}
                  >
                    {step.title}
                  </h3>
                </div>

                {/* Description */}
                <p
                  className="mb-7"
                  style={{
                    fontSize: '14.5px',
                    fontWeight: 300,
                    lineHeight: 1.75,
                    color: '#5a5a5a',
                    maxWidth: '340px'
                  }}
                >
                  {step.desc}
                </p>

                {/* Bottom indicator */}
                <div className="flex items-center gap-3">
                  <span
                    style={{
                      width: '36px',
                      height: '2px',
                      background: step.accent,
                      borderRadius: '2px'
                    }}
                  />
                  <span
                    style={{
                      fontSize: '10px',
                      fontWeight: 600,
                      letterSpacing: '0.18em',
                      textTransform: 'uppercase',
                      color: step.accent
                    }}
                  >
                    {i === 0 ? '~5 min' : i === 1 ? '24 hrs' : 'Ongoing'}
                  </span>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
