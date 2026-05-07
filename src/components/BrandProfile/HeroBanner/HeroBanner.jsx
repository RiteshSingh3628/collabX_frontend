'use client'

import { BadgeCheck, Briefcase, Layers, TrendingUp, Pencil } from 'lucide-react'

export default function HeroBanner({ profile, mode = 'user' }) {
  const isOwn = mode === 'own'
  const {
    name,
    initial,
    industry,
    type,
    shortLocation,
    memberSince,
    verified,
    activeCampaignsCount,
  } = profile ?? {}

  return (
    <div
      className="relative overflow-hidden"
      style={{
        height: 260,
        background:
          'linear-gradient(135deg,#0a0f1c 0%,#0f1e38 45%,#162d54 100%)',
      }}
    >
      {/* Dot pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle,rgba(255,255,255,0.035) 1px,transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      />

      {/* Glow accents */}
      <div
        className="absolute pointer-events-none"
        style={{
          right: '8%',
          top: '50%',
          transform: 'translateY(-50%)',
          width: 320,
          height: 320,
          borderRadius: '50%',
          background:
            'radial-gradient(circle,rgba(26,79,212,0.3),transparent 70%)',
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          left: '18%',
          top: '15%',
          width: 180,
          height: 180,
          borderRadius: '50%',
          background:
            'radial-gradient(circle,rgba(212,58,42,0.12),transparent 70%)',
        }}
      />

      {/* Top-right chips */}
      <div className="absolute flex items-center" style={{ top: 20, right: 24, gap: 8 }}>
        <Chip icon={Briefcase}>{industry}</Chip>
        {type && <Chip icon={Layers}>{type}</Chip>}
        {activeCampaignsCount > 0 && (
          <Chip
            icon={TrendingUp}
            style={{
              background: 'rgba(26,122,69,0.2)',
              borderColor: 'rgba(26,122,69,0.35)',
              color: 'rgba(134,239,172,0.85)',
            }}
          >
            {activeCampaignsCount} active campaigns
          </Chip>
        )}
      </div>

      {/* Avatar + name row — fully inside banner */}
      <div
        className="absolute flex items-end"
        style={{ bottom: 24, left: 28, gap: 18 }}
      >
        {/* Avatar (fully visible inside banner) */}
        <div
          className="relative shrink-0 flex items-center justify-center overflow-hidden"
          style={{
            width: 96,
            height: 96,
            borderRadius: 20,
            border: '3px solid rgba(255,255,255,0.18)',
            background: 'linear-gradient(135deg,#0f1e38,#1a4fd4)',
            fontFamily: 'var(--serif)',
            fontSize: 38,
            fontWeight: 600,
            color: '#fff',
            boxShadow: '0 12px 36px rgba(0,0,0,0.45)',
            cursor: isOwn ? 'pointer' : 'default',
          }}
        >
          {initial}
          {isOwn && (
            <div
              className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
              style={{ background: 'rgba(0,0,0,0.45)' }}
            >
              <Pencil size={18} color="#fff" />
            </div>
          )}
        </div>

        {/* Text block */}
        <div className="flex flex-col" style={{ paddingBottom: 4 }}>
          <div
            className="flex items-center"
            style={{
              fontFamily: 'var(--serif)',
              fontSize: 30,
              fontWeight: 300,
              color: 'rgba(255,255,255,0.95)',
              letterSpacing: '0.02em',
              gap: 10,
              marginBottom: 4,
            }}
          >
            {name}
            {verified && (
              <span
                className="inline-flex items-center"
                style={{
                  gap: 4,
                  background: 'rgba(26,79,212,0.3)',
                  border: '1px solid rgba(26,79,212,0.5)',
                  borderRadius: 100,
                  padding: '3px 10px',
                  fontSize: 10.5,
                  fontWeight: 500,
                  color: 'rgba(255,255,255,0.75)',
                  letterSpacing: '0.04em',
                  fontFamily: 'var(--sans)',
                }}
              >
                <BadgeCheck size={10} />
                Verified Brand
              </span>
            )}
          </div>
          <div
            style={{
              fontSize: 13,
              color: 'rgba(255,255,255,0.45)',
              letterSpacing: '0.04em',
            }}
          >
            {[shortLocation, isOwn ? 'Brand account' : null, memberSince ? `Member since ${memberSince}` : null]
              .filter(Boolean)
              .join(' · ')}
          </div>
        </div>
      </div>
    </div>
  )
}

function Chip({ icon: Icon, children, style }) {
  return (
    <div
      className="inline-flex items-center"
      style={{
        gap: 5,
        background: 'rgba(255,255,255,0.07)',
        backdropFilter: 'blur(8px)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: 100,
        padding: '5px 12px',
        fontSize: 11.5,
        color: 'rgba(255,255,255,0.55)',
        ...style,
      }}
    >
      {Icon && <Icon size={12} />}
      {children}
    </div>
  )
}
