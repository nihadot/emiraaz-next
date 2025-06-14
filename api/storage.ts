// Define a unique prefix for your project to avoid conflicts
const PROJECT_PREFIX = 'property_seller'; // Change this per project

export const LOCAL_STORAGE_KEYS = {
  ACCESS_TOKEN: `${PROJECT_PREFIX}_accessToken`,
  REFRESH_TOKEN: `${PROJECT_PREFIX}_refreshToken`,
  USER_DATA: `${PROJECT_PREFIX}_userData`,
  RESET_PASSWORD_TOKEN: `${PROJECT_PREFIX}_resetPasswordToken`,
  SIGNUP_OTP_TOKEN: `${PROJECT_PREFIX}_otpToken`,
  SIGNUP_TEM_DATA: `${PROJECT_PREFIX}_signupTemData`,
  FORGOT_PASSWORD: `${PROJECT_PREFIX}_forgotPassword`,
  FORGOT_PASSWORD_EMAIL: `${PROJECT_PREFIX}_forgotPasswordEmail`,
};

/**
 * Get item from localStorage with namespacing
 */
export const getStorageItem = (key: string): string | null => {
  return localStorage.getItem(key);
};

/**
 * Set item in localStorage with namespacing
 */
export const setStorageItem = (key: string, value: string) => {
  localStorage.setItem(key, value);
};

/**
 * Remove item from localStorage with namespacing
 */
export const removeStorageItem = (key: string) => {
  localStorage.removeItem(key);
};

/**
 * Clear all project-specific storage items
 */
export const clearProjectStorage = () => {
  Object.values(LOCAL_STORAGE_KEYS).forEach((key) => localStorage.removeItem(key));
};
