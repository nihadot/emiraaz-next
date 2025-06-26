import Container from '@/components/atom/Container/Container'
import SectionDivider from '@/components/atom/SectionDivider/SectionDivider'
import SpaceWrapper from '@/components/atom/SpaceWrapper/SpaceWrapper'
import MobileHeaderTitle from '@/components/atom/typography/MobileHeaderTitle'
import { Footer } from '@/components/Footer'
import Header from '@/components/Header'
import clsx from 'clsx'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
    title: "About Us | Property Seller - Trusted Off-Plan Real Estate Marketplace",
    description: "Learn how Property Seller is transforming real estate with verified listings, expert support, and exclusive off-plan property opportunities in Dubai and beyond.",
    openGraph: {
        title: "About Property Seller | Simplifying Real Estate Investments",
        description: "Discover Property Seller’s mission to simplify real estate, connect buyers with top developers, and offer transparent, hassle-free property investments.",
        url: "https://www.propertyseller.com/about",
        siteName: "Property Seller",
        images: [
            {
                url: "https://res.cloudinary.com/dknxmloqh/image/upload/v1748991060/favicon-DBW5gi7l_j0cjdz.png",
                width: 1200,
                height: 630,
                alt: "About Property Seller - Connecting Buyers with Trusted Developers",
            },
        ],
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "About Us | Property Seller - Trusted Real Estate Platform",
        description: "At Property Seller, we connect you with the best off-plan property investments—offering expert guidance, verified projects, and complete transparency.",
        images: ["https://res.cloudinary.com/dknxmloqh/image/upload/v1748991060/favicon-DBW5gi7l_j0cjdz.png"],
    },
};


