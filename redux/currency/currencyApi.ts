import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl, createBaseQueryWithReAuth, refreshTokenBaseQuery } from '../../api';

const baseQuery = fetchBaseQuery({
  baseUrl: `${baseUrl}/currency/`, 
});

const baseQueryWithReAuth = createBaseQueryWithReAuth(baseQuery, refreshTokenBaseQuery);

export const currencyApi = createApi({
  reducerPath: "currencyApi",
  baseQuery: baseQueryWithReAuth,
  tagTypes: ["Currency"],
  endpoints: (builder) => ({
      fetchCurrency: builder.query<{ success: boolean,message:string;data:ICurrencyRate }, {
        currency?:string
      }>({
      query: (param) => {
        const {currency} = param;

        return {
            url: `?currency=${currency}`,
            method: "GET",
        }
      },
    }),


  }),
  
});

export const {
  useFetchCurrencyQuery
} = currencyApi;

export interface ICurrencyRate  {
    currency: string;
    rate: number;
    timestamp: number;
}
