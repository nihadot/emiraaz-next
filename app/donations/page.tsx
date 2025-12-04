import { baseUrl } from '@/api'
import Container from '@/components/atom/Container/Container'
import SectionDivider from '@/components/atom/SectionDivider/SectionDivider'
import MobileHeaderTitle from '@/components/atom/typography/MobileHeaderTitle'
import { Footer } from '@/components/Footer'
import Header from '@/components/Header'
import clsx from 'clsx'
import { Metadata } from 'next'
import Script from 'next/script'
import React from 'react'


// Enable ISR with 60-second revalidation
export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {

    try {
        // Fetch metadata with cache-busting timestamp to ensure fresh data
        const responseData = await fetch(
            `${baseUrl}/meta-data?referencePage=donations`,
            {
                next: {
                    revalidate: 60 // Revalidate every 10 seconds
                },
            }
        ).then((res) => res.json())

        const data = responseData?.data?.[0] || {};

        return {
            title: data.metaTitle || "Property Seller - Trusted Off-Plan Real Estate Marketplace",
            description: data.metaDescription || "Learn how Property Seller is transforming real estate with verified listings, expert support, and exclusive off-plan property opportunities in Dubai and beyond.",
            keywords: data.keywords || 'Property Seller, Real Estate, PropertySeller, Dubai, UAE, Trusted Real Estate Platform, Off-Plan Property, Rental Income, Rental Income Calculator',
            openGraph: {
                title: data.openGraphTitle || "Simplifying Real Estate Investments",
                description: data?.openGraphDescription || "Discover Property Seller’s mission to simplify real estate, connect buyers with top developers, and offer transparent, hassle-free property investments.",
                url: data?.openGraphUrl || "https://www.propertyseller.com/donations",
                siteName: data?.siteName || "Property Seller",
                images: [
                    {
                        url: data?.metaImage?.url || "https://res.cloudinary.com/dknxmloqh/image/upload/v1748991060/favicon-DBW5gi7l_j0cjdz.png",
                        width: 1200,
                        height: 630,
                        alt: data?.metaImage?.openGraphTitle || "Connecting Buyers with Trusted Developers",
                    },
                ],
                type: data?.type || "website",
            },
            twitter: {
                title: data.twitterTitle || 'Property Seller',
                description: data.twitterDescription || 'Learn about PropertySeller',
                images: data.twitterImage ? [data.twitterImage.url] : ["https://res.cloudinary.com/dknxmloqh/image/upload/v1748991060/favicon-DBW5gi7l_j0cjdz.png"],
            },
            alternates: {
                canonical: data.canonical || "https://www.propertyseller.com/donations"
            }
        }
    } catch (error) {

        // Return fallback metadata
        return {
            description: "Learn how Property Seller is transforming real estate with verified listings, expert support, and exclusive off-plan property opportunities in Dubai and beyond.",
            openGraph: {
                title: "Simplifying Real Estate Investments",
                description: "Discover Property Seller’s mission to simplify real estate, connect buyers with top developers, and offer transparent, hassle-free property investments.",
                url: "https://www.propertyseller.com/donations",
                siteName: "Property Seller",
                images: [
                    {
                        url: "https://res.cloudinary.com/dknxmloqh/image/upload/v1748991060/favicon-DBW5gi7l_j0cjdz.png",
                        width: 1200,
                        height: 630,
                        alt: "Connecting Buyers with Trusted Developers",
                    },
                ],
                type: "website",
            },
            twitter: {
                card: "summary_large_image",
                title: "Property Seller - Trusted Real Estate Platform",
                description: "At Property Seller, we connect you with the best off-plan property investments—offering expert guidance, verified projects, and complete transparency.",
                images: ["https://res.cloudinary.com/dknxmloqh/image/upload/v1748991060/favicon-DBW5gi7l_j0cjdz.png"],
            },
            alternates: {
                canonical: "https://www.propertyseller.com/donations",
            },
        }
    }
}



async function page() {

    const responseData = await fetch(
        `${baseUrl}/meta-data?referencePage=donations`,
        {
            next: {
                revalidate: 60 // Revalidate every 10 seconds
            },
        }
    ).then((res) => res.json())
    const dataForMeta = responseData?.data?.[0] || {};
    const scripts = dataForMeta?.richSnippets?.match(
        /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi
    ) || [];
    return (
        <>
            {scripts?.map((script: string, index: number) => {
                // Remove outer <script> tags to use innerHTML
                const innerJson = script
                    .replace(/<script[^>]*>/g, "")
                    .replace(/<\/script>/g, "")
                    .trim();

                return (
                    <Script
                        key={index}
                        id={`json-ld-schema-${index}`}
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{ __html: innerJson }}
                        strategy="afterInteractive" // "beforeInteractive" if needed
                    />
                );
            })}
            <main>
                <Header logoSection={
                    <div className='h-full w-full flex justify-center items-center'>
                        <MobileHeaderTitle
                            content='Donations'
                        />
                    </div>
                } />


                <SectionDivider
                    containerClassName={clsx("mb-[12px] mt-[12px]")}
                    lineClassName="h-[1px] w-full bg-[#DEDEDE]"
                />


                <Container>

                    <section className='mt-20 mb-40'>
                        <div className="">
                            <h1 className=' font-poppins mt-[51px] text-center font-medium text-[19.5px] sm:text-[37.5px]'>
                                Giving Back to the <span className='text-[#FF1645]'>Community</span>
                            </h1>
                            <p className=' mt-2 sm:mt-[16.5px] text-center text-[12px] font-poppins font-normal text-[#000000]'>At PropertySeller, we believe in making a positive impact. A portion of our earnings is dedicated to helping those in need.</p>
                        </div>


                        <div className="m-auto mt-4 sm:mt-[66px] rounded-[5px] border-[#DEDEDE] max-w-[618px] border h-[85.25px] flex justify-center items-center w-full ">
                            <p className='font-poppins  flex items-center sm:flex-row flex-col justify-center gap-1 sm:gap-2 font-normal text-[14px] md:text-[18.75px]'>Total Donations as of Now:
                                <span className='text-[#FF1645] gap-1 flex items-center lg:text-[33.75px] md:text-[28px] text-[18px] sm:text-[34px] font-normal font-poppins'>
                                    <span className='text-center block'>AED</span>
                                    <span className='text-center pt-1 sm:pt-2.5 block '>*****</span>
                                </span>
                            </p>
                        </div>

                        <div className="mt-4 sm:mt-[66px]">
                            <p className='font-normal text-[13px] md:text-[16px] font-poppins text-[#333333] text-center'>Thank you for being part of our journey to create a better future!</p>
                        </div>
                    </section>
                </Container>

                <Footer />
            </main>
        </>
    )
}

export default page