'use client'

import {
  LogIn,
  Users,
  Eye,
  TrendingUp,
  DollarSign,
  ArrowRight,
} from 'lucide-react'

const ICON_MAP = { LogIn, Users, Eye, TrendingUp, DollarSign }

const DELTA_COLORS = {
  up: 'var(--green)',
  down: 'var(--red)',
  na: 'var(--ink4)',
}

export default function StatsOverview({ stats, title = 'Campaign Performance', linkLabel = 'View full analytics' }) {
  return (
    <section
      className="bg-white overflow-hidden"
      style={{ border: '1px solid var(--border)', borderRadius: 18 }}
    >
      <header
        className="flex items-center justify-between"
        style={{ padding: '16px 20px 0' }}
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
          <span
            style={{ width: 16, height: 2, background: 'var(--blue)', borderRadius: 2 }}
          />
          {title}
        </div>
        <button
          type="button"
          className="inline-flex items-center transition-opacity hover:opacity-70"
          style={{
            gap: 4,
            fontSize: 12.5,
            color: 'var(--blue)',
            fontWeight: 500,
            background: 'none',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          {linkLabel}
          <ArrowRight size={13} />
        </button>
      </header>

      <div
        className="grid grid-cols-2 sm:grid-cols-3 min-[960px]:grid-cols-5"
        style={{
          gap: 1,
          background: 'var(--border)',
          marginTop: 16,
          borderTop: '1px solid var(--border)',
        }}
      >
        {stats?.map((stat) => {
          const Icon = ICON_MAP[stat.icon]
          return (
            <div
              key={stat.label}
              className="flex flex-col bg-white transition-colors hover:bg-[var(--surface)]"
              style={{ padding: '18px 16px', gap: 6 }}
            >
              <div
                className="inline-flex items-center justify-center"
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 9,
                  background: stat.iconBg,
                  marginBottom: 2,
                }}
              >
                {Icon && <Icon size={15} color={stat.iconColor} />}
              </div>
              <div
                style={{
                  fontFamily: 'var(--serif)',
                  fontSize: 24,
                  fontWeight: 400,
                  color: 'var(--ink)',
                  lineHeight: 1,
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontSize: 10.5,
                  color: 'var(--ink4)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.07em',
                }}
              >
                {stat.label}
              </div>
              <div
                className="inline-flex items-center"
                style={{
                  gap: 3,
                  fontSize: 11,
                  color: DELTA_COLORS[stat.deltaType] || 'var(--ink4)',
                  marginTop: 1,
                }}
              >
                {stat.delta}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
