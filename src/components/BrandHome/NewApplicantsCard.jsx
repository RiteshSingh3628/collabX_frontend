import Link from 'next/link'
import { BRAND_HOME_APPLICANTS } from '@/constants/brandHomeData'

async function getData() {
  // TODO: replace with real API call: GET /api/brand/applicants?today=true
  return BRAND_HOME_APPLICANTS
}

const BADGE_STYLE = {
  match: 'bg-(--green-bg) text-(--green)',
  new: 'bg-(--blue-bg) text-(--blue)',
}

export default async function NewApplicantsCard() {
  const applicants = await getData()

  return (
    <div className="bg-white border border-(--border) rounded-2xl px-4.5 pt-4 pb-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-serif text-base font-normal text-(--ink)">New applicants today</h2>
        <span className="text-[11.5px] px-2.5 py-0.75 rounded-full bg-(--red-bg) text-(--red) font-medium">
          {applicants.length} new
        </span>
      </div>

      <div className="flex flex-col gap-0.5">
        {applicants.map((a) => {
          const badgeClass = BADGE_STYLE[a.badgeType] ?? BADGE_STYLE.new
          return (
            <div
              key={a.id}
              className="flex items-center gap-2.5 px-2 py-2.25 rounded-[10px] cursor-pointer transition-colors duration-150 hover:bg-(--cream)"
            >
              <div
                className="w-9.5 h-9.5 rounded-[10px] shrink-0 flex items-center justify-center font-serif text-[15px] font-semibold text-white"
                style={{ background: a.avatarBg }}
              >
                {a.initial}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-medium text-(--ink)">{a.name}</p>
                <p className="text-[11.5px] text-(--ink4) mt-px truncate">{a.sub}</p>
              </div>
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full whitespace-nowrap shrink-0 ${badgeClass}`}>
                {a.badge}
              </span>
            </div>
          )
        })}
      </div>

      <Link
        href="/applications"
        className="flex items-center justify-center gap-1.5 mt-2.5 p-2.25 rounded-[10px] border border-(--border) text-[13px] text-(--ink3) no-underline transition-colors duration-150 hover:bg-(--cream) hover:text-(--ink2)"
      >
        View all 24 applications →
      </Link>
    </div>
  )
}
