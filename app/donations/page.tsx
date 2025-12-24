import { baseUrl } from '@/api';
import Header from '@/components/Header';
import MobileHeaderTitle from '@/components/atom/typography/MobileHeaderTitle';
import SectionDivider from '@/components/atom/SectionDivider/SectionDivider';
import { Footer } from '@/components/Footer';
import DonationsResponsive from '@/components/Donations/DonationsResponsive';
import { Metadata } from 'next';
import Script from 'next/script';
import clsx from 'clsx';

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const responseData = await fetch(
    `${baseUrl}/meta-data?referencePage=donations`,
    { next: { revalidate: 60 } }
  ).then(res => res.json());

  const data = responseData?.data?.[0] || {};

  return {
    title: data.metaTitle || 'Donations | PropertySeller',
    description: data.metaDescription,
    alternates: {
      canonical: data.canonical || 'https://www.propertyseller.com/donations',
    },
  };
}

export default async function Page() {
  const responseData = await fetch(
    `${baseUrl}/meta-data?referencePage=donations`,
    { next: { revalidate: 60 } }
  ).then(res => res.json());

  const scripts =
    responseData?.data?.[0]?.richSnippets?.match(
      /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi
    ) || [];

  return (
    <>
      {/* JSON-LD */}
      {scripts.map((script: string, index: number) => (
        <Script
          key={index}
          id={`json-ld-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: script.replace(/<\/?script[^>]*>/g, ''),
          }}
          strategy="afterInteractive"
        />
      ))}

      <main>
        <Header
          logoSection={
            <div className="h-full w-full flex justify-center items-center">
              <MobileHeaderTitle content="Donations" />
            </div>
          }
        />

        <SectionDivider
          containerClassName={clsx('my-3')}
          lineClassName="h-[1px] w-full bg-[#DEDEDE]"
        />

        {/* ✅ RESPONSIVE UI */}
        <DonationsResponsive />

        <Footer />
      </main>
    </>
  );
}
