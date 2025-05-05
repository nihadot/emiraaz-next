import { AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";
import { LOCAL_STORAGE_KEYS } from "./storage";
import { refreshAuthToken } from "./auth";

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

export const attachInterceptors = (apiClient: AxiosInstance) => {
  // Request Interceptor
  apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = localStorage.getItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
      if (token) {
        config.headers.set("Authorization", `Bearer ${token}`);
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Response Interceptor
  apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config as CustomAxiosRequestConfig;

      const isTokenError =
        (error.response?.status === 401 || error.response?.status === 403) &&
        !originalRequest._retry;

      if (isTokenError) {
        originalRequest._retry = true;

        try {
          const refreshResponse: RefreshTokenApiResponse = await refreshAuthToken();

          if (refreshResponse.success) {
            // Save new token
            localStorage.setItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN, refreshResponse.token);

            // Set the new token for the original request
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${refreshResponse.token}`;
            }

            // Retry the original request
            return apiClient(originalRequest);
          }
        } catch (refreshError) {
          // Optional: clear token or redirect to login
          localStorage.removeItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
  );
};




interface RefreshTokenApiResponse {
  success: boolean;
  token: string;
  message?: string;
}
