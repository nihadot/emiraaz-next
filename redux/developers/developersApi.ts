import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl, createBaseQueryWithReAuth } from '../../api';
import { LOCAL_STORAGE_KEYS } from '@/api/storage';
import { AllDevelopersItems } from './types';
import { Pagination } from '@/utils/types';

const baseQuery = fetchBaseQuery({
  baseUrl: `${baseUrl}/developers/`,
  credentials: "include",
   prepareHeaders: (headers) => {
        const token = localStorage.getItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN); // or get from Redux store
        if (token) {
          headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
      }
});

// ✅ Separate Base Query for Refresh Token
const refreshTokenBaseQuery = fetchBaseQuery({
  baseUrl: `${baseUrl}/auth/admin/`, // Different base URL for auth
  credentials: "include",
});

const baseQueryWithReAuth = createBaseQueryWithReAuth(baseQuery, refreshTokenBaseQuery);

export const developersApi = createApi({
  reducerPath: "developersApi",
  baseQuery: baseQueryWithReAuth,
  tagTypes: ["Developers"],
  endpoints: (builder) => ({
 
    // viewAllDevelopers: builder.query<ViewDeveloperResponse, {
    //   page?: number,
    //   limit?: number,
    //   search?: string,
    //   sortBy?: string,
    //   sortOrder?: string,
    //   deleted?: string
    // }>({
    //   query: ({
    //     page = 1,
    //     limit = 20,
    //     search = "",
    //     sortBy = "createdAt",
    //     sortOrder = "desc",
    //   }) => ({
    //     url: `/?page=${page}&limit=${limit}&search=${search}&sortBy=${sortBy}&sortOrder=${sortOrder}`,
    //     method: "GET",
    //     headers: { "Content-Type": "application/json" },
    //   }),
    //   providesTags: ["Developers"],
    // }),
     viewAllDevelopers: builder.query<ViewDeveloperResponse, {
              page?: number,
              limit?: number,
              search?: string,
              propertyType?: string[],
              emirates?: string[],
            }>({
              query: (params) => {
                const {
                  page = 1,
                  limit = 20,
                  search = "",
                  emirates,
                  ...restParams
                } = params;
        
                const queryParams = new URLSearchParams({
                  page: page.toString(),
                  limit: limit.toString(),
                  search,
                  ...Object.fromEntries(
                    Object.entries(restParams).filter(
                      ([_, v]) => v !== undefined && (typeof v !== "string" || v !== "")
                    )                  ),
                });
        
                if (emirates && emirates.length > 0) {
                  emirates.forEach(city => queryParams.append("emirates", city));
                }
        
                return {
                  url: `/?${queryParams.toString()}`,
                  method: "GET",
                  headers: { "Content-Type": "application/json" },
                };
              },
              providesTags: ["Developers"],
            }),
        
   
  }),
});

export const {
  useViewAllDevelopersQuery,
} = developersApi;


export interface ViewDeveloperResponse {
  success: boolean;
  message: string;
  data: AllDevelopersItems[];
  pagination: Pagination;
}
