import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ReduxProvider } from "@/redux/provider";
import { Toaster } from "react-hot-toast";
import AppInitializer from "./AppInitializer";
import Script from "next/script";
import NoInternetWrapper from "@/components/NoInternetWrapper/NoInternetWrapper";
import { baseUrl } from "@/api";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});


// Enable ISR with 10-second revalidation
export const revalidate = 60;


export async function generateMetadata(): Promise<Metadata> {

  try {
    // Fetch metadata with cache-busting timestamp to ensure fresh data
    const responseData = await fetch(
      `${baseUrl}/meta-data?referencePage=home-page`,
      {
        next: {
          revalidate: 60 // Revalidate every 10 seconds
        },
      }
    ).then((res) => res.json())

    const data = responseData?.data?.[0] || {};

    return {
      title: data.metaTitle || "Trusted Real Estate Partner in UAE | PropertySeller Dubai",
      description: data.metaDescription || "Buy properties direct from developers & owners on PropertySeller. ✔Verified listings ✔ transparent pricing ✔ Properties for sale in Dubai, Abu Dhabi &  Sharjah.",
      keywords: data.keywords || [
        "propertyseller",
        "property seller",
        "appartments for sale",
        "villas for sale",
        "townhouses for sale",
        "penthouses for sale",
        "apartments for sale",
        "property for sale",
        "property for sale in dubai",
        "property for sale in uae",
        "property for sale in abu dhabi",
        "property for sale in sharjah",
        "property for sale in ras al khimah",
        "property for sale in al marjan island",

      ],
      openGraph: {
        title: data.openGraphTitle || "PropertySeller UAE | Apartments, Villas, Townhouses, Penthouses",
        description: data?.openGraphDescription || "PropertySeller is your partner for the latest off-plan projects and new developments across the UAE. If you're a investor or homebuyer all in one place with reliable and hassle-free.",
        url: data?.openGraphUrl || "https://www.propertyseller.com/",
        siteName: data?.siteName || "Property Seller",
        images: [
          {
            url: data?.metaImage?.url || "https://res.cloudinary.com/dknxmloqh/image/upload/v1748991060/favicon-DBW5gi7l_j0cjdz.png",
            width: 1200,
            height: 630,
            alt: data?.metaImage?.openGraphTitle || "Dubai Property - Property Seller",
          },
        ],
        locale: "en_US",
        type: data?.type || "website",
      },
      twitter: {
        card: "summary_large_image",
        title: data.twitterTitle || "Propertyseller UAE | Apartments, Villas, Townhouses, Penthouses",
        description: data.twitterDescription || "Explore premium off-plan properties and apartments for sale in Dubai.",
        images: data.twitterImage ? [data.twitterImage.url] : ["https://res.cloudinary.com/dknxmloqh/image/upload/v1748991060/favicon-DBW5gi7l_j0cjdz.png"]
      },
      alternates: {
        canonical: data?.canonical || "https://www.propertyseller.com/",
      }
    }
  } catch (error) {

    // Return fallback metadata
    return {
      title: "Trusted Real Estate Partner in UAE | PropertySeller Dubai",
      description: "Buy properties direct from developers & owners on PropertySeller. ✔Verified listings ✔ transparent pricing ✔ Properties for sale in Dubai, Abu Dhabi &  Sharjah",
      keywords: [
        "propertyseller",
        "property seller",
        "appartments for sale",
        "villas for sale",
        "townhouses for sale",
        "penthouses for sale",
        "apartments for sale",
        "property for sale",
        "property for sale in dubai",
        "property for sale in uae",
        "property for sale in abu dhabi",
        "property for sale in sharjah",
        "property for sale in ras al khimah",
        "property for sale in al marjan island",

      ], openGraph: {
        title: "PropertySeller UAE | Apartments, Villas, Townhouses, Penthouses",
        description: "PropertySeller is your partner for the latest off-plan projects and new developments across the UAE. If you're a investor or homebuyer all in one place with reliable and hassle-free.",
        url: "https://www.propertyseller.com/",
        siteName: "Property Seller",
        images: [
          {
            url: "https://res.cloudinary.com/dknxmloqh/image/upload/v1748991060/favicon-DBW5gi7l_j0cjdz.png",
            width: 1200,
            height: 630,
            alt: "Dubai Property - Property Seller",
          },
        ],
        locale: "en_US",
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: "Propertyseller UAE | Apartments, Villas, Townhouses, Penthouses",
        description: "Explore premium off-plan properties and apartments for sale in Dubai.",
        images: ["https://res.cloudinary.com/dknxmloqh/image/upload/v1748991060/favicon-DBW5gi7l_j0cjdz.png"],
        site: "@PropertySeller",
      },
      alternates: {
        canonical: "https://www.propertyseller.com/",
      },
    };

  }
}

/* eslint-disable @next/next/no-img-element */

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="">
      <head>

        <link rel="icon" href="/favicon.ico" sizes="any" />
        <Script
          id="gtm-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-PB5XRT9G');
            `,
          }}
        />

        {/* Meta Pixel base code */}

        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '4186301091603043');
              fbq('track', 'PageView');
            `,
          }}
        />

        <noscript>

          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=4186301091603043&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>




        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "rra4oxbxbb");
            `,
          }}
        />


        <meta name="facebook-domain-verification" content="qlii4wdbv66yxua1ukm0pkr0nqzn8m" />
      </head>
      <body className={`${poppins.variable} antialiased`}>
        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PB5XRT9G"
          height="0" width="0"
          style={{ display: "none", visibility: "hidden" }}

        ></iframe></noscript>
        <ReduxProvider>
          <NoInternetWrapper>

            <AppInitializer />
            <Toaster />
            {children}
          </NoInternetWrapper>
        </ReduxProvider>
      </body>
    </html>
  );
}
