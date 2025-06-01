'use client';

import { close_icon, drop_down__red_icon, drop_up_red_icon } from '@/app/assets';
import Image from 'next/image';
import React, {
  useState,
  useRef,
  useEffect,
  ReactNode,
  useImperativeHandle,
  forwardRef,
} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import { FaCaretDown } from 'react-icons/fa';

export interface ExpandableComponentDropdownProps {
  label?: string;
  children: ReactNode;
  onClear?: () => void;
  isSelected?: boolean;
  customCloseControl?: ReactNode;
  isOpen?: boolean; // Optional controlled state
  onToggle?: (open: boolean) => void; // Callback on toggle
}

export interface ExpandableDropdownRef {
  close: () => void;
  open: () => void;
}

const ExpandableComponentDropdown = forwardRef<ExpandableDropdownRef, ExpandableComponentDropdownProps>(
  (
    {
      label = 'Select',
      children,
      onClear,
      isSelected = false,
      customCloseControl,
      isOpen: controlledIsOpen,
      onToggle,
    },
    ref
  ) => {
    const [internalOpen, setInternalOpen] = useState(false);
    const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalOpen;

    const containerRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = () => {
      const newState = !isOpen;
      if (controlledIsOpen === undefined) setInternalOpen(newState);
      onToggle?.(newState);
    };

    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        if (isOpen) {
          if (controlledIsOpen === undefined) setInternalOpen(false);
          onToggle?.(false);
        }
      }
    };

    const handleClear = (e: React.MouseEvent) => {
      e.stopPropagation();
      onClear?.();
    };

    useEffect(() => {
      document.addEventListener('mousedown', handleOutsideClick);
      return () => document.removeEventListener('mousedown', handleOutsideClick);
    }, [isOpen,handleOutsideClick]);

    // Imperative API: allow external open/close via ref
    useImperativeHandle(ref, () => ({
      close: () => {
        if (controlledIsOpen === undefined) setInternalOpen(false);
        onToggle?.(false);
      },
      open: () => {
        if (controlledIsOpen === undefined) setInternalOpen(true);
        onToggle?.(true);
      },
    }));

    return (
      <div
        ref={containerRef}
        onClick={toggleDropdown}
        className='py-3 rounded-[3px] px-3 gap-3 text-sm outline-[#DEDEDE] cursor-pointer outline h-full flex select-none relative'
      >
        <div className='flex w-full justify-between items-center'>
          <label className='text-[12px] font-poppins font-normal text-[#333333]'>{label}</label>

          <motion.div
            key={isOpen ? 'up' : 'down'}
            initial={{ rotate: 0, opacity: 0 }}
            animate={{ rotate: isOpen ? 180 : 0, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {!isSelected ? (
                      <FaCaretDown className='w-[20px] h-[20px]' color='#FF1645'/>
            
            ) : customCloseControl ? (
              <div onClick={handleClear}>{customCloseControl}</div>
            ) : (
              <div
                className='mr-1 text-xs text-red-500 underline cursor-pointer'
                onClick={handleClear}
              >
          <FaCaretDown className='w-[20px] h-[20px]' color='#FF1645'/>
              </div>
            )}
          </motion.div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className='absolute top-full left-0 mt-2 z-10 text-black'
              // className='absolute top-full -left-20 mt-2 z-10 text-black'

              onClick={(e) => e.stopPropagation()}
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

ExpandableComponentDropdown.displayName = 'ExpandableComponentDropdown';
export default ExpandableComponentDropdown;
