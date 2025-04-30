"use client";

import { logo, menu_icon, user_icon } from '@/app/assets';
import Image from 'next/image';
import React, { useState } from 'react';
import NavMenu from './NavMenu';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';
import PrimaryButton from '../Buttons';

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: 'About', link: '/about' },
    { name: 'Property Talks', link: '/property-talks' },
    { name: 'Rental Income', link: '/rental-income' },
    { name: 'Developers', link: '/developers' },
    { name: 'Cities', link: '/cities' }
  ];
  
  const toggleMenu = () => setIsOpen(prev => !prev);

  return (
    <header className='px-5  lg:px-8 xl:px-24  relative flex py-4 justify-between items-center w-full max-w-[1440px] mx-auto'>

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
<div className="w-[140px] sm:w-[200px] ms-8 sm:ms-0 h-[50px] sm:h-[40px] relative ">
<Image src={logo} alt='user icon' fill className='bg-cover' />

</div>
      <div className="min-laptop:hidden block">
        <PrimaryButton
          type='button'
          className='flex !px-3 items-center gap-1'
         
        >
          <>
              <Image src={user_icon} alt='menu icon' width={20} />
              <label htmlFor="" className='text-xs'>Login</label>
            </>  
        </PrimaryButton>
      </div>


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
                <label htmlFor="">Login</label>
              </>
            
          </PrimaryButton>
        </div>


        <div className="min-laptop:block hidden">
          <PrimaryButton
            type='button'
            className='flex items-center gap-1'
          >
              <>
                <Image src={user_icon} alt='menu icon' width={20} />
                <label htmlFor="">AED</label>
              </>
        </PrimaryButton>
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
