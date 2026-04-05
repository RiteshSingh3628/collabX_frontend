'use client'

import { motion } from 'motion/react'
import {
  BadgeCheck,
  MapPin,
  Clock,
  MessageSquare,
  DollarSign,
  Calendar,
  Users,
} from 'lucide-react'

const FIELD_ICONS = { MapPin, Clock, MessageSquare, DollarSign, Calendar, Users }

export default function ProfileCard({ profile, onInvite }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        background: '#fff',
        border: '1px solid var(--border)',
        borderRadius: 18,
        overflow: 'hidden',
      }}
    >
      <div style={{ padding: 20 }}>
        {/* Name + verified */}
        <div
          className="flex items-center"
          style={{ gap: 6, marginBottom: 3 }}
        >
          <span style={{ fontSize: 18, fontWeight: 600, color: 'var(--ink)' }}>
            {profile?.name}
          </span>
          {profile?.verified && (
            <span
              className="flex items-center justify-center shrink-0"
              style={{
                width: 16,
                height: 16,
                borderRadius: '50%',
                background: '#1a4fd4',
              }}
            >
              <BadgeCheck size={8} color="#fff" />
            </span>
          )}
        </div>

        {/* Handle */}
        <div style={{ fontSize: '12.5px', color: 'var(--ink4, #ababab)', marginBottom: 14 }}>
          {profile?.handle} &middot; {profile?.platform}
        </div>

        {/* About */}
        <div
          style={{
            fontSize: '10.5px',
            fontWeight: 500,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--ink4, #ababab)',
            marginBottom: 14,
          }}
        >
          About
        </div>
        <div
          style={{
            fontSize: '13.5px',
            fontWeight: 300,
            lineHeight: 1.7,
            color: 'var(--ink2)',
            whiteSpace: 'pre-line',
            padding: 14,
            background: 'var(--surface, #faf8f5)',
            borderRadius: 10,
            border: '1px solid var(--border)',
            marginBottom: 14,
          }}
        >
          {profile?.bio}
        </div>

        {/* Creator info */}
        <div
          style={{
            fontSize: '10.5px',
            fontWeight: 500,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--ink4, #ababab)',
            marginBottom: 14,
          }}
        >
          Creator info
        </div>
        <div
          className="flex flex-col"
          style={{
            border: '1px solid var(--border)',
            borderRadius: 10,
            overflow: 'hidden',
            gap: 0,
          }}
        >
          {profile?.creatorInfo?.map((field, i) => {
            const Icon = FIELD_ICONS[field.icon]
            return (
              <div
                key={i}
                className="flex items-center"
                style={{
                  padding: '9px 13px',
                  borderBottom:
                    i < profile.creatorInfo.length - 1
                      ? '1px solid var(--border)'
                      : 'none',
                  gap: 10,
                }}
              >
                <div
                  className="flex items-center justify-center shrink-0"
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 7,
                    background: 'var(--surface, #faf8f5)',
                  }}
                >
                  {Icon && <Icon size={13} style={{ opacity: 0.5 }} />}
                </div>
                <span
                  className="shrink-0"
                  style={{
                    fontSize: '11.5px',
                    color: 'var(--ink4, #ababab)',
                    minWidth: 68,
                  }}
                >
                  {field.key}
                </span>
                {field.tag ? (
                  <span
                    style={{
                      fontSize: 11,
                      padding: '2px 9px',
                      borderRadius: 100,
                      background:
                        field.tagColor === 'green'
                          ? '#edfaf3'
                          : 'rgba(212,58,42,0.07)',
                      color:
                        field.tagColor === 'green' ? '#1a7a45' : '#d43a2a',
                    }}
                  >
                    {field.value}
                  </span>
                ) : (
                  <span
                    className="flex-1"
                    style={{
                      fontSize: 13,
                      fontWeight: field.bold ? 600 : 500,
                      color: field.muted
                        ? 'var(--ink4, #ababab)'
                        : field.valueColor || 'var(--ink2)',
                    }}
                  >
                    {field.value}
                  </span>
                )}
              </div>
            )
          })}
        </div>

        {/* Content niches */}
        <div
          style={{
            fontSize: '10.5px',
            fontWeight: 500,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--ink4, #ababab)',
            marginTop: 16,
            marginBottom: 14,
          }}
        >
          Content niches
        </div>
        <div className="flex flex-wrap" style={{ gap: 5, marginBottom: 16 }}>
          {profile?.niches?.map((niche) => (
            <span
              key={niche}
              style={{
                fontSize: '11.5px',
                padding: '4px 11px',
                borderRadius: 100,
                background: 'rgba(212,58,42,0.07)',
                color: '#d43a2a',
                border: '1px solid rgba(212,58,42,0.14)',
              }}
            >
              {niche}
            </span>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-col" style={{ gap: 8 }}>
          <button
            onClick={onInvite}
            style={{
              width: '100%',
              fontSize: 14,
              fontWeight: 600,
              padding: '11px 0',
              borderRadius: 100,
              border: 'none',
              background: 'var(--ink)',
              color: '#fff',
              cursor: 'pointer',
              fontFamily: 'var(--sans)',
              transition: 'all 0.22s',
            }}
          >
            Invite to campaign &rarr;
          </button>
          <div className="flex" style={{ gap: 8 }}>
            <button
              style={{
                flex: 1,
                fontSize: 13,
                fontWeight: 500,
                padding: '9px 0',
                borderRadius: 100,
                border: '1px solid rgba(10,10,10,0.15)',
                background: 'none',
                color: 'var(--ink2)',
                cursor: 'pointer',
                fontFamily: 'var(--sans)',
                transition: 'all 0.18s',
              }}
            >
              Message
            </button>
            <button
              style={{
                flex: 1,
                fontSize: 13,
                fontWeight: 500,
                padding: '9px 0',
                borderRadius: 100,
                border: '1px solid rgba(10,10,10,0.15)',
                background: 'none',
                color: 'var(--ink2)',
                cursor: 'pointer',
                fontFamily: 'var(--sans)',
                transition: 'all 0.18s',
              }}
            >
              Save profile
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
