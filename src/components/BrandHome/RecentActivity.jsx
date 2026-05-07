import { BRAND_HOME_ACTIVITY } from '@/constants/brandHomeData'

async function getData() {
  // TODO: replace with real API call: GET /api/brand/activity
  return BRAND_HOME_ACTIVITY
}

const DOT_COLOR = {
  green: 'bg-(--green)',
  blue: 'bg-(--blue)',
  red: 'bg-(--red)',
  amber: 'bg-(--amber)',
}

export default async function RecentActivity() {
  const activities = await getData()

  return (
    <div className="bg-white border border-(--border) rounded-2xl p-4.5">
      <h2 className="font-serif text-[17px] font-normal text-(--ink) mb-3.5">Recent activity</h2>

      <div className="flex flex-col">
        {activities.map((act, i) => (
          <div
            key={act.id}
            className={[
              'flex items-start gap-2.5 py-2.5',
              i < activities.length - 1 ? 'border-b border-(--border)' : '',
            ].join(' ')}
          >
            <span
              className={`w-2 h-2 rounded-full shrink-0 mt-1.25 ${DOT_COLOR[act.type] ?? 'bg-(--ink4)'}`}
            />
            <p className="text-[12.5px] text-(--ink2) leading-relaxed flex-1">
              {act.parts.map((part, pi) =>
                part.bold ? (
                  <strong key={pi} className="font-medium text-(--ink)">{part.text}</strong>
                ) : (
                  <span key={pi}>{part.text}</span>
                )
              )}
            </p>
            <span className="text-[11px] text-(--ink4) whitespace-nowrap shrink-0 mt-0.5">
              {act.time}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
