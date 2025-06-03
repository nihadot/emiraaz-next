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



export function useScrollToTopOnRefresh() {
  useEffect(() => {
    // Ensure browser doesn't restore scroll automatically
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    // Detect if page load is from a reload (F5, Cmd+R, Ctrl+R)
    const navEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    const isReload = navEntry?.type === 'reload';

    if (isReload) {
      // Wait until DOM is ready before scrolling
      const scrollToTop = () => {
        requestAnimationFrame(() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        });
      };

      // In case rendering delays, ensure we scroll after full load
      if (document.readyState === 'complete') {
        scrollToTop();
      } else {
        window.addEventListener('load', scrollToTop);
        return () => window.removeEventListener('load', scrollToTop);
      }
    }
  }, []);
}