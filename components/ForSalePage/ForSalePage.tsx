'use client'
import { useForceScrollRestore, useScrollToTopOnRefresh } from '@/hooks/useScrollRestoration';
import { useDeviceType } from '@/utils/useDeviceType';
import { usePathname, useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { FiltersState } from '../types';
import { CountItem } from '@/redux/news/newsApi';
import { useFetchAllProjectsCountQuery, useFetchAllProjectsQuery } from '@/redux/project/projectApi';
import { useFetchAllCityNamesQuery } from '@/redux/cities/citiesApi';
import { shuffle } from '@/utils/shuffle';
import { AllProjectsItems } from '@/redux/project/types';
import Header from '../Header';
import Container from '../atom/Container/Container';
import SearchNew from '../SearchField/SearchNew';
import SelectLatest from '../SelectOption/SelectLatest';
import { CompletionTypes, productTypeOptionFirstItems, PropertyTypes, propertyTypeSecond } from '@/data';
import { SwitchSelector } from '../SelectOption';
import { HiOutlineAdjustmentsHorizontal } from 'react-icons/hi2';
import clsx from 'clsx';
import ExpandableComponentDropdown from '../ExpandableComponent/ExpandableComponent';
import { SelectHandoverDate } from '../SelectHandoverDate';
import SelectNew from '../SelectOption/SelectNew';
import { IoCloseOutline } from 'react-icons/io5';
import SectionDivider from '../atom/SectionDivider/SectionDivider';
import SpaceWrapper from '../atom/SpaceWrapper/SpaceWrapper';
import LocationTags from '../LocationTags/LocationTags';
import ProjectCard from '../ProjectCard/ProjectCard';
import CustomSlider from '../CustomSlider/CustomSlider';
import Recommendations from '@/app/home/Recommendations';
import CustomSliderUi from '@/app/home/CustomSliderUi';
import PaginationNew from '../PaginationNew/PaginationNew';
import { Footer } from '../Footer';
import EnquiryFormModal from '../EnquiryFormModal/EnquiryFormModal';
import MobileFilterOption from '@/app/home/MobileFilterOption';
import { parsePrice } from '@/utils/parsePrice';
import { EmirateNames } from '@/redux/emirates/types';
import Image from 'next/image';
import home_logo from "@/app/assets/house.png";
import Link from 'next/link';

type Props = {
    // initialData: any;
    siteMap: any[];
    emiratesData: EmirateNames[],
    allCounts: CountItem,
    metaContent: {
        html: object,
        json: object
        text: string
    }
    error: boolean,
    // videoAds: AllSmallVideoItems[],
    portraitBanners: PortraitBanner[],
    dataFetchCities: CityNames[],
    url: string,
}

function ForSalePage({ dataFetchCities, portraitBanners, url, siteMap, emiratesData, allCounts, metaContent }: Props) {

    useForceScrollRestore(); // Default key is "scroll-position"
    useScrollToTopOnRefresh();

    // console.log(initialData, 'initial Data')

    const router = useRouter()
    const pathname = usePathname();
    const [defaultPropertyType, setDefaultPropertyType] = useState<string>('');
    const [defaultCompletionType, setDefaultCompletionType] = useState<string>('');
    const afterForSale = (pathname?.split('/for-sale/')[1] || '')
    const smallWords = ['for', 'in', 'of', 'and', 'the', 'on', 'at', 'to'];

    const readable = afterForSale?.split('-')?.map((word, index) => {
        const lower = word?.toLowerCase();
        if (index !== 0 && smallWords?.includes(lower)) return lower;
        return lower?.charAt(0)?.toUpperCase() + lower?.slice(1);
    })
        ?.join(' ');

    const [clear, setClear] = useState(false);
    const [defaultEmirate, setDefaultEmirate] = useState<string>('');
    const [defaultCities, setDefaultCities] = useState<any>('');
    const [filterModel, setFilterModel] = useState(false);
    const [debouncedSearch, setDebouncedSearch] = useState<any>("");
    const [EnquiryForm, setEnquiryForm] = useState({ status: false, id: '', count: 0 });

    const [filters, setFilters] = useState<FiltersState>({
        page: 1,
        search: "",
        cities: [],
        developers: [],
        facilities: [],
        propertyTypeSecond: "all",
        emirate: "",
        completionType: "",
        handoverDate: undefined,
        paymentPlan: undefined,
        furnishType: "",
        discount: "",
        projectTypeFirst: '',
        projectTypeLast: 'all',
        bedAndBath: "",
        minPrice: '',
        maxPrice: '',
        minSqft: "",
        maxSqft: "",
        beds: "",
        bath: "",
    });

    // console.log('first')

    // console.log(filters,'filtersfilters')
    // Event Handlers
    const handleChangeSearch = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setFilters(prev => ({ ...prev, search: event.target.value }));
    }, []);

    // Data fetching with memoized query params
    const queryParams = useMemo(() => ({
        limit: 20,
        page: filters.page,
        search: debouncedSearch,
        cities: filters.cities,
        developers: filters.developers,
        facilities: filters.facilities,
        propertyType: filters.propertyType,
        completionType: filters.completionType,
        paymentPlan: filters.paymentPlan,
        year: filters.handoverDate?.year,
        qtr: filters.handoverDate?.quarter,
        discount: filters.discount,
        projectTypeFirst: filters.projectTypeFirst,
        projectTypeLast: filters.projectTypeLast,
        furnishing: filters.furnishType,
        emirate: filters.emirate,
        maxPrice: filters.maxPrice,
        minPrice: filters.minPrice,
        minSqft: filters.minSqft,
        maxSqft: filters.maxSqft,
        beds: filters.beds,
        bath: filters.bath,
        productTypeOptionFirst: filters.productTypeOptionFirst,
        productTypeOptionLast: filters.productTypeOptionLast,
    }), [filters, debouncedSearch]);


    // const { data: emiratesData } = useFetchAllEmirateNamesQuery();
    const { data: cities } = useFetchAllCityNamesQuery({ emirate: filters.emirate });
    const { data: projectsResponse } = useFetchAllForSaleProjectsQuery({ ...queryParams, url });

    const projects: AllProjectsItems[] = projectsResponse?.data || [];

    const emirateOptions = useMemo(() => {
        const mappedOptions = emiratesData.map((item) => ({
            label: item.name,
            value: item._id,
            count: item.count,
            slug: item.slug,
        })) || [];

        return [
            { label: "All", value: "all" }, // <--- Add "All" option at the top
            ...mappedOptions,
        ];
    }, [emiratesData]);

    const cityOptions = useMemo(() => {
        const mappedOptions = cities?.data.map((item) => ({
            label: item.name,
            value: item.name,
            slug: item.slug,
            count: item.count,
        })) || [];

        return [
            { label: "All", value: "all", count: 0 }, // <--- Add "All" option at the top
            ...mappedOptions,
        ];
    }, [cities]);

    const [paginationHappened, setPaginationHappened] = useState(false)

    const deviceType = useDeviceType();

    const handleSelect = useMemo(() => ({
        emirate: (option: any) => setFilters(prev => ({ ...prev, emirate: option?.value || '' })),
        propertyType: (option: any) => setFilters(prev => ({ ...prev, propertyType: option?.value || '' })),
        propertyTypeSecond: (option: any) => setFilters(prev => ({ ...prev, propertyTypeSecond: option })),
        completionType: (option: any) => setFilters(prev => ({ ...prev, completionType: option })),
        productTypeOptionFirst: (option: any) => setFilters(prev => ({ ...prev, productTypeOptionFirst: option })),
        projectTypeFirst: (option: any) => setFilters(prev => ({ ...prev, projectTypeFirst: option })),
        projectTypeLast: (option: any) => setFilters(prev => ({ ...prev, projectTypeLast: option })),
        productTypeOptionLast: (option: any) => setFilters(prev => ({ ...prev, productTypeOptionLast: option })),
        handoverDate: (data: any) => setFilters(prev => ({ ...prev, handoverDate: data })),
        projectType: (option: any) => setFilters(prev => ({ ...prev, projectType: option })),
        paymentPlan: (option: any) => setFilters(prev => ({ ...prev, paymentPlan: option?.value || '' })),
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

    // Debounce search input
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(filters.search);
            setFilters(prev => ({ ...prev, page: 1 }));
        }, 500);

        return () => clearTimeout(handler);
    }, [filters.search]);
    const { data: allProjectsCounts } = useFetchAllProjectsCountQuery();

    const handleFilterModal = useCallback(() => {
        setFilterModel(prev => !prev);
    }, []);

    const handleClear = useCallback(() => {
        setFilters({
            page: 1,
            search: "",
            cities: [],
            productTypeOptionFirst: '',
            propertyType: '',
            emirate: "",
        });
        setClear(true);
        setTimeout(() => setClear(false), 100);
    }, []);


    const handleClick = (item: AllProjectsItems) => {
        router.push(`/projects/${item.slug}`);
    }

    const handleEnquiryFormClick = useCallback((item: any) => {
        setEnquiryForm({
            status: true,
            id: item._id,
            count: 1,
        });
    }, []);

    const [showYearSelector, setShowYearSelector] = useState(false);


    const banners = portraitBanners || [];
    const shuffledImages = useMemo(() => shuffle(banners), [banners]);


    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const page = urlParams.get('page');

        if (page) {
            setFilters(prev => ({ ...prev, page: parseInt(page) }))
        }
    }, [filters.page]);



    const shuffleArray = (arr: any[]) => {
        const copy = [...arr];
        for (let i = copy.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [copy[i], copy[j]] = [copy[j], copy[i]];
        }
        return copy;
    };

    const pagination = projectsResponse?.pagination;

    const totalPages = projectsResponse?.pagination?.totalPages || 1;


    const propertyTypes = [
        {
            label: "Apartments",
            value: "apartments",
        },
        {
            label: "Penthouses",
            value: "penthouses"
        },
        {
            label: "Townhouses",
            value: "townhouses"
        },
        {
            label: "Villas",
            value: "villas"
        }
    ]



    return (

        <main>
            <div className="mb-20 min-h-screen  w-full lg:overflow-visible font-[family-name:var(--font-geist-sans)]">
                <Header />
                <Container>
                    <section className="  grid grid-cols-1 w-full  lg:grid-cols-[19.8%_9.5%_9.5%_37.5%_21%] gap-2">
                        <div className="md:h-[48px] h-[45px]">
                            <SearchNew
                                value={filters?.search || ''}
                                onChange={handleChangeSearch}
                                placeholder="Search..."
                            />
                        </div>


                        <div className="hidden lg:flex h-[48px]">
                            <SelectLatest
                                listContainerUlListContainerClassName="w-[200px]" search
                                clearSelection={clear}
                                label="Emirates"
                                options={emirateOptions}
                                onSelect={(e) => {

                                    let url = pathname;
                                    const match: any = [...emirateOptions, ...cityOptions].find((item: any) => url.includes(item.slug));

                                    if (match && "slug" in match && match.slug && e) {
                                        const newValue = e?.slug?.toLowerCase() ?? "";
                                        const regex = new RegExp(match.slug, "i");
                                        url = url.replace(regex, newValue);
                                        window.location.href = url;
                                    }

                                }}
                            />
                        </div>


                        <div className="hidden lg:flex h-[48px]">
                            <SelectLatest
                                defaultValueMultiple={cityOptions?.filter((item) => defaultCities?.includes(item.label))}
                                search
                                multiple
                                onSelectMultiple={(e) => {


                                    let url = pathname;
                                    const match: any = [...emirateOptions, ...cityOptions].find((item: any) => url.includes(item.slug));

                                    if (match && "slug" in match && match.slug && e && e.length > 0) {
                                        const newValue = e[e.length - 1]?.slug?.toLowerCase() ?? "";
                                        const regex = new RegExp(match.slug, "i");
                                        url = url.replace(regex, newValue);
                                        window.location.href = url; // navigate and render page with new URL
                                    }

                                }}
                                clearSelection={clear}
                                listContainerUlListContainerClassName="w-[220px]"
                                label="Cities"
                                options={cityOptions}

                            />
                        </div>



                        {productTypeOptionFirstItems.length > 0 ? <div className="h-[45px] sm:h-[48px]">
                            <SwitchSelector
                                containerClassName="sm:!gap-1"

                                onSelect={(e) => {
                                    const url = new URL(window.location.href);
                                    const newUrl = `${url.pathname}?${url.searchParams.toString()}`;
                                    router.push(`/buy/${e}/${newUrl}`)
                                }}
                                options={productTypeOptionFirstItems}

                            />
                        </div> : <div className="w-full h-full bg-gray-50"></div>}


                        <div className="flex gap-2 h-[45px] sm:h-[48px]">
                            <SwitchSelector
                                containerClassName="sm:!gap-1"
                                onSelect={(e) => {
                                    const url = new URL(window.location.href);

                                    if (e === 'all') {
                                        return;
                                    }
                                    const newUrl = `${url.pathname}?${url.searchParams.toString()}`;
                                    router.push(`/buy/off-plan-projects/${e}/${newUrl}`)

                                }

                                }
                                defaultValue={filters.propertyTypeSecond}
                                options={propertyTypeSecond}
                            />
                            <button onClick={handleFilterModal} className="bg-red-600/10 rounded flex justify-center items-center  border-none w-[55px] lg:hidden h-full">

                                <HiOutlineAdjustmentsHorizontal
                                    className="w-[22px] h-[22px]"
                                    color='red'
                                />
                            </button>
                        </div>

                    </section>
                </Container>



                {/* /* Additional Filters  */}

                <Container>
                    <section className=" lg:flex gap-2 justify-between  mt-2  hidden">


                        <div className={clsx(`h-[33px]`, true ? 'w-[150px]' : 'flex-[8%]')}>

                            <SelectLatest
                                label="Property Types"
                                options={[{
                                    value: "all",
                                    label: "All",
                                    count: 0,

                                }, {
                                    value: "villas",
                                    label: "Villa",
                                    count: allCounts?.propertyTypes?.find(item => item?.name === 'villa')?.count || 0,

                                },
                                {
                                    value: "apartments",
                                    label: "Apartment",
                                    count: allCounts?.propertyTypes?.find(item => item?.name === 'apartment')?.count || 0,

                                },
                                {
                                    value: "penthouses",
                                    label: "Penthouse",
                                    count: allCounts?.propertyTypes?.find(item => item?.name === 'penthouse')?.count || 0,

                                },
                                {
                                    value: "townhouses",
                                    label: "Townhouse",
                                    count: allCounts?.propertyTypes?.find(item => item?.name === 'townhouse')?.count || 0,

                                }]}
                                onSelect={(e) => {
                                    let url = pathname;
                                    const match = propertyTypes.find((item) => url.includes(item.value));

                                    if (match && e) {
                                        const regex = new RegExp(match.value, "i");
                                        url = url.replace(regex, e.value.toLowerCase());
                                        window.location.href = url; // navigate and render page with new URL
                                    }
                                }}
                                clearSelection={clear}
                                defaultValue={PropertyTypes?.find((item) => item?.label === defaultPropertyType)}
                                listContainerUlListContainerClassName="w-[200px]"

                            />
                        </div>



                        <div className="lg:flex-[30%] h-[33px]">
                            <SwitchSelector
                                defaultValue={defaultCompletionType}
                                onSelect={(e) => {


                                    const url = new URL(window.location.href);

                                    if (e === 'all') {
                                        return;
                                    }

                                    const newUrl = `${url.pathname}?${url.searchParams.toString()}`;

                                    router.push(`/buy/dubai/off-plan-projects/${e}`)

                                }}
                                clearSelection={clear}
                                options={CompletionTypes}
                            />
                        </div>


                        <div className="flex-[8%] h-[33px]">

                            <ExpandableComponentDropdown
                                isOpen={showYearSelector}
                                onToggle={() => setShowYearSelector(prev => !prev)}
                                label={(filters.handoverDate?.year || filters?.handoverDate?.quarter) ? (`${filters?.handoverDate?.year}-${filters?.handoverDate?.quarter}`) : "Handover"}
                                isSelected={false}

                                onClear={() => {

                                }}
                                clear={clear}
                                customCloseControl={<button className="text-xs text-red-600">X</button>}
                            >
                                <SelectHandoverDate
                                    initialYear={filters.handoverDate?.year ? filters.handoverDate?.year : 2025}
                                    initialQuarter={filters.handoverDate?.quarter ? filters.handoverDate?.quarter : "Q2"}

                                    onDone={(year, quarter) => {

                                        router.push(`/buy/dubai/off-plan-projects`)

                                    }}
                                    onClose={() => setShowYearSelector(false)}
                                    reset={() => {

                                    }}
                                    onChange={(year, quarter) => {

                                    }}
                                />
                            </ExpandableComponentDropdown>

                        </div>



                        <div className="flex-[10%] h-[33px]">

                            <SelectNew
                                clearSelection={clear}
                                className="w-[200px]"
                                label="Payment Plan"
                                options={[{
                                    value: "all",
                                    label: "All",
                                    count: allCounts?.paymentPlans?.reduce((acc, curr) => acc + curr.count, 0),

                                }, {
                                    value: "on-handover",
                                    label: "On Handover",
                                    count: allCounts?.paymentPlans?.find(item => item?.name === 'onHandover')?.count || 0,
                                },
                                {
                                    value: "post-handover",
                                    label: "Post Handover",
                                    count: allCounts?.paymentPlans?.find(item => item?.name === 'postHandover')?.count || 0,
                                },]}
                                onSelect={() => {
                                    const url = new URL(window.location.href);

                                    const newUrl = `${url.pathname}?${url.searchParams.toString()}`;
                                    router.push(`/buy/dubai/off-plan-projects/`)

                                }}
                            />
                        </div>

                        <div className={clsx("h-[33px]", true ? 'w-[140px]' : 'flex-[8%]')}>

                            <SelectNew
                                clearSelection={clear}
                                className="w-[200px]"
                                label="Furnish Type"
                                options={[{
                                    value: "all",
                                    label: "All",
                                }, {
                                    value: "fully-furnished",
                                    label: "Fully Furnished",
                                    count: allCounts?.furnisheds?.find(item => item?.name === 'fully-furnished')?.count || 0,

                                },
                                {
                                    value: "semi-furnished",
                                    label: "Semi Furnished",
                                    count: allCounts?.furnisheds?.find(item => item?.name === 'semi-furnished')?.count || 0,

                                },
                                {
                                    value: "un-furnishing",
                                    label: "UnFurnished",
                                    count: allCounts?.furnisheds?.find(item => item?.name === 'un-furnishing')?.count || 0,
                                },]}
                                onSelect={(e) => {
                                    const url = new URL(window.location.href);
                                    if (e?.value) {
                                        url.searchParams.set('furnishing', e?.label ?? '');
                                    } else {
                                        url.searchParams.delete('furnishing');
                                    }
                                    const newUrl = `${url.pathname}?${url.searchParams.toString()}`;
                                    // window.history.pushState({}, '', newUrl);
                                    router.push(`/buy/dubai/off-plan-projects/`);
                                }}
                            />
                        </div>




                        <div className="flex-[7%]  h-[33px]">

                            <SelectNew
                                clearSelection={clear}
                                className="w-[200px] "
                                label="Discount"
                                options={[{
                                    value: "all",
                                    label: "All",
                                },
                                {
                                    value: "with-discount",
                                    label: "With Discount",
                                    count: allCounts?.discount?.find(item => item?.name === 'with-discount')?.count || 0,
                                },
                                {
                                    value: "without-discount",
                                    label: "Without Discount",
                                    count: allCounts?.discount?.find(item => item?.name === 'without-discount')?.count || 0,

                                },]}
                                onSelect={() => {
                                    const url = new URL(window.location.href);

                                    const newUrl = `${url.pathname}?${url.searchParams.toString()}`;
                                    // window.history.pushState({}, '', newUrl);
                                    router.push(`/buy/dubai/off-plan-projects/`);

                                }}
                            />
                        </div>




                        <div onClick={() => handleClear()} className="flex cursor-pointer max-w-[120px] h-[33px] items-center gap-2">
                            <label className="text-[12px] cursor-pointer">Clear Filters</label>
                            <div className="bg-black cursor-pointer w-[14px] rounded-full h-[14px] flex justify-center items-center">
                                <IoCloseOutline size={12} color="white" />
                            </div>
                        </div>

                    </section>
                </Container>



                <SectionDivider
                    containerClassName="my-[12px]"
                    lineClassName="h-[1px] w-full bg-[#DEDEDE]"
                />





                {/* Projects Section */}
                <Container>

                    <div className="mb-4 flex gap-2">
                        <div className="w-full h-full  grid gap-3 sm:grid-cols-2 lg:grid-cols-1">

                            {true && <div className={clsx("flex justify-between flex-col md:flex-row flex-1 items-center md:items-center w-full", true ? '' : 'hidden')}>

                                <div className="gap-3 flex flex-col">
                                    <BreadcampNavigation
                                        readable={readable}
                                    />

                                    <h1
                                        className='font-medium text-2xl font-poppins'

                                    >
                                        {readable}
                                    </h1>
                                </div>

                                <div className="gap-3 flex flex-col">


                                    <div className="flex gap-3 items-center justify-end text-xs w-72 font-normal font-poppins">
                                        <p>Sort by :</p>
                                        <div className="w-36">
                                            <ToggleButton />
                                        </div>
                                    </div>

                                    <div className="flex justify-end items-center">
                                        <p className='text-xs font-poppins font-normal'>{projects.length} Properties</p>
                                    </div>
                                </div>

                            </div>}





                            {/* Location link */}
                            <SpaceWrapper
                                className='pb-0'
                            >
                                <LocationTags

                                    data={
                                        dataFetchCities?.slice(0, 4).map((item) => ({
                                            location: item.name,
                                            count: item.count,
                                            slug: item.slug,
                                        })) || []
                                    }
                                />
                            </SpaceWrapper>

                            {/* projects */}
                            {projects && projects.length ? (
                                projects?.map((item, index) => (
                                    <React.Fragment key={index}>
                                        <ProjectCard
                                            navigateDetailsButton={true}
                                            item={item}
                                            handleClick={handleClick}
                                            handleEnquiryFormClick={handleEnquiryFormClick}
                                        />
                                        {(index + 1) % 5 === 0 && (
                                            <>
                                                <div className=" flex sm:hidden mt:mt-0">
                                                    <CustomSlider
                                                        images={shuffleArray(shuffledImages)}
                                                        containerClassName="!h-[95px] border border-[#DEDEDE] "
                                                    />
                                                </div></>
                                        )}
                                    </React.Fragment>
                                ))
                            ) :
                                Array.from({ length: 10 }).map((_, index) => (
                                    <ProjectCardSkelton key={index} />
                                ))
                            }
                        </div>

                        <div className="w-full xl:block hidden max-w-[301.5px]">


                            <div className="sticky -mt-2 top-2 left-0">

                                <Recommendations siteMap={siteMap}>
                                    {(items) => (
                                        <>
                                            <RecommendedText title="Recommended For You" items={items} />
                                        </>
                                    )}
                                </Recommendations>

                                <CustomSliderUi
                                    shuffledImages={shuffledImages}
                                />

                                <Recommendations siteMap={siteMap}>
                                    {(items) => (
                                        <>
                                            <RecommendedText title="Trending Areas" items={items} />
                                            <RecommendedText title="Popular Searches" items={items} />
                                        </>
                                    )}
                                </Recommendations>
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
                                const url = new URL(window.location.href);
                                url.searchParams.set('page', newPage.toString());
                                window.history.pushState({}, '', url);
                                setPaginationHappened(pre => !pre)
                                setFilters(prev => ({ ...prev, page: newPage }))
                            }}
                            maxVisiblePages={deviceType === 'mobile' ? 6 : 8} />



                        <div className="text-[10.5px] mt-[8.25px] flex justify-center items-center font-normal font-poppins text-[#767676]">{filters.page} To {totalPages} of {allProjectsCounts?.data?.[0]?.count ? parsePrice(allProjectsCounts?.data?.[0]?.count) : 0} Listings</div>
                    </div>
                </Container>

                <ContentPage
                    content={metaContent}
                />

            </div>




            <Footer />



            <EnquiryFormModal
                EnquiryForm={EnquiryForm}
                setEnquiryForm={setEnquiryForm}
            />


            {/* <MobileFilterOption
                allCounts={allCounts}
                pagination={pagination}

                resultProjects={() => {
                }}
                emiratesData={emiratesData}


                setFiltersHandler={setFilters}
                onClose={() => setFilterModel(false)}
                show={filterModel}
            /> */}
        </main>
    )

}

