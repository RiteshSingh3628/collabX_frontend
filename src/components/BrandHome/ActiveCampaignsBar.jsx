import Link from 'next/link'
import { BRAND_HOME_CAMPAIGNS } from '@/constants/brandHomeData'

async function getData() {
  // TODO: replace with real API call: GET /api/brand/campaigns?status=active
  return BRAND_HOME_CAMPAIGNS
}

const STATUS_STYLES = {
  live: {
    dot: 'bg-(--green)',
    badge: 'bg-(--green-bg) text-(--green)',
    label: 'Live',
  },
  review: {
    dot: 'bg-(--amber)',
    badge: 'bg-(--amber-bg) text-(--amber)',
    label: 'In review',
  },
  draft: {
    dot: 'bg-(--ink4)',
    badge: 'bg-(--cream) text-(--ink4)',
    label: 'Draft',
  },
}

export default async function ActiveCampaignsBar() {
  const campaigns = await getData()

  return (
    <div className="bg-white border border-(--border) rounded-2xl p-4.5">
      <div className="flex items-center justify-between mb-3.5">
        <h2 className="font-serif text-[17px] font-normal text-(--ink)">Active campaigns</h2>
        <Link href="/campaigns" className="text-[12.5px] text-(--blue) no-underline hover:underline">
          Manage all →
        </Link>
      </div>

      <div className="flex flex-wrap gap-2">
        {campaigns.map((camp) => {
          const s = STATUS_STYLES[camp.status] ?? STATUS_STYLES.draft
          return (
            <div
              key={camp.id}
              className="flex items-center gap-2 px-3.5 py-2.25 rounded-xl border border-(--border) bg-(--surface) cursor-pointer flex-1 min-w-35 transition-colors duration-200 hover:border-(--border2) hover:bg-white"
            >
              <span className={`w-2 h-2 rounded-full shrink-0 ${s.dot}`} />
              <div className="flex-1 min-w-0">
                <p className="text-[12.5px] font-medium text-(--ink) truncate">{camp.name}</p>
                <p className="text-[11px] text-(--ink4) mt-px">{camp.meta}</p>
              </div>
              <span className={`text-[10.5px] px-2 py-0.5 rounded-full whitespace-nowrap shrink-0 ${s.badge}`}>
                {s.label}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
