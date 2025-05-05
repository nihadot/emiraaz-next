import { FC } from 'react';
import type { MediaProps } from './type';

const Video: FC<MediaProps> = ({ src, containerClasses, mediaClasses, ...restProps }) => {
  const videoRestProps = restProps as React.VideoHTMLAttributes<HTMLVideoElement>;
  return (
    <div className={containerClasses}>
      <video src={src} className={mediaClasses} {...videoRestProps} />
    </div>
  );
};

export default Video;
