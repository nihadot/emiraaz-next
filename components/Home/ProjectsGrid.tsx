/**
 * Projects Grid Component
 * Displays project cards with banners interspersed
 * Optimized with React.memo, sub-components, and stable props for maximum performance
 */

'use client';

import React, { memo, useMemo } from 'react';
import ProjectCard from '@/components/ProjectCard/ProjectCard';
import CustomSlider from '@/components/CustomSlider/CustomSlider';
import NoDataFound from '@/components/Empty/NoDataFound';
import { AllProjectsItems } from '@/redux/project/types';

interface ProjectsGridProps {
    projects: AllProjectsItems[];
    shuffledImages: any[];
    onProjectClick: (item: AllProjectsItems) => void;
    onEnquiryClick: (item: AllProjectsItems) => void;
    onProjectHover?: (item: AllProjectsItems) => void;
}

// ⚡ Memoized Project Item to prevent unnecessary re-renders of individual cards
const ProjectItem = memo(({
    item,
    onProjectClick,
    onEnquiryClick,
    onProjectHover
}: {
    item: AllProjectsItems;
    onProjectClick: (item: AllProjectsItems) => void;
    onEnquiryClick: (item: AllProjectsItems) => void;
    onProjectHover?: (item: AllProjectsItems) => void;
}) => (
    <div
        onMouseEnter={() => onProjectHover?.(item)}
        onTouchStart={() => onProjectHover?.(item)}
        // className='relative w-full h-full'
    >
        <ProjectCard
            navigateDetailsButton={true}
            item={item}
            handleClick={onProjectClick}
            handleEnquiryFormClick={onEnquiryClick}
        />
    </div>
));
ProjectItem.displayName = 'ProjectItem';

// ⚡ Memoized Mobile Banner to prevent re-renders when parent updates
const MobileBanner = memo(({ images }: { images: any[] }) => (
    <div className="flex sm:hidden mt:mt-0">
        <CustomSlider
            images={images}
            containerClassName="!h-[95px] border border-[#DEDEDE]"
        />
    </div>
));
MobileBanner.displayName = 'MobileBanner';

function ProjectsGridComponent({
    projects,
    shuffledImages,
    onProjectClick,
    onEnquiryClick,
    onProjectHover,
}: ProjectsGridProps) {
    // ⚡ Memoize banner images to ensure stable references
    // We use the passed shuffledImages directly to avoid expensive re-shuffling on every render
    const bannerImages = useMemo(() => shuffledImages || [], [shuffledImages]);

    if (!projects || projects.length === 0) {
        return <NoDataFound />;
    }

    return (
        <>
            {projects.map((item, index) => (
                <React.Fragment key={item._id || index}>
                    <ProjectItem
                        item={item}
                        onProjectClick={onProjectClick}
                        onEnquiryClick={onEnquiryClick}
                        onProjectHover={onProjectHover}
                    />

                    {/* Add banner separator after every 5 items on mobile */}
                    {(index + 1) % 5 === 0 && (
                        <MobileBanner images={bannerImages} />
                    )}
                </React.Fragment>
            ))}
        </>
    );
}

// ⚡ Export memoized component
export default memo(ProjectsGridComponent);
