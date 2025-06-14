import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl, createBaseQueryWithReAuth, refreshTokenBaseQuery } from '../../api';
import { LOCAL_STORAGE_KEYS } from '@/api/storage';
import { Pagination } from '@/utils/types';
import { AllWishlistItems } from './types';

const baseQuery = fetchBaseQuery({
  baseUrl: `${baseUrl}/wishlist/`,
  prepareHeaders: (headers) => {
    const token = localStorage.getItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});




const baseQueryWithReAuth = createBaseQueryWithReAuth(baseQuery, refreshTokenBaseQuery);

export const wishlistApi = createApi({
  reducerPath: "wishlistApi",
  baseQuery: baseQueryWithReAuth,
  tagTypes: ["AllWishlists"],
  endpoints: (builder) => ({
  toggleWishlistItem: builder.mutation<ViewToggleWishlistResponse, {userId: string, projectId: string}>({
    query: (credentials) => ({
      url: "/",
      method: "POST",
      body: credentials,
      headers: { "Content-Type": "application/json" },
    }),
    invalidatesTags: ["AllWishlists"],
  }),
     viewAllWishlists: builder.query<ViewWishlistResponse, {
              page?: number,
              limit?: number,
              search?: string,
              userId:string
            }>({
              query: (params) => {
                const {
                  page = 1,
                  limit = 20,
                  search = "",
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
        
                return {
                  url: `${params.userId}/?${queryParams.toString()}`,
                  method: "GET",
                  headers: { "Content-Type": "application/json" },
                };
              },
              providesTags: ["AllWishlists"],
            }),
        
   
  }),
});

export const {
  useViewAllWishlistsQuery,
  useToggleWishlistItemMutation
} = wishlistApi;


export interface ViewToggleWishlistResponse {
  success: boolean;
  message: string;
}

export interface ViewWishlistResponse {
  success: boolean;
  message: string;
  data: AllWishlistItems[];
  pagination: Pagination;
}
