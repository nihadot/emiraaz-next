import EnquiredProperties from '@/components/EnquiredProperties/EnquiredProperties'
import { getSiteMapData } from '@/utils/getSiteMapData';
import React from 'react'

async function page() {

      const dataFetchRandomSiteMap = await getSiteMapData(); // fetches only once, then cached
  
  return (
   <EnquiredProperties
        siteMap={dataFetchRandomSiteMap?.data}
   
   />
  )
}

export default page