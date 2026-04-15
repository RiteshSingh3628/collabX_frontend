'use client'

import { motion } from 'motion/react'

const STAT_ITEMS = [
  { key: 'followers', label: 'Followers' },
  { key: 'engagementRate', label: 'Eng. Rate', suffix: '%', color: '#1a7a45' },
  { key: 'avgLikes', label: 'Avg Likes' },
  { key: 'avgComments', label: 'Avg Comments' },
  { key: 'totalPosts', label: 'Total Posts' },
  { key: 'following', label: 'Following' },
]

export default function StatsCard({ stats, engagementBreakdown }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.14 }}
      className="bg-white border border-black/8 rounded-[20px] p-5"
    >
      <div
        className="text-[11px] font-medium tracking-[0.12em] uppercase mb-4"
        style={{ color: 'var(--ink4, #ababab)' }}
      >
        Platform Stats
      </div>

      {/* 2x3 stat grid */}
      <div className="grid grid-cols-2 gap-px bg-black/8 rounded-xl overflow-hidden">
        {STAT_ITEMS.map((item) => {
          const val = stats[item.key]
          const display = item.suffix ? `${val}${item.suffix}` : val
          return (
            <div
              key={item.key}
              className="bg-white p-3.5 transition-colors hover:bg-[#faf8f5]"
            >
              <div
                className="text-[26px] font-normal leading-none mb-1"
                style={{
                  fontFamily: 'var(--serif)',
                  color: item.color || 'var(--ink)',
                }}
              >
                {display}
              </div>
              <div
                className="text-[11px] uppercase tracking-[0.06em]"
                style={{ color: 'var(--ink4, #ababab)' }}
              >
                {item.label}
              </div>
            </div>
          )
        })}
      </div>

      {/* Engagement breakdown */}
      <div className="mt-[18px]">
        <div
          className="text-[11px] font-medium tracking-[0.12em] uppercase mb-2.5"
          style={{ color: 'var(--ink4, #ababab)' }}
        >
          Engagement Breakdown
        </div>

        <div className="flex flex-col gap-2">
          {engagementBreakdown.map((item, i) => (
            <div key={i} className="flex items-center gap-2.5">
              <span
                className="text-[12.5px] min-w-[90px]"
                style={{ color: 'var(--ink3)' }}
              >
                {item.label}
              </span>
              <div className="flex-1 h-[5px] rounded-full overflow-hidden" style={{ background: 'var(--cream)' }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${item.value}%` }}
                  transition={{ duration: 0.8, delay: 0.3 + i * 0.1 }}
                  className="h-full rounded-full"
                  style={{
                    background: 'var(--ink)',
                    opacity: item.value <= 10 ? 0.4 : 1,
                  }}
                />
              </div>
              <span
                className="text-xs font-medium min-w-[32px] text-right"
                style={{ color: 'var(--ink2)' }}
              >
                {item.raw}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
