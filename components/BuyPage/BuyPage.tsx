'use client'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Container from '../atom/Container/Container';
import SearchNew from '../SearchField/SearchNew';
import { FiltersState } from '../types';
import SelectLatest from '../SelectOption/SelectLatest';
import { useFetchAllCityNamesQuery } from '@/redux/cities/citiesApi';
import { CompletionTypes, productTypeOptionFirstItems, propertyCategoryStatus, propertyCategoryTypes, propertyTypeSecond, propertyTypeStatus } from '@/data';
import { SwitchSelector } from '../SelectOption';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { HiOutlineAdjustmentsHorizontal } from 'react-icons/hi2';
import { EmirateNames } from '@/redux/emirates/types';
import clsx from 'clsx';
import Skeleton from 'react-loading-skeleton'
import { CountItem } from '@/redux/news/newsApi';
import ExpandableComponentDropdown from '../ExpandableComponent/ExpandableComponent';
import { SelectHandoverDate } from '../SelectHandoverDate';
import SelectNew from '../SelectOption/SelectNew';
import { IoCloseOutline } from 'react-icons/io5';
import { CityNames } from '@/redux/cities/types';
import SectionDivider from '../atom/SectionDivider/SectionDivider';
import SpaceWrapper from '../atom/SpaceWrapper/SpaceWrapper';
import BreadcampNavigation from '../BreadcampNavigation/BreadcampNavigation';
import { useFetchAllProjectsQuery } from '@/redux/project/projectApi';
import { parsePrice } from '@/utils/parsePrice';
import LocationTags from '../LocationTags/LocationTags';
import { AllProjectsItems } from '@/redux/project/types';
import ProjectCard from '../ProjectCard/ProjectCard';
import EnquiryFormModal from '../EnquiryFormModal/EnquiryFormModal';
import CustomSlider from '../CustomSlider/CustomSlider';
import { useFetchAllPortraitBannersQuery } from '@/redux/portraitBannerAd/portraitBannerAdApi';
import { shuffle } from '@/utils/shuffle';
import { AllSmallVideoItems } from '@/redux/smallVideo/types';
import VideoPreview from '@/app/home/VideoPreview';
import RecommendedText from '../RecomendedText/RecommendedText';
import { Pagination } from '@/utils/types';
import Slider from '@components/CustomSlider/Slider';
import FilterEmpty from '../Empty/FilterEmpty';
import NoDataFound from '../Empty/NoDataFound';
import { PortraitBanner } from '@/redux/portraitBannerAd/types';
import PaginationNew from '../PaginationNew/PaginationNew';
import { useDeviceType } from '@/utils/useDeviceType';
import { useForceScrollRestore, useScrollToTopOnRefresh } from '@/hooks/useScrollRestoration';
import HomePageContent from '../Home/HomePageContent';
import ProjectCardSkelton from '../ProjectCard/ProjectCardSkelton';
import MobileFilterOption from '@/app/home/MobileFilterOption';
import { FaCaretDown } from 'react-icons/fa';
import { AnimatePresence, motion } from 'framer-motion';
import { formatAmount, formatCount } from '../atom/button/formatAmount';

type Props = {
    emiratesData: EmirateNames[],
    urls: string[]
    allCounts: CountItem
    initialCities: CityNames[],
    videoAds: AllSmallVideoItems[],
    initialData: {
        data: AllProjectsItems[],
        pagination: Pagination,
    },
    portraitBanners: PortraitBanner,
    siteMap: any[],
    content: object,
    isOffplanValue: boolean,
    existingFilter: {
        emirate: any;
        cities: any[] | string | undefined;
    };
    initialValues: {
        emirate: string;
        cities: string[];
        propertyCategoryType: string;
        propertyCategoryStatus: string;
        propertyType?: string;
        completionType?: string;
        qtr?: string,
        year: number | '',
        paymentPlan?: string,
        furnishied?: string,
        discount?: string,
    }
    hideHamburger?: boolean;
}

