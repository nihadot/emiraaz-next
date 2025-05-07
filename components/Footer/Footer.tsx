import { app_Store_Button, logo_footer_black, play_store_footer_icon, youtube_icon_footer } from '@/app/assets'
import Image from 'next/image'
import React from 'react'
import FooterList from './FooterList'
import Container from '../atom/Container/Container'


function Footer() {
    return (
        <>

            <footer className='bg-black'>


                <Container>

                    <section className=' flex gap-10  flex-col lg:flex-row w-full py-10 '>
                        <section className=''>
                            <div className="flex w-[180px] m-auto justify-center items-center relative h-[80px] object-cover ">

                                <Image
                                    className=''
                                    fill
                                    src={logo_footer_black}
                                    // fill

                                    alt='logo'
                                />
                            </div>


                            <div className="flex  justify-start mt- 0 items-start gap-3">

                                <Image
                                    className='object-cover'
                                    width={20}
                                    height={20}

                                    src={youtube_icon_footer}
                                    alt='logo'
                                />


                                <Image
                                    className=''
                                    width={20}
                                    height={20}
                                    src={youtube_icon_footer}
                                    alt='logo'
                                />


                                <Image
                                    className=''
                                    width={20}
                                    height={20}
                                    src={youtube_icon_footer}
                                    alt='logo'
                                />


                                <Image
                                    className=''
                                    width={20}
                                    height={20}
                                    src={youtube_icon_footer}
                                    alt='logo'
                                />
                                <Image
                                    className=''
                                    width={20}
                                    height={20}
                                    src={youtube_icon_footer}
                                    alt='logo'
                                />

                            </div>


                            <div className="relative mt-10 bg-white w-[117.5px] h-[36px] object-cover">
                                <Image
                                    fill
                                    priority
                                    alt='play store icon here'
                                    src={play_store_footer_icon}
                                    className='object-contain w-[200px] h-[100px]'
                                    unoptimized
                                />
                            </div>


                            <div className="relative mt-2 bg-white w-[117.5px] h-[36px] object-cover">
                                <Image
                                    alt='play store '
                                    src={app_Store_Button}
                                    className=''
                                    fill
                                />
                            </div>
                        </section>

                        <section className='grid grid-cols-2 md:grid-cols-6  xl justify-between w-full'>

                            <FooterList
                                title="Explore"
                                items={["Home", "About", "Blog", "News", "Property Talks", "Rental Income", "Developers", "Emirates", "Cities"]}
                            />
                            <FooterList
                                title="Residential"
                                items={["Offplan Projects", "Offplan Resale", "Secondary", "Land"]}
                            />
                            <FooterList
                                title="Commercial"
                                items={["Offplan Projects", "Offplan Resale", "Secondary", "Land"]}
                            />
                            <FooterList
                                title="Emirates"
                                items={["Abu Dhabi", "Sharjah", "Ajman", "Umm Al-Quwain", "Ras Al Khaimah", "Fujairah"]}
                            />
                            <FooterList
                                title="My Account"
                                items={["Login / Register", "My Profile", "Saved Properties", "Enquired Properties", "Purchase History"]}
                            />
                            <FooterList
                                title="Quick Links"
                                items={["Terms & Conditions", "Privacy Policy", "Banned Agents"]}
                            />
                        </section>
                    </section>
                </Container>

                <Container>

                    <p className='flex gap-1 justify-center py-5 items-center'>

                        <span className="text-sm font-medium bg-black text-center text-white">Copyright ⓒ 2025 PropertySeller</span>
                        <span className='hidden sm:flex text-sm font-medium bg-black text-center text-white'>. All Rights Reserved</span> </p>
                </Container>

            </footer>


        </>
    )
}

export default Footer