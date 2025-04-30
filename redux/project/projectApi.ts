import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl, createBaseQueryWithReAuth } from '../../api';
import { prepareAuthHeaders } from '@/api/authHeader';
import { AllNamesViewByIdResponse, PayloadByIdResponse, ViewByIdResponse, ViewProjectResponse } from './types';

const baseQuery = fetchBaseQuery({
  baseUrl: `${baseUrl}/projects/`,
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


export const projectApi = createApi({
  reducerPath: "projectApi",
  baseQuery: baseQueryWithReAuth,
  tagTypes: ["Projects", "AllNames", "Project"],
  endpoints: (builder) => ({
    fetchAllProjects: builder.query<ViewProjectResponse, {
      page?: number,
      limit?: number,
      search?: string,
      propertyType?: string[],
      completionType?: string,
      furnishing?: string,
      cities?: string[],
      projectTypeLast?:string
      year?: number | '',
      qtr?: string,
      paymentPlan?:string,
      discount?:string,
      maxPrice?:string,
      minPrice?:string,
    }>({
      query: (params) => {
        const {
          page = 1,
          limit = 20,
          search = "",
          cities,
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
          url: `/?${queryParams.toString()}`,
          method: "GET",
          headers: { "Content-Type": "application/json" },
        };
      },
      providesTags: ["Projects"],
    }),
    fetchProjectById: builder.query<ViewByIdResponse, PayloadByIdResponse>({
      query: (payload) => ({
        url: `/${payload.id}`,
        method: "GET",
      }),
      providesTags: ["Project"],

    }),
    fetchAllProjectNames: builder.query<AllNamesViewByIdResponse, void>({
      query: () => ({
        url: `/names`,
        method: "GET",
      }),
      providesTags: ["AllNames"],
    }),

  }),
});

export const {
  useFetchAllProjectsQuery,
  useLazyFetchAllProjectsQuery,
  useFetchAllProjectNamesQuery,
  useFetchProjectByIdQuery
} = projectApi;

