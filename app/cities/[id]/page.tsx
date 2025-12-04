import { baseUrl } from '@/api';
import ProjectsUnderCity from '@/components/ProjectsUnderCity/ProjectsUnderCity'
import { getSiteMapData } from '@/utils/getSiteMapData';
import React, { } from 'react'

interface PageProps {
  params: Promise<{ id: string }>;
}



export default async function Page({ params }: PageProps) {
  const { id } = await params; // Await the params Promise
  const dataFetchRandomSiteMap = await getSiteMapData(); // fetches only once, then cached

    // ✅ Fetch counts data
    const resFetchVideoAds = await fetch(`${baseUrl}/projects/small-video-ads`, { cache: "no-store" });
    const dataFetchVideoAds = await resFetchVideoAds.json();




  return <ProjectsUnderCity
    videoAds={dataFetchVideoAds?.data}
    siteMap={dataFetchRandomSiteMap?.data}
    id={id} />;
}