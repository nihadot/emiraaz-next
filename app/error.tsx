// app/error.tsx
'use client';

import { useEffect } from 'react';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    // You can log the error to an error reporting service
    console.error('Error caught by custom error page:', error);
  }, [error]);

  return (
    <div className="h-screen flex flex-col items-center justify-center text-center p-4">
      <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
      <p className="mb-4">{error.message}</p>
      <button
        onClick={() => reset()}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-[#FF1645]"
      >
        Try again
      </button>
    </div>
  );
}
