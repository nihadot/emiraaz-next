'use client'
import { useFetchAllCitiesQuery } from '@/redux/cities/citiesApi';
import { useFetchAllEmirateNamesQuery } from '@/redux/emirates/emiratesApi';
import { useDeviceType } from '@/utils/useDeviceType';
import React, { Suspense, useCallback, useEffect, useMemo, useState } from 'react'
import Header from '../Header';
import Container from '../atom/Container/Container';
import SpaceWrapper from '../atom/SpaceWrapper/SpaceWrapper';
import PaginationNew from '../PaginationNew/PaginationNew';
import { Footer } from '../Footer';
import {  CityItemWithCount } from '@/redux/cities/types';
import Image from 'next/image';
import { citiesBackIcon } from '@/app/assets';
import SelectLatest from '../SelectOption/SelectLatest';
import Link from 'next/link';
import SectionDivider from '../atom/SectionDivider/SectionDivider';
import clsx from 'clsx';
import SearchNew from '../SearchField/SearchNew';
import MobileHeaderTitle from '../atom/typography/MobileHeaderTitle';


function CityComponent() {

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
        limit: 20,
        page: filters.page,
        search: debouncedSearch,
        emirate: filters.emirate,
    }), [filters, debouncedSearch]);


    const { data: emiratesData } = useFetchAllEmirateNamesQuery();
    const { data: allCities } = useFetchAllCitiesQuery(queryParams);

    const totalPages = allCities?.pagination?.totalPages || 1;

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



    const deviceType = useDeviceType();



    return (
        <main>

            <Header     logoSection={
                           <div className='h-full w-full flex justify-center items-center'>
                             <MobileHeaderTitle
                            content='Cities'
                            />
                           </div>
                        }/>
            <div className="w-full lg:overflow-visible font-[family-name:var(--font-geist-sans)]">

                <Container>


                    <section className="flex-wrap w-full flex items-center gap-1 sm:gap-2">
                        <div className="sm:flex-[18%] w-full h-[40px]  md:h-[50px]">
                            <SearchNew
                                value={filters.search}
                                onChange={handleChangeSearch}
                                placeholder="Search..."
                            />
                        </div>
                        <div className=" md:flex-[30%] h-full">

                        </div>
                      

                        <div className=" h-[40px] w-full flex sm:hidden gap-2">
                            <SelectLatest
                                listContainerUlListContainerClassName="w-[200px]"
                                search
                                label="Emirates"
                                options={emirateOptions}
                                onSelect={(e) => {
                                  handleSelect.emirate(e)
                                }}
                            />
                        </div>


                        <div className="sm:flex-[10%] sm:block hidden w-full h-[50px]">
                            <SelectLatest
                                listContainerUlListContainerClassName="w-[200px]"
                                label="Emirates"
                                options={emirateOptions}
                                onSelect={(e) => {
                                        handleSelect.emirate(e)
                                }}
                            />
                        </div>





                    </section>
                </Container>

       <SectionDivider
                        containerClassName={clsx("mb-[12px] mt-[12px]")}
                        lineClassName="h-[1px] w-full bg-[#DEDEDE]"
                    />

                <Container>




                    <section className='h-full sm:pb-5 grid-cols-1 w-full gap-3 grid lg:grid-cols-4' >

                        {
                            allCities && allCities.data && allCities.data.map((item, index) => {
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



                <SpaceWrapper
                    className='pb-6 sm:pb-10'
                >

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

// export default City


export default function City() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CityComponent />
    </Suspense>
  );
}




type CardProps = {
    item: CityItemWithCount;
}

function Card({ item }: CardProps) {

    let offPlanProjectsCount = 0;
    let resaleProjectsCount = 0;
    let landProjectsCount = 0;
    let secondaryProjectsCount = 0;

    if (item && item.projectTypeCounts && typeof item.projectTypeCounts === 'object') {
        const counts = item.projectTypeCounts;

        offPlanProjectsCount =
            (counts['Project-commercial'] ?? 0) + (counts['Project-residential'] ?? 0) + (counts['Commercial-residential'] ?? 0);

        resaleProjectsCount =
            (counts['Resale-commercial'] ?? 0) + (counts['Resale-residential'] ?? 0);

        landProjectsCount =
            (counts['Land-commercial'] ?? 0) + (counts['Land-residential'] ?? 0);

        secondaryProjectsCount =
            (counts['Secondary-commercial'] ?? 0) + (counts['Secondary-residential'] ?? 0);
    }

    return (
        <div className='border border-[#DEDEDE] flex-1 font-poppins h-[240px] w-full p-[13px] rounded-md'>
            <div className="flex gap-0 w-full items-center">

                <div className="flex relative flex-col w-full  gap-1">
                    {item?.image && item?.name ?
                        <div className="w-full h-[124.5px] relative" >
                            <Image
                                src={item.image.webp?.url}
                                alt={item.name}
                                fill
                                className='w-full object-cover rounded h-[124.5px]'

                            />
                        </div>
                        : <div className="w-full rounded h-[124.5px] bg-slate-50" />
                    }




                    <p className='text-[18px]  capitalize font-medium font-poppins'>{item.name}</p>
                    <div className="flex flex-wrap gap-2 ">

                        <p className='font-poppins px-2 w-fit py-1 rounded text-[9px] font-medium border border-[#DEDEDE]'>Offplan Projects - {offPlanProjectsCount}</p>
                        <p className='font-poppins px-2 w-fit py-1 rounded text-[9px] font-medium border border-[#DEDEDE]'>Offplan Resale - {resaleProjectsCount}  </p>
                        <p className='font-poppins px-2 w-fit py-1 rounded text-[9px] font-medium border border-[#DEDEDE]'>Secondary Properties - {secondaryProjectsCount}  </p>
                        <p className='font-poppins px-2 w-fit py-1 rounded text-[9px] font-medium border border-[#DEDEDE]'>Land - {landProjectsCount}  </p>
                    </div>

<Link
href={`/cities/${item.slug}`}
>
                    <div className="absolute right-0 bottom-0">
                        <Image
                            src={citiesBackIcon}
                            alt="back icon"
                            width={20}
                            height={20}
                            className="object-cover"
                            />
                    </div>
                            </Link>

                </div>

            </div>

        </div>
    )
}