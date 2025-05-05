import axios from "axios";
import { baseUrl } from ".";

export const refreshAuthToken = async (): Promise<RefreshTokenApiResponse> => {
  try {
    const response = await axios.get<RefreshTokenApiResponse>(
      `${baseUrl}/auth/user/refresh-token`,
      { withCredentials: true }
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
