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
import { mockOpenHouses } from './data/mockOpenHouse';
import openhouseTicket from '@/app/assets/openhouseTicket.svg';

// Filter Modal Component
import FilterBottomSheet from '../Mobile/FilterBottomSheets';

import BookingFormModal from '@/components/OpenHouse/Mobile/BookingFormModal';
import BookingSuccessModal from '@/components/OpenHouse/Mobile/BookingSuccessModal';
import openHouseLoc from '@/app/assets/openhouseloc.svg';
import openHouseTime from '@/app/assets/openhousetime.svg';
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

   // ✅ API → fallback to mock data
const dataSource =
  allOpenHouses?.data?.length
    ? allOpenHouses.data
    : mockOpenHouses;

const totalPages = allOpenHouses?.pagination?.totalPages || 1;
const upcomingHouses = dataSource.slice(0, 5);
const allHouses = dataSource;


    const emirates = ['All Emirates', 'Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'JVC'];
    const developers = ['All Developers', 'Damac', 'Binghatti', 'Emaar', 'Nakheel', 'Aldar'];

    const getFilterButtonText = (type: string, value: string) => {
        if (!value) return type;
        return value;
    };

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
  <div className="mb-2">
    <h2 className="font-semibold text-[18px] text-black mb-2 mt-2">
      Upcoming
    </h2>

    <div className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide">
      {upcomingHouses.map((item: any, index: number) => (
        <div key={index} className="flex-shrink-0 w-[340px]">
          <div className="bg-white rounded-[24px] overflow-hidden  border border-[#DEDEDE]">

            {/* IMAGE */}
            <div className="relative w-full h-[220px]">
              <Image
                src={item?.image?.webp?.url || '/placeholder.jpg'}
                alt={item.title}
                fill
                className="object-cover rounded-[15px]"
                priority
              />
            </div>

            {/* CONTENT */}
            <div className="p-3">

              {/* META */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] text-gray-500 font-normal">
                  {item.developer || 'Damaa'}
                </span>

                <div className="flex items-center gap-1.5 text-gray-500 text-[10px]">
                  <span className="font-normal">{item.spots_left || '31'} Spots Left</span>
                  <Image
                    src={openhouseTicket}
                    alt="Slots"
                    width={15}
                    height={15}
                  />
                </div>
              </div>

              {/* TITLE */}
              <h3 className="text-[18px] font-semibold text-gray-900 leading-tight mb-2 line-clamp-2">
                {item.title}
              </h3>

              {/* LOCATION */}
              <div className="flex items-center gap-2 mb-2">
<Image
  src={openHouseLoc}
  alt="Location"
  width={18}
  height={18}
  className="opacity-70"
/>
                <p className="text-[15px] text-gray-600">
                  {item.location}
                </p>
              </div>

              {/* DATE */}
              <div className="flex items-center gap-2 mb-5">
<Image
  src={openHouseTime}
  alt="Time"
  width={18}
  height={18}
  className="opacity-70"
/>
                <p className="text-[15px] text-gray-600">
                  {formatDate(item.date)} @ {item.time}
                </p>
              </div>

              {/* BUTTON */}
              <button
                onClick={() => handleClickSlot(item)}
                className="
                  px-6
                  py-2.5
                  rounded-[8px]
                  border 
                  text-[15px]
                  font-medium
                  text-gray-900
                  hover:bg-gray-50
                  transition-colors
                  duration-200
                  border-[#DEDEDE]
    bg-[#F5F5F5]
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
<div className=" mb-10">
 

  <div className="space-y-2">
     <h2 className="font-poppins font-semibold text-[16px] text-black mb-4">
    All Openhouses Scheduled
  </h2>
{allHouses.map((item: any, index: number) => (
  <div
    key={index}
    className="bg-white border border-gray-200 rounded-[16px] flex gap-4 max-w-md mb-4" 
  >
    {/* Image */}
    <div className="relative w-[160px]  rounded-[12px] overflow-hidden flex-shrink-0">
      <img
        src={item?.image?.webp?.url || '/placeholder.jpg'}
        alt={item.title}
        className="w-full h-full object-cover"
      />
    </div>

    {/* Content */}
    <div className="flex-1 flex flex-col justify-between py-1">
      
      {/* Top section */}
      <div>
        {/* Developer */}
        <span className="text-[10px] text-gray-500 font-normal block mt-1 mb-1">
          {item.developer || 'Damaa'}
        </span>

        {/* Title */}
        <h3 className="font-bold text-base text-gray-900 leading-tight mb-2">
          {item.title}
        </h3>

        {/* Location */}
        <div className="flex items-center gap-2 text-gray-700 text-xs mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="flex-shrink-0">
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
          <span>{item.location}</span>
        </div>

        {/* Date & Time */}
        <div className="flex items-center gap-2 text-gray-700 text-xs mb-3">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="flex-shrink-0">
            <circle cx="12" cy="12" r="10"/>
            <polyline points="12 6 12 12 16 14"/>
          </svg>
          <span>{formatDate(item.date)} @ {item.time}</span>
        </div>

        {/* Spots Left */}
        <div className="flex items-center gap-2 text-gray-700 text-[10px] mt-2">
          <Image
                    src={openhouseTicket}
                    alt="Slots"
                    width={15}
                    height={15}
                  />
          <span>{item.spots_left || '31'} Spots Left</span>
        </div>
      </div>

      {/* Button */}
      <button
  onClick={() => handleClickSlot(item)}
  className="
    mt-2
    h-[35px]
    w-[140px]
    px-2
    mb-2
    rounded-[8px]
    border border-[#DEDEDE]
    bg-[#F5F5F5]
    text-[14px]
    font-medium
    text-[#111827]
    hover:bg-[#F9FAFB]
    transition
  "
>
  Book Your Slot
</button>

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