'use client'
import { useViewFetchAllOpenHouseQuery } from '@/redux/openhouse/openhouseApi';
import { RootState } from '@/redux/store';
import React, { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux';
import Header from '../../Header';
import SectionDivider from '../../atom/SectionDivider/SectionDivider';
import Container from '../../atom/Container/Container';
import { errorToast } from '../../Toast';
import { Footer } from '../../Footer';
import MobileHeaderTitle from '../../atom/typography/MobileHeaderTitle';
import { mockOpenHouses } from './data/mockOpenHouse';
import FilterBottomSheet from './FilterBottomSheets';
import BookingFormModal from './BookingFormModal';
import BookingSuccessModal from './BookingSuccessModal';
import SearchBar from './SearchBar';
import FilterButtons from './FilterButtons';
import UpcomingOpenHousesSection from './UpcomingOpenHousesSection';
import AllOpenHousesSection from './AllOpenHousesSection';

function MobileOpenHouse() {
    const { isAuthentication } = useSelector((state: RootState) => state.user);

    const [filters, setFilters] = useState({
        page: 1,
        search: "",
        emirate: "",
        developer: ""
    });

    const [filterModals, setFilterModals] = useState({
        emirate: false,
        developer: false
    });

    const [bookingState, setBookingState] = useState({
        status: false,
        data: null as any,
    });

    const [successModal, setSuccessModal] = useState(false);

    const [debouncedSearch, setDebouncedSearch] = useState("");

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(filters.search);
            setFilters(prev => ({ ...prev, page: 1 }));
        }, 500);

        return () => clearTimeout(handler);
    }, [filters.search]);

    const handleClickSlot = (item: any) => {
        if (isAuthentication) {
            setBookingState({ status: true, data: item });
        } else {
            errorToast('Please login first');
        }
    }

    const handleBookingSuccess = () => {
        setBookingState({ status: false, data: null });
        setSuccessModal(true);
    };

    const queryParams = useMemo(() => ({
        limit: 20,
        page: filters.page,
        search: debouncedSearch,
    }), [filters.page, debouncedSearch]);

    const { data: allOpenHouses } = useViewFetchAllOpenHouseQuery(queryParams);

    const dataSource =
        allOpenHouses?.data?.length
            ? allOpenHouses.data
            : mockOpenHouses;

    const totalPages = allOpenHouses?.pagination?.totalPages || 1;
    const upcomingHouses = dataSource.slice(0, 5);
    const allHouses = dataSource;

    return (
        <main className='font-poppins'>
            <Header logoSection={
                <div className='h-full w-full flex justify-center items-center'>
                    <MobileHeaderTitle content='Open House' />
                </div>
            } />

            <SectionDivider
                containerClassName="mt-[10.5px] mb-[12px]"
                lineClassName="h-[1px] w-full bg-[#DEDEDE]"
            />

            <Container>
                <SearchBar
                    value={filters.search}
                    onChange={(value) => setFilters(prev => ({ ...prev, search: value }))}
                />

                <FilterButtons
                    emirateValue={filters.emirate}
                    developerValue={filters.developer}
                    onEmirateClick={() => setFilterModals(prev => ({ ...prev, emirate: true }))}
                    onDeveloperClick={() => setFilterModals(prev => ({ ...prev, developer: true }))}
                />

                <UpcomingOpenHousesSection
                    upcomingHouses={upcomingHouses}
                    onBookSlot={handleClickSlot}
                />

                <AllOpenHousesSection
                    allHouses={allHouses}
                    onBookSlot={handleClickSlot}
                />
            </Container>

            <FilterBottomSheet
                isOpen={filterModals.developer}
                onClose={() => setFilterModals(prev => ({ ...prev, developer: false }))}
                title="Developers"
                options={['Damac', 'Binghatti', 'Emaar', 'Nakheel']}
                selectedValue={filters.developer}
                onSelect={(value) =>
                    setFilters(prev => ({ ...prev, developer: value }))
                }
            />

            <FilterBottomSheet
                isOpen={filterModals.emirate}
                onClose={() => setFilterModals(prev => ({ ...prev, emirate: false }))}
                title="Emirates"
                options={['Dubai', 'Abu Dhabi', 'Sharjah', 'JVC']}
                selectedValue={filters.emirate}
                onSelect={(value) =>
                    setFilters(prev => ({ ...prev, emirate: value }))
                }
            />

            <BookingFormModal
                isOpen={bookingState.status}
                onClose={() => setBookingState({ status: false, data: null })}
                openHouseData={bookingState.data}
                onSuccess={() => setSuccessModal(true)}
            />

            <BookingSuccessModal
                isOpen={successModal}
                onClose={() => setSuccessModal(false)}
            />

            <Footer />
        </main>
    )
}

export default MobileOpenHouse
