// useAmenities.ts
"use client";

export interface Amenity {
  id: string;
  label: string;
  link: string;
}

export function useAmenities(initial: Amenity[]) {
  const amenities = initial;


  return {
    amenities,
  };
}
