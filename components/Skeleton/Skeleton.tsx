import React from 'react';
import clsx from 'clsx';

interface SkeletonProps {
  width?: string;
  height?: string;
  rounded?: string;
  className?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({
  height = 'h-4',
  rounded = 'rounded-md',
  className = '',
}) => {
  return (
    <div
      className={clsx(
        'bg-gray-200 animate-pulse',
        height,
        rounded,
        className
      )}
    />
  );
};

export default Skeleton;
