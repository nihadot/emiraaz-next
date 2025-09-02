"use client";
import { menu_icon, mobileAppIcon, propertySellerWhiteLogo } from '@/app/assets';
import Image from 'next/image';
import React, { Suspense, useEffect, useState } from 'react';
import NavMenu from './NavMenu';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';
import PrimaryButton from '../Buttons';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { logoutFailure, logoutStart, logoutSuccess } from '@/redux/userSlice/userSlice';
import { LOCAL_STORAGE_KEYS } from '@/api/storage';
import { useRouter, useSearchParams } from 'next/navigation';
import { errorToast } from '../Toast';
import Container from '../atom/Container/Container';
import { IoCloseSharp, IoMenuOutline } from "react-icons/io5";
import SpaceWrapper from "../atom/SpaceWrapper/SpaceWrapper";
import { PiUserCircle } from 'react-icons/pi';
import CurrencySelect from './CurrencySelect';
import Link from 'next/link';

function HeaderSecondaryComponenet() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: 'About', link: '/about-property-seller' },
    { name: 'Property Talks', link: '/property-talks' },
    { name: 'Rental Income', link: '/rental-income' },
    { name: 'Developers', link: '/developers' },
    { name: 'Cities', link: '/cities' }
  ];

  const dispatch = useDispatch();
  const router = useRouter();

  const toggleMenu = () => setIsOpen(prev => !prev);
  const { isAuthentication } = useSelector((state: RootState) => state.user);
  const handleLogout = async () => {

    if (!window.confirm('Logout?')) {
      return true;
    }
    try {
      dispatch(logoutStart());

      localStorage.removeItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN)
      localStorage.removeItem(LOCAL_STORAGE_KEYS.USER_DATA)

      dispatch(logoutSuccess());


      router.push("/login");

    } catch (error: any) {
      dispatch(logoutFailure(error))
      errorToast(error?.response?.data?.message || error?.data?.message || error?.response?.message || error?.message || 'Error occurred, please try again later');



    }
  };

  const [currency, setCurrency] = useState<string>('');

  useEffect(() => {
    const url = new URL(window.location.href);
    const currency = url.searchParams.get('currency');
    if (currency) {
      setCurrency(currency);
    } else {
      setCurrency('AED');
    }
  }, []);


  return (
    <Container>
      <header className='relative flex py-4 justify-between items-center w-full'>

        {/* Mobile Menu Button */}
        <button
          className={clsx(
            'lg:hidden',      // always present
            isOpen ? 'invisible' : 'visible'  // conditional
          )}
          onClick={toggleMenu}
        >
          <IoMenuOutline size={30} color='#fff' />
          {/* <Image src={menu_icon} alt='menu icon' width={30} /> */}
        </button>


        {/* Logo */}
        <div onClick={() => router.push("/")} className="w-[140px] cursor-pointer sm:w-[138.75px] ms-7 sm:ms-0 h-[50px] sm:h-[32.25px] relative ">
          <Image src={propertySellerWhiteLogo} alt="" width={140} height={50} className='object-contain h-full  max-w-[200px] w-full' />

        </div>
        {/* <PrimaryButton
          type='button'
          className='flex !rounded-[2.5px] md:hidden w-[66.75px] items-center gap-1'
        >
          <>
            <label htmlFor="" className='text-[11px] text-white font-normal  font-poppins'>AED</label>
            <div className="w-[28px] flex justify-center items-center h-[20px] relative">
              <IoChevronDown size={14} color='#fff' />
            </div>

          </>


        </PrimaryButton> */}

        <div className="block sm:hidden"> <CurrencySelect
          defaultCurrency={currency}
          dropdownMainContainerClassName='!w-[85px]'
          dropdownContainerClassName='!bg-transparent !h-[38px]'
          selectedCurrencyClassName='!text-white'
          IoChevronDownColor='white'
        /></div>


        <div className="min-laptop:flex hidden items-center gap-4">


          {/* Desktop Nav */}
          <div className='hidden me-3 min-laptop:block'>
            <NavMenu
              linkItemClassName="!text-white"
              items={menuItems} />
          </div>

          <div className="flex gap-2">

            <CurrencySelect
              defaultCurrency={currency}
              dropdownMainContainerClassName='!w-[85px]'
              dropdownContainerClassName='!bg-transparent'
              selectedCurrencyClassName='!text-white'
              IoChevronDownColor='white'
            />

            {isAuthentication ? <PrimaryButton
              onClick={() => router.push('/profile')}
              type='button'
              className='flex w-fit !px-2 h-[33px] cursor-pointer items-center'
            >
              <>

                <div className="w-4 h-4 relative flex cursor-pointer justify-center items-center">
                  <PiUserCircle size={18} color='white' />
                </div>

                <label htmlFor="" className='text-[12px] text-white cursor-pointer font-normal max-w-[80px] overflow-hidden font-poppins'>Profile</label>
              </>


            </PrimaryButton> :
              <PrimaryButton
                onClick={() => router.push('/login')}
                type='button'
                className='flex w-fit cursor-pointer !px-2 h-[33px] items-center'
              >
                <>

                  <div className="w-4 h-4  relative flex justify-center items-center">
                    <PiUserCircle size={18} color='white' />
                  </div>

                  <label htmlFor="" className='text-white text-[12px] font-normal  font-poppins'>Login</label>
                </>


              </PrimaryButton>

            }
          </div>

        </div>


        {/* Mobile Menu - Framer Motion */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className='fixed top-0 md:hidden left-0 h-full w-[300px] bg-white z-50 p-3 shadow-lg flex flex-col gap-2'
            >
              <div className='flex justify-start'>

                <SpaceWrapper
                  className='mt-5'
                >
                  <div className="p-1.5 md:hidden  z-40 bg-[#FFE7EC] rounded-[3px] w-fit">
                    <IoCloseSharp
                      onClick={toggleMenu}
                      size={17} color='#333333' />
                  </div>
                </SpaceWrapper>





              </div>
              <Link href="/login" className="">
                <PrimaryButton
                  type="submit"
                  className=" bg-[#FF1645] disabled:!bg-[#FFE7EC]/60 !py-1 !px-2 w-full text-white h-[35px] border-none "
                >
                  <div className="flex justify-center items-center gap-2">
                    <label className=" text-nowrap font-medium text-white text-[10.5px] font-poppins">{'Signup/ Login'}</label>
                  </div>
                </PrimaryButton>
              </Link>

              <NavMenu items={menuItems} />

              <OtherNavMenus/>

              <p className='text-[12px] font-medium  font-poppins mt-5'>Download PropertySeller App</p>

              <Image
                src={mobileAppIcon}
                alt='app icon'
                className='mt-1'
              />
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </Container>

  );
}


