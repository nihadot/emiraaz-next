/**
 * Utility functions for HomePage component
 * Extracted to improve code organization
 */

import { EmirateNames } from '@/redux/emirates/types';
import { CityNames } from '@/redux/cities/types';
import { CountItem } from '@/redux/news/newsApi';

/**
 * Generate emirate options with preferred ordering
 */
export function generateEmirateOptions(emiratesData: EmirateNames[]) {
    const preferredOrder = ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ras Al Khaimah', 'Ajman', 'Umm Al-Quwain'];

    const mappedOptions = emiratesData.map((item) => ({
        label: item.name,
        value: item._id,
        count: item.count,
        slug: item.slug,
    })) || [];

    const sortedOptions = mappedOptions.sort((a, b) => {
        const aIndex = preferredOrder.indexOf(a.label);
        const bIndex = preferredOrder.indexOf(b.label);

        if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
        if (aIndex !== -1) return -1;
        if (bIndex !== -1) return 1;

        return a.label.localeCompare(b.label);
    });

    return [
        {
            label: "All",
            value: "all",
            count: sortedOptions.reduce((a, b) => a + b.count, 0)
        },
        ...sortedOptions,
    ];
}

/**
 * Generate city options
 */
export function generateCityOptions(initialCities: CityNames[]) {
    const mappedOptions = initialCities?.map((item) => ({
        label: item.name,
        value: item.name,
        count: item.count,
        slug: item.slug,
    })) || [];

    return [
        {
            label: "All",
            value: "all",
            count: mappedOptions.reduce((a, b) => a + b.count, 0)
        },
        ...mappedOptions,
    ];
}

/**
 * Generate property type options
 */
export function generatePropertyTypeOptions(allCounts: CountItem) {
    const totalPropertyTypesCounts = allCounts?.propertyTypes
        ?.map(item => item?.count)
        .reduce((a, b) => a + b, 0) || 0;

    const propertyTypesLists = {
        commercial: [
            {
                value: "officespace",
                label: "Office Space",
                count: allCounts?.propertyTypes?.find(item => item?.name === 'officespace')?.count || 0,
            },
            {
                value: "shop",
                label: "Shop",
                count: allCounts?.propertyTypes?.find(item => item?.name === 'shop')?.count || 0,
            },
            {
                value: "warehouse",
                label: "Warehouse",
                count: allCounts?.propertyTypes?.find(item => item?.name === 'warehouse')?.count || 0,
            },
        ],

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

        getAll: function () {
            return [...this.default, ...this.residential, ...this.commercial];
        }
    };

    return propertyTypesLists;
}

/**
 * Generate payment plan options
 */
export function generatePaymentPlanOptions(allCounts: CountItem) {
    return [
        {
            value: "all",
            label: "All",
            count: allCounts?.paymentPlans?.reduce((acc, curr) => acc + curr.count, 0) || 0,
        },
        {
            value: "on-handover",
            label: "On Handover",
            count: allCounts?.paymentPlans?.find(item => item?.name === 'onHandover')?.count || 0,
        },
        {
            value: "post-handover",
            label: "Post Handover",
            count: allCounts?.paymentPlans?.find(item => item?.name === 'postHandover')?.count || 0,
        },
    ];
}

/**
 * Generate discount options
 */
export function generateDiscountOptions(allCounts: CountItem) {
    return [
        {
            value: "all",
            label: "All",
            count: allCounts?.discount?.reduce((acc, curr) => acc + curr.count, 0) || 0,
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
        },
    ];
}

/**
 * Generate furnish type options
 */
export function generateFurnishTypeOptions(allCounts: CountItem) {
    return [
        {
            value: "all",
            label: "All",
            count: allCounts?.furnisheds?.reduce((acc, curr) => acc + curr.count, 0) || 0,
        },
        {
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
        },
    ];
}

/**
 * Shuffle array utility
 */
export function shuffleArray<T>(arr: T[]): T[] {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
}

/**
 * Get city href helper
 */
export function getCityHref(e: any): string {
    return e ? `/buy?cities=${e.slug}` : '';
}
