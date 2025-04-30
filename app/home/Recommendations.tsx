import RecommendedText from '@/components/RecomendedText/RecommendedText'
import React from 'react'

function Recommendations() {
  return (
    <>    <RecommendedText
    title="Recommended For You"
    items={[
        'Studio Properties For Sale in Dubai',
        '1 BHK Flats in Downtown',
        'Luxury Villas in Palm Jumeirah',
        'Affordable Apartments in JVC',
        'Beachfront Homes in Dubai Marina',
    ]}
/>
<RecommendedText
    title="Recommended For You"
    items={[
        'Studio Properties For Sale in Dubai',
        '1 BHK Flats in Downtown',
        'Luxury Villas in Palm Jumeirah',
        'Affordable Apartments in JVC',
        'Beachfront Homes in Dubai Marina',
    ]}
/>
<RecommendedText
    title="Popular Searches"
    items={[
        'Off-plan Projects in Dubai',
        'Ready to Move Villas',
        'High ROI Areas in UAE',
        'Townhouses in Arabian Ranches',
        'Gated Communities in Sharjah',
    ]}
/>
</>
  )
}

export default Recommendations