import { baseUrl } from '@/api';
import LayoutForAdsLandingPage from '@/components/LayoutForAdsLandingPage/LayoutForAdsLandingPage'
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import React from 'react'

type Props = {
    params: Promise<{ developerId: string }>;

}


// export async function generateMetadata(): Promise<Metadata> {

//   try {
//     // Fetch metadata with cache-busting timestamp to ensure fresh data
//     const responseData = await fetch(
//       `${baseUrl}/meta-data?referencePage=home-page`,
//       {
//         next: {
//           revalidate: 60 // Revalidate every 10 seconds
//         },
//       }
//     ).then((res) => res.json())

//     const data = responseData?.data?.[0] || {};

//     return {
//       title: data.metaTitle || "Trusted Real Estate Partner in UAE | PropertySeller Dubai",
//       description: data.metaDescription || "Buy properties direct from developers & owners on PropertySeller. ✔Verified listings ✔ transparent pricing ✔ Properties for sale in Dubai, Abu Dhabi &  Sharjah.",
//       keywords: data.keywords || [
//         "propertyseller",
//         "property seller",
//         "appartments for sale",
//         "villas for sale",
//         "townhouses for sale",
//         "penthouses for sale",
//         "apartments for sale",
//         "property for sale",
//         "property for sale in dubai",
//         "property for sale in uae",
//         "property for sale in abu dhabi",
//         "property for sale in sharjah",
//         "property for sale in ras al khimah",
//         "property for sale in al marjan island",

//       ],
//       openGraph: {
//         title: data.openGraphTitle || "PropertySeller UAE | Apartments, Villas, Townhouses, Penthouses",
//         description: data?.openGraphDescription || "PropertySeller is your partner for the latest off-plan projects and new developments across the UAE. If you're a investor or homebuyer all in one place with reliable and hassle-free.",
//         url: data?.openGraphUrl || "https://www.propertyseller.com/",
//         siteName: data?.siteName || "Property Seller",
//         images: [
//           {
//             url: data?.metaImage?.url || "https://res.cloudinary.com/dknxmloqh/image/upload/v1748991060/favicon-DBW5gi7l_j0cjdz.png",
//             width: 1200,
//             height: 630,
//             alt: data?.metaImage?.openGraphTitle || "Dubai Property - Property Seller",
//           },
//         ],
//         locale: "en_US",
//         type: data?.type || "website",
//       },
//       twitter: {
//         card: "summary_large_image",
//         title: data.twitterTitle || "Propertyseller UAE | Apartments, Villas, Townhouses, Penthouses",
//         description: data.twitterDescription || "Explore premium off-plan properties and apartments for sale in Dubai.",
//         images: data.twitterImage ? [data.twitterImage.url] : ["https://res.cloudinary.com/dknxmloqh/image/upload/v1748991060/favicon-DBW5gi7l_j0cjdz.png"]
//       },
//       alternates: {
//         canonical: data?.canonical || "https://www.propertyseller.com/",
//       }
//     }
//   } catch (error) {

//     // Return fallback metadata
//     return {
//       title: "Trusted Real Estate Partner in UAE | PropertySeller Dubai",
//       description: "Buy properties direct from developers & owners on PropertySeller. ✔Verified listings ✔ transparent pricing ✔ Properties for sale in Dubai, Abu Dhabi &  Sharjah",
//       keywords: [
//         "propertyseller",
//         "property seller",
//         "appartments for sale",
//         "villas for sale",
//         "townhouses for sale",
//         "penthouses for sale",
//         "apartments for sale",
//         "property for sale",
//         "property for sale in dubai",
//         "property for sale in uae",
//         "property for sale in abu dhabi",
//         "property for sale in sharjah",
//         "property for sale in ras al khimah",
//         "property for sale in al marjan island",

//       ], openGraph: {
//         title: "PropertySeller UAE | Apartments, Villas, Townhouses, Penthouses",
//         description: "PropertySeller is your partner for the latest off-plan projects and new developments across the UAE. If you're a investor or homebuyer all in one place with reliable and hassle-free.",
//         url: "https://www.propertyseller.com/",
//         siteName: "Property Seller",
//         images: [
//           {
//             url: "https://res.cloudinary.com/dknxmloqh/image/upload/v1748991060/favicon-DBW5gi7l_j0cjdz.png",
//             width: 1200,
//             height: 630,
//             alt: "Dubai Property - Property Seller",
//           },
//         ],
//         locale: "en_US",
//         type: "website",
//       },
//       twitter: {
//         card: "summary_large_image",
//         title: "Propertyseller UAE | Apartments, Villas, Townhouses, Penthouses",
//         description: "Explore premium off-plan properties and apartments for sale in Dubai.",
//         images: ["https://res.cloudinary.com/dknxmloqh/image/upload/v1748991060/favicon-DBW5gi7l_j0cjdz.png"],
//         site: "@PropertySeller",
//       },
//       alternates: {
//         canonical: "https://www.propertyseller.com/",
//       },
//     };

//   }
// }



async function page({ params}: Props) {

      const { developerId } = await params;

      const res = await fetch(`${baseUrl}/promo-page/developer/${developerId}`, {
            next: { revalidate: 60 },
          });

      const data = await res.json();

  
        if (!data?.data) return notFound();





  return (
    <LayoutForAdsLandingPage
    data={data?.data}
    />
  )
}

export default page