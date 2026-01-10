'use client';
import React from 'react';
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

import Header from './Header';
import HeroSection from './HeroSection';
import DubaiGlanceSection from './DubaiGlanceSection';
import FinancialInfoCardsSection from './FinancialInfoCardsSection';
import FinancialUpsideCardsSection from './FinancialUpsideCardsSection';
import WorldClassLivingSection from './WorldClassLivingSection';
import UpcomingProjectsSection from './UpcomingProjectsSection';
import ExpoSection from './ExpoSection';

function WhyDubaiMobile() {
  const glanceCards = [
    {
      icon: openhouseROI,
      value: '8–12%',
      label: 'Average ROI',
      description: 'Higher than New York, London, and Singapore.',
    },
    {
      icon: openhouseZero,
      value: '0%',
      label: 'Property Taxes',
      description: 'Dubai\'s tax-free structure maximizes your rental returns.',
    },
  ];

  const financialInfoCards = [
    {
      icon: highROIIcon,
      title: 'High Return on Investment',
      description: 'Dubai consistently delivers ROI between 8-12%.',
      accentColor: '#3CA8E2',
    },
    {
      icon: taxFreeIcon,
      title: 'Tax-Free Income',
      description: 'No property tax, rental income tax, or capital gains tax.',
      accentColor: '#345F4C',
    },
    {
      icon: paymentPlanIcon,
      title: 'Flexible Payment Plans',
      description: 'Developers offer 60/40, 70/30, and 15 monthly plans.',
      accentColor: '#D500F6',
    },
    {
      icon: stableCurrencyIcon,
      title: 'Stable Currency',
      description: 'AED pegged to USD ensures long-term stability.',
      accentColor: '#304FFF',
    },
    {
      icon: rentalDemandIcon,
      title: 'High Rental Demand',
      description: 'Growing population = year-round tenant demand.',
      accentColor: '#0091EA',
    },
  ];

  const financialUpsideCards = [
    {
      icon: openROIIcon,
      title: 'High Return on Investment',
      description: 'A global powerhouse for trade, business, and innovation, Dubai continues to expand rapidly with strong economic policies that attract investors and corporations worldwide.',
    },
    {
      icon: openHouseEconomyIcon,
      title: 'Global Connectivity',
      description: 'With access to over 240 destinations through Dubai International Airport and emerging hubs, Dubai offers unmatched global connectivity that fuels business and tourism.',
    },
  ];

  const livingCards = [
    {
      image: openhouseImg1,
      title: 'World-Class Infrastructure',
      description: 'Modern transport, smart roads, and advanced services power Dubai\'s growth.',
    },
    {
      image: openhouseImg2,
      title: 'Tourism Powerhouse',
      description: 'Over 15 million visitors annually create strong demand for short-term rentals.',
    },
  ];

  const expoPills = [
    { label: 'Smart City Evolution' },
    { label: 'Global Business Hub' },
    { label: 'Lifestyle & Connectivity' },
  ];

  return (
    <main className="min-h-screen bg-white">
      <Header />

      <HeroSection
        backgroundImage={why_dubai_icon}
        title="Why Invest in Dubai?"
        description="Dubai consistently ranks among the world's strongest real estate markets — offering unmatched returns, stability, and long-term growth for investors."
      />

      <DubaiGlanceSection cards={glanceCards} />

      <div className="px-4">
        <FinancialInfoCardsSection cards={financialInfoCards} />
      </div>

      <FinancialUpsideCardsSection cards={financialUpsideCards} />

      <WorldClassLivingSection cards={livingCards} />

      <UpcomingProjectsSection
        backgroundImage={openHouseTailImage}
        title="Upcoming Mega Projects"
        description="Dubai continuously launches innovative mega projects like Dubai Creek Harbour, Mohammed Bin Rashid City, and Dubai South. These developments promise high appreciation potential and new investment opportunities."
      />

      <ExpoSection
        backgroundImage={expoImage}
        title="Expo 2020 and Beyond"
        description="Explore the legacy of Expo 2020 and its lasting impact on Dubai's growth, innovation, and global connectivity. Discover how this landmark event has shaped the future of our city and the opportunities that lie ahead."
        pills={expoPills}
      />
    </main>
  );
}

export default WhyDubaiMobile;
