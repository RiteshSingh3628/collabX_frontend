'use client'

import { useMemo, useState } from 'react'
import { Plus } from 'lucide-react'
import { STATUS_PILL_STYLES } from '@/constants/brandProfileData'

const PROGRESS_COLORS = {
  green: 'var(--green)',
  blue: 'var(--blue)',
  muted: 'var(--ink4)',
}

const OWN_TABS = [
  { id: 'all', label: 'All', filter: () => true },
  { id: 'active', label: 'Active', filter: (c) => c.status === 'active' },
  { id: 'reviewing', label: 'Reviewing', filter: (c) => c.status === 'reviewing' },
  { id: 'draft', label: 'Draft', filter: (c) => c.status === 'draft' },
]

export default function CampaignsSection({ campaigns = [], mode = 'user' }) {
  const isOwn = mode === 'own'
  const [tabId, setTabId] = useState('all')

  const visible = useMemo(() => {
    if (!isOwn) return campaigns.filter((c) => c.status !== 'draft')
    const tab = OWN_TABS.find((t) => t.id === tabId) ?? OWN_TABS[0]
    return campaigns.filter(tab.filter)
  }, [campaigns, isOwn, tabId])

  const activeCount = campaigns.filter((c) => c.status === 'active').length

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
          {isOwn ? 'My Campaigns' : 'Active Campaigns'}
        </div>
        <div className="flex items-center" style={{ gap: 8 }}>
          <span
            style={{
              fontSize: 11,
              fontWeight: 500,
              color: 'var(--blue)',
              background: 'var(--blue-bg)',
              padding: '3px 10px',
              borderRadius: 100,
            }}
          >
            {activeCount} {isOwn ? 'active' : 'running'}
          </span>
          {isOwn ? (
            <button
              type="button"
              className="inline-flex items-center transition-colors hover:bg-[#222]"
              style={{
                gap: 6,
                fontSize: 13,
                fontWeight: 600,
                padding: '8px 18px',
                borderRadius: 100,
                background: 'var(--ink)',
                color: '#fff',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              <Plus size={13} />
              New Campaign
            </button>
          ) : (
            <button
              type="button"
              className="transition-colors hover:bg-[var(--bg-muted)]"
              style={{
                fontSize: 12.5,
                color: 'var(--ink3)',
                cursor: 'pointer',
                border: '1px solid var(--border)',
                background: 'transparent',
                borderRadius: 100,
                padding: '5px 14px',
              }}
            >
              View all
            </button>
          )}
        </div>
      </header>

      {isOwn && (
        <div
          className="flex"
          style={{ borderBottom: '1px solid var(--border)', padding: '0 20px' }}
        >
          {OWN_TABS.map((tab) => {
            const count = campaigns.filter(tab.filter).length
            const isActive = tabId === tab.id
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setTabId(tab.id)}
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
                {tab.label}
                <span
                  style={{
                    fontSize: 10,
                    padding: '1px 7px',
                    borderRadius: 100,
                    background: isActive ? 'var(--ink)' : 'var(--bg-muted)',
                    color: isActive ? '#fff' : 'var(--ink3)',
                    border: `1px solid ${isActive ? 'var(--ink)' : 'var(--border)'}`,
                  }}
                >
                  {count}
                </span>
              </button>
            )
          })}
        </div>
      )}

      <div className="flex flex-col" style={{ padding: '14px 18px', gap: 10 }}>
        {visible.length === 0 ? (
          <div
            className="text-center"
            style={{ padding: '40px 20px', color: 'var(--ink4)', fontSize: 13 }}
          >
            No campaigns to show.
          </div>
        ) : (
          visible.map((campaign) => (
            <CampaignCard key={campaign.id} campaign={campaign} mode={mode} />
          ))
        )}
      </div>
    </section>
  )
}

