"use client";

import { useState } from "react";
import clsx from "clsx";

const tabs = ["For You", "Business", "Sports", "Politics" ,"Market"];

 function CategoryTabs() {
  const [active, setActive] = useState("For You");

  return (
    <div className="flex gap-2 overflow-x-auto no-scrollbar font-poppins">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActive(tab)}
          className={clsx(
            "px-4 py-1 rounded-sm text-sm font-medium whitespace-nowrap transition",
            active === tab
              ? "bg-black text-white"
              : "bg-white text-gray-600 border border-gray-300"
          )}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
export default CategoryTabs;