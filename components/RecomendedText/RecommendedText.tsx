/**
 * RecommendedText Component
 * Displays a list of recommended links with a title
 * Optimized with React.memo and extracted sub-components
 */

import React, { memo } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { formatUrl } from '@/utils/formatUrl';

type RecommendedItem = {
  url: string;
};

type Props = {
  title: string;
  items?: RecommendedItem[];
  className?: string;
  containerClassName?: string;
  elementClassName?: string;
};

// ⚡ Memoized Link Item
const RecommendedLink = memo(({ url, className }: { url: string, className?: string }) => {
  // Format URL for display
  const displayText = formatUrl(url);

  return (
    <Link
      href={`/for-sale/${url}`}
      prefetch={true}
      className="block"
    >
      <p
        className={clsx(
          "truncate text-ellipsis line-clamp-1 font-normal pb-[7.5px] text-[12px] text-[#767676] font-poppins",
          className
        )}
        title={displayText} // Add tooltip for truncated text
      >
        {displayText}
      </p>
    </Link>
  );
});
RecommendedLink.displayName = 'RecommendedLink';

function RecommendedText({
  title,
  items,
  className,
  containerClassName,
  elementClassName
}: Props) {
  // Don't render if no items
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div className={clsx("w-full", className)}>
      <div
        className={clsx(
          "rounded-[3.5px] p-2 mb-2 text-[12px] border font-semibold border-[#DEDEDE] bg-[#F5F5F5] font-poppins",
          containerClassName
        )}
      >
        {title}
      </div>

      {items.map((item, index) => {
        if (!item?.url) return null;

        return (
          <RecommendedLink
            key={item.url || index} // Prefer URL as key for stability
            url={item.url}
            className={elementClassName}
          />
        );
      })}
    </div>
  );
}

// ⚡ Export memoized component
export default memo(RecommendedText);
