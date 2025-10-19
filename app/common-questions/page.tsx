'use client'
import Container from '@/components/atom/Container/Container'
import SectionDivider from '@/components/atom/SectionDivider/SectionDivider'
import SpaceWrapper from '@/components/atom/SpaceWrapper/SpaceWrapper'
import MobileHeaderTitle from '@/components/atom/typography/MobileHeaderTitle'
import { Footer } from '@/components/Footer'
import Header from '@/components/Header'
import clsx from 'clsx'
import { motion, AnimatePresence } from 'framer-motion'
import React, { useState } from 'react'
import { IoChevronDown, IoChevronUp } from "react-icons/io5";


function HelpCenter() {



    return (

        <main>

            <Header
                logoSection={
                    <div className='h-full w-full flex justify-center items-center'>
                        <MobileHeaderTitle
                            content='Common Questions'
                        />
                    </div>
                } />

            <SectionDivider
                containerClassName="mt-[10.5px] mb-[12px]"
                lineClassName="h-[1px] w-full bg-[#DEDEDE]"
            />

            <Container>
                <SpaceWrapper
                    className='pb-20'
                >


                    <div className="flex flex-col mt-5 sm:mt-[75px] items-center justify-center m-auto  max-w-[600px] w-full">
                        <h3 className='font-poppins text-center font-medium text-[26px]  sm:text-[34px] sm:leading-10'>
                            Your <span className='text-[#FF1645]'>PropertySeller</span>Questions, Answered Here
                        </h3>
                        <Paragraph
                            className='text-center mt-[13px]'
                            content="Get quick answers to your most important questions about buying, selling, and investing in real estate with PropertySeller. Navigate the market confidently!"
                        />
                    </div>



                    <div className="mt-[40px]">
                        <ToggleButton
                            title='What types of properties can I find on PropertySeller?'

                        >
                            <>

                                <Paragraph
                                    content='On PropertySeller, we offer an extensive and diverse range of properties to meet the varying needs and preferences of our clients. Our listings include:'
                                />

                                <ol className='list-decimal list-inside'>
                                    <li> <ContentHeading
                                        title='Residential Apartments:'
                                    />
                                        <Paragraph
                                            className='inline'
                                            content=' Whether you are looking for a cozy studio or a spacious multi-bedroom apartment, we have options in various styles, sizes, and price ranges. From modern high-rises in bustling urban areas to tranquil communities with stunning views, our residential apartments cater to all lifestyles.'
                                        />
                                    </li>




                                    <li> <ContentHeading
                                        title='Villas :'
                                    />
                                        <Paragraph
                                            className='inline'
                                            content='For those seeking more space and privacy, PropertySeller features an impressive selection of villas. These range from luxurious, fully-furnished properties with private pools and gardens to more modest family homes. Many of our villas are located in sought-after neighborhoods, providing access to top amenities, schools, and leisure facilities'
                                        />
                                    </li>







                                    <li> <ContentHeading
                                        title='Townhouses :'
                                    />
                                        <Paragraph
                                            className='inline'
                                            content='Townhouses offer a perfect blend of community living and individual space. Our listings include beautifully designed townhouses that are ideal for families, featuring multiple floors, private outdoor areas, and access to community facilities such as parks and pools. These properties are often situated in family-friendly neighborhoods with a strong sense of community'
                                        />
                                    </li>






                                    <li> <ContentHeading
                                        title='Commercial Spaces :'
                                    />
                                        <Paragraph
                                            className='inline'
                                            content='For investors and entrepreneurs, PropertySeller provides an array of commercial properties, including office spaces, retail units, warehouses, and mixed-use developments. Whether you are looking to start a new business, expand an existing one, or invest in commercial real estate, our listings feature properties in prime locations that attract high foot traffic and ensure visibility.'
                                        />
                                    </li>






                                    <li> <ContentHeading
                                        title='Off-Plan Developments :'
                                    />
                                        <Paragraph
                                            className='inline'
                                            content={`We also specialize in off-plan properties, which allow buyers to invest in new developments before they are completed. This option often provides significant advantages, such as lower prices and the opportunity to customize certain aspects of the property. Our off-plan listings include exciting new projects from reputable developers, giving buyers a chance to secure a property in some of the UAE's most promising areas`}
                                        />
                                    </li>







                                    <li> <ContentHeading
                                        title='Luxury Properties :'
                                    />
                                        <Paragraph
                                            className='inline'
                                            content={`For those seeking the pinnacle of opulence, PropertySeller showcases an exclusive selection of luxury properties, including high-end villas and penthouses in prestigious communities. These properties often come with premium features, such as private pools, state-of-the-art amenities, and breathtaking views, catering to clients who desire a lavish lifestyle`}
                                        />
                                    </li>




                                    <li> <ContentHeading
                                        title='Vacation Homes :'
                                    />
                                        <Paragraph
                                            className='inline'
                                            content={`If you’re looking for a holiday retreat, we feature a range of vacation homes in popular tourist destinations across the UAE. These properties are ideal for those seeking a second home or investment opportunities in the short-term rental market, allowing you to enjoy the beauty of the UAE while generating income.`}
                                        />
                                    </li>




                                    <Paragraph
                                        content={`At PropertySeller, we pride ourselves on providing detailed property descriptions, high-quality images, and virtual tours to help you make informed decisions. Our user-friendly platform allows you to filter properties based on your specific preferences, such as price, location, and property type, ensuring you can easily find the perfect space to meet your needs. Whether you're a first-time buyer, an experienced investor, or someone looking to rent, PropertySeller is your one-stop destination for all your property needs in the UAE.`}
                                    />



                                </ol>
                            </>
                        </ToggleButton>







                        <ToggleButton
                            title='Is there a fee to use PropertySeller?'

                        />


                        <ToggleButton
                            title='How can I contact a property agent?'

                        />

                        <ToggleButton
                            title='How can I sell my property through PropertySeller?'

                        />


                        <ToggleButton
                            title='What should I do if I have questions about a specific property?'

                        />

                        <ToggleButton
                            title='What are the legal requirements for buying property in the UAE?'

                        />



                    </div>


                </SpaceWrapper>

            </Container>



            <Footer />
        </main>
    )
}

export default HelpCenter








function Paragraph({
    content,
    className
}: {
    content: string,
    className?: string
}) {
    return (
        <p className={clsx('font-poppins font-normal text-[10.5px] sm:text-[12px] text-[#767676]', className)}>
            {content}
        </p>
    )
}



function ToggleButton({ title, children }: {
    title: string,
    children?: React.ReactNode
}) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-[#DEDEDE] mt-[11px] rounded-[5px] border-[1.5px] overflow-hidden">
            <button
                className="w-full flex justify-between items-center px-3 py-2 cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
            >
                <p className="font-poppins capitalize font-medium text-[14px] text-black">
                    {title}
                </p>
                {isOpen ? (
                    <IoChevronUp color="#FF1645" className="w-[12px] h-[12px]" />
                ) : (
                    <IoChevronDown color="#FF1645" className="w-[12px] h-[12px]" />
                )}
            </button>

            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="px-3 pb-3"
                    >
                        {children}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

function ContentHeading({ title }: { title: string }) {
    return (
        <h3 className=' font-poppins inline font-medium text-[13px]'>{title}</h3>
    )
}
