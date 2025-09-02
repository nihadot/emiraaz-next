import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl, createBaseQueryWithReAuth } from '../../api';
import { prepareAuthHeaders } from '../../api/authHeader';
import { EnquiryPayload, FetchByIDPayload, FetchItemByIdResponseItem } from './types';

const baseQuery = fetchBaseQuery({
  baseUrl: `${baseUrl}/campaigns/questions`,
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

export const campaignApi = createApi({
  reducerPath: "campaignApi",
  baseQuery: baseQueryWithReAuth,
  tagTypes: ["Campaign"],
  endpoints: (builder) => ({
    fetchCampaignById: builder.query<FetchItemByIdResponseItem, FetchByIDPayload>({
      query: (payload) => ({
        url: `/${payload.slug}`,
        method: "GET",
      }),
      providesTags: ["Campaign"],
    }),

    //   addCampaignEnquiry: builder.query<FetchItemByIdResponseItem, EnquiryPayload>({
    //   query: (payload) => ({
    //     url: `/enquiry`,
    //     method: "GET",
    //   }),
    //   providesTags: ["Campaign"],
    // }),


    addCampaignEnquiry: builder.mutation<FetchItemByIdResponseItem, EnquiryPayload>({
      query: (credentials) => ({
        url: "/enquiry",
        method: "POST",
        body: credentials,
        headers: { "Content-Type": "application/json" },
      }),
    }),
  }),
});

export const {
  useFetchCampaignByIdQuery,
  useAddCampaignEnquiryMutation,

} = campaignApi;
