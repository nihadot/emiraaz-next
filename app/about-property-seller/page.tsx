import { baseUrl } from '@/api'
import Container from '@/components/atom/Container/Container'
import SectionDivider from '@/components/atom/SectionDivider/SectionDivider'
import SpaceWrapper from '@/components/atom/SpaceWrapper/SpaceWrapper'
import MobileHeaderTitle from '@/components/atom/typography/MobileHeaderTitle'
import { Footer } from '@/components/Footer'
import Header from '@/components/Header'
import clsx from 'clsx'
import { Metadata, ResolvingMetadata } from 'next'
import React from 'react'



// Enable ISR with 60-second revalidation
export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {

    try {
        // Fetch metadata with cache-busting timestamp to ensure fresh data
        const responseData = await fetch(
            `${baseUrl}/meta-data?referencePage=about-us`,
            {
                next: {
                    revalidate: 60 // Revalidate every 10 seconds
                },
            }
        ).then((res) => res.json())

        const data = responseData?.data?.[0] || {};

        return {
            title: data.metaTitle || "About Us | Property Seller - Trusted Off-Plan Real Estate Marketplace",
            description: data.metaDescription || "Learn how Property Seller is transforming real estate with verified listings, expert support, and exclusive off-plan property opportunities in Dubai and beyond.",
            keywords: data.keywords || 'property, real estate, about us',
            openGraph: {
                title: data.openGraphTitle || "About Property Seller | Simplifying Real Estate Investments",
                description: data?.openGraphDescription || "Discover Property Seller’s mission to simplify real estate, connect buyers with top developers, and offer transparent, hassle-free property investments.",
                url: data?.openGraphUrl || "https://www.propertyseller.com/about-property-seller",
                siteName: data?.siteName || "Property Seller",
                images: [
                    {
                        url: data?.metaImage?.url || "https://res.cloudinary.com/dknxmloqh/image/upload/v1748991060/favicon-DBW5gi7l_j0cjdz.png",
                        width: 1200,
                        height: 630,
                        alt: data?.metaImage?.openGraphTitle || "About Property Seller - Connecting Buyers with Trusted Developers",
                    },
                ],
                type: data?.type || "website",
            },
            twitter: {
                title: data.twitterTitle || 'About Us | Property Seller',
                description: data.twitterDescription || 'Learn about PropertySeller',
                images: data.twitterImage ? [data.twitterImage.url] : ["https://res.cloudinary.com/dknxmloqh/image/upload/v1748991060/favicon-DBW5gi7l_j0cjdz.png"],
            },
            alternates: {
                canonical: data.canonical || "https://www.propertyseller.com/about-property-seller"
            }
        }
    } catch (error) {

        // Return fallback metadata
        return {
            description: "Learn how Property Seller is transforming real estate with verified listings, expert support, and exclusive off-plan property opportunities in Dubai and beyond.",
            openGraph: {
                title: "About Property Seller | Simplifying Real Estate Investments",
                description: "Discover Property Seller’s mission to simplify real estate, connect buyers with top developers, and offer transparent, hassle-free property investments.",
                url: "https://www.propertyseller.com/about-property-seller",
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
            alternates: {
                canonical: "https://www.propertyseller.com/about-property-seller",
            },
        }
    }
}



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
                    <p className=' font-poppins  font-medium text-[12px] sm:text-[14px] text-center py-3'>About Us</p>
                    <h1 className=' font-poppins font-medium text-[20px] sm:text-[37.5px] text-center pb-[6px] sm:pb-[10px]'>Story Behind PropertySeller <br /> Your Go-to To Buy House in Dubai</h1>
                    <Paragraph
                        content='Picture this: You are looking to buy house in Dubai or make a smart investment. But
soon you realise you are stuck in a frustrating loop, where each agent promises the
world but delivers confusion. Biased recommendations, followed by relentless calls
you never asked for, and privacy breached. They are pushing what they want to sell
and not what you need, all while doing documents that are hard to understand and
the pressure of making one of life’s biggest financial decisions, without clear
guidance, feels overwhelming.If this sounds familiar, you’re not alone. Most of us
have been through it. Want to buy house in Dubai, but you are tired of a real estate
industry that seems to prioritize profits over people? Meet PropertySeller. We noticed
how hectic the real estate market in Dubai or any part of the UAE can get and knew
something had to change.That’s how PropertySeller was born. We believe that behind
every property search is a human story. Maybe you’re a young couple looking to buy
house in Dubai. A parent planning a better future for your children. Or an investor
ready to take the next big step. Whatever your story, PropertySeller wants to be a part
of it. Not just as a service provider, but as a partner, someone who believes in your
dreams just as much as you do.'

                    />



                    <h2 className=' font-poppins font-medium text-[20px] sm:text-[37.5px] text-center pb-[0px] sm:pb-[10px] pt-6'>What we do at PropertySeller</h2>

                    <SpaceWrapper className='pt-[6px] sm:pt-0'>
                        <Paragraph
                            content='PropertySeller is your trusted partner in real estate. We’ve created a seamless
platform with verified listings, real-time insights, and expert support making every
step of your journey of buying a house in Dubai or any part of the UAE, smooth,
transparent, and empowering with no middlemen or agents and no hidden fees. Just
honest, simplified, and straightforward transactions.One of the biggest frustrations
buyers face today is duplication. The same off-plan or secondary property frequently
appears across the same website with different price tags, whether listed
simultaneously or at different times. This inconsistency causes confusion and
distrust in their hearts. PropertySeller solves this by working directly with
developers and property owners, cutting out the noise and bringing verified,
accurate, and fairly priced listings straight to you. Thanks to the strong partnerships
we were able to build with top developers, our users gain access to exclusive listings
and early investment opportunities often hard to find elsewhere.Though we began
with off-plan projects, we’ve grown into a full-spectrum platform. Today,
PropertySeller connects buyers to off-plan properties, resales, secondary homes, and
land-offering a range of options all in one place. What truly sets us apart is our
mission to not let any investor or buyer feel overwhelmed by the process. We at
PropertySeller, commit to it by transparency, efficiency, and empowerment and by
combining technology with market expertise to help you compare, decide, and investwith confidence. We’re a platform with a growing community of buyers, investors,
and real estate enthusiasts who believe in doing things differently. Whether you’re
searching for a luxury apartment in Dubai or your next big investment,
PropertySeller is here to guide you every step of the way.'
                        />
                    </SpaceWrapper>





                    <h3 className=' font-poppins font-medium text-[20px] sm:text-[37.5px] text-center pb-[0px] sm:pb-[10px] pt-6'>Who We Are: The Technology Behind PropertySeller</h3>


                    <SpaceWrapper className='pt-[6px] sm:pt-0'>
                        <Paragraph
                        className='pb-2'
                            content='PropertySeller operates under EMIRAAZ, a parent company at the forefront of
innovation in UAE’s real estate sector. While the intuitive PropertySeller platform
guides users through their property search, all backend operations - such as deal
closures, documentation, compliance, and official coordination are managed by
EMIRAAZ PROPERTIES LLC, an established company registered with the Dubai
Economic Department.'
                        />
                       
                        <Paragraph
                        className='pb-2'

                        content='This synergy gives PropertySeller a unique edge: You enjoy a user-friendly,
tech-enabled experience to buy a house in Dubai, backed by the security and
professionalism of a licensed and reputable real estate firm with deep local
knowledge. Every transaction, whether off-plan or resale, is executed with strict
adherence to regulatory standards and best practices. Our technology-driven back
office ensures smooth processing, from document verification to legal compliance,
making your decision to buy a house in Dubai safe and stress-free.'
                        />

                        <Paragraph

                        className='pb-2'
content='The integration of advanced tools is a bonus, meaning you spend less time worrying
about logistics, and more time focusing on finding and buying your dream house in
Dubai.'
                        />
                    </SpaceWrapper>


                    <h3 className=' font-poppins font-medium text-[20px] sm:text-[37.5px] text-center pb-[0px] sm:pb-[10px] pt-6'>Meet Ashiq Emiraaz: The Visionary Behind PropertySeller</h3>



                    <SpaceWrapper className='pt-[6px] sm:pt-0'>
                        <Paragraph
                        className='pb-2'

                        content='Ashiq Emiraaz, founder of PropertySeller, with his years of experience working in the
technology and innovation sector inspired him to reimagine Dubai’s real estate space.
He saw that while Dubai excelled in futuristic architecture and global appeal, its real
estate processes lagged behind - cluttered with outdated practices, duplicate listings,
excessive bureaucracy, and limited transparency.'
                        />
                        <Paragraph
                        className='pb-2'

                        content='Ashiq recognized a need for technical interpretation and transformation in the real
estate industry. Leveraging his expertise, he designed PropertySeller to bridge this
gap- empowering buyers to access real-time insights, accurate information, privacy
policy and a great care to avoid duplication.'
                        />

                        <Paragraph
                        className='pb-2'

                        content='His vision for PropertySeller was clear: Create a platform where buying a house in
Dubai or any part of the UAE is as seamless and user-oriented as the best digital
experience.'
                        />

                        <Paragraph
                        className='pb-2'

                        content='Under Ashiq’s leadership, PropertySeller has quickly grown into UAE’s most
innovative real estate platform, expanding to cover everything from off-plan,
Off-plan resale, secondary and land plots. His mission isn’t just to build another real
estate business, but to set a new standard - one where technology drives
transparency, efficiency, and customer satisfaction for everyone looking to buy a
house in Dubai.'
                        />
                        <Paragraph
                            content='Welcome to PropertySeller - Together, let’s make your dream to buy a house in Dubai
a reality.'
                        />
                    </SpaceWrapper>



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
