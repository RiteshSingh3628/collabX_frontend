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

export default function CreatorProfilePage({ creatorId, creatorProfileData, overallAnalyticsData, heroBannerData }) {
  const router = useRouter()
  const [inviteOpen, setInviteOpen] = useState(false)
  const data = CREATOR_PROFILE

  return (
    <>
      {/* Hero banner */}
      <div style={{ marginTop: 58 }}>
        <HeroBanner profile={heroBannerData} />
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
          <ProfileCard profile={creatorProfileData} onInvite={() => setInviteOpen(true)} />
          <CampaignFitScore campaignFit={data.campaignFit} />
        </aside>

        {/* Right main */}
        <div className="flex flex-col" style={{ gap: 18 }}>
          <OverallAnalytics data={overallAnalyticsData} />
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
