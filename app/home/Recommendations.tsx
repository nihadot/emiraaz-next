import RecommendedText from '@/components/RecomendedText/RecommendedText'
import { shuffle } from '@/utils/shuffle'
import React from 'react'

function Recommendations({
    siteMap
}:{
    siteMap:any[]
}) {
  return (
    <>    <RecommendedText
    title="Recommended For You"
    items={shuffle(siteMap)?.slice(0, 6)}
/>
<RecommendedText
    title="Trending Areas"
    items={shuffle(siteMap)?.slice(0, 6)}
/>
<RecommendedText
    title="Popular Searches"
    items={shuffle(siteMap)?.slice(0, 6)}
/>
</>
  )
}

export default Recommendations