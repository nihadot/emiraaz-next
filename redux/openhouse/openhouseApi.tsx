import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl, createBaseQueryWithReAuth } from '../../api';
import { prepareAuthHeaders } from '@/api/authHeader';
import { ItemOpenHouse } from './type';
import { Pagination } from '@/utils/types';

const baseQuery = fetchBaseQuery({
  baseUrl: `${baseUrl}/open-houses/`,
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

export const openHouseApi = createApi({
  reducerPath: "openHouseApi",
  baseQuery: baseQueryWithReAuth,
  tagTypes: ["AllOpenHouses", "OpenHouse"],
  endpoints: (builder) => ({
    viewFetchAllOpenHouse: builder.query<ViewOpenHouseResponse, {
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
      providesTags: ["AllOpenHouses"],
    }),
    viewOpenHouseById: builder.query<ViewByIdResponse, PayloadByIdResponse>({
      query: (payload) => ({
        url: `/${payload.id}`,
        method: "GET",
      }),
      providesTags: ["OpenHouse"],

    }),
  }),
});

export const {
  useViewFetchAllOpenHouseQuery,
  useViewOpenHouseByIdQuery,
} = openHouseApi;


interface ViewOpenHouseResponse {
  success: boolean;
  message: string;
  data: ItemOpenHouse[];
  pagination: Pagination;
}

type ViewByIdResponse = {
  success: boolean;
  data: ItemOpenHouse
}

type PayloadByIdResponse = {
  id: string;
}
