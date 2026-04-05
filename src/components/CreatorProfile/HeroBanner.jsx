'use client'

import { Instagram, Youtube, Twitter } from 'lucide-react'
import { PLATFORM_TABS } from '@/constants/creatorProfileData'

const ICON_MAP = { Instagram, Youtube, Twitter }

export default function HeroBanner({ profile }) {
  return (
    <div className="relative" style={{ marginBottom: 36 }}>
    <div
      className="relative overflow-hidden"
      style={{
        height: 220,
        background: 'linear-gradient(135deg,#0a0a0a 0%,#1c1710 40%,#2e1f0a 100%)',
      }}
    >
      {/* Dot pattern */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(circle,rgba(255,255,255,0.04) 1px,transparent 1px)',
          backgroundSize: '18px 18px',
        }}
      />
      {/* Red glow */}
      <div
        className="absolute"
        style={{
          right: '10%',
          top: '50%',
          transform: 'translateY(-50%)',
          width: 300,
          height: 300,
          borderRadius: '50%',
          background:
            'radial-gradient(circle,rgba(212,58,42,0.2),transparent 70%)',
        }}
      />
      {/* Gold glow */}
      <div
        className="absolute"
        style={{
          left: '20%',
          top: '30%',
          width: 200,
          height: 200,
          borderRadius: '50%',
          background:
            'radial-gradient(circle,rgba(201,168,76,0.1),transparent 70%)',
        }}
      />

      {/* Platform pills top-right */}
      <div
        className="absolute flex"
        style={{ top: 24, right: 32, gap: 8 }}
      >
        {PLATFORM_TABS.map((tab) => {
          const Icon = ICON_MAP[tab.icon]
          const isConnected = tab.status === 'connected'
          return (
            <div
              key={tab.id}
              className="flex items-center"
              style={{
                gap: 6,
                background: 'rgba(255,255,255,0.08)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: 100,
                padding: '5px 12px',
                fontSize: '11.5px',
                color: 'rgba(255,255,255,0.6)',
                opacity: isConnected ? 1 : 0.5,
              }}
            >
              {Icon && <Icon size={13} />}
              {tab.label} &middot; {isConnected ? 'Connected' : 'Soon'}
            </div>
          )
        })}
      </div>

      {/* Name text */}
      <div className="absolute" style={{ bottom: 28, left: 200 }}>
        <div
          style={{
            fontFamily: 'var(--serif)',
            fontSize: 32,
            fontWeight: 300,
            color: 'rgba(255,255,255,0.9)',
            letterSpacing: '0.02em',
            marginBottom: 4,
          }}
        >
          {profile?.fullName || profile?.name}
        </div>
        <div
          style={{
            fontSize: 13,
            color: 'rgba(255,255,255,0.4)',
            letterSpacing: '0.04em',
          }}
        >
          {profile?.handle} &middot; {profile?.role}
        </div>
      </div>
    </div>

      {/* Avatar - outside overflow-hidden banner so it's fully visible */}
      <div
        className="absolute"
        style={{ bottom: -36, left: 28, width: 90, height: 90, zIndex: 2 }}
      >
        <div
          className="overflow-hidden"
          style={{
            width: 90,
            height: 90,
            borderRadius: 22,
            border: '4px solid #fff',
            boxShadow: '0 12px 48px rgba(0,0,0,0.11)',
            background: 'linear-gradient(135deg,#d43a2a,#8a1a10)',
          }}
        >
          <div
            className="w-full h-full flex items-center justify-center"
            style={{
              fontFamily: 'var(--serif)',
              fontSize: 36,
              fontWeight: 300,
              color: '#fff',
            }}
          >
            {profile?.name?.charAt(0)}
          </div>
        </div>
        {/* Instagram badge */}
        <div
          className="absolute flex items-center justify-center"
          style={{
            bottom: -4,
            right: -4,
            width: 24,
            height: 24,
            borderRadius: 7,
            background:
              'linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)',
            border: '2px solid #fff',
          }}
        >
          <Instagram size={12} color="#fff" />
        </div>
      </div>
    </div>
  )
}
