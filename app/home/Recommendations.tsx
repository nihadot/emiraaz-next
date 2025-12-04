import React from 'react'
import { shuffle } from '@/utils/shuffle'

type Props = {
  siteMap: any[]
  children: (items: any[]) => React.ReactNode
}

const RecommendationsComponent = ({ siteMap, children }: Props) => {
  const shuffled = React.useMemo(() => shuffle(siteMap), [siteMap])
  return <>{children(shuffled.slice(0, 6))}</>
}

const Recommendations = React.memo(
  RecommendationsComponent,
  (prev, next) => prev.siteMap === next.siteMap
)

Recommendations.displayName = 'Recommendations'

export default Recommendations
