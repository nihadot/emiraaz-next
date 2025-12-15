'use client';

export function useMobileHeader(
  location: string,
  onMenuClick: () => void,
  onLocationClick: () => void
) {
  const actions = {
    handleMenuClick: onMenuClick,
    handleLocationClick: onLocationClick,
  };

  return { location, actions };
}
