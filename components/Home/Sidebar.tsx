/**
 * Sidebar Component
 * Displays video ads, banners, and recommendations
 * Optimized with React.memo and extracted sub-components for better performance
 */

'use client';

import React, { memo } from 'react';
import VideoPreview from '@/app/home/VideoPreview';
import CustomSliderUi from '@/app/home/CustomSliderUi';
import Recommendations from '@/app/home/Recommendations';
import RecommendedText from '@/components/RecomendedText/RecommendedText';
import { AllSmallVideoItems } from '@/redux/smallVideo/types';

interface SidebarProps {
    videoAds: AllSmallVideoItems[];
    shuffledImages: any[];
    siteMap: any[];
    currentPage: number;
}

// ⚡ Memoized Video Ad Section
const VideoAdSection = memo(({ videoAds }: { videoAds: AllSmallVideoItems[] }) => {
    if (!videoAds || videoAds.length === 0) {
        return <div className="w-full h-[250px] rounded bg-gray-50"></div>;
    }

    const ad = videoAds[0];
    return (
        <div className="w-full mb-3 relative flex">
            <VideoPreview
                id={ad?._id}
                alt={ad?.name || ''}
                thumbnailUrl={ad?.thumbnail?.webp?.url || ''}
                projectSlug={ad?.projectDetails?.slug || ''}
                videoUrl={ad?.videoFile?.url?.url || ''}
            />
        </div>
    );
});
VideoAdSection.displayName = 'VideoAdSection';

// ⚡ Memoized Recommendations Section
const RecommendationSection = memo(({
    siteMap,
    isFirstPage
}: {
    siteMap: any[];
    isFirstPage: boolean;
}) => (
    <Recommendations siteMap={siteMap}>
        {(items) => (
            <>
                {isFirstPage && (
                    <RecommendedText
                        className='my-2'
                        title="Recommended For You"
                        items={items}
                    />
                )}
                <RecommendedText
                    className={!isFirstPage ? 'my-2' : ''}
                    title="Trending Areas"
                    items={items}
                />
                <RecommendedText title="Popular Searches" items={items} />
            </>
        )}
    </Recommendations>
));
RecommendationSection.displayName = 'RecommendationSection';

// ⚡ Memoized Sticky Content Wrapper
const StickyContent = memo(({
    shuffledImages,
    siteMap,
    isFirstPage
}: {
    shuffledImages: any[];
    siteMap: any[];
    isFirstPage: boolean;
}) => (
    <div className="sticky top-3 left-0">
        <CustomSliderUi shuffledImages={shuffledImages} />
        <RecommendationSection siteMap={siteMap} isFirstPage={isFirstPage} />
    </div>
));
StickyContent.displayName = 'StickyContent';

function SidebarComponent({
    videoAds,
    shuffledImages,
    siteMap,
    currentPage,
}: SidebarProps) {
    const isFirstPage = currentPage <= 1;

    return (
        <div className="w-full md:block hidden max-w-[301.5px]">
            {/* Video Ad - Only on first page */}
            {isFirstPage && <VideoAdSection videoAds={videoAds} />}

            {/* Recommendations - Only on page 2+ */}
            {!isFirstPage && (
                <Recommendations siteMap={siteMap}>
                    {(items) => (
                        <RecommendedText title="Recommended For You" items={items} />
                    )}
                </Recommendations>
            )}

            {/* Sticky Content */}
            <StickyContent
                shuffledImages={shuffledImages}
                siteMap={siteMap}
                isFirstPage={isFirstPage}
            />
        </div>
    );
}

// ⚡ Export memoized component
export default memo(SidebarComponent);
