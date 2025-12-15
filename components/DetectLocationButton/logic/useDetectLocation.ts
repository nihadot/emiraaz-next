'use client';

export function useDetectLocation(onDetect: () => void) {
  const actions = {
    handleDetect: onDetect,
  };

  return { actions };
}
