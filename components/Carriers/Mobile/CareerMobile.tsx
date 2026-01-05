"use client";

import HeroCard from "./HeroCard";
import OfferList from "./OfferList";
import WhoWeAreList from "./WhoWeAreList";
import JoinCard from "./JoinCard";
import { useState } from "react";

export default function CareerMobile() {
  return (
    <main className="px-4 pb-24 font-poppins">
      <HeroCard />
      <OfferList />
      <WhoWeAreList />
      <JoinCard />
    </main>
  );
}
