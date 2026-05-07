import { BRAND_HOME_BUDGET } from '@/constants/brandHomeData'

async function getData() {
  // TODO: replace with real API call: GET /api/brand/budget
  return BRAND_HOME_BUDGET
}

const BAR_COLOR = {
  live: 'bg-(--green)',
  mid: 'bg-(--blue)',
  low: 'bg-(--amber)',
}

export default async function BudgetTracker() {
  const budget = await getData()

  return (
    <div className="bg-white border border-(--border) rounded-2xl p-4.5">
      <h2 className="font-serif text-[17px] font-normal text-(--ink) mb-3.5">Budget tracker</h2>

      <div className="flex flex-col gap-2.5">
        {budget.items.map((item) => (
          <div key={item.campaign} className="flex flex-col gap-1.25">
            <div className="flex justify-between items-baseline">
              <span className="text-[12.5px] font-medium text-(--ink)">{item.campaign}</span>
              <span className="text-[11.5px] text-(--ink4)">{item.spent} / {item.total}</span>
            </div>
            <div className="h-1.5 bg-(--cream) rounded-full overflow-hidden">
              <div
                className={`h-1.5 rounded-full transition-all duration-500 ${BAR_COLOR[item.variant] ?? 'bg-(--ink4)'}`}
                style={{ width: `${item.pct}%` }}
              />
            </div>
          </div>
        ))}

        <div className="flex justify-between items-center border-t border-(--border) pt-2.5 mt-1">
          <span className="text-xs text-(--ink3)">Total remaining</span>
          <span className="font-serif text-base font-normal text-(--ink)">{budget.totalRemaining}</span>
        </div>
      </div>
    </div>
  )
}
