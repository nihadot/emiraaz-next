// ActionTabs.tsx
'use client';

import { ReactNode } from 'react';
import clsx from 'clsx';

type Tab = {
  label: string;
  icon: ReactNode;
  onClick?: () => void;
};

interface Props {
  tabs: Tab[];
}

export default function ActionTabs({ tabs }: Props) {
  return (
    <div className="flex gap-3 w-full">
      {tabs.map((tab, i) => (
        <button
          key={i}
          onClick={tab.onClick}
          className={clsx(
            'flex items-center justify-center gap-2 flex-1',
            'rounded-lg border border-[#DFDFDF] h-10',
            'text-gray-800 font-normal font-poppins text-sm',
            'hover:bg-gray-50 transition'
          )}
        >
          {tab.icon}
          <span>{tab.label}</span>
        </button>
      ))}
    </div>
  )
}
