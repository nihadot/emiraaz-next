'use client'
import { formatDate } from '@/components/atom/button/formatDate';
import { Footer } from '@/components/Footer'
import Header from '@/components/Header'
import Image from 'next/image';
import React, { useMemo, useState } from 'react'
import { useFetchAllPortraitBannersQuery } from '@/redux/portraitBannerAd/portraitBannerAdApi';
import Pagination from '@/components/Pagination/Pagination';
import { useRouter } from 'next/navigation';
import { useViewAllBlogsQuery } from '@/redux/blogs/blogsApi';



type FiltersState = {

    page?: number,
    limit?: number,
    search?: string,
};

function Blogs() {

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


    const { data: blogsData } = useViewAllBlogsQuery(queryParams);

    const data = blogsData?.data || [];

    const { data: portraitBannerData } = useFetchAllPortraitBannersQuery({});

    const banners = portraitBannerData?.data || [];
    const router = useRouter();
    const totalPages = blogsData?.pagination?.totalPages || 1;

    return (
        <main>
            <Header />
            <div className="pb-[12.75px] sm:flex hidden">
                <div className="h-[1px] w-full bg-[#DEDEDE]"></div>
            </div>

            <h3 className='text-[37.5px] text-center py-[33px] hidden md:block font-medium font-poppins text-[#FF1645]'>Learn, Discover, Invest.</h3>

            <section className='px-5 max-w-[1200px] m-auto gap-[30px] pb-20 lg:px-8 xl:px-[144.75px] flex items-start '>
                <div className="w-full">
                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-[12px] sm:gap-[37.5px]">

                        {data?.map((item, index) => {
                            return (
                                <div className="" key={index}>
                                    <div key={index} className="relative w-full h-[208.5px] object-cover">
                                    <div className="px-4 py-1 font-poppins font-medium rounded-[3.5px] absolute text-[13.5px] z-30 left-[15px] top-[15px] text-[#FF1645] bg-[#FFE7EC] ">{item.blogCategoryDetails?.name}</div>

                                        <Image
                                            fill
                                            alt={item.blogTitle}
                                            src={item.image?.secure_url || ''}
                                            className="rounded-md"
                                        />
                                    </div>

                                    {item?.date && <p className='text-[#767676]   text-[12px] font-medium font-poppins mt-[13.5px]'>Date Published : {formatDate(item?.date)}</p>
                                            }
                                    <h4 onClick={() => router.push(`/blog/${item.slug}`)} className='mt-[8.25px] font-poppins font-medium text-[14.25px] text-black line-clamp-2 text-ellipsis'>{item.blogTitle}</h4>

                                
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





            </section>




            <Footer />
        </main>
    )
}

export default Blogs