'use client';

import { useState } from 'react';
import Tabs from './Tabs';
import HorizontalCarousel from './HorizontalCarousel';
import TalkCardVertical from './TalkCardVertical';
import { Talk } from './types';

/* SAME DATA SOURCE AS DESKTOP */
const talks: Talk[] = [
  {
    id: '1',
    title: 'How to sell branded buildings in Dubai Downtown?',
    image: '/images/property-talks/1.jpg',
    category: 'Real Estate',
    createdAt: '5 Days ago',
  },
  {
    id: '2',
    title: 'Luxury real estate investment strategies',
    image: '/images/property-talks/2.jpg',
    category: 'Real Estate',
    createdAt: '6 Days ago',
  },
];

export default function PropertyTalksMobile() {
  const [tab, setTab] = useState('For You');

  return (
    <main className="px-4 pt-2 pb-24">
      <Tabs active={tab} onChange={setTab} />

      {/* Horizontal Section */}
      <HorizontalCarousel talks={talks} />

      {/* Explore Content */}
      <h2 className="text-sm font-semibold mt-6 mb-3">
        Explore Content
      </h2>

      {talks.map((talk) => (
        <TalkCardVertical key={talk.id} talk={talk} />
      ))}
    </main>
  );
}
