'use client'

import { motion } from 'motion/react'
import {
  Users,
  Activity,
  Eye,
  Video,
  Heart,
  ExternalLink,
  MessageCircle,
  Calendar,
} from 'lucide-react'

const ICON_MAP = { Users, Activity, Eye, Video, Heart }

export default function OverallAnalytics({ data }) {
  const {
    overallMetrics,
    engagementByPlatform,
    bestPost,
    contentMix,
  } = data

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
      {/* Header */}
      <div
        className="flex items-center justify-between"
        style={{ padding: '16px 20px 0' }}
      >
        <div
          className="flex items-center"
          style={{
            fontFamily: 'var(--serif)',
            fontSize: 20,
            fontWeight: 400,
            color: 'var(--ink)',
            gap: 8,
          }}
        >
          <span
            style={{
              width: 16,
              height: 2,
              background: 'var(--red, #d43a2a)',
              borderRadius: 2,
              display: 'inline-block',
            }}
          />
          Overall Analytics
        </div>
        <a
          href="#"
          className="flex items-center"
          style={{
            fontSize: '12.5px',
            color: 'var(--red, #d43a2a)',
            fontWeight: 500,
            gap: 4,
            textDecoration: 'none',
            cursor: 'pointer',
          }}
        >
          Deep analytics
          <ExternalLink size={13} />
        </a>
      </div>

      {/* 5 metrics grid */}
      <div
        className="grid grid-cols-2 min-[640px]:grid-cols-3 min-[920px]:grid-cols-5"
        style={{
          gap: '1px',
          background: 'var(--border)',
          marginTop: 16,
          borderTop: '1px solid var(--border)',
        }}
      >
        {overallMetrics?.map((metric, i) => {
          const Icon = ICON_MAP[metric.icon]
          return (
            <div
              key={i}
              className="flex flex-col"
              style={{
                background: '#fff',
                padding: '18px 16px',
                gap: 6,
                transition: 'background 0.18s',
                cursor: 'default',
              }}
            >
              <div
                className="flex items-center justify-center"
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 9,
                  background: metric.iconBg,
                  marginBottom: 2,
                }}
              >
                {Icon && <Icon size={15} color={metric.iconColor} />}
              </div>
              <div
                style={{
                  fontFamily: 'var(--serif)',
                  fontSize: 24,
                  fontWeight: 400,
                  color: metric.valueColor || 'var(--ink)',
                  lineHeight: 1,
                }}
              >
                {metric.value}
              </div>
              <div
                style={{
                  fontSize: '10.5px',
                  color: 'var(--ink4, #ababab)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.07em',
                }}
              >
                {metric.label}
              </div>
              <div
                className="flex items-center"
                style={{
                  fontSize: 11,
                  gap: 3,
                  marginTop: 1,
                  color:
                    metric.deltaType === 'up'
                      ? 'var(--green, #1a7a45)'
                      : 'var(--ink4, #ababab)',
                }}
              >
                {metric.delta}
              </div>
            </div>
          )
        })}
      </div>

      {/* Engagement by platform */}
      <div
        className="flex items-center flex-wrap"
        style={{
          padding: '14px 20px',
          borderTop: '1px solid var(--border)',
          gap: 0,
        }}
      >
        <span
          className="shrink-0"
          style={{ fontSize: 12, color: 'var(--ink3)', minWidth: 130 }}
        >
          Engagement by platform
        </span>
        <div className="flex flex-wrap" style={{ gap: 12 }}>
          {engagementByPlatform?.map((p, i) => (
            <div
              key={i}
              className="flex items-center"
              style={{ gap: 7, opacity: p.active ? 1 : 0.35 }}
            >
              <span
                className="shrink-0"
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: p.dotColor,
                }}
              />
              <span style={{ fontSize: 12, color: 'var(--ink3)' }}>
                {p.name}
              </span>
              <span
                style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}
              >
                {p.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Best performing post */}
      {bestPost && (
        <div
          className="flex items-center cursor-pointer"
          onClick={() => bestPost.link && window.open(bestPost.link, '_blank')}
          style={{
            gap: 14,
            padding: '14px 20px',
            borderTop: '1px solid var(--border)',
            transition: 'background 0.18s',
          }}
        >
          {/* Thumb */}
          <div
            className="shrink-0 flex items-center justify-center"
            style={{
              width: 48,
              height: 48,
              borderRadius: 10,
              overflow: 'hidden',
              border: '1px solid var(--border)',
              background: bestPost.gradient,
            }}
          >
            <Video size={16} color="rgba(255,255,255,0.5)" />
          </div>
          {/* Info */}
          <div className="flex-1 min-w-0">
            <div
              style={{
                fontSize: '10.5px',
                color: 'var(--ink4, #ababab)',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                marginBottom: 4,
              }}
            >
              Best performing post (all platforms)
            </div>
            <div
              className="truncate"
              style={{ fontSize: 13, color: 'var(--ink2)' }}
            >
              {bestPost.caption}
            </div>
            <div className="flex" style={{ gap: 12, marginTop: 4 }}>
              <span
                className="flex items-center"
                style={{ fontSize: 12, color: 'var(--ink3)', gap: 4 }}
              >
                <Heart size={12} /> {bestPost.likes} likes
              </span>
              <span
                className="flex items-center"
                style={{ fontSize: 12, color: 'var(--ink3)', gap: 4 }}
              >
                <MessageCircle size={12} /> {bestPost.comments} comments
              </span>
              <span
                className="flex items-center"
                style={{ fontSize: 12, color: 'var(--ink3)', gap: 4 }}
              >
                <Calendar size={12} /> {bestPost.date}
              </span>
            </div>
          </div>
          {/* Tag */}
          <span
            className="shrink-0"
            style={{
              fontSize: 11,
              fontWeight: 500,
              padding: '4px 12px',
              borderRadius: 100,
              background: 'rgba(212,58,42,0.07)',
              color: '#d43a2a',
            }}
          >
            {bestPost.platform}
          </span>
          <ExternalLink
            size={16}
            className="shrink-0"
            style={{ color: 'var(--ink4, #ababab)' }}
          />
        </div>
      )}

      {/* Content mix */}
      {contentMix && (
        <div
          className="flex flex-wrap items-center"
          style={{
            gap: 6,
            padding: '12px 20px',
            borderTop: '1px solid var(--border)',
          }}
        >
          <span
            className="self-center"
            style={{
              fontSize: 12,
              color: 'var(--ink4, #ababab)',
              marginRight: 4,
            }}
          >
            Content mix:
          </span>
          {contentMix.map((item, i) => (
            <div
              key={i}
              className="flex items-center"
              style={{
                fontSize: '11.5px',
                padding: '5px 13px',
                borderRadius: 100,
                border: '1px solid var(--border)',
                background: 'var(--surface, #faf8f5)',
                color: 'var(--ink2)',
                gap: 6,
              }}
            >
              <span
                className="shrink-0"
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: '50%',
                  background: item.color,
                }}
              />
              {item.label}
              <span style={{ fontSize: '10.5px', color: 'var(--ink4, #ababab)', marginLeft: 2 }}>
                {item.pct}
              </span>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  )
}
