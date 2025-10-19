import { baseUrl } from "@/api";

let cachedPortraitBanners: any = null; // module-level cache

export async function getPortraitBanners() {
  if (cachedPortraitBanners) return cachedPortraitBanners;

  const res = await fetch(`${baseUrl}/banners`, { cache: "no-store" });
  const data = await res.json();

  cachedPortraitBanners = data;
  return data;
}