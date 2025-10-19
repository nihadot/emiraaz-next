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



/* eslint-disable @next/next/no-img-element */

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.propertyseller.com/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Buy Off-plan Projects in Dubai",
        "item": "https://www.propertyseller.com/buy/dubai/off-plan-projects"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Buy Residential Off-plan Projects in Dubai",
        "item": "https://www.propertyseller.com/buy/dubai/off-plan-projects/residential"
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": "Buy Commercial Off-plan Projects in Dubai",
        "item": "https://www.propertyseller.com/buy/dubai/off-plan-projects/commercial"
      },
    ]
  };


  // const jsonLdFAQ = {
  //   "@context": "https://schema.org",
  //   "@type": "FAQPage",
  //   "mainEntity": [
  //     {
  //       "@type": "Question",
  //       "name": "What is Property Seller?",
  //       "acceptedAnswer": {
  //         "@type": "Answer",
  //         "text": "Property Seller is a platform to buy and sell real estate properties easily."
  //       }
  //     },
  //     {
  //       "@type": "Question",
  //       "name": "How can I contact support?",
  //       "acceptedAnswer": {
  //         "@type": "Answer",
  //         "text": "You can contact support via email or phone listed on our contact page."
  //       }
  //     }
  //   ]
  // };


  return (
    <html lang="en" className="">
      <head>

        {/* Google Search Console */}
        <meta name="google-site-verification" content="G_AT5mdwZkSIuVBfXItP52Z-fDpSdnUJ33M-fEDlkC4" />

        <link rel="icon" href="/favicon.ico" sizes="any" />

        {/* <Script
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
        /> */}

        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-2C1SXEMRHX"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-2C1SXEMRHX');
        `}
        </Script>

        {/* <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFAQ) }}
        /> */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Property Seller",
            "url": "https://www.propertyseller.com/",
            "logo": "https://res.cloudinary.com/dknxmloqh/image/upload/v1748991060/favicon-DBW5gi7l_j0cjdz.png",
            "sameAs": [
              "https://www.instagram.com/propertyselleruae/reels/",
              "https://www.linkedin.com/company/propertyseller",
              "https://https://www.facebook.com/propertyselleruae",
              "https://https://www.youtube.com/@propertyselleruae/videos"
            ],
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+91-XXXXXXXXXX",
              "contactType": "Customer Service",
              "areaServed": "UAE"
            }
          }
          ` }}
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
