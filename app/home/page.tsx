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

import { filter_icon, search_icon } from "../assets";
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
    projectTypeLast?:string
    year?: number | '',
    qtr?: string,
    paymentPlan?:string,
    discount?:string,
    maxPrice?:string,
    minPrice?:string,
  };
  
  type HandoverDate = {
    year?: number | "";
    quarter?: string | "";
  };
  
  type PaymentPlan = {
    label?: string;
    value?: string;
  };

  
// Home Component
export default function HomePage() {

    const router = useRouter();

    

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            count: 100,
        })) || [],
        [cities]);

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
    return (

        <main>

            <div className=" min-h-screen max-w-[1440px] mx-auto w-full lg:overflow-visible font-[family-name:var(--font-geist-sans)]">
                <Header />

                <section className="px-5  lg:px-8 xl:px-24 flex-wrap w-full flex items-center  gap-2">
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
                </section>

                {/* Additional Filters */}
                <section className="px-5  lg:px-8 xl:px-24 mt-2 flex-wrap w-full hidden sm:flex items-center  gap-2">

                    {((filters.projectType === 'off-plan-land' && filters.propertyTypeSecond === 'residential') || (filters.projectType === 'off-plan-land' && filters.propertyTypeSecond === 'commercial') || (filters.projectType === 'off-plan-secondary' && filters.propertyTypeSecond === 'commercial' || (filters.projectType === 'off-plan-secondary' && filters.propertyTypeSecond === 'residential') || (filters.projectType === 'off-plan-resale' && filters.propertyTypeSecond === 'commercial') || (filters.projectType === 'off-plan-resale' && filters.propertyTypeSecond === 'residential'))) && <div className=" w-[100px]  h-[50px]">

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



                    {!((filters.projectType === 'off-plan-land' && filters.propertyTypeSecond === 'residential') || (filters.projectType === 'off-plan-land' && filters.propertyTypeSecond === 'commercial') || (filters.projectType === 'off-plan-secondary' && filters.propertyTypeSecond === 'commercial') || (filters.projectType === 'off-plan-resale' && filters.propertyTypeSecond === 'commercial') || (filters.projectType === 'off-plan-projects' && filters.propertyTypeSecond === 'commercial')) && <div className={`sm:flex-[8%] w-full  h-[50px]`}>

                        <SelectOption
                            clearSelection={clear}
                            search
                            className="w-[200px]"
                            label="Property Types"
                            options={PropertyTypes}
                            onSelect={handleSelect.propertyType}
                        />
                    </div>}



                    {!((filters.projectType === 'off-plan-land' && filters.propertyTypeSecond === 'residential') || (filters.projectType === 'off-plan-land' && filters.propertyTypeSecond === 'commercial') || (filters.projectType === 'off-plan-secondary' && filters.propertyTypeSecond === 'commercial') || (filters.projectType === 'off-plan-secondary' && filters.propertyTypeSecond === 'residential') || (filters.projectType === 'off-plan-resale' && filters.propertyTypeSecond === 'commercial') || (filters.projectType === 'off-plan-resale' && filters.propertyTypeSecond === 'residential')) && <div className="xl:flex-[18%] lg:flex-[30%] sm:flex hidden flex-1 w-full  h-[50px]">
                        <SwitchSelector
                            onSelect={handleSelect.completionType}
                            defaultValue={filters.completionType}
                            options={CompletionTypes}
                        />
                    </div>}


                    {!((filters.projectType === 'off-plan-land' && filters.propertyTypeSecond === 'residential') || (filters.projectType === 'off-plan-land' && filters.propertyTypeSecond === 'commercial') || (filters.projectType === 'off-plan-secondary' && filters.propertyTypeSecond === 'commercial') || (filters.projectType === 'off-plan-secondary' && filters.propertyTypeSecond === 'residential')) && <div className="xl:flex-[6%] lg:flex-[30%] w-full  h-[50px]">

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
                                    console.log("Selected:", year, quarter);
                                    handleSelect.handoverDate({ quarter, year })
                                }}
                                onClose={() => setShowYearSelector(false)}
                                reset={() => console.log("Reset triggered")}
                                onChange={(year, quarter) => console.log("Live change", year, quarter)}
                            />
                        </ExpandableComponentDropdown>

                    </div>}




                    {((filters.projectType === 'off-plan-secondary' && filters.propertyTypeSecond === 'residential') || (filters.projectType === 'off-plan-resale' && filters.propertyTypeSecond === 'residential')) && <div className="xl:flex-[6%] lg:flex-[30%] w-full  h-[50px]">

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






                    {!((filters.projectType === 'off-plan-land' && filters.propertyTypeSecond === 'residential') || (filters.projectType === 'off-plan-land' && filters.propertyTypeSecond === 'commercial') || (filters.projectType === 'off-plan-secondary' && filters.propertyTypeSecond === 'commercial') || (filters.projectType === 'off-plan-secondary' && filters.propertyTypeSecond === 'residential')) && <div className="sm:flex-[10%] w-full  h-[50px]">

                        <SelectOption
                            clearSelection={clear}
                            search
                            className="w-[200px]"
                            label="Payment Plan"
                            options={PaymentPlan}
                            onSelect={handleSelect.paymentPlan}
                        />
                    </div>}





                    {!((filters.projectType === 'off-plan-land' && filters.propertyTypeSecond === 'residential') || (filters.projectType === 'off-plan-land' && filters.propertyTypeSecond === 'commercial') || (filters.projectType === 'off-plan-secondary' && filters.propertyTypeSecond === 'commercial') || (filters.projectType === 'off-plan-secondary' && filters.propertyTypeSecond === 'residential') || (filters.projectType === 'off-plan-resale' && filters.propertyTypeSecond === 'commercial') || (filters.projectType === 'off-plan-resale' && filters.propertyTypeSecond === 'residential')) && <div className="sm:flex-[6%] w-full z-40 h-[50px]">

                        <SelectOption
                            search
                            clearSelection={clear}
                            className="w-[200px]"
                            label="Discount"
                            options={DiscountType}
                            onSelect={handleSelect.discount}
                        />
                    </div>}



                    {(!((filters.projectType === 'off-plan-land' && filters.propertyTypeSecond === 'residential') || (filters.projectType === 'off-plan-land' && filters.propertyTypeSecond === 'commercial'))) && <div className="sm:flex-[8%] w-full  h-[50px]">

                        <SelectOption
                            clearSelection={clear}
                            search
                            className="w-[200px]"
                            label="Furnish Type"
                            options={FurnishTypes}
                            onSelect={handleSelect.furnishType}
                        />
                    </div>}




                    <div onClick={() => handleClear()} className="flex max-w-[120px] h-full items-center gap-2">
                        <label className="text-[12px]">Clear Filters</label>
                        <Image src={search_icon} alt="menu icon" width={18} />
                    </div>
                </section>

                {/* Projects Section */}
                <div className="px-5  lg:px-8 xl:px-24 my-4 flex gap-2">
                    <div className="flex-1 h-full grid gap-3 sm:grid-cols-2 lg:grid-cols-1">

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

                    <div className="w-full min-1110px:block hidden ps-2 lg:max-w-[240px] xl:max-w-[320px]">
                        <Recommendations />

                        <CustomSliderUi
                            shuffledImages={shuffledImages}
                        />
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


            <div className="sm:hidden block">
                <BottomNavigation />
            </div>


<div className="py-4">

              <Pagination
                                currentPage={filters.page || 1}
                                totalPages={totalPages}
                                onPageChange={(newPage) => setFilters(prev => ({ ...prev, page: newPage }))}
                                />
                                </div>
            

            <Footer />

        </main>

    );
}
