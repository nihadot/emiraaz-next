'use client'
import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AiOutlineClose } from "react-icons/ai";
import SectionDivider from '@/components/atom/SectionDivider/SectionDivider';
import Container from '@/components/atom/Container/Container';
import { AllProjectsItems } from '@/redux/project/types';
import SelectLatest from '@/components/SelectOption/SelectLatest';
import { FiltersState } from '@/components/types';
import Image from 'next/image';
import { EmirateNames } from '@/redux/emirates/types';
import { CountItem } from '@/redux/news/newsApi';
import { Pagination } from '@/utils/types';
import SwitchSelectorMobile from '@/components/SelectOption/SwitchSelectorMobile';
import { CompletionTypes, propertyCategoryStatus, propertyCategoryTypes } from '@/data';
import clsx from 'clsx';
import { apartment_icon, penthouse_icon, townhouse_icon, villa_icon } from '../assets';
import { SelectHandoverDate } from '@/components/SelectHandoverDate';

type Props = {
    handleChangeCities: (option: any[]) => void
    show: boolean;
    onClose: () => void;
    emiratesData: EmirateNames[],
    pagination: Pagination | undefined
    handleFilterChanges?: (item: AllProjectsItems[]) => void;
    setFiltersHandler: (item: FiltersState) => void;
    resultProjects: (item: AllProjectsItems[]) => void;
    updateUrl: ({ emirate, propertyFirst, propertySecond }: { emirate?: string, propertyFirst?: string, propertySecond?: string }) => void;
    allCounts: CountItem
    totalRecords: number,
    handleSelect: {
        emirate: (option: any) => void;
        propertyType: (option: any) => void;
        propertyCategoryStatus: (option: any) => void;
        completionType: (option: any) => void;
        propertyCategoryTypes: (option: any) => void;
        handoverDate: (data: any) => void;
        projectType: (option: any) => void;
        paymentPlan: (option: any) => void;
        furnishType: (option: any) => void;
        discount: (option: any) => void;

    },
    emirateOptions: {
        label: string;
        value: string;
        count: number;
        slug: string;
    }[],
    cityOptions: {
        label: string;
        value: string;
        count: number;
        slug: string;
    }[]
    initialValues: {
        emirate: string;
        cities: string[];
        propertyCategoryType: string;
        propertyCategoryStatus: string;
        propertyType?: string | undefined;
        completionType?: string | undefined;
        qtr?: string | undefined;
        year: number | "";
        paymentPlan?: string | undefined;
        furnishied?: string | undefined;
        discount?: string | undefined;
    }
    setIsPropertyType: (option: any) => void;
    filters: FiltersState;
    propertyTypesLists: any;
    isPropertyType: string;
    handleClear: () => void;
    clear: boolean;

};


