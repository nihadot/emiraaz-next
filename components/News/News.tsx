'use client'
import React, { useMemo, useState } from 'react'
import Header from '../Header'
import Container from '../atom/Container/Container'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { calender } from '@/app/assets'
import Pagination from '../Pagination/Pagination'
import RecommendedText from '../RecomendedText/RecommendedText'
import CustomSliderUi from '@/app/home/CustomSliderUi'
import { FiltersState } from '../types'
import { shuffle } from '@/utils/shuffle'
import { useFetchAllPortraitBannersQuery } from '@/redux/portraitBannerAd/portraitBannerAdApi'
import { useViewAllNewsQuery } from '@/redux/news/newsApi'
import { formatDate } from '../atom/button/formatDate'
import { Footer } from '../Footer'
import Link from 'next/link'
import SectionDivider from '../atom/SectionDivider/SectionDivider'
import clsx from 'clsx'
import MobileHeaderTitle from '../atom/typography/MobileHeaderTitle'

type Props = {
    initialData: any
}

const News = ({
    initialData
}: Props) => {
    const router = useRouter();

    const [filters, setFilters] = useState<FiltersState>({
        page: 1,
        search: "",
        limit: 20,
    });
    const [debouncedSearch, setDebouncedSearch] = useState<any>("");


    const queryParams = useMemo(() => ({
        limit: 20,
        page: filters.page,
        search: debouncedSearch,

    }), [filters, debouncedSearch]);


    const { data: newsData } = useViewAllNewsQuery({ ...queryParams }, {
        skip: false,
        // @ts-expect-error — We know this line might throw a TS error due to initialData
        initialData,
    });

    const data = newsData?.data || [];

    const { data: portraitBannerData } = useFetchAllPortraitBannersQuery({});

    const banners = portraitBannerData?.data || [];
    const shuffledImages = useMemo(() => shuffle(banners), [banners]);
    const totalPages = newsData?.pagination?.totalPages || 1;

    return (
        <main>
            <Header
            logoSection={
               <div className='h-full w-full flex justify-center items-center'>
                 <MobileHeaderTitle
                content='News'
                />
               </div>
            }
            />

            <SectionDivider
                containerClassName={clsx("mb-[12px] mt-[12px]")}
                lineClassName="h-[1px] w-full bg-[#DEDEDE]"
            />

            <Container>

                <section className='h-full w-full gap-[30px] pb-20 flex'>
                    <div className=" flex-1">
                        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-[12px] sm:gap-[37px] ">
                            {data && data?.length > 0 ? data?.map((item, index) => {
                                return (
                                    <div key={index} className="">
                                        <div className="relative w-full h-[185px] object-cover">

                                            <Image
                                                fill
                                                alt={item.newsTitle}
                                                src={item.image?.secure_url || ''}
                                                className="rounded-[5px] cursor-text"
                                            />
                                        </div>
                                        <Link
                                            href={`/news/${item.slug}`}
                                        >
                                            <h4 className='mt-[8.25px] cursor-pointer font-poppins font-medium text-[14.25px] text-black line-clamp-2 text-ellipsis'>{item.newsTitle}</h4>
                                        </Link>

                                        <div className="flex items-center mt-2  gap-[5px]">

                                            <div className=" flex font-poppins h-[24px] font-medium justify-center items-center px-3 rounded-[5px] text-[10.5px] text-[#FF1645] bg-[#FFE7EC] ">{item?.newCategoryDetails?.name}</div>


                                            <div className="flex justify-center px-2 py-1  items-center gap-[4.5px]">
                                                <Image
                                                    src={calender}
                                                    alt="calender"
                                                    width={16.5}
                                                    height={16.5}
                                                    className="w-[16.5px] cursor-text h-[16.5px]"
                                                />
                                                <p className='text-[#767676]   text-[12px] font-medium font-poppins'>{formatDate(item?.date)}</p>

                                            </div>
                                        </div>
                                    </div>


                                )
                            })

                                :

                                Array.from({ length: 10 }).map((_, index) => (
                                    <div className="" key={index}>
                                        <div key={index} className="bg-slate-50 mb-1 animate-pulse w-full h-[185px] rounded-[5px] object-cover" />
                                        <div className='bg-slate-50  mb-1 w-full h-[30px] rounded-[5px] ' />
                                        <div className='h-[30px] bg-slate-50 w-full rounded-[5px] ' />
                                    </div>
                                ))
                            }


                        </div>



                        <div className="mt-[23.25px]  flex justify-center items-center w-full">

                            <Pagination
                                currentPage={filters.page || 1}
                                totalPages={totalPages}
                                onPageChange={(newPage) => setFilters(prev => ({ ...prev, page: newPage }))}
                            />

                        </div>
                    </div>

                    <div className="max-w-[301.5px] bg-white w-full hidden sm:block">
                        <RecommendedText
                            title="Population"
                            containerClassName='!my-0'
                        />

                        {data && data.length > 0 ? data.map((item, index) => {

                            return (
                                <div key={index} className="flex items-center gap-[10.5px]  pt-[8px] ">
                                    <div className="relative w-[107.25px] h-[58.5px] rounded-[5px] object-cover">

                                        <Image
                                            fill
                                            alt={item.newsTitle}
                                            src={item.image?.secure_url || ''}
                                            className="rounded-[5px]"
                                        />
                                    </div>
                                    <div className="flex flex-col w-full ">

                                        <h4 className='font-poppins font-medium text-[12px] text-black line-clamp-2 text-ellipsis'>{item.newsTitle}</h4>

                                        <div className="flex items-center">

                                            <div className="flex items-center gap-[4.5px]">
                                                <Image
                                                    src={calender}
                                                    alt="calender"
                                                    width={16.5}
                                                    height={16.5}
                                                    className="w-[16.5px] h-[16.5px]"
                                                />                                                <p className='text-[#767676]   text-[12px] font-medium font-poppins'>{formatDate(item?.date)}</p>

                                            </div>
                                        </div>

                                    </div>
                                </div>
                            )
                        })
                            :
                            Array.from({ length: 4 }).map((_, index) => (
                                <div className="flex gap-[10.5px] mt-2" key={index}>
                                    <div key={index} className="bg-slate-50 mb-1 animate-pulse  w-[107.25px] h-[58.5px] rounded-[3px]" />
                                    <div className="w-full">
                                        <div className='bg-slate-50  mb-1 w-full h-[28px] rounded-[3px] ' />
                                        <div className='h-[28px] bg-slate-50 w-[100px] rounded-[3px] ' />
                                    </div>
                                </div>
                            ))
                        }


                        <div className="mt-4"></div>
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
                        <div className="sticky top-3 mt-3 left-0">


                            <CustomSliderUi
                                shuffledImages={shuffledImages}
                            />



                            {<>
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


                </section>


            </Container>




            <Footer />
        </main>
    )
}

export default News