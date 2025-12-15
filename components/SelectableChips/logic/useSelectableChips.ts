'use client';

import { useState } from 'react';

export function useSelectableChips(defaultValue: string | null = null) {
  const [selected, setSelected] = useState<string | null>(defaultValue);

  const actions = {
    toggleSelect: (value: string) => {
      setSelected(prev => (prev === value ? null : value));
    },
  };

  return { selected, actions };
}