function MobileFilterOption({
    show,
    handleClear,
    updateUrl,
    onClose,
    clear,
    totalRecords,
    isPropertyType,
    propertyTypesLists,
    setIsPropertyType,
    handleSelect,
    emirateOptions,
    initialValues,
    cityOptions,
    handleChangeCities,
    filters,
}: Props) {

    useEffect(() => {
        if (show) {
            const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
            document.body.style.overflow = "hidden";
            document.body.style.paddingRight = `${scrollBarWidth}px`;
        } else {
            document.body.style.overflow = "";
            document.body.style.paddingRight = "";
        }
    }, [show]);

    const handleDone = () => {


        onClose()

    }

  
    // Store the scroll position when modal opens
    useEffect(() => {
        if (show) {
            // Save current scroll position
            const scrollY = window.scrollY;
            const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;

            // Lock the body
            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollY}px`;
            document.body.style.width = '100%';
            document.body.style.paddingRight = `${scrollBarWidth}px`;
        } else {
            // Restore scroll position
            const scrollY = document.body.style.top;
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
            document.body.style.paddingRight = '';

            // Restore the exact scroll position
            window.scrollTo(0, parseInt(scrollY || '0') * -1);
        }

        // Cleanup on unmount
        return () => {
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
            document.body.style.paddingRight = '';
        };
    }, [show]);

    const icons = [
        {
            value: "villa",
            icon: villa_icon,
        },
        {
            value: "apartment",
            icon: apartment_icon,
        },
        {
            value: "penthouse",
            icon: penthouse_icon,
        },
        {
            value: "townhouse",
            icon: townhouse_icon,
        },
        {
            value: "shop",
            icon: townhouse_icon,
        },
        {
            value: "warehouse",
            icon: townhouse_icon,
        },
        {
            value: "officespace",
            icon: townhouse_icon,
        }
    ]

    return (
        <AnimatePresence
        >
            {show && (
                <motion.section
                
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className='fixed sm:hidden top-0 left-0 w-full h-full  bg-black bg-opacity-50 z-999 overflow-hidden'
                >

                    <div className='flex flex-col pb-20 w-full h-full overflow-auto bg-white'>
                        <div className="sticky top-0 left-0 bg-white z-60">
                            <Container>
                                <div className="flex h-14 items-center justify-between w-full">
                                    <label className='text-[13px] font-poppins font-semibold'>Filters</label>
                                    <AiOutlineClose
                                        onClick={onClose}
                                        size={20}
                                    />
                                </div>
                            </Container>

                            <SectionDivider
                                containerClassName="mb-[0px]"
                                lineClassName="h-[1px] w-full bg-[#DEDEDE]"
                            />
                        </div>


                        <Container>
                            <div className="flex mt-3 flex-col w-full gap-[9px]">


                                {/* Emirates */}
                                <div className=" h-10 w-full">
                                    <SelectLatest
                                        defaultValue={emirateOptions?.find((item: any) => item?.slug === initialValues?.emirate)}

                                        dropdownContainerClassName="!justify-center"
                                        listContainerUlListContainerClassName="w-[200px]"
                                        search
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

                                {/* Cities */}
                                <div className=" h-10 w-full">
                                    <SelectLatest
                                        dropdownContainerClassName="!justify-center"
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
                                        label="Cities"
                                        options={cityOptions}
                                    />
                                </div>


                                {/* Property Type Second */}
                                <div className="flex gap-2 h-[45px]">

                                    <SwitchSelectorMobile
                                        clearSelection={clear}
                                        className='!grid-cols-3 '
                                        onSelect={(e) => {
                                            console.log(e,'eee')
                                            updateUrl({ propertySecond: e });
                                            handleSelect.propertyCategoryStatus(e);
                                            setIsPropertyType(e);
                                        }
                                        }
                                        defaultValue={initialValues?.propertyCategoryStatus}

                                        options={propertyCategoryStatus}
                                    />
                                </div>


                                {/* Property Type First */}
                                <div className="h-20">
                                    <SwitchSelectorMobile
                                        clearSelection={clear}
                                        onSelect={(e) => {
                                            updateUrl({ propertyFirst: e });
                                            handleSelect.propertyCategoryTypes(e)
                                        }}
                                        defaultValue={filters.propertyCategoryTypes}
                                        options={propertyCategoryTypes}

                                    />
                                </div>

                                {/* Property Type */}
                                <label htmlFor="" className='mt-2 font-medium font-poppins flex text-[14px]'>Property Type</label>

                              

                                <div className="flex w-full justify-center gap-3 overflow-auto">
                                  
                                    {
                                        [
                                            ...(isPropertyType === 'residential' ? propertyTypesLists.residential : []),
                                            ...(isPropertyType === 'commercial' ? propertyTypesLists.commercial : []),
                                            ...(isPropertyType === 'all' ? propertyTypesLists.getAllExcludeAll() : [])
                                        ].map((type: any, i: number) => {

                                            const isExistIcon = icons.find((item) => item.value === type.value)

                                            return (
                                                <div
                                                key={i}

                                                    className="w-[70px] justify-center items-center gap-2 flex flex-col shrink-0 h-[100px] ">
                                                    <div

                                                        onClick={
                                                            (e) => {
                                                                const url = new URL(window.location.href);

                                                                if (type?.value) {

                                                                    url.searchParams.set('pt', type?.value ?? '');

                                                                } else {

                                                                    url.searchParams.delete('pt');

                                                                }

                                                                const newUrl = `${url.pathname}?${url.searchParams.toString()}`;

                                                                window.history.pushState({}, '', newUrl);

                                                                handleSelect.propertyType({ label: type?.label, value: type?.value })
                                                            }
                                                        }

                                                        className={clsx(" p-3.5 rounded-full  object-cover", filters?.propertyType?.includes(type?.value) ? 'bg-red-700/10' : 'outline outline-[#DEDEDE]')}>


                                                        <Image
                                                            className='bg-transparent' src={icons.find((item) => item?.value === type?.value)?.icon?.src || ''} alt={type?.label} width={30} height={30} />

                                                    </div>
                                                    <p className='text-[10px] text-nowrap  font-medium font-poppins text-center'>{type['label']}</p>


                                                </div>
                                            )
                                        })
                                    }

                                </div>



                                {/* Completion */}
                                <label htmlFor="" className='font-medium font-poppins mt-2 flex text-[14px]'>Completion</label>

                                <div className="h-[80px]">
                                    <SwitchSelectorMobile
                                        defaultValue={CompletionTypes[0].value}
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
                                  
                                    onDone={(year, quarter) => {
                                       
                                    }}

                                    onChange={(year, quarter) => {
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

                                    reset={() => {
                                        // setShowYearSelector(false)
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

                            </div>


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
                                        Show {totalRecords ?? 0} Properties
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
