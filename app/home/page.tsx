'use client';

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useRouter } from 'next/navigation';

import Header from "@/components/Header";
import SearchInput from "@/components/SearchField/Search";
import { SelectHandoverDate } from "@/components/SelectHandoverDate";
import { SelectOption, SwitchSelector } from "@/components/SelectOption";
import ExpandableComponentDropdown from "@/components/ExpandableComponent/ExpandableComponent";
import ProjectCard from "@/components/ProjectCard/ProjectCard";

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
    propertyTypeFirst,
    propertyTypeSecond,
} from "@/data";

import { close_icon, filter_icon, search_icon } from "../assets";
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
import BottomNavigation from "@/components/BottomNavigation/BottomNavigation";
import Pagination from "@/components/Pagination/Pagination";
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

type FiltersState = {
    developers?: string[];
    facilities?: string[];
    propertyTypeSecond?: string;
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
        propertyType: [],
        propertyTypeSecond: undefined,
        emirate: "",
        completionType: "",
        handoverDate: undefined,
        projectType: "",
        paymentPlan: undefined,
        furnishType: "",
        discount: "",
        bedAndBath: "",
        minPrice: '',
        maxPrice: '',
        minSqft: "",
        maxSqft: "",
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

    // Event Handlers
    const handleChangeSearch = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setFilters(prev => ({ ...prev, search: event.target.value }));
    }, []);

    const handleChangeCities = useCallback((option: any) => {
        setFilters(prev => ({ ...prev, cities: [option?.value || ''] }));
    }, []);

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
        setFilters({
            page: 1,
            search: "",
            cities: [],
            developers: [],
            facilities: [],
            propertyType: [],
            propertyTypeSecond: undefined,
            emirate: "",
            completionType: "",
            handoverDate: undefined,
            projectType: '',
            paymentPlan: undefined,
            furnishType: "",
            discount: "",
            bedAndBath: '',
            maxPrice: '',
            minPrice: '',
            maxSqft: '',
            minSqft: '',
            bath: '',
            beds: ''
            ,
        });
        setClear(true);
        setTimeout(() => setClear(false), 100);
    }, []);


    const propertyTypesCondition = !((filters.projectType === 'off-plan-land' && filters.propertyTypeSecond === 'residential') || (filters.projectType === 'off-plan-land' && filters.propertyTypeSecond === 'commercial') || (filters.projectType === 'off-plan-secondary' && filters.propertyTypeSecond === 'commercial') || (filters.projectType === 'off-plan-resale' && filters.propertyTypeSecond === 'commercial') || (filters.projectType === 'off-plan-projects' && filters.propertyTypeSecond === 'commercial'));
    const bedAndBathCondition = ((filters.projectType === 'off-plan-secondary' && filters.propertyTypeSecond === 'residential') || (filters.projectType === 'off-plan-resale' && filters.propertyTypeSecond === 'residential'))
    const furnishTypesCondition = (!((filters.projectType === 'off-plan-land' && filters.propertyTypeSecond === 'residential') || (filters.projectType === 'off-plan-land' && filters.propertyTypeSecond === 'commercial')))
    return (

        <main>

            <div className=" min-h-screen max-w-[1440px] mx-auto w-full lg:overflow-visible font-[family-name:var(--font-geist-sans)]">
                <Header />

                {/* <section className="px-5  lg:px-8 xl:px-[144px] flex-wrap w-full flex items-center  gap-2">
                    <div className="sm:flex-[18%] w-full  h-[50px]">
                        <SearchInput
                            value={filters?.search || ''}
                            onChange={handleChangeSearch}
                            placeholder="Search..."
                        />
                    </div>

                    <div className="sm:flex-[10%] sm:block hidden w-full h-[50px]">
                        <SelectOption
                            search
                            clearSelection={clear}
                            className="w-[200px]"
                            label="Emirates"
                            options={emirateOptions}
                            onSelect={handleSelect.emirate}
                        />
                    </div>

                    <div className="w-full h-full flex sm:hidden gap-2">
                        <SelectOption
                            search
                            clearSelection={clear}
                            className="w-[200px]"
                            label="Emirates"
                            options={emirateOptions}
                            onSelect={handleSelect.emirate}
                        />
                        <SelectOption
                            search
                            clearSelection={clear}
                            className="w-[220px]"
                            label="Cities"
                            options={cityOptions}
                            onSelect={handleChangeCities}
                        />
                    </div>

                    <div className="sm:flex-[10%]  w-full h-[50px]">
                        <SelectOption
                            search
                            clearSelection={clear}
                            className="w-[220px]"
                            label="Cities"
                            options={cityOptions}
                            onSelect={handleChangeCities}
                        />
                    </div>

                    <div className="sm:flex-[28%]  w-full  h-[50px]">
                        <SwitchSelector
                            onSelect={handleSelect.projectType}
                            defaultValue=""
                            options={propertyTypeFirst}
                        />
                    </div>

                    <div className="sm:flex-[18%] sm:flex hidden flex-1 w-full  h-[50px]">
                        <SwitchSelector
                            onSelect={handleSelect.propertyTypeSecond}
                            defaultValue=""
                            options={propertyTypeSecond}
                        />
                    </div>

                    <div className="w-full gap-2 sm:hidden flex h-[50px]">
                        <SwitchSelector
                            onSelect={handleSelect.propertyTypeSecond}
                            defaultValue=""
                            options={propertyTypeSecond}
                        />
                        <button onClick={handleFilterModal} className="bg-red-600/10 rounded flex justify-center items-center  border border-[#DEDEDE] w-[55px] h-full">
                            <Image
                                src={filter_icon}
                                className=" object-cover"
                                alt="filter"
                                width={18}
                                height={18}

                            />
                        </button>
                    </div>

                    <Modal
                        isOpen={filterModel}
                        onClose={() => setFilterModel(false)}
                    >
                        <div className="w-full h-[400px] rounded-md">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias quaerat quidem corrupti, saepe animi sint. Earum dolore, at adipisci deserunt doloribus tenetur, eaque assumenda deleniti ipsum expedita a alias laborum?
                        </div>

                    </Modal>
                </section> */}
                <section className="px-5  lg:px-8 xl:px-[144.75px]  grid grid-cols-1  lg:grid-cols-[19.8%_9.8%_9.8%_39%_19%] gap-2">

                    <div className="h-[50px]">
                        <SearchInput
                            value={filters?.search || ''}
                            onChange={handleChangeSearch}
                            placeholder="Search..."
                        />
                    </div>


                    {/* Desktop and Laptop */}
                    <div className="hidden lg:flex h-[48px]">
                        <SelectOption
                            className="w-[200px]"
                            search
                            clearSelection={clear}
                            label="Emirates"
                            options={emirateOptions}
                            onSelect={handleSelect.emirate}
                        />
                    </div>




                    <div className="hidden lg:flex h-[38.34px]">
                        <SelectOption
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
                            <SelectOption
                                className="w-[200px]"
                                search
                                clearSelection={clear}
                                label="Emirates"
                                options={emirateOptions}
                                onSelect={handleSelect.emirate}
                            />
                        </div>


                        <div className=" h-[40px] w-full">
                            <SelectOption
                                search
                                clearSelection={clear}
                                className="w-[220px]  sm:!left-0 !-left-14 "
                                label="Cities"
                                options={cityOptions}
                                onSelect={handleChangeCities}
                            />
                        </div>

                    </div>


                    <div className="h-[50px]">
                        <SwitchSelector
                            onSelect={handleSelect.projectType}
                            defaultValue=""
                            options={propertyTypeFirst}
                        />
                    </div>


                    <div className="flex gap-2 h-[50px]">
                        <SwitchSelector
                            onSelect={handleSelect.propertyTypeSecond}
                            defaultValue=""
                            options={propertyTypeSecond}
                        />
                        <button onClick={handleFilterModal} className="bg-red-600/10 rounded flex justify-center items-center  border border-[#DEDEDE] w-[55px] lg:hidden h-full">
                            <Image
                                src={filter_icon}
                                className=" object-cover"
                                alt="filter"
                                width={18}
                                height={18}

                            />
                        </button>
                    </div>


                </section>


                {/* Additional Filters */}
                <section className="px-5  lg:px-8 xl:px-[144.75px] lg:flex gap-2  mt-2  hidden">

                    {((filters.projectType === 'off-plan-land' && filters.propertyTypeSecond === 'residential') || (filters.projectType === 'off-plan-land' && filters.propertyTypeSecond === 'commercial') || (filters.projectType === 'off-plan-secondary' && filters.propertyTypeSecond === 'commercial' || (filters.projectType === 'off-plan-secondary' && filters.propertyTypeSecond === 'residential') || (filters.projectType === 'off-plan-resale' && filters.propertyTypeSecond === 'commercial') || (filters.projectType === 'off-plan-resale' && filters.propertyTypeSecond === 'residential'))) && <div className="h-[50px]">

                        <ExpandableComponentDropdown
                            isOpen={rangeCalculator}
                            onToggle={() => setRangeCalculator(prev => !prev)}
                            label="Price"
                            isSelected={false}
                            customCloseControl={<button className="text-xs text-red-600">X</button>}
                        >
                            <RangeCalculator
                                onDone={(minValue, maxValue) => {
                                    handleSelect.maxPrice(maxValue);
                                    handleSelect.minPrice(minValue);
                                    console.log(minValue, maxValue, '---')
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



                    {propertyTypesCondition && <div className={clsx(`h-[50px]`, propertyTypesCondition ? 'w-[130px]' : 'flex-[8%]')}>

                        <SelectOption
                            clearSelection={clear}
                            className="w-[200px]"
                            label="Property Types"
                            options={PropertyTypes}
                            onSelect={handleSelect.propertyType}
                        />
                    </div>}



                    {!((filters.projectType === 'off-plan-land' && filters.propertyTypeSecond === 'residential') || (filters.projectType === 'off-plan-land' && filters.propertyTypeSecond === 'commercial') || (filters.projectType === 'off-plan-secondary' && filters.propertyTypeSecond === 'commercial') || (filters.projectType === 'off-plan-secondary' && filters.propertyTypeSecond === 'residential') || (filters.projectType === 'off-plan-resale' && filters.propertyTypeSecond === 'commercial') || (filters.projectType === 'off-plan-resale' && filters.propertyTypeSecond === 'residential')) && <div className="lg:flex-[30%] h-[50px]">
                        <SwitchSelector
                            onSelect={handleSelect.completionType}
                            defaultValue={filters.completionType}
                            options={CompletionTypes}
                        />
                    </div>}


                    {!((filters.projectType === 'off-plan-land' && filters.propertyTypeSecond === 'residential') || (filters.projectType === 'off-plan-land' && filters.propertyTypeSecond === 'commercial') || (filters.projectType === 'off-plan-secondary' && filters.propertyTypeSecond === 'commercial') || (filters.projectType === 'off-plan-secondary' && filters.propertyTypeSecond === 'residential')) && <div className="flex-[8%] h-[50px]">

                        <ExpandableComponentDropdown
                            isOpen={showYearSelector}
                            onToggle={() => setShowYearSelector(prev => !prev)}
                            label="Handover"
                            isSelected={false}

                            onClear={() => console.log("Cleared")}
                            customCloseControl={<button className="text-xs text-red-600">X</button>}
                        >
                            <SelectHandoverDate
                                initialYear={2025}
                                initialQuarter={"Q2"}
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

                        <SelectOption
                            clearSelection={clear}
                            search
                            className="w-[200px]"
                            label="Payment Plan"
                            options={PaymentPlan}
                            onSelect={handleSelect.paymentPlan}
                        />
                    </div>}





                    {!((filters.projectType === 'off-plan-land' && filters.propertyTypeSecond === 'residential') || (filters.projectType === 'off-plan-land' && filters.propertyTypeSecond === 'commercial') || (filters.projectType === 'off-plan-secondary' && filters.propertyTypeSecond === 'commercial') || (filters.projectType === 'off-plan-secondary' && filters.propertyTypeSecond === 'residential') || (filters.projectType === 'off-plan-resale' && filters.propertyTypeSecond === 'commercial') || (filters.projectType === 'off-plan-resale' && filters.propertyTypeSecond === 'residential')) && <div className="flex-[7%]  h-[50px]">

                        <SelectOption
                            search
                            clearSelection={clear}
                            className="w-[200px] "
                            label="Discount"
                            options={DiscountType}
                            onSelect={handleSelect.discount}
                        />
                    </div>}



                    {furnishTypesCondition && <div className={clsx("h-[50px]", furnishTypesCondition ? 'w-[140px]' : 'flex-[8%]')}>

                        <SelectOption
                            clearSelection={clear}
                            search
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

                <div className="mt-[10.5px] mb-[12px]">
                    <div className="h-[1px] w-full bg-[#DEDEDE]"></div>
                </div>

                {/* Projects Section */}
                <div className="px-5  lg:px-8  xl:px-[144px] mb-4 flex gap-2">
                    <div className="flex-1 h-full  grid gap-3 sm:grid-cols-2 lg:grid-cols-1">

                        {projects ? projects?.data?.map((item, index) => (
                            <ProjectCard
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

                        }
                    </div>

                    <div className="w-full xl:block hidden max-w-[301.5px]">

                        {smallVideoAds && smallVideoAds.length > 0 &&
                            <div className="w-full mb-[12px] relative">
                                <VideoPreview
                                    src={smallVideoAds?.[0]?.videoFile?.secure_url || ''}
                                />
                            </div>
                        }

                        <div className="sticky top-3 left-0">

                            <CustomSliderUi
                                shuffledImages={shuffledImages}
                            />
                            <Recommendations />
                        </div>




                    </div>
                </div>



                <Modal
                    isOpen={EnquiryForm.status}
                    onClose={() => setEnquiryForm({ status: false, id: '', count: 0 })}
                >
                    {EnquiryForm.count === 1 && <ModalForm
                        item={EnquiryForm}
                        setEnquiry={setEnquiryForm}
                    />}
                    {EnquiryForm.count === 2 && <RegistrationSuccess />}

                </Modal>
            </div>


            {/* <div className="sm:hidden block">
                <BottomNavigation />
            </div> */}


            <div className="mt-[23.25px]">

                <Pagination
                    currentPage={filters.page || 1}
                    totalPages={totalPages}
                    onPageChange={(newPage) => setFilters(prev => ({ ...prev, page: newPage }))}
                />

                <div className="text-[10.5px] mt-[8.25px] flex justify-center items-center font-normal font-poppins text-[#767676]">1 To 24 of 23,567 Listings</div>
            </div>


         

            <div className=" mt-[45.75px]">
                <div className="h-[1px] hidden sm:block w-full bg-[#DEDEDE]"></div>
            </div>


            <BottomBanner />

            {smallVideoAds && smallVideoAds.length > 0 &&
                            <div className="w-full mb-[35px] relative px-5  lg:px-8 flex sm:hidden">
                                <VideoPreview
                                    src={smallVideoAds?.[0]?.videoFile?.secure_url || ''}
                                />
                            </div>
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



            <Footer />  

        </main>

    );
}
