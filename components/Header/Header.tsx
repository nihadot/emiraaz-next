"use client";

import { menu_icon, mobileAppIcon, ps_logo, user_icon } from '@/app/assets';
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
import { IoCloseSharp } from 'react-icons/io5';
import SpaceWrapper from '../atom/SpaceWrapper/SpaceWrapper';
import { PiUserCircle } from "react-icons/pi";
import CurrencySelect from './CurrencySelect';
import Link from 'next/link';
import { useDeviceType } from '@/utils/useDeviceType';

interface Props {
  logoSection?: React.ReactNode;
}

function Header({

  logoSection = <Image src={ps_logo.src} alt="" width={140} height={50} className='object-contain h-full  max-w-[200px] w-full' />,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: 'About', link: '/about' },
    { name: 'Featured Projects', link: '/featured-projects' },
    { name: 'Ai Agent', link: '/ai-agent' },
    { name: 'Rental Income', link: '/rental-income' },
    { name: 'Donation', link: '/donations' },
  ];

  const dispatch = useDispatch();
  const router = useRouter();



  const toggleMenu = () => setIsOpen(prev => !prev);
  const { isAuthentication, user } = useSelector((state: RootState) => state.user);
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

  const deviceType = useDeviceType();



  return (
    <Container>
      <header className='relative flex pt-3 sm:pt-4 sm:pb-3 pb-0 justify-between items-center w-full'>

        {/* Mobile Menu Button */}
        <button
          className={clsx(
            'lg:hidden',      // always present
            isOpen ? 'invisible' : 'visible'  // conditional
          )}
          onClick={toggleMenu}
        >
          <Image src={menu_icon} alt='menu icon' width={30} />
        </button>


        {/* Logo */}
        <div onClick={() => {
          sessionStorage.removeItem('scroll-position');

          router.push("/")
        }} className="w-[140px] cursor-pointer sm:w-[138.75px] ms-7 sm:ms-0 h-[50px] sm:h-[32.25px] relative ">
          {
            deviceType === 'mobile' ?
              logoSection
              : <Image src={ps_logo.src} alt="" width={140} height={50} className='object-contain h-full  max-w-[200px] w-full' />

          }

        </div>
        <div className="w-[66.75px] block md:hidden ">
          <CurrencySelect
            defaultCurrency={currency}

          />
        </div>
        {/* <PrimaryButton
          type='button'
          className='flex !rounded-[2.5px] md:hidden w-[66.75px] items-center gap-1'
        >
          <>
            <label htmlFor="" className='text-[11px] font-normal  font-poppins'>AED</label>
            <div className="w-[28px] flex justify-center items-center h-[20px] relative">
              <IoChevronDown size={14} />
            </div>

          </>


        </PrimaryButton> */}



        <div className="min-laptop:flex hidden items-center gap-4">


          {/* Desktop Nav */}
          <div className='hidden me-3 min-laptop:block'>
            <NavMenu items={menuItems} />
          </div>


          <div className="lmin-laptop:block hidden">
            <PrimaryButton

              type='button'
              className='flex items-center gap-1'

            >

              <>
                <Image src={user_icon} alt='menu icon' width={12} />
                <label htmlFor="">Logout</label>
              </>

            </PrimaryButton>
          </div>



          {
            <div className="min-laptop:flex  gap-1 hidden">
              {/* <PrimaryButton
                type='button'
                className='flex w-[66.75px] !py-1 items-center gap-[4px]'
              >
                <>
                  <label htmlFor="" className='text-[12px] font-normal  font-poppins'>AED</label>
                  <div className="w-[28px] flex justify-center  items-center h-[10px] relative">
                    <IoChevronDown size={14} />
                  </div>
                </>


              </PrimaryButton> */}
              <CurrencySelect
                defaultCurrency={currency}

              />

              {isAuthentication ? <PrimaryButton
                onClick={() => router.push('/profile')}
                type='button'
                className='flex w-fit !px-2 h-[33px] cursor-pointer items-center'
              >
                <>

                  <div className="w-4 h-4 relative flex cursor-pointer justify-center items-center">
                    <PiUserCircle size={18} />
                  </div>

                  <label htmlFor="" className='text-[12px] cursor-pointer font-normal max-w-[80px] overflow-hidden font-poppins'>Profile</label>
                </>


              </PrimaryButton> :
                <PrimaryButton
                  onClick={() => router.push('/login')}
                  type='button'
                  className='flex w-fit cursor-pointer !px-2 h-[33px] items-center'
                >
                  <>

                    <div className="w-4 h-4  relative flex justify-center items-center">
                      <PiUserCircle size={18} />
                    </div>

                    <label htmlFor="" className='text-[12px] font-normal  font-poppins'>Login</label>
                  </>


                </PrimaryButton>

              }
            </div>
          }


          {/* {isAuthentication ?

            <div className="min-laptop:flex  gap-1 hidden">
              <PrimaryButton
                type='button'
                className='flex items-center gap-1'
              >
                <>
                  <Image src={user_icon} alt='menu icon' width={20} />
                  <label htmlFor="">User</label>
                </>


              </PrimaryButton>

              <PrimaryButton
                onClick={() => handleLogout()}
                type='button'
                className='flex items-center gap-1'
              >
                <>
                  <Image src={user_icon} alt='menu icon' width={20} />
                  <label htmlFor="">Lgout</label>
                </>


              </PrimaryButton>
            </div>

            : <div className="min-laptop:flex  gap-1 hidden">
              <PrimaryButton
                type='button'
                className='flex w-[66.75px] !py-1 items-center gap-[4px]'
              >
                <>
                  <label htmlFor="" className='text-[12px] font-normal  font-poppins'>AED</label>
                  <div className="w-[28px] flex justify-center  items-center h-[10px] relative">
                    <IoChevronDown size={14} />
                  </div>
                </>


              </PrimaryButton>

              <PrimaryButton
                onClick={() => router.push('/login')}
                type='button'
                className='flex w-fit !px-2 h-[33px] items-center'
              >
                <>

                  <div className="w-4 h-4 relative flex justify-center items-center">
                    <PiUserCircle size={18} />
                  </div>

                  <label htmlFor="" className='text-[12px] font-normal  font-poppins'>Login</label>
                </>


              </PrimaryButton>
            </div>} */}
        </div>


        {/* Mobile Menu - Framer Motion */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className='sm:hidden fixed top-0 left-0 h-full w-[300px] bg-white z-50 p-3 shadow-lg flex flex-col gap-2'
            >
              <div className='flex justify-start'>
                {/* <button onClick={toggleMenu} className='text-black text-xl font-bold'>
                  ✕
                </button> */}
                {/* <IoCloseOutline
                  onClick={toggleMenu}
                  className='w-[30px] h-[30px] text-black'
                   color="black" /> */}
                <SpaceWrapper
                  className='mt-5'
                >
                  <div className="p-1.5 sm:hidden  z-40 bg-[#FFE7EC] rounded-[3px] w-fit">
                    <IoCloseSharp
                      onClick={toggleMenu}
                      size={17} color='#333333' />
                  </div>
                </SpaceWrapper>





              </div>

              <PrimaryButton
                type="submit"
                className=" bg-[#FF1645] disabled:!bg-[#FFE7EC]/60 !py-1 !px-2 w-full text-white h-[35px] border-none "
              >
                <div className="flex justify-center items-center gap-2">
                  <label className=" text-nowrap font-medium text-white text-[10.5px] font-poppins">{'Signup/ Login'}</label>
                </div>
              </PrimaryButton>

              <NavMenu items={menuItems} />
              <OtherNavMenus />

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

export default Header;










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
      {menusList.map((item, index) => {

        const url = new URL(item.link, 'https://www.propertyseller.com');
        if (currency) {
          url.searchParams.set('currency', currency as string);
        }

        return (
          <li className={clsx('font-medium text-black font-poppins text-[12px]')} key={index}>
            <Link href={`${url.pathname}${url.search}`}>{item.name}</Link>
          </li>
        )
      })}
    </ul>
  )
}


function OtherNavMenus() {
  return (
    // You could have a loading skeleton as the `fallback` too
    <Suspense>
      <OtherNavMenusFunction />
    </Suspense>
  )
}