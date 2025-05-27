'use client';

import React, { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useRouter } from 'next/navigation';

import Header from "@/components/Header";
import SearchInput from "@/components/SearchField/Search";
import { SelectHandoverDate } from "@/components/SelectHandoverDate";
import { SelectOption, SwitchSelector } from "@/components/SelectOption";
import ExpandableComponentDropdown from "@/components/ExpandableComponent/ExpandableComponent";
import ProjectCard from "@/components/ProjectCard/ProjectCard";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";

import { useFetchAllCityNamesQuery } from "@/redux/cities/citiesApi";
import { useFetchAllEmirateNamesQuery } from "@/redux/emirates/emiratesApi";
import { useFetchAllProjectsQuery } from "@/redux/project/projectApi";
import { IoCloseOutline } from "react-icons/io5";
import MobileFooterBanner from "./MobileFooterBanner"
import { AllProjectsItems } from "@/redux/project/types";
import {
    CompletionTypes,
    DiscountType,
    FurnishTypes,
    PaymentPlan,
    PropertyTypes,
    productTypeOptionFirstItems,
    propertyTypeSecond,
} from "@/data";

import Modal from "@/components/Modal/Modal";
import ModalForm from "@/components/EnquiryForm/ModalForm";
import RegistrationSuccess from "@/components/EnquiryForm/RegistrationSuccess";
import ProjectCardSkelton from "@/components/ProjectCard/ProjectCardSkelton";
import { useFetchAllPortraitBannersQuery } from "@/redux/portraitBannerAd/portraitBannerAdApi";
import { shuffle } from "@/utils/shuffle";
import { Footer } from "@/components/Footer";
import RangeCalculator from "./RangeCalculator";
import AreaRangeInput from "./RangeArea";
import BedBathSelector from "./BedBathSelector";
import Recommendations from "./Recommendations";
import CustomSliderUi from "./CustomSliderUi";
import { useViewAllWishlistsQuery } from "@/redux/wishlist/wishlistApi";
import { LOCAL_STORAGE_KEYS } from "@/api/storage";
import { AllWishlistItems } from "@/redux/wishlist/types";
import { useDispatch } from "react-redux";
import { setWishlist } from "@/redux/wishlistSlice/wishlistSlice";
import clsx from "clsx";
import VideoPreview from "./VideoPreview";
import { useViewAllSmallVideosQuery } from "@/redux/smallVideo/smallViewApi";
import { AllSmallVideoItems } from "@/redux/smallVideo/types";
import BottomBanner from "./BottomBanner";
import RecommendedText from "@/components/RecomendedText/RecommendedText";
import Container from "@/components/atom/Container/Container";
import SectionDivider from "@/components/atom/SectionDivider/SectionDivider";
import SearchNew from "@/components/SearchField/SearchNew";
import SelectNew from "@/components/SelectOption/SelectNew";
import SelectNewMultiple from "@/components/SelectOption/SelectNewMultiple";
import MobileFilterOption from "./MobileFilterOption";
import { useDeviceType } from "@/utils/useDeviceType";
import { usePagination } from "@/utils/usePagination";
import PaginationNew from "@/components/PaginationNew/PaginationNew";
import AlreadyEnquired from "@/components/EnquiryForm/AlreadyEnquired";
import CustomSlider from "@/components/CustomSlider/CustomSlider";

type FiltersState = {
    developers?: string[];
    facilities?: string[];
    propertyTypeSecond?: string;
    productTypeOptionFirst?: string;
    productTypeOptionLast?: string;
    emirate?: string;
    handoverDate?: HandoverDate;
    projectType?: string;
    furnishType?: string;
    bedAndBath?: string;
    minSqft?: string;
    maxSqft?: string;
    beds?: string;
    bath?: string;


    page?: number,
    limit?: number,
    search?: string,
    propertyType?: string[],
    propertyTypes?: string,
    completionType?: string,
    furnishing?: string,
    cities?: string[],
    projectTypeLast?: string
    year?: number | '',
    qtr?: string,
    paymentPlan?: string,
    discount?: string,
    maxPrice?: string,
    minPrice?: string,
};

type HandoverDate = {
    year?: number | "";
    quarter?: string | "";
};

