export function getOrCreateDeviceId(): string {
  // Helper: read cookie
  const getCookie = (name: string): string | null => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()!.split(';').shift() || null;
    return null;
  };

  // Helper: set cookie (1 year)
  const setCookie = (name: string, value: string): void => {
    document.cookie = `${name}=${value}; max-age=31536000; path=/; SameSite=Strict; Secure`;
  };

  // Helper: create UUID
  const createUUID = (): string => {
    if (crypto.randomUUID) return crypto.randomUUID();
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  };

  let deviceId: string | null =
    localStorage.getItem("deviceId") || getCookie("deviceId");

  if (!deviceId) {
    deviceId = createUUID();
    localStorage.setItem("deviceId", deviceId);
    setCookie("deviceId", deviceId);
  } else {
    // Sync missing storage
    if (!localStorage.getItem("deviceId")) localStorage.setItem("deviceId", deviceId);
    if (!getCookie("deviceId")) setCookie("deviceId", deviceId);
  }

  return deviceId;
}