function page() {
    return (
        <main>
            <Header
                logoSection={
                    <div className='h-full w-full flex justify-center items-center'>
                        <MobileHeaderTitle
                            content='About Us'
                        />
                    </div>
                }
            />

            <SectionDivider
                containerClassName={clsx("mb-[12px] mt-[12px]")}
                lineClassName="h-[1px] w-full bg-[#DEDEDE]"
            />
            <section className='bg-white text-black pb-20'>

                <Container>
                    <h2 className=' font-poppins  font-medium text-[12px] sm:text-[14px] text-center py-3'>About Us</h2>
                    <h1 className=' font-poppins font-medium text-[20px] sm:text-[37.5px] text-center pb-[6px] sm:pb-[10px]'>The Story Behind PropertySeller</h1>
                    <Paragraph
                        content='Picture this: You are searching for your dream home or a smart investment. But soon you
realise you are stuck in a frustrating loop, where each agent promises the world but delivers
confusion. Biased recommendations, followed by relentless calls you never asked for, and
privacy breached. They are pushing what they want to sell and not what you need, all while
doing documents that are hard to understand and the pressure of making one of life’s
biggest financial decisions, without clear guidance, feels overwhelming.If this sounds familiar, you’re not alone. Most of us have been through it. Tired of a real
estate industry that seemed to prioritize profits over people, We knew something had to
change.That’s how PropertySeller was born.We believe that behind every property search is a human story. Maybe you’re a young
couple looking for your first home. A parent planning a better future for your children. Or an
investor ready to take the next big step.Whatever your story, we want to be a part of it. Not just as a service provider, but as a
partner, someone who believes in your dreams just as much as you do.'

                    />
                    {/* <SpaceWrapper className='pt-[8px]'>
                        <Paragraph
                            content=''
                        />
                    </SpaceWrapper>


                    <SpaceWrapper className='pt-[8px]'>
                        <Paragraph
                            content=''
                        />
                    </SpaceWrapper>

                    <SpaceWrapper className='pt-[8px]'>
                        <Paragraph
                            content=''
                        />
                    </SpaceWrapper>


                    <SpaceWrapper className='pt-[8px]'>
                        <Paragraph
                            content=''
                        />
                    </SpaceWrapper> */}




                    <h3 className=' font-poppins font-medium text-[20px] sm:text-[37.5px] text-center pb-[0px] sm:pb-[10px] pt-6'>What We Do</h3>

                    <SpaceWrapper className='pt-[6px] sm:pt-0'>
                        <Paragraph
                            content='PropertySeller is your trusted partner in real estate. We’ve created a seamless platform with
verified listings, real-time insights, and expert support making every step of your property
journey smooth, transparent, and empowering with no middlemen or agents and no hidden
fees. Just honest, simplified, and straightforward transactions.One of the biggest frustrations buyers face today is duplication. The same off-plan or
secondary property frequently appears across the same website with different price tags,
whether listed simultaneously or at different times. This inconsistency causes confusion and
distrust in their hearts.We solve this by working directly with developers and property owners, cutting out the noise
and bringing verified, accurate, and fairly priced listings straight to you. Thanks to the strong
partnerships we were able to build with top developers, our users gain access to exclusive
listings and early investment opportunities often hard to find elsewhere.Though we began with off-plan projects, we’ve grown into a full-spectrum platform. Today,
PropertySeller connects buyers to off-plan properties, resales, secondary homes, and
land-offering a range of options all in one place.What truly sets us apart is our mission to not let any investor or buyer feel overwhelmed by
the process. We commit to it by transparency, efficiency, and empowerment and by
combining technology with market expertise to help you compare, decide, and invest with
confidence. We’re a platform with a growing community of buyers, investors, and real estate
enthusiasts who believe in doing things differently. Whether you’re searching for a luxury
apartment in Dubai or your next big investment, PropertySeller is here to guide you every
step of the way.'
                        />
                    </SpaceWrapper>



{/* 
                    <SpaceWrapper className='pt-[8px]'>
                        <Paragraph
                            content=''
                        />
                    </SpaceWrapper>

                    <SpaceWrapper className='pt-[8px]'>
                        <Paragraph
                            content=''
                        />
                    </SpaceWrapper>


                    <SpaceWrapper className='pt-[8px]'>
                        <Paragraph
                            content=''
                        />
                    </SpaceWrapper>


                    <SpaceWrapper className='pt-[8px]'>
                        <Paragraph
                            content=''
                        />
                    </SpaceWrapper> */}


                    <h3 className=' font-poppins font-medium text-[20px] sm:text-[37.5px] text-center pb-[0px] sm:pb-[10px] pt-6'>Who We Are</h3>


                    <SpaceWrapper className='pt-[6px] sm:pt-0'>
                        <Paragraph
                            content='PropertySeller operates under EMIRAAZ, our parent company driving innovation in the real
estate space. While PropertySeller is the platform you interact with, all backend operations,
deal closures, legal formalities, and coordination are handled by EMIRAAZ PROPERTIES
LLC, a company registered with the Dubai Economic Department.'
                        />
                    </SpaceWrapper>


                    <h3 className=' font-poppins font-medium text-[20px] sm:text-[37.5px] text-center pb-[0px] sm:pb-[10px] pt-6'>Meet the Founder – Ashiq Emiraaz</h3>



                    <SpaceWrapper className='pt-[6px] sm:pt-0'>
                        <Paragraph
                            content='Ashiq Emiraaz knows what it’s like to feel lost in the real estate maze. That frustration
sparked a mission: to make property buying clear, honest, and empowering. With deep
insights into the market’s challenges and opportunities, Ashiq built PropertySeller to put
buyers first - offering real information, real support, and real results.Under his leadership, PropertySeller has grown into a comprehensive platform for property
seekers - from off-plan to resales, secondary markets, and land.But Ashiq’s vision isn’t just about building a business. It’s about building a legacy - one
where integrity is lived, not just spoken. Where transparency is part of every process, and
customer satisfaction is more than a metric - it’s a promise.'
                        />
                    </SpaceWrapper>
{/* 


                    <SpaceWrapper className='pt-[8px]'>
                        <Paragraph
                            content=''
                        />
                    </SpaceWrapper>



                    <SpaceWrapper className='pt-[8px]'>
                        <Paragraph
                            content=''
                        />
                    </SpaceWrapper>


                    <SpaceWrapper className='pt-[8px]'>
                        <Paragraph
                            content='Welcome to PropertySeller.'
                        />

                    </SpaceWrapper>

                    <SpaceWrapper className='pt-[8px]'>

                        <Paragraph
                            content='Welcome to your new beginning.'
                        />
                    </SpaceWrapper> */}



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
        <p className={clsx('font-poppins font-normal text-[14px] text-black', className)}>
            {content}
        </p>
    )
}
