import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl, createBaseQueryWithReAuth } from '../../api';
import { prepareAuthHeaders } from '@/api/authHeader';
import { User } from '../userSlice/types';
import { ImageType } from '@/utils/types';

const baseQuery = fetchBaseQuery({
  baseUrl: `${baseUrl}/auth/user/`, // Assuming this is the endpoint for the registration.
  credentials: "include",
    prepareHeaders: (headers) => {
      return prepareAuthHeaders(headers);
    }
});

const refreshTokenBaseQuery = fetchBaseQuery({
  baseUrl: `${baseUrl}/auth/user/`,
  credentials: "include",
});


const baseQueryWithReAuth = createBaseQueryWithReAuth(baseQuery, refreshTokenBaseQuery);


export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithReAuth,
  tagTypes: ["Auth"],
  endpoints: (builder) => ({
    // Log-in endpoint
    login: builder.mutation<AuthResponse, LoginCredentials>({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: ["Auth"],
    }),

    // Sign-up endpoint
    signUp: builder.mutation<AuthResponse, SignUpCredentials>({
      query: (credentials) => ({
        url: "/registration", // Assuming '/signup' for registration endpoint.
        method: "POST",
        body: credentials,
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: ["Auth"],
    }),

    // Log-out endpoint
    logout: builder.mutation<{ message: string }, void>({
      query: () => ({ url: "/logout", method: "POST" }),
    }),

    // Protect route query (to check if the user is authenticated)
    protectRoute: builder.query<{ success: boolean }, void>({
      query: () => "/protect-route",
    }),


    editProfile: builder.mutation<EditProfileResponse, EditProfilePayload>({
      query: (credentials) => ({
        url: "/profile", // Assuming '/signup' for registration endpoint.
        method: "PUT",
        body: credentials,
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: ["Auth"],
    }),


    verifyPasswordChange: builder.mutation<VerifyPasswordChangeResponse, VerifyPasswordChangePayload>({
      query: (credentials) => ({
        url: "/verify-password-change", // Assuming '/signup' for registration endpoint.
        method: "POST",
        body: credentials,
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: ["Auth"],
    }),

    passwordChangeRequest: builder.mutation<ChangePasswordRequestResponse, ChangePasswordRequestPayload>({
      query: (credentials) => ({
        url: "/request-password-change", // Assuming '/signup' for registration endpoint.
        method: "POST",
        body: credentials,
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: ["Auth"],
    }),
  }),
});

export const {
  useLoginMutation,
  useSignUpMutation,  // Custom hook for sign-up
  useLogoutMutation,
  useProtectRouteQuery,
  useEditProfileMutation,
  usePasswordChangeRequestMutation,
  useVerifyPasswordChangeMutation
} = authApi;

export interface EditProfileResponse {
  success: boolean;
  message: string;
  user: User;
}

export interface EditProfilePayload {
  name?: string;
  nationality?: string;
  email?: string;
  number?: string;
  avatar?:ImageType;
}

export interface VerifyPasswordChangeResponse {
  success: boolean;
  message: string;
  user: User;
}


export interface VerifyPasswordChangePayload {
  token: string;
  otp: string;
}
export interface ChangePasswordRequestResponse {
  success: boolean;
  message: string;
  token: string;
}
// Types
export interface AuthResponse {
  success: boolean;
  user: {
    name: string;
    number: string;
    email: string;
    avatar?: ImageItem;
  };
  accessToken: string;
}

export interface ChangePasswordRequestPayload {
  newPassword: string;
}
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignUpCredentials {
  name: string;
  email: string;
  number:string;
  password: string;
}

type ImageItem = {
  asset_id: string;
  secure_url: string;
  url: string;
  public_id: string;
};
