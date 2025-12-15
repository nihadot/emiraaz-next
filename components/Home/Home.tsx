/**
 * HomePage Component - Refactored and Optimized
 * Main landing page for property listings
 * 
 * This component has been refactored for better maintainability:
 * - Custom hooks extracted to hooks.ts
 * - Utility functions moved to utils.ts
 * - UI components split into separate files
 * - Improved code organization and readability
 * - Performance optimized with React.memo and useMemo
 */

'use client';

import React, { useMemo, useState, useEffect, memo } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import clsx from 'clsx';

import Container from '../atom/Container/Container';
import BreadcampNavigation from '../BreadcampNavigation/BreadcampNavigation';
import LocationTags from '../LocationTags/LocationTags';

import SplashScreen from './SplashScreen';

// App-specific components
import VideoPreview from '@/app/home/VideoPreview';
import Recommendations from '@/app/home/Recommendations';
import RecommendedText from '../RecomendedText/RecommendedText';

// Hooks and utilities
import {
    useUserAuth,
    useWishlist,
    useSplashScreen,
    useFilters,
    useProjects,
    usePagination,
    useProjectNavigation,
    useEnquiryForm,
} from './hooks';

import {
    generateEmirateOptions,
    generateCityOptions,
    generatePropertyTypeOptions,
    generatePaymentPlanOptions,
    generateDiscountOptions,
    generateFurnishTypeOptions,
} from './utils';

// Redux and types
import { useDispatch, useSelector } from 'react-redux';
import { open } from '@/redux/ai-agent-chat/chatSlice';
import { Pagination } from '@/utils/types';
import { shuffle } from '@/utils/shuffle';
import { setWishlist } from '@/redux/wishlistSlice/wishlistSlice';
import { useForceScrollRestore, useScrollToTopOnRefresh } from '@/hooks/useScrollRestoration';
import { useDeviceType } from '@/utils/useDeviceType';
import { parsePrice } from '@/utils/parsePrice';
import { filterBlackIcon, ps_logo, searchBlackIcon } from '@/app/assets';

// Types
import { EmirateNames } from '@/redux/emirates/types';
import { CityNames } from '@/redux/cities/types';
import { PortraitBanner } from '@/redux/portraitBannerAd/types';
import { AllSmallVideoItems } from '@/redux/smallVideo/types';
import { AllProjectsItems } from '@/redux/project/types';
import { CountItem } from '@/redux/news/newsApi';
import HomePageContent from './HomePageContent';
import Header from '../Header';
import MobileHeader from './MobileHeader/MobileHeader';
import SearchFilterBar from './SearchFilterBar';
import SearchMobile from './SearchMobile/SearchMobile';
import MobileFilter from './MobileFilter/MobileFilter';
import PropertyType from '../PropertyType/PropertyType';
import { useMenuItem } from '../MenuItem/logic/useMenuItem';
import MenuItemUI from '../MenuItem/ui/MenuItemUI';
import AdvancedFilters from './AdvancedFilters/AdvancedFilters';
import SectionDivider from '../atom/SectionDivider/SectionDivider';
import SpaceWrapper from '../atom/SpaceWrapper/SpaceWrapper';
import ProjectsGrid from './ProjectsGrid';
import Sidebar from './Sidebar';
import PaginationNew from '../PaginationNew/PaginationNew';
import BottomBanner from '@/app/home/BottomBannerasas';
import MobileFooterBanner from '@/app/home/MobileFooterBanner';
import { Footer } from '../Footer';
import ProjectsMobileGrid from './ProjectsMobileGrid';
import { handlePropertyCategoryStatus, handlePropertyCategoryType } from '@/redux/filters/filterSlice';
import EnquiryFormModal from '../EnquiryFormModal/EnquiryFormModal';
import ApplicationSubmittedModal from '../ApplicationSubmittedModal/ApplicationSubmittedModal';
import EnquiryModal from '../EnquiryModal/EnquiryModal';
import { RootState } from '@/redux/store';
import { closeEnquiry, closeSuccessEnquiry } from '@/redux/enquiry/enquiry';
import { useEnquirySubmit } from '@/hooks/useEnquirySubmit';

interface HomePageProps {
    emiratesData: EmirateNames[];
    urls?: string[];
    allCounts: CountItem;
    initialCities: CityNames[];
    videoAds: AllSmallVideoItems[];
    initialData: {
        data: AllProjectsItems[];
        pagination: Pagination;
    };
    portraitBanners: PortraitBanner[];
    siteMap: any[];
    content: object;
    initialValues: {
        emirate: string;
        cities: string[];
        propertyCategoryType: string;
        propertyCategoryStatus: string;
        propertyType?: string;
        completionType?: string;
        qtr?: string;
        year: number | '';
        paymentPlan?: string;
        furnishied?: string;
        discount?: string;
    };
}

