import { useController } from 'react-hook-form'
import { CREATOR_TIERS, LOCATIONS } from '../utils'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const ErrorMsg = ({ children }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11.5, color: 'var(--red)', fontWeight: 400, marginTop: 2 }}>
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 11, height: 11, flexShrink: 0 }}>
      <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
    {children}
  </div>
)

const Field = ({ label, required, error, children }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
    <div style={{ fontSize: 12.5, fontWeight: 500, color: 'var(--ink2)', display: 'flex', justifyContent: 'space-between' }}>
      <span>{label}</span>
      {required && <span style={{ color: 'var(--red)', fontSize: 11, fontWeight: 400 }}>required</span>}
    </div>
    {children}
    {error && <ErrorMsg>{error}</ErrorMsg>}
  </div>
)

export default function Step2Requirements({ control }) {
  const { field: creatorsField, fieldState: creatorsState } = useController({ name: 'creatorsNeeded', control })
  const { field: budgetField, fieldState: budgetState } = useController({ name: 'budgetPerCreator', control })
  const { field: followersField } = useController({ name: 'minFollowers', control })
  const { field: engagementField } = useController({ name: 'minEngagementRate', control })
  const { field: tierField } = useController({ name: 'creatorTier', control })
  const { field: locationField } = useController({ name: 'preferredLocation', control })

  return (
    <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 16, padding: 24 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
        <div style={{ width: 30, height: 30, borderRadius: 8, background: 'var(--cream)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 15, height: 15, opacity: .6 }}>
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        </div>
        <span style={{ fontFamily: 'var(--serif)', fontSize: 19, fontWeight: 400, color: 'var(--ink)' }}>Creator requirements</span>
      </div>
      <div style={{ fontSize: 12.5, color: 'var(--ink4)', fontWeight: 300, marginBottom: 22 }}>
        Define how many creators you need and what profile they should have
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 16 }}>
        <Field label="No. of creators needed" required error={creatorsState.error?.message}>
          <Input
            {...creatorsField}
            type="number" min="1"
            aria-invalid={!!creatorsState.error}
            placeholder="e.g. 10"
          />
        </Field>

        <Field label="Budget per creator" required error={budgetState.error?.message}>
          <div className="relative flex items-center">
            <span className="pointer-events-none absolute left-3.5 z-10 text-sm font-medium text-slate-500">₹</span>
            <Input
              {...budgetField}
              type="number"
              aria-invalid={!!budgetState.error}
              placeholder="e.g. 5000"
              className="pl-7"
            />
          </div>
        </Field>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 16 }}>
        <Field label="Min. followers">
          <Input
            {...followersField}
            type="number"
            placeholder="e.g. 10000"
          />
        </Field>
        <Field label="Min. engagement rate">
          <div className="relative flex items-center">
            <Input
              {...engagementField}
              type="number" step="0.1"
              placeholder="e.g. 3.5"
              className="pr-9"
            />
            <span className="pointer-events-none absolute right-3.5 text-xs text-slate-400">%</span>
          </div>
        </Field>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        <Field label="Creator tier">
          <Select
            value={tierField.value || '__none__'}
            onValueChange={v => tierField.onChange(v === '__none__' ? '' : v)}
          >
            <SelectTrigger className="h-11 w-full">
              <SelectValue placeholder="Any tier" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="__none__">Any tier</SelectItem>
              {CREATOR_TIERS.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
            </SelectContent>
          </Select>
        </Field>
        <Field label="Preferred location">
          <Select
            value={locationField.value || '__none__'}
            onValueChange={v => locationField.onChange(v === '__none__' ? '' : v)}
          >
            <SelectTrigger className="h-11 w-full">
              <SelectValue placeholder="Any location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="__none__">Any location</SelectItem>
              {LOCATIONS.map(l => <SelectItem key={l} value={l}>{l}</SelectItem>)}
            </SelectContent>
          </Select>
        </Field>
      </div>
    </div>
  )
}
