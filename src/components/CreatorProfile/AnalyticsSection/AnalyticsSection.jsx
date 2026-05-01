import { fetchOverallAnalytics } from '@/framework/server-action/creator/action'
import OverallAnalytics from '../MainContent/OverallAnalytics'

export default async function AnalyticsSection() {
  const data = await fetchOverallAnalytics()
  if (!data) return null
  return <OverallAnalytics data={data} />
}
