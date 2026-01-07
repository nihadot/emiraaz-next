import { baseUrl } from '@/api';
import OpenHouse from '@/components/OpenHouse/OpenHouse';
import MobileOpenHouse from '@/components/OpenHouse/Mobile/OpenHouseMobile';
import ResponsiveSwitch from '@/components/Common/ResponsiveSwitch';
import { Metadata } from 'next';
import React from 'react';

// Enable ISR
export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  try {
    const responseData = await fetch(
      `${baseUrl}/meta-data?referencePage=open-house`,
      {
        next: { revalidate: 60 },
      }
    ).then((res) => res.json());

    const data = responseData?.data?.[0] || {};

    return {
      title: data.metaTitle || 'Property Seller - Trusted Off-Plan Real Estate Marketplace',
      description:
        data.metaDescription ||
        'Learn how Property Seller is transforming real estate with verified listings.',
      alternates: {
        canonical: data.canonical || 'https://www.propertyseller.com/open-house',
      },
    };
  } catch {
    return {
      title: 'Open House | Property Seller',
      description: 'Browse and book open house events',
    };
  }
}

export default function Page() {
  return (
    <ResponsiveSwitch
      mobile={<MobileOpenHouse />}
      desktop={<OpenHouse />}
    />
  );
}
