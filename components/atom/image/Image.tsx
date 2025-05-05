import { FC } from 'react';
import { MediaProps } from './type';
import NextImage from 'next/image'; // Renaming the import to avoid conflict

// Ensure MediaProps includes the correct types for image props
const CustomImage: FC<MediaProps> = ({
  src,
  alt,
  containerClasses,
  mediaClasses,
  ...restProps
}) => {
  const imageRestProps = restProps as React.ImgHTMLAttributes<HTMLImageElement>;
    
  return (
    <div className={containerClasses}>
      <NextImage 
        src={src} 
        alt={alt} 
        className={mediaClasses} 
        {...imageRestProps} 
      />
    </div>
  );
};

export default CustomImage;
