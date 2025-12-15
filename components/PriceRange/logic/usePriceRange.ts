"use client";

import { setPriceRange } from "@/redux/filters/filterSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";

const MIN_VALUE = 100000;
const MAX_VALUE = 100000000;

function formatLabel(value: number) {
  if (value >= 10000000) return (value / 1000000).toFixed(0) + "M";
  if (value >= 100000) return (value / 100000).toFixed(0) + "L";
  return value.toLocaleString("en-IN");
}

function parseInput(val: string) {
  const v = val.replace(/,/g, "").toUpperCase().trim();
  if (v.endsWith("L")) return parseInt(v) * 100000;
  if (v.endsWith("M")) return parseInt(v) * 1000000;
  return parseInt(v) || 0;
}

export function usePriceRange() {
  const [range, setRange] = useState<[number, number]>([MIN_VALUE, 10000000]);
  const [minText, setMinText] = useState("1L");
  const [maxText, setMaxText] = useState("10M");

  const dispatch = useDispatch()

  const onSliderChange = (v: [number, number]) => {
    setRange(v);
    setMinText(formatLabel(v[0]));
    setMaxText(formatLabel(v[1]));

    dispatch(setPriceRange({ min: v[0], max: v[1] }))
  };

  const onBlurMin = () => {
    let val = parseInput(minText);
    val = Math.max(MIN_VALUE, Math.min(val, range[1]));
    setRange([val, range[1]]);
    setMinText(formatLabel(val));
  };

  const onBlurMax = () => {
    let val = parseInput(maxText);
    val = Math.min(MAX_VALUE, Math.max(val, range[0]));
    setRange([range[0], val]);
    setMaxText(formatLabel(val));
  };

  return {
    MIN_VALUE,
    MAX_VALUE,
    range,
    minText,
    maxText,
    setMinText,
    setMaxText,
    onSliderChange,
    onBlurMin,
    onBlurMax,
    formatLabel,
  };
}
