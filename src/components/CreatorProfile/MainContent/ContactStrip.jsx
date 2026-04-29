'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import InviteModal from '../InviteModal'

export default function ContactStrip({ creatorName }) {
  const [inviteOpen, setInviteOpen] = useState(false)
  return (
    <>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.16 }}
      className="flex flex-col min-[640px]:flex-row items-start min-[640px]:items-center justify-between"
      style={{
        background: 'var(--ink)',
        borderRadius: 18,
        padding: '24px 28px',
        gap: 24,
      }}
    >
      <div>
        <div
          style={{
            fontFamily: 'var(--serif)',
            fontSize: 20,
            fontWeight: 300,
            color: '#fff',
            marginBottom: 4,
          }}
        >
          Ready to collab with{' '}
          <em style={{ color: 'var(--red, #d43a2a)' }}>{creatorName}?</em>
        </div>
        <div style={{ fontSize: '12.5px', color: 'rgba(255,255,255,0.4)' }}>
          Send a campaign invite &mdash; response typically within 24 hrs.
        </div>
      </div>

      <div
        className="flex shrink-0 w-full min-[640px]:w-auto"
        style={{ gap: 10 }}
      >
        <button
          className="flex-1 min-[640px]:flex-none text-center"
          style={{
            fontSize: 13,
            fontWeight: 500,
            padding: '10px 22px',
            borderRadius: 100,
            background: 'rgba(255,255,255,0.1)',
            color: '#fff',
            border: '1px solid rgba(255,255,255,0.18)',
            cursor: 'pointer',
            fontFamily: 'var(--sans)',
            transition: 'all 0.18s',
          }}
        >
          Send message
        </button>
        <button
          onClick={() => setInviteOpen(true)}
          className="flex-1 min-[640px]:flex-none text-center"
          style={{
            fontSize: 13,
            fontWeight: 600,
            padding: '10px 24px',
            borderRadius: 100,
            background: 'var(--red, #d43a2a)',
            color: '#fff',
            border: 'none',
            cursor: 'pointer',
            fontFamily: 'var(--sans)',
            transition: 'all 0.22s',
          }}
        >
          Invite to campaign &rarr;
        </button>
      </div>
    </motion.div>

    <InviteModal
      open={inviteOpen}
      onOpenChange={setInviteOpen}
      creatorName={creatorName}
    />
    </>
  )
}
