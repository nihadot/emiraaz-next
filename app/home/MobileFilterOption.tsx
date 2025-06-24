import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AiOutlineClose } from "react-icons/ai";
import SectionDivider from '@/components/atom/SectionDivider/SectionDivider';
import Container from '@/components/atom/Container/Container';
import { CompletionTypes, propertyTypeFirst, PropertyTypes, propertyTypeSecond } from '@/data';
import SwitchSelectorMobile from '@/components/SelectOption/SwitchSelectorMobile';
import { SelectHandoverDate } from '@/components/SelectHandoverDate';
import PriceRangeInput from './RangeCalculator';
import BedBathSelector from './BedBathSelector';
import clsx from 'clsx';
import { AllProjectsItems } from '@/redux/project/types';
import SelectLatest from '@/components/SelectOption/SelectLatest';
import { useFetchAllEmirateNamesQuery } from '@/redux/emirates/emiratesApi';
import { useFetchAllCityNamesQuery } from '@/redux/cities/citiesApi';
import { useFetchAllProjectsQuery } from '@/redux/project/projectApi';
import { FiltersState } from '@/components/types';
import { apartment_icon, penthouse_icon, townhouse_icon, villa_icon } from '../assets';
import Image from 'next/image';

type Props = {
    show: boolean;
    onClose: () => void;
    handleFilterChanges?: (item: AllProjectsItems[]) => void;
    setFiltersHandler: (item: FiltersState) => void;
    resultProjects: (item: AllProjectsItems[]) => void;
    priceRange?: boolean;
    bathroomsRange?: boolean;

};

