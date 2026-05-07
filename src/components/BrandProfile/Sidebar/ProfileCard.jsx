'use client'

import { motion } from 'motion/react'
import {
  BadgeCheck,
  Briefcase,
  Users,
  DollarSign,
  Calendar,
  Clock,
  MapPin,
  Pencil,
  Plus,
  Eye,
} from 'lucide-react'

const FIELD_ICONS = { Briefcase, Users, DollarSign, Calendar, Clock, MapPin }

const TAG_STYLES = {
  green: { bg: 'var(--green-bg)', color: 'var(--green)' },
  blue: { bg: 'var(--blue-bg)', color: 'var(--blue)' },
  amber: { bg: 'var(--amber-bg)', color: 'var(--amber)' },
}

export default function ProfileCard({ profile, mode = 'user' }) {
  const isOwn = mode === 'own'
  const { name, industry, type, location, verified, fields, niches, activeCampaignsCount } = profile ?? {}

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white overflow-hidden"
      style={{ border: '1px solid var(--border)', borderRadius: 18 }}
    >
      <div style={{ padding: 20 }}>
        {/* Name + verified */}
        <div className="flex items-center" style={{ gap: 6, marginBottom: 2 }}>
          <span style={{ fontSize: 18, fontWeight: 600, color: 'var(--ink)' }}>
            {name}
          </span>
          {verified && (
            <span
              className="inline-flex items-center justify-center shrink-0"
              style={{ width: 16, height: 16, borderRadius: '50%', background: 'var(--blue)' }}
            >
              <BadgeCheck size={9} color="#fff" />
            </span>
          )}
        </div>

        <div style={{ fontSize: 12.5, color: 'var(--ink3)', marginBottom: 4 }}>
          {[industry, type].filter(Boolean).join(' · ')}
        </div>

        {/* Location */}
        {location && (
          <div
            className="flex items-center"
            style={{ gap: 4, fontSize: 12, color: 'var(--ink4)', marginBottom: 14 }}
          >
            <MapPin size={11} style={{ opacity: 0.5 }} />
            {location}
          </div>
        )}

        {/* Active campaigns badge */}
        {activeCampaignsCount > 0 && (
          <div
            className="inline-flex items-center"
            style={{
              gap: 5,
              fontSize: 11,
              padding: '4px 11px',
              borderRadius: 100,
              background: 'var(--green-bg)',
              color: 'var(--green)',
              marginBottom: 14,
            }}
          >
            <span
              style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--green)' }}
            />
            {activeCampaignsCount} campaigns running
          </div>
        )}

        {/* Editable / read-only fields */}
        <div
          className="flex flex-col overflow-hidden"
          style={{ border: '1px solid var(--border)', borderRadius: 10, marginBottom: 14 }}
        >
          {fields?.map((field, i) => {
            const Icon = FIELD_ICONS[field.icon]
            const isLast = i === fields.length - 1
            return (
              <div
                key={field.key}
                className={`flex items-center group ${isOwn ? 'cursor-pointer hover:bg-[var(--surface)]' : ''} transition-colors`}
                style={{
                  padding: '9px 13px',
                  borderBottom: isLast ? 'none' : '1px solid var(--border)',
                  gap: 10,
                }}
              >
                <div
                  className="inline-flex items-center justify-center shrink-0"
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 7,
                    background: 'var(--surface)',
                  }}
                >
                  {Icon && <Icon size={13} style={{ opacity: 0.5 }} />}
                </div>
                <span
                  className="shrink-0"
                  style={{ fontSize: 11.5, color: 'var(--ink4)', minWidth: 72 }}
                >
                  {field.key}
                </span>
                {field.tag ? (
                  <span
                    style={{
                      fontSize: 11,
                      padding: '2px 9px',
                      borderRadius: 100,
                      ...TAG_STYLES[field.tagColor || 'blue'],
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
                      color: field.valueColor || 'var(--ink2)',
                    }}
                  >
                    {field.value}
                  </span>
                )}
                {isOwn && (
                  <Pencil
                    size={12}
                    className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                    style={{ color: 'var(--ink4)' }}
                  />
                )}
              </div>
            )
          })}
        </div>

        {/* Niches */}
        <div
          style={{
            fontSize: 10.5,
            fontWeight: 500,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--ink4)',
            marginBottom: 8,
          }}
        >
          {isOwn ? 'Looking for creators in' : 'Looking for creators in'}
        </div>
        <div className="flex flex-wrap" style={{ gap: 5, marginBottom: 16 }}>
          {niches?.map((niche) => (
            <span
              key={niche}
              style={{
                fontSize: 11.5,
                padding: '4px 11px',
                borderRadius: 100,
                background: 'var(--blue-bg)',
                color: 'var(--blue)',
                border: '1px solid rgba(26,79,212,0.14)',
              }}
            >
              {niche}
            </span>
          ))}
          {isOwn && (
            <button
              type="button"
              className="inline-flex items-center transition-colors hover:!border-[var(--blue)] hover:!text-[var(--blue)]"
              style={{
                gap: 4,
                fontSize: 11,
                padding: '4px 11px',
                borderRadius: 100,
                background: 'transparent',
                color: 'var(--ink4)',
                border: '1px dashed var(--border2)',
                cursor: 'pointer',
              }}
            >
              <Plus size={10} />
              Add
            </button>
          )}
        </div>

        {/* CTAs */}
        {isOwn ? (
          <OwnerCTAs />
        ) : (
          <UserCTAs />
        )}
      </div>
    </motion.div>
  )
}

function OwnerCTAs() {
  return (
    <div className="flex flex-col" style={{ gap: 8 }}>
      <button
        type="button"
        className="inline-flex items-center justify-center transition-all hover:-translate-y-0.5"
        style={{
          width: '100%',
          gap: 7,
          fontSize: 13.5,
          fontWeight: 600,
          padding: '11px 0',
          borderRadius: 100,
          border: 'none',
          background: 'var(--ink)',
          color: '#fff',
          cursor: 'pointer',
        }}
      >
        <Plus size={14} />
        Create New Campaign
      </button>
      <button
        type="button"
        className="inline-flex items-center justify-center transition-colors hover:bg-[var(--bg-muted)]"
        style={{
          width: '100%',
          gap: 6,
          fontSize: 13,
          fontWeight: 500,
          padding: '9px 0',
          borderRadius: 100,
          border: '1px solid var(--border2)',
          background: 'transparent',
          color: 'var(--ink2)',
          cursor: 'pointer',
        }}
      >
        <Eye size={13} style={{ opacity: 0.6 }} />
        View as Creator
      </button>
    </div>
  )
}

function UserCTAs() {
  return (
    <div className="flex flex-col" style={{ gap: 8 }}>
      <button
        type="button"
        className="transition-all hover:-translate-y-0.5"
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
        }}
      >
        Apply to a Campaign →
      </button>
      <div className="flex" style={{ gap: 8 }}>
        <button
          type="button"
          className="flex-1 transition-colors hover:bg-[var(--bg-muted)]"
          style={{
            fontSize: 13,
            fontWeight: 500,
            padding: '9px 0',
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
          className="flex-1 transition-colors hover:bg-[var(--bg-muted)]"
          style={{
            fontSize: 13,
            fontWeight: 500,
            padding: '9px 0',
            borderRadius: 100,
            border: '1px solid var(--border2)',
            background: 'transparent',
            color: 'var(--ink2)',
            cursor: 'pointer',
          }}
        >
          Save Brand
        </button>
      </div>
    </div>
  )
}
