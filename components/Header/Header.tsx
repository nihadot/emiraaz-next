"use client";

import { drop_down_icon, logo, menu_icon, user_icon } from '@/app/assets';
import Image from 'next/image';
import React, { useState } from 'react';
import NavMenu from './NavMenu';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';
import PrimaryButton from '../Buttons';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { loginFailure, logoutFailure, logoutStart, logoutSuccess } from '@/redux/userSlice/userSlice';
import { LOCAL_STORAGE_KEYS } from '@/api/storage';
import { useRouter } from 'next/navigation';
import { errorToast } from '../Toast';

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: 'About', link: '/about' },
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



  return (
    <header className='px-5  lg:px-8 xl:px-[144.75px] relative flex py-4 justify-between items-center w-full max-w-[1440px] mx-auto'>

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
      <div onClick={()=>router.push("/")} className="w-[140px] cursor-pointer sm:w-[138.75px] ms-8 sm:ms-0 h-[50px] sm:h-[32.25px] relative ">
        <Image src={logo} alt='logo' fill className='bg-cover' />

      </div>
      <PrimaryButton
              type='button'
              className='flex !rounded-[2.5px] md:hidden w-[66.75px] items-center gap-1'
            >
              <>
                <label htmlFor="" className='text-[11px] font-normal  font-poppins'>AED</label>
                <Image src={drop_down_icon} alt='menu icon' width={9} height={9} />
              </>


            </PrimaryButton>


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


        {isAuthentication ?

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
              className='flex w-[66.75px] items-center gap-1'
            >
              <>
                <label htmlFor="" className='text-[12px] font-normal  font-poppins'>AED</label>
                <Image src={drop_down_icon} alt='menu icon' width={9} height={4.5} />
              </>


            </PrimaryButton>

            <PrimaryButton
              type='button'
              className='flex w-[77.25px] h-[33px] items-center gap-1'
            >
              <>
                <Image src={user_icon} alt='menu icon' width={15} height={15} />
                <label htmlFor="" className='text-[12px] font-medium  font-poppins'>Login</label>
              </>


            </PrimaryButton>
          </div>}
      </div>


      {/* Mobile Menu - Framer Motion */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className='fixed top-0 left-0 h-full w-[30%] bg-white z-10 p-6 shadow-lg flex flex-col gap-6'
          >
            <div className='flex justify-start'>
              <button onClick={toggleMenu} className='text-black text-xl font-bold'>
                ✕
              </button>
            </div>
            <NavMenu items={menuItems} />
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Header;
