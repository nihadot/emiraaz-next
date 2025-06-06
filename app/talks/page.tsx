'use client'
import Container from '@/components/atom/Container/Container';
import { Footer } from '@/components/Footer'
import Header from '@/components/Header'
import Pagination from '@/components/Pagination/Pagination';
import { useFetchAllVideoQuery } from '@/redux/talks/talksApi';
import { VideoItem } from '@/redux/talks/types';
import React, { useEffect, useMemo, useState } from 'react'
import { FaPlay } from "react-icons/fa";
/* eslint-disable @next/next/no-img-element */
function Talk() {

    const [filters, setFilters] = useState({
        page: 1,
        search: "",
    });
    const [debouncedSearch, setDebouncedSearch] = useState("");

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(filters.search);
            setFilters(prev => ({ ...prev, page: 1 }));
        }, 500);

        return () => clearTimeout(handler);
    }, [filters.search]);

    const queryParams = useMemo(() => ({
        limit: 20,
        page: filters.page,
        search: debouncedSearch,
    }), [filters, debouncedSearch]);

    const { data: videoData } = useFetchAllVideoQuery(queryParams);
    const totalPages = videoData?.pagination?.totalPages || 1;

    // const totalPages = allCities?.pagination?.totalPages || 1;

    return (
        <main>
            <Header />


      <div className="">
        <div className="h-[1px] w-full bg-[#DEDEDE]"></div>
      </div>
            <Container>

                <div className="gap-[31px] mt-4 grid-cols-1 grid sm:grid-cols-2 md:grid-cols-3">


                    {
                        videoData && videoData.data && videoData.data.map((item, index) => {
                            return (
                                <div key={index}>
                                    <Card
                                        item={item}
                                    />
                                </div>
                            )
                        })
                    }




                    {
                        videoData && videoData.data && videoData.data.map((item, index) => {
                            return (
                                <div key={index}>
                                    <Card
                                        item={item}
                                    />
                                </div>
                            )
                        })
                    }




                    {
                        videoData && videoData.data && videoData.data.map((item, index) => {
                            return (
                                <div key={index}>
                                    <Card
                                        item={item}
                                    />
                                </div>
                            )
                        })
                    }





                    {
                        videoData && videoData.data && videoData.data.map((item, index) => {
                            return (
                                <div key={index}>
                                    <Card
                                        item={item}
                                    />
                                </div>
                            )
                        })
                    }



                    {
                        videoData && videoData.data && videoData.data.map((item, index) => {
                            return (
                                <div key={index}>
                                    <Card
                                        item={item}
                                    />
                                </div>
                            )
                        })
                    }



                    {
                        videoData && videoData.data && videoData.data.map((item, index) => {
                            return (
                                <div key={index}>
                                    <Card
                                        item={item}
                                    />
                                </div>
                            )
                        })
                    }



                    {
                        videoData && videoData.data && videoData.data.map((item, index) => {
                            return (
                                <div key={index}>
                                    <Card
                                        item={item}
                                    />
                                </div>
                            )
                        })
                    }



                    {
                        videoData && videoData.data && videoData.data.map((item, index) => {
                            return (
                                <div key={index}>
                                    <Card
                                        item={item}
                                    />
                                </div>
                            )
                        })
                    }


                    {
                        videoData && videoData.data && videoData.data.map((item, index) => {
                            return (
                                <div key={index}>
                                    <Card
                                        item={item}
                                    />
                                </div>
                            )
                        })
                    }

                </div>

                <Pagination
                    currentPage={filters.page}
                    totalPages={totalPages}
                    onPageChange={(newPage) => setFilters(prev => ({ ...prev, page: newPage }))}
                />
            </Container>

            <Footer />
        </main>
    )
}

export default Talk



type CardProps = {
    item: VideoItem;
}


function Card({ item }: CardProps) {
    return (
        <div className='border-[#DEDEDE] relative overflow-hidden h-[274px] rounded-[3px] border'>
        
        {item?.thumbnail && (
            <div className="h-[208.5px] relative">

          <img
            src={item.thumbnail?.secure_url}
            className='h-full rounded-[3.5px] object-cover w-full'
            alt=""
          />
          <div className="absolute bg-white w-fit px-3 py-2 rounded top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 text-[#FF1645] text-[24px] cursor-pointer">

        <FaPlay color='black' size={20} />
          </div>

            </div>

        )}
      
        <h3 className='text-[18px] px-[14px] pt-1 font-poppins font-medium'>
          {item.videoTitle}
        </h3>
      </div>
      
    )
}