import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/utils/auth'
import { redirect } from 'next/navigation'
import { ROLES } from '@/lib/rbac'
import CampaignWizard from '@/components/Campaign/CreateCampaign/CampaignWizard'

export const metadata = {
  title: 'Create Campaign — CollabXSphere',
}

export default async function CreateCampaignPage() {
  const session = await getServerSession(authOptions)

  if (!session) redirect('/auth/login')
  if (session.user?.role !== ROLES.BRAND) redirect('/home')

  return <CampaignWizard user={session.user} />
}
