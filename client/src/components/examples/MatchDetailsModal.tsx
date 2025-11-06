import { useState } from 'react'
import { MatchDetailsModal } from '../MatchDetailsModal'
import { Button } from '@/components/ui/button'

export default function MatchDetailsModalExample() {
  const [open, setOpen] = useState(false)
  
  const mockMatch = {
    profileId: '1',
    name: 'Alex',
    distance: 0.5,
    compatibility: {
      overallScore: 87,
      nicheScore: 92,
      wholePersonScore: 84,
      opportunitiesScore: 78,
      nicheMatches: ["Island of Dr. Moreau", "Experimental Jazz"],
      wholePersonInsights: ["Books", "Music", "Values align"],
      opportunityMatches: ["Software Engineer"],
      explanation: "You both share a love for obscure literature and experimental music, creating a strong foundation for connection."
    }
  };
  
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Match Details</Button>
      <MatchDetailsModal match={mockMatch} open={open} onOpenChange={setOpen} />
    </>
  )
}
