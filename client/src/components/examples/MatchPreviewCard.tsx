import { MatchPreviewCard } from '../MatchPreviewCard'

export default function MatchPreviewCardExample() {
  return (
    <MatchPreviewCard
      compatibilityScore={87}
      distance="0.3 mi away"
      matchTypes={["Niche Interests", "Opportunities"]}
      onViewDetails={() => console.log('View details clicked')}
    />
  )
}
