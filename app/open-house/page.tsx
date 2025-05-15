'use client'
import Container from '@/components/atom/Container/Container'
import SectionDivider from '@/components/atom/SectionDivider/SectionDivider'
import PrimaryButton from '@/components/Buttons'
import { Footer } from '@/components/Footer'
import Header from '@/components/Header'
import Modal from '@/components/Modal/Modal'
import Pagination from '@/components/Pagination/Pagination'
import { useViewFetchAllOpenHouseQuery } from '@/redux/openhouse/openhouseApi'
import Image from 'next/image'
import React, { useEffect, useMemo, useState } from 'react'
import { FaCalendarAlt } from "react-icons/fa";
import { LuMapPin } from "react-icons/lu";
import EnquiryForm from './EnquiryForm'
import RegistrationSuccess from '@/components/EnquiryForm/RegistrationSuccess'
import { RootState } from '@/redux/store'
import { useSelector } from 'react-redux'
import { errorToast } from '@/components/Toast'
import SpaceWrapper from '@/components/atom/SpaceWrapper/SpaceWrapper'

function Enquiry() {

  const { isAuthentication } = useSelector((state: RootState) => state.user);


  const [filters, setFilters] = useState({
    page: 1,
    search: "",
  });

  const [bookingState, setBookingState] = useState({
    status: false,
    id: '',
    count: 0,
  });


  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(filters.search);
      setFilters(prev => ({ ...prev, page: 1 }));
    }, 500);

    return () => clearTimeout(handler);
  }, [filters.search]);

  const handleClickSlot = (item: string, count: number) => {
    setBookingState({ status: true, id: item, count: count });
  }


  const queryParams = useMemo(() => ({
    limit: 20,
    page: filters.page,
    search: debouncedSearch,
  }), [filters, debouncedSearch]);


  const { data: allOpenHouses } = useViewFetchAllOpenHouseQuery(queryParams);

  const totalPages = allOpenHouses?.pagination?.totalPages || 1;


  return (
    <main>
      <Header />

      <SectionDivider
        containerClassName="mt-[10.5px] mb-[12px]"
        lineClassName="h-[1px] w-full bg-[#DEDEDE]"
      />

      <Container>
        <h1 className=' mb-[13px] sm:mb-[33px] font-poppins mt-[51px] text-center font-medium text-[19.5px] sm:text-[37.5px]'>
          Join Us for Upcoming <span className='text-[#FF1645]
'>Open Houses</span>
        </h1>




        <div className="gap-[15px] sm:gap-[31px] grid rounded-[1px] grid-cols-1 sm:grid-cols-2 md:grid-cols-3">

          {
            allOpenHouses && allOpenHouses.data && allOpenHouses?.data?.map((item, index) => {
              return (
                <div key={index} className="h-[312px] border border-[#DEDEDE] rounded-[6px] w-full " >
                  <div className="w-full relative h-[177px]">
                    <Image
                      fill
                      src={item.image.secure_url}
                      alt={item.title}
                      className='object-cover'
                    />
                  </div>
                  <div className="px-[13px] mt-[7.5px]">
                    <h3 className='font-poppins mt-[4.5px] font-medium text-[16.5px] sm:text-[17px] capitalize'>{item.title}</h3>
                    <div className="flex gap-[7.5px] mt-[4.5px] items-center justify-start">
                      <FaCalendarAlt size={15} color='#767676' />
                      <p className='font-poppins text-[11px] sm:text-[12px] mt-1 font-medium text-[#767676]'>{item.date}</p>
                    </div>



                    <div className="flex gap-[7.5px] mt-[4.5px] items-center justify-start">
                      <LuMapPin size={15} color='#767676' />
                      <p className='font-poppins text-[12px] font-medium text-[#767676]'>Dubai Hills Estate Sales Center</p>
                    </div>



                    <PrimaryButton
                      onClick={() => {
                        if (isAuthentication) {
                          handleClickSlot(item._id, 1)
                        } else {
                          errorToast('Please login first')
                        }
                      }}
                      type="submit"
                      className=" bg-[#FFE7EC] disabled:!bg-[#FFE7EC]/60 w-fit !px-3 mt-[8.25px] h-[31px] border-none "
                    >
                      <div className="flex justify-center items-center gap-2">
                        <label className=" text-nowrap font-medium text-[#FF1645] text-[12.75px] sm:text-[13.5px] font-poppins">{false ? 'Booking...' : 'Book Your Slot'}</label>
                      </div>
                    </PrimaryButton>
                  </div>
                </div>
              )
            })
          }


        </div>



      </Container>



<SpaceWrapper
className='pb-20'
>

      <Pagination
        currentPage={filters.page}
        totalPages={totalPages}
        onPageChange={(newPage) => setFilters(prev => ({ ...prev, page: newPage }))}
      />
</SpaceWrapper>




      <Modal
        isOpen={bookingState.status}
        // isOpen={true}
        onClose={() => setBookingState({ status: false, id: '', count: 0 })}
      >
        {bookingState.count === 1 && <EnquiryForm
          setState={setBookingState}
          state={bookingState}
          onClose={() => setBookingState({ status: false, id: '', count: 0 })}
        />}


        {
          bookingState.count === 2 && <RegistrationSuccess
            onClose={() => setBookingState({ status: false, id: '', count: 0 })}
          />
        }




      </Modal>

      <Footer />
    </main>
  )
}

export default Enquiry