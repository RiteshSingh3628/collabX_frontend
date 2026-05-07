function Pulse({ style }) {
  return (
    <div
      style={{
        background: 'linear-gradient(90deg,var(--cream) 25%,var(--warm) 50%,var(--cream) 75%)',
        backgroundSize: '200% 100%',
        animation: 'skeletonShimmer 1.4s ease-in-out infinite',
        borderRadius: 8,
        ...style,
      }}
    />
  )
}

// Inject keyframe once via a style tag
const shimmerCSS = `@keyframes skeletonShimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}`

function ShimmerStyle() {
  return <style>{shimmerCSS}</style>
}

export function ProfileCardSkeleton() {
  return (
    <div
      className="bg-white overflow-hidden"
      style={{ border: '1px solid var(--border)', borderRadius: 16 }}
    >
      <ShimmerStyle />
      <Pulse style={{ height: 72 }} />
      <div style={{ padding: '38px 18px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <Pulse style={{ height: 16, width: '60%' }} />
        <Pulse style={{ height: 12, width: '80%' }} />
        <div className="grid grid-cols-2" style={{ gap: 8, marginTop: 4 }}>
          {Array.from({ length: 4 }).map((_, i) => (
            <Pulse key={i} style={{ height: 56, borderRadius: 10 }} />
          ))}
        </div>
        <Pulse style={{ height: 38, borderRadius: 100, marginTop: 8 }} />
      </div>
    </div>
  )
}

export function CampaignBarSkeleton() {
  return (
    <div
      className="bg-white"
      style={{ border: '1px solid var(--border)', borderRadius: 16, padding: '16px 18px' }}
    >
      <ShimmerStyle />
      <div className="flex justify-between" style={{ marginBottom: 14 }}>
        <Pulse style={{ height: 18, width: 160 }} />
        <Pulse style={{ height: 14, width: 80 }} />
      </div>
      <div className="flex flex-wrap" style={{ gap: 8 }}>
        {Array.from({ length: 3 }).map((_, i) => (
          <Pulse key={i} style={{ height: 60, flex: '1 1 140px', borderRadius: 12 }} />
        ))}
      </div>
    </div>
  )
}

export function ApplicantsSkeleton() {
  return (
    <div
      className="bg-white"
      style={{ border: '1px solid var(--border)', borderRadius: 16, padding: '16px 18px' }}
    >
      <ShimmerStyle />
      <div className="flex justify-between" style={{ marginBottom: 12 }}>
        <Pulse style={{ height: 16, width: 160 }} />
        <Pulse style={{ height: 14, width: 60 }} />
      </div>
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="flex items-center" style={{ gap: 10, padding: '9px 8px' }}>
          <Pulse style={{ width: 38, height: 38, borderRadius: 10, flexShrink: 0 }} />
          <div style={{ flex: 1 }}>
            <Pulse style={{ height: 13, width: '50%', marginBottom: 6 }} />
            <Pulse style={{ height: 11, width: '80%' }} />
          </div>
        </div>
      ))}
    </div>
  )
}

export function RightCardSkeleton({ rows = 4 }) {
  return (
    <div
      className="bg-white"
      style={{ border: '1px solid var(--border)', borderRadius: 16, padding: 18 }}
    >
      <ShimmerStyle />
      <Pulse style={{ height: 18, width: 140, marginBottom: 16 }} />
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center" style={{ gap: 10, padding: '10px 0', borderBottom: i < rows - 1 ? '1px solid var(--border)' : 'none' }}>
          <Pulse style={{ width: 36, height: 36, borderRadius: 9, flexShrink: 0 }} />
          <div style={{ flex: 1 }}>
            <Pulse style={{ height: 13, width: '55%', marginBottom: 6 }} />
            <Pulse style={{ height: 11, width: '75%' }} />
          </div>
        </div>
      ))}
    </div>
  )
}

export function FeedCardSkeleton() {
  return (
    <div
      className="bg-white overflow-hidden"
      style={{ border: '1px solid var(--border)', borderRadius: 16 }}
    >
      <ShimmerStyle />
      <Pulse style={{ height: 88 }} />
      <div style={{ padding: '32px 18px 16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Pulse style={{ height: 16, width: '45%' }} />
        <Pulse style={{ height: 11, width: '70%' }} />
        <div className="flex" style={{ gap: 5 }}>
          {Array.from({ length: 2 }).map((_, i) => (
            <Pulse key={i} style={{ height: 24, width: 80, borderRadius: 100 }} />
          ))}
        </div>
        <Pulse style={{ height: 54, borderRadius: 10 }} />
        <Pulse style={{ height: 40, width: '100%', borderRadius: 100 }} />
      </div>
    </div>
  )
}
