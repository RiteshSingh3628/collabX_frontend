import { fmtDate, fmtINR, taskLine, TASK_META } from '../utils'

export default function Step5Preview({ formData, onEdit, onBack, onPublish, isPending }) {
  const {
    title, category, campaignType, goal, brief,
    startDate, endDate, budgetPerCreator, creatorsNeeded,
    minFollowers, minEngagementRate, creatorTier,
    platforms, tasks, dos, donts, hashtags,
  } = formData

  // Duration stat
  let durationStat = '—'
  if (startDate && endDate) {
    const days = Math.round((new Date(endDate) - new Date(startDate)) / 86400000)
    durationStat = days >= 30 ? `${Math.round(days / 30)} mo` : `${days}d`
  }

  // Followers stat
  let followerStat = '—'
  if (minFollowers) {
    const n = Number(minFollowers)
    followerStat = (n >= 1000 ? (n / 1000).toFixed(n % 1000 === 0 ? 0 : 1) + 'K' : String(n)) + '+'
  }

  const reqs = [
    creatorsNeeded && ['Creators needed', `${creatorsNeeded} creators`],
    budgetPerCreator && ['Budget per creator', fmtINR(budgetPerCreator)],
    minFollowers && ['Min. followers', `${Number(minFollowers).toLocaleString('en-IN')}+`],
    minEngagementRate && ['Min. engagement', `${minEngagementRate}%`],
    creatorTier && ['Creator tier', creatorTier],
  ].filter(Boolean)

  const cleanDos = (dos || []).filter(Boolean)
  const cleanDonts = (donts || []).filter(Boolean)

  return (
    <div>
      {/* Preview banner */}
      <div style={{
        background: '#fff', border: '1px solid var(--border)', borderRadius: 14,
        padding: '14px 20px', marginBottom: 14,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8, background: 'var(--amber-bg)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 15, height: 15, color: 'var(--amber)' }}>
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
            </svg>
          </div>
          <div>
            <div style={{ fontSize: 13.5, fontWeight: 500, color: 'var(--ink)' }}>Campaign preview</div>
            <div style={{ fontSize: 12, color: 'var(--ink4)', marginTop: 1 }}>
              This is exactly how your campaign will appear to creators on the marketplace
            </div>
          </div>
        </div>
        <button onClick={onEdit} style={{
          display: 'flex', alignItems: 'center', gap: 6, padding: '7px 14px',
          borderRadius: 100, border: '1px solid var(--border)', background: 'none',
          fontSize: 12.5, color: 'var(--ink2)', cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all .15s',
        }}
          onMouseEnter={e => e.currentTarget.style.background = 'var(--cream)'}
          onMouseLeave={e => e.currentTarget.style.background = 'none'}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 13, height: 13 }}>
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
          Edit campaign
        </button>
      </div>

      {/* Main preview card */}
      <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 20, overflow: 'hidden', marginBottom: 14 }}>
        {/* Hero banner */}
        <div style={{ height: 100, background: 'linear-gradient(135deg,#0f0f0f 0%,#1a1a2e 50%,#0d1117 100%)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle,rgba(255,255,255,.04) 1px,transparent 1px)', backgroundSize: '20px 20px' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 20% 60%,rgba(212,58,42,.15),transparent 55%),radial-gradient(circle at 80% 30%,rgba(26,79,212,.12),transparent 50%)' }} />
          <div style={{ position: 'absolute', top: 12, right: 14, display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(15,15,15,.5)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,.1)', borderRadius: 100, padding: '4px 12px', fontSize: 11.5, color: 'rgba(255,255,255,.85)', fontWeight: 500 }}>
            <span className="cc-pulse" style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', flexShrink: 0 }} />
            Accepting bids
          </div>
        </div>

        {/* Card body */}
        <div style={{ padding: '20px 24px' }}>
          {/* Brand avatar + title */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, marginBottom: 18 }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
              <div style={{
                width: 50, height: 50, borderRadius: 13, border: '3px solid #fff',
                background: 'linear-gradient(135deg,var(--ink),#3a3a3a)',
                marginTop: -36, color: '#fff',
                fontFamily: 'var(--serif)', fontSize: 20, fontWeight: 600,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0, boxShadow: '0 2px 12px rgba(0,0,0,.15)',
              }}>
                {(title || 'C').charAt(0).toUpperCase()}
              </div>
              <div style={{ marginTop: 4 }}>
                <div style={{ fontSize: 10.5, fontWeight: 500, color: 'var(--red)', textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 5, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ width: 16, height: 1, background: 'var(--red)', display: 'inline-block' }} />
                  {campaignType || 'Paid Campaign'}
                </div>
                <div style={{ fontFamily: 'var(--serif)', fontSize: 22, fontWeight: 400, color: 'var(--ink)', lineHeight: 1.2, marginBottom: 5 }}>
                  {title || 'Untitled Campaign'}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                  {platforms?.length > 0 && <span style={{ fontSize: 12.5, color: 'var(--ink3)' }}>{platforms.join(' · ')}</span>}
                </div>
              </div>
            </div>
            <span style={{
              display: 'inline-flex', alignItems: 'center', fontSize: 11.5, fontWeight: 500,
              padding: '4px 12px', borderRadius: 100,
              background: 'var(--blue-bg)', color: 'var(--blue)',
              flexShrink: 0, marginTop: 4,
            }}>
              {category || 'Uncategorised'}
            </span>
          </div>

          {/* Stats row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden', marginBottom: 18 }}>
            {[
              { label: 'Budget', value: budgetPerCreator ? fmtINR(budgetPerCreator) : '—', color: 'var(--green)' },
              { label: 'Deliverables', value: tasks?.length ? `${tasks.length} task${tasks.length > 1 ? 's' : ''}` : '—' },
              { label: 'Duration', value: durationStat },
              { label: 'Min. followers', value: followerStat },
            ].map((s, i) => (
              <div key={s.label} style={{ padding: '12px 0', textAlign: 'center', borderRight: i < 3 ? '1px solid var(--border)' : 'none' }}>
                <div style={{ fontFamily: 'var(--serif)', fontSize: 18, color: s.color || 'var(--ink)', lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontSize: 10, color: 'var(--ink4)', textTransform: 'uppercase', letterSpacing: '.06em', marginTop: 3 }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Deliverables */}
          {tasks?.length > 0 && (
            <div style={{ marginBottom: 18 }}>
              <div style={{ fontSize: 11, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '.07em', color: 'var(--ink4)', marginBottom: 10 }}>What you&apos;ll deliver</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {tasks.map(t => {
                  const m = TASK_META[t.type]
                  return (
                    <div key={t.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10 }}>
                      <div style={{ width: 32, height: 32, borderRadius: 8, background: m.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: m.color }}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 14, height: 14 }} dangerouslySetInnerHTML={{ __html: m.svg }} />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--ink)' }}>{m.label}</div>
                        <div style={{ fontSize: 12, color: 'var(--ink4)', marginTop: 1 }}>{taskLine(t)}</div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Campaign goal */}
          {goal && (
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 11, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '.07em', color: 'var(--ink4)', marginBottom: 7 }}>Campaign goal</div>
              <div style={{ fontSize: 13.5, color: 'var(--ink2)', lineHeight: 1.7, fontWeight: 300 }}>{goal}</div>
            </div>
          )}

          {/* Key message */}
          {brief && (
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 11, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '.07em', color: 'var(--ink4)', marginBottom: 7 }}>Key message</div>
              <div style={{ fontSize: 13.5, color: 'var(--ink2)', lineHeight: 1.7, fontWeight: 300 }}>{brief}</div>
            </div>
          )}

          {/* Do's & Don'ts */}
          {(cleanDos.length > 0 || cleanDonts.length > 0) && (
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 11, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '.07em', color: 'var(--ink4)', marginBottom: 10 }}>Content guidelines</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--green)', marginBottom: 6 }}>Do&apos;s</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                    {cleanDos.map((d, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 6, fontSize: 12.5, color: 'var(--ink2)', fontWeight: 300, lineHeight: 1.5 }}>
                        <span style={{ color: 'var(--green)', fontWeight: 600, fontSize: 11, marginTop: 2 }}>✓</span>{d}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--red)', marginBottom: 6 }}>Don&apos;ts</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                    {cleanDonts.map((d, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 6, fontSize: 12.5, color: 'var(--ink2)', fontWeight: 300, lineHeight: 1.5 }}>
                        <span style={{ color: 'var(--red)', fontWeight: 600, fontSize: 11, marginTop: 2 }}>✕</span>{d}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Hashtags */}
          {hashtags?.length > 0 && (
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 11, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '.07em', color: 'var(--ink4)', marginBottom: 8 }}>Mandatory hashtags</div>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {hashtags.map(t => (
                  <span key={t} style={{ display: 'inline-flex', alignItems: 'center', padding: '3px 10px', borderRadius: 100, fontSize: 12.5, fontWeight: 500, background: 'var(--red-bg)', color: 'var(--red)', border: '1px solid var(--red-border)' }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Creator requirements */}
          <div style={{ background: 'var(--surface)', borderRadius: 12, padding: 14, border: '1px solid var(--border)' }}>
            <div style={{ fontSize: 11, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '.07em', color: 'var(--ink4)', marginBottom: 10 }}>Creator requirements</div>
            {reqs.length === 0 ? (
              <div style={{ fontSize: 13, color: 'var(--ink4)', fontStyle: 'italic' }}>No requirements set</div>
            ) : reqs.map(([label, value], i) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '8px 0', borderBottom: i < reqs.length - 1 ? '1px solid var(--border)' : 'none' }}>
                <span style={{ fontSize: 12.5, color: 'var(--ink4)' }}>{label}</span>
                <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--ink)' }}>{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Publish action card */}
      <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 16, padding: '22px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontFamily: 'var(--serif)', fontSize: 19, fontWeight: 400, color: 'var(--ink)', marginBottom: 5 }}>Ready to go live?</div>
            <div style={{ fontSize: 13, color: 'var(--ink4)', fontWeight: 300, lineHeight: 1.5 }}>
              Once published, creators can discover and apply to your campaign. You can pause it at any time.
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
            <button onClick={onBack} disabled={isPending} style={{
              display: 'flex', alignItems: 'center', gap: 6, padding: '10px 20px', borderRadius: 100,
              border: '1px solid var(--border)', background: 'none',
              fontSize: 13.5, fontWeight: 500, color: 'var(--ink2)',
              cursor: 'pointer', transition: 'all .18s', opacity: isPending ? .6 : 1,
            }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--cream)'}
              onMouseLeave={e => e.currentTarget.style.background = 'none'}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 14, height: 14 }}>
                <polyline points="15 18 9 12 15 6" />
              </svg>
              Back to edit
            </button>
            <button onClick={onPublish} disabled={isPending} style={{
              display: 'flex', alignItems: 'center', gap: 7, padding: '10px 22px', borderRadius: 100,
              background: 'var(--red)', color: '#fff', border: 'none',
              fontSize: 13.5, fontWeight: 500, cursor: isPending ? 'not-allowed' : 'pointer',
              transition: 'all .18s', opacity: isPending ? .7 : 1,
            }}
              onMouseEnter={e => { if (!isPending) e.currentTarget.style.background = '#bf2e1f' }}
              onMouseLeave={e => e.currentTarget.style.background = 'var(--red)'}
            >
              {isPending ? (
                <>
                  <span style={{ width: 15, height: 15, border: '2px solid rgba(255,255,255,.4)', borderTopColor: '#fff', borderRadius: '50%', display: 'inline-block', animation: 'spin 0.7s linear infinite' }} />
                  Publishing…
                </>
              ) : (
                <>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 15, height: 15 }}>
                    <path d="M22 2L11 13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                  Publish campaign
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
