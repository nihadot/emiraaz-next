'use client';

import HeroCard from './HeroCard';
import OfferList from './OfferList';
import WhoWeAreList from './WhoWeAreList';
import JoinCard from './JoinCard';
import CareerFormMobile from './ApplicationModal';

export default function CareerMobile() {
  return (
    <main className="px-4 pb-24">
      <HeroCard />
      <OfferList />
      <WhoWeAreList />
      <JoinCard />
    </main>
  );
}
