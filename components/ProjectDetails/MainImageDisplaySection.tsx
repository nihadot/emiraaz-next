import MainImageDisplay from "./MainImageDisplay";

interface MainImageDisplaySectionProps {
  images: { secure_url: string }[];
  selectedIndex: number;
  onSelectImage: (index: number) => void;
  onClick?: () => void;
}

export default function MainImageDisplaySection({ images, selectedIndex, onSelectImage, onClick }:MainImageDisplaySectionProps) {
  const mainImage = images?.[selectedIndex]?.secure_url || "/no-image.jpg";

  return (
    <div onClick={onClick}>
      <MainImageDisplay
        mainImage={mainImage}
        images={images}
        selectedIndex={selectedIndex}
        onSelectImage={onSelectImage}
      />
    </div>
  );
}
