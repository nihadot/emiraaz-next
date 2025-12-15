'use client'
import { useFetchAllCityNamesQuery } from '@/redux/cities/citiesApi';
import { useViewAllRentalIncomesQuery, ViewRentalIncomeResponse } from '@/redux/rentalIncome/rentalIncomeApi';
import { shuffle } from '@/utils/shuffle';
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import Header from '../Header';
import Container from '../atom/Container/Container';
import CustomSliderUi from '@/app/home/CustomSliderUi';
import { Footer } from '../Footer';
import SearchNew from '../SearchField/SearchNew';
import SelectLatest from '../SelectOption/SelectLatest';
import SectionDivider from '../atom/SectionDivider/SectionDivider';
import clsx from 'clsx';
import MobileHeaderTitle from '../atom/typography/MobileHeaderTitle';
import PaginationNew from '../PaginationNew/PaginationNew';
import { useDeviceType } from '@/utils/useDeviceType';
import { PortraitBanner } from '@/redux/portraitBannerAd/types';
import { EmirateNames } from '@/redux/emirates/types';
import { CityNames } from '@/redux/cities/types';
import NoDataFound from '../Empty/NoDataFound';
import { useRouter } from 'next/navigation';

function RentalIncome({ portraitBanners, dataFetchRentalIncome, emirates, citiesValue }: { portraitBanners: PortraitBanner[], dataFetchRentalIncome: ViewRentalIncomeResponse, emirates: EmirateNames[], citiesValue: CityNames[] }) {

    const router = useRouter();

    // Consolidated filter state
    const [filters, setFilters] = useState<{
        page: number;
        search: string;
        cities: string[];
        propertyType: string;
        emirate: {
            slug: string,
            id: string
        };

    }>({
        page: 1,
        search: "",
        cities: [],
        propertyType: "",
        emirate: {
            slug: "",
            id: "",
        },
    });
    const [paginationHappened, setPaginationHappened] = useState(false)

    const [debouncedSearch, setDebouncedSearch] = useState("");

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(filters.search);
            setFilters(prev => ({ ...prev, page: 1 }));
        }, 500);

        return () => clearTimeout(handler);
    }, [filters.search]);

    const queryParams = useMemo(() => ({
        limit: 14,
        page: filters.page,
        search: debouncedSearch,
        cities: filters.cities,
        emirate: filters.emirate?.slug,
    }), [filters, debouncedSearch]);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const page = urlParams.get('page');

        if (page) {
            setFilters(prev => ({ ...prev, page: parseInt(page) }))
        }
    }, [filters.page]);


    const { data: citiesResponse } = useFetchAllCityNamesQuery({ emirate: filters?.emirate?.id || '' });
    const { data: allRentalIncome } = useViewAllRentalIncomesQuery(queryParams);

    const handleSelect = useMemo(() => ({
        emirate: (option: any) => setFilters(prev => ({
            ...prev, emirate: {
                id: option?.value,
                slug: option?.slug
            }
        })),

    }), []);

    // Event Handlers
    const handleChangeSearch = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setFilters(prev => ({ ...prev, search: event.target.value }));
    }, []);

    const cities = citiesResponse?.data || citiesValue;

    const emirateOptions = useMemo(() => {
        const preferredOrder = ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ras Al Khaimah', 'Ajman', 'Umm Al-Quwain'];

        const mappedOptions = emirates.map((item) => ({
            label: item.name,
            value: item._id,
            // count: item.count,
            slug: item.slug,
        })) || [];

        const sortedOptions = mappedOptions.sort((a, b) => {
            const aIndex = preferredOrder.indexOf(a.label);
            const bIndex = preferredOrder.indexOf(b.label);

            // If both labels are in the preferredOrder list
            if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;

            // If only one is in the list, put it before the other
            if (aIndex !== -1) return -1;
            if (bIndex !== -1) return 1;

            // If neither is in the list, sort alphabetically (optional)
            return a.label.localeCompare(b.label);
        });

        return [
            { label: "All", value: "all" }, // Always first
            ...sortedOptions,
        ];
    }, [emirates]);

    const cityOptions = useMemo(() => {
        const mappedOptions = cities.map((item) => ({
            label: item.name,
            value: item.name,
            slug: item.slug,
        })) || [];

        return [
            { label: "All", value: "all", slug: '' },
            ...mappedOptions,
        ];
    }, [cities]);

    const handleChangeCities = useCallback((option: any[]) => {
        // console.log(option, 'option')
        if (option.length === 0) {
            setFilters(prev => ({ ...prev, cities: [] }));
            return;
        }
        setFilters(prev => ({ ...prev, cities: option.map((item: { slug: any; }) => item.slug) }));
    }, []);

    const data = allRentalIncome?.data || dataFetchRentalIncome.data;

    const banners = portraitBanners || [];

    const shuffledImages = useMemo(() => shuffle(banners), [banners]);
    const [defaultEmirate, setDefaultEmirate] = useState<string>('');
    const [defaultCities, setDefaultCities] = useState<any>('');

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });

    }, [paginationHappened]);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const emirate = urlParams.get('emirate');
        const cities = urlParams.get('cities');
        const toConvertedCitiesParams = cities?.split(',')




        if (emirate) {
            setDefaultEmirate(emirate)
        }

        if (toConvertedCitiesParams) {
            setDefaultCities(toConvertedCitiesParams)
        }



    }, []);

    const totalPages = allRentalIncome?.pagination?.totalPages || dataFetchRentalIncome.pagination.totalPages;
    const deviceType = useDeviceType();

    return (
        <main>

            <div className=" pb-10 w-full lg:overflow-visible font-[family-name:var(--font-geist-sans)]">
                <Header logoSection={
                    <div className='h-full w-full flex justify-center items-center'>
                        <MobileHeaderTitle
                            content='Rental Income'
                        />
                    </div>
                } />

                <Container>
                    <section className="flex-wrap w-full flex items-center  gap-2">
                        <div className="sm:flex-[18%] w-full md:max-w-[400px]  h-[50px]">
                            <SearchNew
                                value={filters.search}
                                onChange={handleChangeSearch}
                                placeholder="Search..."
                            />
                        </div>
                        <div className="flex-1  justify-end flex gap-2">

                            <div className="hidden md:max-w-[180px] w-full md:flex h-[48px]">
                                <SelectLatest
                                    listContainerUlListContainerClassName="w-[200px]"
                                    search
                                    defaultValue={emirateOptions?.find((item: any) => item?.slug === defaultEmirate)}
                                    label="Emirates"
                                    options={emirateOptions}

                                    onSelect={(e) => {
                                        const url = new URL(window.location.href);
                                        if (e?.value) {
                                            url.searchParams.set('emirate', e.slug ?? '');
                                        } else {
                                            url.searchParams.delete('emirate');
                                        }
                                        url.searchParams.delete('page');
                                        const newUrl = `${url.pathname}?${url.searchParams.toString()}`;
                                        window.history.pushState({}, '', newUrl);
                                        handleSelect.emirate(e);
                                    }}
                                />
                            </div>

                            <div className="hidden md:flex max-w-[180px] w-full h-[48px]">
                                <SelectLatest
                                    defaultValueMultiple={cityOptions?.filter((item) => defaultCities?.includes(item.slug))}
                                    search
                                    multiple
                                    onSelectMultiple={(e) => {
                                        const url = new URL(window.location.href);

                                        if (e) {

                                            if (e && e.length > 0) {

                                                url.searchParams.set('cities', e?.map((item) => item.slug).join(','));
                                            } else {
                                                url.searchParams.delete('cities');
                                            }
                                            const newUrl = `${url.pathname}?${url.searchParams.toString()}`;
                                            window.history.pushState({}, '', newUrl);
                                            url.searchParams.delete('page');

                                            handleChangeCities(e);

                                        }


                                    }}
                                    listContainerUlListContainerClassName="w-[220px]"
                                    label="Cities"
                                    options={cityOptions}

                                />
                            </div>
                        </div>


                    </section>


                    <div className="flex md:hidden w-full gap-2">

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
                                    url.searchParams.delete('page');

                                    const newUrl = `${url.pathname}?${url.searchParams.toString()}`;
                                    window.history.pushState({}, '', newUrl);
                                    handleSelect.emirate(e)
                                }}
                            />
                        </div>



                        <div className=" h-[40px] w-full">
                            <SelectLatest

                                defaultValueMultiple={cityOptions?.filter((item) => defaultCities?.includes(item.label))}
                                search
                                multiple
                                onSelectMultiple={(e) => {
                                    const url = new URL(window.location.href);

                                    if (e) {

                                        if (e && e.length > 0) {

                                            url.searchParams.set('cities', e?.map((item) => item.label).join(','));
                                        } else {
                                            url.searchParams.delete('cities');
                                        }
                                        url.searchParams.delete('page');

                                        const newUrl = `${url.pathname}?${url.searchParams.toString()}`;
                                        window.history.pushState({}, '', newUrl);

                                        handleChangeCities(e);

                                    }


                                }}
                                listContainerClassName="w-[220px] sm:!left-0 !-left-14 "
                                label="Cities"
                                options={cityOptions}
                            />
                        </div>




                    </div>

                </Container>


                <SectionDivider
                    containerClassName={clsx("mb-[12px] mt-[12px]")}
                    lineClassName="h-[1px] w-full bg-[#DEDEDE]"
                />


                <Container>

                    <div className="flex gap-2 grid-cols-1">

                        <section className='h-full w-full gap-3 grid grid-cols-1' >



                            {
                                data && data.length === 0 ? <NoDataFound /> : (
                                    data && data.map((item, index) => {
                                        return (
                                            <div key={index} className='w-full grid grid-cols-1 md:grid-cols-3 h-full gap-3'>


                                                <Card item={item} title={'Town Houses'} name={'townhouses'} />
                                                <Card item={item} title={'Villa'} name={'villas'} />
                                                <Card item={item} title='Apartment' name={'apartments'} />



                                            </div>
                                        )
                                    })
                                )
                            }


                        </section>


                        <div className="w-full min-1110px:block  hidden max-w-[301.5px]">
                            <div className="border p-3 rounded-[2px] border-[#DEDEDE] bg-[#F7F7F7] mb-2">
                                <p className='text-[12px] font-poppins font-medium'>Note:</p>
                                <p className='text-[12px] text-black/60 font-poppins'>The rental income figures shown are approximate and intended to give investors a general idea of the potential annual returns across different areas in Dubai and other Emirates. Actual rental yields may vary depending on factors such as property type, building age, location, amenities, demand, and market conditions.</p>
                            </div>

                            <div className="sticky top-3 left-0">

                                <CustomSliderUi
                                    shuffledImages={shuffledImages}
                                />
                            </div>

                        </div>
                    </div>
                </Container>



                <Container>

                    <div className="mt-[23.25px]">

                        <PaginationNew
                            currentPage={filters.page || 1}
                            totalPages={totalPages}
                            onPageChange={(newPage) => {
                                // const url = new URL(window.location.href);
                                // url.searchParams.set('page', newPage.toString());
                                // window.history.pushState({}, '', url);
                                // setPaginationHappened(pre => !pre)
                                // setFilters(prev => ({ ...prev, page: newPage }))

                                router.push(`?page=${newPage}`);
                                setPaginationHappened(pre => !pre);
                                setFilters(prev => ({ ...prev, page: newPage }));
                            }}
                            maxVisiblePages={deviceType === 'mobile' ? 4 : 8} />
                    </div>
                </Container>
            </div>



            <Footer />
        </main>
    )
}

