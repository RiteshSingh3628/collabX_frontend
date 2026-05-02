import { Suspense } from 'react'
import CreatorProfilePage from '@/components/CreatorProfile/CreatorProfilePage'
import HeroBannerSection from '@/components/CreatorProfile/HeroBannerSection'
import ProfileSection from '@/components/CreatorProfile/ProfileSection'
import AnalyticsSection from '@/components/CreatorProfile/AnalyticsSection'

export default function CreatorPage() {
  return (
    <CreatorProfilePage
      heroBannerSlot={
        <Suspense fallback={<div style={{ height: 220, background: 'linear-gradient(135deg,#0a0a0a,#1c1710,#2e1f0a)' }} />}>
          <HeroBannerSection />
        </Suspense>
      }
      profileCardSlot={
        <Suspense fallback={<div style={{ height: 320, borderRadius: 18, background: 'var(--warm,#f5f3ee)', animation: 'pulse 1.5s ease-in-out infinite' }} />}>
          <ProfileSection />
        </Suspense>
      }
      analyticsSlot={
        <Suspense fallback={<div style={{ height: 180, borderRadius: 18, background: 'var(--warm,#f5f3ee)', animation: 'pulse 1.5s ease-in-out infinite' }} />}>
          <AnalyticsSection />
        </Suspense>
      }
    />
  )
}
