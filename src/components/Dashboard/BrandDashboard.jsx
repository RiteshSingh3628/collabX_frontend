'use client'

import { motion } from 'motion/react'
import { TrendingUp, Users, Megaphone, DollarSign, ArrowRight, Plus } from 'lucide-react'
import Link from 'next/link'

const STATS = [
  { label: 'Active Campaigns', value: '0', icon: Megaphone, color: '#d43a2a' },
  { label: 'Creators Reached',  value: '0', icon: Users,     color: '#1a4fd4' },
  { label: 'Total Spend',       value: '₹0', icon: DollarSign, color: '#1a7a45' },
  { label: 'Avg. Engagement',   value: '0%', icon: TrendingUp, color: '#b45309' },
]

const QUICK_ACTIONS = [
  { label: 'Create Campaign', href: '/campaigns/create', primary: true },
  { label: 'Discover Creators', href: '/discover', primary: false },
]

export default function BrandDashboard({ user }) {
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
          Here&apos;s what&apos;s happening with your brand today.
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

      {/* Quick actions + placeholder */}
      <div
        className="grid grid-cols-1 min-[800px]:grid-cols-[1fr_300px]"
        style={{ gap: 14 }}
      >
        {/* Empty state - campaigns */}
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
            <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)' }}>Recent Campaigns</div>
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
              <Megaphone size={20} style={{ opacity: 0.35 }} />
            </div>
            <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--ink2)' }}>No campaigns yet</div>
            <div style={{ fontSize: 12.5, color: 'var(--ink4,#ababab)', textAlign: 'center', maxWidth: 260 }}>
              Create your first campaign and start collaborating with creators.
            </div>
            <Link
              href="/campaigns/new"
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
              <Plus size={14} /> Create Campaign
            </Link>
          </div>
        </motion.div>

        {/* Quick actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.35 }}
          style={{
            background: '#fff',
            border: '1px solid var(--border)',
            borderRadius: 18,
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
          }}
        >
          <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)', marginBottom: 6 }}>
            Quick Actions
          </div>
          {QUICK_ACTIONS.map((action) => (
            <Link
              key={action.label}
              href={action.href}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 16px',
                borderRadius: 12,
                background: action.primary ? 'var(--ink)' : 'var(--surface,#faf8f5)',
                border: action.primary ? 'none' : '1px solid var(--border)',
                color: action.primary ? '#fff' : 'var(--ink)',
                fontSize: 13.5,
                fontWeight: 500,
                textDecoration: 'none',
              }}
            >
              {action.label}
              <ArrowRight size={14} />
            </Link>
          ))}

          {/* Discover teaser */}
          <div
            style={{
              marginTop: 8,
              padding: '16px',
              borderRadius: 12,
              background: 'linear-gradient(135deg,#0a0a0a,#2e1f0a)',
              color: '#fff',
            }}
          >
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 4 }}>Find your creators</div>
            <div style={{ fontSize: 11.5, color: 'rgba(255,255,255,0.5)', marginBottom: 12 }}>
              Browse 1000+ verified creators across niches.
            </div>
            <Link
              href="/discover"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 5,
                fontSize: 12,
                fontWeight: 600,
                padding: '7px 14px',
                borderRadius: 100,
                background: 'var(--red,#d43a2a)',
                color: '#fff',
                textDecoration: 'none',
              }}
            >
              Explore <ArrowRight size={11} />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
