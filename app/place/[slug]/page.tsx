import { PlacePage } from '@/pages/place'

export default function Page({ params }: { params: { slug: string } }) {
  return <PlacePage slug={params.slug} />
}

