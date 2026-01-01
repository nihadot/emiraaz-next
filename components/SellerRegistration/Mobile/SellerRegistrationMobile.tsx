'use client';

import { useState } from 'react';
import SellIntroCard from './SellIntroCard';
import FeatureCards from './FeatureCards';
import SellingSimpleCard from './SellingSimpleCard';
import StartJourneyCard from './StartJourneyCard';
import SellerFormModal from './SellerFormModal';
import SellerSuccessModal from './SellerSuccessModal';

export default function SellerRegistrationMobile() {
  const [open, setOpen] = useState(false);
  

  return (
    <main className="min-h-screen bg-white px-4 pt-4 pb-24 space-y-6 font-poppins">
      <SellIntroCard />
      <FeatureCards />
<SellingSimpleCard
  title="We Make Selling Simple"
  points={[
    'Quick & Easy Listing',
    'Professional Property Evaluation',
    'High-Quality Photos & Marketing',
    'Maximum Buyer Reach',
    'Dedicated Selling Support',
    'Fast & Transparent Process',
  ]}
/>      <StartJourneyCard onRegister={() => setOpen(true)} />

      <SellerFormModal open={open} onClose={() => setOpen(false)} />
    </main>
  );
}
