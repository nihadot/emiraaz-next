import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl, createBaseQueryWithReAuth, refreshTokenBaseQuery } from '../../api';
import { prepareAuthHeaders } from '@/api/authHeader';
import { User } from '../userSlice/types';
import { ImageType } from '@/utils/types';

const baseQuery = fetchBaseQuery({
  baseUrl: `${baseUrl}/auth/user/`, // Assuming this is the endpoint for the registration.
    prepareHeaders: (headers) => {
      return prepareAuthHeaders(headers);
    }
});



const baseQueryWithReAuth = createBaseQueryWithReAuth(baseQuery, refreshTokenBaseQuery);


export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithReAuth,
  tagTypes: ["Auth","EditProfile"],
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
    otpSignUp: builder.mutation<SignupOTPResponse, SignUpOTPPayload>({
      query: (data) => ({
        url: "/registration-otp", // Assuming '/signup' for registration endpoint.
        method: "POST",
        body: data,
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: ["Auth"],
    }),
    signUpReSentOTP: builder.mutation<SignupOTPResponse, SignUpResentOTPPayload>({
      query: (data) => ({
        url: "/registration/resent-otp", // Assuming '/signup' for registration endpoint.
        method: "POST",
        body: data,
        headers: { "Content-Type": "application/json" },
      }),
    }),

     signUpForgotPassword: builder.mutation<SignupForgotPasswordResponse, SignUpForgotPasswordPayload>({
      query: (data) => ({
        url: "/forgot-password", 
        method: "POST",
        body: data,
        headers: { "Content-Type": "application/json" },
      }),
    }),

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
      invalidatesTags: ["EditProfile"],
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
    forgotNewPassword: builder.mutation<forgotNewPasswordRequestResponse, ForgotNewPasswordPayload>({
      query: (credentials) => ({
        url: "/forgot-password/reset-password",
        method: "POST",
        body: credentials,
        headers: { "Content-Type": "application/json" },
      }), 
    }),

     forgotPasswordOTPVerification: builder.mutation<forgotPasswordOTPVerficaitionResponse, ForgotPasswordOTPVerificationPayload>({
      query: (credentials) => ({
        url: "/forgot-password/verify",
        method: "POST",
        body: credentials,
        headers: { "Content-Type": "application/json" },
      }), 
    }),
      fetchUserProfileDetails: builder.query<fetchUserProfileDetailsResponse, void>({
      query: () =>"/profile",
      providesTags: ["EditProfile"],
    }),

    //     protectRoute: builder.query<{ success: boolean }, void>({
    //   query: () => "/protect-route",
    // }),
  }),
  
});

export const {
  useLoginMutation,
  useSignUpMutation,  // Custom hook for sign-up
  useLogoutMutation,
  useProtectRouteQuery,
  useEditProfileMutation,
  usePasswordChangeRequestMutation,
  useVerifyPasswordChangeMutation,
  useOtpSignUpMutation,
  useSignUpReSentOTPMutation,
  useSignUpForgotPasswordMutation,
  useForgotNewPasswordMutation,
  useForgotPasswordOTPVerificationMutation,
  useFetchUserProfileDetailsQuery,
} = authApi;

export interface EditProfileResponse {
  success: boolean;
  message: string;
  user: User;
}

export interface EditProfilePayload {
  name?: string;
  nationality?: string;
  avatar?:ImageType;
}

export interface SignupOTPResponse {
  success: boolean;
  message: string;
  token: string;
}
export interface SignupForgotPasswordResponse {
  success: boolean;
  message: string;
}
export interface SignupOTPResponse {
 success: boolean;
  message: string;
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
export interface forgotNewPasswordRequestResponse {
  success: boolean;
  message: string;
  token: string;
}

export interface forgotPasswordOTPVerficaitionResponse {
  success: boolean;
  message: string;
}

export interface IUser {
    name: string;
    email: string;
    avatar: ImageType;
    number: string;
    nationality: string | undefined;
    _id: string;
}
export interface fetchUserProfileDetailsResponse {
  success: boolean;
  user: IUser;
}
// Types
export interface AuthResponse {
  success: boolean;
  user: {
    name: string;
    number: string;
    email: string;
    avatar?: ImageType;
  };
  accessToken: string;
  refreshToken:string;
  token:string;
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

export interface SignUpResentOTPPayload {

  token:string;
  email:string
}

export interface SignUpForgotPasswordPayload {
  email:string;
}




export interface SignUpOTPPayload {
  otp: string;
  token:string;
}
export interface ForgotNewPasswordPayload {
  email:string;
  password:string;
}
export interface ForgotPasswordOTPVerificationPayload {
  otp:string;
  token:string;
}