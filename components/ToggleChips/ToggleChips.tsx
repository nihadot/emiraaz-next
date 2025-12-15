// components/ToggleChips/ToggleChips.tsx
'use client';

import ToggleChipsUI from "./ui/ToggleChipsUI";
import { useToggleChips } from "./logic/useToggleChips";

export default function ToggleChips({
  chips,
  defaultValue = null,
  onChange,
}: {
  chips: { label: string; value: string }[];
  defaultValue?: string | null;
  onChange?: (value: string | null) => void;
}) {
  const { selected, toggle } = useToggleChips(defaultValue);

  const handleSelect = (value: string) => {
    const newVal = selected === value ? null : value;
    toggle(value);
    onChange?.(newVal);
  };

  return (
    <ToggleChipsUI
      chips={chips}
      selected={selected}
      onSelect={handleSelect}
    />
  );
}
