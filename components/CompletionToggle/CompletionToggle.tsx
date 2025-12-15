// components/CompletionToggle/CompletionToggle.tsx
"use client";

import CompletionToggleUI from "./ui/CompletionToggleUI";
import { useCompletionToggle } from "./logic/useCompletionToggle";

export default function CompletionToggle({
  title,
  options,
  defaultValue = null,
  onChange,
}: {
  title?: string;
  options: { label: string; value: string }[];
  defaultValue?: string | null;
  onChange?: (v: string | null) => void;
}) {
  const { selected, toggle } = useCompletionToggle(defaultValue);

  const handleSelect = (value: string) => {
    const newVal = selected === value ? null : value;
    toggle(value);
    onChange?.(newVal);
  };

  return (
    <CompletionToggleUI
      title={title}
      options={options}
      selected={selected}
      onSelect={handleSelect}
    />
  );
}
