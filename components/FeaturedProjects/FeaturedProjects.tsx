'use client'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import Header from '../Header'
import { Footer } from '../Footer'
import Container from '../atom/Container/Container'
import SectionDivider from '../atom/SectionDivider/SectionDivider'
import clsx from 'clsx'
import SpaceWrapper from '../atom/SpaceWrapper/SpaceWrapper'
import { useForceScrollRestore, useScrollToTopOnRefresh } from '@/hooks/useScrollRestoration'
import { usePathname, useRouter } from 'next/navigation'
import { useViewAllWishlistsQuery } from '@/redux/wishlist/wishlistApi'
import { AllWishlistItems } from '@/redux/wishlist/types'
import { AllSmallVideoItems } from '@/redux/smallVideo/types'
import { useViewAllSmallVideosQuery } from '@/redux/smallVideo/smallViewApi'
import { useDispatch } from 'react-redux'
import { setWishlist } from '@/redux/wishlistSlice/wishlistSlice'
import { FiltersState } from '../types'
import { useFetchFeaturedProjectsQuery } from '@/redux/project/projectApi'
import { useFetchAllPortraitBannersQuery } from '@/redux/portraitBannerAd/portraitBannerAdApi'
import { shuffle } from '@/utils/shuffle'
import { AllProjectsItems } from '@/redux/project/types'
import Image from 'next/image'
import { big_white_logo_icon } from '@/app/assets'
import pIcon from "@/app/assets/p-icon.png";
import ProjectCard from '../ProjectCard/ProjectCard'
import CustomSlider from '../CustomSlider/CustomSlider'
import ProjectCardSkelton from '../ProjectCard/ProjectCardSkelton'
import RecommendedText from '../RecomendedText/RecommendedText'
import CustomSliderUi from '@/app/home/CustomSliderUi'
import BottomBanner from '@/app/home/BottomBannerasas'
import MobileFooterBanner from '@/app/home/MobileFooterBanner'
import EnquiryFormModal from '../EnquiryFormModal/EnquiryFormModal'
import { LOCAL_STORAGE_KEYS } from '@/api/storage'
import MobileHeaderTitle from '../atom/typography/MobileHeaderTitle'