export default RentalIncome





type CardProps = {
    item: any;
    title: string;
    name: "villas" | "townhouses" | "apartments";
};

function Card({ item, title, name }: CardProps) {
    const listings = item[name] ?? [];
    const isEmpty = listings.length === 0;

    return (
        <div
            className={clsx(
                "border font-poppins flex-1 h-[180px] w-full rounded-[3px] border-[#DEDEDE] p-[17px]",
                { "bg-[#F7F7F7]": isEmpty }
            )}
        >
            <div className="flex w-full items-center">
                <p className="text-base mr-[4px] font-medium font-poppins text-nowrap ">
                    {title}
                </p>
                <div className="border flex justify-center text-black/40 h-[20px] items-center text-[11px] gap-1 p-1 px-2 border-black/20 rounded-[3px]">
                    <p className="capitalize  line-clamp-1">
                        {item.cityDetails?.name}
                    </p>
                    <div className="w-[1px] h-[12px] bg-black/40"></div>
                    <p className="capitalize line-clamp-1">{item.emirateDetails?.name}</p>
                </div>
            </div>

            <div className={clsx("text-[13.5px] overflow-y-auto max-h-[120px] font-poppins pt-[5px] gap-1 flex flex-col", {
                "h-full text-center": isEmpty
            })}>
                {isEmpty ? (
                    <div className="flex h-full text-xs justify-center items-center text-[#474747] font-normal">
                        No {
                            name === 'villas' ? 'Villas' : name === 'townhouses' ? 'Townhouses' : 'Apartments'
                        } available in this location
                    </div>
                ) : (
                    listings.map((val: string, i: number) => (
                        <p key={i} className="font-medium capitalize text-xs">
                            {val} AED/yearly
                        </p>
                    ))
                )}
            </div>
        </div>
    );
}
