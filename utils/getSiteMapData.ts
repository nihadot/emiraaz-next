import { baseUrl } from "@/api";

// app/lib/cache.ts
let cachedData: any = null;

export async function getSiteMapData() {
  if (cachedData) return cachedData; // return cached copy
  const resFetchRandomSiteMap = await fetch(`${baseUrl}/site-index/random/urls?page=1&limit=80`, { cache: "no-store" });
  const dataFetchRandomSiteMap = await resFetchRandomSiteMap.json();

  return dataFetchRandomSiteMap;
}

export function refreshData() {
  cachedData = null; // manual refresh
}