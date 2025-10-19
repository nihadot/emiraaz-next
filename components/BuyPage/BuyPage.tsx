'use client'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import Container from '../atom/Container/Container';
import SearchNew from '../SearchField/SearchNew';
import { FiltersState } from '../types';
import SelectLatest from '../SelectOption/SelectLatest';
import { emirateApi, useFetchAllEmirateNamesQuery } from '@/redux/emirates/emiratesApi';
import { useFetchAllCityNamesQuery } from '@/redux/cities/citiesApi';
import { CompletionTypes, productTypeOptionFirstItems, propertyCategoryType, propertyTypeFirst, PropertyTypes, propertyTypeSecond } from '@/data';
import { SwitchSelector } from '../SelectOption';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { HiOutlineAdjustmentsHorizontal } from 'react-icons/hi2';
import { EmirateFetchAllNamesResponse, EmirateNames } from '@/redux/emirates/types';
import clsx from 'clsx';
import { CountItem, useViewAllCountsQuery } from '@/redux/news/newsApi';
import ExpandableComponentDropdown from '../ExpandableComponent/ExpandableComponent';
import { SelectHandoverDate } from '../SelectHandoverDate';
import SelectNew from '../SelectOption/SelectNew';
import { IoCloseOutline } from 'react-icons/io5';
import { CityNames, FetchCityByIdPayload } from '@/redux/cities/types';
import SectionDivider from '../atom/SectionDivider/SectionDivider';
import SpaceWrapper from '../atom/SpaceWrapper/SpaceWrapper';
import BreadcampNavigation from '../BreadcampNavigation/BreadcampNavigation';
import { useFetchAllProjectsCountQuery, useFetchAllProjectsQuery } from '@/redux/project/projectApi';
import { parsePrice } from '@/utils/parsePrice';
import LocationTags from '../LocationTags/LocationTags';
import { AllProjectsItems } from '@/redux/project/types';
import ProjectCard from '../ProjectCard/ProjectCard';
import EnquiryFormModal from '../EnquiryFormModal/EnquiryFormModal';
import CustomSlider from '../CustomSlider/CustomSlider';
import { useFetchAllPortraitBannersQuery } from '@/redux/portraitBannerAd/portraitBannerAdApi';
import { shuffle } from '@/utils/shuffle';
import ProjectCardSkelton from '../ProjectCard/ProjectCardSkelton';
import { AllSmallVideoItems } from '@/redux/smallVideo/types';
import VideoPreview from '@/app/home/VideoPreview';
import RecommendedText from '../RecomendedText/RecommendedText';
import CustomSliderUi from '@/app/home/CustomSliderUi';
import Recommendations from '@/app/home/Recommendations';
import { useViewAllSmallVideosQuery } from '@/redux/smallVideo/smallViewApi';
import { Footer } from '../Footer';
// import MobileFilterOption from '@/app/home/MobileFilterOption';
import { Pagination } from '@/utils/types';
import Slider from '@components/CustomSlider/Slider';
import FilterEmpty from '../Empty/FilterEmpty';
import NoDataFound from '../Empty/NoDataFound';
import { FetchAllPortraitBannersResponse, PortraitBanner } from '@/redux/portraitBannerAd/types';
import MobileFilterOption from '@/app/home/MobileFilterOption';
import PaginationNew from '../PaginationNew/PaginationNew';
import { useDeviceType } from '@/utils/useDeviceType';
import { useForceScrollRestore, useScrollToTopOnRefresh } from '@/hooks/useScrollRestoration';
import HomePageContent from '../Home/HomePageContent';

type Props = {
    emiratesData: EmirateNames[],
    urls: string[]
    allCounts: CountItem
    initialCities: CityNames[],
    videoAds: AllSmallVideoItems[],
    initialData: AllProjectsItems[],
    portraitBanners: PortraitBanner,
    siteMap: any[],
    content:object
}

