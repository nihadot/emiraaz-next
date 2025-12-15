export function useMobileHeaderLogic(sheet: any, location: string) {
  return {
    actions: {
      handleLocationClick: sheet.open,
      handleMenuClick: sheet.toggle,
    },
    location,
  };
}
