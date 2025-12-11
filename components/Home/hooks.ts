/**
 * Custom hooks for HomePage component
 * Extracted to improve readability and reusability
 */

import { useState, useEffect, useMemo, useCallback } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { LOCAL_STORAGE_KEYS } from '@/api/storage';
import { useViewAllWishlistsQuery } from '@/redux/wishlist/wishlistApi';
import { useFetchAllProjectsQuery } from '@/redux/project/projectApi';
import { FiltersState } from '@/components/types';

/**
 * Hook to manage user authentication state
 */
export function useUserAuth() {
    const userDataString = useMemo(() => {
        return typeof window !== "undefined"
            ? localStorage.getItem(LOCAL_STORAGE_KEYS.USER_DATA)
            : null;
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

    return { userId, userDataString };
}

/**
 * Hook to manage wishlist data
 */
export function useWishlist(userId: string | null) {
    const { data: wishlistDataItem } = useViewAllWishlistsQuery(
        { userId: userId || '' },
        { skip: !userId }
    );

    return wishlistDataItem?.data || [];
}

/**
 * Hook to manage splash screen loading
 */
export function useSplashScreen() {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];
        const lastSeen = localStorage.getItem('splashLastSeenDate');

        if (lastSeen !== today) {
            setLoading(true);
            const timer = setTimeout(() => {
                setLoading(false);
                localStorage.setItem('splashLastSeenDate', today);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, []);

    return loading;
}

/**
 * Hook to manage filters state with URL sync
 */
export function useFilters(initialFilters?: Partial<FiltersState>) {
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
        ...initialFilters,
    });

    const [debouncedSearch, setDebouncedSearch] = useState("");

    // Debounce search
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(filters.search || '');
            setFilters(prev => ({ ...prev, page: 1 }));
        }, 500);

        return () => clearTimeout(handler);
    }, [filters.search]);

    // Sync page from URL
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const page = urlParams.get('page');

        if (page) {
            setFilters(prev => ({ ...prev, page: parseInt(page) }));
        }
    }, []);

    const handleChangeSearch = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setFilters(prev => ({ ...prev, search: event.target.value }));
    }, []);

    const handleClear = useCallback(() => {
        setFilters({
            page: 1,
            search: "",
            cities: [],
            productTypeOptionFirst: '',
            propertyType: '',
            emirate: "",
        });

        const url = new URL(window.location.href);
        url.searchParams.delete('page');
        window.history.pushState({}, '', url);
    }, []);

    return {
        filters,
        setFilters,
        debouncedSearch,
        handleChangeSearch,
        handleClear,
    };
}

/**
 * Hook to fetch projects with filters
 */
export function useProjects(filters: FiltersState, debouncedSearch: string, initialData: any) {
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

    const { data } = useFetchAllProjectsQuery(queryParams, {
        refetchOnMountOrArgChange: true,
        refetchOnReconnect: true,
        refetchOnFocus: true,
        skip: false,
    });

    const projects = data?.data || initialData?.data || [];
    const pagination = data?.pagination || initialData?.pagination || {};

    return { projects, pagination };
}

/**
 * Hook to manage pagination
 */
export function usePagination() {
    const [paginationHappened, setPaginationHappened] = useState(false);
    const router = useRouter();

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [paginationHappened]);

    const handlePageChange = useCallback((newPage: number, setFilters: any) => {
        const url = new URL(window.location.href);
        url.searchParams.set('page', newPage.toString());
        window.history.pushState({}, '', url);
        setPaginationHappened(prev => !prev);
        setFilters((prev: any) => ({ ...prev, page: newPage }));
    }, []);

    return { paginationHappened, handlePageChange };
}

/**
 * Hook to handle project navigation with prefetching
 * Optimized for instant page transitions
 */
export function useProjectNavigation() {
    const router = useRouter();
    const searchParams = useSearchParams();

    // ⚡ Prefetch project page on hover for instant navigation
    const handleMouseEnter = useCallback((item: any) => {
        const currency = searchParams.get('currency');
        const slug = item.slug;
        const queryString = currency ? `?currency=${currency}` : '';

        // Prefetch the page in the background
        router.prefetch(`/projects/${slug}${queryString}`);
    }, [router, searchParams]);

    // ⚡ Instant navigation on click
    const handleClick = useCallback((item: any) => {
        const currency = searchParams.get('currency');
        const slug = item.slug;
        const queryString = currency ? `?currency=${currency}` : '';

        sessionStorage.setItem('scroll-position', window.scrollY.toString());

        // Use router.push for instant navigation (already prefetched)
        router.push(`/projects/${slug}${queryString}`);
    }, [router, searchParams]);

    return { handleClick, handleMouseEnter };
}

/**
 * Hook to manage enquiry form
 */
export function useEnquiryForm() {
    const [enquiryForm, setEnquiryForm] = useState({
        status: false,
        id: '',
        count: 0
    });

    const handleEnquiryFormClick = useCallback((item: any) => {
        setEnquiryForm({
            status: true,
            id: item._id,
            count: 1,
        });
    }, []);

    return { enquiryForm, setEnquiryForm, handleEnquiryFormClick };
}
