import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl, createBaseQueryWithReAuth } from '../../api';
import { prepareAuthHeaders } from '../../api/authHeader';
import { EnquiryPayload, FetchItemByIdResponseItem } from './types';

const baseQuery = fetchBaseQuery({
  baseUrl: `${baseUrl}/quick-enquiery`,
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

export const quickEnquiryApi = createApi({
  reducerPath: "quickEnquiryApi",
  baseQuery: baseQueryWithReAuth,
  tagTypes: ["QucikEnquiry"],
  endpoints: (builder) => ({

    addQuickEnquiry: builder.mutation<FetchItemByIdResponseItem, EnquiryPayload>({
      query: (credentials) => ({
        url: "/",
        method: "POST",
        body: credentials,
        headers: { "Content-Type": "application/json" },
      }),
    }),
  }),
});

export const {
  useAddQuickEnquiryMutation,

} = quickEnquiryApi;