// ⚡ Memoized Logo Component
const LogoSection = memo(() => (
    <Link href={'/'}>
        <Image
            src={ps_logo.src}
            alt="PropertySeller"
            width={140}
            height={50}
            className='object-contain h-full max-w-[200px] w-full'
            priority
        />
    </Link>
));
LogoSection.displayName = 'LogoSection';

// ⚡ Memoized Breadcrumb Component
const BreadcrumbSection = memo(({
    isMatchCity,
    cityOptions,
    totalRecords
}: {
    isMatchCity: any;
    cityOptions: any[];
    totalRecords: number | undefined;
}) => (
    <div className="flex flex-col md:flex-row flex-1 items-start md:items-center w-full">
        <BreadcampNavigation
            title={`Off-plan projects :`}
            items={[
                {
                    title: 'All Cities',
                    link: isMatchCity?.label === 'All'
                        ? '/cities'
                        : `/cities/${cityOptions.find((item: any) => item.value === isMatchCity?.value) || ''}`
                },
                {
                    title: `Off-plan projects for sale in ${isMatchCity?.value === 'all' ? 'UAE' : isMatchCity?.label || 'UAE'}`,
                }
            ]}
        />
        <p className='font-poppins font-normal text-[12px] text-nowrap w-fit text-[#333333] pt-2 md:pt-0'>
            {totalRecords ? `${parsePrice(totalRecords)} Properties Available` : 'No Properties Available'}
        </p>
    </div>
));
BreadcrumbSection.displayName = 'BreadcrumbSection';

// ⚡ Memoized Location Tags Component
const LocationSection = memo(({ initialCities }: { initialCities: CityNames[] }) => (
    <div className="pt-0 md:pt-4">
        <LocationTags
            data={
                initialCities?.slice(0, 4).map((item) => ({
                    location: item.name,
                    count: item.count,
                    slug: item.slug
                })) || []
            }
        />
    </div>
));
LocationSection.displayName = 'LocationSection';

// ⚡ Memoized Mobile Video Component
const MobileVideoSection = memo(({ videoAds }: { videoAds: AllSmallVideoItems[] }) => {
    if (!videoAds || videoAds.length === 0) return null;

    return (
        <Container>
            <div className="w-full mb-[35px] relative flex sm:hidden">
                <VideoPreview
                    id={videoAds[0]?._id}
                    alt={videoAds[0]?.name || ''}
                    projectSlug={videoAds[0]?.projectDetails?.slug || ''}
                    thumbnailUrl={videoAds[0]?.thumbnail?.webp?.url || ''}
                    videoUrl={videoAds[0]?.videoFile?.url?.url || ''}
                />
            </div>
        </Container>
    );
});
MobileVideoSection.displayName = 'MobileVideoSection';

// ⚡ Memoized Mobile Recommendations
const MobileRecommendations = memo(({ siteMap }: { siteMap: any[] }) => (
    <div className="px-5 flex sm:hidden lg:px-8">
        <Recommendations siteMap={siteMap}>
            {(items) => (
                <RecommendedText title="Recommended For You" items={items} />
            )}
        </Recommendations>
    </div>
));
MobileRecommendations.displayName = 'MobileRecommendations';

