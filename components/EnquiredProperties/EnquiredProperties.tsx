'use client'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import Header from '../Header'
import SectionDivider from '../atom/SectionDivider/SectionDivider'
import clsx from 'clsx'
import Container from '../atom/Container/Container'
import SpaceWrapper from '../atom/SpaceWrapper/SpaceWrapper'
import { AllProjectsItems } from '@/redux/project/types'
import { useFetchEnquiredProjectsQuery } from '@/redux/project/projectApi'
import ProjectCard from '../ProjectCard/ProjectCard'
import { useRouter } from 'next/navigation'
import CustomSlider from '../CustomSlider/CustomSlider'
import { shuffle } from '@/utils/shuffle'
import { useFetchAllPortraitBannersQuery } from '@/redux/portraitBannerAd/portraitBannerAdApi'
import ProjectCardSkelton from '../ProjectCard/ProjectCardSkelton'
import RecommendedText from '../RecomendedText/RecommendedText'
import CustomSliderUi from '@/app/home/CustomSliderUi'
import BottomBanner from '@/app/home/BottomBannerasas'
import MobileFooterBanner from '@/app/home/MobileFooterBanner'
import { Footer } from '../Footer'
import EnquiryFormModal from '../EnquiryFormModal/EnquiryFormModal'
import { LOCAL_STORAGE_KEYS } from '@/api/storage'
import { AllWishlistItems } from '@/redux/wishlist/types'
import { useViewAllWishlistsQuery } from '@/redux/wishlist/wishlistApi'
import { useDispatch } from 'react-redux'
import { setWishlist } from '@/redux/wishlistSlice/wishlistSlice'
import { AllSmallVideoItems } from '@/redux/smallVideo/types'
import { useViewAllSmallVideosQuery } from '@/redux/smallVideo/smallViewApi'
import useAuthRedirect from '@/hooks/useAuthRedirect'
import MobileHeaderTitle from '../atom/typography/MobileHeaderTitle'

function EnquiredProperties(
    {siteMap}:{
        siteMap:any[]
    }
) {
    const { data: projects } = useFetchEnquiredProjectsQuery();
    const router = useRouter();

        const [allProjects, setAllProjects] = useState<{
            _id: string;
            propertyDetails: AllProjectsItems;
        }[]>();
    
           // Inside your component
        useAuthRedirect();
        useEffect(() => {
            if (projects?.data) {
                setAllProjects(projects?.data);
            }
        }, [projects]);
    


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
        
    const dispatch = useDispatch();


    //   useScrollRestoration('home-scroll');

    const [smallVideoAds, setSmallVideoAds] = useState<AllSmallVideoItems[]>();
    const { data: smallVideoAdsResponse } = useViewAllSmallVideosQuery({});

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
          const [EnquiryForm, setEnquiryForm] = useState({ status: false, id: '', count: 0 });
        
    const shuffleArray = (arr: any[]) => {
        const copy = [...arr];
        for (let i = copy.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [copy[i], copy[j]] = [copy[j], copy[i]];
        }
        return copy;
    };
    const { data: portraitBannerData } = useFetchAllPortraitBannersQuery({});

        const banners = portraitBannerData?.data || [];
        const shuffledImages = useMemo(() => shuffle(banners), [banners]);
    
  return (
      <>
            <main>

                <div className=" min-h-screen  w-full lg:overflow-visible font-[family-name:var(--font-geist-sans)]">
                    <Header     logoSection={
                           <div className='h-full w-full flex justify-center items-center'>
                             <MobileHeaderTitle
                            content='Enquired Properties'
                            />
                           </div>
                        }/>



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
                                                    navigateEnquiredButton={false}
                                                    item={item.propertyDetails}
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

export default EnquiredProperties