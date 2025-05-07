import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl, createBaseQueryWithReAuth } from '../../api';
import { prepareAuthHeaders } from '@/api/authHeader';
import { AllBlogItems } from './type';
import { Pagination } from '@/utils/types';

const baseQuery = fetchBaseQuery({
  baseUrl: `${baseUrl}/blogs/`,
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


export const blogApi = createApi({
  reducerPath: "blogApi",
  baseQuery: baseQueryWithReAuth,
  tagTypes: ["Blogs", "AllNames", "Blog"],
  endpoints: (builder) => ({
    viewAllBlogs: builder.query<ViewBlogsResponse, {
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
      providesTags: ["Blogs"],
    }),
    viewBlogById: builder.query<ViewByIdResponse, PayloadByIdResponse>({
      query: (payload) => ({
        url: `/${payload.id}`,
        method: "GET",
      }),
      providesTags: ["Blog"],

    }),
  }),
});

export const {
  useViewAllBlogsQuery,
  useViewBlogByIdQuery,
} = blogApi;


 interface ViewBlogsResponse {
  success: boolean;
  message: string;
  data: AllBlogItems[];
  pagination: Pagination;
}


type ViewByIdResponse = {
  success: boolean;
  data: AllBlogItems
}


type AllNames = {
  name: string;
  _id: string;
}

type PayloadByIdResponse = {
  id: string;
}
