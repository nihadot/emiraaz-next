'use client'
import React, { Suspense, useCallback, useEffect, useMemo, useState } from 'react'
import Header from '../Header';
import { Footer } from '../Footer';
import Container from '../atom/Container/Container';
import SearchNew from '../SearchField/SearchNew';
import SelectLatest from '../SelectOption/SelectLatest';
import { useFetchAllEmirateNamesQuery } from '@/redux/emirates/emiratesApi';
import { useViewAllProjectsUnderDeveloperQuery } from '@/redux/developers/developersApi';
import SectionDivider from '../atom/SectionDivider/SectionDivider';
import clsx from 'clsx';
import SpaceWrapper from '../atom/SpaceWrapper/SpaceWrapper';
import ProjectCard from '../ProjectCard/ProjectCard';
import { AllProjectsItems } from '@/redux/project/types';
import { useRouter, useSearchParams } from 'next/navigation';
import CustomSlider from '../CustomSlider/CustomSlider';
import { shuffle } from '@/utils/shuffle';
import { useFetchAllPortraitBannersQuery } from '@/redux/portraitBannerAd/portraitBannerAdApi';
import ProjectCardSkelton from '../ProjectCard/ProjectCardSkelton';
import { useViewAllSmallVideosQuery } from '@/redux/smallVideo/smallViewApi';
import { AllSmallVideoItems } from '@/redux/smallVideo/types';
import VideoPreview from '@/app/home/VideoPreview';
import RecommendedText from '../RecomendedText/RecommendedText';
import CustomSliderUi from '@/app/home/CustomSliderUi';
import { productTypeOptionFirstItems } from '@/data';
import { SwitchSelector } from '../SelectOption';
import PaginationNew from '../PaginationNew/PaginationNew';
import { useDeviceType } from '@/utils/useDeviceType';
import EnquiryFormModal from '../EnquiryFormModal/EnquiryFormModal';
import MobileHeaderTitle from '../atom/typography/MobileHeaderTitle';

type Props = {
    id: string;
}

export type FiltersState = {

    page?: number,
    limit?: number,
    search?: string,
    emirate?: string,
    cities?: string[],
    projectTypeFirst?: string,
};