function CampaignCard({ campaign, mode }) {
  const isOwn = mode === 'own'
  const status = STATUS_PILL_STYLES[campaign.status] ?? STATUS_PILL_STYLES.draft

  return (
    <article
      className="transition-shadow hover:shadow-md cursor-pointer"
      style={{
        border: '1px solid var(--border)',
        borderRadius: 14,
        padding: '14px 16px',
      }}
    >
      <div className="flex items-start" style={{ gap: 11, marginBottom: 10 }}>
        <div
          className="inline-flex items-center justify-center shrink-0"
          style={{
            width: 38,
            height: 38,
            borderRadius: 10,
            background: campaign.iconBg,
            fontSize: 16,
          }}
        >
          {campaign.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div
            className="truncate"
            style={{
              fontSize: 13.5,
              fontWeight: 500,
              color: 'var(--ink)',
              marginBottom: 3,
            }}
          >
            {campaign.name}
          </div>
          <div
            className="flex flex-wrap items-center"
            style={{ fontSize: 11.5, color: 'var(--ink4)', gap: 6 }}
          >
            {campaign.meta.map((m, i) => (
              <span key={i} className="inline-flex items-center" style={{ gap: 6 }}>
                {i > 0 && (
                  <span
                    style={{
                      width: 3,
                      height: 3,
                      borderRadius: '50%',
                      background: 'var(--border2)',
                    }}
                  />
                )}
                {m}
              </span>
            ))}
          </div>
        </div>
        <span
          className="shrink-0"
          style={{
            fontSize: 10.5,
            fontWeight: 500,
            padding: '3px 10px',
            borderRadius: 100,
            background: status.bg,
            color: status.color,
            border: campaign.status === 'draft' ? '1px solid var(--border)' : 'none',
          }}
        >
          {status.label}
        </span>
      </div>

      {/* Progress */}
      <div style={{ marginBottom: 10 }}>
        <div
          className="flex items-center justify-between"
          style={{ marginBottom: 4 }}
        >
          <span style={{ fontSize: 11, color: 'var(--ink4)' }}>
            {campaign.progressLabel}
          </span>
          <span style={{ fontSize: 11.5, fontWeight: 600, color: 'var(--ink2)' }}>
            {campaign.progressValue}
          </span>
        </div>
        <div
          style={{
            height: 4,
            background: 'var(--bg-muted)',
            borderRadius: 100,
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              height: '100%',
              borderRadius: 100,
              width: `${campaign.progressPct}%`,
              background: PROGRESS_COLORS[campaign.progressColor] || 'var(--blue)',
              transition: 'width 0.8s ease',
            }}
          />
        </div>
      </div>

      <div className="flex items-center flex-wrap" style={{ gap: 6 }}>
        {campaign.tags.map((tag) => (
          <span
            key={tag}
            style={{
              fontSize: 10,
              padding: '2px 8px',
              borderRadius: 100,
              background: 'var(--surface)',
              color: 'var(--ink3)',
              border: '1px solid var(--border)',
            }}
          >
            {tag}
          </span>
        ))}
        <div
          className="ml-auto inline-flex items-baseline"
          style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--ink)', gap: 4 }}
        >
          {campaign.budget}
          <span style={{ fontSize: 10.5, color: 'var(--ink4)', fontWeight: 400 }}>
            {campaign.budgetLabel}
          </span>
        </div>
        {isOwn && (
          <div className="flex" style={{ gap: 6, marginLeft: 4 }}>
            <CardActionButton>Edit</CardActionButton>
            <CardActionButton variant={campaign.status === 'draft' ? 'danger' : 'default'}>
              {campaign.status === 'draft' ? 'Delete' : campaign.status === 'reviewing' ? 'Close' : 'Pause'}
            </CardActionButton>
          </div>
        )}
      </div>
    </article>
  )
}

function CardActionButton({ children, variant = 'default' }) {
  const isDanger = variant === 'danger'
  return (
    <button
      type="button"
      className={`transition-colors ${isDanger ? 'hover:!bg-[var(--red-bg)] hover:!text-[var(--red)]' : 'hover:bg-[var(--bg-muted)]'}`}
      style={{
        fontSize: 11,
        padding: '4px 11px',
        borderRadius: 100,
        border: '1px solid var(--border)',
        background: 'transparent',
        color: 'var(--ink3)',
        cursor: 'pointer',
      }}
    >
      {children}
    </button>
  )
}
