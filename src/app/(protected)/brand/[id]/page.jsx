import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import BrandProfilePage from '@/components/BrandProfile'
import { authOptions } from '@/lib/utils/auth'
import { ROLES } from '@/lib/rbac'

export default async function BrandPage({ params, searchParams }) {
  const { id } = await params
  const sp = (await searchParams) ?? {}
  const wantsOwnView = sp.mode === 'own'

  if (wantsOwnView) {
    const session = await getServerSession(authOptions)
    const isOwner =
      session?.user?.role?.toLowerCase() === ROLES.BRAND &&
      session?.user?.id === id

    if (!isOwner) redirect(`/brand/${id}`)
  }

  return <BrandProfilePage mode={wantsOwnView ? 'own' : 'user'} />
}
