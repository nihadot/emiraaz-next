import Image from "next/image";
import { camera_icon } from "@/app/assets";
import { FaImage } from "react-icons/fa";
import clsx from "clsx";

interface ImageBlockProps {
  src: string;
  alt: string;
  showOverlay?: boolean;
  onClick?: () => void;
  wrapperClassName?: string;
  imageCount?:number;
}

const ImageBlock = ({ imageCount = 20,src = '', alt,wrapperClassName, showOverlay = false, onClick }: ImageBlockProps) => (
  <div
    className={clsx("h-[136.5px] rounded-md w-full relative cursor-pointer", wrapperClassName)}
    onClick={onClick}
  >
   { src &&  <Image src={src} alt={alt} fill className="object-cover rounded-md" />}
    {showOverlay && (
      <div className="absolute w-[60px] flex bottom-[7.5px] h-[24.75px] right-[7.5px] items-center gap-2 p-2 rounded-[3.75px] z-40 bg-black/[77%]">
               <FaImage size={17.25} color="white" />
               <span className="text-white font-poppins text-[12px] font-normal">{imageCount}</span>
             </div>
    )}
  </div>
);

export default ImageBlock;
