import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';


function ViewPreviewVideo() {
  const [isZoomed, setIsZoomed] = useState(false);

  const handleZoomToggle = () => {
    setIsZoomed(prev => !prev);
  };

  return (
    <div className="relative">
      <AnimatePresence>
        {isZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 bg-black z-10"
          />
        )}
        <motion.div
          initial={{ scale: 1 }}
          animate={{ 
            scale: isZoomed ? 1.5 : 1,
            width: isZoomed ? '100%' : '50%',
            maxWidth: isZoomed ? '1200px' : '100%',
            maxHeight: isZoomed ? '400px' : 'auto',
            zIndex: 20
          }}
          exit={{ scale: 1 }}
          transition={{ duration: 0.4 }}
          className="relative"
        >
          <h2 className='text-white'>White</h2>
          <div className='w-full h-[250px] bg-gray-50 border rounded border-slate-50'>
            ViewPreviewVideo
          </div>
        </motion.div>
      </AnimatePresence>

      <button
        className='mt-4 px-4 py-2 bg-blue-600 text-white rounded'
        onClick={handleZoomToggle}
      >
        {isZoomed ? 'Zoom Out' : 'Click Zooming'}
      </button>
    </div>
  );
}

export default ViewPreviewVideo;