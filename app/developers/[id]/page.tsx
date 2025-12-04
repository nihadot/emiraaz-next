import { baseUrl } from '@/api';
import ProjectsUnderDeveloper from '@/components/ProjectsUnderDeveloper/ProjectsUnderDeveloper';
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



  return <ProjectsUnderDeveloper
    siteMap={dataFetchRandomSiteMap?.data}
    videoAds={dataFetchVideoAds?.data}

    id={id} />;
}