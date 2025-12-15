"use client";

import { setPropertyType } from "@/redux/filters/filterSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";

export type PropertyTypeOption = {
  label: string;
  value: string;
};

export function usePropertyType(defaultValue: PropertyTypeOption | null = null) {
  const [selected, setSelected] = useState<PropertyTypeOption | null>(defaultValue);
  const dispatch = useDispatch();

  const selectType = (type: PropertyTypeOption) => {
    console.log(type, 'type')
    console.log(selected,'selected')
    const isSame = selected?.value === type.value;

    const next = isSame ? null : type;
    setSelected(next);
    dispatch(setPropertyType(type?.value)); // allow null in reducer
  };

  return {
    selected,
    selectType,
  };
}
