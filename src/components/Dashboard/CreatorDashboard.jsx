'use client'

import { motion } from 'motion/react'
import { Eye, Briefcase, Star, TrendingUp, ArrowRight, Bell } from 'lucide-react'
import Link from 'next/link'

const STATS = [
  { label: 'Profile Views',    value: '0',  icon: Eye,       color: '#d43a2a' },
  { label: 'Active Campaigns', value: '0',  icon: Briefcase, color: '#1a4fd4' },
  { label: 'Avg. Rating',      value: '—',  icon: Star,      color: '#b45309' },
  { label: 'Engagement Rate',  value: '0%', icon: TrendingUp, color: '#1a7a45' },
]

export default function CreatorDashboard({ user }) {
  return (
    <div style={{ maxWidth: 1180, margin: '0 auto', padding: '40px 24px 80px' }}>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        style={{ marginBottom: 32 }}
      >
        <div style={{ fontFamily: 'var(--serif)', fontSize: 28, fontWeight: 600, color: 'var(--ink)' }}>
          Welcome back{user?.fullName ? `, ${user.fullName.split(' ')[0]}` : ''} 👋
        </div>
        <div style={{ fontSize: 13.5, color: 'var(--ink4,#ababab)', marginTop: 4 }}>
          Here&apos;s your creator overview for today.
        </div>
      </motion.div>

      {/* Stats */}
      <div
        className="grid grid-cols-2 min-[720px]:grid-cols-4"
        style={{ gap: 14, marginBottom: 28 }}
      >
        {STATS.map((stat, i) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              style={{
                background: '#fff',
                border: '1px solid var(--border)',
                borderRadius: 16,
                padding: '20px 18px',
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  background: `${stat.color}14`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 14,
                }}
              >
                <Icon size={16} color={stat.color} />
              </div>
              <div style={{ fontSize: 24, fontWeight: 700, color: 'var(--ink)', lineHeight: 1 }}>
                {stat.value}
              </div>
              <div style={{ fontSize: 12, color: 'var(--ink4,#ababab)', marginTop: 4 }}>
                {stat.label}
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Main content */}
      <div
        className="grid grid-cols-1 min-[800px]:grid-cols-[1fr_300px]"
        style={{ gap: 14 }}
      >
        {/* Campaign invites empty state */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.28 }}
          style={{
            background: '#fff',
            border: '1px solid var(--border)',
            borderRadius: 18,
            padding: '28px 24px',
          }}
        >
          <div
            className="flex items-center justify-between"
            style={{ marginBottom: 20 }}
          >
            <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)' }}>Campaign Invites</div>
            <Link
              href="/campaigns"
              style={{ fontSize: 12.5, color: 'var(--red,#d43a2a)', display: 'flex', alignItems: 'center', gap: 4 }}
            >
              View all <ArrowRight size={12} />
            </Link>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '48px 0',
              gap: 12,
            }}
          >
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 14,
                background: 'var(--surface,#faf8f5)',
                border: '1px solid var(--border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Bell size={20} style={{ opacity: 0.35 }} />
            </div>
            <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--ink2)' }}>No invites yet</div>
            <div style={{ fontSize: 12.5, color: 'var(--ink4,#ababab)', textAlign: 'center', maxWidth: 260 }}>
              Brands will reach out once your profile is live. Make sure it&apos;s complete.
            </div>
            <Link
              href="/profile"
              style={{
                marginTop: 4,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                fontSize: 13,
                fontWeight: 600,
                padding: '9px 20px',
                borderRadius: 100,
                background: 'var(--ink)',
                color: '#fff',
                textDecoration: 'none',
              }}
            >
              Complete Profile
            </Link>
          </div>
        </motion.div>

        {/* Sidebar panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

          {/* Profile strength */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.35 }}
            style={{
              background: '#fff',
              border: '1px solid var(--border)',
              borderRadius: 18,
              padding: '20px',
            }}
          >
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', marginBottom: 12 }}>
              Profile Strength
            </div>
            <div
              style={{
                height: 6,
                borderRadius: 100,
                background: 'var(--surface,#f0ece6)',
                marginBottom: 8,
                overflow: 'hidden',
              }}
            >
              <div style={{ width: '40%', height: '100%', background: 'var(--red,#d43a2a)', borderRadius: 100 }} />
            </div>
            <div style={{ fontSize: 11.5, color: 'var(--ink4,#ababab)' }}>40% complete — add bio, niche &amp; socials</div>
          </motion.div>

          {/* Get discovered card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.42 }}
            style={{
              padding: '20px',
              borderRadius: 18,
              background: 'linear-gradient(135deg,#0a0a0a,#2e1f0a)',
              color: '#fff',
            }}
          >
            <div style={{ fontSize: 13.5, fontWeight: 600, marginBottom: 6 }}>Get Discovered</div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginBottom: 14, lineHeight: 1.6 }}>
              Brands are actively searching for creators. A complete profile gets 3× more invites.
            </div>
            <Link
              href="/profile"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 5,
                fontSize: 12,
                fontWeight: 600,
                padding: '8px 16px',
                borderRadius: 100,
                background: 'var(--red,#d43a2a)',
                color: '#fff',
                textDecoration: 'none',
              }}
            >
              Update Profile <ArrowRight size={11} />
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
