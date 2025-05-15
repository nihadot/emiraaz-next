'use client'
import { formatDate } from '@/components/atom/button/formatDate';
import { Footer } from '@/components/Footer'
import Header from '@/components/Header'
import RecommendedText from '@/components/RecomendedText/RecommendedText';
import Image from 'next/image';
import React, { useMemo, useState } from 'react'
import { FaCalendar } from 'react-icons/fa';
import { shuffle } from '@/utils/shuffle';
import { useFetchAllPortraitBannersQuery } from '@/redux/portraitBannerAd/portraitBannerAdApi';
import Pagination from '@/components/Pagination/Pagination';
import { useViewAllNewsQuery } from '@/redux/news/newsApi';
import CustomSliderUi from '../home/CustomSliderUi';
import { useRouter } from 'next/navigation';
import Container from '@/components/atom/Container/Container';




type FiltersState = {

    page?: number,
    limit?: number,
    search?: string,
};

function AllNews() {

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


    const { data: newsData } = useViewAllNewsQuery(queryParams);

    const data = newsData?.data || [];

    const { data: portraitBannerData } = useFetchAllPortraitBannersQuery({});

    const banners = portraitBannerData?.data || [];
    const router = useRouter();
    const shuffledImages = useMemo(() => shuffle(banners), [banners]);
    const totalPages = newsData?.pagination?.totalPages || 1;

    return (
        <main>
            <Header />
            <div className="pb-[12.75px] sm:flex hidden">
                <div className="h-[1px] w-full bg-[#DEDEDE]"></div>
            </div>

<Container>

            <section className='m-auto gap-[30px] pb-20 flex items-start '>
                <div className="w-full">
                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-[12px] sm:gap-[37.5px]">

                        {data?.map((item, index) => {
                            return (
                                <div key={index} className="">
                                    <div  className="relative w-full h-[185px] object-cover">

                                        <Image
                                            fill
                                            alt={item.newsTitle}
                                            src={item.image?.secure_url || ''}
                                            className="rounded-md"
                                        />
                                    </div>

                                    <h4 onClick={()=>router.push(`/news/${item.slug}`)} className='mt-[8.25px] font-poppins font-medium text-[14.25px] text-black line-clamp-2 text-ellipsis'>{item.newsTitle}</h4>

                                    <div className="flex items-center  gap-[7.5px]">

                                        <div className="text-[9.75px] mt-[4.5px] rounded-[2.25px] bg-red-700/10 w-fit px-4 h-[21px] flex justify-center items-center text-[#FF1645]  font-normal">
                                            {item.newCategoryDetails.name}
                                        </div>

                                        <div className="flex items-center gap-[4.5px]">
                                            <FaCalendar size={16.5} color='#767676' height={16.5} />
                                            <p className='text-[#767676]   text-[12px] font-medium font-poppins'>{formatDate(item?.date)}</p>

                                        </div>
                                    </div>
                                </div>


                            )
                        })}
                    </div>


                    <div className="mt-[23.25px] flex justify-center items-center w-full ">

                        <Pagination
                            currentPage={filters.page || 1}
                            totalPages={totalPages}
                            onPageChange={(newPage) => setFilters(prev => ({ ...prev, page: newPage }))}
                        />

                        {/* <div className="text-[10.5px] mt-[8.25px] flex justify-center items-center font-normal font-poppins text-[#767676]">1 To 24 of 23,567 Listings</div> */}
                    </div>
                </div>
                <div className="max-w-[301.5px]  hidden sm:block">

                    <RecommendedText
                        title="Population"
                        containerClassName='!my-0'
                    />


                    {data.map((item, index) => {

                        return (
                            <div key={index} className="flex items-center gap-[10.5px]  py-[11.25px] ">
                                <div  className="relative w-[107.25px] h-[58.5px] rounded-[3.75px] object-cover">

                                    <Image
                                        fill
                                        alt={item.newsTitle}
                                        src={item.image?.secure_url || ''}
                                        className="rounded-md"
                                    />
                                </div>
                                <div className="flex flex-col w-full ">

                                    <h4 className='font-poppins font-medium text-[12px] text-black line-clamp-2 text-ellipsis'>{item.newsTitle}</h4>

                                    <div className="flex items-center">

                                        <div className="flex items-center gap-[4.5px]">
                                            <FaCalendar size={16.5} color='#767676' height={16.5} />
                                            <p className='text-[#767676]   text-[12px] font-medium font-poppins'>{formatDate(item?.date)}</p>

                                        </div>
                                    </div>

                                </div>
                            </div>
                        )
                    })}

                    <div className="">

                        <CustomSliderUi
                            shuffledImages={shuffledImages}
                        />
                    </div>

                </div>




            </section>
</Container>




            <Footer />
        </main>
    )
}

export default AllNews