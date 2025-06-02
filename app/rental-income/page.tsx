'use client'
import { Footer } from '@/components/Footer'
import Header from '@/components/Header'
import SearchInput from '@/components/SearchField/Search'
import { SelectOption } from '@/components/SelectOption'
import { useFetchAllCityNamesQuery } from '@/redux/cities/citiesApi'
import { useFetchAllEmirateNamesQuery } from '@/redux/emirates/emiratesApi'
import { useViewAllRentalIncomesQuery } from '@/redux/rentalIncome/rentalIncomeApi'
import { AllRentalIncomeItems } from '@/redux/rentalIncome/types'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import CustomSliderUi from '../home/CustomSliderUi'
import { shuffle } from '@/utils/shuffle'
import { useFetchAllPortraitBannersQuery } from '@/redux/portraitBannerAd/portraitBannerAdApi'
import Container from '@/components/atom/Container/Container'
import RecommendedText from '@/components/RecomendedText/RecommendedText'


function RentalHome() {


    // Debounce search input

    // Consolidated filter state
    const [filters, setFilters] = useState<{
        page: number;
        search: string;
        cities: string[];            // ✅ allows updating
        propertyType: string;
        emirate: string;

    }>({
        page: 1,
        search: "",
        cities: [],
        propertyType: "",
        emirate: "",
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
        cities: filters.cities,
    }), [filters, debouncedSearch]);


    const { data: emiratesData } = useFetchAllEmirateNamesQuery();
    const { data: cities } = useFetchAllCityNamesQuery({ emirate: filters.emirate });
    const { data: allRentalIncome } = useViewAllRentalIncomesQuery(queryParams);


    const handleSelect = useMemo(() => ({
        emirate: (option: any) => setFilters(prev => ({ ...prev, emirate: option?.value || '' })),
        propertyType: (option: any) => setFilters(prev => ({ ...prev, propertyType: option?.value || '' })),
        propertyTypeSecond: (option: any) => setFilters(prev => ({ ...prev, propertyTypeSecond: option })),
        completionType: (option: any) => setFilters(prev => ({ ...prev, completionType: option })),
        handoverDate: (data: any) => setFilters(prev => ({ ...prev, handoverDate: data })),
        projectType: (option: any) => setFilters(prev => ({ ...prev, projectType: option })),
        paymentPlan: (option: any) => setFilters(prev => ({ ...prev, paymentPlan: option })),
        furnishType: (option: any) => setFilters(prev => ({ ...prev, furnishType: option?.value || '' })),
        discount: (option: any) => setFilters(prev => ({ ...prev, discount: option?.value || '' })),
        bedAndBath: (option: any) => setFilters(prev => ({ ...prev, bedAndBath: option?.value || '' })),
        maxPrice: (option: any) => setFilters(prev => ({ ...prev, maxPrice: option || '' })),
        minSqft: (option: any) => setFilters(prev => ({ ...prev, minSqft: option || '' })),
        maxSqft: (option: any) => setFilters(prev => ({ ...prev, maxSqft: option || '' })),
        minPrice: (option: any) => setFilters(prev => ({ ...prev, minPrice: option || '' })),
        beds: (option: any) => setFilters(prev => ({ ...prev, beds: option || '' })),
        bath: (option: any) => setFilters(prev => ({ ...prev, bath: option || '' })),
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

    const cityOptions = useMemo(() =>
        cities?.data.map((item) => ({
            label: item.name,
            value: item.name,
            count: item.count,
        })) || [],
        [cities]);

    const handleChangeCities = useCallback((option: any) => {
        setFilters(prev => ({ ...prev, cities: [option?.value || ''] }));
    }, []);

    const { data: portraitBannerData } = useFetchAllPortraitBannersQuery({});

    const banners = portraitBannerData?.data || [];

    const shuffledImages = useMemo(() => shuffle(banners), []);

    return (

        <main>

            <div className=" pb-10 w-full lg:overflow-visible font-[family-name:var(--font-geist-sans)]">
                <Header />

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
                                className="w-[200px]"
                                label="Emirates"
                                options={emirateOptions}
                                onSelect={handleSelect.emirate}
                            />
                        </div>

                        <div className="w-full h-full flex sm:hidden gap-2">
                            <SelectOption
                                search
                                className="w-[200px]"
                                label="Emirates"
                                options={emirateOptions}
                                onSelect={handleSelect.emirate}
                            />
                            <SelectOption
                                search
                                className="w-[220px]"
                                label="Cities"
                                options={cityOptions}
                                onSelect={handleChangeCities}
                            />
                        </div>

                        <div className="sm:flex-[10%]  w-full h-[50px]">
                            <SelectOption
                                search
                                className="w-[220px]"
                                label="Cities"
                                options={cityOptions}
                                onSelect={handleChangeCities}
                            />
                        </div>
                    </section>
                </Container>

                <div className="w-full h-[1px] bg-gray-200 my-4"></div>
                <Container>

                    <div className="flex gap-4 grid-cols-1">

                        <section className='h-full w-full gap-3 grid grid-cols-1' >

                            {
                                allRentalIncome && allRentalIncome.data && allRentalIncome.data.map((item, index) => {
                                    return (
                                        <div key={index} className='w-full grid grid-cols-1 md:grid-cols-3 h-full gap-3'>


                                            <Card item={item} title={'Town Houses'} name={'townhouse'} />
                                            <Card item={item} title={'Villa'} name={'villa'} />
                                            <Card item={item} title='Apartment' name={'apartment'} />



                                        </div>
                                    )
                                })
                            }
                        </section>


                        <div className="w-full min-1110px:block hidden ps-2 max-w-[301.5px]">
                            <RecommendedText
                                title="Recommended For You"
                                items={[
                                    'Studio Properties For Sale in Dubai',
                                    '1 BHK Flats in Downtown',
                                    'Luxury Villas in Palm Jumeirah',
                                    'Affordable Apartments in JVC',
                                    'Beachfront Homes in Dubai Marina',
                                ]}
                            />

                            <div className="sticky top-3 left-0">

                                <CustomSliderUi
                                    shuffledImages={shuffledImages}
                                />
                            </div>

                        </div>
                    </div>
                </Container>

            </div>



            <Footer />
        </main>
    )
}

export default RentalHome


type CardProps = {
    item: AllRentalIncomeItems;
    title: string;
    name: string;
}

function Card({ item, title, name }: CardProps) {
    return (
        <div className='border flex-1 font-poppins h-[180px] w-full  rounded-md border-[#DEDEDE] p-[17px]'>
            <div className="flex w-full items-center">
                <p className='text-[17px] mr-[4px] font-medium font-poppins text-nowrap line-clamp-1'>{title}</p>
                <div className="border   flex justify-center text-black/40 h-[20px] items-center text-[11px] gap-1 p-1 px-2 border-black/20 rounded-md">
                    <p className='capitalize text-nowrap line-clamp-1 '>{item.cityDetails.name}</p>
                    <div className="w-[1px] h-[12px] bg-black/40"></div>
                    <p className='capitalize line-clamp-1'>{item.emirateDetails.name}</p>
                </div>
            </div>
            {name === 'townhouse' && <div className="text-[13.5px] font-poppins font-medium pt-[5px] gap-1 flex flex-col">
                <p>3 bedroom {item.townHouseFiveBedroom} AED/yearly</p>
                <p>4 bedroom {item.townHouseFourBedroom} AED/yearly</p>
                <p>5 bedroom {item.townHouseThreeBedroom} AED/yearly</p>
            </div>}

            {name === 'villa' && <div className="text-[13.5px] font-poppins font-medium  pt-[5px] gap-1 flex flex-col">
                <p>4 bedroom {item.villaFourBedroom} AED/yearly</p>
                <p>5 bedroom {item.villaFiveBedroom} AED/yearly</p>
                <p>6 bedroom {item.villaSixBedroom} AED/yearly</p>
                <p>7 bedroom {item.villaSevenBedroom} AED/yearly</p>
            </div>}


            {name === 'apartment' && <div className="text-[13.5px] font-poppins font-medium pt-[5px] gap-1 flex flex-col">
                <p>2 bedroom {item.apartment2Bedroom} AED/yearly</p>
                <p>3 bedroom {item.apartment3Bedroom} AED/yearly</p>
                <p>4 bedroom {item.apartment4Bedroom} AED/yearly</p>
                <p>5 bedroom {item.apartment5Bedroom} AED/yearly</p>
            </div>}
        </div>
    )
}