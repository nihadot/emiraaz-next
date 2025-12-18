'use client';

import { motion } from 'framer-motion';
import LocationTargetIcon from '../icons/LocationTargetIcon';
import { useDetectLocation } from '../logic/useDetectLocation';
import { MdMyLocation } from 'react-icons/md';

type Props = {
  onDetect: () => void;
};

export default function DetectLocationButton({ onDetect }: Props) {
  const { actions } = useDetectLocation(onDetect);

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={actions.handleDetect}
      className="
        w-full flex items-center justify-center gap-3
        bg-white border border-[#DEDEDE] 
        rounded-xl py-2.5
      "
    >
      <MdMyLocation
      size={24}
      />
      <span className="font-poppins text-[#767676] text-sm font-normal">
        Detect Current Location
      </span>
    </motion.button>
  );
}
