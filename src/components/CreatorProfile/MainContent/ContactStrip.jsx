'use client'

import { motion } from 'motion/react'

export default function ContactStrip({ creatorName, onInvite }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="rounded-[20px] px-7 py-7 flex flex-col min-[920px]:flex-row items-start min-[920px]:items-center justify-between gap-6"
      style={{ background: 'var(--ink)' }}
    >
      <div>
        <div
          className="text-[22px] font-light text-white mb-1"
          style={{ fontFamily: 'var(--serif)' }}
        >
          Ready to collab with{' '}
          <em style={{ color: 'var(--red)' }}>{creatorName}?</em>
        </div>
        <div className="text-[13px]" style={{ color: 'rgba(255,255,255,0.45)' }}>
          Send a campaign invite or message directly &mdash; response usually within 24 hrs.
        </div>
      </div>

      <div className="flex gap-2.5 shrink-0">
        <button className="text-[13px] font-medium px-6 py-[11px] rounded-full text-white border border-white/20 bg-white/10 cursor-pointer transition-all duration-200 whitespace-nowrap hover:bg-white/[0.18]">
          Send message
        </button>
        <button
          onClick={onInvite}
          className="text-[13px] font-semibold px-7 py-[11px] rounded-full text-white border-none cursor-pointer transition-all duration-200 whitespace-nowrap hover:bg-[#b02d1f] hover:-translate-y-px hover:shadow-[0_8px_24px_rgba(212,58,42,0.35)]"
          style={{ background: 'var(--red)' }}
        >
          Invite to campaign &rarr;
        </button>
      </div>
    </motion.div>
  )
}
