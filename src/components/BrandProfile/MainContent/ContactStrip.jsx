'use client'

export default function ContactStrip({ brandName }) {
  return (
    <section
      className="flex flex-col sm:flex-row sm:items-center justify-between"
      style={{
        background: 'var(--ink)',
        borderRadius: 18,
        padding: '24px 28px',
        gap: 24,
      }}
    >
      <div>
        <div
          style={{
            fontFamily: 'var(--serif)',
            fontSize: 20,
            fontWeight: 300,
            color: '#fff',
            marginBottom: 4,
          }}
        >
          Ready to collab with{' '}
          <em style={{ fontStyle: 'italic', color: '#6a98f5' }}>{brandName}?</em>
        </div>
        <div style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.4)' }}>
          Browse open campaigns and submit your pitch directly
        </div>
      </div>
      <div className="flex shrink-0" style={{ gap: 10 }}>
        <button
          type="button"
          className="transition-colors hover:!bg-[rgba(255,255,255,0.15)]"
          style={{
            fontSize: 13,
            fontWeight: 500,
            padding: '10px 22px',
            borderRadius: 100,
            background: 'rgba(255,255,255,0.08)',
            color: '#fff',
            border: '1px solid rgba(255,255,255,0.15)',
            cursor: 'pointer',
          }}
        >
          Message Brand
        </button>
        <button
          type="button"
          className="transition-all hover:!bg-[#1640b8] hover:-translate-y-0.5"
          style={{
            fontSize: 13,
            fontWeight: 600,
            padding: '10px 24px',
            borderRadius: 100,
            background: 'var(--blue)',
            color: '#fff',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Apply to Campaign →
        </button>
      </div>
    </section>
  )
}
