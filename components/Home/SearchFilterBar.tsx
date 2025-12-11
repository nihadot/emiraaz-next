/**
 * Search and Filter Bar Component
 * Primary filters: Search, Emirates, Cities, Category Type, Property Type
 * Optimized with React.memo and useCallback for performance
 */

'use client';

import React, { memo, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import SearchNew from '@/components/SearchField/SearchNew';
import SelectLatest from '@/components/SelectOption/SelectLatest';
import { SwitchSelector } from '@/components/SelectOption';
import { HiOutlineAdjustmentsHorizontal } from 'react-icons/hi2';
import { propertyCategoryType, propertyTypeSecond } from '@/data';
import { getCityHref } from './utils';

interface SearchFilterBarProps {
    filters: any;
    emirateOptions: any[];
    cityOptions: any[];
    initialValues: any;
    clear: boolean;
    onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onFilterModal: () => void;
}

// ⚡ Memoized Search Input
const SearchInput = memo(({ value, onChange }: { value: string, onChange: (e: any) => void }) => (
    <div className="md:h-[48px] h-10">
        <SearchNew
            value={value}
            onChange={onChange}
            placeholder="Search..."
        />
    </div>
));
SearchInput.displayName = 'SearchInput';

// ⚡ Memoized Mobile Filter Button
const MobileFilterButton = memo(({ onClick }: { onClick: () => void }) => (
    <button
        onClick={onClick}
        className="bg-red-600/10 rounded-[3px] flex justify-center items-center border-none w-[55px] lg:hidden h-10"
        aria-label="Open filters"
    >
        <HiOutlineAdjustmentsHorizontal className="w-[22px] h-[22px]" color='red' />
    </button>
));
MobileFilterButton.displayName = 'MobileFilterButton';

function SearchFilterBarComponent({
    filters,
    emirateOptions,
    cityOptions,
    initialValues,
    clear,
    onSearchChange,
    onFilterModal,
}: SearchFilterBarProps) {
    const router = useRouter();

    // ⚡ Memoized Handlers
    const handleEmirateSelect = useCallback((e: any) => {
        if (e) {
            window.location.href = `/buy/${e?.slug}`;
        }
    }, []);

    const handleCitySelect = useCallback((e: any) => {
        if (!e) return;
        const href = getCityHref(e);
        router.prefetch(href);
        router.push(href);
    }, [router]);

    const handleMobileEmirateSelect = useCallback((e: any) => {
        if (e) {
            router.push(`/buy/${e?.slug}`);
        }
    }, [router]);

    const handleMobileCitySelect = useCallback((e: any) => {
        if (e) {
            router.push(`/buy?cities=${e?.slug}`);
        }
    }, [router]);

    const handleCategorySelect = useCallback((e: any) => {
        if (e === 'off-plan-projects') return;
        router.push(`/buy/${e}`);
    }, [router]);

    const handlePropertyTypeSelect = useCallback((e: any) => {
        if (e === 'all') return;
        router.push(`/buy/off-plan-projects/${e}`);
    }, [router]);

    // ⚡ Memoized Default Values
    const defaultEmirate = useMemo(() =>
        emirateOptions?.find((item: any) => item?.slug === initialValues?.emirate),
        [emirateOptions, initialValues?.emirate]
    );

    const defaultCities = useMemo(() =>
        cityOptions?.filter((item: any) => initialValues?.cities?.includes(item.slug)),
        [cityOptions, initialValues?.cities]
    );

    return (
        <section className="grid grid-cols-1 w-full lg:grid-cols-[19.8%_9.5%_9.5%_37.5%_21%] gap-2">
            {/* Search */}
            <SearchInput
                value={filters?.search || ''}
                onChange={onSearchChange}
            />

            {/* Desktop Emirates */}
            <div className="hidden lg:flex h-[48px]">
                <SelectLatest
                    listContainerUlListContainerClassName="w-[200px]"
                    search
                    defaultValue={defaultEmirate}
                    clearSelection={clear}
                    label="Emirates"
                    options={emirateOptions}
                    onSelect={handleEmirateSelect}
                />
            </div>

            {/* Desktop Cities */}
            <div className="hidden lg:flex h-[48px]">
                <SelectLatest
                    search
                    defaultValueMultiple={defaultCities}
                    onSelect={handleCitySelect}
                    clearSelection={clear}
                    listContainerUlListContainerClassName="w-[220px]"
                    label="Cities"
                    options={cityOptions}
                />
            </div>

            {/* Mobile Emirates & Cities */}
            <div className="flex lg:hidden w-full gap-2">
                <div className="h-10 w-full">
                    <SelectLatest
                        listContainerUlListContainerClassName="w-[200px]"
                        search
                        defaultValue={defaultEmirate}
                        clearSelection={clear}
                        label="Emirates"
                        options={emirateOptions}
                        onSelect={handleMobileEmirateSelect}
                    />
                </div>

                <div className="h-10 w-full">
                    <SelectLatest
                        defaultValueMultiple={defaultCities}
                        search
                        onSelect={handleMobileCitySelect}
                        clearSelection={clear}
                        listContainerClassName="w-[220px] sm:!left-0 !-left-14"
                        label="Cities"
                        options={cityOptions}
                    />
                </div>
            </div>

            {/* Property Category Type */}
            {propertyCategoryType.length > 0 ? (
                <div className="h-10 sm:h-[48px]">
                    <SwitchSelector
                        containerClassName="sm:!gap-1"
                        onSelect={handleCategorySelect}
                        defaultValue={propertyCategoryType?.[0]?.value}
                        options={propertyCategoryType}
                    />
                </div>
            ) : (
                <div className="w-full h-full bg-gray-50"></div>
            )}

            {/* Property Type Second + Mobile Filter Button */}
            <div className="flex gap-2 h-10 sm:h-[48px]">
                <SwitchSelector
                    containerClassName="sm:!gap-1"
                    onSelect={handlePropertyTypeSelect}
                    defaultValue={propertyTypeSecond[0].value}
                    options={propertyTypeSecond}
                />

                <MobileFilterButton onClick={onFilterModal} />
            </div>
        </section>
    );
}

// ⚡ Export memoized component
export default memo(SearchFilterBarComponent);
