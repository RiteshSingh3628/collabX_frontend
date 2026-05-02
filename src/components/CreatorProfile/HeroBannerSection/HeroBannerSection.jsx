import { fetchCreatorHeroBanner } from '@/framework/server-action/creator/action'
import HeroBanner from '../HeroBanner/HeroBanner'

export default async function HeroBannerSection() {
  const data = await fetchCreatorHeroBanner()
  return <HeroBanner profile={data} />
}
