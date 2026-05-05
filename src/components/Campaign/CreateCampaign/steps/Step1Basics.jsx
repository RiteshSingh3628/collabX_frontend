import { useController } from 'react-hook-form'
import { CATEGORIES, CAMPAIGN_TYPES, NICHES, PLATFORMS } from '../utils'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { cn } from '@/lib/utils'

const Field = ({ label, required, optional, hint, error, children }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 16 }}>
    <div style={{ fontSize: 12.5, fontWeight: 500, color: 'var(--ink2)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <span>{label}</span>
      {required && <span style={{ color: 'var(--red)', fontSize: 11, fontWeight: 400 }}>required</span>}
      {optional && <span style={{ color: 'var(--ink4)', fontSize: 11.5, fontWeight: 400 }}>optional</span>}
    </div>
    {hint && <div style={{ fontSize: 11.5, color: 'var(--ink4)', lineHeight: 1.5, fontWeight: 300 }}>{hint}</div>}
    {children}
    {error && <ErrorMsg>{error}</ErrorMsg>}
  </div>
)

const ErrorMsg = ({ children }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11.5, color: 'var(--red)', fontWeight: 400, marginTop: 2 }}>
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 11, height: 11, flexShrink: 0 }}>
      <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
    {children}
  </div>
)

export default function Step1Basics({ control }) {
  const { field: titleField, fieldState: titleState } = useController({ name: 'title', control })
  const { field: goalField } = useController({ name: 'goal', control })
  const { field: categoryField, fieldState: categoryState } = useController({ name: 'category', control })
  const { field: campaignTypeField } = useController({ name: 'campaignType', control })
  const { field: startDateField, fieldState: startDateState } = useController({ name: 'startDate', control })
  const { field: endDateField } = useController({ name: 'endDate', control })
  const { field: platformsField, fieldState: platformsState } = useController({ name: 'platforms', control })
  const { field: nichesField } = useController({ name: 'niches', control })

  const togglePlatform = (platform) => {
    const cur = platformsField.value || []
    platformsField.onChange(cur.includes(platform) ? cur.filter(p => p !== platform) : [...cur, platform])
  }

  const toggleNiche = (niche) => {
    const cur = nichesField.value || []
    nichesField.onChange(cur.includes(niche) ? cur.filter(n => n !== niche) : [...cur, niche])
  }

  return (
    <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 16, padding: 24 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
        <div style={{ width: 30, height: 30, borderRadius: 8, background: 'var(--cream)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 15, height: 15, opacity: .6 }}>
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" />
          </svg>
        </div>
        <span style={{ fontFamily: 'var(--serif)', fontSize: 19, fontWeight: 400, color: 'var(--ink)' }}>Campaign basics</span>
      </div>
      <div style={{ fontSize: 12.5, color: 'var(--ink4)', fontWeight: 300, marginBottom: 22 }}>
        Set the name, goal, category and timeline for your campaign
      </div>

      <Field label="Campaign name" required error={titleState.error?.message}>
        <Input
          {...titleField}
          aria-invalid={!!titleState.error}
          placeholder="e.g. Summer Fitness Drop 2026"
        />
      </Field>

      <Field label="Campaign goal">
        <textarea
          {...goalField}
          className="w-full rounded-[10px] border border-slate-200 px-3.5 py-2.5 text-sm outline-none resize-y min-h-[86px] leading-relaxed transition-colors focus:bg-white focus:border-slate-400 placeholder:text-slate-500"
          placeholder="What do you want to achieve? Brand awareness, product launch, sales conversion…"
        />
      </Field>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 16 }}>
        <Field label="Category" required error={categoryState.error?.message}>
          <Select value={categoryField.value} onValueChange={categoryField.onChange}>
            <SelectTrigger className={cn('h-11 w-full', categoryState.error && 'border-destructive')}>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
            </SelectContent>
          </Select>
        </Field>
        <Field label="Campaign type">
          <Select value={campaignTypeField.value} onValueChange={campaignTypeField.onChange}>
            <SelectTrigger className="h-11 w-full">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              {CAMPAIGN_TYPES.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
            </SelectContent>
          </Select>
        </Field>
      </div>

      <Field label="Campaign duration" error={startDateState.error?.message}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 24px 1fr', alignItems: 'center', gap: 8 }}>
          <Input type="date" {...startDateField} aria-invalid={!!startDateState.error} />
          <div style={{ textAlign: 'center', fontSize: 13, color: 'var(--ink4)' }}>→</div>
          <Input type="date" {...endDateField} />
        </div>
      </Field>

      <div style={{ height: 1, background: 'var(--border)', margin: '20px 0' }} />

      <Field label="Platforms" required error={platformsState.error?.message}>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 4 }}>
          {PLATFORMS.map(p => {
            const on = platformsField.value?.includes(p.value)
            const hasErr = !!platformsState.error
            return (
              <Button
                key={p.value}
                type="button"
                variant="outline"
                onClick={() => togglePlatform(p.value)}
                className={cn(
                  'h-auto gap-[7px] rounded-[10px] px-3.5 py-[7px] text-[12.5px] font-normal',
                  on && 'border-(--ink) bg-(--ink) text-white hover:bg-(--ink) hover:text-white',
                  !on && hasErr && 'border-(--red-border) bg-(--red-bg) text-(--ink2) hover:bg-(--red-bg)',
                )}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"
                  style={{ width: 14, height: 14, opacity: on ? 1 : 0.65, flexShrink: 0 }}
                  dangerouslySetInnerHTML={{ __html: p.svg }}
                />
                {p.value}
              </Button>
            )
          })}
        </div>
      </Field>

      <Field label="Niche / content categories" hint="Select all that apply">
        <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap', marginTop: 6 }}>
          {NICHES.map(n => {
            const on = nichesField.value?.includes(n)
            return (
              <Button
                key={n}
                type="button"
                variant="outline"
                onClick={() => toggleNiche(n)}
                className={cn(
                  'h-auto rounded-full px-[13px] py-1.5 text-[12px] font-normal',
                  on
                    ? 'border-(--red) bg-(--red-bg) text-(--red) hover:bg-(--red-bg) hover:text-(--red)'
                    : 'text-(--ink2) hover:text-(--ink2)',
                )}
              >
                {n}
              </Button>
            )
          })}
        </div>
      </Field>
    </div>
  )
}
