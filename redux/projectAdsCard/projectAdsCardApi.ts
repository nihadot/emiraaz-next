import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { prepareAuthHeaders } from '@/api/authHeader';
import { baseUrl, createBaseQueryWithReAuth } from '@/api';
import { AllProjectAdsCards } from './types';

const baseQuery = fetchBaseQuery({
  baseUrl: `${baseUrl}/project/ads/`,
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


export const projectAdsCardApi = createApi({
  reducerPath: "projectAdsCardApi",
  baseQuery: baseQueryWithReAuth,
  tagTypes: ["ProjectAdsCards", "AllNames", "ProjectAddCard"],
  endpoints: (builder) => ({
    viewAllProjectAdsCards: builder.query<ViewProjectAdsCardsResponse, {
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
      providesTags: ["ProjectAdsCards"],
    }),
  }),
});

export const {
  useViewAllProjectAdsCardsQuery
} = projectAdsCardApi;


interface ViewProjectAdsCardsResponse {
  success: boolean;
  message: string;
  data: AllProjectAdsCards[];
  pagination: Pagination;
}

type Pagination = {
  currentPage: number;
  perPage: number;
  totalRecords: number;
  totalPages: number;
};
