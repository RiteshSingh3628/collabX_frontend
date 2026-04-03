'use client'

import { motion } from 'motion/react'
import { BadgeCheck, MapPin, Instagram } from 'lucide-react'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'

export default function ProfileCard({ profile, onInvite }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white border border-black/8 rounded-[20px] overflow-hidden"
    >
      {/* Cover */}
      <div className="h-[100px] relative overflow-hidden" style={{ background: 'linear-gradient(135deg,#0a0a0a 0%,#1e1a14 50%,#2d2416 100%)' }}>
        {/* Dot pattern */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle,rgba(255,255,255,0.05) 1px,transparent 1px)',
            backgroundSize: '14px 14px',
          }}
        />
        {/* Glow */}
        <div
          className="absolute -bottom-[30px] -right-[30px] w-[120px] h-[120px] rounded-full"
          style={{ background: 'radial-gradient(circle,rgba(220,39,67,0.18),transparent 70%)' }}
        />

        {/* Avatar */}
        <div className="absolute -bottom-7 left-[22px]">
          <Avatar className="w-[72px] h-[72px] rounded-[18px] border-[3px] border-white shadow-md">
            <AvatarImage
              src={profile.avatar}
              alt={profile.name}
              className="object-cover object-top"
            />
            <AvatarFallback
              className="rounded-[18px] text-[28px] font-semibold text-white"
              style={{ background: 'linear-gradient(135deg,#d43a2a,#8a1a10)', fontFamily: 'var(--serif)' }}
            >
              {profile.name.charAt(0)}
            </AvatarFallback>
          </Avatar>

          {/* Platform badge */}
          <div
            className="absolute -bottom-1 -right-1 w-[22px] h-[22px] rounded-[6px] flex items-center justify-center border-2 border-white"
            style={{ background: 'linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)' }}
          >
            <Instagram size={11} className="text-white" />
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="pt-10 px-[22px] pb-[22px]">
        {/* Name row */}
        <div className="flex items-start justify-between mb-[3px]">
          <div className="flex items-center gap-1.5 text-[19px] font-semibold" style={{ color: 'var(--ink)' }}>
            {profile.name}
            {profile.verified && (
              <span className="w-[17px] h-[17px] rounded-full bg-[#1a4fd4] flex items-center justify-center shrink-0">
                <BadgeCheck size={10} className="text-white" />
              </span>
            )}
          </div>
          <span
            className="text-[11px] font-semibold px-2.5 py-[3px] rounded-full shrink-0 mt-[3px]"
            style={{ background: '#edfaf3', color: '#1a7a45' }}
          >
            {profile.matchLabel}
          </span>
        </div>

        {/* Handle */}
        <div className="text-[13px] mb-2.5" style={{ color: 'var(--ink4, #ababab)' }}>
          {profile.handle} &middot; {profile.platform}
        </div>

        {/* Bio */}
        <div
          className="text-[13.5px] font-light leading-[1.65] whitespace-pre-line mb-4"
          style={{ color: 'var(--ink2)' }}
        >
          {profile.bio}
        </div>

        {/* Location */}
        <div className="flex items-center gap-1.5 text-[12.5px] mb-4" style={{ color: 'var(--ink3)' }}>
          <MapPin size={13} className="opacity-50" />
          {profile.location} &middot; {profile.role}
        </div>

        {/* Niche tags */}
        <div className="flex flex-wrap gap-1.5 mb-[18px]">
          {profile.niches.map((niche) => (
            <span
              key={niche}
              className="text-[11.5px] px-3 py-1 rounded-full"
              style={{
                background: 'rgba(212,58,42,0.07)',
                color: 'var(--red)',
                border: '1px solid rgba(212,58,42,0.15)',
              }}
            >
              {niche}
            </span>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-col gap-2">
          <button
            onClick={onInvite}
            className="w-full text-sm font-semibold tracking-[0.02em] py-3 rounded-full bg-[--ink] text-white border-none cursor-pointer transition-all duration-200 hover:bg-[#2a2a2a] hover:-translate-y-px hover:shadow-[0_8px_24px_rgba(0,0,0,0.18)]"
          >
            Invite to campaign &rarr;
          </button>
          <div className="flex gap-2">
            <button className="flex-1 text-[13px] font-medium py-2.5 rounded-full border border-black/15 bg-transparent cursor-pointer transition-all duration-200 hover:bg-[--cream]" style={{ color: 'var(--ink2)' }}>
              Message
            </button>
            <button className="flex-1 text-[13px] font-medium py-2.5 rounded-full border border-black/15 bg-transparent cursor-pointer transition-all duration-200 hover:bg-[--cream]" style={{ color: 'var(--ink2)' }}>
              Save profile
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
