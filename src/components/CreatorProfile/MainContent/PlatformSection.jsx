'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import {
  Instagram,
  Youtube,
  Twitter,
  Video,
  Heart,
  MessageCircle,
} from 'lucide-react'
import { PLATFORM_TABS } from '@/constants/creatorProfileData'

const ICON_MAP = {
  Instagram,
  Youtube,
  Twitter,
}

/* ── Reusable Tab Bar ── */
function PlatformTabBar({ tabs, activeTab, onTabChange }) {
  return (
    <div
      className="flex"
      style={{
        borderBottom: '1px solid var(--border)',
        padding: '0 20px',
      }}
    >
      {tabs.map((tab) => {
        const Icon = ICON_MAP[tab.icon]
        const isActive = activeTab === tab.id
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onTabChange(tab.id)}
            className="flex items-center gap-[7px] cursor-pointer relative transition-colors duration-200"
            style={{
              padding: '14px 18px',
              fontSize: '13px',
              fontWeight: isActive ? 500 : 400,
              color: isActive ? 'var(--ink)' : 'var(--ink4)',
              border: 'none',
              background: 'none',
              borderBottom: `2px solid ${isActive ? 'var(--ink)' : 'transparent'}`,
              marginBottom: '-1px',
              fontFamily: 'var(--sans)',
            }}
          >
            {Icon && <Icon size={15} />}
            {tab.label}
            {tab.status === 'soon' && (
              <span
                style={{
                  fontSize: '9px',
                  fontWeight: 500,
                  background: 'var(--amber-bg, #fdf5e6)',
                  color: 'var(--amber, #a0620a)',
                  padding: '2px 6px',
                  borderRadius: '100px',
                }}
              >
                Soon
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}

/* ── Coming Soon Pane ── */
function ComingSoonPane({ tab }) {
  const Icon = ICON_MAP[tab.icon]
  return (
    <div
      className="flex flex-col items-center text-center"
      style={{ padding: '60px 20px' }}
    >
      <div
        className="flex items-center justify-center"
        style={{
          width: 56,
          height: 56,
          borderRadius: 16,
          background: 'var(--surface, #faf8f5)',
          border: '1px solid var(--border)',
          marginBottom: 16,
        }}
      >
        {Icon && <Icon size={26} style={{ opacity: 0.4 }} />}
      </div>
      <div
        style={{
          fontFamily: 'var(--serif)',
          fontSize: 20,
          fontWeight: 300,
          color: 'var(--ink)',
          marginBottom: 6,
        }}
      >
        {tab.label} coming soon
      </div>
      <p
        style={{
          fontSize: 13,
          color: 'var(--ink4)',
          lineHeight: 1.6,
          maxWidth: 280,
          margin: '0 auto',
        }}
      >
        Once this account is connected, you&apos;ll see followers, engagement,
        content performance and more here.
      </p>
    </div>
  )
}

/* ── Platform Stats Row (4-col grid) ── */
function PlatformStatsRow({ stats }) {
  const items = [
    { label: 'Followers', value: stats?.followers ?? '\u2014' },
    {
      label: 'Eng. rate',
      value: stats?.engagementRate ? `${stats.engagementRate}%` : '\u2014',
      green: true,
    },
    { label: 'Avg likes', value: stats?.avgLikes ?? '\u2014' },
    { label: 'Total posts', value: stats?.totalPosts ?? '\u2014' },
  ]

  return (
    <div
      className="grid grid-cols-2 min-[560px]:grid-cols-4 overflow-hidden"
      style={{
        gap: '1px',
        background: 'var(--border)',
        border: '1px solid var(--border)',
        borderRadius: 12,
        marginBottom: 18,
      }}
    >
      {items.map((item) => (
        <div key={item.label} style={{ background: '#fff', padding: '14px 16px' }}>
          <div
            style={{
              fontFamily: 'var(--serif)',
              fontSize: 24,
              fontWeight: 400,
              color: item.green ? 'var(--green, #1a7a45)' : 'var(--ink)',
              lineHeight: 1,
              marginBottom: 3,
            }}
          >
            {item.value}
          </div>
          <div
            style={{
              fontSize: '10.5px',
              color: 'var(--ink4)',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
            }}
          >
            {item.label}
          </div>
        </div>
      ))}
    </div>
  )
}

/* ── Post Card ── */
function PostCard({ post, index, isBest }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      onClick={() => post.link && window.open(post.link, '_blank')}
      className="group"
      style={{
        borderRadius: 12,
        overflow: 'hidden',
        position: 'relative',
        aspectRatio: '9/14',
        background: post.gradient,
        cursor: 'pointer',
        transition: 'transform 0.3s',
        outline: isBest ? '2px solid var(--green, #1a7a45)' : undefined,
        outlineOffset: isBest ? 2 : undefined,
      }}
    >
      {/* Placeholder center icon */}
      <div className="absolute inset-0 flex items-center justify-center">
        <Video size={24} className="text-white/30" />
      </div>

      {/* Type badge */}
      <div
        className="absolute flex items-center"
        style={{
          top: 8,
          left: 8,
          gap: 3,
          background: 'rgba(0,0,0,0.55)',
          backdropFilter: 'blur(4px)',
          color: '#fff',
          fontSize: '9.5px',
          fontWeight: 500,
          padding: '3px 8px',
          borderRadius: 100,
        }}
      >
        <Video size={9} />
        {post.type}
      </div>

      {/* Best badge */}
      {isBest && (
        <div
          className="absolute"
          style={{
            top: 8,
            right: 8,
            background: 'var(--green, #1a7a45)',
            color: '#fff',
            fontSize: 9,
            fontWeight: 600,
            padding: '2px 7px',
            borderRadius: 100,
            zIndex: 2,
          }}
        >
          Best
        </div>
      )}

      {/* Hover overlay */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 flex flex-col justify-end"
        style={{
          background: 'linear-gradient(to top,rgba(0,0,0,0.8),transparent 55%)',
          transition: 'opacity 0.25s',
          padding: 10,
        }}
      >
        <div className="flex" style={{ gap: 8 }}>
          <span
            className="flex items-center"
            style={{ gap: 3, fontSize: '11.5px', color: '#fff', fontWeight: 500 }}
          >
            <Heart size={11} style={{ opacity: 0.8 }} />
            {post.likes}
          </span>
          <span
            className="flex items-center"
            style={{ gap: 3, fontSize: '11.5px', color: '#fff', fontWeight: 500 }}
          >
            <MessageCircle size={11} style={{ opacity: 0.8 }} />
            {post.comments}
          </span>
        </div>
        <div
          className="line-clamp-2"
          style={{
            fontSize: '10.5px',
            color: 'rgba(255,255,255,0.6)',
            marginTop: 5,
            lineHeight: 1.4,
          }}
        >
          {post.caption}
        </div>
      </div>
    </motion.div>
  )
}

/* ── Engagement Breakdown ── */
function EngagementBreakdown({ breakdown }) {
  return (
    <div
      className="flex flex-col"
      style={{
        gap: 8,
        padding: 16,
        background: 'var(--surface, #faf8f5)',
        borderRadius: 12,
        border: '1px solid var(--border)',
        marginTop: 16,
      }}
    >
      <div
        style={{
          fontSize: 11,
          fontWeight: 500,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: 'var(--ink4)',
          marginBottom: 6,
        }}
      >
        Engagement breakdown
      </div>
      {breakdown.map((item, i) => (
        <div key={i} className="flex items-center" style={{ gap: 10 }}>
          <span style={{ fontSize: 12, color: 'var(--ink3)', minWidth: 80 }}>
            {item.label}
          </span>
          <div
            className="flex-1 overflow-hidden"
            style={{
              height: 5,
              background: 'var(--border)',
              borderRadius: 100,
            }}
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${item.value}%` }}
              transition={{ duration: 0.8, delay: 0.2 + i * 0.1 }}
              style={{
                height: '100%',
                borderRadius: 100,
                background: 'var(--ink)',
                opacity: item.value <= 10 ? 0.4 : 1,
              }}
            />
          </div>
          <span
            style={{
              fontSize: 12,
              fontWeight: 500,
              color: item.value <= 10 ? 'var(--ink4)' : 'var(--ink2)',
              minWidth: 36,
              textAlign: 'right',
            }}
          >
            {item.raw} {item.value > 10 ? 'avg' : ''}
          </span>
        </div>
      ))}
    </div>
  )
}

/* ── Instagram Pane ── */
function InstagramPane({ stats, posts, engagementBreakdown }) {
  const bestIdx = posts.reduce(
    (best, p, i) => (p.likes > posts[best].likes ? i : best),
    0
  )

  return (
    <div style={{ padding: 20 }}>
      <PlatformStatsRow stats={stats} />

      <div
        style={{
          fontSize: 11,
          fontWeight: 500,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: 'var(--ink4)',
          marginBottom: 12,
        }}
      >
        Recent posts
      </div>

      <div
        className="grid grid-cols-2 min-[560px]:grid-cols-3 min-[820px]:grid-cols-4"
        style={{ gap: 10 }}
      >
        {posts.map((post, i) => (
          <PostCard key={post.id} post={post} index={i} isBest={i === bestIdx} />
        ))}
      </div>

      {engagementBreakdown && (
        <EngagementBreakdown breakdown={engagementBreakdown} />
      )}
    </div>
  )
}

/* ── Main Platform Section ── */
export default function PlatformSection({ stats, posts, engagementBreakdown }) {
  const [activeTab, setActiveTab] = useState(PLATFORM_TABS[0].id)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.08 }}
      style={{
        background: 'var(--white, #fff)',
        border: '1px solid var(--border)',
        borderRadius: 18,
        overflow: 'hidden',
      }}
    >
      {/* Tab bar */}
      <PlatformTabBar
        tabs={PLATFORM_TABS}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Tab content */}
      {activeTab === 'instagram' ? (
        <InstagramPane
          stats={stats}
          posts={posts}
          engagementBreakdown={engagementBreakdown}
        />
      ) : (
        <ComingSoonPane tab={PLATFORM_TABS.find((t) => t.id === activeTab)} />
      )}
    </motion.div>
  )
}
