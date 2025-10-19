import SavedWishlist from '@/components/SavedWishlist/SavedWishlist'
import { getSiteMapData } from '@/utils/getSiteMapData';
import React from 'react'

async function page() {

  const dataFetchRandomSiteMap = await getSiteMapData(); // fetches only once, then cached

  return (
    <SavedWishlist 
    siteMap={dataFetchRandomSiteMap?.data}
    />
  )
}

export default page