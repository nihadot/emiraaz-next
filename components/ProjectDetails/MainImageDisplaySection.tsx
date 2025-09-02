import { ImageType } from "@/utils/types";
import MainImageDisplay from "./MainImageDisplay";

interface MainImageDisplaySectionProps {
  images: ImageType[];
  selectedIndex: number;
  onSelectImage: (index: number) => void;
  onClick?: () => void;
}

export default function MainImageDisplaySection({ images, selectedIndex, onSelectImage, onClick }:MainImageDisplaySectionProps) {
  const mainImage = images?.[selectedIndex]?.webp?.url || "/no-image.jpg";

  return (
    <div onClick={onClick}>
      <MainImageDisplay
        mainImage={mainImage}
        // images={images}
        selectedIndex={selectedIndex}
        onSelectImage={onSelectImage}
      />
    </div>
  );
}
