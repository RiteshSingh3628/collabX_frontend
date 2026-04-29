'use client'

import { useRouter } from 'next/navigation'
import { CampaignFitScore, PlatformSection, PastWorksReviews, ContactStrip } from './MainContent'
import { CREATOR_PROFILE } from '@/constants/creatorProfileData'

export default function CreatorProfilePage({ heroBannerSlot, profileCardSlot, analyticsSlot }) {
  const data = CREATOR_PROFILE

  return (
    <>
      {/* Hero banner */}
      <div style={{ marginTop: 58 }}>
        {heroBannerSlot}
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
          {profileCardSlot}
          <CampaignFitScore campaignFit={data.campaignFit} />
        </aside>

        {/* Right main */}
        <div className="flex flex-col" style={{ gap: 18 }}>
          {analyticsSlot}
          <PlatformSection
            stats={data.stats}
            posts={data.recentPosts}
            engagementBreakdown={data.engagementBreakdown}
          />
          <PastWorksReviews creatorName={data.name} />
          <ContactStrip creatorName={data.name} />
        </div>
      </div>
    </>
  )
}
