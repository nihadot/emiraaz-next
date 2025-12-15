// components/HandoverSelector/logic/useHandoverSelector.ts
"use client";

import { useState } from "react";

export function useHandoverSelector(
  defaultYear: number = new Date().getFullYear(),
  defaultQuarter: string | null = null
) {
  const [year, setYear] = useState(defaultYear);
  const [quarter, setQuarter] = useState<string | null>(defaultQuarter);

  const nextYear = () => setYear((y) => y + 1);
  const prevYear = () => setYear((y) => y - 1);

  const selectQuarter = (q: string) => {
    setQuarter((prev) => (prev === q ? null : q));
  };

  return {
    year,
    quarter,
    nextYear,
    prevYear,
    selectQuarter,
  };
}
