"use client";

import { useState } from "react";
import { GalleryTab } from "../types/types";

export function useGalleryHeader(
  defaultTab: GalleryTab = "images",
  onBack?: () => void
) {
  const [activeTab, setActiveTab] = useState<GalleryTab>(defaultTab);

  const selectTab = (tab: GalleryTab) => {
    setActiveTab(tab);
  };

  return {
    activeTab,
    selectTab,
    onBack,
  };
}
