import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ReduxProvider } from "@/redux/provider";
import { Toaster } from "react-hot-toast";
import AppInitializer from "./AppInitializer";
import Script from "next/script";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "PropertySeller",
  description: "Property Seller",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="">
      <head>
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
          <AppInitializer />
          <Toaster />
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
