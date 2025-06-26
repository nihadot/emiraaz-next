'use client'
import { formatDate } from '@/components/atom/button/formatDate';
import { Footer } from '@/components/Footer'
import Header from '@/components/Header'
import Image from 'next/image';
import React, { useMemo, useState } from 'react'
import Pagination from '@/components/Pagination/Pagination';
import { useViewAllBlogsQuery } from '@/redux/blogs/blogsApi';
import Container from '@/components/atom/Container/Container';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import SectionDivider from '../atom/SectionDivider/SectionDivider';
import MobileHeaderTitle from '../atom/typography/MobileHeaderTitle';
import clsx from 'clsx';



type FiltersState = {

    page?: number,
    limit?: number,
    search?: string,
};

function Blog({ initialData }: { initialData: any }) {

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


    const { data: blogsData } = useViewAllBlogsQuery({ ...queryParams }, {
        skip: false,
        // @ts-expect-error — We know this line might throw a TS error due to initialData
        initialData,
    });

    const data = blogsData?.data || [];

    const router = useRouter();
    const totalPages = blogsData?.pagination?.totalPages || 1;

    return (
        <main>
            <Header  logoSection={
                           <div className='h-full w-full flex justify-center items-center'>
                             <MobileHeaderTitle
                            content='Blogs'
                            />
                           </div>
                        }  />
                <SectionDivider
                containerClassName={clsx("mb-[12px] mt-[12px]")}
                lineClassName="h-[1px] w-full bg-[#DEDEDE]"
            />
            <Container>

                <h3 className='text-[26px] sm:text-[37.5px] text-center py-[32px] font-medium font-poppins text-[#FF1645]'>Learn, Discover, Invest.</h3>

                <section className='m-auto gap-[30px] pb-20 flex items-start '>
                    <div className="w-full">
                        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-[12px] sm:gap-[30px]">

                            {data && data?.length > 0 ? data?.map((item, index) => {
                                return (
                                    <div className="" key={index}>
                                        <div key={index} className="relative w-full h-[208.5px] object-cover">
                                            <div className="px-4 py-1 font-poppins font-medium rounded-[3px] absolute text-[10.5px] sm:text-[13.5px] z-30 left-[15px] top-[15px] text-[#FF1645] bg-[#FFE7EC] ">{item.blogCategoryDetails?.name}</div>

                                            <Image
                                                fill
                                                alt={item.blogTitle}
                                                src={item.image?.secure_url || ''}
                                                className="rounded-[5px] cursor-text"
                                            />
                                        </div>

                                        {item?.date && <p className='text-[#767676] text-[12px] font-medium font-poppins mt-[13.5px]'>Date Published : {formatDate(item?.date)}</p>
                                        }
                                        <Link
                                            href={`/blog/${item.slug}`}
                                        >
                                            <h4 className='mt-[8.25px] font-poppins font-medium text-[17px] text-black line-clamp-2 text-ellipsis'>{item.blogTitle}</h4>
                                        </Link>


                                    </div>


                                )
                            }) :
                                Array.from({ length: 9 }).map((_, index) => (
                                    <div className="" key={index}>
                                        <div key={index} className="bg-slate-50 mb-1 animate-pulse w-full h-[208.5px] object-cover" />

                                        <div className='bg-slate-50  mb-1 w-full h-[30px]' />

                                        <div className='h-[30px] bg-slate-50 w-full' />


                                    </div>
                                ))
                            }

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

            </Container>



            <Footer />
        </main>
    )
}

export default Blog