'use client'

import Image from 'next/image'
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

const PLATFORM_COLORS = {
  Instagram: '#E1306C',
  Youtube: '#FF0000',
  Twitter: '#1DA1F2',
}

function formatNumber(num) {
  if (num == null) return '0'
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + 'M'
  if (num >= 1_000) return (num / 1_000).toFixed(1) + 'K'
  return String(num)
}

export default function OverallAnalytics({ data }) {
  const {
    combinedFollowers,
    avgEngagement,
    totalReach,
    totalPosts,
    avgLikesPerPost,
    engagementByPlatform: platformEngagement,
    bestPerformingPost,
  } = data ?? {}

  const overallMetrics = [
    { icon: 'Users', label: 'Followers', value: formatNumber(combinedFollowers), iconBg: 'rgba(26,77,212,0.08)', iconColor: '#1a4fd4' },
    { icon: 'Activity', label: 'Avg Engagement', value: `${avgEngagement ?? 0}%`, iconBg: 'rgba(26,122,69,0.08)', iconColor: '#1a7a45' },
    { icon: 'Eye', label: 'Total Reach', value: formatNumber(totalReach), iconBg: 'rgba(201,168,76,0.1)', iconColor: '#c9a84c' },
    { icon: 'Video', label: 'Total Posts', value: totalPosts ?? 0, iconBg: 'rgba(212,58,42,0.08)', iconColor: '#d43a2a' },
    { icon: 'Heart', label: 'Avg Likes / Post', value: formatNumber(avgLikesPerPost), iconBg: 'rgba(212,58,42,0.08)', iconColor: '#d43a2a' },
  ]

  const engagementByPlatform = platformEngagement?.map((p) => ({
    name: p.platform,
    value: `${p.engagement ?? p.avgEngagement ?? 0}%`,
    dotColor: PLATFORM_COLORS[p.platform] || '#999',
    active: true,
  }))

  const bestPost = bestPerformingPost ? {
    caption: bestPerformingPost.caption,
    likes: formatNumber(bestPerformingPost.likeCount),
    comments: formatNumber(bestPerformingPost.commentsCount),
    date: bestPerformingPost.timestamp,
    platform: bestPerformingPost.platform || 'Instagram',
    link: bestPerformingPost.permalink,
    thumbnail: bestPerformingPost.thumbnailUrl,
    gradient: 'linear-gradient(135deg,#d43a2a,#8a1a10)',
  } : null

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
              position: 'relative',
              width: 48,
              height: 48,
              borderRadius: 10,
              overflow: 'hidden',
              border: '1px solid var(--border)',
              background: bestPost.gradient,
            }}
          >
            {bestPost.thumbnail ? (
              <Image
                src={bestPost.thumbnail}
                alt=""
                fill
                style={{ objectFit: 'cover' }}
                unoptimized
              />
            ) : (
              <Video size={16} color="rgba(255,255,255,0.5)" />
            )}

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

    </motion.div>
  )
}
