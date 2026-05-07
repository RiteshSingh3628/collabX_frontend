'use client'

import { useState } from 'react'

export default function CreatorCard({ creator }) {
  const [shortlisted, setShortlisted] = useState(false)
  const [messaged, setMessaged] = useState(false)
  const [invited, setInvited] = useState(false)

  return (
    <div className="bg-white border border-(--border) rounded-2xl overflow-hidden transition-shadow duration-200 hover:shadow-[0_4px_24px_rgba(0,0,0,0.08)]">
      {/* Cover */}
      <div className="h-22 relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: creator.coverBg }} />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle,rgba(255,255,255,.07) 1px,transparent 1px)',
            backgroundSize: '18px 18px',
          }}
        />
        <div
          className="absolute -bottom-6 left-4.5 w-13 h-13 rounded-[13px] border-[3px] border-white flex items-center justify-center font-serif text-xl font-semibold text-white"
          style={{ background: creator.avatarBg }}
        >
          {creator.initial}
        </div>
        <div className="absolute top-3 right-3.5 text-[11px] font-semibold px-2.75 py-1 rounded-full bg-white text-(--green) shadow-[0_1px_6px_rgba(0,0,0,0.12)]">
          {creator.matchHot ? '🔥 ' : ''}{creator.match}
        </div>
      </div>

      {/* Body */}
      <div className="pt-8 px-4.5 pb-0">
        {/* Name + verified */}
        <div className="flex items-center gap-1.5 mb-0.75">
          <span className="text-[15px] font-medium text-(--ink)">{creator.name}</span>
          {creator.verified && (
            <span className="w-3.75 h-3.75 bg-(--blue) rounded-full inline-flex items-center justify-center shrink-0">
              <svg width="7" height="7" viewBox="0 0 10 10" fill="none">
                <path d="M2 5l2.5 2.5L8 3" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          )}
        </div>

        <p className="text-xs text-(--ink4) mb-2.5">{creator.handle}</p>

        {/* Platforms */}
        <div className="flex flex-wrap gap-1.25 mb-3">
          {creator.platforms.map((p) => (
            <span key={p} className="text-[11px] px-2.5 py-0.75 rounded-full border border-(--border) text-(--ink2)">
              {p}
            </span>
          ))}
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 border border-(--border) rounded-[10px] overflow-hidden mb-3">
          {[
            { n: creator.followers, l: 'Followers' },
            { n: creator.engagement, l: 'Engage' },
            { n: creator.perPost, l: 'Per post' },
          ].map((stat, i) => (
            <div
              key={stat.l}
              className={`py-2.25 text-center ${i < 2 ? 'border-r border-(--border)' : ''}`}
            >
              <p className="font-serif text-[17px] font-normal text-(--ink) leading-none">{stat.n}</p>
              <p className="text-[10px] text-(--ink4) uppercase tracking-[0.06em] mt-0.5">{stat.l}</p>
            </div>
          ))}
        </div>

        {/* Niches */}
        <div className="flex flex-wrap gap-1.25 mb-3.5">
          {creator.niches.map((n) => (
            <span key={n} className="text-[11px] px-2.25 py-0.75 rounded-md bg-(--red-bg) text-(--red)">
              {n}
            </span>
          ))}
        </div>

        {/* Bio */}
        <p className="text-[13px] text-(--ink3) leading-relaxed mb-3.5 font-light">{creator.bio}</p>

        {/* Footer */}
        <div className="flex gap-2 pb-4">
          <button
            onClick={() => setShortlisted(true)}
            className="flex-1 text-[12.5px] font-medium py-2.25 rounded-full cursor-pointer border border-(--red-border) bg-(--red-bg) text-(--red) transition-colors duration-200 hover:bg-[rgba(212,58,42,0.14)] font-sans"
          >
            {shortlisted ? 'Shortlisted ✓' : 'Shortlist'}
          </button>
          <button
            onClick={() => setMessaged(true)}
            className="flex-1 text-[12.5px] font-medium py-2.25 rounded-full cursor-pointer border border-(--border) bg-transparent text-(--ink2) transition-colors duration-200 hover:bg-(--cream) font-sans"
          >
            {messaged ? 'Sent ✓' : 'Message'}
          </button>
          <button
            onClick={() => setInvited(true)}
            className="flex-1 text-[12.5px] font-medium py-2.25 rounded-full cursor-pointer border border-(--ink) bg-(--ink) text-white transition-colors duration-200 hover:bg-[#2a2a2a] font-sans"
          >
            {invited ? 'Invited ✓' : 'Invite to campaign'}
          </button>
        </div>
      </div>
    </div>
  )
}
