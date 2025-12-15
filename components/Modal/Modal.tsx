import React, { useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (

    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 min-h-[100svh]"
      onClick={onClose}
    >
      <div
        // className="relative w-full max-w-[410px] min-h-[100svh] sm:min-h-0 sm:max-h-[600px] bg-white rounded-md"

        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}


        {children}
      </div>
    </div>

  );
};

export default Modal;
