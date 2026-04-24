import { fetchCreatorHeroBanner } from '@/framework/server-action/creator/action'
import HeroBanner from './HeroBanner'

export default async function HeroBannerSection({ id }) {
  const data = await fetchCreatorHeroBanner(id)
  return <HeroBanner profile={data} />
}
