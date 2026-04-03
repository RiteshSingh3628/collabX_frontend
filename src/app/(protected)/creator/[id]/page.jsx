import CreatorProfilePage from '@/components/CreatorProfile/CreatorProfilePage'

export default async function CreatorPage({ params }) {
  const { id } = await params

  return <CreatorProfilePage creatorId={id} />
}