function FeaturedProjects({
    siteMap
}: {
    siteMap: any[]
}) {


    useForceScrollRestore();
    useScrollToTopOnRefresh();
    const [loading, setLoading] = useState(false)

    const [paginationHappened, setPaginationHappened] = useState(false)

    const router = useRouter();

    const pathname = usePathname();

    const userDataString = useMemo(() => {
        return typeof window !== "undefined" ? localStorage.getItem(LOCAL_STORAGE_KEYS.USER_DATA) : null;
    }, []);


    const userId = useMemo(() => {
        if (!userDataString) return null;
        try {
            const parsed = JSON.parse(userDataString);
            return parsed?._id || null;
        } catch (err) {
            return null;
        }
    }, [userDataString]);


    const [wishlistData, setWishlistData] = useState<AllWishlistItems[]>();
    const { data: wishlistDataItem } = useViewAllWishlistsQuery(
        { userId },
        { skip: !userId } // <- only call if userId is available
    );

    const [smallVideoAds, setSmallVideoAds] = useState<AllSmallVideoItems[]>();

    const { data: smallVideoAdsResponse } = useViewAllSmallVideosQuery({});

    const dispatch = useDispatch();


    //   useScrollRestoration('home-scroll');


    useEffect(() => {
        if (wishlistDataItem?.data) {
            dispatch(setWishlist(wishlistDataItem?.data))
            setWishlistData(wishlistDataItem?.data)
        }

        if (smallVideoAdsResponse?.data) {
            // console.log(smallVideoAdsResponse?.data, 'smallVideoAdsResponse')
            setSmallVideoAds(smallVideoAdsResponse?.data);
        }
    }, [wishlistDataItem, smallVideoAdsResponse]);


    useEffect(() => {
        const today = new Date().toISOString().split('T')[0]
        const lastSeen = localStorage.getItem('splashLastSeenDate')

        if (lastSeen !== today) {
            setLoading(true)
            const timer = setTimeout(() => {
                setLoading(false)
                localStorage.setItem('splashLastSeenDate', today)
            }, 2000)
            return () => clearTimeout(timer)
        }
    }, []);

    // console.log(wishlistData, 'wishlistData')

    const [filters, setFilters] = useState<FiltersState>({
        page: 1,
        search: "",
        cities: [],
        developers: [],
        facilities: [],
        propertyTypeSecond: "all",
        emirate: "",
        completionType: "",
        handoverDate: undefined,
        paymentPlan: undefined,
        furnishType: "",
        discount: "",
        projectTypeFirst: 'off-plan-projects',
        projectTypeLast: 'all',
        bedAndBath: "",
        minPrice: '',
        maxPrice: '',
        minSqft: "",
        maxSqft: "",
        beds: "",
        bath: "",
    });

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });

    }, [paginationHappened]);




    const [debouncedSearch, setDebouncedSearch] = useState<any>("");
    const [EnquiryForm, setEnquiryForm] = useState({ status: false, id: '', count: 0 });

    // Debounce search input
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(filters.search);
            setFilters(prev => ({ ...prev, page: 1 }));
        }, 500);

        return () => clearTimeout(handler);
    }, [filters.search]);

    const { data: portraitBannerData } = useFetchAllPortraitBannersQuery({});
    const { data: projects } = useFetchFeaturedProjectsQuery();


    const banners = portraitBannerData?.data || [];
    const shuffledImages = useMemo(() => shuffle(banners), [banners]);

    const shuffleArray = (arr: any[]) => {
        const copy = [...arr];
        for (let i = copy.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [copy[i], copy[j]] = [copy[j], copy[i]];
        }
        return copy;
    };



    const handleClick = (item: AllProjectsItems) => {
        sessionStorage.setItem('scroll-position', window.scrollY.toString());
        router.push(`/projects/${item.slug}`);
    };

    const handleEnquiryFormClick = useCallback((item: any) => {
        setEnquiryForm({
            status: true,
            id: item._id,
            count: 1,
        });
    }, []);



    const [allProjects, setAllProjects] = useState<AllProjectsItems[]>();

    useEffect(() => {

        if (projects?.data) {
            setAllProjects(projects?.data);
        }
    }, [projects]);


    const [defaultProjectStage, setDefaultProjectStage] = useState<string>('');



    useEffect(() => {
        if (pathname === '/') {
            setDefaultProjectStage('all')
        }
        function setRealVH() {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        }
        window.addEventListener('resize', setRealVH);

    }, []);




    if (loading) {
        return (
            <div className="flex items-center justify-center h-full bg-black" style={{ height: 'calc(var(--vh, 1vh) * 100)' }}>
                <div className="relative animate-pulse sm:block hidden w-full max-w-[320px] sm:max-w-[420px] md:max-w-[500px] lg:max-w-[580.5px] aspect-[574.5/140.5] p-4 sm:p-0">
                    <Image width={590} height={140} src={big_white_logo_icon} alt="logo" />
                </div>


                <div className="relative animate-pulse block sm:hidden w-full max-w-[320px] sm:max-w-[420px]  p-4 sm:p-0">
                    <Image width={300} height={140} src={pIcon} alt="property seller logo" />
                </div>
            </div>
        )
    }


    return (
        <>
            <main>

                <div className=" min-h-screen  w-full lg:overflow-visible font-[family-name:var(--font-geist-sans)]">
                    <Header logoSection={
                        <div className='h-full w-full flex justify-center items-center'>
                            <MobileHeaderTitle
                                content='Featured Projects'
                            />
                        </div>
                    } />



                    <SectionDivider
                        containerClassName={clsx("mb-[12px] mt-[10.5px]")}
                        lineClassName="h-[1px] w-full bg-[#DEDEDE]"
                    />



                    {/* Projects Section */}
                    <Container>
                        <SpaceWrapper
                            className={'pt-[0px]'}
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

                                    <RecommendedText
                                        title="Recommended For You"
                                        containerClassName='!mb-2 !mt-0'
                                        items={shuffle(siteMap)?.slice(0, 6)}

                                    />

                                    {/* {(smallVideoAds && smallVideoAds.length > 0 ?
                                        <div className={clsx("w-full mb-[12px] relative flex")}>
                                            <VideoPreview
                                                projectSlug={smallVideoAds?.[0]?.projectDetails?.slug || ''}
                                                src={smallVideoAds?.[0]?.videoFile?.secure_url || ''}
                                            />
                                        </div> : <div className="w-full h-[250px] rounded bg-gray-50"></div>)
                                    } */}




                                    <div className="sticky top-3 left-0">

                                        <CustomSliderUi
                                            shuffledImages={shuffledImages}
                                        />
                                        <RecommendedText
                                            title="Trending Areas"
                                            items={shuffle(siteMap)?.slice(0, 6)}

                                        />
                                        <RecommendedText
                                            title="Popular Searches"
                                            items={shuffle(siteMap)?.slice(0, 6)}

                                        />



                                    </div>







                                </div>
                            </div>
                        </SpaceWrapper>
                    </Container>





                </div>








                <SectionDivider
                    containerClassName="mt-[45.75px]"
                    lineClassName="h-[1px] hidden sm:block w-full bg-[#DEDEDE]"
                />


                <BottomBanner />

                {/* Mobile Footer Banner */}
                <MobileFooterBanner />


                <div className="px-5 flex sm:hidden lg:px-8 mt-[16px]">

                    <RecommendedText
                        title="Recommended For You"
                                                        items={shuffle(siteMap)?.slice(0, 6)}
                        
                    />
                </div>



                <Footer />




            </main>


            <EnquiryFormModal
                EnquiryForm={EnquiryForm}
                setEnquiryForm={setEnquiryForm}
            />

        </>
    )
}

export default FeaturedProjects