import Image from "next/image";
import { camera_icon } from "@/app/assets";

interface ImageBlockProps {
  src: string;
  alt: string;
  showOverlay?: boolean;
  onClick?: () => void;
}

const ImageBlock = ({ src = '', alt, showOverlay = false, onClick }: ImageBlockProps) => (
  <div
    className="h-[200px] rounded-md w-full relative cursor-pointer"
    onClick={onClick}
  >
   { src &&  <Image src={src} alt={alt} fill className="object-cover rounded-md" />}
    {showOverlay && (
      <div className="absolute flex bottom-2 right-2 items-center gap-2 p-2 rounded-md z-40 bg-black/80">
        <Image width={18} height={18} src={camera_icon} alt="camera icon" />
        <span className="text-white text-sm">10</span>
      </div>
    )}
  </div>
);

export default ImageBlock;
