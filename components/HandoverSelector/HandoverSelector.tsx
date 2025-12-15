// components/HandoverSelector/HandoverSelector.tsx
"use client";

import HandoverSelectorUI from "./ui/HandoverSelectorUI";
import { useHandoverSelector } from "./logic/useHandoverSelector";

export default function HandoverSelector({
  defaultYear = 2024,
  defaultQuarter = null,
  onChange,
}: {
  defaultYear?: number;
  defaultQuarter?: string | null;
  onChange?: (year: number, quarter: string | null) => void;
}) {
  const { year, quarter, nextYear, prevYear, selectQuarter } =
    useHandoverSelector(defaultYear, defaultQuarter);

  const handleQuarterSelect = (q: string) => {
    selectQuarter(q);
    onChange?.(year, q === quarter ? null : q);
  };

  return (
    <HandoverSelectorUI
      year={year}
      quarter={quarter}
      onPrevYear={() => {
        prevYear();
        onChange?.(year - 1, quarter);
      }}
      onNextYear={() => {
        nextYear();
        onChange?.(year + 1, quarter);
      }}
      onSelectQuarter={handleQuarterSelect}
    />
  );
}
