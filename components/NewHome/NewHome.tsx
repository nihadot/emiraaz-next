import React from 'react'
import HomePageContent from '../Home/HomePageContent'
import Header from '../Header';
import MobileHeader from '../Home/MobileHeader/MobileHeader';
import { HomePageProps } from './types';


export default function NewHome({
    emiratesData,
    videoAds,
    initialCities,
    allCounts,
    initialData,
    portraitBanners,
    content,
    siteMap,
    initialValues,
}: HomePageProps) {


    return (
        <main>
            <HomePageContent content={content} display={true} />
            <div className="min-h-screen w-full lg:overflow-visible font-(family-name:--font-geist-sans)">
                {/* Desktop */}
                <div className="hidden md:flex">
                    <Header
                    />
                </div>

                {/* Mobile Header */}
                {/* <div className="flex md:hidden">
                    <MobileHeader
                        location='Dubai,Sharja'
                    />
                </div> */}

            </div>
        </main>
    )
}