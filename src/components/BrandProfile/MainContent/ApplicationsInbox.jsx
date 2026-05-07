'use client'

import { useState } from 'react'
import { Users, TrendingUp, Instagram, DollarSign } from 'lucide-react'

const STAT_ICONS = { Users, TrendingUp, Instagram, DollarSign }

const TABS = [
  { id: 'pending', label: 'Pending' },
  { id: 'shortlisted', label: 'Shortlisted' },
  { id: 'rejected', label: 'Rejected' },
]

export default function ApplicationsInbox({ applications = [] }) {
  const [tab, setTab] = useState('pending')
  const counts = {
    pending: applications.length,
    shortlisted: 4,
    rejected: 2,
  }

  return (
    <section
      className="bg-white overflow-hidden"
      style={{ border: '1px solid var(--border)', borderRadius: 18 }}
    >
      <header
        className="flex items-center justify-between"
        style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)' }}
      >
        <div
          className="flex items-center"
          style={{
            gap: 8,
            fontFamily: 'var(--serif)',
            fontSize: 20,
            fontWeight: 400,
            color: 'var(--ink)',
          }}
        >
          <span style={{ width: 16, height: 2, background: 'var(--blue)', borderRadius: 2 }} />
          Applications Inbox
        </div>
        <span
          style={{
            fontSize: 11,
            fontWeight: 500,
            color: 'var(--red)',
            background: 'var(--red-bg)',
            padding: '3px 10px',
            borderRadius: 100,
          }}
        >
          {counts.pending} new
        </span>
      </header>

      <div
        className="flex"
        style={{ borderBottom: '1px solid var(--border)', padding: '0 20px' }}
      >
        {TABS.map((t) => {
          const isActive = tab === t.id
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className="inline-flex items-center transition-colors"
              style={{
                gap: 5,
                padding: '11px 16px',
                fontSize: 12.5,
                fontWeight: isActive ? 500 : 400,
                color: isActive ? 'var(--ink)' : 'var(--ink4)',
                border: 'none',
                background: 'none',
                cursor: 'pointer',
                borderBottom: `2px solid ${isActive ? 'var(--ink)' : 'transparent'}`,
                marginBottom: -1,
              }}
            >
              {t.label}
              <span
                style={{
                  fontSize: 10,
                  padding: '1px 7px',
                  borderRadius: 100,
                  background: isActive ? 'var(--red)' : 'var(--bg-muted)',
                  color: isActive ? '#fff' : 'var(--ink3)',
                  border: `1px solid ${isActive ? 'var(--red)' : 'var(--border)'}`,
                }}
              >
                {counts[t.id]}
              </span>
            </button>
          )
        })}
      </div>

      <div className="flex flex-col" style={{ padding: '14px 18px', gap: 10 }}>
        {tab === 'pending' ? (
          applications.map((app) => <ApplicationCard key={app.id} app={app} />)
        ) : (
          <div
            className="text-center"
            style={{ padding: '40px 20px', color: 'var(--ink4)', fontSize: 13 }}
          >
            {tab === 'shortlisted'
              ? `${counts.shortlisted} creators shortlisted — review and confirm to proceed`
              : `${counts.rejected} applications rejected`}
          </div>
        )}
      </div>
    </section>
  )
}

function ApplicationCard({ app }) {
  return (
    <article
      style={{
        border: '1px solid var(--border)',
        borderRadius: 14,
        padding: '14px 16px',
      }}
    >
      <div className="flex items-center" style={{ gap: 12, marginBottom: 10 }}>
        <div
          className="inline-flex items-center justify-center shrink-0"
          style={{
            width: 40,
            height: 40,
            borderRadius: 11,
            background: app.avatarColor,
            fontFamily: 'var(--serif)',
            fontSize: 17,
            fontWeight: 600,
            color: '#fff',
          }}
        >
          {app.avatarInitial}
        </div>
        <div>
          <div style={{ fontSize: 13.5, fontWeight: 500, color: 'var(--ink)' }}>
            {app.creatorName}
          </div>
          <div style={{ fontSize: 12, color: 'var(--ink4)' }}>
            {app.handle} · {app.followers} followers
          </div>
        </div>
        <span
          className="ml-auto shrink-0"
          style={{
            fontSize: 11,
            padding: '3px 10px',
            borderRadius: 100,
            background: 'var(--blue-bg)',
            color: 'var(--blue)',
          }}
        >
          {app.campaign}
        </span>
      </div>

      <div className="flex flex-wrap" style={{ gap: 8, marginBottom: 10 }}>
        {app.stats.map((s) => {
          const Icon = STAT_ICONS[s.icon]
          return (
            <div
              key={s.key}
              className="inline-flex items-center"
              style={{
                gap: 5,
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 8,
                padding: '5px 10px',
              }}
            >
              {Icon && <Icon size={14} style={{ opacity: 0.45 }} />}
              <div>
                <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink2)' }}>
                  {s.value}
                </div>
                <div style={{ fontSize: 10.5, color: 'var(--ink4)' }}>{s.key}</div>
              </div>
            </div>
          )
        })}
      </div>

      <p
        style={{
          fontSize: 13,
          fontWeight: 300,
          lineHeight: 1.65,
          color: 'var(--ink2)',
          padding: '10px 12px',
          background: 'var(--surface)',
          borderRadius: 9,
          border: '1px solid var(--border)',
          marginBottom: 10,
          fontFamily: 'var(--serif)',
          fontStyle: 'italic',
        }}
      >
        “{app.pitch}”
      </p>

      <div className="flex" style={{ gap: 8 }}>
        <button
          type="button"
          className="flex-1 transition-colors hover:!bg-[#156337]"
          style={{
            fontSize: 12.5,
            fontWeight: 600,
            padding: '8px 0',
            borderRadius: 100,
            background: 'var(--green)',
            color: '#fff',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Shortlist
        </button>
        <button
          type="button"
          className="transition-colors hover:bg-[var(--bg-muted)]"
          style={{
            fontSize: 12.5,
            fontWeight: 500,
            padding: '8px 16px',
            borderRadius: 100,
            border: '1px solid var(--border2)',
            background: 'transparent',
            color: 'var(--ink2)',
            cursor: 'pointer',
          }}
        >
          Message
        </button>
        <button
          type="button"
          className="transition-colors hover:!bg-[rgba(212,58,42,0.12)]"
          style={{
            fontSize: 12.5,
            fontWeight: 500,
            padding: '8px 14px',
            borderRadius: 100,
            border: '1px solid rgba(212,58,42,0.2)',
            background: 'var(--red-bg)',
            color: 'var(--red)',
            cursor: 'pointer',
          }}
        >
          Reject
        </button>
      </div>
    </article>
  )
}
