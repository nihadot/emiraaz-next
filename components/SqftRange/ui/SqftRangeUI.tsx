"use client";

import Subtitle from "@/components/atom/Subtitle/Subtitle";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

export default function SqftRangeUI({
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
  formatLabel
}: any) {
  return (
    <div className="w-full">

                    <Subtitle text="Price Range (AED)" />

      <div className="flex justify-between text-sm mb-2 mt-3">
        <span>{formatLabel(MIN_VALUE)}</span>
        <span>{formatLabel(MAX_VALUE)} sqft</span>
      </div>

      <Slider
        range
        min={MIN_VALUE}
        max={MAX_VALUE}
        value={range}
        onChange={onSliderChange}
        allowCross={false}
        pushable={1}
        step={10}
        styles={{
          track: { backgroundColor: "black", height: 3 },
          rail: { backgroundColor: "#ddd", height: 3 },
          handle: {
            width: 24,
            height: 24,
            marginTop: -10,
            borderColor: "#000",
            backgroundColor: "#fff"
          }
        }}
      />

      <div className="flex justify-between mt-4 gap-4">
        <div className="flex-1">
          <label className="text-sm">Min</label>
          <input
            value={minText}
            onChange={(e) => setMinText(e.target.value)}
            onBlur={onBlurMin}
            className="w-full text-sm font-poppins border border-gray-300 rounded-[10px] px-4 py-2 text-center"
          />
        </div>

        <div className="flex-1">
          <label className="text-sm">Max</label>
          <input
            value={maxText}
            onChange={(e) => setMaxText(e.target.value)}
            onBlur={onBlurMax}
            className="w-full text-sm font-poppins border border-gray-300 rounded-[10px] px-4 py-2 text-center"
          />
        </div>
      </div>

    </div>
  );
}
