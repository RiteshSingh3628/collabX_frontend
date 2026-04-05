import CreatorProfilePage from '@/components/CreatorProfile/CreatorProfilePage'
import { fetchCreatorProfile, fetchOverallAnalytics } from '@/framework/server-action/creator/action';

export default async function CreatorPage({ params }) {
  // const { id } = await params
  const id = "69c8ba3fe5085237d4852537"
  const [creatorProfileData,overallAnalyticsData] = await Promise.all([
    fetchCreatorProfile(id),
    fetchOverallAnalytics(id)
    ]);

  return <CreatorProfilePage creatorId={id} 
  creatorProfileData={creatorProfileData} 
  overallAnalyticsData={overallAnalyticsData} 
  />
}