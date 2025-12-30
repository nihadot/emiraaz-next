'use client';
import React from 'react';
import Image from 'next/image';
import { why_dubai_icon } from '@/app/assets';
import highROIIcon from '@/app/assets/highROI.svg';
import taxFreeIcon from '@/app/assets/taxfree.svg';
import paymentPlanIcon from '@/app/assets/paymentplan.svg';
import stableCurrencyIcon from '@/app/assets/stablecurrency.svg';
import rentalDemandIcon from '@/app/assets/rentaldemand.svg';

import expoImage from '@/app/assets/expoimage.jpg';
import openHouseTailImage from '@/app/assets/openhousetail.jpg';
import openhouseImg1 from '@/app/assets/openhouse1.png';
import openhouseImg2 from '@/app/assets/openhouse2.png';
import openhouseROI from '@/app/assets/openhouseROI.svg';
import openhouseZero from '@/app/assets/openhouseZero.svg';
import openROIIcon from '@/app/assets/openROI.svg';
import openHouseEconomyIcon from '@/app/assets/openhouseEconomy.svg';
interface InfoCardMobileProps {
  icon: any;
  title: string;
  description: string;
  accentColor: string;
}
const InfoCardMobile: React.FC<InfoCardMobileProps> = ({
  icon,
  title,
  description,
  accentColor,
}) => {
  return (
    <div className="bg-white rounded-xl border border-[#E5E7EB] px-4 py-4 mb-3">
      <div className="flex items-start gap-3">
        {/* Icon Box */}
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
        >
          <Image src={icon} alt="" width={50} height={50} />
        </div>

        {/* Text */}
        <div className="flex-1">
          <p className="text-sm font-semibold text-[#111827] leading-tight">
            {title}
          </p>
          <p className="mt-1 text-xs text-[#6B7280] leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};


function WhyDubaiMobile() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between px-4 py-3">
          <button className="p-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <h1 className="text-base font-semibold">Why Dubai</h1>
          <button className="p-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Hero Section */}
     {/* Hero Section */}
<div className="relative mx-4 mt-4 h-[200px] overflow-hidden rounded-2xl">
  {/* Background Image */}
  <Image
    src={why_dubai_icon}
    alt="Dubai skyline"
    fill
    priority
    className="object-cover"
  />

  {/* Gradient Overlay */}
  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

  {/* Content */}
  <div className="absolute bottom-5 left-5 right-5 flex gap-4">
    {/* Left vertical white line */}
    <div className="w-[3px] bg-white/90 rounded-full" />

    {/* Text */}
    <div>
      <h2 className="text-white text-[20px] font-semibold mb-2 leading-tight">
        Why Invest in Dubai?
      </h2>
      <p className="text-white/90 text-[13px] leading-relaxed">
        Dubai consistently ranks among the world’s strongest real estate
        markets — offering unmatched returns, stability, and long-term growth
        for investors.
      </p>
    </div>
  </div>
</div>


  {/* Dubai at a Glance */}
<div className="px-4 py-6">
  <h2 className="text-lg font-bold mb-4 text-black">
    Dubai at a Glance
  </h2>

  {/* Scrollable cards */}
  <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">

    {/* Card 1 */}
    <div className="min-w-[260px] bg-[#F7F7F7] rounded-2xl p-5">
      <div className="w-10 h-10 rounded-full flex items-center justify-center mb-4">
        <Image
          src={openhouseROI}
          alt="Average ROI"
          className="w-8 h-8"
        />
      </div>

      <div className="text-xl font-bold text-black mb-1">
        8–12%
      </div>
      <div className="text-sm font-semibold text-black mb-1">
        Average ROI
      </div>
      <div className="text-sm text-gray-600 leading-relaxed">
        Higher than New York, London, and Singapore.
      </div>
    </div>

    {/* Card 2 */}
    <div className="min-w-[260px] bg-[#F7F7F7] rounded-2xl p-5">
      <div className="w-10 h-10 rounded-full flex items-center justify-center mb-4">
        <Image
          src={openhouseZero}
          alt="Zero Property Tax"
          className="w-8 h-8"
        />
      </div>

      <div className="text-xl font-bold text-black mb-1">
        0%
      </div>
      <div className="text-sm font-semibold text-black mb-1">
        Property Taxes
      </div>
      <div className="text-sm text-gray-600 leading-relaxed">
        Dubai’s tax-free structure maximizes your rental returns.
      </div>
    </div>

  </div>

       {/* Strong Financial Upside */}
<h2 className="text-lg font-bold mb-3 mt-4 text-black">
  Strong Financial Upside
</h2>

<p className="text-xs text-gray-600 mb-4 leading-relaxed">
  Dubai offers some of the highest rental returns and investor-friendly financial policies.
</p>

<InfoCardMobile
  icon={highROIIcon}
  title="High Return on Investment"
  description="Dubai consistently delivers ROI between 8-12%."
  accentColor="#3CA8E2"
/>

<InfoCardMobile
  icon={taxFreeIcon}
  title="Tax-Free Income"
  description="No property tax, rental income tax, or capital gains tax."
  accentColor="#345F4C"
/>

<InfoCardMobile
  icon={paymentPlanIcon}
  title="Flexible Payment Plans"
  description="Developers offer 60/40, 70/30, and 15 monthly plans."
  accentColor="#D500F6"
/>

<InfoCardMobile
  icon={stableCurrencyIcon}
  title="Stable Currency"
  description="AED pegged to USD ensures long-term stability."
  accentColor="#304FFF"
/>

<InfoCardMobile
  icon={rentalDemandIcon}
  title="High Rental Demand"
  description="Growing population + year-round tenant demand."
  accentColor="#0091EA"
/>

     {/* Strong Financial Upside */}
<div className="px-2 mt-6">
  <h2 className="text-lg font-bold mb-2 text-black">
    Strong Financial Upside
  </h2>

  <p className="text-sm text-gray-600 mb-4 leading-relaxed">
    Dubai offers some of the highest rental returns and investor-friendly
    financial policies.
  </p>

 {/* Scrollable cards */}
<div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">

  {/* Card 1 */}
  <div className="min-w-[280px] bg-white rounded-2xl border border-gray-200 p-5">
    <div className="flex items-center gap-3 mb-3">
      <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
        <Image
          src={openROIIcon}
          alt="High ROI"
          className="w-[22px] h-[22px]"
        />
      </div>
      <h3 className="text-base font-semibold text-black">
        High Return on Investment
      </h3>
    </div>

    {/* Divider */}
    <div className="h-px bg-gray-200 mb-3" />

    <p className="text-sm text-gray-600 leading-relaxed">
      A global powerhouse for trade, business, and innovation, Dubai
      continues to expand rapidly with strong economic policies that
      attract investors and corporations worldwide.
    </p>
  </div>

  {/* Card 2 */}
  <div className="min-w-[280px] bg-white rounded-2xl border border-gray-200 p-5">
    <div className="flex items-center gap-3 mb-3">
      <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
        <Image
          src={openHouseEconomyIcon}
          alt="Global Connectivity"
          className="w-[22px] h-[22px]"
        />
      </div>
      <h3 className="text-base font-semibold text-black">
        Global Connectivity
      </h3>
    </div>
      {/* Divider */}
      <div className="h-px bg-gray-200 mb-3" />

      <p className="text-sm text-gray-600 leading-relaxed">
        With access to over 240 destinations through Dubai International
        Airport and emerging hubs, Dubai offers unmatched global connectivity
        that fuels business and tourism.
      </p>
    </div>
  </div>
</div>


   {/* World-Class Living Experience */}
<div className="px-2 mt-6">
  <h2 className="text-lg font-bold mb-2 text-black">
    World-Class Living Experience
  </h2>

  <p className="text-sm text-gray-600 mb-4 leading-relaxed">
    Dubai combines luxury living with advanced infrastructure and futuristic planning.
  </p>

  {/* Scrollable cards */}
  <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
    
    {/* Card 1 */}
    <div className="min-w-[300px] bg-white rounded-2xl border border-gray-200 p-4">
      <div className="overflow-hidden rounded-xl mb-4">
        <Image
          src={openhouseImg1}
          alt="World-Class Infrastructure"
          className="w-full h-[180px] object-cover"
          priority
        />
      </div>

      <h3 className="text-base font-semibold mb-1 text-black">
        World-Class Infrastructure
      </h3>
      <p className="text-sm text-gray-600 leading-relaxed">
        Modern transport, smart roads, and advanced services power Dubai’s growth.
      </p>
    </div>

    {/* Card 2 */}
    <div className="min-w-[300px] bg-white rounded-2xl border border-gray-200 p-4">
      <div className="overflow-hidden rounded-xl mb-4">
        <Image
          src={openhouseImg2}
          alt="Tourism Powerhouse"
          className="w-full h-[180px] object-cover"
        />
      </div>

      <h3 className="text-base font-semibold mb-1 text-black">
        Tourism Powerhouse
      </h3>
      <p className="text-sm text-gray-600 leading-relaxed">
        Over 15 million visitors annually create strong demand for short-term rentals.
      </p>
    </div>

  </div>
</div>


    {/* Upcoming Mega Projects */}
<div className="px-2 mb-6 mt-4">
  <div className="relative overflow-hidden rounded-2xl h-[360px]">
    {/* Image */}
    <Image
      src={openHouseTailImage}
      alt="Upcoming Mega Projects"
      fill
      className="object-cover"
      priority
    />

    {/* Gradient Overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

    {/* Text Content */}
    <div className="absolute bottom-5 left-5 right-5">
      <h3 className="text-white text-lg font-semibold mb-2">
        Upcoming Mega Projects
      </h3>
      <p className="text-white/90 text-sm leading-relaxed">
        Dubai continuously launches innovative mega projects like Dubai Creek
        Harbour, Mohammed Bin Rashid City, and Dubai South. These developments
        promise high appreciation potential and new investment opportunities.
      </p>
    </div>
  </div>
</div>


       {/* Expo 2020 and Beyond */}
<div className="px-2 mb-6">
  {/* Heading */}
  <h3 className="text-lg font-bold text-black mb-2">
    Expo 2020 and Beyond
  </h3>

  <p className="text-sm text-gray-600 leading-relaxed mb-4">
    Explore the legacy of Expo 2020 and its lasting impact on Dubai&apos;s growth,
    innovation, and global connectivity. Discover how this landmark event has
    shaped the future of our city and the opportunities that lie ahead.
  </p>

 {/* Image */}
<div className="overflow-hidden rounded-2xl mb-4">
  <Image
    src={expoImage}
    alt="Expo 2020"
    className="w-full h-[220px] object-cover"
    priority
  />
</div>

  {/* Scrollable Pills */}
<div className="overflow-x-auto scrollbar-hide mb-4">
  <div className="flex gap-3 w-max px-[2px]">
    <span className="whitespace-nowrap px-4 py-2 rounded-full border border-gray-300 text-sm text-gray-700">
      Smart City Evolution
    </span>

    <span className="whitespace-nowrap px-4 py-2 rounded-full border border-gray-300 text-sm text-gray-700">
      Global Business Hub
    </span>

    <span className="whitespace-nowrap px-4 py-2 rounded-full border border-gray-300 text-sm text-gray-700">
      Lifestyle & Connectivity
    </span>
  </div>
</div>

</div>
</div>


      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-3">
        <div className="flex justify-between items-center ">
          <button className="flex flex-col items-center gap-1">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/>
            </svg>
            <span className="text-xs">Home</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-gray-400">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" strokeWidth="2"/>
            </svg>
            <span className="text-xs">Saved</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-gray-400">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" strokeWidth="2"/>
            </svg>
            <span className="text-xs">Featured</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-gray-400">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" strokeWidth="2"/>
            </svg>
            <span className="text-xs">Notifications</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-gray-400">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M4 6h16M4 12h16M4 18h16" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <span className="text-xs">More</span>
          </button>
        </div>
      </div>
    </main>
  );
}

export default WhyDubaiMobile;