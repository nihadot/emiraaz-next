import { app_store_icon, logo_footer_black, play_store_footer_icon, property_seller_black_new_logo_icon, propertySellerWhiteLogo } from '@/app/assets'
import Image from 'next/image'
import React from 'react'
import FooterList from './FooterList'
import Container from '../atom/Container/Container'
import { PiInstagramLogoLight } from "react-icons/pi";
import { SlSocialLinkedin } from "react-icons/sl";
import { RiTwitterXLine } from "react-icons/ri";
import { FaThreads } from "react-icons/fa6";
import { PiYoutubeLogoThin } from "react-icons/pi";

/* eslint-disable @next/next/no-img-element */
function Footer() {
    return (
        <>

            <footer className='bg-black'>


                <Container>

                    <section className=' flex gap-10  flex-col lg:flex-row w-full pt-10 pb-3 sm:py-10 '>
                        <section className=''>
                            <div className="flex w-[180px] m-auto justify-center items-center relative h-[80px] object-cover ">

                                <Image
                                    className=''
                                    fill
                                    src={propertySellerWhiteLogo}
                                    // fill

                                    alt='logo'
                                />
                            </div>


                            <div className="sm:flex hidden  justify-start mt- 0 items-start gap-3">
                                <div className="w-4 h-4 p-1 rounded-full bg-white  flex justify-center items-center">
                                    <PiInstagramLogoLight
                                        className='w-full h-full' color='black'
                                    />
                                </div>

                                <div className="w-4 h-4 p-1 rounded-full bg-white  flex justify-center items-center">
                                    <SlSocialLinkedin
                                        className='w-full h-full' color='black'
                                    />
                                </div>


                                <div className="w-4 h-4 p-1 rounded-full bg-white  flex justify-center items-center">
                                    <RiTwitterXLine
                                        className='w-full h-full' color='black'
                                    />
                                </div>


  <div className="w-4 h-4 p-1 rounded-full bg-white  flex justify-center items-center">
                                    <FaThreads
                                        className='w-full h-full' color='black'
                                    />
                                </div>


  <div className="w-4 h-4 p-1 rounded-full bg-white  flex justify-center items-center">
                                    <PiYoutubeLogoThin
                                        className='w-full h-full' color='black'
                                    />
                                </div>




                            </div>


                            <div className="relative sm:flex hidden mt-10 bg-white w-[117.5px] h-[36px] object-cover">
                                {/* <Image
                                    fill
                                    priority
                                    alt='play store icon here'
                                    src={play_store_footer_icon}
                                    className='object-contain w-[200px] h-[100px]'
                                    unoptimized
                                /> */}
                                {/* <Image */}
                                <img
                                                                   src={play_store_footer_icon.src}
                                                                   alt='play store icon here'
                                                                   className='object-cover w-full h-full'
                                                                   
                                />
                            </div>


                            <div className="relative mt-2 sm:flex hidden bg-white w-[117.5px] h-[36px] object-cover">
                                  <img
                                                                   src={app_store_icon.src}
                                                                   alt='play store icon here'
                                                                   className='object-cover w-full h-full'
                                                                   
                                />
                            </div>
                        </section>

                        <section className='grid grid-cols-2 md:grid-cols-6  xl justify-between w-full'>

                            <FooterList
                                title="Explore"
                                items={[
                                    {
                                        title: "Home",
                                        link: "/"
                                    },
                                    {
                                        title: "About",
                                        link: "/about"
                                    },
                                    {
                                        title: "Blog",
                                        link: "/blogs"
                                    },
                                    {
                                        title: "News",
                                        link: "/allnews"
                                    },
                                    {
                                        title: "Property Talks",
                                        link: "/talks"
                                    },
                                    {
                                        title: "Rental Income",
                                        link: "/rental-income"
                                    },
                                    {
                                        title: "Developers",
                                        link: "/developers"
                                    },
                                    {
                                        title: "Emirates",
                                        link: "/"
                                    },
                                    {
                                        title: "Cities",
                                        link: "/cities"
                                    }
                                ]}
                                // items={["Home", "About", "Blog", "News", "Property Talks", "Rental Income", "Developers", "Emirates", "Cities"]}
                            />
                            <FooterList
                                title="Residential"
                                items={[
                                    {
                                        title: "Offplan Projects",
                                        link: "/"
                                    },
                                    {
                                        title: "Offplan Resale",
                                        link: "/"
                                    },
                                    {
                                        title: "Secondary",
                                        link: "/"
                                    },
                                    {
                                        title: "Land",
                                        link: "/"
                                    }
                                ]}
                                // items={["Offplan Projects", "Offplan Resale", "Secondary", "Land"]}
                            />
                            <FooterList
                                title="Commercial"
                                items={[
                                    {
                                        title: "Offplan Projects",
                                        link: "/"
                                    },
                                    {
                                        title: "Offplan Resale",
                                        link: "/"
                                    },
                                    {
                                        title: "Secondary",
                                        link: "/"
                                    },
                                    {
                                        title: "Land",
                                        link: "/"
                                    }
                                ]}
                                // items={["Offplan Projects", "Offplan Resale", "Secondary", "Land"]}
                            />
                            <FooterList
                                title="Emirates"
                                items={[{
                                    title: "Abu Dhabi",
                                    link: "/"
                                },
                                {
                                    title: "Sharjah",
                                    link: "/"
                                },
                                {
                                    title: "Ajman",
                                    link: "/"
                                },

                                 {
                                    title: "Umm Al-Quwain",
                                    link: "/"
                                },
                                  {
                                    title: "Ras Al Khaimah",
                                    link: "/"
                                },
                                ]}
                                // items={["Abu Dhabi", "Sharjah", "Ajman", "Umm Al-Quwain", "Ras Al Khaimah", "Fujairah"]}
                            />
                            <FooterList
                                title="My Account"
                                items={[
                                    {
                                        title: "Login / Register",
                                        link: "/login"
                                    },
                                    {
                                        title: "My Profile",
                                        link: "/profile"
                                    },
                                    {
                                        title: "Saved Properties",
                                        link: "/saved-properties"
                                    },
                                    {
                                        title: "Enquired Properties",
                                        link: "/enquired-properties"
                                    },
                                    {
                                        title: "Purchase History",
                                        link: "/purchase-history"
                                    }
                                ]}
                                // items={["Login / Register", "My Profile", "Saved Properties", "Enquired Properties", "Purchase History"]}
                            />
                            <FooterList
                                title="Quick Links"
                                items={[
                                    {
                                        title: "Terms & Conditions",
                                        link: "/terms"
                                    },
                                    {
                                        title: "Privacy Policy",
                                        link: "/privacy-policy"
                                    },
                                    {
                                        title: "Donations",
                                        link: "/donations"
                                    }
                                ]}
                                // items={["Terms & Conditions", "Privacy Policy", "Donations"]}
                            />
                        </section>


  <div className="sm:hidden flex  justify-center mt- 0 items-start gap-3">
                                <div className="w-4 h-4 p-1 rounded-full bg-white  flex justify-center items-center">
                                    <PiInstagramLogoLight
                                        className='w-full h-full' color='black'
                                    />
                                </div>

                                <div className="w-4 h-4 p-1 rounded-full bg-white  flex justify-center items-center">
                                    <SlSocialLinkedin
                                        className='w-full h-full' color='black'
                                    />
                                </div>


                                <div className="w-4 h-4 p-1 rounded-full bg-white  flex justify-center items-center">
                                    <RiTwitterXLine
                                        className='w-full h-full' color='black'
                                    />
                                </div>


  <div className="w-4 h-4 p-1 rounded-full bg-white  flex justify-center items-center">
                                    <FaThreads
                                        className='w-full h-full' color='black'
                                    />
                                </div>


  <div className="w-4 h-4 p-1 rounded-full bg-white  flex justify-center items-center">
                                    <PiYoutubeLogoThin
                                        className='w-full h-full' color='black'
                                    />
                                </div>




                            </div>
                        
                    </section>
                </Container>

                <Container>

                    <p className='flex gap-1 justify-center py-5 items-center'>

                        <span className="text-[10.5px] font-poppins font-medium bg-black text-center text-white">Copyright ⓒ 2025 PropertySeller.</span>
                        <span className='hidden sm:flex text-[10.5px] font-poppins font-medium bg-black text-center text-white'> All Rights Reserved</span> </p>
                </Container>

            </footer>


        </>
    )
}

export default Footer