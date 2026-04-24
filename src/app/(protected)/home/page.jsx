import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/utils/auth'
import { ROLES } from '@/lib/rbac'
import BrandDashboard from '@/components/Dashboard/BrandDashboard'
import CreatorDashboard from '@/components/Dashboard/CreatorDashboard'

export default async function Home() {
  const session = await getServerSession(authOptions)
  const role = session?.user?.role
  const user = session?.user

  if (role === ROLES.CREATOR) return <CreatorDashboard user={user} />
  return <BrandDashboard user={user} />
}
