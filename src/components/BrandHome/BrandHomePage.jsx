import { Suspense } from 'react'
import BrandProfileCard from './BrandProfileCard'
import LeftNav from './LeftNav'
import ActiveCampaignsBar from './ActiveCampaignsBar'
import NewApplicantsCard from './NewApplicantsCard'
import CreatorDiscoveryFeed from './CreatorDiscoveryFeed'
import QuickActions from './QuickActions'
import TrendingCreators from './TrendingCreators'
import BudgetTracker from './BudgetTracker'
import RecentActivity from './RecentActivity'
import {
  ProfileCardSkeleton,
  CampaignBarSkeleton,
  ApplicantsSkeleton,
  RightCardSkeleton,
} from './Skeletons'

export default function BrandHomePage() {
  return (
    <div className="grid grid-cols-1 min-[720px]:grid-cols-[240px_1fr] min-[1050px]:grid-cols-[280px_1fr_300px] gap-5 max-w-290 mx-auto px-5 pt-6 pb-15 items-start">

      {/* ── LEFT COL ── */}
      <aside className="hidden min-[720px]:flex flex-col gap-3 sticky top-20">
        <Suspense fallback={<ProfileCardSkeleton />}>
          <BrandProfileCard />
        </Suspense>
        <LeftNav />
      </aside>

      {/* ── FEED ── */}
      <main className="flex flex-col gap-3.5 min-w-0">
        <Suspense fallback={<CampaignBarSkeleton />}>
          <ActiveCampaignsBar />
        </Suspense>

        <Suspense fallback={<ApplicantsSkeleton />}>
          <NewApplicantsCard />
        </Suspense>

        <CreatorDiscoveryFeed />
      </main>

      {/* ── RIGHT COL ── */}
      <aside className="hidden min-[1050px]:flex flex-col gap-3.5 sticky top-20">
        <QuickActions />

        <Suspense fallback={<RightCardSkeleton rows={4} />}>
          <TrendingCreators />
        </Suspense>

        <Suspense fallback={<RightCardSkeleton rows={3} />}>
          <BudgetTracker />
        </Suspense>

        <Suspense fallback={<RightCardSkeleton rows={4} />}>
          <RecentActivity />
        </Suspense>

        {/* Footer */}
        <div className="bg-white border border-(--border) rounded-2xl px-4.5 py-3.5">
          <div className="flex flex-wrap gap-x-3.5 gap-y-1.5">
            {['About', 'Help', 'Privacy', 'Terms', 'Careers'].map((l) => (
              <a key={l} href="#" className="text-[11px] text-(--ink4) no-underline hover:text-(--ink2) transition-colors duration-150">
                {l}
              </a>
            ))}
          </div>
          <p className="text-[11px] text-(--ink4) mt-2.5">CollabXSphere © 2025</p>
        </div>
      </aside>
    </div>
  )
}
