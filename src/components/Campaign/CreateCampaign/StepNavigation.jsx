import { Button } from '@/components/ui/button'

const STEP_LABELS = ['Campaign basics', 'Creator requirements', 'Deliverables', 'Campaign brief', 'Preview']

export default function StepNavigation({ step, onBack, onNext, onPreview, isPending }) {
  const isLastBeforePreview = step === 4

  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      marginTop: 16, padding: '14px 18px',
      background: '#fff', border: '1px solid var(--border)', borderRadius: 14,
    }}>
      <div style={{ fontSize: 12.5, color: 'var(--ink4)' }}>
        Step <strong style={{ color: 'var(--ink)', fontWeight: 500 }}>{step}</strong> of{' '}
        <strong style={{ color: 'var(--ink)', fontWeight: 500 }}>5</strong>
        {' — '}{STEP_LABELS[step - 1]}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        {step > 1 && (
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            disabled={isPending}
            className="h-auto gap-1.5 rounded-full px-[18px] py-[9px] text-[13.5px] font-medium text-(--ink2)"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round" style={{ width: 15, height: 15, opacity: .6 }}>
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Back
          </Button>
        )}

        {!isLastBeforePreview && (
          <Button
            type="button"
            onClick={onNext}
            disabled={isPending}
            className="h-auto gap-1.5 rounded-full bg-(--ink) px-[22px] py-[9px] text-[13.5px] font-medium text-white hover:bg-[#2a2a2a]"
          >
            Next step
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round" style={{ width: 15, height: 15 }}>
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </Button>
        )}

        {isLastBeforePreview && (
          <Button
            type="button"
            onClick={onPreview}
            disabled={isPending}
            className="h-auto gap-[7px] rounded-full bg-(--red) px-[22px] py-[9px] text-[13.5px] font-medium text-white hover:bg-[#bf2e1f]"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round" style={{ width: 15, height: 15 }}>
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            Preview campaign
          </Button>
        )}
      </div>
    </div>
  )
}
