'use client';

import DeveloperCard from './DeveloperCard';
import { AllDevelopersItems } from '@/redux/developers/types';

interface DeveloperListProps {
  developers: AllDevelopersItems[];
}

export default function DeveloperList({ developers }: DeveloperListProps) {
  if (!developers?.length) {
    return (
      <p className="text-center text-sm text-gray-500 mt-10">
        No developers found
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {developers.map((item) => (
        <DeveloperCard
          key={item._id}
          name={item.name}
          logo={item?.image?.webp?.url || ''}
          slug={item.slug}
        />
      ))}
    </div>
  );
}
