'use client';

import DonationHeroCard from './DonationHeroCard';
import DonationTotalCard from './DonationTotalCard';
import DonationFooterText from './DonationFooterText';

export default function DonationsMobile({
  content,
}: {
  content?: any;
}) {
  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-md py-8">
        <DonationHeroCard />
        <DonationTotalCard amount="200,000" />
        <DonationFooterText />
      </div>
    </main>
  );
}