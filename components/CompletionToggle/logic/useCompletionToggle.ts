// components/CompletionToggle/logic/useCompletionToggle.ts
"use client";

import { useState } from "react";

export function useCompletionToggle(defaultValue: string | null = null) {
  const [selected, setSelected] = useState<string | null>(defaultValue);

  const toggle = (value: string) => {
    setSelected(prev => (prev === value ? null : value));
  };

  return {
    selected,
    toggle,
  };
}
