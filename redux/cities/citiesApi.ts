import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl, createBaseQueryWithReAuth } from '../../api';
import { prepareAuthHeaders } from '../../api/authHeader';
import { FetchAllCitiesResponse, FetchAllCitiesUnderProjectResponse, FetchAllCityAndCountResponse, FetchAllCityNamesResponse, FetchCityByIdPayload, FetchCityByIdResponse } from './types';

const baseQuery = fetchBaseQuery({
  baseUrl: `${baseUrl}/city/`,
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


export const citiesApi = createApi({
  reducerPath: "citiesApi",
  baseQuery: baseQueryWithReAuth,
  tagTypes: ["AllCities", "Cities", "City", "AllCitiesWithCount", "projectsUnderCity", "EmirateDetailsByCityId"],
  endpoints: (builder) => ({
    fetchAllCityNames: builder.query<
      FetchAllCityNamesResponse,
      {
        page?: number;
        limit?: number;
        search?: string;
        sortBy?: string;
        sortOrder?: string;
        emirate?: string
        slug?: string
      }
    >({
      query: ({
        emirate,
        slug,
        search,
      }) => {
        const params = new URLSearchParams();

        if (emirate) params.append("emirate", emirate);
        if (slug) params.append("slug", slug);
        if (search) params.append("search", search);

        return {
          url: `/names?${params.toString()}`,
          method: "GET",
          headers: { "Content-Type": "application/json" },
        };
      },
      providesTags: ["AllCities"],
    }),

    fetchAllCityWithDetailedCount: builder.query<
      FetchAllCityAndCountResponse,
      {
        page?: number;
        limit?: number;
        search?: string;
        sortBy?: string;
        sortOrder?: string;
        emirate?: string
      }
    >({
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
            Object.entries(restParams).filter(([_, v]) => v !== undefined && v !== "")
          ),
        });

        return {
          url: `/detailed/count/?${queryParams.toString()}`,
          method: "GET",
          headers: { "Content-Type": "application/json" },
        };
      },
      providesTags: ["AllCitiesWithCount"],
    }),
    fetchAllProjectsUnderCity: builder.query<FetchAllCitiesUnderProjectResponse, {
      page?: number,
      limit?: number,
      search?: string,
      citySlug: string,
      projectTypeFirst?: string,
    }>({
      query: ({
        page = 1,
        limit = 20,
        search = "",
        citySlug,
        projectTypeFirst,
      }) => ({
        url: `/projects/${citySlug}?page=${page}&limit=${limit}&search=${search}&projectTypeFirst=${projectTypeFirst}`,
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }),
      providesTags: ["projectsUnderCity"],
    }),

    fetchAllCities: builder.query<FetchAllCitiesResponse, {
      page?: number,
      limit?: number,
      search?: string,
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
            )),
        });

        if (emirates && emirates.length > 0) {
          emirates.forEach(city => queryParams.append("emirates", city));
        }

        return {
          url: `/all-cities/property-type-count/?${queryParams.toString()}`,
          method: "GET",
          headers: { "Content-Type": "application/json" },
        };
      },
      providesTags: ["AllCities"],
    }),



    fetchCityById: builder.query<FetchCityByIdResponse, FetchCityByIdPayload>({
      query: (payload) => ({
        url: `/${payload.id}`,
        method: "GET",
      }),
      providesTags: ["City"],

    }),
  }),
});

export const {
  useFetchAllCityNamesQuery,
  useFetchAllCitiesQuery,
  useFetchCityByIdQuery,
  useFetchAllCityWithDetailedCountQuery,
  useFetchAllProjectsUnderCityQuery,

} = citiesApi;
