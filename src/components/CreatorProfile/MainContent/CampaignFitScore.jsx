'use client'

import { motion } from 'motion/react'

export default function CampaignFitScore({ campaignFit }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.08 }}
      style={{
        background: '#fff',
        border: '1px solid var(--border)',
        borderRadius: 18,
        overflow: 'hidden',
      }}
    >
      <div style={{ padding: 20 }}>
        <div
          style={{
            fontSize: '10.5px',
            fontWeight: 500,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--ink4, #ababab)',
            marginBottom: 14,
          }}
        >
          Campaign fit score
        </div>

        {/* Big number */}
        <div
          style={{
            fontFamily: 'var(--serif)',
            fontSize: 52,
            fontWeight: 300,
            color: 'var(--green, #1a7a45)',
            lineHeight: 1,
          }}
        >
          {campaignFit?.score}
          <span style={{ fontSize: 28, opacity: 0.4 }}>%</span>
        </div>
        <div
          style={{
            fontSize: 11,
            color: 'var(--ink4, #ababab)',
            textTransform: 'uppercase',
            letterSpacing: '0.07em',
            marginTop: 3,
            marginBottom: 18,
          }}
        >
          Overall match
        </div>

        {/* Bars */}
        <div className="flex flex-col" style={{ gap: 9 }}>
          {campaignFit?.breakdown?.map((item, i) => {
            const isAmber = item.color === '#a0620a'
            return (
              <div key={i} className="flex items-center" style={{ gap: 8 }}>
                <span
                  className="shrink-0"
                  style={{
                    fontSize: 12,
                    color: 'var(--ink3)',
                    minWidth: 100,
                  }}
                >
                  {item.label}
                </span>
                <div
                  className="flex-1 overflow-hidden"
                  style={{
                    height: 5,
                    background: 'var(--bg, #f4f1ec)',
                    borderRadius: 100,
                  }}
                >
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.value}%` }}
                    transition={{ duration: 1, delay: 0.3 + i * 0.08 }}
                    style={{
                      height: '100%',
                      borderRadius: 100,
                      background: isAmber
                        ? 'var(--amber, #a0620a)'
                        : 'var(--green, #1a7a45)',
                    }}
                  />
                </div>
                <span
                  style={{
                    fontSize: '11.5px',
                    fontWeight: 500,
                    minWidth: 30,
                    textAlign: 'right',
                    color:
                      item.color === '#1a7a45'
                        ? 'var(--green, #1a7a45)'
                        : item.value <= 15
                          ? 'var(--ink4, #ababab)'
                          : 'var(--ink3)',
                  }}
                >
                  {item.display}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </motion.div>
  )
}
