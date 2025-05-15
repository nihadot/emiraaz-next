import Container from '@/components/atom/Container/Container'
import SpaceWrapper from '@/components/atom/SpaceWrapper/SpaceWrapper'
import { Footer } from '@/components/Footer'
import Header from '@/components/Header'
import AboutHeader from '@/components/Header/AboutHeader'
import clsx from 'clsx'
import React from 'react'

function page() {
    return (
        <main>
            <AboutHeader />

            <section className='bg-black text-white'>

                <Container>
                    <h2 className=' font-poppins  font-medium text-[10px] sm:text-[12px] text-center py-[10px]'>About Us</h2>
                    <h1 className=' font-poppins font-medium text-[19.5px] sm:text-[37.5px] text-center pb-[10px]'>Story Of PropertySeller.</h1>
                    <Paragraph
                        content='At PropertySeller, we are not just a marketplace—we are the bridge that connects buyers with the best off-plan property opportunities. Our journey began with a clear vision: to simplify the real estate process, eliminate complexities, and bring transparency to every transaction.
We saw a gap in the market where buyers struggled to find reliable information, access the right projects, and connect with trusted sellers. PropertySeller was born out of the need to fill this void—creating a seamless platform that offers verified listings, real-time insights, and expert support to guide every client toward their ideal investment.From the moment a buyer shows interest in a property to the final transaction, we ensure a smooth and efficient experience. We have built strong relationships with top developers, giving our users access to exclusive deals and early investment opportunities that are often hard to find elsewhere. Our approach is simple: provide accurate information, eliminate unnecessary barriers, and help buyers make informed decisions with confidence'

                    />
                    <SpaceWrapper className='pt-[28px]'>
                        <Paragraph
                            content='At PropertySeller, we believe real estate should be hassle-free, accessible, and rewarding. That’s why we go beyond just being a platform—we act as your trusted partner in every step of the journey, ensuring that you invest wisely and with full confidence. What makes PropertySeller different is our commitment to transparency and efficiency. We understand that real estate transactions can be overwhelming, especially for first-time buyers and investors. That’s why we leverage technology and market expertise to provide a streamlined, user-friendly experience where buyers can explore properties, compare options, and get expert advice—all in one place. Our platform is designed to save time, reduce risks, and maximize investment potential. Beyond just connecting buyers and sellers, we are building a community of real estate enthusiasts, investors, and industry experts. PropertySeller is not just a marketplace; it is a movement towards a smarter, more connected, and more informed real estate industry. Whether you are looking for a luxury apartment in Dubai or a high-growth investment opportunity, PropertySeller is here to guide you every step of the way.PropertySeller operates under EMIRAAZ, its parent company, which provides the foundation and vision to drive innovation in the real estate industry.'
                        />
                    </SpaceWrapper>


                    <div className='flex flex-col sm:flex-row gap-[38px] mt-4 sm:mt-[97px] items-center justify-between'>


                        <div className="h-[329px] sm:h-[450px] w-[346px] rounded-[9px] border-[4px]"></div>
                        <div className="flex-1">
                            <h3 className=' font-poppins  font-medium text-[19.5px] pb-3 sm:text-[37.5px] text-start'>Meet the Founder – Ashiq Emiraaz</h3>

                            <SpaceWrapper className=''>
                                <Paragraph
                                    className='!text-center'
                                    content='At PropertySeller, we believe real estate should be hassle-free, accessible, and rewarding. That’s why we go beyond just being a platform—we act as your trusted partner in every step of the journey, ensuring that you invest wisely and with full confidence. What makes PropertySeller different is our commitment to transparency and efficiency. We understand that real estate transactions can be overwhelming, especially for first-time buyers and investors. That’s why we leverage technology and market expertise to provide a streamlined, user-friendly experience where buyers can explore properties, compare options, and get expert advice—all in one place. Our platform is designed to save time, reduce risks, and maximize investment potential. Beyond just connecting buyers and sellers, we are building a community of real estate enthusiasts, investors, and industry experts. PropertySeller is not just a marketplace; it is a movement towards a smarter, more connected, and more informed real estate industry. Whether you are looking for a luxury apartment in Dubai or a high-growth investment opportunity, PropertySeller is here to guide you every step of the way.PropertySeller operates under EMIRAAZ, its parent company, which provides the foundation and vision to drive innovation in the real estate industry.'
                                />
                            </SpaceWrapper>
                        </div>

                    </div>
                </Container>
            </section>



            <Footer />
        </main>
    )
}

export default page


function Paragraph({
    content,
    className
}: {
    content: string,
    className?: string
}) {
    return (
        <p className={clsx('font-poppins font-normal text-[10.5px] sm:text-[12px] text-white', className)}>
            {content}
        </p>
    )
}
