'use client'
import React, { Suspense, useCallback, useEffect, useMemo, useState } from 'react'
import Header from '../Header';
import Container from '../atom/Container/Container';
import SearchNew from '../SearchField/SearchNew';
import { Footer } from '../Footer';
import { useFetchAllCityNamesQuery, useFetchAllProjectsUnderCityQuery } from '@/redux/cities/citiesApi';
import PaginationNew from '../PaginationNew/PaginationNew';
import { useDeviceType } from '@/utils/useDeviceType';
import { useForceScrollRestore, useScrollToTopOnRefresh } from '@/hooks/useScrollRestoration';
import SpaceWrapper from '../atom/SpaceWrapper/SpaceWrapper';
import BreadcampNavigation from '../BreadcampNavigation/BreadcampNavigation';
import clsx from 'clsx';
import { AllProjectsItems } from '@/redux/project/types';
import ProjectCard from '../ProjectCard/ProjectCard';
import { useRouter, useSearchParams } from 'next/navigation';
import CustomSlider from '../CustomSlider/CustomSlider';
import { shuffle } from '@/utils/shuffle';
import { useFetchAllPortraitBannersQuery } from '@/redux/portraitBannerAd/portraitBannerAdApi';
import ProjectCardSkelton from '../ProjectCard/ProjectCardSkelton';
import { AllSmallVideoItems } from '@/redux/smallVideo/types';
import VideoPreview from '@/app/home/VideoPreview';
import { useViewAllSmallVideosQuery } from '@/redux/smallVideo/smallViewApi';
import RecommendedText from '../RecomendedText/RecommendedText';
import CustomSliderUi from '@/app/home/CustomSliderUi';
import Recommendations from '@/app/home/Recommendations';
import SelectLatest from '../SelectOption/SelectLatest';
import { useFetchAllEmirateNamesQuery, useGetEmirateDetalsByCityIdQuery } from '@/redux/emirates/emiratesApi';
import { SwitchSelector } from '../SelectOption';
import { productTypeOptionFirstItems } from '@/data';
import SectionDivider from '../atom/SectionDivider/SectionDivider';
import EnquiryFormModal from '../EnquiryFormModal/EnquiryFormModal';

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


