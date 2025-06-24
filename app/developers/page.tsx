'use client'
import { Footer } from '@/components/Footer'
import Header from '@/components/Header'
import SearchInput from '@/components/SearchField/Search'
import { SelectOption } from '@/components/SelectOption'
import { useFetchAllEmirateNamesQuery } from '@/redux/emirates/emiratesApi'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useViewAllDevelopersQuery } from '@/redux/developers/developersApi'
import { AllDevelopersItems } from '@/redux/developers/types'
import Image from 'next/image'
import { top_arrow_icon } from '../assets'
import Container from '@/components/atom/Container/Container'
import PaginationNew from "@/components/PaginationNew/PaginationNew";
import { useDeviceType } from '@/utils/useDeviceType'
import SpaceWrapper from '@/components/atom/SpaceWrapper/SpaceWrapper'
import { RxArrowTopRight } from "react-icons/rx";
import SelectLatest from '@/components/SelectOption/SelectLatest'
import Link from 'next/link'
import SearchNew from '@/components/SearchField/SearchNew'
import SectionDivider from '@/components/atom/SectionDivider/SectionDivider'
import clsx from 'clsx'


function Developers() {

    const deviceType = useDeviceType();

    // Debounce search input

    // Consolidated filter state
    const [filters, setFilters] = useState({
        page: 1,
        search: "",
        cities: [],
        developers: [],
        facilities: [],
        propertyType: "",
        propertyTypeSecond: undefined,
        emirate: "",
        completionType: "",
        handoverDate: undefined as { year: number | '', quarter: string | '' } | undefined,
        projectType: '',
        paymentPlan: undefined as { label?: string, value?: string } | undefined,
        furnishType: "",
        discount: "",
        bedAndBath: "",
        minPrice: null,
        minSqft: "",
        maxSqft: "",
        maxPrice: null,
        beds: '',
        bath: '',
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
        limit: 21,
        page: filters.page,
        search: debouncedSearch,
        emirate: filters.emirate,
    }), [filters, debouncedSearch]);


    const { data: emiratesData } = useFetchAllEmirateNamesQuery();
    const { data: allDevelopers } = useViewAllDevelopersQuery(queryParams);

    const totalPages = allDevelopers?.pagination?.totalPages || 1;

    const handleSelect = useMemo(() => ({
        emirate: (option: any) => setFilters(prev => ({ ...prev, emirate: option?.label || '' })),
    }), []);


    // Event Handlers
    const handleChangeSearch = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setFilters(prev => ({ ...prev, search: event.target.value }));
    }, []);

    const emirateOptions = useMemo(() =>
        emiratesData?.data.map((item) => ({
            label: item.name,
            value: item._id,
        })) || [],
        [emiratesData]);



    return (

        <main>

            <div className=" w-full lg:overflow-visible font-[family-name:var(--font-geist-sans)]">
                <Header />



                <Container>
                    <section className=" flex-wrap w-full flex items-center gap-1 sm:gap-2">
                        <div className="sm:flex-[18%] w-full max-w-[400px]  h-[50px]">
                            <SearchNew
                                value={filters.search}
                                onChange={handleChangeSearch}
                                placeholder="Search..."
                            />
                        </div>
                        <div className=" md:flex-[30%] h-full">

                        </div>
                        <div className="hidden max-w-[250px] w-full lg:flex h-[48px]">
                            <SelectLatest
                                listContainerUlListContainerClassName="w-[200px]"
                                search
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



                        <div className="flex lg:hidden w-full gap-2">

                            <div className=" h-[40px] w-full">
                                <SelectLatest
                                    listContainerUlListContainerClassName="w-[200px]"
                                    search
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



                        </div>





                    </section>
                </Container>

              <SectionDivider
                                  containerClassName={clsx("mb-[12px] mt-[12px]")}
                                  lineClassName="h-[1px] w-full bg-[#DEDEDE]"
                              />
          
                <Container>

                    <section className='h-full pb-0 grid-cols-1 w-full  gap-3 grid lg:grid-cols-3' >

                        {
                            allDevelopers && allDevelopers.data && allDevelopers.data.map((item, index) => {
                                return (
                                    <Card
                                        key={index}
                                        item={item}
                                    />
                                )
                            })
                        }
                    </section>
                </Container>

      
                <SpaceWrapper className='mb-10'>

                    <PaginationNew
                        currentPage={filters.page || 1}
                        totalPages={totalPages}
                        onPageChange={(newPage) => setFilters(prev => ({ ...prev, page: newPage }))}
                        maxVisiblePages={deviceType === 'mobile' ? 6 : 8} />

                </SpaceWrapper>

            </div>



            <Footer />
        </main>
    )
}

export default Developers


type CardProps = {
    item: AllDevelopersItems;
}

function Card({ item }: CardProps) {
    return (
        <div className='border flex-1 font-poppins h-[115px] w-full  flex justify-center items-center rounded-[3px] border-[#DEDEDE] p-0'>
            <div className="flex ms-3 gap-2 w-full items-center ">
                <div className="flex overflow-hidden justify-center items-center border px-3 py-1 w-[100px] h-[80px] border-[#DEDEDE] rounded-[3px] ">
                    <Image src={item?.image?.secure_url || ''} alt="bed icon" width={100} height={80} className="object-cover flex justify-center items-center" />
                </div>
                <div className="flex w-full items-center justify-between pe-4 gap-2">

                    <p className='text-[18px] line-clamp-2 font-medium font-poppins'>{item.name}</p>
                    {/* <Image src={top_arrow_icon || ''} alt="bed icon" width={12} height={12} className="object-contain flex justify-center items-center" /> */}
                  <Link
                  href={`/developers/${item.slug}`}
                  >
                    <div className="w-4 h-4  ">
                        <RxArrowTopRight size={20} color='black' />
                    </div>
                  </Link>
                </div>

            </div>

        </div>
    )
}