'use client';

import clsx from 'clsx';
import { useRouter, usePathname } from 'next/navigation';

export default function AuthTabs() {
  const router = useRouter();
  const pathname = usePathname();

  // Define your tabs with their corresponding paths
  const tabs = [
    { id: 'signup', label: 'Signup', path: '/registration' },
    { id: 'login', label: 'Login', path: '/login' },
  ];

  return (
    <div className="flex bg-gray-100 rounded-full p-1 mb-10">
      {tabs.map((tab) => {
        // Check if the current pathname matches the tab's path
        const isActive = pathname === tab.path;

        return (
          <button
            key={tab.id}
            onClick={() => router.push(tab.path)}
            className={clsx(
              'flex-1 py-2 rounded-full text-sm font-medium transition',
              isActive
                ? 'bg-gray-600 text-white'
                : 'text-gray-500 hover:text-gray-700'
            )}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}