'use client'

import { motion } from 'motion/react'

export default function ProfileInsights({ insights }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.28 }}
      className="bg-white border border-black/8 rounded-[20px] p-5"
    >
      <div
        className="text-[11px] font-medium tracking-[0.12em] uppercase mb-3"
        style={{ color: 'var(--ink4, #ababab)', fontFamily: 'var(--sans)' }}
      >
        Profile Insights
      </div>

      {insights.map((item, i) => (
        <div
          key={i}
          className={`flex justify-between items-center py-2 text-[13px] ${
            i < insights.length - 1 ? 'border-b border-black/5' : ''
          }`}
        >
          <span style={{ color: 'var(--ink3)' }}>{item.label}</span>
          <span
            className="font-medium"
            style={{ color: item.syncing ? 'var(--ink3)' : 'var(--ink)' }}
          >
            {item.value}
          </span>
        </div>
      ))}
    </motion.div>
  )
}
