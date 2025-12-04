'use client'
import React, { Suspense, useState } from 'react'
import Container from '../atom/Container/Container'
import clsx from 'clsx'
import NavMenu from '../Header/NavMenu'
import Image from 'next/image'
import { menu_icon, mobileAppIcon, propertySellerWhiteLogo, ps_logo, user_icon } from '@/app/assets'
import { useRouter, useSearchParams } from 'next/navigation'
import { useDeviceType } from '@/utils/useDeviceType'
import Link from 'next/link'
import CurrencySelect from '../Header/CurrencySelect'
import { PiUserCircle } from 'react-icons/pi'
import PrimaryButton from '../Buttons'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { AnimatePresence, motion } from 'framer-motion'
import SpaceWrapper from '../atom/SpaceWrapper/SpaceWrapper'
import { IoCloseSharp } from 'react-icons/io5'
import { Menu } from 'lucide-react'


function Header() {
    const router = useRouter();
    const [currency, setCurrency] = useState<string>('');
    const [isOpen, setIsOpen] = useState(false);
    const deviceType = useDeviceType();

    const menuItemsData = [
        // { name: 'Home', link: '/' },
        { name: 'About', link: '/about-property-seller' },
        { name: 'Featured Projects', link: '/featured-projects' },
        { name: 'Ai Agent', link: '/ai-agent' },
        { name: 'Rental Income', link: '/rental-income' },
        { name: 'Donation', link: '/donations' },
    ];

    const toggleMenu = () => setIsOpen(prev => !prev);

    const { isAuthentication, user } = useSelector((state: RootState) => state.user);


    const menuItems = menuItemsData.filter((item) => {
        // if (item.link === '/' && pathname === '/') {
        //   return true; // hide 'Home' when on home page and not mobile
        // }
        return true;
    });

    const handleLogoClick = () => {
        sessionStorage.removeItem('scroll-position');
        // onLogoClick?.(); // triggers parent reset if provided
        router.push("/");
    };


    return (
        <header className={clsx('relative flex  justify-between items-center w-full')}>

            {/* Mobile Menu Button */}
            <button
                className={clsx(
                    'lg:hidden w-[50px]',      // always present
                    isOpen ? 'invisible' : 'visible'  // conditional
                )}
                onClick={toggleMenu}

            >
                <Menu
                    size={24}
                    color='white'
                />
            </button>


            {/* Logo */}
            <div onClick={handleLogoClick} className="w-[140px] cursor-pointer sm:w-[138.75px] ms-7 sm:ms-0 h-[40px] sm:h-[32.25px] relative ">
                {
                    deviceType === 'mobile' ?
                        <Image src={propertySellerWhiteLogo.src} alt="" width={140} height={50} className='object-contain h-full  max-w-[200px] w-full' />
                        : <Link href={'/'}><Image src={propertySellerWhiteLogo.src} alt="" width={140} height={50} className='object-contain h-full  max-w-[200px] w-full' /></Link>

                }

            </div>


            <div className="block sm:hidden"> <CurrencySelect
                defaultCurrency={currency}
                // selectedCurrencyClassName
                dropdownMainContainerClassName='!w-[90px]'
                dropdownContainerClassName='!bg-transparent !ps-[8px] pe-[2px] py-[7px]'
                selectedCurrencyClassName='!text-white text-[10px]'
                IoChevronDownColor='white'
            /></div>


            <div className="min-laptop:flex hidden items-center gap-4">


                {/* Desktop Nav */}
                <div className='hidden text-white me-3 min-laptop:block'>
                    <NavMenu 
                    linkItemClassName='!text-white'
                    items={menuItems} />
                </div>




                <div className="flex gap-2">

                    <CurrencySelect
                        defaultCurrency={currency}
                        dropdownMainContainerClassName='!w-[100px]'
                        dropdownContainerClassName='!bg-transparent !h-[33px]'
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
                        className='sm:hidden fixed top-0 left-0 h-full w-[300px] bg-white z-50 p-3 shadow-lg flex flex-col gap-2'
                    >
                        <div className='flex justify-start'>

                            <SpaceWrapper
                                className='mt-2'
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

                        <div className="mt-2">

                            <NavMenu items={[{ name: 'Home', link: '/' }, ...menuItems]} />
                        </div>
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
    )
}

export default Header




function OtherNavMenus() {
    return (
        // You could have a loading skeleton as the `fallback` too
        <Suspense>
            <OtherNavMenusFunction />
        </Suspense>
    )
}

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
