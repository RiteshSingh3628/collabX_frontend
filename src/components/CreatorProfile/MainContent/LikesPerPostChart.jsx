'use client'

import { motion } from 'motion/react'

export default function LikesPerPostChart({ data, average }) {
  const maxVal = Math.max(...data.map((d) => d.value))
  const highestIdx = data.findIndex((d) => d.value === maxVal)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-white border border-black/8 rounded-[20px] p-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-0">
        <div className="flex items-center gap-2.5" style={{ fontFamily: 'var(--serif)' }}>
          <span className="w-5 h-px" style={{ background: 'var(--red)' }} />
          <span className="text-[22px] font-normal" style={{ color: 'var(--ink)' }}>
            Likes Per Post
          </span>
        </div>
        <span
          className="text-[22px]"
          style={{ fontFamily: 'var(--serif)', color: '#1a7a45' }}
        >
          Avg {average}
        </span>
      </div>

      {/* Bars */}
      <div className="flex items-end gap-1.5 h-[120px] mt-3">
        {data.map((item, i) => {
          const pct = (item.value / maxVal) * 100
          const isActive = i === highestIdx
          return (
            <div key={i} className="flex-1 flex flex-col items-center gap-[5px]">
              <span
                className="text-[11px] font-medium"
                style={{ color: 'var(--ink3)' }}
              >
                {item.value}
              </span>
              <motion.div
                initial={{ height: 0 }}
                whileInView={{ height: `${pct}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                className="w-full rounded-t-[5px] min-h-1"
                style={{
                  background: isActive
                    ? 'linear-gradient(to top, var(--ink), #3a3a3a)'
                    : 'var(--ink)',
                  opacity: isActive ? 1 : 0.12,
                }}
              />
              <span
                className="text-[10px] whitespace-nowrap"
                style={{ color: 'var(--ink4, #ababab)' }}
              >
                {item.label}
              </span>
            </div>
          )
        })}
      </div>
    </motion.div>
  )
}
