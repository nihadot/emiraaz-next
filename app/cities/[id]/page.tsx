import ProjectsUnderCity from '@/components/ProjectsUnderCity/ProjectsUnderCity'
import { getSiteMapData } from '@/utils/getSiteMapData';
import React, { } from 'react'

interface PageProps {
  params: Promise<{ id: string }>;
}



export default async function Page({ params }: PageProps) {
  const { id } = await params; // Await the params Promise
  const dataFetchRandomSiteMap = await getSiteMapData(); // fetches only once, then cached

  return <ProjectsUnderCity
    siteMap={dataFetchRandomSiteMap?.data}
    id={id} />;
}