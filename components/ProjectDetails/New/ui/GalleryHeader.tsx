"use client";

import { useGalleryHeader } from "../logic/useGalleryHeader";
import { GalleryTab, GalleryTabItem } from "../types/types";
import GalleryHeaderUI from "./GalleryHeaderUI";

interface Props {
  tabs: GalleryTabItem[];
  defaultTab?: GalleryTab;
  onBack?: () => void;
  onChange?: (tab: GalleryTab) => void;
}

export default function GalleryHeader({
  tabs,
  defaultTab = "images",
  onBack,
  onChange,
}: Props) {
  const { activeTab, selectTab } = useGalleryHeader(defaultTab, onBack);

  const handleTabClick = (tab: GalleryTab) => {
    selectTab(tab);
    onChange?.(tab);
  };

  return (
    <GalleryHeaderUI
      tabs={tabs}
      activeTab={activeTab}
      onTabClick={handleTabClick}
      onBack={onBack}
    />
  );
}