type PaymentPlan = {
    label?: string;
    value?: string;
};

interface UserData {
    _id: string;
    // Add more fields if needed
}


// Home Component
export default function HomePage() {
    const deviceType = useDeviceType();

    const router = useRouter();

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




    useEffect(() => {
        if (wishlistDataItem?.data) {
            dispatch(setWishlist(wishlistDataItem?.data))
            setWishlistData(wishlistDataItem?.data)
        }

        if (smallVideoAdsResponse?.data) {
            console.log(smallVideoAdsResponse?.data, 'smallVideoAdsResponse')
            setSmallVideoAds(smallVideoAdsResponse?.data);
        }
    }, [wishlistDataItem, smallVideoAdsResponse]);


    console.log(wishlistData, 'wishlistData')

    const [filters, setFilters] = useState<FiltersState>({
        page: 1,
        search: "",
        cities: [],
        developers: [],
        facilities: [],
        // propertyType: [],
        // propertyTypes: 'all',
        propertyTypeSecond: "all",
        emirate: "",
        completionType: "",
        handoverDate: undefined,
        // projectType: "off-plan-projects",
        paymentPlan: undefined,
        furnishType: "",
        discount: "",
        bedAndBath: "",
        minPrice: '',
        maxPrice: '',
        minSqft: "",
        maxSqft: "",
        productTypeOptionFirst: "off-plan-projects",
        beds: "",
        bath: "",
    });

    const [debouncedSearch, setDebouncedSearch] = useState<any>("");
    const [clear, setClear] = useState(false);
    const [EnquiryForm, setEnquiryForm] = useState({ status: false, id: '', count: 0 });
    const [filterModel, setFilterModel] = useState(false);
    const [showYearSelector, setShowYearSelector] = useState(false);
    const [rangeCalculator, setRangeCalculator] = useState(false);
    const [areaRange, setShowAreaRange] = useState(false);
    const [bedsAndBath, setBedsAndBath] = useState(false);

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
        projectTypeFirst: filters.projectType,
        projectTypeLast: filters.propertyTypeSecond,
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


    const { data: emiratesData } = useFetchAllEmirateNamesQuery();
    const { data: portraitBannerData } = useFetchAllPortraitBannersQuery({});
    const { data: cities } = useFetchAllCityNamesQuery({ emirate: filters.emirate });
    const { data: projects } = useFetchAllProjectsQuery(queryParams);
    // projects?.data
    // Memoized data mapping
    const emirateOptions = useMemo(() => {
        const mappedOptions = emiratesData?.data.map((item) => ({
            label: item.name,
            value: item._id,
            count: 100,
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
            count: 100,
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


    const [showBedBath, setShowBedBath] = useState(false);
    const totalPages = projects?.pagination?.totalPages || 1;

    const handleClick = useCallback((item: AllProjectsItems) => {
        router.push(`/projects/${item.slug}`);
    }, [router]);

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
    const propertyTypesCondition = !((filters.projectType === 'off-plan-land' && filters.propertyTypeSecond === 'residential') || (filters.projectType === 'off-plan-land' && filters.propertyTypeSecond === 'commercial') || (filters.projectType === 'off-plan-secondary' && filters.propertyTypeSecond === 'commercial') || (filters.projectType === 'off-plan-resale' && filters.propertyTypeSecond === 'commercial') || (filters.projectType === 'off-plan-projects' && filters.propertyTypeSecond === 'commercial'));
    const bedAndBathCondition = ((filters.projectType === 'off-plan-secondary' && filters.propertyTypeSecond === 'residential') || (filters.projectType === 'off-plan-resale' && filters.propertyTypeSecond === 'residential'))
    const furnishTypesCondition = (!((filters.projectType === 'off-plan-land' && filters.propertyTypeSecond === 'residential') || (filters.projectType === 'off-plan-land' && filters.propertyTypeSecond === 'commercial')))

    const handleFilterChanges = (item: AllProjectsItems[]) => {
        setAllProjects(item);
    }

    useEffect(() => {
        if (projects?.data) {
            setAllProjects(projects?.data);
        }
    }, [projects]);




    const [currentPage, setCurrentPage] = useState(1); // Let's say 2 is active
    // const totalItems = 100;
    // const itemsPerPage = 10;
    // const maxVisiblePages = 4;

    // const { pages, totalPages } = usePagination({
    //     totalItems,
    //     itemsPerPage,
    //     currentPage,
    //     maxVisiblePages,
    //   });
    return (
        <>

            <main>

                <div className=" min-h-screen  w-full lg:overflow-visible font-[family-name:var(--font-geist-sans)]">
                    <Header />

                    <Container>


                        <section className="  grid grid-cols-1 w-full  lg:grid-cols-[19.8%_9.5%_9.5%_36.5%_22%] gap-2">

                            {/* <div className="h-[50px]">
                            <SearchInput
                                value={filters?.search || ''}
                                onChange={handleChangeSearch}
                                placeholder="Search..."
                            />
                        </div> */}


                            <div className="md:h-[50px] h-[45px]">
                                <SearchNew
                                    value={filters?.search || ''}
                                    onChange={handleChangeSearch}
                                    placeholder="Search..."
                                />
                            </div>


                            {/* Done */}
                            {/* Desktop and Laptop */}
                            <div className="hidden lg:flex h-[48px]">
                                <SelectNew
                                    className="w-[200px]"
                                    search
                                    clearSelection={clear}
                                    label="Emirates"
                                    options={emirateOptions}
                                    onSelect={handleSelect.emirate}
                                />
                            </div>



                            {/* Done */}
                            <div className="hidden lg:flex h-[48px]">
                                <SelectNewMultiple
                                    search
                                    clearSelection={clear}
                                    className="w-[220px]"
                                    label="Cities"
                                    options={cityOptions}
                                    onSelect={handleChangeCities}
                                />
                            </div>









                            {/* Mobile */}
                            <div className="flex lg:hidden w-full gap-2">

                                <div className=" h-[40px] w-full">
                                    <SelectNew
                                        className="w-[200px]"
                                        search

                                        // clearSelection={clear}
                                        label="Emirates"
                                        options={emirateOptions}
                                        onSelect={handleSelect.emirate}
                                    />
                                </div>


                                <div className=" h-[40px] w-full">
                                    <SelectNewMultiple
                                        search
                                        // clearSelection={clear}
                                        className="w-[220px]  sm:!left-0 !-left-14 "
                                        label="Cities"
                                        options={cityOptions}
                                        onSelect={handleChangeCities}
                                    />
                                </div>

                            </div>


                            {/* Done */}
                            {productTypeOptionFirstItems.length > 0 ? <div className="h-[45px] sm:h-[50px]">
                                <SwitchSelector
                                    onSelect={handleSelect.productTypeOptionFirst}
                                    defaultValue={filters.productTypeOptionFirst}
                                    options={productTypeOptionFirstItems}

                                />
                            </div> : <div className="w-full h-full bg-gray-50"></div>}



                            <div className="flex gap-2 h-[45px] sm:h-[50px]">
                                <SwitchSelector
                                    onSelect={handleSelect.propertyTypeSecond}
                                    defaultValue={filters.propertyTypeSecond}
                                    options={propertyTypeSecond}
                                />
                                <button onClick={handleFilterModal} className="bg-red-600/10 rounded flex justify-center items-center  border-none w-[55px] lg:hidden h-full">
                                    {/* <Image
                                        src={filter_icon}
                                        className=" object-cover"
                                        alt="filter"
                                        width={18}
                                        height={18}

                                    /> */}
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

                            {((filters.projectType === 'off-plan-land' && filters.propertyTypeSecond === 'residential') || (filters.projectType === 'off-plan-land' && filters.propertyTypeSecond === 'commercial') || (filters.projectType === 'off-plan-secondary' && filters.propertyTypeSecond === 'commercial' || (filters.projectType === 'off-plan-secondary' && filters.propertyTypeSecond === 'residential') || (filters.projectType === 'off-plan-resale' && filters.propertyTypeSecond === 'commercial') || (filters.projectType === 'off-plan-resale' && filters.propertyTypeSecond === 'residential'))) && <div className="h-[50px]">

                                <ExpandableComponentDropdown
                                    // isOpen={true}
                                    isOpen={rangeCalculator}
                                    onToggle={() => setRangeCalculator(prev => !prev)}
                                    label="Price"
                                    isSelected={false}
                                    customCloseControl={<button className="text-xs text-red-600">X</button>}
                                >
                                    <RangeCalculator
                                        wrapperClassName=""
                                        onDone={(minValue, maxValue) => {
                                            handleSelect.maxPrice(maxValue);
                                            handleSelect.minPrice(minValue);
                                        }}
                                        onClose={() => setRangeCalculator(prev => !prev)}

                                    />
                                </ExpandableComponentDropdown>

                            </div>}

                            {((filters.projectType === 'off-plan-land' && filters.propertyTypeSecond === 'residential') || (filters.projectType === 'off-plan-land' && filters.propertyTypeSecond === 'commercial') || (filters.projectType === 'off-plan-secondary' && filters.propertyTypeSecond === 'commercial') || (filters.projectType === 'off-plan-secondary' && filters.propertyTypeSecond === 'residential') || (filters.projectType === 'off-plan-resale' && filters.propertyTypeSecond === 'commercial') || (filters.projectType === 'off-plan-resale' && filters.propertyTypeSecond === 'residential')) && <div className=" w-[100px]  h-[50px]">

                                <ExpandableComponentDropdown
                                    isOpen={areaRange}
                                    onToggle={() => setShowAreaRange(prev => !prev)}
                                    label="Sqft"
                                    isSelected={false}

                                    onClear={() => console.log("Cleared")}
                                    customCloseControl={<button className="text-xs text-red-600">X</button>}
                                >
                                    <AreaRangeInput
                                        onClose={() => setShowAreaRange(prev => !prev)}
                                        onDone={(minValue, maxValue) => {
                                            handleSelect.minSqft(minValue)
                                            handleSelect.maxSqft(maxValue)
                                        }}

                                    />

                                </ExpandableComponentDropdown>

                            </div>}



                            {/* Done */}
                            {propertyTypesCondition && <div className={clsx(`h-[50px]`, propertyTypesCondition ? 'w-[150px]' : 'flex-[8%]')}>

                                <SelectNew
                                    // clearSelection={clear}
                                    className="w-[200px]"
                                    label="Property Types"
                                    options={PropertyTypes}
                                    onSelect={handleSelect.propertyType}
                                />
                            </div>}




                            {!((filters.projectType === 'off-plan-land' && filters.propertyTypeSecond === 'residential') || (filters.projectType === 'off-plan-land' && filters.propertyTypeSecond === 'commercial') || (filters.projectType === 'off-plan-secondary' && filters.propertyTypeSecond === 'commercial') || (filters.projectType === 'off-plan-secondary' && filters.propertyTypeSecond === 'residential') || (filters.projectType === 'off-plan-resale' && filters.propertyTypeSecond === 'commercial') || (filters.projectType === 'off-plan-resale' && filters.propertyTypeSecond === 'residential')) && <div className="lg:flex-[30%] h-[50px]">
                                <SwitchSelector
                                    defaultValue={CompletionTypes[0].value}
                                    onSelect={handleSelect.completionType}
                                    options={CompletionTypes}
                                />
                            </div>}


                            {!((filters.projectType === 'off-plan-land' && filters.propertyTypeSecond === 'residential') || (filters.projectType === 'off-plan-land' && filters.propertyTypeSecond === 'commercial') || (filters.projectType === 'off-plan-secondary' && filters.propertyTypeSecond === 'commercial') || (filters.projectType === 'off-plan-secondary' && filters.propertyTypeSecond === 'residential')) && <div className="flex-[8%] h-[50px]">

                                <ExpandableComponentDropdown
                                    isOpen={showYearSelector}
                                    onToggle={() => setShowYearSelector(prev => !prev)}
                                    label={(filters.handoverDate?.year || filters.handoverDate?.quarter) ? (`${filters.handoverDate?.year}-${filters.handoverDate?.quarter}`) : "Handover"}
                                    isSelected={false}

                                    onClear={() => console.log("Cleared")}
                                    customCloseControl={<button className="text-xs text-red-600">X</button>}
                                >
                                    <SelectHandoverDate
                                        initialYear={filters.handoverDate?.year ? filters.handoverDate?.year : 2025}
                                        initialQuarter={filters.handoverDate?.quarter ? filters.handoverDate?.quarter : "Q2"}

                                        onDone={(year, quarter) => {
                                            handleSelect.handoverDate({ quarter, year })
                                        }}
                                        onClose={() => setShowYearSelector(false)}
                                        reset={() => console.log("Reset triggered")}
                                        onChange={(year, quarter) => console.log("Live change", year, quarter)}
                                    />
                                </ExpandableComponentDropdown>

                            </div>}




                            {bedAndBathCondition && <div className={clsx("h-[50px]", bedAndBathCondition ? 'w-[180px]' : 'flex-[6%]')}>

                                <ExpandableComponentDropdown
                                    isOpen={bedsAndBath}
                                    onToggle={() => setBedsAndBath(prev => !prev)}
                                    label="Beds & Baths"
                                    isSelected={false}

                                    onClear={() => console.log("Cleared")}
                                    customCloseControl={<button className="text-xs text-red-600">X</button>}
                                >


                                    <BedBathSelector
                                        onDone={(beds, baths) => {

                                            handleSelect.bath(baths);
                                            handleSelect.beds(beds);

                                        }}
                                        onClose={() => setShowBedBath(false)}
                                    />

                                </ExpandableComponentDropdown>

                            </div>}






                            {!((filters.projectType === 'off-plan-land' && filters.propertyTypeSecond === 'residential') || (filters.projectType === 'off-plan-land' && filters.propertyTypeSecond === 'commercial') || (filters.projectType === 'off-plan-secondary' && filters.propertyTypeSecond === 'commercial') || (filters.projectType === 'off-plan-secondary' && filters.propertyTypeSecond === 'residential')) && <div className="flex-[10%] h-[50px]">

                                <SelectNew
                                    // clearSelection={clear}
                                    className="w-[200px]"
                                    label="Payment Plan"
                                    options={PaymentPlan}
                                    onSelect={handleSelect.paymentPlan}
                                />
                            </div>}





                            {!((filters.projectType === 'off-plan-land' && filters.propertyTypeSecond === 'residential') || (filters.projectType === 'off-plan-land' && filters.propertyTypeSecond === 'commercial') || (filters.projectType === 'off-plan-secondary' && filters.propertyTypeSecond === 'commercial') || (filters.projectType === 'off-plan-secondary' && filters.propertyTypeSecond === 'residential') || (filters.projectType === 'off-plan-resale' && filters.propertyTypeSecond === 'commercial') || (filters.projectType === 'off-plan-resale' && filters.propertyTypeSecond === 'residential')) && <div className="flex-[7%]  h-[50px]">

                                <SelectNew
                                    // clearSelection={clear}
                                    className="w-[200px] "
                                    label="Discount"
                                    options={DiscountType}
                                    onSelect={handleSelect.discount}
                                />
                            </div>}



                            {furnishTypesCondition && <div className={clsx("h-[50px]", furnishTypesCondition ? 'w-[140px]' : 'flex-[8%]')}>

                                <SelectNew
                                    // clearSelection={clear}
                                    className="w-[200px]"
                                    label="Furnish Type"
                                    options={FurnishTypes}
                                    onSelect={handleSelect.furnishType}
                                />
                            </div>}




                            <div onClick={() => handleClear()} className="flex max-w-[120px] h-[50px] items-center gap-2">
                                <label className="text-[12px]">Clear Filters</label>
                                <div className="bg-black w-[14px] rounded-full h-[14px] flex justify-center items-center">
                                    <IoCloseOutline size={12} color="white" />
                                </div>
                                {/* <Image src={close_icon} alt="menu icon" width={11.25} height={11.25} /> */}
                            </div>
                        </section>
                    </Container>

                    <SectionDivider
                        containerClassName="mt-[10.5px] mb-[12px]"
                        lineClassName="h-[1px] w-full bg-[#DEDEDE]"
                    />


                    {/* Projects Section */}
                    <Container>

                        <div className="mb-4 flex gap-2">
                            <div className="flex-1 h-full  grid gap-3 sm:grid-cols-2 lg:grid-cols-1">

                                {/* {projects ? projects?.data?.map((item, index) => (
                                    <ProjectCard
                                        navigateDetailsButton={true}
                                        key={index}
                                        item={item}
                                        handleClick={handleClick}
                                        handleEnquiryFormClick={handleEnquiryFormClick}
                                    />
                                )) :

                                    <>
                                        {Array.from({ length: 10 }).map((item, index) => {
                                            return <ProjectCardSkelton key={index} />
                                        })}
                                    </>

                                } */}
                                {/* projects */}
                                {projects ? (
                                    projects.data.map((item, index) => (
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

                            <div className="w-full xl:block hidden max-w-[301.5px]">

                                {smallVideoAds && smallVideoAds.length > 0 ?
                                    <div className="w-full mb-[12px] flex relative">
                                        <VideoPreview
                                        projectSlug={smallVideoAds?.[0]?.projectDetails?.slug || ''}
                                            src={smallVideoAds?.[0]?.videoFile?.secure_url || ''}
                                        />
                                    </div> : <div className="w-full h-[250px] rounded bg-gray-50"></div>
                                }

                                <div className="sticky top-3 left-0">

                                    <CustomSliderUi
                                        shuffledImages={shuffledImages}
                                    />
                                    <Recommendations />
                                </div>




                            </div>
                        </div>
                    </Container>





                </div>


                {/* <div className="sm:hidden block">
                <BottomNavigation />
            </div> */}



                {/* Pagination code */}

                <Container>

                    <div className="mt-[23.25px]">
                        {/* 
                        <Pagination
                            currentPage={filters.page || 1}
                            totalPages={totalPages}
                            onPageChange={(newPage) => setFilters(prev => ({ ...prev, page: newPage }))}
                        /> */}
                        <PaginationNew
                            currentPage={filters.page || 1}
                            totalPages={totalPages}
                            onPageChange={(newPage) => setFilters(prev => ({ ...prev, page: newPage }))}
                            maxVisiblePages={deviceType === 'mobile' ? 6 : 8} />



                        <div className="text-[10.5px] mt-[8.25px] flex justify-center items-center font-normal font-poppins text-[#767676]">1 To 24 of 23,567 Listings</div>
                    </div>
                </Container>




                <SectionDivider
                    containerClassName="mt-[45.75px]"
                    lineClassName="h-[1px] hidden sm:block w-full bg-[#DEDEDE]"
                />


                <BottomBanner />

                {smallVideoAds && smallVideoAds.length > 0 &&
                    <Container>
                        <div className="w-full mb-[35px] relative flex sm:hidden">
                            <VideoPreview
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
                            'Studio Properties For Sale in Dubai',
                            '1 BHK Flats in Downtown',
                            'Luxury Villas in Palm Jumeirah',
                            'Affordable Apartments in JVC',
                            'Beachfront Homes in Dubai Marina',
                        ]}
                    />
                </div>


                <MobileFilterOption
                    setFiltersHandler={setFilters}
                    onClose={() => setFilterModel(false)}
                    show={filterModel}
                />



                <Footer />




                {/* <MobileFilterOption
                handleFilterChanges={handleFilterChanges}
                    onClose={() => setFilterModel(false)}
                    show={filterModel}
                /> */}



            </main>

            <Modal
                isOpen={EnquiryForm.status}
                onClose={() => setEnquiryForm({ status: false, id: '', count: 0 })}
            >
                <Container>
                    <div className="relative w-full h-[200px] rounded-[5px]">


                        {EnquiryForm.count === 1 && <ModalForm
                            onClose={() => setEnquiryForm({ status: false, id: '', count: 0 })}
                            item={EnquiryForm}
                            setEnquiry={setEnquiryForm}
                        />}

                        {EnquiryForm.count === 2 && <RegistrationSuccess
                            onClose={() => setEnquiryForm({ status: false, id: '', count: 0 })}

                        />}

                        {EnquiryForm.count === 3 && <AlreadyEnquired
                            onClose={() => setEnquiryForm({ status: false, id: '', count: 0 })}

                        />}

                    </div>
                </Container>
            </Modal>

        </>
    );
}