function MobileFilterOption({
    show,
    onClose,
    setFiltersHandler,
    resultProjects,
    bathroomsRange,
    priceRange,
}: Props) {
    const [clear, setClear] = React.useState(false);


    React.useEffect(() => {
        if (show) {
            document.body.style.overflow = 'hidden'; // Prevent scroll
        } else {
            document.body.style.overflow = 'auto'; // Restore scroll
        }

        return () => {
            document.body.style.overflow = 'auto'; // Clean up on unmount
        };
    }, [show]);
    const { data: emiratesData } = useFetchAllEmirateNamesQuery();


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
        projectTypeFirst: 'all',
        projectTypeLast: 'all',
        bedAndBath: "",
        minPrice: '',
        maxPrice: '',
        minSqft: "",
        maxSqft: "",
        beds: "",
        bath: "",
    });



    const emirateOptions = React.useMemo(() => {
        const mappedOptions = emiratesData?.data.map((item) => ({
            label: item.name,
            value: item._id,
             count: item.count,
        })) || [];

        return [
            { label: "All", value: "all" }, // <--- Add "All" option at the top
            ...mappedOptions,
        ];
    }, [emiratesData]);
    const { data: cities } = useFetchAllCityNamesQuery({ emirate: filters.emirate });
    const [rangeCalculator, setRangeCalculator] = useState(false);


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


    const handleChangeCities = useCallback((option: any[]) => {
        if (option.length === 0) {
            setFilters(prev => ({ ...prev, cities: [] }));
            return;
        }
        setFilters(prev => ({ ...prev, cities: option.map((item) => item.value) }));
    }, []);
    const [showBedBath, setShowBedBath] = useState(false);


    const handleClear = useCallback(() => {
        setFilters({
            page: 1,
            search: "",
            cities: [],
            developers: [],
            facilities: [],
            propertyType: [],
            propertyTypeSecond: undefined, // first one propert stage
            emirate: "",
            completionType: "",
            handoverDate: undefined,
            projectType: '', // last one propert types (offplan ....)
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



    useEffect(() => {
        setFilters({
            page: 1,
            search: "",
            cities: [],
            developers: [],
            facilities: [],
            propertyType: [],
            propertyTypeSecond: "all",
            projectTypeFirst: "all",
            projectTypeLast: "all",
            emirate: "",
            completionType: "",
            handoverDate: undefined,
            projectType: '', // last one propert types (offplan ....)
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
    }, [])

    const [defaultEmirate, setDefaultEmirate] = useState<string>('');
    const [defaultCities, setDefaultCities] = useState<any>('');


    const handleDone = () => {
        setFiltersHandler(filters);
        onClose()

        if (projects?.data) {
            resultProjects(projects?.data)
        }
    }

    // Data fetching with memoized query params
    const queryParams = useMemo(() => ({
        limit: 20,
        page: filters.page,
        cities: filters.cities,
        developers: filters.developers,
        facilities: filters.facilities,
        propertyType: filters.propertyType,
        completionType: filters.completionType,
        paymentPlan: filters.paymentPlan,
        year: filters.handoverDate?.year,
        qtr: filters.handoverDate?.quarter,
        discount: filters.discount,
        projectTypeFirst: filters.projectType, // off plan or ....
        projectTypeLast: filters.propertyTypeSecond, // 'residential' or 'commercial'
        furnishing: filters.furnishType,
        emirate: filters.emirate,
        maxPrice: filters.maxPrice,
        minPrice: filters.minPrice,
        minSqft: filters.minSqft,
        maxSqft: filters.maxSqft,
        beds: filters.beds,
        bath: filters.bath,
    }), [filters]);


    const { data: projects } = useFetchAllProjectsQuery(queryParams);


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


    return (
        <AnimatePresence>
            {show && (
                <motion.section
                    initial={{ opacity: 0, y: '100%' }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: '100%' }}
                    transition={{ duration: 0.3 }}
                    className='fixed sm:hidden top-0 left-0 w-full h-full  bg-black bg-opacity-50 z-[100] overflow-hidden'
                >


                    <div className='flex flex-col pb-40 w-full h-full overflow-auto bg-white'>
                        <div className="sticky top-0 left-0 bg-white z-[60]">
                            <Container>
                                <div className="flex h-[56px] items-center justify-between w-full">
                                    <label className='text-[13px] font-poppins font-semibold'>Filters</label>
                                    <AiOutlineClose
                                        onClick={onClose}
                                        size={15}
                                    />
                                </div>
                            </Container>

                            <SectionDivider
                                containerClassName="mb-[0px]"
                                lineClassName="h-[1px] w-full bg-[#DEDEDE]"
                            />
                        </div>


                        <Container>
                            <div className="flex mt-[12px] flex-col w-full gap-[9px]">


                                {/* Emirates */}
                                <div className=" h-[40px] w-full">
                                    <SelectLatest
                                        dropdownContainerClassName="!justify-center"
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


                                {/* Cities */}
                                <div className=" h-[40px] w-full">
                                    <SelectLatest
                                        dropdownContainerClassName="!justify-center"

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
                                        // listContainerClassName="w-[220px] sm:!left-0 !-left-14 "
                                        label="Cities"
                                        options={cityOptions}
                                    />
                                </div>


                                {/* Property Type Second */}
                                <div className="flex gap-2 h-[45px]">

                                    <SwitchSelectorMobile
                                        clearSelection={clear}
                                        className='!grid-cols-3 '
                                        onSelect={handleSelect.propertyTypeSecond}
                                        defaultValue={propertyTypeSecond[0].value}
                                        options={propertyTypeSecond}
                                    />
                                </div>


                                {/* Property Type First */}
                                <div className="h-[80px]">
                                    <SwitchSelectorMobile
                                        clearSelection={clear}
                                        onSelect={handleSelect.projectType}
                                        defaultValue={propertyTypeFirst[0].value}
                                        options={propertyTypeFirst}

                                    />
                                </div>

                                {/* Property Type */}
                                <label htmlFor="" className='mt-2 font-medium font-poppins flex text-[14px]'>Property Type</label>

                                <div className="flex justify-between ">
                                    <div className="flex flex-col gap-1 ">
                                        <div
                                            onClick={() => handleSelect.propertyType({ label: PropertyTypes[2].label, value: PropertyTypes[2].value })}

                                            className={clsx(" p-3.5 rounded-full", filters?.propertyType?.includes(PropertyTypes[2].value) ? 'bg-red-700/10' : 'outline outline-[#DEDEDE]')}>
                                         
                                            <Image className='bg-transparent' src={apartment_icon} alt="apartment icon" width={30} height={30} />
                                        </div>
                                        <p className='text-[10px]  font-medium font-poppins text-center'>Apartment</p>

                                    </div>


                                    <div className="flex flex-col gap-1 ">
                                        <div
                                            onClick={() => handleSelect.propertyType({ label: PropertyTypes[3].label, value: PropertyTypes[3].value })}

                                            className={clsx(" p-3.5 rounded-full", filters?.propertyType?.includes(PropertyTypes[3].value) ? 'bg-red-700/10' : 'outline outline-[#DEDEDE]')}>
                                            
                                            <Image className='bg-transparent' src={penthouse_icon} alt="penthouse icon" width={30} height={30} />

                                        </div>
                                        <p className='text-[10px]  font-medium font-poppins text-center'>Penthouse</p>

                                    </div>



                                    <div className="flex flex-col gap-1">

                                        <div
                                            onClick={() => handleSelect.propertyType({ label: PropertyTypes[4].label, value: PropertyTypes[4].value })}

                                            className={clsx(" p-3.5 rounded-full", filters?.propertyType?.includes(PropertyTypes[4].value) ? 'bg-red-700/10' : 'outline outline-[#DEDEDE]')}>
                                      
                                            <Image className='bg-transparent' src={townhouse_icon} alt="townhouse icon" width={30} height={30} />

                                        </div>
                                        <p className='text-[10px]  font-medium font-poppins text-center'>Townhouse</p>

                                    </div>

                                    <div className="flex flex-col gap-1">

                                        <div
                                            onClick={() => handleSelect.propertyType({ label: PropertyTypes[1].label, value: PropertyTypes[1].value })}

                                            className={clsx(" p-3.5 rounded-full", filters?.propertyType?.includes(PropertyTypes[1].value) ? 'bg-red-700/10' : 'outline outline-[#DEDEDE]')}>
                                           
                                            <Image className='bg-transparent' src={villa_icon} alt="villa icon" width={30} height={30} />

                                        </div>
                                        <p className='text-[10px]  font-medium font-poppins text-center'>Villa</p>

                                    </div>

                                </div>



                                {/* Completion */}
                                <label htmlFor="" className='font-medium font-poppins mt-2 flex text-[14px]'>Completion</label>

                                <div className="h-[80px]">
                                    <SwitchSelectorMobile
                                        defaultValue={CompletionTypes[0].value}
                                        onSelect={handleSelect.completionType}
                                        options={CompletionTypes}
                                        clearSelection={clear}
                                    />
                                </div>

                                {/* Handover Date */}
                                <label htmlFor="" className='font-medium mt-2 font-poppins flex text-[14px]'>Handover</label>

                                <SelectHandoverDate
                                    clearButton={false}
                                    doneButton={false}
                                    wrapperClassName='!w-full !h-fit !border-none !shadow-none'
                                    initialYear={filters.handoverDate?.year ? filters.handoverDate?.year : 2025}
                                    initialQuarter={filters.handoverDate?.quarter ? filters.handoverDate?.quarter : "Q3"}

                                    onDone={(year, quarter) => {
                                        handleSelect.handoverDate({ quarter, year })
                                    }}
                                    onChange={(year, quarter) => {
                                        handleSelect.handoverDate({ quarter, year })
                                    }}
                                />



                                {/* Payment Plan */}
                                <label htmlFor="" className='font-medium font-poppins flex mt-2 text-[14px]'>Payment Plan</label>
                                <div className="flex gap-[5px] h-[40px]">
                                    <button
                                        className={`text-[12px] font-poppins font-normal text-[#333333] text-nowrap  h-full rounded-[3px] px-2 sm:px-3 py-1 flex items-center justify-center w-full transition-all  duration-200 ${filters.paymentPlan === 'on-handover'
                                            ? 'bg-red-600/10 text-red-600'
                                            : 'bg-white border border-[#DEDEDE] text-black hover:text-red-600 hover:bg-red-100'
                                            }`}
                                        onClick={() => handleSelect.paymentPlan({
                                            label: 'On Handover',
                                            value: 'on-handover'
                                        })}
                                    >
                                        On Handover
                                    </button>


                                    <button
                                        className={` text-[12px] font-poppins font-normal text-[#333333] text-nowrap  h-full rounded-[3px] px-2 sm:px-3 py-1 flex items-center justify-center w-full transition-all  duration-200 ${filters.paymentPlan === 'post-handover'
                                            ? 'bg-red-600/10 text-red-600'
                                            : 'bg-white border border-[#DEDEDE] text-black hover:text-red-600 hover:bg-red-100'
                                            }`}
                                        onClick={() => handleSelect.paymentPlan({
                                            label: 'Post Handover',
                                            value: 'post-handover'
                                        })}
                                    >
                                        Post Handover
                                    </button>
                                </div>



                                {/* Price Range */}
                                {priceRange && <div className="">
                                    <PriceRangeInput
                                        clearButton={clear}
                                        doneButton={false}
                                        wrapperClassName='!border-none !w-full'
                                        onDone={(minValue, maxValue) => {
                                            handleSelect.maxPrice(maxValue);
                                            handleSelect.minPrice(minValue);
                                        }}
                                        onChange={(minValue, maxValue) => {
                                            handleSelect.maxPrice(maxValue);
                                            handleSelect.minPrice(minValue);
                                        }}
                                        onClose={() => setRangeCalculator(prev => !prev)}

                                    />
                                </div>}
                            </div>




                            {/* Bed And Bath Selector */}
                            {bathroomsRange && <div className="">
                                <BedBathSelector
                                    doneButton={clear}
                                    clearButton={false}
                                    wrapperClassName='!border-none !w-full '
                                    onDone={(beds, baths) => {

                                        handleSelect.bath(baths);
                                        handleSelect.beds(beds);

                                    }}

                                    onChange={(beds, baths) => {

                                        handleSelect.bath(baths);
                                        handleSelect.beds(beds);

                                    }}

                                    onClose={() => setShowBedBath(false)}
                                />
                            </div>}



                            {/* Furnish Type */}
                            <label htmlFor="" className='font-medium font-poppins flex mt-4 text-[14px]'>Furnish Type</label>
                            <div className="flex mt-2 gap-[5px] h-[40px]">
                                <button
                                    className={`text-[12px] font-poppins font-normal text-[#333333] text-nowrap  h-full rounded-[3px] px-2 sm:px-3 py-1 flex items-center justify-center w-full transition-all  duration-200 ${filters.furnishType === 'fully-furnished'
                                        ? 'bg-red-600/10 text-red-600'
                                        : 'bg-white border border-[#DEDEDE] text-black hover:text-red-600 hover:bg-red-100'
                                        }`}
                                    onClick={() => handleSelect.furnishType({ label: 'Fully Furnished', value: 'fully-furnished' })}
                                >
                                    Fully Furnished
                                </button>


                                <button
                                    className={` text-[12px] font-poppins font-normal text-[#333333] text-nowrap  h-full rounded-[3px] px-2 sm:px-3 py-1 flex items-center justify-center w-full transition-all  duration-200 ${filters.furnishType === 'semi-furnished'
                                        ? 'bg-red-600/10 text-red-600'
                                        : 'bg-white border border-[#DEDEDE] text-black hover:text-red-600 hover:bg-red-100'
                                        }`}
                                    onClick={() => handleSelect.furnishType({ label: 'Semi Furnished', value: 'semi-furnished' })}
                                >
                                    Semi Furnished
                                </button>



                                <button
                                    className={` text-[12px] font-poppins font-normal text-[#333333] text-nowrap  h-full rounded-[3px] px-2 sm:px-3 py-1 flex items-center justify-center w-full transition-all  duration-200 ${filters.furnishType === 'un-furnishing'
                                        ? 'bg-red-600/10 text-red-600'
                                        : 'bg-white border border-[#DEDEDE] text-black hover:text-red-600 hover:bg-red-100'
                                        }`}
                                    onClick={() => handleSelect.furnishType({ label: 'UnFurnished', value: 'un-furnishing' })}
                                >
                                    UnFurnished
                                </button>
                            </div>




                            {/* Discount */}
                            <label htmlFor="" className='font-medium font-poppins flex text-[14px] mt-4'>Discount</label>

                            <div className="flex mt-2 gap-[5px] h-[40px]">
                                <button
                                    className={`text-[12px] font-poppins font-normal text-[#333333] text-nowrap  h-full rounded-[3px] px-2 sm:px-3 py-1 flex items-center justify-center w-full transition-all  duration-200 ${filters?.discount === 'with-discount'
                                        ? 'bg-red-600/10 text-red-600'
                                        : 'bg-white border border-[#DEDEDE] text-black hover:text-red-600 hover:bg-red-100'
                                        }`}
                                    onClick={() => handleSelect.discount({ label: 'With Discount', value: 'with-discount' })}
                                >
                                    With Discount
                                </button>


                                <button
                                    className={` text-[12px] font-poppins font-normal text-[#333333] text-nowrap  h-full rounded-[3px] px-2 sm:px-3 py-1 flex items-center justify-center w-full transition-all  duration-200 ${filters?.discount === 'without-discount'
                                        ? 'bg-red-600/10 text-red-600'
                                        : 'bg-white border border-[#DEDEDE] text-black hover:text-red-600 hover:bg-red-100'
                                        }`}
                                    onClick={() => handleSelect.discount({ label: 'Without Discount', value: 'without-discount' })}
                                >
                                    Without Discount
                                </button>





                            </div>





                        </Container>




                        <div className="w-full h-[65px] border-[#DEDEDE] bg-white border-t rounded-t-[12px] shadow-2xs fixed bottom-0 left-0 right-0 z-[60]">
                            <Container>

                                <div className="flex w-full mt-[13px] h-[35px] gap-[5.25px]">
                                    <button
                                        type="button"
                                        className="border w-full font-medium font-poppins text-[10.5px] rounded-[3px] text-[#333333] border-[#DEDEDE]"
                                        onClick={handleClear}
                                    >
                                        Reset
                                    </button>
                                    <button
                                        className="border w-full font-medium font-poppins text-[10.5px] rounded-[3px] bg-[#FF1645] text-white border-[#FF1645]"
                                        onClick={handleDone}
                                    >
                                        Show {projects?.data?.length ?? 0} Properties
                                    </button>
                                </div>
                            </Container>

                        </div>




                    </div>
                </motion.section>
            )}
        </AnimatePresence>
    );
}

export default MobileFilterOption;
