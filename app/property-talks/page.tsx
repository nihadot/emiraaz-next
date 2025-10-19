import { baseUrl } from '@/api'
import SectionDivider from '@/components/atom/SectionDivider/SectionDivider'
import MobileHeaderTitle from '@/components/atom/typography/MobileHeaderTitle'
import { Footer } from '@/components/Footer'
import Header from '@/components/Header'
import clsx from 'clsx'
import { Metadata } from 'next'
import React, { Suspense } from 'react'

// property-talks

// Enable ISR with 60-second revalidation
export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {

    try {
        // Fetch metadata with cache-busting timestamp to ensure fresh data
        const responseData = await fetch(
            `${baseUrl}/meta-data?referencePage=property-talks`,
            {
                next: {
                    revalidate: 60 // Revalidate every 10 seconds
                },
            }
        ).then((res) => res.json())

        const data = responseData?.data?.[0] || {};

        return {
            title: data.metaTitle || "Property Talks | Property Seller - Trusted Off-Plan Real Estate Marketplace",
            description: data.metaDescription || "Learn how Property Seller is transforming real estate with verified listings, expert support, and exclusive off-plan property opportunities in Dubai and beyond.",
            keywords: data.keywords || 'property, real estate, property talks',
            openGraph: {
                title: data.openGraphTitle || "Property Talks | Simplifying Real Estate Investments",
                description: data?.openGraphDescription || "Discover Property Seller’s mission to simplify real estate, connect buyers with top developers, and offer transparent, hassle-free property investments.",
                url: data?.openGraphUrl || "https://www.propertyseller.com/property-talks",
                siteName: data?.siteName || "Property Seller",
                images: [
                    {
                        url: data?.metaImage?.url || "https://res.cloudinary.com/dknxmloqh/image/upload/v1748991060/favicon-DBW5gi7l_j0cjdz.png",
                        width: 1200,
                        height: 630,
                        alt: data?.metaImage?.openGraphTitle || "Property Talks - Connecting Buyers with Trusted Developers",
                    },
                ],
                type: data?.type || "website",
            },
            twitter: {
                title: data.twitterTitle || 'Property Talks | Property Seller',
                description: data.twitterDescription || 'Learn about PropertySeller',
                images: data.twitterImage ? [data.twitterImage.url] : ["https://res.cloudinary.com/dknxmloqh/image/upload/v1748991060/favicon-DBW5gi7l_j0cjdz.png"],
            },
            alternates: {
                canonical: data.canonical || "https://www.propertyseller.com/property-talks"
            }
        }
    } catch (error) {

        // Return fallback metadata
        return {
            description: "Learn how Property Seller is transforming real estate with verified listings, expert support, and exclusive off-plan property opportunities in Dubai and beyond.",
            openGraph: {
                title: "Property Seller Talks | Simplifying Real Estate Investments",
                description: "Discover Property Seller’s mission to simplify real estate, connect buyers with top developers, and offer transparent, hassle-free property investments.",
                url: "https://www.propertyseller.com/property-talks",
                siteName: "Property Seller",
                images: [
                    {
                        url: "https://res.cloudinary.com/dknxmloqh/image/upload/v1748991060/favicon-DBW5gi7l_j0cjdz.png",
                        width: 1200,
                        height: 630,
                        alt: "Property Seller Talks - Connecting Buyers with Trusted Developers",
                    },
                ],
                type: "website",
            },
            twitter: {
                card: "summary_large_image",
                title: "Property Seller Talks | Property Seller - Trusted Real Estate Platform",
                description: "At Property Seller, we connect you with the best off-plan property investments—offering expert guidance, verified projects, and complete transparency.",
                images: ["https://res.cloudinary.com/dknxmloqh/image/upload/v1748991060/favicon-DBW5gi7l_j0cjdz.png"],
            },
            alternates: {
                canonical: "https://www.propertyseller.com/property-talks",
            },
        }
    }
}


export default function Page() {
    return (
        <main>
            <Header logoSection={
                <div className='h-full w-full flex justify-center items-center'>
                    <MobileHeaderTitle
                        content='Property Talks'
                    />
                </div>
            } />

            <SectionDivider
                containerClassName={clsx("mb-[12px] mt-[12px]")}
                lineClassName="h-[1px] w-full bg-[#DEDEDE]"
            />

            <section>

            </section>
            <Footer />
        </main>
    )
}

// export default page

