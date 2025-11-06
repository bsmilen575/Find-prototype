import { FeatureCard } from '../FeatureCard'
import { Heart } from 'lucide-react'

export default function FeatureCardExample() {
  return (
    <FeatureCard
      icon={Heart}
      title="Niche Interests"
      description="Match based on specific shared passions like Island of Dr. Moreau or obscure indie bands"
    />
  )
}
