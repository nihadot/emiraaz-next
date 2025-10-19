import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl, createBaseQueryWithReAuth } from '../../api';
import { prepareAuthHeaders } from '@/api/authHeader';
import { ViewProjectResponse } from './types';

const baseQuery = fetchBaseQuery({
  baseUrl: `${baseUrl}/for-sale/`,
  credentials: "include",
  prepareHeaders: (headers) => {
    return prepareAuthHeaders(headers);
  }
});

const refreshTokenBaseQuery = fetchBaseQuery({
  baseUrl: `${baseUrl}/auth/user/`,
  credentials: "include",
});

const baseQueryWithReAuth = createBaseQueryWithReAuth(baseQuery, refreshTokenBaseQuery);

export const forSaleApi = createApi({
  reducerPath: "forSaleApi",
  baseQuery: baseQueryWithReAuth,
  tagTypes: ["Projects", "Project"],
  endpoints: (builder) => ({
    fetchAllForSaleProjects: builder.query<ViewProjectResponse, {
      page?: number,
      limit?: number,
      search?: string,
      propertyType?: string[],
      completionType?: string,
      furnishing?: string,
      cities?: string[],
      projectTypeLast?: string
      projectTypeFirst?: string,
      year?: number | '',
      qtr?: string,
      paymentPlan?: string,
      discount?: string,
      maxPrice?: string,
      minPrice?: string,
      productTypeOptionFirst?: string,
      productTypeOptionLast?: string,
      url?: string
    }>({
      query: (params) => {
        const {
          page = 1,
          limit = 24,
          search = "",
          cities,
          url,
          ...restParams
        } = params;

        const queryParams = new URLSearchParams({
          page: page.toString(),
          limit: limit.toString(),
          search,
          ...Object.fromEntries(
            Object.entries(restParams).filter(([_, v]) => v !== undefined && v !== "")
          ),
        });

        if (cities && cities.length > 0) {
          cities.forEach(city => queryParams.append("cities", city));
        }

        return {
          url: `${params.url}?${queryParams.toString()}`,
          method: "GET",
          headers: { "Content-Type": "application/json" },
        };
      },
      providesTags: ["Projects"],
    }),


  }),
});

export const {
  useFetchAllForSaleProjectsQuery,
} = forSaleApi;


