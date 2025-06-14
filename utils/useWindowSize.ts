// import { useState, useEffect } from 'react';

// export function useWindowSize() {
//   const [windowSize, setWindowSize] = useState({
//     width: window.innerWidth,
//     height: window.innerHeight,
//   });

//   useEffect(() => {
//     function handleResize() {
//       setWindowSize({
//         width: window.innerWidth,
//         height: window.innerHeight,
//       });
//     }

//     window.addEventListener('resize', handleResize);

//     // Call handler right away so state gets updated with initial window size
//     handleResize();

//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   return windowSize;
// }


import { useState, useEffect } from 'react';

export function useWindowSize() {
  // Initialize state with undefined to avoid SSR issues
  const [windowSize, setWindowSize] = useState<{
    width: number;
    height: number;
  }>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    // Only run on client side
    if (typeof window !== 'undefined') {
      function handleResize() {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }

      window.addEventListener('resize', handleResize);

      // Call handler right away to set initial size
      handleResize();

      // Cleanup event listener on unmount
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []); // Empty dependency array ensures this runs once on mount

  return windowSize;
}