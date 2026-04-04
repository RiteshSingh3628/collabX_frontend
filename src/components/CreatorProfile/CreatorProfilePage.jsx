'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'motion/react'
import { ArrowLeft } from 'lucide-react'

import { ProfileCard, StatsCard, ProfileInsights } from './Sidebar'
import { CampaignFitScore, RecentContent, LikesPerPostChart, ContactStrip } from './MainContent'
import InviteModal from './InviteModal'
import { CREATOR_PROFILE } from '@/constants/creatorProfileData'

export default function CreatorProfilePage() {
  const router = useRouter()
  const [inviteOpen, setInviteOpen] = useState(false)
  const data = CREATOR_PROFILE

  return (
    <>
      <div className="max-w-[1160px] mx-auto px-4 min-[920px]:px-6 py-7">
        {/* Back + breadcrumb */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="flex items-center gap-3 mb-6"
        >
          <button
            onClick={() => router.back()}
            className="flex items-center gap-[7px] text-[13px] font-normal border-none bg-transparent cursor-pointer transition-colors duration-200 hover:text-[--ink] p-0"
            style={{ color: 'var(--ink3)', fontFamily: 'var(--sans)' }}
          >
            <ArrowLeft size={16} />
            Back
          </button>
          <div className="w-px h-5" style={{ background: 'var(--border2)' }} />
          <span className="text-[13px]" style={{ color: 'var(--ink4, #ababab)' }}>
            Creator Profile
          </span>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 min-[920px]:grid-cols-[340px_1fr] gap-6 items-start">
          {/* Sidebar */}
          <aside className="flex flex-col gap-3.5 min-[920px]:sticky min-[920px]:top-[calc(64px+20px)] min-[920px]:self-start">
            <ProfileCard profile={data} onInvite={() => setInviteOpen(true)} />
            <StatsCard stats={data.stats} engagementBreakdown={data.engagementBreakdown} />
            <ProfileInsights insights={data.insights} />
          </aside>

          {/* Main content */}
          <div className="flex flex-col gap-5">
            <CampaignFitScore campaignFit={data.campaignFit} />
            <RecentContent posts={data.recentPosts} instagramUrl={data.instagramUrl} />
            <LikesPerPostChart data={data.likesPerPost} average={data.stats.avgLikes} />
            <ContactStrip creatorName={data.name} onInvite={() => setInviteOpen(true)} />
          </div>
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
