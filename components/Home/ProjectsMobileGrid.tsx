'use client'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import PropertyCardMobile from '../PropertyCardMobile/PropertyCardMobile'
import { useFilters, usePagination, useProjects } from './hooks';
import { AllProjectsItems } from '@/redux/project/types';
import { Pagination } from '@/utils/types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import Container from '../atom/Container/Container';
import PaginationNew from '../PaginationNew/PaginationNew';
import { useDeviceType } from '@/utils/useDeviceType';
import { setPage } from '@/redux/filters/filterSlice';
import { useSearchParams,useRouter } from 'next/navigation';
// import { useRouter } from 'next/router';

type Props = {
    initialData: {
        data: AllProjectsItems[];
        pagination: Pagination;
    };
}

function ProjectsMobileGrid({ initialData }: Props) {

    const { filters, setFilters, debouncedSearch, handleChangeSearch, handleClear } = useFilters();

    const filtersState = useSelector((state: RootState) => state.filters);

    // console.log(filtersState, 'filtersState')
    const [paginationHappened, setPaginationHappened] = useState(false);



    const { projects, pagination } = useProjects({
        bath: filtersState.bath,
        beds: filtersState.beds,
        ...(filtersState.cities?.slug && { cities: [filtersState.cities.slug] }),
        completionType: filtersState.completionType,
        discount: filtersState.discount,
        ...(filtersState.page && { search: filtersState.page }),
        search: filtersState.search,
        propertyType: filtersState.propertyType,
        projectTypeFirst: filtersState.categoryType,
        projectTypeLast: filtersState.categoryStatus,
        year: filtersState.year,
        qtr: filtersState.qtr,
        paymentPlan: filtersState.paymentPlan,
        furnishType: filtersState.furnishType,
        page: filtersState.page,

    }, debouncedSearch, initialData);


    // ⚡ Memoized derived values
    const totalPages = useMemo(() => pagination?.totalPages || 1, [pagination?.totalPages]);
    const totalRecords = useMemo(() => pagination?.totalRecords, [pagination?.totalRecords]);

    const deviceType = useDeviceType();

    const dispatch = useDispatch();

    const handlePageChange = useCallback((newPage: number) => {
        const url = new URL(window.location.href);
        url.searchParams.set("page", String(newPage));
        window.history.pushState({}, "", url);

        dispatch(setPage(newPage));
        setPaginationHappened(prev => !prev);
    }, []);

    const searchParams = useSearchParams();
    const router = useRouter();
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [paginationHappened]);

    const handleClick = (item: any) => {
        const currency = searchParams.get('currency');
        const slug = item.slug;
        // console.log(slug,'slug')
        const queryString = currency ? `?currency=${currency}` : '';

        // Prefetch the page in the background
        router.prefetch(`/projects/${slug}${queryString}`);
        router.push(`/projects/${slug}${queryString}`);

    }

    return (
        <div>
            {projects && projects?.map((item: any) => {
                return (
                    <PropertyCardMobile
                    key={item?._id}
                        data={{
                            id: item?._id,
                            title: item?.projectTitle,
                            type: item?.propertyTypes?.join(', '),
                            location: item?.address,
                            beds: item?.type,
                            totalFloors: item?.totalFloors,
                            area: item?.squareFeet,
                            price: item?.priceInAED,
                            discount: item?.discount,
                            images: item?.mainImages?.map((i: any) => i.webp?.url),
                            slug: item?.slug,
                            handleClick: () => handleClick(item),
                        }}

                    />
                )
            })}


            {/* Pagination */}
            <Container>
                <div className="mt-[23.25px]">
                    <PaginationNew
                        currentPage={filtersState.page || 1}
                        totalPages={totalPages}
                        onPageChange={(newPage) => handlePageChange(newPage)}
                        maxVisiblePages={deviceType === 'mobile' ? 4 : 8}
                    />
                    <div className="text-[10.5px] mt-[8.25px] flex justify-center items-center font-normal font-poppins text-[#767676]">
                        {filtersState.page} To {totalPages} of {totalRecords} Listings
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default ProjectsMobileGrid