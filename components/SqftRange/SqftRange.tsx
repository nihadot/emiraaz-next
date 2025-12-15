"use client";

import { useSqftRange } from "./logic/useSqftRange";
import SqftRangeUI from "./ui/SqftRangeUI";


export default function SqftRange({ maxSqft = 2000 }: { maxSqft?: number }) {
  const logic = useSqftRange(maxSqft);

  return <SqftRangeUI {...logic} />;
}
