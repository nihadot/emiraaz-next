'use client';

import { useState } from 'react';
import Tabs from './Tabs';
import HorizontalCarousel from './HorizontalCarousel';
import TalkCardVertical from './TalkCardVertical';
import { Talk } from './types';
const talks: Talk[] = [
  {
    id: '1',
    title: 'How to sell branded buildings in Dubai Downtown?',
    image:
      'https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&w=800&q=80',
    category: 'Real Estate',
    createdAt: '5 Days ago',
  },
  {
    id: '2',
    title: 'Luxury real estate investment strategies',
    image:
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80',
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
      <h2 className="text-lg font-semibold mt-4 mb-3">
        Explore Content
      </h2>

      {talks.map((talk) => (
        <TalkCardVertical key={talk.id} talk={talk} />
      ))}
    </main>
  );
}
