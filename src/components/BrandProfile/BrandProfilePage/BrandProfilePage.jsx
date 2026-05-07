'use client'

import HeroBanner from '../HeroBanner'
import { ProfileCard } from '../Sidebar'
import {
  StatsOverview,
  CampaignsSection,
  ApplicationsInbox,
  AboutSection,
  PastCollabsReviews,
  ContactStrip,
} from '../MainContent'
import { BRAND_PROFILE } from '@/constants/brandProfileData'

export default function BrandProfilePage({ mode = 'user', profile = BRAND_PROFILE }) {
  const isOwn = mode === 'own'

  return (
    <>
      <HeroBanner profile={profile} mode={mode} />

      <div
        className="grid grid-cols-1 min-[960px]:grid-cols-[300px_1fr] items-start"
        style={{
          maxWidth: 1180,
          margin: '0 auto',
          padding: '40px 24px 80px',
          gap: 22,
        }}
      >
        <aside
          className="flex flex-col min-[960px]:sticky"
          style={{ gap: 14, top: 'calc(58px + 16px)' }}
        >
          <ProfileCard profile={profile} mode={mode} />
        </aside>

        <div className="flex flex-col" style={{ gap: 18 }}>
          <StatsOverview stats={profile.stats} />
          <CampaignsSection campaigns={profile.campaigns} mode={mode} />

          {isOwn && <ApplicationsInbox applications={profile.applications} />}

          <AboutSection bio={profile.bio} socials={profile.socials} mode={mode} />

          <PastCollabsReviews
            collabs={profile.pastCollabs}
            reviews={profile.reviews}
            summary={profile.reviewSummary}
            mode={mode}
          />

          {!isOwn && <ContactStrip brandName={profile.name} />}
        </div>
      </div>
    </>
  )
}
