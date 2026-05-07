'use client'

import { useState } from 'react'

const TABS = [
  { id: 'collabs', label: 'Past Collabs' },
  { id: 'reviews', label: 'Creator Reviews' },
]

export default function PastCollabsReviews({ collabs = [], reviews = [], summary, mode = 'user' }) {
  const [tab, setTab] = useState('collabs')
  const isOwn = mode === 'own'

  return (
    <section
      className="bg-white overflow-hidden"
      style={{ border: '1px solid var(--border)', borderRadius: 18 }}
    >
      <div
        className="flex items-center justify-between"
        style={{
          borderBottom: '1px solid var(--border)',
          padding: '0 20px',
        }}
      >
        <div className="flex">
          {TABS.map((t) => {
            const isActive = tab === t.id
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                className="transition-colors"
                style={{
                  padding: '13px 16px',
                  fontSize: 13,
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
              </button>
            )
          })}
        </div>
        {isOwn && tab === 'reviews' && (
          <span style={{ fontSize: 12, color: 'var(--ink4)' }}>Read-only</span>
        )}
      </div>

      <div style={{ padding: 20 }}>
        {tab === 'collabs' ? (
          <CollabsGrid collabs={collabs} />
        ) : (
          <ReviewsPane reviews={reviews} summary={summary} />
        )}
      </div>
    </section>
  )
}

function CollabsGrid({ collabs }) {
  if (collabs.length === 0) {
    return (
      <div
        className="text-center"
        style={{ padding: '40px 20px', color: 'var(--ink4)', fontSize: 13 }}
      >
        No past collaborations yet.
      </div>
    )
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: 14 }}>
      {collabs.map((c) => (
        <CollabCard key={c.id} collab={c} />
      ))}
    </div>
  )
}

