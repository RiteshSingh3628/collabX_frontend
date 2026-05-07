import Link from 'next/link'
import { getBrandProfile } from '@/framework/server-action/brand/action'
import { BRAND_HOME_PROFILE } from '@/constants/brandHomeData'

function buildProfile(apiData) {
  const brand = apiData?.data ?? apiData ?? {}
  return {
    name: brand.brandName ?? BRAND_HOME_PROFILE.name,
    initial: (brand.brandName?.[0] ?? BRAND_HOME_PROFILE.initial).toUpperCase(),
    subtitle: [brand.industryType, brand.brandType].filter(Boolean).join(' · ') || BRAND_HOME_PROFILE.subtitle,
    isActive: (brand.totalCampaigns ?? 0) > 0,
    statsGrid: [
      { label: 'Campaign views',  value: BRAND_HOME_PROFILE.statsGrid[0].value },
      { label: 'Applications',    value: BRAND_HOME_PROFILE.statsGrid[1].value },
      { label: 'Total reach',     value: BRAND_HOME_PROFILE.statsGrid[2].value },
      { label: 'Budget spent',    value: BRAND_HOME_PROFILE.statsGrid[3].value },
    ],
    metrics: [
      { label: 'Active campaigns', value: String(brand.totalCampaigns ?? BRAND_HOME_PROFILE.metrics[0].value),       color: 'var(--green)' },
      { label: 'Creators hired',   value: String(brand.totalCollaborations ?? BRAND_HOME_PROFILE.metrics[1].value), color: 'var(--blue)'  },
      { label: 'Avg. engagement',  value: BRAND_HOME_PROFILE.metrics[2].value,                                      color: 'var(--blue)'  },
    ],
  }
}

async function getData() {
  const response = await getBrandProfile()
  if (!response?.success) return BRAND_HOME_PROFILE
  return buildProfile(response)
}

const METRIC_COLOR = {
  'var(--green)': 'text-(--green)',
  'var(--blue)': 'text-(--blue)',
}

export default async function BrandProfileCard() {
  const profile = await getData()

  return (
    <div className="bg-white border border-(--border) rounded-2xl overflow-hidden">
      {/* Banner */}
      <div
        className="h-18 relative"
        style={{ background: 'linear-gradient(135deg,#0f0f0f 0%,#1a0a05 60%,#3a1a10 100%)' }}
      >
        <div
          className="absolute -bottom-7 left-4.5 w-14 h-14 rounded-[13px] border-[3px] border-white flex items-center justify-center font-serif text-[22px] font-semibold text-white"
          style={{ background: 'linear-gradient(135deg,var(--red),#8a1a10)' }}
        >
          {profile.initial}
        </div>
      </div>

      {/* Info */}
      <div className="pt-9.5 px-4.5 pb-4">
        <p className="text-[15px] font-medium text-(--ink) mb-0.5">{profile.name}</p>
        <p className="text-xs text-(--ink3) leading-relaxed mb-2.5">{profile.subtitle}</p>

        {profile.isActive && (
          <div className="inline-flex items-center gap-1.25 text-[11px] px-2.5 py-0.75 rounded-full bg-(--red-bg) text-(--red) mb-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-(--red) shrink-0" />
            Active campaign running
          </div>
        )}

        {/* Stats 2×2 grid */}
        <div className="grid grid-cols-2 gap-2 mt-3">
          {profile.statsGrid.map((s) => (
            <div key={s.label} className="bg-(--cream) rounded-[10px] py-2.5 px-3">
              <p className="font-serif text-[19px] font-normal text-(--ink) leading-none">{s.value}</p>
              <p className="text-[10.5px] text-(--ink4) mt-0.75 uppercase tracking-wider">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Metrics */}
        <div className="border-t border-(--border) pt-3 mt-3.5 flex flex-col gap-1.5">
          {profile.metrics.map((m) => (
            <div key={m.label} className="flex justify-between items-center text-[12.5px]">
              <span className="text-(--ink3)">{m.label}</span>
              <span className={`font-semibold ${METRIC_COLOR[m.color] ?? 'text-(--blue)'}`}>
                {m.value}
              </span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <Link
          href="/campaigns/create"
          className="mt-3.5 flex items-center justify-center gap-2 w-full py-2.75 rounded-full bg-(--ink) text-white text-[13.5px] font-medium no-underline transition-colors duration-200 hover:bg-[#2a2a2a]"
        >
          <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Create campaign
        </Link>
      </div>
    </div>
  )
}
