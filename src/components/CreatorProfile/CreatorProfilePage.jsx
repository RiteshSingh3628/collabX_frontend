'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'

import HeroBanner from './HeroBanner'
import { ProfileCard } from './Sidebar'
import {
  CampaignFitScore,
  OverallAnalytics,
  PlatformSection,
  PastWorksReviews,
  ContactStrip,
} from './MainContent'
import InviteModal from './InviteModal'
import { CREATOR_PROFILE } from '@/constants/creatorProfileData'

export default function CreatorProfilePage() {
  const router = useRouter()
  const [inviteOpen, setInviteOpen] = useState(false)
  const data = CREATOR_PROFILE

  return (
    <>
      {/* Nav bar */}
      <div
        className="fixed top-0 left-0 right-0 z-50 flex items-center"
        style={{
          height: 58,
          background: '#fff',
          borderBottom: '1px solid var(--border)',
          padding: '0 28px',
          gap: 12,
        }}
      >
        <button
          onClick={() => router.back()}
          className="flex items-center cursor-pointer"
          style={{
            gap: 6,
            fontSize: 13,
            color: 'var(--ink3)',
            border: 'none',
            background: 'none',
            fontFamily: 'var(--sans)',
            transition: 'color 0.18s',
          }}
        >
          <ArrowLeft size={15} />
          Back to discover
        </button>
        <div
          style={{
            width: 1,
            height: 18,
            background: 'rgba(10,10,10,0.15)',
          }}
        />
        <div
          className="flex items-center"
          style={{
            fontFamily: 'var(--serif)',
            fontSize: 18,
            fontWeight: 600,
            color: 'var(--ink)',
            gap: 8,
          }}
        >
          <div
            className="flex items-center justify-center shrink-0"
            style={{
              width: 24,
              height: 24,
              borderRadius: 6,
              background: 'var(--ink)',
            }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: '50%',
                background: 'var(--red, #d43a2a)',
                display: 'block',
              }}
            />
          </div>
          CollabXSphere
        </div>
        <span style={{ fontSize: 13, color: 'var(--ink4, #ababab)' }}>
          / Creator Profile
        </span>

        {/* Right buttons */}
        <div className="ml-auto flex items-center" style={{ gap: 8 }}>
          <button
            style={{
              fontSize: 13,
              fontWeight: 500,
              padding: '7px 18px',
              borderRadius: 100,
              cursor: 'pointer',
              border: '1px solid rgba(10,10,10,0.15)',
              background: 'none',
              color: 'var(--ink2)',
              fontFamily: 'var(--sans)',
              transition: 'all 0.2s',
            }}
          >
            Save to shortlist
          </button>
          <button
            onClick={() => setInviteOpen(true)}
            style={{
              fontSize: 13,
              fontWeight: 500,
              padding: '7px 18px',
              borderRadius: 100,
              cursor: 'pointer',
              border: '1px solid var(--red, #d43a2a)',
              background: 'var(--red, #d43a2a)',
              color: '#fff',
              fontFamily: 'var(--sans)',
              transition: 'all 0.2s',
            }}
          >
            Invite to campaign
          </button>
        </div>
      </div>

      {/* Hero banner */}
      <div style={{ marginTop: 58 }}>
        <HeroBanner profile={data} />
      </div>

      {/* Page grid */}
      <div
        className="grid grid-cols-1 min-[960px]:grid-cols-[300px_1fr] items-start"
        style={{
          maxWidth: 1180,
          margin: '0 auto',
          padding: '60px 24px 80px',
          gap: 22,
        }}
      >
        {/* Left sidebar */}
        <aside
          className="flex flex-col min-[960px]:sticky"
          style={{
            gap: 14,
            top: 'calc(58px + 16px)',
          }}
        >
          <ProfileCard profile={data} onInvite={() => setInviteOpen(true)} />
          <CampaignFitScore campaignFit={data.campaignFit} />
        </aside>

        {/* Right main */}
        <div className="flex flex-col" style={{ gap: 18 }}>
          <OverallAnalytics data={data} />
          <PlatformSection
            stats={data.stats}
            posts={data.recentPosts}
            engagementBreakdown={data.engagementBreakdown}
          />
          <PastWorksReviews creatorName={data.name} />
          <ContactStrip
            creatorName={data.name}
            onInvite={() => setInviteOpen(true)}
          />
        </div>
      </div>

      {/* Invite modal */}
      <InviteModal
        open={inviteOpen}
        onOpenChange={setInviteOpen}
        creatorName={data.name}
      />
    </>
  )
}
