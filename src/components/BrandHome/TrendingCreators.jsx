import { BRAND_HOME_TRENDING } from '@/constants/brandHomeData'

async function getData() {
  // TODO: replace with real API call: GET /api/creators/trending
  return BRAND_HOME_TRENDING
}

export default async function TrendingCreators() {
  const creators = await getData()

  return (
    <div className="bg-white border border-(--border) rounded-2xl p-4.5">
      <h2 className="font-serif text-[17px] font-normal text-(--ink) mb-3.5">
        Trending creators{' '}
        <small className="text-xs font-light text-(--ink4) font-sans ml-1.5">this week</small>
      </h2>

      <div className="flex flex-col">
        {creators.map((c, i) => (
          <div
            key={c.name}
            className={[
              'flex items-center gap-2.5 py-2.5 cursor-pointer transition-all duration-150 hover:pl-1',
              i < creators.length - 1 ? 'border-b border-(--border)' : '',
            ].join(' ')}
          >
            <div
              className="w-9 h-9 rounded-[9px] shrink-0 flex items-center justify-center font-serif text-sm font-semibold text-white"
              style={{ background: c.avatarBg }}
            >
              {c.initial}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-medium text-(--ink) mb-px">{c.name}</p>
              <p className="text-[11.5px] text-(--ink4)">{c.meta}</p>
            </div>
            <span className="font-serif text-sm font-normal text-(--green) shrink-0">{c.earn}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
