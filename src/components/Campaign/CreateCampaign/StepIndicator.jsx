'use client'

const STEP_LABELS = ['Campaign basics', 'Creator requirements', 'Deliverables', 'Campaign brief', 'Preview']

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"
    strokeLinecap="round" strokeLinejoin="round" style={{ width: 11, height: 11 }}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

export default function StepIndicator({ step, onJump }) {
  return (
    <div className="cc-anim-fade-up" style={{
      background: '#fff', border: '1px solid var(--border)', borderRadius: 14,
      padding: '14px 20px', marginBottom: 16,
      display: 'flex', alignItems: 'center', gap: 0,
      overflowX: 'auto',
    }}>
      {STEP_LABELS.map((label, i) => {
        const n = i + 1
        const isActive = n === step
        const isDone = n < step

        return (
          <div key={n} style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
            <div
              onClick={() => n < step && onJump(n)}
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '6px 10px', borderRadius: 9,
                cursor: n < step ? 'pointer' : 'default',
                flex: 1,
                transition: 'background .18s',
              }}
              onMouseEnter={e => { if (n < step) e.currentTarget.style.background = 'var(--cream)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
            >
              <div style={{
                width: 24, height: 24, borderRadius: '50%', flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 11, fontWeight: 600, transition: 'all .25s',
                border: isActive ? '1.5px solid var(--ink)' : isDone ? '1.5px solid var(--green-border)' : '1.5px solid var(--border)',
                background: isActive ? 'var(--ink)' : isDone ? 'var(--green-bg)' : '#fff',
                color: isActive ? '#fff' : isDone ? 'var(--green)' : 'var(--ink4)',
              }}>
                {isDone ? <CheckIcon /> : n}
              </div>
              <span style={{
                fontSize: 12.5, whiteSpace: 'nowrap',
                color: isActive ? 'var(--ink)' : isDone ? 'var(--green)' : 'var(--ink4)',
                fontWeight: isActive ? 500 : 400,
              }}>
                {label}
              </span>
            </div>

            {n < STEP_LABELS.length && (
              <div style={{
                width: 20, height: 1,
                background: isDone ? 'var(--green)' : 'var(--border)',
                flexShrink: 0, margin: '0 2px',
              }} />
            )}
          </div>
        )
      })}
    </div>
  )
}