function BuyPage({
    emiratesData,
    isOffplanValue,
    videoAds,
    initialCities,
    allCounts,
    initialData,
    initialValues,
    hideHamburger,
    portraitBanners,
    siteMap,
    content,
}: Props) {
    useForceScrollRestore();
    useScrollToTopOnRefresh();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const currentSegments = pathname.split('/').filter(Boolean);

    const segments = [...currentSegments];

    const allCountsOfEmirate = emiratesData?.reduce((acc, curr) => {
        acc += curr.count || 0;
        return acc;
    }, 0);

    const [clear, setClear] = useState(false);
    const [filterModel, setFilterModel] = useState(false);
    const [isOffPlan, setIsOffPlan] = useState(isOffplanValue);
    const [filters, setFilters] = useState<FiltersState>({
        page: 1,
        search: "",
        cities: initialValues?.cities,
        propertyType: initialValues?.propertyType,
        propertyCategoryStatus: initialValues?.propertyCategoryStatus || "all",
        emirate: initialValues?.emirate,
        completionType: initialValues?.completionType,
        handoverDate: {
            year: initialValues?.year,
            quarter: initialValues?.qtr,
        },
        paymentPlan: initialValues?.paymentPlan,
        furnishType: initialValues?.furnishied,
        discount: initialValues?.discount,
        propertyCategoryTypes: initialValues?.propertyCategoryType || 'off-plan-projects',


    });

    const { data: citiesData } = useFetchAllCityNamesQuery({ emirate: filters.emirate }, {
        skip: !!initialCities?.length && !filters.emirate
    });

    useEffect(() => {
        if (segments.includes('off-plan-projects')) {
            setIsOffPlan(true)
        }

    }, [segments]);

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
            { label: "All", value: "all", count: allCountsOfEmirate, slug: 'all' }, // Always first
            ...sortedOptions,
        ];
    }, []);

    const isExistPropertyCategoryType = segments.find((seg) =>
        propertyCategoryTypes.some((item: any) => item.value === seg)
    );

    const [isPropertyType, setIsPropertyType] = useState('');

    const [paginationHappened, setPaginationHappened] = useState(false)

    const handleSelect = useMemo(() => ({
        emirate: (option: any) => setFilters(prev => ({ ...prev, emirate: option?.slug || '' })),
        propertyType: (option: any) => setFilters(prev => ({ ...prev, propertyType: option?.value || '' })),
        propertyCategoryStatus: (option: any) => setFilters(prev => ({ ...prev, propertyCategoryStatus: option })),
        completionType: (option: any) => setFilters(prev => ({ ...prev, completionType: option })),
        propertyCategoryTypes: (option: any) => setFilters(prev => ({ ...prev, propertyCategoryTypes: option })),
        handoverDate: (data: any) => setFilters(prev => ({ ...prev, handoverDate: data })),
        projectType: (option: any) => setFilters(prev => ({ ...prev, projectType: option })),
        paymentPlan: (option: any) => setFilters(prev => ({ ...prev, paymentPlan: option?.value || '' })),
        furnishType: (option: any) => setFilters(prev => ({ ...prev, furnishType: option?.value || '' })),
        discount: (option: any) => setFilters(prev => ({ ...prev, discount: option?.value || '' })),
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
            { label: "All", value: "all", count: totalCities, slug: 'all' }, // <--- Add "All" option at the top
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

    const [debouncedSearch, setDebouncedSearch] = useState<any>(null);

    // Debounce search input
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(filters.search);
            // setFilters(prev => ({ ...prev, page: 1 }));
        }, 500);

        return () => clearTimeout(handler);
    }, [filters.search]);

    const deviceType = useDeviceType();

    const queryParams = useMemo(() => ({
        limit: 24,
        page: filters.page,
        ...(debouncedSearch && { search: debouncedSearch }),
        cities: filters.cities,
        ...(filters.propertyType?.length && { propertyType: filters.propertyType }),
        completionType: filters.completionType,
        paymentPlan: filters.paymentPlan,
        year: filters.handoverDate?.year,
        qtr: filters.handoverDate?.quarter,
        discount: filters.discount,
        propertyCategoryTypes: filters.propertyCategoryTypes,
        propertyCategoryStatus: filters.propertyCategoryStatus,
        furnishied: filters.furnishType,
        emirate: filters.emirate === 'all' ? '' : filters.emirate,
    }), [filters, debouncedSearch]);


    const { data, isLoading, isFetching } = useFetchAllProjectsQuery(queryParams, {
        refetchOnMountOrArgChange: true,
        refetchOnReconnect: true,
        refetchOnFocus: true,
        skip: false,
    });

    const projects: AllProjectsItems[] = data?.data || initialData?.data

    const pagination = data?.pagination || initialData?.pagination;

    const showHamburger = filters.page && filters.page > 1

    const isShowEmptyPages = propertyCategoryTypes.filter((i) => i.value !== 'off-plan-projects').some((item: any) => item.value === isExistPropertyCategoryType);

    const shouldSwapAds =
  propertyCategoryTypes
    .filter(i => i.value !== 'off-plan-projects')
    .some(item => item.value === isExistPropertyCategoryType)
  || (filters.page && filters?.page > 1);
    
    const handleFilterModal = useCallback(() => {

        setFilterModel(prev => !prev);

    }, []);


    function updateUrl({
        emirate,
        propertyFirst,
        propertySecond,

    }: {
        emirate?: string;
        propertyFirst?: string;
        propertySecond?: string;
    }) {

        const segments = pathname.split('/').filter(Boolean);

        const urlParams = new URLSearchParams(searchParams.toString());

        const findMatch = (list: any[], key: string, field = 'slug') =>
            list.find((item: any) => item[field] === key);

        const current = {
            emirate: segments.find((seg) => findMatch(emirateOptions, seg)),
            propertyFirst: segments.find((seg) => findMatch(propertyCategoryTypes, seg, 'value')),
            propertySecond: segments.find((seg) => findMatch(propertyCategoryStatus, seg, 'value')),
        };

        const cleanSegment = (v?: string) => (v && v !== 'all' ? v : '');

        const buildPath = [
            'buy',
            cleanSegment(emirate ?? current.emirate),
            cleanSegment(propertyFirst ?? current.propertyFirst),
            cleanSegment(propertySecond ?? current.propertySecond),
        ].filter(Boolean);


        const fullUrl = `/${buildPath.join('/')}${urlParams.toString() ? `?${urlParams}` : ''}`;

        window.history.pushState({}, '', fullUrl);
    }

    const propertyTypesCondition = !((filters?.propertyCategoryTypes === 'off-plan-land' && filters?.propertyCategoryStatus === 'residential') || (filters?.propertyCategoryTypes === 'off-plan-land' && filters?.propertyCategoryStatus === 'commercial') || (filters?.propertyCategoryTypes === 'off-plan-secondary' && filters?.propertyCategoryStatus === 'commercial') || (filters?.propertyCategoryTypes === 'off-plan-resale' && filters?.propertyCategoryStatus === 'commercial') || (filters?.propertyCategoryTypes === 'off-plan-projects' && filters?.propertyCategoryStatus === 'commercial'));
    const [showYearSelector, setShowYearSelector] = useState(false);
    const furnishTypesCondition = (!((filters?.propertyCategoryTypes === 'off-plan-land' && filters?.propertyCategoryStatus === 'residential') || (filters?.propertyCategoryTypes === 'off-plan-land' && filters?.propertyCategoryStatus === 'commercial')))

    const handleClear = useCallback(() => {

        setFilters({
            page: 1,
            search: "",
            cities: [],
            propertyCategoryStatus: "all",
            propertyCategoryTypes: "off-plan-projects",
            emirate: "all",
            completionType: "",
            handoverDate: {
                quarter: '',
                year: '',
            },
            paymentPlan: undefined,
            furnishType: "",
            discount: "",

        });

        setClear(true);

        setTimeout(() => setClear(false), 100);




    }, [setFilters]);




    const [EnquiryForm, setEnquiryForm] = useState({ status: false, id: '', count: 0 });

    const [searchText, setSearchText] = useState('');


    useEffect(() => {

        window.scrollTo({ top: 0, behavior: 'smooth' });

    }, [paginationHappened]);

    const totalPropertyTypesCounts = allCounts?.propertyTypes?.map(item => item?.count).reduce((a, b) => a + b, 0)

    const totalPropertyTypesCommercialCounts = (allCounts?.propertyTypes || [])
        .filter(item => ['officespace', 'shop', 'warehouse'].includes(item.name))
        .reduce((sum, item) => sum + (item.count || 0), 0);

    const totalPropertyTypesResidentailCounts = (allCounts?.propertyTypes || [])
        .filter(item => ['villa', 'apartment', 'penthouse', 'townhouse'].includes(item.name))
        .reduce((sum, item) => sum + (item.count || 0), 0);

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
                count:
                    isPropertyType === 'all' ? totalPropertyTypesCounts : isPropertyType === 'residential' ? totalPropertyTypesResidentailCounts : isPropertyType === 'commercial' ? totalPropertyTypesCommercialCounts : 0,

            },

        ],
        getAll: () => {
            return [...propertyTypesLists.default, ...propertyTypesLists.residential, ...propertyTypesLists.commercial]
        },
        getAllExcludeAll: () => {
            return [...propertyTypesLists.default, ...propertyTypesLists.residential, ...propertyTypesLists.commercial].filter(item => item.value !== 'all')
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

    const handleClick = (item: AllProjectsItems) => {

        const currency = searchParams.get('currency');

        const slug = item.slug;

        const queryString = currency ? `?currency=${currency}` : '';

        sessionStorage.setItem('scroll-position', window.scrollY.toString());

        router.push(`/projects/${slug}${queryString}`);

    };

    console.log(videoAds,'videoAds')

    const [height, setHeight] = useState(40);

    const { data: portraitBannerData } = useFetchAllPortraitBannersQuery({});

    const handleEnquiryFormClick = useCallback((item: any) => {

        setEnquiryForm({
            status: true,
            id: item._id,
            count: 1,
        });

    }, []);

    const loading = isFetching || isLoading


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

    const totalPages = pagination?.totalPages

    const totalRecords = pagination.totalRecords


    useEffect(() => {

        const t = setTimeout(() => {

            setFilters(p => ({ ...p, search: searchText }));

        }, 400);

        return () => clearTimeout(t);

    }, [searchText]);

    const handleChangeSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {

        setSearchText(e.target.value);

    }, []);

    useEffect(() => {
        if (clear) {
            const url = new URL(window.location.href);


            url.searchParams.delete('cities');
            url.searchParams.delete('pt');
            url.searchParams.delete('ct');
            url.searchParams.delete('y');
            url.searchParams.delete('q');
            url.searchParams.delete('ds');
            url.searchParams.delete('ft');
            url.searchParams.delete('pp');
            const newUrl = `/buy/dubai/off-plan-projects?${url.searchParams.toString()}`;
            window.history.pushState({}, '', newUrl);
        }


    }, [clear])



    useEffect(() => {
        const updateHeight = () => {
            if (window.innerWidth >= 1024) setHeight(260); // lg
            else if (window.innerWidth >= 640) setHeight(500); // md
            else setHeight(40); // sm
        };
        updateHeight();
        window.addEventListener('resize', updateHeight);
        return () => window.removeEventListener('resize', updateHeight);
    }, []);

    // console.log(isOffplanValue,'isOffplanValue')

    return (
        <>


            {/* {JSON.stringify(isOffPlan)} */}

            {/* {JSON.stringify(isShowEmptyPages)} */}


            <Container>



                <section className="  grid grid-cols-1 w-full  lg:grid-cols-[19.8%_9.5%_9.5%_37.5%_21%] gap-2">

                    <div className="md:h-[48px] h-10">

                        <SearchNew value={searchText} onChange={handleChangeSearch} placeholder="Search..." />

                    </div>




                    <div className="hidden lg:flex h-[48px]">
                        <SelectLatest
                            listContainerUlListContainerClassName="w-[200px]"
                            search
                            defaultValue={emirateOptions?.find((item: any) => item?.slug === initialValues?.emirate)}
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
                            defaultValueMultiple={cityOptions?.filter((item: any) => initialValues?.cities?.includes(item.slug))}
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

                        <div className=" h-10 w-full">
                            <SelectLatest
                                listContainerUlListContainerClassName="w-[200px]"
                                search
                                clearSelection={clear}
                                                            defaultValue={emirateOptions?.find((item: any) => item?.slug === initialValues?.emirate)}

                                label="Emirates"
                                options={emirateOptions}
                                onSelect={(e) => {
                                    const emirate = e?.slug ? e.slug : 'all';

                                    updateUrl({ emirate });

                                    handleSelect.emirate(e);

                                }}
                            />
                        </div>


                        <div className=" h-10 w-full">
                            <SelectLatest
                            defaultValueMultiple={cityOptions?.filter((item: any) => initialValues?.cities?.includes(item.slug))}

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
                    <div className="h-10 sm:h-[48px]">
                        <SwitchSelector
                            containerClassName="sm:!gap-1"
                            onSelect={(e) => {

                                updateUrl({ propertyFirst: e })

                                handleSelect.propertyCategoryTypes(e);



                            }}

                            defaultValue={filters.propertyCategoryTypes}
                            options={propertyCategoryTypes}

                        />
                    </div>



                    <div className="flex gap-2 h-10 sm:h-[48px]">
                        <SwitchSelector
                            containerClassName="sm:!gap-1"
                            onSelect={(e) => {



                                updateUrl({ propertySecond: e });

                                handleSelect.propertyCategoryStatus(e);

                                setIsPropertyType(e);
                            }

                            }
                            clearSelection={clear}
                            defaultValue={initialValues?.propertyCategoryStatus}
                            options={propertyCategoryStatus}
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
                        isShowEmptyPages ? 'h-[33px]' : 'h-[48px]'
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

                                    url.searchParams.set('pt', e?.value ?? '');

                                } else {

                                    url.searchParams.delete('pt');

                                }

                                const newUrl = `${url.pathname}?${url.searchParams.toString()}`;

                                window.history.pushState({}, '', newUrl);

                                handleSelect.propertyType(e)

                            }}
                            clearSelection={clear}
                            listContainerUlListContainerClassName="w-[200px]"

                        />
                    </div>




                    <div className={clsx("lg:flex-[30%]",

                        isShowEmptyPages ? 'h-[33px]' : 'h-[48px]'

                    )}>
                        <SwitchSelector
                            defaultValue={initialValues?.completionType}
                            onSelect={(e) => {

                                const url = new URL(window.location.href);

                                if (e == 'all') {

                                    url.searchParams.delete('ct');

                                } else {

                                    url.searchParams.set('ct', e ?? '');

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

                        isShowEmptyPages ? 'h-[33px]' : 'h-[48px]'

                    )}>

                        <ExpandableComponentDropdown
                            isOpen={(showYearSelector)}
                            onToggle={() => setShowYearSelector(prev => !prev)}
                            label={(filters.handoverDate?.year || filters.handoverDate?.quarter) ? (`${filters.handoverDate?.year}-${filters.handoverDate?.quarter}`) : "Handover"}
                            isSelected={false}
                            onClear={() => {
                                setShowYearSelector(false)
                                const url = new URL(window.location.href);
                                url.searchParams.delete('y');
                                url.searchParams.delete('q');
                                const newUrl = `${url.pathname}?${url.searchParams.toString()}`;
                                window.history.pushState({}, '', newUrl);
                                handleSelect.handoverDate({
                                    quarter: '',
                                    year: ''
                                })
                            }}
                            clear={clear}
                            customCloseControl={<button className="text-xs text-red-600">X</button>}
                        >
                            <SelectHandoverDate
                                // initialYear={filters.handoverDate?.year ? filters.handoverDate?.year : new Date().getFullYear()}
                                // initialQuarter={filters.handoverDate?.quarter ? filters.handoverDate?.quarter : "Q1"}


                                onDone={(year, quarter) => {
                                    const url = new URL(window.location.href);

                                    if (year) {
                                        url.searchParams.set('y', year + '');
                                    }

                                    if (quarter) {
                                        url.searchParams.set('q', quarter.toLowerCase());
                                    }

                                    const newUrl = `${url.pathname}?${url.searchParams.toString()}`;
                                    window.history.pushState({}, '', newUrl);

                                    handleSelect.handoverDate({ quarter, year })
                                }}
                                onClose={() => setShowYearSelector(false)}
                                reset={() => {
                                    setShowYearSelector(false)
                                    const url = new URL(window.location.href);
                                    url.searchParams.delete('y');
                                    url.searchParams.delete('q');
                                    const newUrl = `${url.pathname}?${url.searchParams.toString()}`;
                                    window.history.pushState({}, '', newUrl);
                                    handleSelect.handoverDate({
                                        quarter: '',
                                        year: ''
                                    })

                                }}

                                onChange={(year, quarter) => {

                                }}
                            />
                        </ExpandableComponentDropdown>

                    </div>

                    <div className={clsx("flex-[10%]",
                        isShowEmptyPages ? 'h-[33px]' : 'h-[48px]'
                    )}>

                        <SelectNew
                            clearSelection={clear}
                            className="w-[200px]"
                            defaultValue={filters.paymentPlan}
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
                            onSelect={(e) => {
                                const url = new URL(window.location.href);
                                if (e && e?.value !== 'all') {
                                    url.searchParams.set('pp', e.value);
                                } else {
                                    url.searchParams.delete('pp');
                                }
                                const newUrl = `${url.pathname}?${url.searchParams.toString()}`;
                                window.history.pushState({}, '', newUrl);
                                handleSelect.paymentPlan(e)
                            }}
                        />
                    </div>





                    <div className={clsx("flex-[7%]",
                        isShowEmptyPages ? 'h-[33px]' : 'h-[48px]'
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
                            onSelect={(e) => {
                                const url = new URL(window.location.href);
                                if (e && e.value !== 'all') {
                                    url.searchParams.set('ds', e.value);
                                } else {
                                    url.searchParams.delete('ds');
                                }
                                const newUrl = `${url.pathname}?${url.searchParams.toString()}`;
                                window.history.pushState({}, '', newUrl);
                                handleSelect.discount(e)
                            }}
                            defaultValue={filters.discount}
                        />
                    </div>



                    <div className={clsx("", furnishTypesCondition ? 'w-[140px]' : 'flex-[8%]',

                        isShowEmptyPages ? 'h-[33px]' : 'h-[48px]'

                    )}>

                        <SelectNew
                            clearSelection={clear}
                            className="w-[200px]"
                            label="Furnished Type"
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
                                label: "Un Furnished",
                                count: allCounts?.furnisheds?.find(item => item?.name === 'un-furnishing')?.count || 0,
                            },]}
                            onSelect={(e) => {
                                const url = new URL(window.location.href);
                                if (e && e.value) {
                                    url.searchParams.set('ft', e.value);
                                } else {
                                    url.searchParams.delete('ft');
                                }
                                const newUrl = `${url.pathname}?${url.searchParams.toString()}`;
                                window.history.pushState({}, '', newUrl);
                                handleSelect.furnishType(e)
                            }}
                            defaultValue={filters.furnishType}
                        />
                    </div>




                    <div onClick={() => handleClear()} className={clsx("flex cursor-pointer max-w-[120px] items-center gap-2", false ? 'h-[33px]' : 'h-[48px]')}>
                        <label className="text-[12px] cursor-pointer text-nowrap">Clear Filters</label>
                        <div className="bg-black cursor-pointer w-3.5 rounded-full h-3.5 flex justify-center items-center">
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
                    className={'pt-0'}
                >

                    <div className="mb-4 flex gap-2">
                        {!isShowEmptyPages ? <div className="flex-1 h-full  grid  md:gap-3 sm:grid-cols-2 lg:grid-cols-1">

                            {showHamburger && <div className={clsx("flex flex-col md:flex-row flex-1 items-start md:items-start w-full", true ? '' : 'hidden')}>

                                <BreadcampNavigation
                                
                                    title={`${propertyCategoryTypes.find(item => item.value === isExistPropertyCategoryType)?.label} :`}
                                    items={[
                                        {
                                            title: isMatchCity?.label === 'All' ? 'All Cities' : isMatchCity?.label || 'All Cities',
                                            link: isMatchCity?.label === 'All'
                                                ? '/cities'
                                                : `/cities`
                                        },
                                        {
                                            title: `${propertyCategoryTypes.find(item => item.value === isExistPropertyCategoryType)?.label || 'New projects'} for sale in ${isMatchCity?.value === 'all' ? 'UAE' : isMatchCity?.label || 'UAE'}`,
                                        }
                                    ]}
                                    
                                />

                                <div className="md:gap-3 flex flex-col">


                                    {/* <div className="flex gap-3 items-center justify-end text-xs w-72 font-normal font-poppins">
                                        <p>Sort by :</p>
                                        <div className="w-[150px]">
                                            <ToggleButton />
                                        </div>
                                    </div> */}

                                    <div className="hidden md:flex justify-end items-center">
                                        <p className='text-xs font-poppins font-normal text-nowrap'>{formatCount(projects.length)} Properties</p>
                                    </div>
                                </div>
                                {/* <p className='font-poppins font-normal text-[12px] text-nowrap w-fit text-[#333333] pt-2 md:pt-0'>{totalRecords ? `${parsePrice(totalRecords)} Properties Available` : 'No Properties Available'}</p> */}
                            </div>}


                            {showHamburger && <div className={clsx("pt-0 md:pt-1 pb-3 md:pb-0 ", true ? '' : 'hidden')}>

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

                            {(projects && projects.length ? false : loading) ? <>


                                {

                                    Array.from({ length: 24 }).map((item, index) => {
                                        return (
                                            <>
                                                <div className="lg:flex h-[260px] gap-2 hidden w-full ">

                                                    <div className="flex-[40%]  ">

                                                        <Skeleton
                                                            height="100%"
                                                            count={1}
                                                        />
                                                    </div>

                                                    <div className="relative flex-[60%] h-full ">


                                                        <Skeleton
                                                            height="80%"
                                                            count={1}
                                                        />

                                                        <div className="flex   gap-2 mt-1">


                                                            <div className="flex-1">
                                                                <Skeleton
                                                                    height={40}
                                                                    count={1}
                                                                />
                                                            </div>

                                                            <div className="flex-1">
                                                                <Skeleton
                                                                    height={40}
                                                                    count={1}
                                                                />
                                                            </div>
                                                        </div>

                                                    </div>


                                                </div>
                                            </>
                                        )
                                    })
                                }
                            </> :
                                (projects.length === 0) ? <NoDataFound /> : projects?.length && projects?.map((item, index) => (
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

                            }


                        </div> :
                            <FilterEmpty />
                        }



                        <div className={"w-full md:block hidden max-w-[301.5px]"}>

                            { !shouldSwapAds && (videoAds && videoAds.length > 0 ?
                                <div className={clsx("w-full mb-3 relative flex")}>
                                    <VideoPreview
                                        id={videoAds?.[0]?._id}
                                        alt={videoAds?.[0]?.name || ''}
                                        thumbnailUrl={videoAds?.[0]?.thumbnail?.webp?.url || ''}
                                        projectSlug={videoAds?.[0]?.projectDetails?.slug || ''}
                                        videoUrl={videoAds?.[0]?.videoFile?.url?.url || ''}
                                    />
                                </div> : <div className="w-full h-[250px] rounded bg-gray-50"></div>)
                            }




                            {<RecommendedText
                                title="Recommended For You"
                                items={shuffle(siteMap)?.slice(0, 6)}
                            />}

                            <div className="sticky top-3 left-0">

                                <Slider
                                    images={portraitBanners}
                                />

                                {<div className='mt-2'>
                                                                                       <RecommendedText title="Trending Areas" items={shuffle(siteMap)?.slice(0, 6)} />
                                  
                                    <RecommendedText
                                        title="Popular Searches"
                                        items={shuffle(siteMap)?.slice(0, 6)}
                                    />
                                </div>}



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
                handleSelect={handleSelect}
                pagination={pagination}
                allCounts={allCounts}
                emiratesData={emiratesData}
                filters={filters}
                resultProjects={() => {
                }}
                clear={clear}
                setIsPropertyType={setIsPropertyType}
                handleChangeCities={handleChangeCities}
                initialValues={initialValues}
                cityOptions={cityOptions}
                updateUrl={updateUrl}
                totalRecords={totalRecords}
                setFiltersHandler={setFilters}
                onClose={() => setFilterModel(false)}
                show={filterModel}
                isPropertyType={isPropertyType}
                propertyTypesLists={propertyTypesLists}
                emirateOptions={emirateOptions}
                handleClear={handleClear}
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
                className="w-full flex text-xs cursor-pointer items-center justify-between px-3 py-1.5 bg-white border border-[#DEDEDE] rounded"
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