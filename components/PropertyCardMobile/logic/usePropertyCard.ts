"use client";

export type PropertyCardData = {
  id: string;
  title: string;
  type: string;
  location: string;
  beds: string;
  slug: string;
  area: number;
  price: number;
  discount?: number;
  image: string;
  isSaved?: boolean;
  totalFloors?: string;
  handleClick?: () => void;
};

export function usePropertyCard(data: PropertyCardData) {
  // const formattedPrice = new Intl.NumberFormat("en-AE").format(data.price);

  function formatPrice(price: number | string): string {
  if (typeof price === "string") {
    const p = price.trim();
    if (/[a-zA-Z]/.test(p)) return p; // 10M, 5L, etc.
    const num = Number(p.replace(/,/g, ""));
    if (!isNaN(num)) return new Intl.NumberFormat("en-AE").format(num);
    return p;
  }
  return new Intl.NumberFormat("en-AE").format(price);
}

  const formattedPrice = formatPrice(data.price);

  return {
    ...data,
    formattedPrice,
  };
}