export default ForSalePage




import CherveronIcon from '@/app/assets/chevron.png';
const BreadcampNavigation: React.FC<{
    readable?: string;
}> = ({ readable }) => {

    const pathname = usePathname();

    // console.log(pathname, 'pathname')

    const propertyTypes = [{
        title: "Apartments",
        value: "apartments",
    }, {
        title: "Penthouses",
        value: "penthouses"
    }, {
        title: "Townhouses",
        value: "townhouses"
    }, {
        title: "Villas",
        value: "villas"
    }];

    const match = propertyTypes.find(item => pathname.includes(item.value));
    const isExistName = match ? match.title : null;
    const items = [
        {
            title: isExistName,
        },
        {
            title: readable,
        }
    ]

    return (

        <section className=" flex w-full gap-2 items-center flex-wrap">
            <Image
                alt={'Home Logo'}
                src={home_logo}
                className='w-[16px] h-[16px] sm:w-[20px] sm:h-[20px]'

            />

            <div className="flex gap-2 items-center flex-wrap ">

                <div className="">
                    <Image
                        alt='Chevron'
                        src={CherveronIcon}
                        className='w-[14px] h-[14px] sm:w-[18px] sm:h-[18px]'
                    />
                </div>

                {
                    items?.map((item, index) => (
                        <Link key={index} href={''} className="flex items-center mb-0  gap-1 ">
                            <h4 className='text-[#FF1645] font-normal !mb-0 !mt-0 text-[12px] font-poppins '>{item.title}</h4>
                            {index < 2 && index < items.length - 1 && (
                                <Image
                                    alt='Chevron'
                                    src={CherveronIcon}
                                    className='w-[14px] h-[14px] sm:w-[18px] sm:h-[18px]'
                                />
                            )}
                        </Link>
                    ))
                }
            </div>
        </section>

    );
};