function ProjectsUnderDeveloperFunction({ id }: Props) {
    const [filters, setFilters] = useState<FiltersState>({
        page: 1,
        search: "",
        emirate: "",
        cities: [],
        projectTypeFirst: "",
    });
    const [debouncedSearch, setDebouncedSearch] = useState<any>("");
    const deviceType = useDeviceType();

    const queryParams = useMemo(() => ({
        limit: 24,
        page: filters.page,
        search: debouncedSearch,
        // cities: filters.cities,
        projectTypeFirst: filters.projectTypeFirst,
        emirate: filters.emirate,
    }), [filters, debouncedSearch]);

    const { data: emiratesData } = useFetchAllEmirateNamesQuery();
    const { data: allProjects } = useViewAllProjectsUnderDeveloperQuery({ developerId: id, ...queryParams });
    // Event Handlers
    const handleChangeSearch = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setFilters(prev => ({ ...prev, search: event.target.value }));
    }, []);

    const emirateOptions = useMemo(() => {
        const preferredOrder = ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ras Al Khaimah', 'Ajman', 'Umm Al-Quwain'];

        const mappedOptions = emiratesData?.data.map((item) => ({
            label: item.name,
            value: item._id,
            count: item.count,
        })) || [];



        const sortedOptions = mappedOptions.sort((a, b) => {
            const aIndex = preferredOrder.indexOf(a.label);
            const bIndex = preferredOrder.indexOf(b.label);

            // If both labels are in the preferredOrder list
            if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;

            // If only one is in the list, put it before the other
            if (aIndex !== -1) return -1;
            if (bIndex !== -1) return 1;

            // If neither is in the list, sort alphabetically (optional)
            return a.label.localeCompare(b.label);
        });

        return [
            { label: "All", value: "all" }, // Always first
            ...sortedOptions,
        ];
    }, [emiratesData]);
    const handleSelect = useMemo(() => ({
        projectTypeFirst: (option: any) => setFilters(prev => ({ ...prev, projectTypeFirst: option })),

    }), []);
    const router = useRouter();


    const searchParams = useSearchParams();

    const handleClick = (item: AllProjectsItems) => {

        const currency = searchParams.get('currency');

        const slug = item.slug;

        // Build query string with currency if available
        const queryString = currency ? `?currency=${currency}` : '';

        sessionStorage.setItem('scroll-position', window.scrollY.toString());
        router.push(`/projects/${slug}${queryString}`);
    }
    const [EnquiryForm, setEnquiryForm] = useState({ status: false, id: '', count: 0 });

    const handleEnquiryFormClick = useCallback((item: any) => {
        setEnquiryForm({
            status: true,
            id: item._id,
            count: 1,
        });
    }, []);


    const shuffleArray = (arr: any[]) => {
        const copy = [...arr];
        for (let i = copy.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [copy[i], copy[j]] = [copy[j], copy[i]];
        }
        return copy;
    };

    const { data: portraitBannerData } = useFetchAllPortraitBannersQuery({});

    const totalPages = allProjects?.pagination?.totalPages || 1;

    const banners = portraitBannerData?.data || [];

    const shuffledImages = useMemo(() => shuffle(banners), [banners]);
    const { data: smallVideoAdsResponse } = useViewAllSmallVideosQuery({});
    const [smallVideoAds, setSmallVideoAds] = useState<AllSmallVideoItems[]>();
    // Debounce search input
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(filters.search);
            setFilters(prev => ({ ...prev, page: 1 }));
        }, 500);

        return () => clearTimeout(handler);
    }, [filters.search]);

    useEffect(() => {



        if (smallVideoAdsResponse?.data) {
            // console.log(smallVideoAdsResponse?.data, 'smallVideoAdsResponse')
            setSmallVideoAds(smallVideoAdsResponse?.data);
        }
    }, [smallVideoAdsResponse]);

    return (
        <>
            <main>
                <Header     logoSection={
                           <div className='h-full w-full flex justify-center items-center'>
                             <MobileHeaderTitle
                            content='Projects'
                            />
                           </div>
                        }/>


                <Container>
                    <section className="sm:flex-row flex-col justify-between flex w-full gap-2">

                        <div className="md:h-[48px] sm:max-w-[380px] w-full h-[40px]">
                            <SearchNew

                                value={filters?.search || ''}
                                onChange={handleChangeSearch}
                                placeholder="Search..."
                            />
                        </div>

                        <div className=" flex gap-2">






                            {productTypeOptionFirstItems.length > 0 ? <div className="h-[40px] md:block hidden sm:h-[48px]">
                                <SwitchSelector
                                    containerClassName="sm:!gap-1"
                                    onSelect={(e) => {
                                        handleSelect.projectTypeFirst(e);
                                    }}
                                    options={productTypeOptionFirstItems}

                                />
                            </div> : <div className="w-full h-full bg-gray-50"></div>}

                            <div className=" h-[40px] md:hidden block w-full">
                                <SelectLatest
                                    listContainerClassName='!right-0 !left-auto'
                                    listContainerUlListContainerClassName="w-[200px]"
                                    // defaultValue={emirateOptions?.find((item) => item?.value === defaultEmirate?._id)}
                                    label="Category"
                                    options={productTypeOptionFirstItems}
                                    onSelect={(e) => {
                                        handleSelect.projectTypeFirst(e?.value);
                                    }}
                                />
                            </div>



                        </div>

                    </section>




                </Container>


                <SectionDivider
                    containerClassName={clsx("mb-[12px]", true ? 'mt-[12px]' : 'mt-[10.5px]')}
                    lineClassName="h-[1px] w-full bg-[#DEDEDE]"
                />

                {/* Projects Section */}
                <Container>
                    <SpaceWrapper
                        className={filters.page && filters.page > 1 ? 'pt-[10px]' : 'pt-[0px]'}
                    >

                        <div className="mb-4 flex gap-2">
                            <div className="flex-1 h-full  grid gap-3 sm:grid-cols-2 lg:grid-cols-1">




                                {/* projects */}
                                {allProjects?.data ? (
                                    allProjects.data?.map((item, index) => (
                                        <React.Fragment key={index}>
                                            <ProjectCard
                                                navigateDetailsButton={true}
                                                item={item}
                                                handleClick={handleClick}
                                                handleEnquiryFormClick={handleEnquiryFormClick}
                                            />

                                            {/* Add separator after every 5 items */}
                                            {(index + 1) % 5 === 0 && (
                                                <>
                                                    <div className=" flex sm:hidden mt:mt-0">
                                                        <CustomSlider
                                                            images={shuffleArray(shuffledImages)}
                                                            containerClassName="!h-[95px] border border-[#DEDEDE] "
                                                        />
                                                    </div></>
                                            )}
                                        </React.Fragment>
                                    ))
                                ) : (
                                    Array.from({ length: 10 }).map((_, index) => (
                                        <ProjectCardSkelton key={index} />
                                    ))
                                )}
                            </div>


                            <div className={"w-full md:block hidden max-w-[301.5px]"}>

                                {true && (smallVideoAds && smallVideoAds.length > 0 ?
                                    <div className={clsx("w-full mb-[12px] relative flex")}>
                                        {/* <div className={clsx("w-full mb-[12px] relative",filters?.page && filters?.page > 1 ? 'hidden':'flex')}> */}
                                        <VideoPreview
                                            projectSlug={smallVideoAds?.[0]?.projectDetails?.slug || ''}
                                            src={smallVideoAds?.[0]?.videoFile?.secure_url || ''}
                                        />
                                    </div> : <div className="w-full h-[250px] rounded bg-gray-50"></div>)
                                }



                                {true && <RecommendedText
                                    title="Recommended For You"
                                    items={[
        'Smart Picks in Dubai’s Fastest-Growing Zones',
        'Handpicked Homes with High ROI Potential',
        'Investor-Friendly Properties You’ll Love',
        'Move-In Ready Units in Prime Locations',
        'Top-Rated Listings in Family-Friendly Areas',
    ]}
                                />}

                                <div className="sticky top-3 left-0">

                                    <CustomSliderUi
                                        shuffledImages={shuffledImages}
                                    />


                                    {true && <>
                                        <RecommendedText
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
                                    </>}



                                </div>







                            </div>
                        </div>
                    </SpaceWrapper>
                </Container>




                <Container>
                    <div className="mt-[23.25px]">
                        <PaginationNew
                            currentPage={filters.page || 1}
                            totalPages={totalPages}
                            onPageChange={(newPage) => {
                                const url = new URL(window.location.href);
                                url.searchParams.set('page', newPage.toString());
                                window.history.pushState({}, '', url);
                                // setPaginationHappened(pre => !pre)
                                setFilters(prev => ({ ...prev, page: newPage }))
                            }}
                            maxVisiblePages={deviceType === 'mobile' ? 4 : 8} />
                    </div>
                </Container>

                <SectionDivider
                    containerClassName="mt-[45.75px]"
                    lineClassName="h-[1px] hidden sm:block w-full bg-[#DEDEDE]"
                />

                <Footer />

            </main>


            <EnquiryFormModal
                EnquiryForm={EnquiryForm}
                setEnquiryForm={setEnquiryForm}
            />
        </>
    )
}

function ProjectsUnderDeveloper(props: Props) {
    return (
        // You could have a loading skeleton as the `fallback` too
        <Suspense>
            <ProjectsUnderDeveloperFunction {...props} />
        </Suspense>
    )
}
export default ProjectsUnderDeveloper;
