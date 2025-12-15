/**
 * HomePageContent Component
 * Displays SEO content with read more/less functionality
 * Optimized with React.memo and useMemo for better performance
 */

'use client';

import React, { useState, useMemo, memo, useCallback } from 'react';
import Container from '../atom/Container/Container';
import clsx from 'clsx';

interface HomePageContentProps {
  display: boolean;
  content: {
    html?: string;
  };
}

function HomePageContentComponent({ display, content }: HomePageContentProps) {
  const [expanded, setExpanded] = useState(false);

  // ⚡ Memoize expensive calculations
  const { preview, shouldShowButton, textOnly } = useMemo(() => {
    const maxChars = 1650;
    const html = content?.html || '';
    const text = html;
    const previewText = text.slice(0, maxChars);

    return {
      preview: previewText,
      shouldShowButton: text.length > maxChars,
      textOnly: text,
    };
  }, [content?.html]);

  // ⚡ Memoize toggle handler
  const handleToggle = useCallback(() => {
    setExpanded(prev => !prev);
  }, []);

  // ⚡ Memoize HTML content
  const htmlContent = useMemo(() => {
    return expanded ? textOnly : preview;
  }, [expanded, textOnly, preview]);

  // Don't render if no content
  if (!content?.html) {
    return null;
  }

  return (
    <Container
      className={clsx(
        'mt-12',
        display && 'absolute -left-[9999999px]'
      )}
    >
      {/* SEO Content */}
      <div className='prose prose-sm content-wrapper-home max-w-none font-poppins'>
        <div
          dangerouslySetInnerHTML={{ __html: htmlContent }}
          suppressHydrationWarning
        />
      </div>

      {/* Read More/Less Button */}
      {shouldShowButton && (
        <button
          onClick={handleToggle}
          className='text-black text-xs font-medium cursor-pointer mt-2 hover:underline transition-all'
          aria-expanded={expanded}
          aria-label={expanded ? 'Read less content' : 'Read more content'}
          type="button"
        >
          {expanded ? 'Read less' : 'Read more...'}
        </button>
      )}
    </Container>
  );
}

// ⚡ Export memoized component to prevent unnecessary re-renders
export default memo(HomePageContentComponent);