export default function HeaderSecondary() {
  return (
    // You could have a loading skeleton as the `fallback` too
    <Suspense fallback={<div>Loading...</div>}>
      <HeaderSecondaryComponenet />
    </Suspense>
  )
}
// export default HeaderSecondary;


type MenuItem = {
  name: string;
  link: string;
}

function OtherNavMenusFunction() {

   const searchParams = useSearchParams();
  const currency = searchParams.get('currency');

  const [menusList, setMenusList] = useState<MenuItem[]>([
    { name: 'Careers', link: '/careers' },
    { name: 'Open House', link: '/open-house' },
    { name: 'Rental Income', link: '/rental-income' },
    { name: 'News', link: '/allnews' },
    { name: 'Blog', link: '/blogs' },
    { name: 'Rental Income', link: '/rental-income' },
  ]);
  return (
      <ul className='flex flex-col gap-[19px]  items-start'>
        {menusList.map((item, index) =>{
          
          const url = new URL(item.link, 'https://www.propertyseller.com');
          if (currency) {
            url.searchParams.set('currency', currency as string);
          }

          return(
          <li className={clsx('font-medium text-black font-poppins text-[12px]')} key={index}>
            <Link href={`${url.pathname}${url.search}`}>{item.name}</Link>
          </li>
        )})}
      </ul>
  )
}


function OtherNavMenus() {
  return (
    // You could have a loading skeleton as the `fallback` too
    <Suspense fallback={<div>Loading...</div>}>
      <OtherNavMenusFunction />
    </Suspense>
  )
}