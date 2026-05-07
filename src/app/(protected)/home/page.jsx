import { redirect } from 'next/navigation'
import { ROLES } from '@/lib/rbac'
import { getUserSessionServer } from '@/lib/utils/session'
import { BrandHomePage } from '@/components/BrandHome'

// Influencer home is a work-in-progress placeholder
function InfluencerHomePage() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1rem' }}>
        Welcome to the Dashboard
      </h1>
      <p style={{ fontSize: '1rem', color: '#6a6a6a' }}>
        This is the protected home page. You can add your dashboard content here.
      </p>
    </div>
  )
}

export default async function Home() {
  const session = await getUserSessionServer()
  if (!session) redirect('/auth/login')

  const role = session.user?.role?.toLowerCase()

  if (role === ROLES.BRAND) {
    return <BrandHomePage />
  }

  return <InfluencerHomePage />
}