function BuyPage({
    emiratesData,
    videoAds,
    initialCities,
    allCounts,
    initialData,
    portraitBanners,
    siteMap,
    content,
}: Props) {
    useForceScrollRestore();
    useScrollToTopOnRefresh();
    const pathname = usePathname();
    const searchParams = useSearchParams();


    const currentSegments = pathname.split('/').filter(Boolean); // e.g. ['buy', 'abu-dhabi', 'off-plan-projects']
    const segments = [...currentSegments];
    const allCountsOfEmirate = emiratesData?.reduce((acc, curr) => {
        acc += curr.count || 0;
        return acc;
    }, 0);

    const [clear, setClear] = useState(false);
    const [defaultCities, setDefaultCities] = useState<any>('');
    const [defaultPropertyType, setDefaultPropertyType] = useState<string>('');
    const [defaultCompletionType, setDefaultCompletionType] = useState<string>('all');
    const [filterModel, setFilterModel] = useState(false);
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
    const { data: citiesData } = useFetchAllCityNamesQuery({ emirate: filters.emirate }, {
        skip: !!initialCities?.length && !filters.emirate
    });


    // Event Handlers
    const handleChangeSearch = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setFilters(prev => ({ ...prev, search: event.target.value }));
    }, []);

    const emirateOptions = useMemo(() => {
        const preferredOrder = ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ras Al Khaimah', 'Ajman', 'Umm Al-Quwain'];

        const mappedOptions = emiratesData?.map((item) => ({
            label: item.name,
            value: item._id,
            count: item.count,
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
            { label: "All", value: "all", count: allCountsOfEmirate }, // Always first
            ...sortedOptions,
        ];
    }, []);



    // Find emirate from URL on first render
    const initialEmirate =
        segments.find((seg) => emirateOptions.some((item: any) => item.slug === seg)) ||
        "dubai";

    const initialPropertyCategory =
        segments.find((seg) => productTypeOptionFirstItems.some((item: any) => item.value === seg)) ||
        "off-plan-projects";

    const initialPropertyType =
        segments.find((seg) => propertyTypeSecond.some((item: any) => item.value === seg)) ||
        "all";
    const [defaultEmirate, _setDefaultEmirate] = useState<string>(initialEmirate);


    const isExistPropertyCategoryType = segments.find((seg) =>
        productTypeOptionFirstItems.some((item: any) => item.value === seg)
    );

    const [isPropertyType, setIsPropertyType] = useState('');


    const [paginationHappened, setPaginationHappened] = useState(false)

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

    const cities = citiesData?.data || initialCities || [];

    const cityOptions = useMemo(() => {
        const mappedOptions = cities?.map((item) => ({
            label: item.name,
            value: item.name,
            count: item.count,
            slug: item.slug,
        })) || [];

        const totalCities = mappedOptions.reduce((a, b) => a + b.count, 0);

        return [
            { label: "All", value: "all", count: totalCities }, // <--- Add "All" option at the top
            ...mappedOptions,
        ];
    }, [cities]);

    const handleChangeCities = useCallback((option: any[]) => {
        if (option.length === 0) {
            setFilters(prev => ({ ...prev, cities: [] }));
            return;
        }
        setFilters(prev => ({ ...prev, cities: option.map((item: any) => item.slug) }));
    }, []);

    const [debouncedSearch, setDebouncedSearch] = useState<any>("");


    // Debounce search input
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(filters.search);
            setFilters(prev => ({ ...prev, page: 1 }));
        }, 500);

        return () => clearTimeout(handler);
    }, [filters.search]);

    const deviceType = useDeviceType();

    const queryParams = useMemo(() => ({
        limit: 24,
        page: filters.page,
        search: debouncedSearch,
        cities: filters.cities,
        propertyType: filters.propertyType,
        completionType: filters.completionType,
        paymentPlan: filters.paymentPlan,
        year: filters.handoverDate?.year,
        qtr: filters.handoverDate?.quarter,
        discount: filters.discount,
        projectTypeFirst: filters.projectTypeFirst,
        projectTypeLast: filters.propertyTypeSecond,
        furnishing: filters.furnishType,
        emirate: filters.emirate,
    }), [filters, debouncedSearch]);


    const { data } = useFetchAllProjectsQuery(queryParams, {
        refetchOnMountOrArgChange: true,
        refetchOnReconnect: true,
        refetchOnFocus: true,
        skip: false,
    });

    const pagination = data?.pagination;
    const isShowEmptyPages = productTypeOptionFirstItems.filter((i) => i.value !== 'off-plan-projects').some((item: any) => item.value === isExistPropertyCategoryType)



    const handleFilterModal = useCallback(() => {
        setFilterModel(prev => !prev);
    }, []);

    function updateUrl({ emirate, propertyFirst, propertySecond }: { emirate?: string, propertyFirst?: string, propertySecond?: string }) {
        const currentSegments = pathname.split('/').filter(Boolean); // e.g. ['buy', 'abu-dhabi', 'off-plan-projects']
        const urlParams = new URLSearchParams(searchParams.toString());
        const cities = urlParams.get('cities');
        const toConvertedCitiesParams = cities?.split(',')

        const segments = [...currentSegments];
        const isExistEmirate = segments.find((seg) =>
            emirateOptions.some((item: any) => item.slug === seg)
        );


        const isExistPropertyType = segments.find((seg) =>
            productTypeOptionFirstItems.some((item: any) => item.value === seg)
        );

        const isPropertyTypeSecond = segments.find((seg) =>
            propertyTypeSecond.some((item: any) => item.value === seg)
        );

        let fullUrl = '/buy';



        if (emirate === "all") {
            fullUrl = `/buy/${isExistPropertyType ? isExistPropertyType : ''}/${isPropertyTypeSecond ? isPropertyTypeSecond : ''}`;
        }

        if (emirate !== 'all' && emirate) {
            fullUrl += `/${emirate}/${propertyFirst ? propertyFirst : isExistPropertyType ? isExistPropertyType : ''}/${isPropertyTypeSecond ? isPropertyTypeSecond : ''}`;
        }

        if (propertyFirst) {
            fullUrl += `/${isExistEmirate ? isExistEmirate : ''}/${propertyFirst ? propertyFirst : isExistPropertyType ? isExistPropertyType : ''}/${isPropertyTypeSecond ? isPropertyTypeSecond : ''}`;
        }

        if (propertySecond !== 'all' && propertySecond) {
            fullUrl += `/${isExistEmirate ? isExistEmirate : ''}/${isExistPropertyType ? isExistPropertyType : ''}/${propertySecond ? propertySecond : isPropertyTypeSecond ? isPropertyTypeSecond : ''}`;

        }
        if (propertySecond === 'all') {
            fullUrl = `/buy/${isExistEmirate ? isExistEmirate : ''}/${isExistPropertyType ? isExistPropertyType : ''}`;
        }


        fullUrl += `?${urlParams.toString()}`

        if (toConvertedCitiesParams) {
            setDefaultCities(toConvertedCitiesParams)

        }

        window.history.pushState({}, '', fullUrl);
    }

    const propertyTypesCondition = !((filters?.projectType === 'off-plan-land' && filters?.propertyTypeSecond === 'residential') || (filters?.projectType === 'off-plan-land' && filters?.propertyTypeSecond === 'commercial') || (filters?.projectType === 'off-plan-secondary' && filters?.propertyTypeSecond === 'commercial') || (filters?.projectType === 'off-plan-resale' && filters?.propertyTypeSecond === 'commercial') || (filters?.projectType === 'off-plan-projects' && filters?.propertyTypeSecond === 'commercial'));
    const [showYearSelector, setShowYearSelector] = useState(false);
    const furnishTypesCondition = (!((filters?.projectType === 'off-plan-land' && filters?.propertyTypeSecond === 'residential') || (filters?.projectType === 'off-plan-land' && filters?.propertyTypeSecond === 'commercial')))

    const handleClear = useCallback(() => {
        setFilters({
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
            projectTypeFirst: 'off-plan-projects',
            projectTypeLast: 'all',
            bedAndBath: "",
            minPrice: '',
            maxPrice: '',
            minSqft: "",
            maxSqft: "",
            beds: "",
            bath: "",
        });
        setClear(true);
        setTimeout(() => setClear(false), 100);


    }, []);

    const [EnquiryForm, setEnquiryForm] = useState({ status: false, id: '', count: 0 });


    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });

    }, [paginationHappened]);

    const totalPropertyTypesCounts = allCounts?.propertyTypes?.map(item => item?.count).reduce((a, b) => a + b, 0)

    const propertyTypesLists = {
        commercial: [{
            value: "officespace",
            label: "Office Space",
            count: allCounts?.propertyTypes?.find(item => item?.name === 'officespace')?.count || 0,

        }, {
            value: "shop",
            label: "Shop",
            count: allCounts?.propertyTypes?.find(item => item?.name === 'shop')?.count || 0,

        }, {
            value: "warehouse",
            label: "Warehouse",
            count: allCounts?.propertyTypes?.find(item => item?.name === 'warehouse')?.count || 0,
        },],

        residential: [
            {
                value: "villa",
                label: "Villa",
                count: allCounts?.propertyTypes?.find(item => item?.name === 'villa')?.count || 0,

            },
            {
                value: "apartment",
                label: "Apartment",
                count: allCounts?.propertyTypes?.find(item => item?.name === 'apartment')?.count || 0,

            },
            {
                value: "penthouse",
                label: "Penthouse",
                count: allCounts?.propertyTypes?.find(item => item?.name === 'penthouse')?.count || 0,

            },
            {
                value: "townhouse",
                label: "Townhouse",
                count: allCounts?.propertyTypes?.find(item => item?.name === 'townhouse')?.count || 0,

            }
        ],

        default: [
            {
                value: "all",
                label: "All",
                count: totalPropertyTypesCounts,

            }
        ],
        getAll: () => {
            return [...propertyTypesLists.default, ...propertyTypesLists.residential, ...propertyTypesLists.commercial]
        }
    }

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const page = urlParams.get('page');

        if (page) {
            setFilters(prev => ({ ...prev, page: parseInt(page) }))
        }
    }, [filters.page]);


    const [smallVideoAds, setSmallVideoAds] = useState<AllSmallVideoItems[]>();

    const router = useRouter();
    useEffect(() => {

        if (videoAds) {
            setSmallVideoAds(videoAds);
        }
    }, [videoAds]);



    const allTypes = propertyTypesLists?.getAll()
    const handleClick = (item: AllProjectsItems) => {

        const currency = searchParams.get('currency');

        const slug = item.slug;
        const queryString = currency ? `?currency=${currency}` : '';

        sessionStorage.setItem('scroll-position', window.scrollY.toString());
        router.push(`/projects/${slug}${queryString}`);
    };
    const { data: portraitBannerData } = useFetchAllPortraitBannersQuery({});

    const handleEnquiryFormClick = useCallback((item: any) => {
        setEnquiryForm({
            status: true,
            id: item._id,
            count: 1,
        });
    }, []);

    const shuffleArray = (arr: any[]) => {
        const copy = [...arr];
        for (let i = copy.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [copy[i], copy[j]] = [copy[j], copy[i]];
        }
        return copy;
    };


    const banners = portraitBannerData?.data || [];
    const shuffledImages = useMemo(() => shuffle(banners), [banners]);

    const lastCitySlug = filters.cities?.[filters.cities.length - 1];

    const isMatchCity = cityOptions.find((item: any) => item.slug === lastCitySlug);

    const projects = data?.data || initialData;
    const totalPages = pagination?.totalPages || 1;
    const totalRecords = pagination?.totalRecords;

    // const cityLink = cityOptions.find(item => item.value === isMatchCity?.value)

    

    return (
        <>

            <Container>


                <section className="  grid grid-cols-1 w-full  lg:grid-cols-[19.8%_9.5%_9.5%_37.5%_21%] gap-2">

                    <div className="md:h-[48px] h-[40px]">
                        <SearchNew
                            value={filters?.search || ''}
                            onChange={handleChangeSearch}
                            placeholder="Search..."
                        />
                    </div>



                    <div className="hidden lg:flex h-[48px]">
                        <SelectLatest
                            listContainerUlListContainerClassName="w-[200px]"
                            search
                            defaultValue={emirateOptions?.find((item: any) => item?.slug === defaultEmirate)}
                            clearSelection={clear}
                            label="Emirates"
                            options={emirateOptions}
                            onSelect={(e) => {
                                const emirate = e?.slug ? e.slug : 'all';
                                updateUrl({ emirate });
                                handleSelect.emirate(e);
                            }}
                        />
                    </div>



                    <div className="hidden lg:flex h-[48px]">
                        <SelectLatest
                            defaultValueMultiple={cityOptions?.filter((item: any) => defaultCities?.includes(item.slug))}
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

                                    handleChangeCities(e);

                                }


                            }}
                            clearSelection={clear}
                            listContainerUlListContainerClassName="w-[220px]"
                            label="Cities"
                            options={cityOptions}

                        />
                    </div>






                    {/* Mobile */}
                    <div className="flex lg:hidden w-full gap-2">

                        <div className=" h-[40px] w-full">
                            <SelectLatest
                                listContainerUlListContainerClassName="w-[200px]"
                                search
                                defaultValue={emirateOptions?.find((item) => item?.label === defaultEmirate)}
                                clearSelection={clear}
                                label="Emirates"
                                options={emirateOptions}
                                onSelect={(e) => {
                                    const emirate = e?.slug ? e.slug : 'all';

                                    updateUrl({ emirate });
                                    handleSelect.emirate(e);
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

                                            url.searchParams.set('cities', e?.map((item) => item.slug).join(','));
                                        } else {
                                            url.searchParams.delete('cities');
                                        }
                                        const newUrl = `${url.pathname}?${url.searchParams.toString()}`;
                                        window.history.pushState({}, '', newUrl);

                                        handleChangeCities(e);

                                    }


                                }}
                                clearSelection={clear}
                                listContainerClassName="w-[220px] sm:!left-0 !-left-14 "
                                label="Cities"
                                options={cityOptions}
                            />
                        </div>

                    </div>


                    {/* Done */}
                    {propertyCategoryType.length > 0 ? <div className="h-[40px] sm:h-[48px]">
                        <SwitchSelector
                            containerClassName="sm:!gap-1"
                            onSelect={(e) => {

                                updateUrl({ propertyFirst: e });
                                handleSelect.projectTypeFirst(e);

                            }}
                            defaultValue={initialPropertyCategory}
                            options={propertyCategoryType}

                        />
                    </div> : <div className="w-full h-full bg-gray-50"></div>}



                    <div className="flex gap-2 h-[40px] sm:h-[48px]">
                        <SwitchSelector
                            containerClassName="sm:!gap-1"
                            onSelect={(e) => {
                                updateUrl({ propertySecond: e });
                                handleSelect.propertyTypeSecond(e);
                                setIsPropertyType(e);
                            }

                            }
                            defaultValue={initialPropertyType}
                            options={propertyTypeSecond}
                        />
                        <button onClick={handleFilterModal} className="bg-red-600/10 rounded-[3px] flex justify-center items-center  border-none w-[55px] lg:hidden h-[40px]">

                            <HiOutlineAdjustmentsHorizontal
                                className="w-[22px] h-[22px]"
                                color='red'
                            />
                        </button>
                    </div>


                </section>
            </Container>


            {/* Additional Filters */}
            <Container>
                <section className=" lg:flex gap-2  mt-2  hidden">




                    <div className={clsx(``, propertyTypesCondition ? 'w-[150px]' : 'flex-[8%]',
                        true ? 'h-[33px]' : 'h-[48px]'
                    )}>


                        <SelectLatest
                            label="Property Types"
                            options={
                                [
                                    ...(isPropertyType === 'residential' || isPropertyType === 'commercial' ? propertyTypesLists.default : []),
                                    ...(isPropertyType === 'residential' ? propertyTypesLists.residential : []),
                                    ...(isPropertyType === 'commercial' ? propertyTypesLists.commercial : []),
                                    ...((isPropertyType === 'all') ? [
                                        ...propertyTypesLists.default,
                                        ...propertyTypesLists.residential,
                                        ...propertyTypesLists.commercial,
                                    ] : []),
                                ]
                            }
                            onSelect={(e) => {
                                const url = new URL(window.location.href);
                                if (e?.value) {

                                    url.searchParams.set('property-type', e?.value ?? '');
                                } else {
                                    url.searchParams.delete('property-type');
                                }
                                const newUrl = `${url.pathname}?${url.searchParams.toString()}`;
                                window.history.pushState({}, '', newUrl);
                                handleSelect.propertyType(e)
                            }}
                            clearSelection={clear}
                            defaultValue={(allTypes.find((item) => item?.value === defaultPropertyType))}
                            listContainerUlListContainerClassName="w-[200px]"

                        />
                    </div>




                    <div className={clsx("lg:flex-[30%]",

                        true ? 'h-[33px]' : 'h-[48px]'

                    )}>
                        <SwitchSelector
                            defaultValue={defaultCompletionType}
                            onSelect={(e) => {


                                const url = new URL(window.location.href);
                                if (e == 'all') {
                                    url.searchParams.delete('completion-type');
                                } else {
                                    url.searchParams.set('completion-type', e ?? '');
                                }
                                const newUrl = `${url.pathname}?${url.searchParams.toString()}`;
                                window.history.pushState({}, '', newUrl);

                                handleSelect.completionType(e)
                            }}
                            clearSelection={clear}
                            options={CompletionTypes}
                        />
                    </div>


                    <div className={clsx("flex-[8%]",

                        true ? 'h-[33px]' : 'h-[48px]'

                    )}>

                        <ExpandableComponentDropdown
                            isOpen={showYearSelector}
                            onToggle={() => setShowYearSelector(prev => !prev)}
                            label={(filters.handoverDate?.year || filters.handoverDate?.quarter) ? (`${filters.handoverDate?.year}-${filters.handoverDate?.quarter}`) : "Handover"}
                            isSelected={false}

                            onClear={() => {

                            }}
                            customCloseControl={<button className="text-xs text-red-600">X</button>}
                        >
                            <SelectHandoverDate
                                initialYear={filters.handoverDate?.year ? filters.handoverDate?.year : 2025}
                                initialQuarter={filters.handoverDate?.quarter ? filters.handoverDate?.quarter : "Q2"}

                                onDone={(year, quarter) => {
                                    handleSelect.handoverDate({ quarter, year })
                                }}
                                onClose={() => setShowYearSelector(false)}
                                reset={() => {

                                }}
                                onChange={(year, quarter) => {

                                }}
                            />
                        </ExpandableComponentDropdown>

                    </div>












                    <div className={clsx("flex-[10%]",
                        true ? 'h-[33px]' : 'h-[48px]'


                    )}>

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
                            onSelect={handleSelect.paymentPlan}
                        />
                    </div>





                    <div className={clsx("flex-[7%]",

                        true ? 'h-[33px]' : 'h-[48px]'

                    )}>

                        <SelectNew
                            clearSelection={clear}
                            className="w-[200px] "
                            label="Discount"
                            options={[{
                                value: "all",
                                label: "All",
                                count: allCounts?.discount?.reduce((acc, curr) => acc + curr.count, 0),
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
                            onSelect={handleSelect.discount}
                        />
                    </div>



                    <div className={clsx("", furnishTypesCondition ? 'w-[140px]' : 'flex-[8%]',

                        true ? 'h-[33px]' : 'h-[48px]'

                    )}>

                        <SelectNew
                            clearSelection={clear}
                            className="w-[200px]"
                            label="Furnish Type"
                            options={[{
                                value: "all",
                                label: "All",
                                count: allCounts?.furnisheds?.reduce((acc, curr) => acc + curr.count, 0),

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
                            onSelect={handleSelect.furnishType}
                        />
                    </div>




                    <div onClick={() => handleClear()} className={clsx("flex cursor-pointer max-w-[120px] items-center gap-2", true ? 'h-[33px]' : 'h-[48px]')}>
                        <label className="text-[12px] cursor-pointer">Clear Filters</label>
                        <div className="bg-black cursor-pointer w-[14px] rounded-full h-[14px] flex justify-center items-center">
                            <IoCloseOutline size={12} color="white" />
                        </div>
                    </div>
                </section>
            </Container>


            <SectionDivider
                containerClassName={clsx("mb-[12px] mt-[12px]")}
                lineClassName="h-[1px] w-full bg-[#DEDEDE]"
            />



            {/* Projects Section */}
            <Container>
                <SpaceWrapper
                    className={'pt-[0px]'}
                >

                    <div className="mb-4 flex gap-2">
                        {!isShowEmptyPages ? <div className="flex-1 h-full  grid gap-3 sm:grid-cols-2 lg:grid-cols-1">

                            {true && <div className={clsx("flex flex-col md:flex-row flex-1 items-start md:items-center w-full", true ? '' : 'hidden')}>

                                <BreadcampNavigation
                                    title={`${productTypeOptionFirstItems.find(item => item.value === isExistPropertyCategoryType)?.label} :`}
                                    items={[
                                        {
                                            title: isMatchCity?.label === 'All' ? 'All Cities' : isMatchCity?.label || 'All Cities',
                                            link: isMatchCity?.label === 'All'
                                                ? '/cities'
                                                : `/cities`
                                        },
                                        {
                                            title: `${productTypeOptionFirstItems.find(item => item.value === isExistPropertyCategoryType)?.label} for sale in ${isMatchCity?.value === 'all' ? 'UAE' : isMatchCity?.label || 'UAE'}`,
                                        }
                                    ]}
                                />
                                <p className='font-poppins font-normal text-[12px] text-nowrap w-fit text-[#333333] pt-2 md:pt-0'>{totalRecords ? `${parsePrice(totalRecords)} Properties Available` : 'No Properties Available'}</p>
                            </div>}


                            {true && <div className={clsx("pt-0 md:pt-[24px]", true ? '' : 'hidden')}>

                                <LocationTags


                                    data={
                                        cities?.slice(0, 5).map((item) => ({
                                            location: item.name,
                                            slug: item.slug,
                                            count: item.count,
                                        })) || []
                                    }
                                />

                            </div>}


                            {totalRecords === 0 && <NoDataFound />}


                            {projects ? (
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
                            ) : (
                                Array.from({ length: 10 }).map((_, index) => (
                                    <ProjectCardSkelton key={index} />
                                ))
                            )}
                        </div> :
                            <FilterEmpty />
                        }



                        <div className={"w-full md:block hidden max-w-[301.5px]"}>

                            {true && (smallVideoAds && smallVideoAds.length > 0 ?
                                <div className={clsx("w-full mb-[12px] relative flex")}>
                                    <VideoPreview
                                        projectSlug={smallVideoAds?.[0]?.projectDetails?.slug || ''}
                                        src={smallVideoAds?.[0]?.videoFile?.url?.url || ''}
                                    />
                                </div> : <div className="w-full h-[250px] rounded bg-gray-50"></div>)
                            }




                            {true && <RecommendedText
                                title="Recommended For You"
                                items={shuffle(siteMap)?.slice(0, 6)}
                            />}

                            <div className="sticky top-3 left-0">

                                <Slider
                                    images={portraitBanners}
                                />

                                {true && <>
                                    <RecommendedText
                                        title="Recommended For You"
                                        items={shuffle(siteMap)?.slice(0, 6)}
                                    />
                                    <RecommendedText
                                        title="Popular Searches"
                                        items={shuffle(siteMap)?.slice(0, 6)}
                                    />
                                </>}



                            </div>







                        </div>
                    </div>
                </SpaceWrapper>
            </Container>


            <Container>

                <div className="mt-[23.25px] mb-10 sm:mb-0">

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
                        maxVisiblePages={deviceType === 'mobile' ? 4 : 8} />



                    <div className="text-[10.5px] mt-[8.25px] flex justify-center items-center font-normal font-poppins text-[#767676]">{filters.page} To {totalPages} of {allCounts?.totalProjects} Listings</div>
                </div>
            </Container>








            <EnquiryFormModal
                EnquiryForm={EnquiryForm}
                setEnquiryForm={setEnquiryForm}
            />


            <MobileFilterOption
                pagination={pagination}
                allCounts={allCounts}
                emiratesData={emiratesData}
                resultProjects={() => {
                }}
                setFiltersHandler={setFilters}
                onClose={() => setFilterModel(false)}
                show={filterModel}
            />



            <HomePageContent
            content={content}
                display={false}
            />


            <SectionDivider
                containerClassName="mt-[45.75px]"
                lineClassName="h-[1px] hidden sm:block w-full bg-[#DEDEDE]"
            />

        </>

    )
}

export default BuyPage