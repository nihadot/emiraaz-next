'use client';

import { useState } from 'react';

export function useSelectableList<T extends { value: string }>(items: T[]) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const actions = {
    toggle: (value: string) => {
      setSelectedId(prev => (prev === value ? null : value));
    }
  };

  const sortedItems = selectedId
    ? [
        items.find(i => i.value === selectedId)!,
        ...items.filter(i => i.value !== selectedId),
      ]
    : items;

  return { selectedId, sortedItems, actions };
}
