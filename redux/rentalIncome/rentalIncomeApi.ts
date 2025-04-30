import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl, createBaseQueryWithReAuth } from '../../api';
import { prepareAuthHeaders } from '../../api/authHeader';
import { AllRentalIncomeItems } from './types';
import { Pagination } from '@/utils/types';

const baseQuery = fetchBaseQuery({
  baseUrl: `${baseUrl}/rental-income/`,
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

export const rentalIncomeApi = createApi({
  reducerPath: "rentalIncomeApi",
  baseQuery: baseQueryWithReAuth,
  tagTypes: ["rentalIncomes"],
  endpoints: (builder) => ({
    viewAllRentalIncomes: builder.query<ViewRentalIncomeResponse, {
      page?: number,
      limit?: number,
      search?: string,
      propertyType?: string[],
      cities?: string[],
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
            Object.entries(restParams).filter(
              ([_, v]) => v !== undefined && !(typeof v === 'string' && v === '')
            ).map(([k, v]) => {
              // Convert arrays to comma-separated strings, or just toString
              const value = Array.isArray(v) ? v.join(',') : String(v);
              return [k, value];
            })
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
      providesTags: ["rentalIncomes"],
    }),

  }),
});

export const {
  useViewAllRentalIncomesQuery

} = rentalIncomeApi;




export interface ViewRentalIncomeResponse {
  success: boolean;
  message: string;
  data: AllRentalIncomeItems[];
  pagination: Pagination;
} 