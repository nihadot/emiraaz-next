import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl, createBaseQueryWithReAuth } from '../../api';
import { prepareAuthHeaders } from '@/api/authHeader';
import { NewsItemType } from './type';

const baseQuery = fetchBaseQuery({
  baseUrl: `${baseUrl}/news/`,
  credentials: "include",
    prepareHeaders: (headers) => {
            return prepareAuthHeaders(headers);
          }
});

// ✅ Separate Base Query for Refresh Token
const refreshTokenBaseQuery = fetchBaseQuery({
  baseUrl: `${baseUrl}/auth/admin/`, // Different base URL for auth
  credentials: "include",
});


const baseQueryWithReAuth = createBaseQueryWithReAuth(baseQuery, refreshTokenBaseQuery);

export const newsApi = createApi({
  reducerPath: "newsApi",
  baseQuery: baseQueryWithReAuth,
  tagTypes: ["AllNews", "AllNames", "News","AllCounts"],
  endpoints: (builder) => ({
    viewAllNews: builder.query<ViewNewsResponse, {
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
      providesTags: ["News"],
    }),
    viewNewsById: builder.query<ViewByIdResponse, PayloadByIdResponse>({
      query: (payload) => ({
        url: `/${payload.id}`,
        method: "GET",
      }),
      providesTags: ["News"],

    }),



      viewAllCounts: builder.query<ViewAllCountsResponse, void>({
      query: () => ({
        url: `/all/counts`,
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }),
      providesTags: ["AllCounts"],
    }),

  }),
});

export const {
    useViewAllNewsQuery,
    useViewNewsByIdQuery,
    useViewAllCountsQuery,
} = newsApi;


interface ViewNewsResponse {
  success: boolean;
  message: string;
  data: NewsItemType[];
  pagination: Pagination;
}


interface ViewAllCountsResponse {
  success: boolean;
  data: CountItem;
}

type ViewByIdResponse = {
  success: boolean;
  data: NewsItemType
}

type Pagination = {
  currentPage: number;
  perPage: number;
  totalRecords: number;
  totalPages: number;
};

type PayloadByIdResponse = {
  id: string;
}


type CountItem = {
   _id: string;
    propertyTypes: PropertyTypeItem[];
    discount:DiscountItem[];
    paymentPlans: PaymentPlanItem[];
    furnisheds:FurnishedItem[];
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;

}



type PropertyTypeItem = {
    propertyType: string;
    count: number;
}

type DiscountItem = {
    discount: string;
    count: number;
}

type PaymentPlanItem = {
    paymentPlan: string;
    count: number;
}
type FurnishedItem = {
    furnished: string;
    count: number;
}