'use client';

import Image from 'next/image';
import { ChevronDown, LogOut } from 'lucide-react';
import HeaderDropdown from './headerDropDown';

interface MenuItem {
  icon: string;
  label: string;
}

const menuItems: MenuItem[] = [
  { icon: '/more/profile.svg', label: 'Profile' },
  { icon: '/more/about.svg', label: 'About us' },
  { icon: '/more/saved.svg', label: 'Saved' },
  { icon: '/more/cities.svg', label: 'Cities' },
  { icon: '/more/whydubai.svg', label: 'Why Dubai' },
  { icon: '/more/developers.svg', label: 'Developers' },
  { icon: '/more/rentalincome.svg', label: 'Rental Income' },
  { icon: '/more/blog.svg', label: 'Blog' },
  { icon: '/more/news.svg', label: 'News' },
  { icon: '/more/freelancer.svg', label: 'Freelancer' },
  { icon: '/more/propertytalks.svg', label: 'Property Talks' },
  { icon: '/more/openhouse.svg', label: 'Open House' },
  { icon: '/more/careers.svg', label: 'Careers' },
  { icon: '/more/seller.svg', label: 'Seller' },
  { icon: '/more/featured.svg', label: 'Featured' },
  { icon: '/more/donation.svg', label: 'Donation' },
  { icon: '/more/quickenquiry.svg', label: 'Quick Enquiry' },
  { icon: '/more/verifyagent.svg', label: 'Verify Agent' },
  { icon: '/more/rent.svg', label: 'Rent' },
  { icon: '/more/furnish.svg', label: 'Furnish' },
  { icon: '/more/cleaning.svg', label: 'Cleaning' },
  { icon: '/more/interior.svg', label: 'Interior' },
  { icon: '/more/mortgage.svg', label: 'Mortgage' },
  { icon: '/more/valuation.svg', label: 'Valuation' },
  { icon: '/more/resale.svg', label: 'Resale' },
  { icon: '/more/transactions.svg', label: 'Transactions' },
  { icon: '/more/golden-visa.svg', label: 'Golden Visa' },
];

export default function MoreMenu() {
  return (
    <div className="min-h-screen bg-gray-50 p-4">

      {/* Header */}
<div className="bg-white rounded-2xl p-3 flex items-center justify-between shadow-sm mb-6">

  {/* Currency */}
  <HeaderDropdown
    label="AED"
    options={['AED', 'USD', 'EUR', 'INR']}
  />

  {/* Logout */}
  <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium">
    Logout <LogOut className="w-4 h-4" />
  </button>

  {/* Language */}
  <HeaderDropdown
    label="ENG"
    options={['ENG', 'AR', 'FR']}
  />

</div>


      {/* Menu Grid */}
      <div className="grid grid-cols-3 gap-4">
        {menuItems.map((item, index) => (
          <button
            key={index}
            className="bg-gray-100 rounded-2xl p-4 flex flex-col items-center gap-3 hover:bg-gray-200 transition"
          >
            {/* SVG already has background */}
            <Image
              src={item.icon}
              alt={item.label}
              width={56}
              height={56}
              className="object-contain"
            />

            <span className="text-sm font-medium text-gray-900 text-center leading-tight">
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
