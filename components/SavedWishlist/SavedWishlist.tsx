'use client'
import React, { Suspense, useCallback, useEffect, useMemo, useState } from 'react'
import Header from '../Header'
import Container from '../atom/Container/Container'
import SectionDivider from '../atom/SectionDivider/SectionDivider'
import clsx from 'clsx'
import SpaceWrapper from '../atom/SpaceWrapper/SpaceWrapper'
import ProjectCard from '../ProjectCard/ProjectCard'
import { AllProjectsItems } from '@/redux/project/types'
import EnquiryFormModal from '../EnquiryFormModal/EnquiryFormModal'
import RecommendedText from '../RecomendedText/RecommendedText'
import { shuffle } from '@/utils/shuffle'
import { useFetchAllPortraitBannersQuery } from '@/redux/portraitBannerAd/portraitBannerAdApi'
import ProjectCardSkelton from '../ProjectCard/ProjectCardSkelton'
import CustomSlider from '../CustomSlider/CustomSlider'
import CustomSliderUi from '@/app/home/CustomSliderUi'
import BottomBanner from '@/app/home/BottomBannerasas'
import MobileFooterBanner from '@/app/home/MobileFooterBanner'
import { Footer } from '../Footer'
import { useRouter } from 'next/navigation'
import { useViewAllUserWishlistProjectsQuery, useViewAllWishlistsQuery } from '@/redux/wishlist/wishlistApi'
import { LOCAL_STORAGE_KEYS } from '@/api/storage'
import { setWishlist } from '@/redux/wishlistSlice/wishlistSlice'
import { useDispatch } from 'react-redux'
import { AllWishlistItems } from '@/redux/wishlist/types'
import useAuthRedirect from '@/hooks/useAuthRedirect'
import MobileHeaderTitle from '../atom/typography/MobileHeaderTitle'

export default function SavedWishlistComponent({
    siteMap
}: {
    siteMap: any[]
}) {


    const userDataString = useMemo(() => {
        return typeof window !== "undefined" ? localStorage.getItem(LOCAL_STORAGE_KEYS.USER_DATA) : null;
    }, []);


    // Inside your component
    useAuthRedirect();

    const userId = useMemo(() => {
        if (!userDataString) return null;
        try {
            const parsed = JSON.parse(userDataString);
            return parsed?._id || null;
        } catch (err) {
            return null;
        }
    }, [userDataString]);

    const dispatch = useDispatch();


    const { data: projects } = useViewAllUserWishlistProjectsQuery({});
    const [wishlistData, setWishlistData] = useState<AllWishlistItems[]>();
    const { data: wishlistDataItem } = useViewAllWishlistsQuery(
        { userId },
        { skip: !userId } // <- only call if userId is available
    );

    useEffect(() => {
        if (wishlistDataItem?.data) {
            dispatch(setWishlist(wishlistDataItem?.data))
            setWishlistData(wishlistDataItem?.data)
        }

    }, [wishlistDataItem]);


    const router = useRouter();

    const handleClick = (item: AllProjectsItems) => {
        sessionStorage.setItem('scroll-position', window.scrollY.toString());
        router.push(`/projects/${item.slug}`);
    };

    const [allProjects, setAllProjects] = useState<{ _id: string; propertyDetails: AllProjectsItems }[]>();

    useEffect(() => {
        if (projects?.data) {
            setAllProjects(projects?.data);
        }
    }, [projects]);

    const handleEnquiryFormClick = useCallback((item: any) => {
        setEnquiryForm({
            status: true,
            id: item._id,
            count: 1,
        });
    }, []);

    const [EnquiryForm, setEnquiryForm] = useState({ status: false, id: '', count: 0 });
    const { data: portraitBannerData } = useFetchAllPortraitBannersQuery({});

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

    return (
        <>
            <main>

                <div className=" min-h-screen  w-full lg:overflow-visible font-[family-name:var(--font-geist-sans)]">
                    <Header logoSection={
                        <div className='h-full w-full flex justify-center items-center'>
                            <MobileHeaderTitle
                                content='Saved Properties'
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
                                                    item={item?.propertyDetails}
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
