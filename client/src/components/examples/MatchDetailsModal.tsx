import { useState } from 'react'
import { MatchDetailsModal } from '../MatchDetailsModal'
import { Button } from '@/components/ui/button'

export default function MatchDetailsModalExample() {
  const [open, setOpen] = useState(false)
  
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Match Details</Button>
      <MatchDetailsModal open={open} onOpenChange={setOpen} />
    </>
  )
}
