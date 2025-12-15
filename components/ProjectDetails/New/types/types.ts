export type GalleryTab = "images" | "map" | "video" | "description-english" | "description-arabic";

export interface GalleryTabItem {
  id: GalleryTab;
  label: string;
  icon?: React.ReactNode;
  count?: number;
}
