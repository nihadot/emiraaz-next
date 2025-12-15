// hooks/useSegmentToggle.ts
'use client';

import { useState } from "react";

export function useSegmentToggle(defaultValue: string) {
  const [selected, setSelected] = useState(defaultValue);

  const toggle = (value: string) => {
    setSelected(value);
  };

  return {
    selected,
    toggle,
  };
}
