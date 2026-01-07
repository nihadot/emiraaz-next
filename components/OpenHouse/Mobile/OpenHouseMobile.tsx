'use client'
import { useViewFetchAllOpenHouseQuery } from '@/redux/openhouse/openhouseApi';
import { RootState } from '@/redux/store';
import React, { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux';
import Header from '../../Header';
import SectionDivider from '../../atom/SectionDivider/SectionDivider';
import Container from '../../atom/Container/Container';
import Image from 'next/image';
import { FaCalendarAlt } from 'react-icons/fa';
import { LuMapPin } from 'react-icons/lu';
import { FiSearch, FiChevronDown } from 'react-icons/fi';
import { MdAccessTime } from 'react-icons/md';
import PrimaryButton from '../../Buttons';
import { errorToast } from '../../Toast';
import { Footer } from '../../Footer';
import Modal from '../../Modal/Modal';
import { formatDate } from '../../atom/button/formatDate';
import MobileHeaderTitle from '../../atom/typography/MobileHeaderTitle';
import { X, Check } from 'lucide-react';

// Filter Modal Component
import FilterBottomSheet from '../Mobile/FilterBottomSheets';

import BookingFormModal from '@/components/OpenHouse/Mobile/BookingFormModal';
import BookingSuccessModal from '@/components/OpenHouse/Mobile/BookingSuccessModal';

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

    const totalPages = allOpenHouses?.pagination?.totalPages || 1;
    const upcomingHouses = allOpenHouses?.data?.slice(0, 5) || [];
    const allHouses = allOpenHouses?.data || [];

    const emirates = ['All Emirates', 'Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'JVC'];
    const developers = ['All Developers', 'Damac', 'Binghatti', 'Emaar', 'Nakheel', 'Aldar'];

    const getFilterButtonText = (type: string, value: string) => {
        if (!value) return type;
        return value;
    };

    return (
        <main>
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
  {/* Search */}
  <div className="mb-4">
    <div className="relative">
      <FiSearch
        size={18}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9CA3AF]"
      />
      <input
        type="text"
        placeholder="Search.."
        value={filters.search}
        onChange={(e) =>
          setFilters((prev) => ({ ...prev, search: e.target.value }))
        }
        className="
          w-full h-[48px]
          pl-11 pr-4
          rounded-xl
          border border-[#E5E7EB]
          bg-white
          text-[15px] text-[#6B7280]
          placeholder:text-[#9CA3AF]
          focus:outline-none
        "
      />
    </div>
  </div>

  {/* Filters */}
  <div className="grid grid-cols-2 gap-3">
    {/* Emirates */}
    <button
      onClick={() =>
        setFilterModals((prev) => ({ ...prev, emirate: true }))
      }
      className="
        h-[48px]
        px-4
        rounded-xl
        border border-[#E5E7EB]
        bg-white
        flex items-center justify-between
        text-[15px] text-[#6B7280]
      "
    >
      <span>
        {filters.emirate || 'Emirates'}
      </span>
      <FiChevronDown size={18} className="text-[#111827]" />
    </button>

    {/* Developers */}
    <button
      onClick={() =>
        setFilterModals((prev) => ({ ...prev, developer: true }))
      }
      className="
        h-[48px]
        px-4
        rounded-xl
        border border-[#E5E7EB]
        bg-white
        flex items-center justify-between
        text-[15px] text-[#6B7280]
      "
    >
      <span>
        {filters.developer || 'Developers'}
      </span>
      <FiChevronDown size={18} className="text-[#111827]" />
    </button>
  </div>
              {/* Upcoming Section */}
{upcomingHouses.length > 0 && (
  <div className="mb-6">
    <h2 className="font-poppins font-semibold text-[18px] text-black mb-4">
      Upcoming
    </h2>

    <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
      {upcomingHouses.map((item: any, index: number) => (
        <div
          key={index}
          className="flex-shrink-0 w-[300px]"
        >
          <div className="bg-white border border-[#E5E7EB] rounded-[20px] overflow-hidden">
            
            {/* Image */}
            <div className="relative w-full h-[170px]">
              <Image
                fill
                src={item?.image?.webp?.url || '/placeholder.jpg'}
                alt={item.title}
                className="object-cover"
              />
            </div>

            {/* Content */}
            <div className="px-4 pt-3 pb-4">
              
              {/* Meta Row */}
              <div className="flex items-center justify-between mb-1">
                <span className="text-[13px] text-[#6B7280]">
                  Damac
                </span>

                <div className="flex items-center gap-1 text-[#6B7280] text-[13px]">
                  <span>31 Spots Left</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"
                      stroke="#6B7280"
                      strokeWidth="1.5"
                    />
                    <circle cx="9" cy="7" r="4" stroke="#6B7280" strokeWidth="1.5" />
                  </svg>
                </div>
              </div>

              {/* Title */}
              <h3 className="font-poppins font-semibold text-[18px] text-[#111827] leading-snug mb-3 line-clamp-2">
                {item.title}
              </h3>

              {/* Location */}
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-full bg-[#F3F4F6] flex items-center justify-center">
                  <LuMapPin size={14} className="text-[#6B7280]" />
                </div>
                <p className="text-[14px] text-[#6B7280] line-clamp-1">
                  {item.location}
                </p>
              </div>

              {/* Date & Time */}
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 rounded-full bg-[#F3F4F6] flex items-center justify-center">
                  <MdAccessTime size={14} className="text-[#6B7280]" />
                </div>
                <p className="text-[14px] text-[#6B7280]">
                  {formatDate(item.date)} @ {item.time}
                </p>
              </div>

              {/* Button */}
              <button
                onClick={() => handleClickSlot(item)}
                className="
                  h-[40px]
                  px-6
                  rounded-lg
                  border border-[#D1D5DB]
                  text-[15px]
                  font-medium
                  text-black
                  bg-white
                "
              >
                Book Your Slot
              </button>

            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
)}

                 

            {/* All Openhouses Scheduled */}
<div className="mt-6 mb-20">
  <h2 className="font-poppins font-semibold text-[16px] text-black mb-4">
    All Openhouses Scheduled
  </h2>

  <div className="space-y-4">
    {allHouses.map((item: any, index: number) => (
      <div
        key={index}
        className="bg-white border border-[#E5E7EB] rounded-[14px] p-3 flex gap-3"
      >
        {/* Image */}
        <div className="relative w-[96px] h-[96px] rounded-[10px] overflow-hidden flex-shrink-0">
          <Image
            fill
            src={item?.image?.webp?.url || '/placeholder.jpg'}
            alt={item.title}
            className="object-cover"
          />
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col">
          {/* Developer */}
          <span className="text-[12px] text-[#9CA3AF] mb-[2px]">
            Damac
          </span>

          {/* Title */}
          <h3 className="font-poppins font-semibold text-[15px] text-[#111827] leading-tight mb-1">
            {item.title}
          </h3>

          {/* Location */}
          <div className="flex items-center gap-2 text-[#6B7280] text-[13px] mb-1">
            <LuMapPin size={14} />
            <span className="line-clamp-1">
              {item.location}
            </span>
          </div>

          {/* Date & Time */}
          <div className="flex items-center gap-2 text-[#6B7280] text-[13px] mb-1">
            <MdAccessTime size={14} />
            <span>
              {formatDate(item.date)} @ {item.time}
            </span>
          </div>

          {/* Spots + Button */}
          <div className="flex items-center justify-between mt-auto">
            <div className="flex items-center gap-1 text-[#6B7280] text-[12px]">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path
                  d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"
                  stroke="#6B7280"
                  strokeWidth="1.5"
                />
                <circle
                  cx="9"
                  cy="7"
                  r="4"
                  stroke="#6B7280"
                  strokeWidth="1.5"
                />
              </svg>
              <span>31 Spots Left</span>
            </div>

            <button
              onClick={() => handleClickSlot(item)}
              className="
                h-[34px]
                px-4
                rounded-lg
                border border-[#D1D5DB]
                bg-white
                text-[14px]
                font-medium
                text-black
              "
            >
              Book Your Slot
            </button>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>

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


            {/* Booking Form Modal */}
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