"use client";

import { useState, useRef, useEffect } from "react";

export type OptionItem = {
  label: string;
  value: string;
};

export function useMenuItem(defaultOptions: OptionItem[]) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  const toggleOpen = () => setOpen((p) => !p);

  const selectOption = (value: string) => {
    setSelected(value);
    setOpen(false);
  };

  // close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return {
    open,
    selected,
    toggleOpen,
    selectOption,
    options: defaultOptions,
    ref,
  };
}
