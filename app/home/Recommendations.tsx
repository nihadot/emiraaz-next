/**
 * Recommendations Component
 * Randomly selects items from the sitemap for display
 * Optimized with React.memo and useMemo
 */

import React, { useMemo, memo } from 'react';
import { shuffle } from '@/utils/shuffle';

interface RecommendationItem {
  url: string;
  [key: string]: any;
}

interface RecommendationsProps {
  siteMap: RecommendationItem[];
  children: (items: RecommendationItem[]) => React.ReactNode;
  limit?: number; // Allow custom limit
}

const RecommendationsComponent = ({
  siteMap,
  children,
  limit = 6
}: RecommendationsProps) => {
  // ⚡ Memoize shuffled items to prevent re-shuffling on every render
  // Only re-shuffle if the source data (siteMap) changes
  const recommendedItems = useMemo(() => {
    if (!siteMap || siteMap.length === 0) return [];

    // Create a shallow copy before shuffling to avoid mutating props
    const itemsCopy = [...siteMap];
    return shuffle(itemsCopy).slice(0, limit);
  }, [siteMap, limit]);

  return <>{children(recommendedItems)}</>;
};

// ⚡ Export memoized component
// Default shallow comparison is sufficient for siteMap array reference
export default memo(RecommendationsComponent);
