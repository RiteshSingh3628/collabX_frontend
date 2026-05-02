import { fetchCreatorProfile } from '@/framework/server-action/creator/action'
import ProfileCard from '../Sidebar/ProfileCard'

export default async function ProfileSection() {
  const data = await fetchCreatorProfile()
  return <ProfileCard profile={data} />
}
