import { fetchOverallAnalytics } from '@/framework/server-action/creator/action'
import OverallAnalytics from './MainContent/OverallAnalytics'

export default async function AnalyticsSection({ id }) {
  const data = await fetchOverallAnalytics(id)
  return <OverallAnalytics data={data} />
}
