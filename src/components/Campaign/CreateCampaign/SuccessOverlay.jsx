import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function SuccessOverlay({ open, onClose }) {
  const router = useRouter()

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <div
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
      style={{
        position: 'fixed', inset: 0,
        background: 'rgba(15,15,15,.55)',
        zIndex: 300, display: 'flex',
        alignItems: 'center', justifyContent: 'center',
        padding: 20,
        opacity: open ? 1 : 0,
        pointerEvents: open ? 'all' : 'none',
        transition: 'opacity .25s',
      }}
    >
      <div style={{
        background: '#fff', borderRadius: 22,
        width: '100%', maxWidth: 400,
        padding: 36, textAlign: 'center',
        transform: open ? 'scale(1)' : 'scale(.94)',
        transition: 'transform .25s',
        boxShadow: '0 20px 60px rgba(0,0,0,.14)',
      }}>
        <div style={{
          width: 60, height: 60, borderRadius: 16,
          background: 'var(--green-bg)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 18px',
        }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
            strokeLinecap="round" strokeLinejoin="round"
            style={{ width: 26, height: 26, color: 'var(--green)' }}>
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <div style={{ fontFamily: 'var(--serif)', fontSize: 24, fontWeight: 400, color: 'var(--ink)', marginBottom: 8 }}>
          Campaign published!
        </div>
        <div style={{ fontSize: 13.5, color: 'var(--ink3)', lineHeight: 1.6, fontWeight: 300, marginBottom: 24 }}>
          Your campaign is now live. Creators can discover and apply to collaborate with you.
        </div>

        <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
          <button
            onClick={() => router.push('/campaigns')}
            style={{
              padding: '10px 22px', borderRadius: 100,
              fontSize: 13, fontWeight: 500, cursor: 'pointer',
              background: 'var(--ink)', color: '#fff', border: '1px solid var(--ink)',
              transition: 'all .18s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#2a2a2a'}
            onMouseLeave={e => e.currentTarget.style.background = 'var(--ink)'}
          >
            View campaign
          </button>
          <button
            onClick={() => router.push('/dashboard')}
            style={{
              padding: '10px 22px', borderRadius: 100,
              fontSize: 13, fontWeight: 500, cursor: 'pointer',
              border: '1px solid var(--border)', background: 'none', color: 'var(--ink2)',
              transition: 'all .18s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--cream)'}
            onMouseLeave={e => e.currentTarget.style.background = 'none'}
          >
            Go to dashboard
          </button>
        </div>
      </div>
    </div>
  )
}
