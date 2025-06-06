import { useFetchAllCitiesQuery } from '@/redux/cities/citiesApi';
import { useFetchAllEmirateNamesQuery } from '@/redux/emirates/emiratesApi';
import { useDeviceType } from '@/utils/useDeviceType';
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import Header from '../Header';
import Container from '../atom/Container/Container';
import SearchInput from '../SearchField/Search';
import { SelectOption } from '../SelectOption';
import SpaceWrapper from '../atom/SpaceWrapper/SpaceWrapper';
import PaginationNew from '../PaginationNew/PaginationNew';
import { Footer } from '../Footer';
import { CityItem } from '@/redux/cities/types';
import Image from 'next/image';
import { citiesBackIcon } from '@/app/assets';



function City() {

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
            count: 100,
        })) || [],
        [emiratesData]);



    const deviceType = useDeviceType();



    return (
        <main>

            <Header />
            <div className="w-full lg:overflow-visible font-[family-name:var(--font-geist-sans)]">

                <Container>


                    <section className="flex-wrap w-full flex items-center  gap-2">
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




                    <section className='h-full pb-20 grid-cols-1 w-full gap-3 grid lg:grid-cols-4' >

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
                    className='py-10'
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

export default City






type CardProps = {
    item: CityItem;
}

function Card({ item }: CardProps) {
    return (
        <div className='border border-[#DEDEDE] flex-1 font-poppins h-[240px] w-full p-[13px] rounded-md'>
            <div className="flex gap-0 w-full items-center">

                <div className="flex relative flex-col w-full  gap-1">
                    {item?.image && item?.name ?
                        <div className="w-full h-[124.5px] relative" >
                            <Image
                                src={item.image.secure_url}
                                alt={item.name}
                                fill
                                className='w-full object-cover rounded h-[124.5px]'

                            />
                        </div>
                        : <div className="w-full rounded h-[124.5px] bg-slate-50" />
                    }




                    <p className='text-[18px]  capitalize font-medium font-poppins'>{item.name}</p>
                    <div className="flex flex-wrap gap-2 ">

                    <p className='font-poppins px-2 w-fit py-1 rounded text-[9px] font-medium border border-[#DEDEDE]'>Offplan Projects - 10 </p>
                    <p className='font-poppins px-2 w-fit py-1 rounded text-[9px] font-medium border border-[#DEDEDE]'>Resale - 10  </p>
                    <p className='font-poppins px-2 w-fit py-1 rounded text-[9px] font-medium border border-[#DEDEDE]'>Offplan Resale - 10  </p>
                    <p className='font-poppins px-2 w-fit py-1 rounded text-[9px] font-medium border border-[#DEDEDE]'>Land - 10  </p>
                    </div>

                    <div className="absolute right-0 bottom-0">
                        <Image
                        src={citiesBackIcon}
                        alt="back icon"
                        width={20}
                        height={20}
                        className="object-cover"
                        />
                    </div>

                </div>

            </div>

        </div>
    )
}