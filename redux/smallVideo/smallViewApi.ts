import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl, createBaseQueryWithReAuth } from '../../api';
import { AllSmallVideoItems } from './types';
import { prepareAuthHeaders } from '@/api/authHeader';

const baseQuery = fetchBaseQuery({
  baseUrl: `${baseUrl}/projects/small-video-ads/`,
  credentials: "include",
   prepareHeaders: (headers) => {
      return prepareAuthHeaders(headers);
    }
});

// ✅ Separate Base Query for Refresh Token
const refreshTokenBaseQuery = fetchBaseQuery({
  baseUrl: `${baseUrl}/auth/user/`, // Different base URL for auth
  credentials: "include",
});

const baseQueryWithReAuth = createBaseQueryWithReAuth(baseQuery, refreshTokenBaseQuery);


export const smallVideoAdsApi = createApi({
  reducerPath: "smallVideoAdsApi",
  baseQuery: baseQueryWithReAuth,
  tagTypes: ["smallVideosAds"],
  endpoints: (builder) => ({
    viewAllSmallVideos: builder.query<SmallAdsViewResponse, {
      page?: number,
      limit?: number,
      search?: string,
      sortBy?: string,
      sortOrder?: string,
      deleted?: string
    }>({
      query: ({
        page = 1,
        limit = 20,
        search = "",
        sortBy = "createdAt",
        sortOrder = "desc",
      }) => ({
        url: `/?page=${page}&limit=${limit}&search=${search}&sortBy=${sortBy}&sortOrder=${sortOrder}`,
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }),
      providesTags: ["smallVideosAds"],
    }),
  }),
});

export const {
  useViewAllSmallVideosQuery,
} = smallVideoAdsApi;

interface SmallAdsViewResponse {
  success: boolean;
  message: string;
  data: AllSmallVideoItems[];
  pagination: Pagination;
}



type Pagination = {
  currentPage: number;
  perPage: number;
  totalRecords: number;
  totalPages: number;
};
