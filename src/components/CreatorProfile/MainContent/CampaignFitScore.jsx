'use client'

import { motion } from 'motion/react'

export default function CampaignFitScore({ campaignFit }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white border border-black/8 rounded-[20px] p-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-[18px]">
        <div className="flex items-center gap-2.5" style={{ fontFamily: 'var(--serif)' }}>
          <span className="w-5 h-px" style={{ background: 'var(--red)' }} />
          <span className="text-[22px] font-normal" style={{ color: 'var(--ink)' }}>
            Campaign Fit Score
          </span>
        </div>
        <span
          className="text-[10.5px] font-medium px-2.5 py-[3px] rounded-full"
          style={{ background: 'var(--cream)', color: 'var(--ink3)' }}
        >
          Auto-calculated
        </span>
      </div>

      {/* Score + breakdown */}
      <div className="flex flex-col min-[920px]:flex-row items-start min-[920px]:items-center justify-between gap-6 mb-6">
        <div>
          <div
            className="text-[64px] font-light leading-none"
            style={{ fontFamily: 'var(--serif)', color: '#1a7a45' }}
          >
            {campaignFit.score}
            <span className="text-[32px] opacity-50">%</span>
          </div>
          <div className="text-xs mt-1" style={{ color: 'var(--ink3)' }}>
            Overall match score
          </div>
        </div>

        <div className="flex flex-col gap-2.5 flex-1 min-[920px]:ml-8 w-full">
          {campaignFit.breakdown.map((item, i) => (
            <div key={i} className="flex items-center gap-2.5">
              <span
                className="text-[12.5px] w-[110px] shrink-0"
                style={{ color: 'var(--ink2)' }}
              >
                {item.label}
              </span>
              <div
                className="flex-1 h-1.5 rounded-full overflow-hidden"
                style={{ background: 'var(--cream)' }}
              >
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${item.value}%` }}
                  transition={{ duration: 0.8, delay: 0.2 + i * 0.1 }}
                  className="h-full rounded-full"
                  style={{ background: item.color }}
                />
              </div>
              <span
                className="text-xs font-semibold min-w-[32px] text-right"
                style={{ color: item.color === '#1a7a45' ? '#1a7a45' : item.color === '#c9a84c' ? 'var(--ink3)' : 'var(--ink2)' }}
              >
                {item.display}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Insight */}
      <div
        className="p-3.5 px-4 rounded-xl border"
        style={{ background: '#faf8f5', borderColor: 'var(--border)' }}
      >
        <p className="text-[13px] leading-[1.6]" style={{ color: 'var(--ink3)' }}>
          <strong className="font-semibold" style={{ color: '#1a7a45' }}>
            {campaignFit.insightHighlight}
          </strong>{' '}
          &mdash;{' '}
          {campaignFit.insight.replace(campaignFit.insightHighlight, '').replace(/^\s*[—\-]\s*/, '')}
        </p>
      </div>
    </motion.div>
  )
}
