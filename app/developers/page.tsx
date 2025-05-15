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
        limit: 20,
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
            count: 100,
        })) || [],
        [emiratesData]);



    return (

        <main>

            <div className=" w-full lg:overflow-visible font-[family-name:var(--font-geist-sans)]">
                <Header />



        <Container>
        <section className=" flex-wrap w-full flex items-center  gap-2">
                    <div className="sm:flex-[18%] w-full  h-[50px]">
                        <SearchInput
                            value={filters.search}
                            onChange={handleChangeSearch}
                            placeholder="Search..."
                        />
                    </div>
                    <div className=" md:flex-[30%] h-full">

                    </div>
                    <div className="sm:flex-[10%] sm:block hidden w-full h-[50px]">
                        <SelectOption
                            search
                            // clearSelection={clear}
                            className="w-[200px]"
                            label="Emirates"
                            options={emirateOptions}
                            onSelect={handleSelect.emirate}
                        />
                    </div>

                    <div className="w-full h-full flex sm:hidden gap-2">
                        <SelectOption
                            search
                            // clearSelection={clear}
                            className="w-[200px]"
                            label="Emirates"
                            options={emirateOptions}
                            onSelect={handleSelect.emirate}
                        />

                    </div>







                </section>
        </Container>

                <div className="w-full h-[1px] bg-gray-200 my-4"></div>

<Container>

<section className='h-full pb-20 grid-cols-1 w-full  gap-3 grid lg:grid-cols-3' >

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

{/* 

                <Pagination
                    currentPage={filters.page}
                    totalPages={totalPages}
                    onPageChange={(newPage) => setFilters(prev => ({ ...prev, page: newPage }))}
                /> */}

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
        <div className='border flex-1 font-poppins h-[100px] w-full  rounded-md border-black/20 p-4'>
            <div className="flex gap-2 w-full items-center">
                <div className="flex overflow-hidden justify-center items-center w-[70px] border-[#DEDEDE] rounded-md h-[60px] gap-2 ">
                    <Image src={item?.image?.secure_url || ''} alt="bed icon" width={100} height={100} className="object-cover flex justify-center items-center" />
                </div>
                <div className="flex w-full  gap-2">

                    <p className='text-[18px] font-medium font-poppins'>{item.name}</p>
                    <Image src={top_arrow_icon || ''} alt="bed icon" width={12} height={12} className="object-contain flex justify-center items-center" />

                </div>

            </div>

        </div>
    )
}