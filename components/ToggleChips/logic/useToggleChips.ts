// components/ToggleChips/logic/useToggleChips.ts
'use client';

import { useState } from "react";

export function useToggleChips(defaultValue: string | null = null) {
  const [selected, setSelected] = useState<string | null>(defaultValue);

  const toggle = (value: string) => {
    setSelected(prev => (prev === value ? null : value));
  };

  return {
    selected,
    toggle,
  };
}
