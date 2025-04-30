import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl, createBaseQueryWithReAuth } from '../../api';
import { prepareAuthHeaders } from '../../api/authHeader';
import { FetchAllPortraitBannersResponse } from './types';

const baseQuery = fetchBaseQuery({
  baseUrl: `${baseUrl}/banners/`,
  credentials: "include",
  prepareHeaders: (headers) => {
    return prepareAuthHeaders(headers);
  }
});

const refreshTokenBaseQuery = fetchBaseQuery({
  baseUrl: `${baseUrl}/auth/admin/`,
  credentials: "include",
});


const baseQueryWithReAuth = createBaseQueryWithReAuth(baseQuery, refreshTokenBaseQuery);


export const portraitBannerAdApi = createApi({
  reducerPath: "portraitBannerAdApi",
  baseQuery: baseQueryWithReAuth,
  tagTypes: ["PortraitBanner"],
  endpoints: (builder) => ({
    fetchAllPortraitBanners: builder.query<FetchAllPortraitBannersResponse, {
      page?: number,
      limit?: number,
      search?: string,
      sortBy?: string,
      sortOrder?: string,
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
      providesTags: ["PortraitBanner"],
    }),

  }),
});

export const {
  useFetchAllPortraitBannersQuery,

} = portraitBannerAdApi;
