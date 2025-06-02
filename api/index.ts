// import { LOCAL_STORAGE_KEYS } from "../utils/storage";
import { LOCAL_STORAGE_KEYS } from "./storage";
import { logoutStart, logoutSuccess } from "@/redux/userSlice/userSlice";
// import { logoutStart, logoutSuccess } from "../features/adminSlice/adminSlice";

export const baseUrl = `https://api.propertyseller.com/api/v1`
// export const baseUrl = `http://localhost:4000/api/v1`
// export const baseUrl = `https://ai-updations-api.onrender.com/api/v1`
export const placeHolderLink = 'https://placehold.co/300x468'

export const CLOUDINARY_PERSISTENT = 'demo_purpose';
export const CLOUDINARY_NAME = 'dknxmloqh';

export const createBaseQueryWithReAuth = (
    baseQuery: any,
    refreshTokenBaseQuery: any
  ) => {
    return async (args: any, api: any, extraOptions: any) => {
      let result = await baseQuery(args, api, extraOptions);
  
      if (result.error?.status === 401 || result.error?.status === 403) {
        const refreshResult: any = await refreshTokenBaseQuery(
          {
            url: "refresh-token",
            method: "POST",
          },
          api,
          extraOptions
        );
  
        if (refreshResult.data) {
            localStorage.setItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN,refreshResult?.data?.token);
          result = await baseQuery(args, api, extraOptions);

        } else {

            localStorage.removeItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
            api.dispatch(logoutStart());
            api.dispatch(logoutSuccess());

          console.log("Refresh token failed.");
        }
      }
  
      return result;
    };
  };
  