import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ReduxProvider } from "@/redux/provider";
import { Toaster } from 'react-hot-toast'
import AppInitializer from "./AppInitializer";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300","400", "500","600", "700"],
});

export const metadata: Metadata = {
  title: "Property Seller",
  description: "Property Seller",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="en" className="">
      <body className={`${poppins.variable} antialiased`}>
        <ReduxProvider>
          <AppInitializer />
          <Toaster />
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