function HomePage({
    emiratesData,
    videoAds,
    initialCities,
    allCounts,
    initialData,
    portraitBanners,
    content,
    siteMap,
    initialValues,
}: HomePageProps) {
    const dispatch = useDispatch();


    // Hooks
    useForceScrollRestore();
    useScrollToTopOnRefresh();

    const router = useRouter();
    const pathname = usePathname();
    const deviceType = useDeviceType();

    // Custom hooks
    const { userId } = useUserAuth();
    const wishlistData = useWishlist(userId);
    const loading = useSplashScreen();
    const { filters, setFilters, debouncedSearch, handleChangeSearch, handleClear } = useFilters();
    const { projects, pagination } = useProjects(filters, debouncedSearch, initialData);
    const { paginationHappened, handlePageChange } = usePagination();
    const { handleClick, handleMouseEnter } = useProjectNavigation();
    const { enquiryForm, setEnquiryForm, handleEnquiryFormClick } = useEnquiryForm();

    // State
    const [clear, setClear] = useState(false);

    // Update wishlist in Redux
    useEffect(() => {
        if (wishlistData.length > 0) {
            dispatch(setWishlist(wishlistData));
        }
    }, [wishlistData, dispatch]);

    // Set viewport height for mobile
    useEffect(() => {
        function setRealVH() {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        }
        setRealVH();
        window.addEventListener('resize', setRealVH);
        return () => window.removeEventListener('resize', setRealVH);
    }, []);

    // ⚡ Memoized options - only recalculate when dependencies change
    const emirateOptions = useMemo(() =>
        generateEmirateOptions(emiratesData),
        [emiratesData]
    );

    const cityOptions = useMemo(() =>
        generateCityOptions(initialCities),
        [initialCities]
    );

    const propertyTypesLists = useMemo(() =>
        generatePropertyTypeOptions(allCounts),
        [allCounts]
    );

    const paymentPlanOptions = useMemo(() =>
        generatePaymentPlanOptions(allCounts),
        [allCounts]
    );

    const discountOptions = useMemo(() =>
        generateDiscountOptions(allCounts),
        [allCounts]
    );

    const furnishTypeOptions = useMemo(() =>
        generateFurnishTypeOptions(allCounts),
        [allCounts]
    );

    const shuffledImages = useMemo(() =>
        shuffle(portraitBanners || []),
        [portraitBanners]
    );

    // ⚡ Memoized derived values
    const totalPages = useMemo(() => pagination?.totalPages || 1, [pagination?.totalPages]);
    const totalRecords = useMemo(() => pagination?.totalRecords, [pagination?.totalRecords]);
    const lastCitySlug = useMemo(() => filters.cities?.[filters.cities.length - 1], [filters.cities]);
    const isMatchCity = useMemo(() =>
        cityOptions.find((item: any) => item.slug === lastCitySlug),
        [cityOptions, lastCitySlug]
    );

    const { isOpen: isEnquiryOpen, successIsOpen } = useSelector((state: RootState) => state.enquiry);

    // ⚡ Memoized handlers
    const handleFilterModal = useMemo(() => () => {
        router.push('/buy/filter');
    }, [router]);

    const handleLogoClick = useMemo(() => () => {
        const url = new URL(window.location.href);
        url.searchParams.set('page', '1');
        window.history.pushState({}, '', url);
        setFilters(prev => ({ ...prev, page: 1 }));
    }, [setFilters]);



    const isPageTwo = filters.page && filters.page > 1;


    const logicPropertyCategory = useMenuItem([
      { label: "New Projects", value: "off-plan-projects" },
    { label: "Off-Plan Resale", value: "off-plan-resale"},
    { label: "Secondary ", value: "secondary"},
    { label: "Land ", value: "land"},
    ]);
    const logicPropertyCategoryTypes = useMenuItem([
        { label: "Residential", value: "residential" },
    { label: "Commercial", value: "commercial" },
    ]);

    useEffect(() => {
        console.log(logicPropertyCategory.selected, 'open')
        if (logicPropertyCategory.selected) {
            dispatch(handlePropertyCategoryType(logicPropertyCategory.selected))
        }

        if (logicPropertyCategoryTypes.selected) {
            dispatch(handlePropertyCategoryStatus(logicPropertyCategoryTypes.selected))
        }
    }, [logicPropertyCategory.selected,
    logicPropertyCategoryTypes.selected,
    ]);


    const { submitEnquiry, error: submitEnquiryError, loading: submitEnquiryLoading, sucess: submitEnquirySucess } = useEnquirySubmit()

        // Show splash screen
    if (loading) {
        return <SplashScreen />;
    }
    
    return (
        <>
            <main>
                <HomePageContent content={content} display={true} />

                <div className=" w-full lg:overflow-visible font-(family-name:--font-geist-sans)">
                    {/* Header */}
                    {/* Desktop */}
                    <div className="hidden md:flex">
                        <Header
                            onLogoClick={handleLogoClick}
                            logoSection={<LogoSection />}
                        />
                    </div>


                    {/* Mobile Header */}
                    <Container className="flex md:hidden">
                        <MobileHeader
                            emirateOptions={emirateOptions}
                        // location='Dubai,Sharja'
                        />
                    </Container>


                    {/* Search & Primary Filters */}
                    {/* Desktop Search */}
                    <Container
                        className='md:flex hidden'
                    >
                        <SearchFilterBar
                            filters={filters}
                            emirateOptions={emirateOptions}
                            cityOptions={cityOptions}
                            initialValues={initialValues}
                            clear={clear}
                            onSearchChange={handleChangeSearch}
                            onFilterModal={handleFilterModal}
                        />
                    </Container>


                    {/* Mobile Search */}
                    <Container
                        className='md:hidden block'
                    >
                        <SearchMobile
                            filterBlackIcon={filterBlackIcon}
                            searchBlackIcon={searchBlackIcon}
                        />

                    </Container>


                    <Container
                        className='md:hidden block mt-3'

                    >
                        <div className="border p-3 border-[#DEDEDE] rounded-[13px]">

                            <PropertyType />

                            <div className="flex gap-3 mt-2">

                                <MenuItemUI label="New Projects" {...logicPropertyCategory} />
                                <MenuItemUI label="Residential" {...logicPropertyCategoryTypes} />
                            </div>
                        </div>

                        {/* <MobileFilter /> */}
                    </Container>

                    <Container
                        className='md:hidden block mt-3'

                    >
                        <ProjectsMobileGrid
                            initialData={initialData}
                        />
                    </Container>


                    {/* Advanced Filters */}
                    <Container>
                        <AdvancedFilters
                            filters={filters}
                            propertyTypesLists={propertyTypesLists}
                            paymentPlanOptions={paymentPlanOptions}
                            discountOptions={discountOptions}
                            furnishTypeOptions={furnishTypeOptions}
                            clear={clear}
                            onClear={handleClear}
                        />
                    </Container>


                    <SectionDivider
                        containerClassName={clsx("mb-[12px] mt-[12px]")}
                        lineClassName="h-[1px] w-full bg-[#DEDEDE]"
                    />

                    <Container>
                        <SpaceWrapper className={`hidden sm:block ${isPageTwo ? 'pt-0' : 'pt-0'}`}>
                            <div className="mb-4   flex gap-2">
                                {/* Projects Grid */}
                                <div className="flex-1 h-full grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                                    {/* Breadcrumbs - Page 2+ */}
                                    {isPageTwo && (
                                        <BreadcrumbSection
                                            isMatchCity={isMatchCity}
                                            cityOptions={cityOptions}
                                            totalRecords={totalRecords}
                                        />
                                    )}

                                    {/* Location Tags - Page 2+ */}
                                    {isPageTwo && (
                                        <LocationSection initialCities={initialCities} />
                                    )}

                                    {/* Projects */}
                                    <ProjectsGrid
                                        projects={projects}
                                        shuffledImages={shuffledImages}
                                        onProjectClick={handleClick}
                                        onEnquiryClick={handleEnquiryFormClick}
                                        onProjectHover={handleMouseEnter}
                                    />
                                </div>


                                {/* Sidebar */}
                                <Sidebar
                                    videoAds={videoAds}
                                    shuffledImages={shuffledImages}
                                    siteMap={siteMap}
                                    currentPage={filters.page || 1}
                                />
                            </div>
                        </SpaceWrapper>
                    </Container>


                </div>


                {/* Pagination */}
                <Container
                >
                    <div className="mt-[23.25px] hidden md:flex flex-col">
                        <PaginationNew
                            currentPage={filters.page || 1}
                            totalPages={totalPages}
                            onPageChange={(newPage) => handlePageChange(newPage, setFilters)}
                            maxVisiblePages={deviceType === 'mobile' ? 4 : 8}
                        />
                        <div className="text-[10.5px] mt-[8.25px] flex justify-center items-center font-normal font-poppins text-[#767676]">
                            {filters.page} To {totalPages} of {totalRecords} Listings
                        </div>
                    </div>
                </Container>

                <HomePageContent content={content} display={false} />

                <SectionDivider
                    containerClassName="mt-[45.75px]"
                    lineClassName="h-[1px] hidden sm:block w-full bg-[#DEDEDE]"
                />

                <BottomBanner />

                <div className="pb-5">
                    <MobileFooterBanner />
                </div>

                {/* Mobile Recommendations */}
                {/* <MobileRecommendations siteMap={siteMap} /> */}

                <Footer />

                <ApplicationSubmittedModal
                    open={successIsOpen}
                    onClose={() => dispatch(closeSuccessEnquiry())}
                    onContinue={() => dispatch(closeSuccessEnquiry())}
                />
                <EnquiryModal
                    open={isEnquiryOpen}
                    onClose={() => dispatch(closeEnquiry())}
                    onSubmit={submitEnquiry}
                    reset={submitEnquirySucess}
                />


            </main>

            {/* Enquiry Modal */}
            <EnquiryFormModal
                EnquiryForm={enquiryForm}
                setEnquiryForm={setEnquiryForm}
            />
        </>
    );
}

// ⚡ Export memoized component to prevent unnecessary re-renders
export default memo(HomePage);