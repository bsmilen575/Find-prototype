import { useState } from 'react'
import { ProfileInterestsInput } from '../ProfileInterestsInput'

export default function ProfileInterestsInputExample() {
  const [interests, setInterests] = useState(["Island of Dr. Moreau", "Sci-Fi Classics"])
  
  return (
    <ProfileInterestsInput
      category="Books"
      placeholder="Add books you love..."
      interests={interests}
      onInterestsChange={setInterests}
    />
  )
}
