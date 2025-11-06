import { CompatibilityScoreCard } from '../CompatibilityScoreCard'
import { Heart } from 'lucide-react'

export default function CompatibilityScoreCardExample() {
  return (
    <CompatibilityScoreCard
      icon={Heart}
      title="Niche Interests"
      score={92}
      highlights={["Island of Dr. Moreau", "Experimental Jazz", "Urban Gardening"]}
      color="blue"
    />
  )
}
