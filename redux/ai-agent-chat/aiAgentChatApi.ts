import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl, createBaseQueryWithReAuth, refreshTokenBaseQuery } from '../../api';
import { prepareAuthHeaders } from '@/api/authHeader';
import { User } from '../userSlice/types';
import { ImageType } from '@/utils/types';

const baseQuery = fetchBaseQuery({
  baseUrl: `${baseUrl}/auth/ai-agent`, // Assuming this is the endpoint for the registration.
    prepareHeaders: (headers) => {
      return prepareAuthHeaders(headers);
    }
});



const baseQueryWithReAuth = createBaseQueryWithReAuth(baseQuery, refreshTokenBaseQuery);


export const aiAgentChatApi = createApi({
  reducerPath: "aiAgentChatApi",
  baseQuery: baseQueryWithReAuth,
  tagTypes: ["Search"],
  endpoints: (builder) => ({
    aiAgentSearch: builder.mutation<{
      message?: string;

    }, PayloadData>({
      query: (credentials) => ({
        url: "/gpt/search/",
        method: "POST",
        body: credentials,
        headers: { "Content-Type": "application/json" },
      }),
    }),


  }),
  
});

export const {
 useAiAgentSearchMutation,
} = aiAgentChatApi;

export interface PayloadData {
  text: string;
}