function CollabCard({ collab }) {
  return (
    <article
      className="overflow-hidden cursor-pointer transition-all hover:shadow-md hover:-translate-y-0.5"
      style={{ border: '1px solid var(--border)', borderRadius: 14 }}
    >
      <div
        className="relative"
        style={{ height: 100, background: collab.bg, overflow: 'hidden' }}
      >
        <div
          className="flex items-center justify-center w-full h-full"
          style={{
            fontFamily: 'var(--serif)',
            fontSize: 36,
            fontWeight: 300,
            color: 'rgba(255,255,255,0.5)',
          }}
        >
          {collab.emoji}
        </div>
        <span
          className="absolute"
          style={{
            top: 8,
            right: 8,
            fontSize: 10,
            fontWeight: 500,
            padding: '3px 9px',
            borderRadius: 100,
            background: 'rgba(0,0,0,0.55)',
            backdropFilter: 'blur(4px)',
            color: '#fff',
          }}
        >
          {collab.platform}
        </span>
        <span
          className="absolute"
          style={{
            bottom: 8,
            left: 8,
            fontSize: 10.5,
            fontWeight: 600,
            padding: '3px 10px',
            borderRadius: 100,
            background: 'var(--green-bg)',
            color: 'var(--green)',
            border: '1px solid rgba(26,122,69,0.15)',
          }}
        >
          {collab.result}
        </span>
      </div>

      <div style={{ padding: '12px 14px' }}>
        <div className="flex items-center" style={{ gap: 8, marginBottom: 6 }}>
          <div
            className="inline-flex items-center justify-center shrink-0"
            style={{
              width: 28,
              height: 28,
              borderRadius: 8,
              background: collab.avatarBg,
              fontFamily: 'var(--serif)',
              fontSize: 12,
              fontWeight: 600,
              color: '#fff',
            }}
          >
            {collab.avatarInitial}
          </div>
          <div>
            <div style={{ fontSize: 13.5, fontWeight: 500, color: 'var(--ink)' }}>
              {collab.creatorName}
            </div>
            <div style={{ fontSize: 11.5, color: 'var(--ink4)' }}>{collab.handle}</div>
          </div>
        </div>
        <div
          className="truncate"
          style={{ fontSize: 12, color: 'var(--ink3)', marginBottom: 7 }}
        >
          {collab.campaign}
        </div>
        <div className="flex flex-wrap" style={{ gap: 5 }}>
          {collab.tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: 10.5,
                padding: '2px 9px',
                borderRadius: 100,
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                color: 'var(--ink3)',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  )
}

function ReviewsPane({ reviews, summary }) {
  return (
    <>
      {summary && <RatingSummary summary={summary} />}
      <div className="flex flex-col" style={{ gap: 12 }}>
        {reviews.map((r) => (
          <ReviewCard key={r.id} review={r} />
        ))}
      </div>
    </>
  )
}

function RatingSummary({ summary }) {
  return (
    <div
      className="flex items-center"
      style={{
        gap: 20,
        padding: 16,
        background: 'var(--surface)',
        borderRadius: 12,
        border: '1px solid var(--border)',
        marginBottom: 16,
      }}
    >
      <div className="text-center shrink-0">
        <div
          style={{
            fontFamily: 'var(--serif)',
            fontSize: 48,
            fontWeight: 300,
            color: 'var(--ink)',
            lineHeight: 1,
          }}
        >
          {summary.average}
        </div>
        <Stars rating={summary.average} size={16} />
        <div style={{ fontSize: 11.5, color: 'var(--ink4)' }}>
          {summary.total} reviews
        </div>
      </div>
      <div className="flex-1 flex flex-col" style={{ gap: 6 }}>
        {summary.breakdown.map((b) => (
          <div key={b.stars} className="flex items-center" style={{ gap: 8 }}>
            <span
              style={{ fontSize: 11.5, color: 'var(--ink3)', minWidth: 44 }}
            >
              {b.stars} stars
            </span>
            <div
              className="flex-1"
              style={{
                height: 5,
                background: 'var(--border)',
                borderRadius: 100,
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  height: '100%',
                  borderRadius: 100,
                  background: 'var(--amber)',
                  width: `${b.pct}%`,
                  transition: 'width 1s ease',
                }}
              />
            </div>
            <span
              style={{
                fontSize: 11,
                color: 'var(--ink4)',
                minWidth: 14,
                textAlign: 'right',
              }}
            >
              {b.count}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

function ReviewCard({ review }) {
  return (
    <article
      className="transition-colors"
      style={{
        border: '1px solid var(--border)',
        borderRadius: 14,
        padding: 16,
      }}
    >
      <header className="flex items-start" style={{ gap: 12, marginBottom: 12 }}>
        <div
          className="inline-flex items-center justify-center shrink-0"
          style={{
            width: 38,
            height: 38,
            borderRadius: 10,
            background: review.avatarBg,
            fontFamily: 'var(--serif)',
            fontSize: 15,
            fontWeight: 600,
            color: '#fff',
          }}
        >
          {review.avatarInitial}
        </div>
        <div>
          <div style={{ fontSize: 13.5, fontWeight: 500, color: 'var(--ink)' }}>
            {review.creatorName}
          </div>
          <div style={{ fontSize: 12, color: 'var(--ink4)', marginTop: 2 }}>
            {review.campaign}
          </div>
        </div>
        <div className="ml-auto">
          <Stars rating={review.stars} size={13} />
        </div>
      </header>
      <p
        style={{
          fontFamily: 'var(--serif)',
          fontStyle: 'italic',
          fontSize: 15,
          fontWeight: 300,
          lineHeight: 1.65,
          color: 'var(--ink2)',
          paddingLeft: 14,
          borderLeft: '2px solid var(--border2)',
          marginBottom: 10,
        }}
      >
        “{review.text}”
      </p>
      <div className="flex items-center justify-between flex-wrap" style={{ gap: 8 }}>
        <div className="flex flex-wrap" style={{ gap: 6 }}>
          {review.tags.map((t) => (
            <span
              key={t}
              style={{
                fontSize: 11,
                padding: '3px 9px',
                borderRadius: 100,
                background: 'var(--blue-bg)',
                color: 'var(--blue)',
              }}
            >
              {t}
            </span>
          ))}
        </div>
        <span style={{ fontSize: 11.5, color: 'var(--ink4)' }}>{review.date}</span>
      </div>
    </article>
  )
}

function Stars({ rating, size }) {
  const full = Math.floor(rating)
  const hasHalf = rating - full >= 0.5
  const total = 5
  return (
    <div
      className="inline-flex"
      style={{
        color: 'var(--amber)',
        fontSize: size,
        letterSpacing: 1,
        lineHeight: 1,
      }}
    >
      {Array.from({ length: total }).map((_, i) => {
        if (i < full) return <span key={i}>★</span>
        if (i === full && hasHalf) return <span key={i}>½</span>
        return (
          <span key={i} style={{ opacity: 0.25 }}>
            ★
          </span>
        )
      })}
    </div>
  )
}
