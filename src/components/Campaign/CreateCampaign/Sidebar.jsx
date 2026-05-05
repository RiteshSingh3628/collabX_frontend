import { cn } from '@/lib/utils'
import { fmtDate, fmtINR, taskLine, TASK_META } from './utils'
import { Button } from '@/components/ui/button'

const STEP_LABELS = ['Campaign basics', 'Creator requirements', 'Deliverables', 'Campaign brief', 'Preview']

const CheckSvg = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
    strokeLinecap="round" strokeLinejoin="round" className="w-[13px] h-[13px]">
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

function SidebarRow({ label, value, money }) {
  const empty = !value
  return (
    <div className="flex justify-between items-baseline py-2 border-b border-(--border)">
      <span className="text-xs text-(--ink4)">{label}</span>
      <span className={cn(
        'text-right max-w-[58%]',
        money ? 'text-[15px] font-(--serif)' : 'text-[13px]',
        empty
          ? 'font-light italic text-(--ink4)'
          : money
            ? 'font-medium text-(--green)'
            : 'font-medium text-(--ink)',
      )}>
        {value || '—'}
      </span>
    </div>
  )
}

export default function Sidebar({ formData, step, onJump, onSaveDraft, isPending }) {
  const { title, category, budgetPerCreator, creatorsNeeded, startDate, endDate, tasks, brief } = formData

  let dates = null
  if (startDate && endDate) dates = `${fmtDate(startDate)} – ${fmtDate(endDate)}`
  else if (startDate) dates = `From ${fmtDate(startDate)}`

  const checks = [title, category, budgetPerCreator, creatorsNeeded, tasks?.length > 0, brief]
  const done = checks.filter(Boolean).length
  const pct = Math.round((done / checks.length) * 100)

  return (
    <div className="cc-anim-fade-up sticky top-[82px] flex flex-col gap-3.5">

      {/* Live preview card */}
      <div className="bg-white border border-(--border) rounded-2xl overflow-hidden">

        <div className="font-(--serif) text-base font-normal text-(--ink) px-[18px] py-[15px] border-b border-(--border)">
          Campaign preview
        </div>

        <div className="px-[18px] py-3.5">
          <SidebarRow label="Name" value={title} />
          <SidebarRow label="Category" value={category} />
          <SidebarRow
            label="Budget / creator"
            value={budgetPerCreator ? fmtINR(budgetPerCreator) : null}
            money={!!budgetPerCreator}
          />
          <SidebarRow label="Creators needed" value={creatorsNeeded ? `${creatorsNeeded} creators` : null} />
          <div className="flex justify-between items-baseline py-2">
            <span className="text-xs text-(--ink4)">Duration</span>
            <span className={cn(
              'text-[13px]',
              dates ? 'font-medium text-(--ink)' : 'font-light italic text-(--ink4)',
            )}>
              {dates || '—'}
            </span>
          </div>
        </div>

        {/* Task mini list */}
        {tasks?.length > 0 && (
          <div className="border-t border-(--border) px-[18px] pt-2.5 pb-3 flex flex-col gap-1">
            {tasks.map(t => {
              const m = TASK_META[t.type]
              return (
                <div key={t.id} className="flex items-center gap-[7px] text-xs text-(--ink2) px-2 py-[5px] bg-(--cream) rounded-[7px]">
                  {/* bg and color come from TASK_META — dynamic JS values, can't be Tailwind */}
                  <div
                    className="w-[17px] h-[17px] rounded shrink-0 flex items-center justify-center"
                    style={{ background: m.bg, color: m.color }}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                      strokeLinecap="round" strokeLinejoin="round" className="w-[9px] h-[9px]"
                      dangerouslySetInnerHTML={{ __html: m.svg }} />
                  </div>
                  {taskLine(t)}
                </div>
              )
            })}
          </div>
        )}

        {/* Completion bar */}
        <div className="px-[18px] py-3 border-t border-(--border)">
          <div className="flex justify-between mb-[7px] text-xs">
            <span className="text-(--ink3)">Completion</span>
            <span className="font-medium text-(--ink)">{pct}%</span>
          </div>
          <div className="h-[5px] bg-(--cream) rounded-full overflow-hidden">
            {/* width is a dynamic percentage — must stay inline */}
            <div
              className="h-[5px] rounded-full bg-(--green) transition-[width] duration-500 ease-out"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>

        {/* Step pills */}
        <div className="px-[18px] py-3 border-t border-(--border) flex flex-col gap-1.5">
          {STEP_LABELS.map((label, i) => {
            const n = i + 1
            const isActive = n === step
            const isDone = n < step
            return (
              <div
                key={n}
                onClick={() => isDone && onJump(n)}
                className={cn(
                  'flex items-center gap-2.5 px-2.5 py-2 rounded-[10px] transition-colors',
                  isActive ? 'bg-black/[.04]' : '',
                  isDone ? 'cursor-pointer hover:bg-(--cream)' : 'cursor-default',
                )}
              >
                <div className={cn(
                  'w-[22px] h-[22px] rounded-full shrink-0 flex items-center justify-center text-[10.5px] font-semibold transition-all border-[1.5px]',
                  isActive
                    ? 'border-(--ink) bg-(--ink) text-white'
                    : isDone
                      ? 'border-(--green-border) bg-(--green-bg) text-(--green)'
                      : 'border-(--border) bg-transparent text-(--ink4)',
                )}>
                  {isDone
                    ? <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"
                        strokeLinecap="round" strokeLinejoin="round" className="w-2.5 h-2.5">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    : n
                  }
                </div>
                <span className={cn(
                  'text-[12.5px] transition-colors',
                  isActive
                    ? 'font-medium text-(--ink)'
                    : isDone
                      ? 'text-(--green)'
                      : 'text-(--ink4)',
                )}>
                  {label}
                </span>
                {isDone && (
                  <span className="ml-auto text-(--green)">
                    <CheckSvg />
                  </span>
                )}
              </div>
            )
          })}
        </div>

        {/* Draft button */}
        <div className="px-[18px] pt-3 pb-4 border-t border-(--border)">
          <Button
            type="button"
            variant="outline"
            onClick={onSaveDraft}
            disabled={isPending}
            className="h-auto w-full rounded-full py-[9px] text-[13px] font-medium text-(--ink3) hover:bg-(--cream) hover:text-(--ink2)"
          >
            {isPending ? 'Saving…' : 'Save as draft'}
          </Button>
        </div>
      </div>

      {/* Tips card */}
      <div className="bg-white border border-(--border) rounded-2xl overflow-hidden">
        <div className="font-(--serif) text-base  text-(--ink) px-4.5 py-3.75 border-b border-(--border)">
          Tips
        </div>
        <div className="px-[18px] py-3.5">
          {[
            'Clear tasks help creators understand exactly what to produce — be specific about format and quantity.',
            'Campaigns with a detailed key message get 2× more quality applications.',
            'Setting a go-live window significantly improves on-time delivery.',
            'Add #Ad in your mandatory hashtags to stay ASCI compliant.',
          ].map((tip, i) => (
            <div
              key={i}
              className={cn(
                'flex items-start gap-2 text-[12.5px] text-(--ink3) leading-[1.55] font-light',
                i < 3 && 'mb-[9px]',
              )}
            >
              <div className="w-[5px] h-[5px] rounded-full bg-(--border2) shrink-0 mt-1.5" />
              {tip}
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
