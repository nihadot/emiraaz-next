import RecommendedText from '@/components/RecomendedText/RecommendedText'
import React from 'react'

function Recommendations() {
  return (
    <>    <RecommendedText
    title="Recommended For You"
    items={[
        'Smart Picks in Dubai’s Fastest-Growing Zones',
        'Handpicked Homes with High ROI Potential',
        'Investor-Friendly Properties You’ll Love',
        'Move-In Ready Units in Prime Locations',
        'Top-Rated Listings in Family-Friendly Areas',
    ]}
/>
<RecommendedText
    title="Trending Areas"
    items={[
        'Ras Al Khaimah: The New Investment Hotspot',
        'Dubai South: Near Expo, Near Future',
        'Marjan Island: Beachfront Rental Boom',
        'Dubai Creek Harbour: Where the Skyline Begins',
        'Mohammed Bin Rashid City: Luxury Rising',
        'Sharjah Waterfront City: Serenity & Value',
    ]}
/>
<RecommendedText
    title="Popular Searches"
    items={[
        'Downtown Dubai: Iconic City Living',
        'Dubai Marina: Waterfront Lifestyle at Its Best',
        'Business Bay: Where Work Meets Luxury',
        'Yas Island, Abu Dhabi: Island Living Redefined',
        'Jumeirah Village Circle: Affordable Modern Homes',
        'Al Reem Island, Abu Dhabi: Urban Peace',
    ]}
/>
</>
  )
}

export default Recommendations