/**
 * Advanced Filters Component
 * Secondary filters: Property Types, Completion, Handover, Payment Plan, Discount, Furnish Type
 */

'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';
import SelectLatest from '@/components/SelectOption/SelectLatest';
import SelectNew from '@/components/SelectOption/SelectNew';
import { SwitchSelector } from '@/components/SelectOption';
import ExpandableComponentDropdown from '@/components/ExpandableComponent/ExpandableComponent';
import { SelectHandoverDate } from '@/components/SelectHandoverDate';
import { CompletionTypes } from '@/data';
import { IoCloseOutline } from 'react-icons/io5';

interface AdvancedFiltersProps {
    filters: any;
    propertyTypesLists: any;
    paymentPlanOptions: any[];
    discountOptions: any[];
    furnishTypeOptions: any[];
    clear: boolean;
    onClear: () => void;
}

export default function AdvancedFilters({
    filters,
    propertyTypesLists,
    paymentPlanOptions,
    discountOptions,
    furnishTypeOptions,
    clear,
    onClear,
}: AdvancedFiltersProps) {
    const router = useRouter();
    const [showYearSelector, setShowYearSelector] = useState(false);

    const allTypes = propertyTypesLists?.getAll();
    const isPageTwo = filters?.page && filters?.page > 1;
    const heightClass = isPageTwo ? 'h-[33px]' : 'h-[48px]';

    return (
        <section className="lg:flex gap-2 mt-2 hidden">
            {/* Property Types */}
            <div className={clsx('w-[150px]', heightClass)}>
                <SelectLatest
                    label="Property Types"
                    options={allTypes}
                    onSelect={(e) => {
                        if (e) {
                            router.push(`/buy?pt=${e.value}`);
                        }
                    }}
                    clearSelection={clear}
                    defaultValue={allTypes?.find((item: any) => item?.value === 'all')}
                    listContainerUlListContainerClassName="w-[200px]"
                />
            </div>

            {/* Completion Types */}
            <div className={clsx('lg:flex-[30%]', heightClass)}>
                <SwitchSelector
                    defaultValue="all"
                    onSelect={(e) => {
                        const url = new URL(window.location.href);
                        if (e !== 'all') {
                            url.searchParams.set('ct', e);
                            router.push(`/buy?${url.searchParams.toString()}`);
                        }
                    }}
                    clearSelection={clear}
                    options={CompletionTypes}
                />
            </div>

            {/* Handover Date */}
            <div className={clsx('flex-[8%]', heightClass)}>
                <ExpandableComponentDropdown
                    clear={clear}
                    isOpen={showYearSelector}
                    onToggle={() => setShowYearSelector(prev => !prev)}
                    label={
                        (filters.handoverDate?.year || filters.handoverDate?.quarter)
                            ? `${filters.handoverDate?.year}-${filters.handoverDate?.quarter}`
                            : "Handover"
                    }
                    isSelected={false}
                    onClear={() => { }}
                    customCloseControl={<button className="text-xs text-red-600">X</button>}
                >
                    <SelectHandoverDate
                        initialYear={filters.handoverDate?.year || 2025}
                        initialQuarter={filters.handoverDate?.quarter || "Q2"}
                        onDone={(year, quarter) => {
                            const url = new URL(window.location.href);
                            if (year || quarter) {
                                url.searchParams.set('y', year + '');
                                url.searchParams.set('q', quarter.toLowerCase());
                                router.push(`/buy?${url.searchParams.toString()}`);
                            }
                        }}
                        onClose={() => setShowYearSelector(false)}
                        reset={() => { }}
                        onChange={() => { }}
                    />
                </ExpandableComponentDropdown>
            </div>

            {/* Payment Plan */}
            <div className={clsx('flex-[10%]', heightClass)}>
                <SelectNew
                    clearSelection={clear}
                    className="w-[200px]"
                    label="Payment Plan"
                    options={paymentPlanOptions}
                    onSelect={(e) => {
                        const url = new URL(window.location.href);
                        if (e) {
                            url.searchParams.set('pp', e.value);
                            router.push(`/buy/?${url.searchParams.toString()}`);
                        }
                    }}
                />
            </div>

            {/* Discount */}
            <div className={clsx('flex-[7%]', heightClass)}>
                <SelectNew
                    clearSelection={clear}
                    className="w-[200px]"
                    label="Discount"
                    options={discountOptions}
                    onSelect={(e) => {
                        const url = new URL(window.location.href);
                        if (e?.value) {
                            url.searchParams.set('ds', e.value);
                            router.push(`/buy/?${url.searchParams.toString()}`);
                        }
                    }}
                />
            </div>

            {/* Furnish Type */}
            <div className={clsx('w-[140px]', heightClass)}>
                <SelectNew
                    clearSelection={clear}
                    className="w-[200px]"
                    label="Furnish Type"
                    options={furnishTypeOptions}
                    onSelect={(e) => {
                        const url = new URL(window.location.href);
                        if (e) {
                            url.searchParams.set('ft', e?.value);
                            router.push(`/buy/?${url.searchParams.toString()}`);
                        }
                    }}
                />
            </div>

            {/* Clear Filters */}
            <div
                onClick={onClear}
                className={clsx('flex cursor-pointer max-w-[120px] items-center gap-2', heightClass)}
            >
                <label className="text-[12px] cursor-pointer">Clear Filters</label>
                <div className="bg-black cursor-pointer w-3.5 rounded-full h-3.5 flex justify-center items-center">
                    <IoCloseOutline size={12} color="white" />
                </div>
            </div>
        </section>
    );
}
