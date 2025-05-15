// components/RoundIconButton.tsx
import React from 'react';

type Props = {
  icon: React.ReactNode;
  size?: number; // height & width in px
  onClick?: () => void;
  className?: string;
};

const RoundIconButton: React.FC<Props> = ({
  icon,
  size = 58,
  onClick,
  className = '',
}) => {
  return (
    <div className={className}>
      <div
        className="border border-[#DEDEDE] rounded-full flex justify-center items-center relative"
        style={{ height: size, width: size }}
        onClick={onClick}
      >
        {icon}
      </div>
    </div>
  );
};

export default RoundIconButton;
