import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl, createBaseQueryWithReAuth } from '../../api';
import { prepareAuthHeaders } from '../../api/authHeader';
import { EmirateFetchAllItemsResponse, EmirateFetchAllNamesResponse, EmirateItemsFetchByIdPayload, EmirateItemsFetchByIdResponse } from './types';

const baseQuery = fetchBaseQuery({
  baseUrl: `${baseUrl}/emirate/`,
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


export const emirateApi = createApi({
  reducerPath: "emirateApi",
  baseQuery: baseQueryWithReAuth,
  tagTypes: ["AllNames", "Emirates", "Emirate"],
  endpoints: (builder) => ({
    fetchAllEmirateNames: builder.query<EmirateFetchAllNamesResponse, void>({
      query: (credentials) => ({
        url: "/names",
        method: "GET",
        body: credentials,
        headers: { "Content-Type": "application/json" },
      }),
      providesTags: ["AllNames"],
    }),

    fetchAllEmirates: builder.query<EmirateFetchAllItemsResponse, {
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
      providesTags: ["Emirates"],
    }),
    fetchEmirateById: builder.query<EmirateItemsFetchByIdResponse, EmirateItemsFetchByIdPayload>({
      query: (payload) => ({
        url: `/${payload.id}`,
        method: "GET",
      }),
      providesTags: ["Emirate"],

    }),
  }),
});

export const {
  useFetchAllEmirateNamesQuery,
  useFetchAllEmiratesQuery,
  useFetchEmirateByIdQuery,

} = emirateApi;
