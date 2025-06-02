// // hooks/useScrollRestoration.ts
// import { useEffect } from 'react';

import { useEffect } from "react";

// export function useScrollRestoration(key: string = 'scroll-position') {
//   // Save scroll position before leaving the page
//   useEffect(() => {
//     const handleBeforeUnload = () => {
//       sessionStorage.setItem(key, window.scrollY.toString());
//     };

//     window.addEventListener('beforeunload', handleBeforeUnload);
//     window.addEventListener('popstate', handleBeforeUnload); // for SPA back button

//     return () => {
//       window.removeEventListener('beforeunload', handleBeforeUnload);
//       window.removeEventListener('popstate', handleBeforeUnload);
//     };
//   }, [key]);

//   // Restore scroll position when component mounts
//   useEffect(() => {
//     const savedY = sessionStorage.getItem(key);
//     if (savedY) {
//       window.scrollTo({ top: parseInt(savedY), behavior: 'auto' });
//     }
//   }, [key]);
// }



export function useForceScrollRestore(key: string = 'scroll-position') {
  // Restore scroll when page loads
  useEffect(() => {
    const saved = sessionStorage.getItem(key);
    if (saved) {
      const y = parseInt(saved);
      // Wait for the page to render before scrolling
      setTimeout(() => {
        window.scrollTo({ top: y, behavior: 'auto' });
      }, 0);
    }
  }, [key]);
}