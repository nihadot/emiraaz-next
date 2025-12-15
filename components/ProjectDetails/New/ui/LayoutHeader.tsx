"use client";

import { useGalleryHeader } from "../logic/useGalleryHeader";
import { GalleryTab, GalleryTabItem } from "../types/types";
import LayoutHeaderUI from "./LayoutHeaderUI";

interface Props {
  title: string;
  onBack?: () => void;

}

export default function LayoutHeader({
  title,
  onBack,
}: Props) {

  return (
    <LayoutHeaderUI
      title={title}
      onBack={onBack}
    />
  );
}