function ProjectsUnderCityFunction({ id }: Props) {



    const [filters, setFilters] = useState<FiltersState>({
        page: 1,
        search: "",
        emirate: "",
        cities: [],
        projectTypeFirst: '',


    });


    const [debouncedSearch, setDebouncedSearch] = useState<any>("");

    // Debounce search input
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(filters.search);
            setFilters(prev => ({ ...prev, page: 1 }));
        }, 500);

        return () => clearTimeout(handler);
    }, [filters.search]);

    const queryParams = useMemo(() => ({
        limit: 24,
        page: filters.page,
        search: debouncedSearch,
        // cities: filters.cities,
        projectTypeFirst: filters.projectTypeFirst,
        emirate: filters.emirate,
    }), [filters, debouncedSearch]);

    const [defaultEmirate, setDefaultEmirate] = useState<{
        name: string;
        _id: string;
    }>();
    const { data: cities } = useFetchAllCityNamesQuery({ emirate: filters.emirate, slug: '1', });
    const { data: emirateDetails } = useGetEmirateDetalsByCityIdQuery({ slug: id });
    const handleSelect = useMemo(() => ({
        emirate: (option: any) => setFilters(prev => ({ ...prev, emirate: option?.value || '' })),
        projectTypeFirst: (option: any) => setFilters(prev => ({ ...prev, projectTypeFirst: option })),

    }), []);

    const { data: smallVideoAdsResponse } = useViewAllSmallVideosQuery({});

    const deviceType = useDeviceType();
    const [smallVideoAds, setSmallVideoAds] = useState<AllSmallVideoItems[]>();
    const { data } = useFetchAllProjectsUnderCityQuery({ citySlug: id, ...queryParams });


    const [paginationHappened, setPaginationHappened] = useState(false)




    // Event Handlers
    const handleChangeSearch = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setFilters(prev => ({ ...prev, search: event.target.value }));
    }, []);

    const totalPages = data?.pagination?.totalPages || 1;

    useEffect(() => {
        // if(pathname.includes('/')){
        window.scrollTo({ top: 0, behavior: 'smooth' });
        // }

    }, [paginationHappened]);
    const [allProjects, setAllProjects] = useState<AllProjectsItems[]>([]);
    const { data: portraitBannerData } = useFetchAllPortraitBannersQuery({});
    const banners = portraitBannerData?.data || [];
    const shuffledImages = useMemo(() => shuffle(banners), [banners]);
    const { data: emiratesData } = useFetchAllEmirateNamesQuery();


    const router = useRouter();
    useForceScrollRestore();
    useScrollToTopOnRefresh();

    useEffect(() => {
        if (data && data.data) {
            setAllProjects(data.data);
        }
        if (emirateDetails && emirateDetails.data) {
            setDefaultEmirate(emirateDetails.data);
        }
    }, [data, emirateDetails]);

    const [EnquiryForm, setEnquiryForm] = useState({ status: false, id: '', count: 0 });

    const searchParams = useSearchParams();
    const handleClick = (item: AllProjectsItems) => {

        const currency = searchParams.get('currency');

        const slug = item.slug;

        // Build query string with currency if available
        const queryString = currency ? `?currency=${currency}` : '';

        sessionStorage.setItem('scroll-position', window.scrollY.toString());
        router.push(`/projects/${slug}${queryString}`);
    }


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

    useEffect(() => {



        if (smallVideoAdsResponse?.data) {
            // console.log(smallVideoAdsResponse?.data, 'smallVideoAdsResponse')
            setSmallVideoAds(smallVideoAdsResponse?.data);
        }
    }, [smallVideoAdsResponse]);


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
            ...sortedOptions,
        ];
    }, [emiratesData]);


    const cityOptions = useMemo(() => {
        console.log(cities, 'cities')
        const mappedOptions = cities?.data.map((item) => ({
            label: item.name,
            value: item.name,
            count: item.count,
            slug: item.slug,
        })) || [];

        return [
            ...mappedOptions,
        ];
    }, [cities]);

    // const cityObject = cities?.data?.find(item=>item.slug===id);

    // console.log(cityObject,'cityObject')


    return (
        <>
        <main>
            <Header />


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

                        <div className="hidden lg:flex h-[48px]">
                            <SelectLatest
                                listContainerUlListContainerClassName="w-[200px]"
                                search
                                defaultValue={emirateOptions?.find((item) => item?.value === defaultEmirate?._id)}
                                // clearSelection={clear}
                                label="Emirates"
                                options={emirateOptions}
                                onSelect={(e) => {
                                    const url = new URL(window.location.href);
                                    if (e?.value) {
                                        url.searchParams.set('emirate', e?.label ?? '');
                                    } else {
                                        url.searchParams.delete('emirate');
                                    }
                                    const newUrl = `${url.pathname}?${url.searchParams.toString()}`;
                                    window.history.pushState({}, '', newUrl);
                                    handleSelect.emirate(e)
                                }}
                            />
                        </div>


                        <div className="hidden lg:flex h-[48px]">
                            <SelectLatest
                                defaultValueMultiple={cityOptions?.filter((item) => item.slug === id)}
                                search
                                onSelect={(e) => {
                                    console.log(e, 'e')
                                    router.push(`/cities/${e?.slug}`)
                                }}
                               
                                listContainerUlListContainerClassName="w-[220px]"
                                label="Cities"
                                options={cityOptions}

                            />
                        </div>

                        <div className="flex lg:hidden w-full gap-2">

                            <div className=" h-[40px] w-full">
                                <SelectLatest
                                    listContainerUlListContainerClassName="w-[200px]"
                                    search
                                    defaultValue={emirateOptions?.find((item) => item?.value === defaultEmirate?._id)}
                                    label="Emirates"
                                    options={emirateOptions}
                                    onSelect={(e) => {
                                        const url = new URL(window.location.href);
                                        if (e?.value) {
                                            url.searchParams.set('emirate', e?.label ?? '');
                                        } else {
                                            url.searchParams.delete('emirate');
                                        }
                                        const newUrl = `${url.pathname}?${url.searchParams.toString()}`;
                                        window.history.pushState({}, '', newUrl);
                                        handleSelect.emirate(e)
                                    }}
                                />
                            </div>


                            <div className=" h-[40px] w-full">
                                <SelectLatest

                                    defaultValueMultiple={cityOptions?.filter((item) => item.slug === id)}
                                    search

                                    onSelect={(e) => {
                                        const url = new URL(window.location.href);
                                        if (e?.value) {
                                            url.searchParams.set('emirate', e?.label ?? '');
                                        } else {
                                            url.searchParams.delete('emirate');
                                        }
                                        const newUrl = `${url.pathname}?${url.searchParams.toString()}`;
                                        window.history.pushState({}, '', newUrl);
                                        handleSelect.emirate(e)
                                    }}
                                    listContainerClassName="w-[220px] sm:!left-0 !-left-14 "
                                    label="Cities"
                                    options={cityOptions}
                                />
                            </div>

                        </div>


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
                            {allProjects ? (
                                allProjects?.map((item, index) => (
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

                            {filters.page && filters.page <= 1 && (smallVideoAds && smallVideoAds.length > 0 ?
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
                                    'Studio Properties For Sale in Dubai',
                                    '1 BHK Flats in Downtown',
                                    'Luxury Villas in Palm Jumeirah',
                                    'Affordable Apartments in JVC',
                                    'Beachfront Homes in Dubai Marina',
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
                                            'Studio Properties For Sale in Dubai',
                                            '1 BHK Flats in Downtown',
                                            'Luxury Villas in Palm Jumeirah',
                                            'Affordable Apartments in JVC',
                                            'Beachfront Homes in Dubai Marina',
                                        ]}
                                    />
                                    <RecommendedText
                                        title="Popular Searches"
                                        items={[
                                            'Off-plan Projects in Dubai',
                                            'Ready to Move Villas',
                                            'High ROI Areas in UAE',
                                            'Townhouses in Arabian Ranches',
                                            'Gated Communities in Sharjah',
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
                            setPaginationHappened(pre => !pre)
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


function ProjectsUnderCity(props: Props) {
  return (
    // You could have a loading skeleton as the `fallback` too
    <Suspense>
      <ProjectsUnderCityFunction {...props} />
    </Suspense>
  )
}
export default ProjectsUnderCity;
