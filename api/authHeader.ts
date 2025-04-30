
import { LOCAL_STORAGE_KEYS } from "./storage";


export const prepareAuthHeaders = (headers: Headers) => {
  const token = localStorage.getItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }
  return headers;
};
