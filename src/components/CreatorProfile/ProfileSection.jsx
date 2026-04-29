import { fetchCreatorProfile } from '@/framework/server-action/creator/action'
import ProfileCard from './Sidebar/ProfileCard'

export default async function ProfileSection({ id }) {
  const data = await fetchCreatorProfile(id)
  return <ProfileCard profile={data} />
}
