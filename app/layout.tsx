import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ReduxProvider } from "@/redux/provider";
import { Toaster } from "react-hot-toast";
import AppInitializer from "./AppInitializer";
import Script from "next/script";
import NoInternetWrapper from "@/components/NoInternetWrapper/NoInternetWrapper";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});


export const metadata: Metadata = {
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
