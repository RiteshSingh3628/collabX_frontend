'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import { Monitor, MessageSquare } from 'lucide-react'

/* ── Empty State ── */
function EmptyState({ icon: Icon, title, subtitle }) {
  return (
    <div
      className="flex flex-col items-center text-center"
      style={{ padding: '52px 20px' }}
    >
      <div
        className="flex items-center justify-center"
        style={{
          width: 56,
          height: 56,
          borderRadius: 16,
          background: 'var(--surface, #faf8f5)',
          border: '1px solid var(--border)',
          marginBottom: 16,
        }}
      >
        <Icon size={24} style={{ opacity: 0.35 }} />
      </div>
      <div
        style={{
          fontFamily: 'var(--serif)',
          fontSize: 20,
          fontWeight: 400,
          color: 'var(--ink)',
          marginBottom: 8,
        }}
      >
        {title}
      </div>
      <p
        style={{
          fontSize: 13,
          fontWeight: 300,
          color: 'var(--ink4, #ababab)',
          lineHeight: 1.65,
          maxWidth: 320,
        }}
      >
        {subtitle}
      </p>
    </div>
  )
}

export default function PastWorksReviews({ creatorName }) {
  const [activeTab, setActiveTab] = useState('works')

  const tabs = [
    { id: 'works', label: 'Past works', count: 0 },
    { id: 'reviews', label: 'Reviews', count: 0 },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.16 }}
      style={{
        background: '#fff',
        border: '1px solid var(--border)',
        borderRadius: 18,
        overflow: 'hidden',
      }}
    >
      {/* Tabs */}
      <div
        className="flex"
        style={{
          borderBottom: '1px solid var(--border)',
          padding: '0 20px',
        }}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '13px 16px',
              fontSize: 13,
              fontWeight: activeTab === tab.id ? 500 : 400,
              color: activeTab === tab.id ? 'var(--ink)' : 'var(--ink4, #ababab)',
              border: 'none',
              background: 'none',
              cursor: 'pointer',
              borderBottom: `2px solid ${activeTab === tab.id ? 'var(--ink)' : 'transparent'}`,
              marginBottom: -1,
              fontFamily: 'var(--sans)',
              transition: 'color 0.18s',
            }}
          >
            {tab.label}{' '}
            <span
              style={{
                fontSize: 10,
                background: 'var(--amber-bg, #fdf5e6)',
                color: 'var(--amber, #a0620a)',
                padding: '1px 7px',
                borderRadius: 100,
                marginLeft: 4,
                fontWeight: 500,
              }}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ padding: 20 }}>
        {activeTab === 'works' ? (
          <EmptyState
            icon={Monitor}
            title="No past works yet"
            subtitle={`${creatorName} hasn\u2019t completed any brand collaborations on CollabXSphere yet. Once their first campaign wraps up, it\u2019ll appear here automatically.`}
          />
        ) : (
          <EmptyState
            icon={MessageSquare}
            title="No reviews yet"
            subtitle={`Brands leave reviews after a campaign wraps up. ${creatorName} is just getting started \u2014 be the first to collaborate and leave a review.`}
          />
        )}
      </div>
    </motion.div>
  )
}
