'use client'
import { LOCAL_STORAGE_KEYS } from '@/api/storage';
import { useFetchAllCityNamesQuery } from '@/redux/cities/citiesApi';
import { useFetchAllEmirateNamesQuery } from '@/redux/emirates/emiratesApi';
import { useFetchAllPortraitBannersQuery } from '@/redux/portraitBannerAd/portraitBannerAdApi';
import { useFetchAllProjectsCountQuery, useFetchAllProjectsQuery } from '@/redux/project/projectApi';
import { AllProjectsItems } from '@/redux/project/types';
import { useViewAllSmallVideosQuery } from '@/redux/smallVideo/smallViewApi';
import { AllSmallVideoItems } from '@/redux/smallVideo/types';
import { AllWishlistItems } from '@/redux/wishlist/types';
import { useViewAllWishlistsQuery } from '@/redux/wishlist/wishlistApi';
import { setWishlist } from '@/redux/wishlistSlice/wishlistSlice';
import { shuffle } from '@/utils/shuffle';
import { useDeviceType } from '@/utils/useDeviceType';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { Suspense, useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch } from 'react-redux';
import Header from '../Header';
import Container from '../atom/Container/Container';
import SearchNew from '../SearchField/SearchNew';
import SelectLatest from '../SelectOption/SelectLatest';
import SelectNew from '../SelectOption/SelectNew';
import { SwitchSelector } from '../SelectOption';
import { CompletionTypes, FurnishTypes, productTypeOptionFirstItems, PropertyTypes, propertyTypeSecond } from '@/data';
import { HiOutlineAdjustmentsHorizontal } from 'react-icons/hi2';
import ExpandableComponentDropdown from '../ExpandableComponent/ExpandableComponent';
import clsx from 'clsx';
import { SelectHandoverDate } from '../SelectHandoverDate';
import { IoCloseOutline } from 'react-icons/io5';
import SectionDivider from '../atom/SectionDivider/SectionDivider';
import ProjectCard from '../ProjectCard/ProjectCard';
import CustomSlider from '../CustomSlider/CustomSlider';
import ProjectCardSkelton from '../ProjectCard/ProjectCardSkelton';
import VideoPreview from '@/app/home/VideoPreview';
import CustomSliderUi from '@/app/home/CustomSliderUi';
import Recommendations from '@/app/home/Recommendations';
import BottomBanner from '@/app/home/BottomBanner';
import MobileFooterBanner from '@/app/home/MobileFooterBanner';
import RecommendedText from '../RecomendedText/RecommendedText';
import MobileFilterOption from '@/app/home/MobileFilterOption';
import { Footer } from '../Footer';
import EnquiryFormModal from '../EnquiryFormModal/EnquiryFormModal';
import PaginationNew from '../PaginationNew/PaginationNew';
import { FiltersState } from '../types';
import Image from 'next/image';
import { big_white_logo_icon, ps_logo } from '@/app/assets';
import { useViewAllCountsQuery } from '@/redux/news/newsApi';
import { parsePrice } from '@/utils/parsePrice';
import { useForceScrollRestore, useScrollToTopOnRefresh } from '@/hooks/useScrollRestoration';
import BreadcampNavigation from '../BreadcampNavigation/BreadcampNavigation';
import LocationTags from '../LocationTags/LocationTags';
import SpaceWrapper from '../atom/SpaceWrapper/SpaceWrapper';
import pIcon from "@/app/assets/p-icon.png";
import { headers } from 'next/headers';
import { useCountryCode } from '@/utils/useCountryCode';
import dynamic from 'next/dynamic';
type PaymentPlan = {
    label?: string;
    value?: string;
};

interface UserData {
    _id: string;
    // Add more fields if needed
}



