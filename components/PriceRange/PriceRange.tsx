"use client";

import { usePriceRange } from "./logic/usePriceRange";
import PriceRangeUI from "./ui/PriceRangeUI";


export default function PriceRange() {
  const logic = usePriceRange();
  return <PriceRangeUI {...logic} />;
}