import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, X } from "lucide-react";
import { FaCaretDown } from 'react-icons/fa';
import NoDataFound from '../Empty/NoDataFound';
import RecommendedText from '../RecomendedText/RecommendedText';
import { PortraitBanner } from '@/redux/portraitBannerAd/types';
import { getPortraitBanners } from '@/utils/getPortraitBanners';
import { CityNames } from '@/redux/cities/types';
import { useFetchAllForSaleProjectsQuery } from '@/redux/forSale/forSaleApi';
import Skeleton from '../Skeleton/Skeleton';
import ProjectCardSkelton from '../ProjectCard/ProjectCardSkelton';


const ToggleButton = () => {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState<any>(null);
    const options = ["Newest", "Price High", "Price Low", "Recently Added"];
    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);


    return (
        <div ref={ref} className="relative w-full">
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex text-xs items-center justify-between px-3 py-1.5 bg-white border border-[#DEDEDE] rounded"
            >
                <span className="text-xs text-gray-700">
                    {selected ? selected : "Filter"}
                </span>
                <FaCaretDown
                    className={clsx("w-[20px] h-[20px] transition-transform", {
                        "rotate-180": open,
                    })}
                    color={"#FF1645"}
                />
            </button>

            <AnimatePresence>
                {open && (
                    <motion.ul
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.2 }}
                        className="absolute z-40 mt-2 w-full bg-white border-[#DEDEDE] border rounded overflow-hidden"
                    >
                        {options.map((opt, i) => (
                            <li
                                key={i}
                                className={clsx(
                                    "px-3 py-2 text-xs text-gray-700 hover:bg-gray-100 cursor-pointer",
                                    {
                                        "bg-red-700/10 text-[#FF1645]": selected === opt,
                                    }
                                )}
                                onClick={() => {
                                    if (selected === opt) {
                                        setSelected(null);
                                        return;
                                    }
                                    setSelected(opt);
                                    setOpen(false);
                                }}
                            >
                                {opt}
                            </li>
                        ))}
                    </motion.ul>
                )}
            </AnimatePresence>
        </div>
    );
};


const ContentPage = ({ content }: {
    content: {
        html: object,
        json: object
        text: string
    }
}) => {
    return (
        <Container
            className='mt-10'

        >

            <div
                className='prose prose-sm mb-20 content-wrapper-home !text-black max-w-none font-poppins'
                dangerouslySetInnerHTML={{ __html: content?.html || '' }}
            >

            </div>
        </Container>
    )
}