function HomePageFunction({ initialData }: { initialData: any }) {


    useForceScrollRestore();
    useScrollToTopOnRefresh();
    const [loading, setLoading] = useState(false)

    const [paginationHappened, setPaginationHappened] = useState(false)
    const deviceType = useDeviceType();

    const router = useRouter();

    const pathname = usePathname();

    const userDataString = useMemo(() => {
        return typeof window !== "undefined" ? localStorage.getItem(LOCAL_STORAGE_KEYS.USER_DATA) : null;
    }, []);


    const userId = useMemo(() => {
        if (!userDataString) return null;
        try {
            const parsed = JSON.parse(userDataString);
            return parsed?._id || null;
        } catch (err) {
            return null;
        }
    }, [userDataString]);


    const [wishlistData, setWishlistData] = useState<AllWishlistItems[]>();
    const { data: wishlistDataItem } = useViewAllWishlistsQuery(
        { userId },
        { skip: !userId } // <- only call if userId is available
    );

    const [smallVideoAds, setSmallVideoAds] = useState<AllSmallVideoItems[]>();

    const { data: smallVideoAdsResponse } = useViewAllSmallVideosQuery({});

    const dispatch = useDispatch();


    //   useScrollRestoration('home-scroll');


    useEffect(() => {
        if (wishlistDataItem?.data) {
            dispatch(setWishlist(wishlistDataItem?.data))
            setWishlistData(wishlistDataItem?.data)
        }

    }, [wishlistDataItem]);

    useEffect(() => {

        if (smallVideoAdsResponse?.data) {
            // console.log(smallVideoAdsResponse?.data, 'smallVideoAdsResponse')
            setSmallVideoAds(smallVideoAdsResponse?.data);
        }
    }, [smallVideoAdsResponse]);


    useEffect(() => {
        const today = new Date().toISOString().split('T')[0]
        const lastSeen = localStorage.getItem('splashLastSeenDate')

        if (lastSeen !== today) {
            setLoading(true)
            const timer = setTimeout(() => {
                setLoading(false)
                localStorage.setItem('splashLastSeenDate', today)
            }, 2000)
            return () => clearTimeout(timer)
        }
    }, []);

    // console.log(wishlistData, 'wishlistData')

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

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });

    }, [paginationHappened]);




    const [debouncedSearch, setDebouncedSearch] = useState<any>("");
    const [clear, setClear] = useState(false);
    const [EnquiryForm, setEnquiryForm] = useState({ status: false, id: '', count: 0 });
    const [filterModel, setFilterModel] = useState(false);
    const [showYearSelector, setShowYearSelector] = useState(false);

    // Debounce search input
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(filters.search);
            setFilters(prev => ({ ...prev, page: 1 }));
        }, 500);

        return () => clearTimeout(handler);
    }, [filters.search]);

    // Data fetching with memoized query params
    const queryParams = useMemo(() => ({
        limit: 24,
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


    const { data: allCounts } = useViewAllCountsQuery();
    const { data: allProjectsCounts } = useFetchAllProjectsCountQuery();
    const { data: emiratesData } = useFetchAllEmirateNamesQuery();
    const { data: portraitBannerData } = useFetchAllPortraitBannersQuery({});
    const { data: cities } = useFetchAllCityNamesQuery({ emirate: filters.emirate });
    const { data: projects } = useFetchAllProjectsQuery({ ...queryParams }, {
        skip: false,
        // @ts-expect-error — We know this line might throw a TS error due to initialData
        initialData,
    });
    // projects?.data
    // Memoized data mapping
    // const emirateOptions = useMemo(() => {
    //     const mappedOptions = emiratesData?.data.map((item) => ({
    //         label: item.name,
    //         value: item._id,
    //         count: 100,
    //     })) || [];

    //     return [
    //         { label: "All", value: "all" }, // <--- Add "All" option at the top
    //         ...mappedOptions,
    //     ];
    // }, [emiratesData]);

    const emirateOptions = useMemo(() => {
        const preferredOrder = ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ras Al Khaimah', 'Ajman', 'Umm Al-Quwain'];

        const mappedOptions = emiratesData?.data.map((item) => ({
            label: item.name,
            value: item._id,
            count: item.count,
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
    }, [emiratesData]);


    const cityOptions = useMemo(() => {
        const mappedOptions = cities?.data.map((item) => ({
            label: item.name,
            value: item.name,
            count: item.count,
        })) || [];

        return [
            { label: "All", value: "all", count: 0 }, // <--- Add "All" option at the top
            ...mappedOptions,
        ];
    }, [cities]);

    const banners = portraitBannerData?.data || [];
    const shuffledImages = useMemo(() => shuffle(banners), [banners]);

    const shuffleArray = (arr: any[]) => {
        const copy = [...arr];
        for (let i = copy.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [copy[i], copy[j]] = [copy[j], copy[i]];
        }
        return copy;
    };

    // Event Handlers
    const handleChangeSearch = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setFilters(prev => ({ ...prev, search: event.target.value }));
    }, []);

    const handleChangeCities = useCallback((option: any[]) => {
        if (option.length === 0) {
            setFilters(prev => ({ ...prev, cities: [] }));
            return;
        }
        setFilters(prev => ({ ...prev, cities: option.map((item) => item.value) }));
    }, []);

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


    const totalPages = projects?.pagination?.totalPages || 1;

    const searchParams = useSearchParams();
    const handleClick = (item: AllProjectsItems) => {

        const currency = searchParams.get('currency');

        const slug = item.slug;

        // Build query string with currency if available
        const queryString = currency ? `?currency=${currency}` : '';

        sessionStorage.setItem('scroll-position', window.scrollY.toString());
        router.push(`/projects/${slug}${queryString}`);
    };

    const handleEnquiryFormClick = useCallback((item: any) => {
        setEnquiryForm({
            status: true,
            id: item._id,
            count: 1,
        });
    }, []);

    const handleFilterModal = useCallback(() => {
        setFilterModel(prev => !prev);
    }, []);


    const handleClear = useCallback(() => {
        // alert('aler')
        setFilters({
            page: 1,
            search: "",
            cities: [],
            productTypeOptionFirst: '',
            // productTypeOptionLast: 'all',
            // developers: [],
            // facilities: [],
            propertyType: [],
            // propertyTypeSecond: "all",
            emirate: "",
            // completionType: "",
            // handoverDate: undefined,
            // projectType: 'off-plan-projects',
            // paymentPlan: undefined,
            // furnishType: "",
            // discount: "",
            // bedAndBath: '',
            // maxPrice: '',
            // minPrice: '',
            // maxSqft: '',
            // minSqft: '',
            // bath: '',
            // beds: ''
            // ,
        });
        setClear(true);
        setTimeout(() => setClear(false), 100);
    }, []);


    const [allProjects, setAllProjects] = useState<AllProjectsItems[]>();
    const propertyTypesCondition = !((filters?.projectType === 'off-plan-land' && filters?.propertyTypeSecond === 'residential') || (filters?.projectType === 'off-plan-land' && filters?.propertyTypeSecond === 'commercial') || (filters?.projectType === 'off-plan-secondary' && filters?.propertyTypeSecond === 'commercial') || (filters?.projectType === 'off-plan-resale' && filters?.propertyTypeSecond === 'commercial') || (filters?.projectType === 'off-plan-projects' && filters?.propertyTypeSecond === 'commercial'));
    const furnishTypesCondition = (!((filters?.projectType === 'off-plan-land' && filters?.propertyTypeSecond === 'residential') || (filters?.projectType === 'off-plan-land' && filters?.propertyTypeSecond === 'commercial')))


    useEffect(() => {
        if (projects?.data) {
            setAllProjects(projects?.data);
        }
    }, [projects]);



    const [defaultEmirate, setDefaultEmirate] = useState<string>('');
    const [defaultCities, setDefaultCities] = useState<any>('');
    const [defaultPropertyType, setDefaultPropertyType] = useState<string>('');
    const [defaultProjectStage, setDefaultProjectStage] = useState<string>('');
    const [defaultCompletionType, setDefaultCompletionType] = useState<string>('');

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const page = urlParams.get('page');

        if (page) {
            setFilters(prev => ({ ...prev, page: parseInt(page) }))
        }
    }, [filters.page]);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const propertyType = urlParams.get('property-type');
        const emirate = urlParams.get('emirate');
        const cities = urlParams.get('cities');
        const toConvertedCitiesParams = cities?.split(',')
        const completionType = urlParams.get('completion-type') ? urlParams.get('completion-type') : 'all';



        if (propertyType) {
            setDefaultPropertyType(propertyType)
        }
        if (emirate) {
            setDefaultEmirate(emirate)
        }
        if (toConvertedCitiesParams) {
            setDefaultCities(toConvertedCitiesParams)
        }

        if (completionType) {
            setDefaultCompletionType(completionType)
        }


    }, []);




    useEffect(() => {
        if (pathname === '/') {
            setDefaultProjectStage('all')
        }
        function setRealVH() {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        }
        window.addEventListener('resize', setRealVH);

    }, []);




    if (loading) {
        return (
            <div className="flex items-center justify-center h-full bg-black" style={{ height: 'calc(var(--vh, 1vh) * 100)' }}>
                <div className="relative animate-pulse sm:block hidden w-full max-w-[320px] sm:max-w-[420px] md:max-w-[500px] lg:max-w-[580.5px] aspect-[574.5/140.5] p-4 sm:p-0">
                    <Image width={590} height={140} src={big_white_logo_icon} alt="logo" />
                </div>


                <div className="relative animate-pulse block sm:hidden w-full max-w-[320px] sm:max-w-[420px]  p-4 sm:p-0">
                    <Image width={300} height={140} src={pIcon} alt="property seller logo" />
                </div>
            </div>
        )
    }


    return (

        <>
            <main>



                <div className=" min-h-screen  w-full lg:overflow-visible font-[family-name:var(--font-geist-sans)]">
                    <Header
                    logoSection={
                                  <Image src={ps_logo.src} alt="" width={140} height={50} className='object-contain h-full  max-w-[200px] w-full' />
                        
                    }
                    />

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
                                    defaultValue={emirateOptions?.find((item) => item?.label === defaultEmirate)}
                                    clearSelection={clear}
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



                            <div className="hidden lg:flex h-[48px]">
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
                            {productTypeOptionFirstItems.length > 0 ? <div className="h-[40px] sm:h-[48px]">
                                <SwitchSelector
                                    containerClassName="sm:!gap-1"
                                    onSelect={(e) => {
                                        const url = new URL(window.location.href);
                                        const searchParams = url.search;
                                        handleSelect.projectTypeFirst(e);

                                        let path = '/';

                                        if (e === 'off-plan-projects') {
                                            return;
                                        }

                                        switch (e) {
                                            case 'off-plan-resale':
                                                path = '/off-plan-resale';
                                                break;
                                            case 'off-plan-secondary':
                                                path = '/secondary';
                                                break;
                                            case 'off-plan-land':
                                                path = '/land';
                                                break;
                                        }



                                        window.location.href = `${path}${searchParams}`;


                                    }}
                                    defaultValue={productTypeOptionFirstItems?.[0]?.value}
                                    options={productTypeOptionFirstItems}

                                />
                            </div> : <div className="w-full h-full bg-gray-50"></div>}



                            <div className="flex gap-2 h-[40px] sm:h-[48px]">
                                <SwitchSelector
                                    containerClassName="sm:!gap-1"
                                    onSelect={(e) => {
                                        const url = new URL(window.location.href);
                                        const searchParams = url.search;
                                        handleSelect.projectTypeLast(e);

                                        let path = '/';

                                        if (e === 'all') {
                                            return;
                                        }

                                        switch (e) {
                                            case 'residential':
                                                if (pathname === '/') {
                                                    path = '/off-plan-projects/residential';
                                                }

                                                break;
                                            case 'commercial':
                                                if (pathname === '/') {
                                                    path = '/off-plan-projects/commercial';
                                                }

                                                break;

                                        }



                                        window.location.href = `${path}${searchParams}`;


                                    }

                                    }
                                    // onSelect={handleSelect.propertyTypeSecond}
                                    defaultValue={propertyTypeSecond[0].value}
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
                                filters?.page && filters?.page > 1 ? 'h-[33px]' : 'h-[48px]'
                            )}>

                                <SelectLatest
                                    label="Property Types"
                                    options={[{
                                        value: "all",
                                        label: "All",
                                        count: 0,

                                    }, {
                                        value: "villa",
                                        label: "Villa",
                                        count: allCounts?.data?.propertyTypes?.find(item => item?.propertyType === 'villa')?.count || 0,

                                    },
                                    {
                                        value: "apartment",
                                        label: "Apartment",
                                        count: allCounts?.data?.propertyTypes?.find(item => item?.propertyType === 'apartment')?.count || 0,

                                    },
                                    {
                                        value: "penthouse",
                                        label: "Penthouse",
                                        count: allCounts?.data?.propertyTypes?.find(item => item?.propertyType === 'penthouse')?.count || 0,

                                    },
                                    {
                                        value: "townhouse",
                                        label: "Townhouse",
                                        count: allCounts?.data?.propertyTypes?.find(item => item?.propertyType === 'townhouse')?.count || 0,

                                    }]}
                                    onSelect={(e) => {
                                        const url = new URL(window.location.href);
                                        if (e?.value) {
                                            url.searchParams.set('property-type', e?.label ?? '');
                                        } else {
                                            url.searchParams.delete('property-type');
                                        }
                                        const newUrl = `${url.pathname}?${url.searchParams.toString()}`;
                                        window.history.pushState({}, '', newUrl);
                                        handleSelect.propertyType(e)
                                    }}
                                    clearSelection={clear}
                                    defaultValue={PropertyTypes?.find((item) => item?.label === defaultPropertyType)}
                                    listContainerUlListContainerClassName="w-[200px]"

                                />
                            </div>




                            <div className={clsx("lg:flex-[30%]",

                                filters?.page && filters?.page > 1 ? 'h-[33px]' : 'h-[48px]'

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

                                filters?.page && filters?.page > 1 ? 'h-[33px]' : 'h-[48px]'

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
                                filters?.page && filters?.page > 1 ? 'h-[33px]' : 'h-[48px]'


                            )}>

                                <SelectNew
                                    clearSelection={clear}
                                    className="w-[200px]"
                                    label="Payment Plan"
                                    options={[{
                                        value: "all",
                                        label: "All",
                                    }, {
                                        value: "on-handover",
                                        label: "On Handover",
                                        count: allCounts?.data?.paymentPlans?.find(item => item?.paymentPlan === 'on-handover')?.count || 0,
                                    },
                                    {
                                        value: "post-handover",
                                        label: "Post Handover",
                                        count: allCounts?.data?.paymentPlans?.find(item => item?.paymentPlan === 'post-handover')?.count || 0,
                                    },]}
                                    onSelect={handleSelect.paymentPlan}
                                />
                            </div>





                            <div className={clsx("flex-[7%]",

                                filters?.page && filters?.page > 1 ? 'h-[33px]' : 'h-[48px]'

                            )}>

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
                                        count: allCounts?.data?.discount?.find(item => item?.discount === 'with-discount')?.count || 0,
                                    },
                                    {
                                        value: "without-discount",
                                        label: "Without Discount",
                                        count: allCounts?.data?.discount?.find(item => item?.discount === 'without-discount')?.count || 0,

                                    },]}
                                    onSelect={handleSelect.discount}
                                />
                            </div>



                            <div className={clsx("", furnishTypesCondition ? 'w-[140px]' : 'flex-[8%]',

                                filters?.page && filters?.page > 1 ? 'h-[33px]' : 'h-[48px]'

                            )}>

                                <SelectNew
                                    clearSelection={clear}
                                    className="w-[200px]"
                                    label="Furnish Type"
                                    options={FurnishTypes}
                                    onSelect={handleSelect.furnishType}
                                />
                            </div>




                            <div onClick={() => handleClear()} className="flex cursor-pointer max-w-[120px] h-[48px] items-center gap-2">
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
                            className={filters.page && filters.page > 1 ? 'pt-[10px]' : 'pt-[0px]'}
                        >

                            <div className="mb-4 flex gap-2">
                                <div className="flex-1 h-full  grid gap-3 sm:grid-cols-2 lg:grid-cols-1">

                                    {/* Breadcrumbs navigation link */}
                                    {filters.page && filters.page > 1 && <div className={clsx("flex flex-col md:flex-row flex-1 items-start md:items-center w-full", filters?.page && filters?.page >= 1 ? '' : 'hidden')}>

                                        <BreadcampNavigation
                                            title='Offplan Projects :'
                                            items={[
                                                {
                                                    title: filters?.cities && filters?.cities?.length > 0 ? filters?.cities?.join(', ') : 'All Cities',

                                                },
                                                {
                                                    title: 'Off plan Project Residential & Commercial',
                                                }
                                            ]}
                                        />
                                        <p className='font-poppins font-normal text-[12px] text-nowrap w-fit text-[#333333] pt-2 md:pt-0'>{allProjectsCounts?.data?.[0]?.count ? parsePrice(allProjectsCounts?.data?.[0]?.count) : 0} Properties Available</p>
                                    </div>}


                                    {/* Location link */}
                                    {filters.page && filters.page > 1 && <div className={clsx("pt-[24px]", filters?.page && filters?.page >= 1 ? '' : 'hidden')}>

                                        <LocationTags

                                            // data={[{ location: 'Dubai', count: 100 }, { location: 'Abu Dhabi', count: 200 },
                                            // { location: 'Sharjah', count: 300 },
                                            // { location: 'Sharjah', count: 300 }
                                            // ]}

                                            data={
                                                cities?.data?.slice(0, 4).map((item) => ({
                                                    location: item.name,
                                                    count: item.count,
                                                })) || []
                                            }
                                        />

                                    </div>}


                                    {/* projects */}
                                    {allProjects ? (
                                        allProjects?.map((item, index) => (
                                            <React.Fragment key={index}>
                                                <ProjectCard
                                                    navigateDetailsButton={true}
                                                    item={item}
                                                    handleClick={handleClick}
                                                    handleEnquiryFormClick={handleEnquiryFormClick}
                                                />

                                                {/* Add separator after every 5 items */}
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
                                </div>


                                <div className={"w-full md:block hidden max-w-[301.5px]"}>

                                    {filters.page && filters.page <= 1 && (smallVideoAds && smallVideoAds.length > 0 ?
                                        <div className={clsx("w-full mb-[12px] relative flex")}>
                                            {/* <div className={clsx("w-full mb-[12px] relative",filters?.page && filters?.page > 1 ? 'hidden':'flex')}> */}
                                            <VideoPreview
                                                projectSlug={smallVideoAds?.[0]?.projectDetails?.slug || ''}
                                                src={smallVideoAds?.[0]?.videoFile?.secure_url || ''}
                                            />
                                        </div> : <div className="w-full h-[250px] rounded bg-gray-50"></div>)
                                    }



                                    {filters.page && filters.page > 1 && <RecommendedText
                                        title="Recommended For You"
                                         items={[
        'Smart Picks in Dubai’s Fastest-Growing Zones',
        'Handpicked Homes with High ROI Potential',
        'Investor-Friendly Properties You’ll Love',
        'Move-In Ready Units in Prime Locations',
        'Top-Rated Listings in Family-Friendly Areas',
    ]}
                                    />}

                                    <div className="sticky top-3 left-0">

                                        <CustomSliderUi
                                            shuffledImages={shuffledImages}
                                        />
                                        {filters.page && filters.page === 1 && <Recommendations />}


                                        {filters.page && filters.page > 1 && <>
                                            <RecommendedText
                                                title="Recommended For You"
                                              items={[
        'Smart Picks in Dubai’s Fastest-Growing Zones',
        'Handpicked Homes with High ROI Potential',
        'Investor-Friendly Properties You’ll Love',
        'Move-In Ready Units in Prime Locations',
        'Top-Rated Listings in Family-Friendly Areas',
    ]}
                                            />
                                            <RecommendedText
                                                title="Popular Searches"
                                             items={[
        'Downtown Dubai: Iconic City Living',
        'Dubai Marina: Waterfront Lifestyle at Its Best',
        'Business Bay: Where Work Meets Luxury',
        'Yas Island, Abu Dhabi: Island Living Redefined',
        'Jumeirah Village Circle: Affordable Modern Homes',
        'Al Reem Island, Abu Dhabi: Urban Peace',
    ]}
                                            />
                                        </>}



                                    </div>







                                </div>
                            </div>
                        </SpaceWrapper>
                    </Container>





                </div>



                {/* Pagination code */}

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
                            maxVisiblePages={deviceType === 'mobile' ? 4 : 8} />



                        <div className="text-[10.5px] mt-[8.25px] flex justify-center items-center font-normal font-poppins text-[#767676]">{filters.page} To {totalPages} of {allProjectsCounts?.data?.[0]?.count ? parsePrice(allProjectsCounts?.data?.[0]?.count) : 0} Listings</div>
                    </div>
                </Container>




                <SectionDivider
                    containerClassName="mt-[45.75px]"
                    lineClassName="h-[1px] hidden sm:block w-full bg-[#DEDEDE]"
                />


                <BottomBanner />

                {/* Video ad son mobile */}
                {filters.page && filters.page <= 1 && smallVideoAds && smallVideoAds.length > 0 &&
                    <Container>
                        <div className="w-full mb-[35px] relative flex sm:hidden">
                            <VideoPreview
                                projectSlug={smallVideoAds?.[0]?.projectDetails?.slug || ''}

                                src={smallVideoAds?.[0]?.videoFile?.secure_url || ''}
                            />
                        </div>
                    </Container>
                }


                {/* Mobile Footer Banner */}
                <MobileFooterBanner />


                <div className="px-5 flex sm:hidden lg:px-8 mt-[16px]">

                    <RecommendedText
                        title="Recommended For You"
                         items={[
        'Smart Picks in Dubai’s Fastest-Growing Zones',
        'Handpicked Homes with High ROI Potential',
        'Investor-Friendly Properties You’ll Love',
        'Move-In Ready Units in Prime Locations',
        'Top-Rated Listings in Family-Friendly Areas',
    ]}
                    />
                </div>


                <MobileFilterOption
                    bathroomsRange={filters.page && filters.page > 1 ? true : false}

                    resultProjects={() => {
                        setAllProjects(projects?.data);
                    }}
                    setFiltersHandler={setFilters}
                    onClose={() => setFilterModel(false)}
                    show={filterModel}
                />



                <Footer />




            </main>


            <EnquiryFormModal
                EnquiryForm={EnquiryForm}
                setEnquiryForm={setEnquiryForm}
            />

        </>
    )
}


function HomePage(props: { initialData: any }) {
    return (
        <Suspense>
            <HomePageFunction {...props} />
        </Suspense>
    );
}

export default HomePage;