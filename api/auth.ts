import axios from "axios";
import { baseUrl } from ".";
import { LOCAL_STORAGE_KEYS } from "./storage";

export const refreshAuthToken = async (): Promise<RefreshTokenApiResponse> => {
  try {
    const response = await axios.get<RefreshTokenApiResponse>(
      `${baseUrl}/auth/user/refresh-token`,
      { withCredentials: true,headers:{
        'Authorization': `Bearer ${localStorage.getItem(LOCAL_STORAGE_KEYS.REFRESH_TOKEN)}`,
      } }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || error?.message || 'Error refreshing token');
  }
};


interface RefreshTokenApiResponse {
  success: boolean;
  token: string;
  message?: string;
}
