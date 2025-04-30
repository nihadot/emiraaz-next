import { logo_footer_black, youtube_icon_footer } from '@/app/assets'
import Image from 'next/image'
import React from 'react'
import FooterList from './FooterList'


function Footer() {
    return (
        <>

            <footer className=''>


                <section className='bg-black flex gap-10 max-w-[1440px] px-5 flex-col lg:flex-row lg:px-8 xl:px-24 mx-auto w-full py-10 '>
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

                <p className='text-sm font-medium bg-black text-center text-white p-6'>Copyright ⓒ 2025 PropertySeller. All Rights Reserved</p>
            </footer>


        </>
    )
}

export default Footer