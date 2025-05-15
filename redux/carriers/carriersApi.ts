import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl, createBaseQueryWithReAuth } from '../../api';
import { LOCAL_STORAGE_KEYS } from '@/api/storage';
import { AllCarrierItems, CarrierPayload } from './types';
import { Pagination } from '@/utils/types';

const baseQuery = fetchBaseQuery({
  baseUrl: `${baseUrl}/carriers/`,
  credentials: "include",
  prepareHeaders: (headers) => {
    const token = localStorage.getItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN); // or get from Redux store
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }
});

const refreshTokenBaseQuery = fetchBaseQuery({
  baseUrl: `${baseUrl}/auth/user/`, // Different base URL for auth
  credentials: "include",
});

const baseQueryWithReAuth = createBaseQueryWithReAuth(baseQuery, refreshTokenBaseQuery);

export const carriersApi = createApi({
  reducerPath: "carriersApi",
  baseQuery: baseQueryWithReAuth,
  tagTypes: ["Carriers", "Carrier"],
  endpoints: (builder) => ({
    carrierEnquiry: builder.mutation<AddCarrierResponse, CarrierPayload>({
      query: (credentials) => ({
        url: "/",
        method: "POST",
        body: credentials,
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: ["Carriers"],
    }),
    viewAllCarriers: builder.query<ViewCarrierResponse, {
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
      providesTags: ["Carriers"],
    }),

  }),
});

export const {
  useCarrierEnquiryMutation,

} = carriersApi;


interface AddCarrierResponse {
  success: boolean;
}

interface ViewCarrierResponse {
  success: boolean;
  message: string;
  data: AllCarrierItems[];
  pagination: Pagination;
}
