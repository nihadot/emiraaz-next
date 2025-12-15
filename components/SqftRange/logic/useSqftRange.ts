"use client";

import { setSqftRange } from "@/redux/filters/filterSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";

function formatNumber(value: number) {
  return value.toLocaleString("en-IN");
}

function parseInput(val: string) {
  return parseInt(val.replace(/,/g, "")) || 0;
}

export function useSqftRange(maxSqft: number) {
  const dispatch = useDispatch()


  const [range, setRange] = useState<[number, number]>([0, maxSqft]);
  const [minText, setMinText] = useState("0");
  const [maxText, setMaxText] = useState(formatNumber(maxSqft));

  const onSliderChange = (v: [number, number]) => {
    setRange(v);
    setMinText(formatNumber(v[0]));
    setMaxText(formatNumber(v[1]));

    dispatch(setSqftRange({ min: v[0], max: v[1] }))
  };

  const onBlurMin = () => {
    let val = parseInput(minText);
    val = Math.max(0, Math.min(val, range[1]));
    setRange([val, range[1]]);
    setMinText(formatNumber(val));
  };

  const onBlurMax = () => {
    let val = parseInput(maxText);
    val = Math.min(maxSqft, Math.max(val, range[0]));
    setRange([range[0], val]);
    setMaxText(formatNumber(val));
  };

  return {
    MIN_VALUE: 0,
    MAX_VALUE: maxSqft,
    range,
    minText,
    maxText,
    setMinText,
    setMaxText,
    onSliderChange,
    onBlurMin,
    onBlurMax,
    formatLabel: formatNumber,
  };
}
