import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl, createBaseQueryWithReAuth } from '../../api';
import { prepareAuthHeaders } from '../../api/authHeader';
import { FetchAllVideoResponse, FetchVideoByIdPayload, FetchVideoByIdResponse } from './types';

const baseQuery = fetchBaseQuery({
  baseUrl: `${baseUrl}/videos/`,
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


export const videosApi = createApi({
  reducerPath: "videosApi",
  baseQuery: baseQueryWithReAuth,
  tagTypes: ["AllVideo", "video"],
  endpoints: (builder) => ({
    //   fetchAllVideo: builder.query<
    //   FetchAllCityNamesResponse,
    //   {
    //     page?: number;
    //     limit?: number;
    //     search?: string;
    //     sortBy?: string;
    //     sortOrder?: string;
    //     emirate?:string
    //   }
    // >({
    //   query: ({
    //     emirate
    //   }) => ({
    //     url: `/names?emirate=${emirate}`,
    //     method: "GET",
    //     headers: { "Content-Type": "application/json" },
    //   }),
    //   providesTags: ["AllVideo"],
    // }),

    // fetchAllVideo: builder.query<FetchAllCitiesResponse, {
    //   page?: number,
    //   limit?: number,
    //   search?: string,
    //   sortBy?: string,
    //   sortOrder?: string,
    //   cities?:string[]
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
    //   providesTags: ["Cities"],
    // }),

    fetchAllVideo: builder.query<FetchAllVideoResponse, {
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
          url: `/?${queryParams.toString()}`,
          method: "GET",
          headers: { "Content-Type": "application/json" },
        };
      },
      providesTags: ["AllVideo"],
    }),



    fetchVideoById: builder.query<FetchVideoByIdResponse, FetchVideoByIdPayload>({
      query: (payload) => ({
        url: `/${payload.id}`,
        method: "GET",
      }),
      providesTags: ["video"],

    }),
  }),
});

export const { useFetchAllVideoQuery,
  useFetchVideoByIdQuery,

} = videosApi;
