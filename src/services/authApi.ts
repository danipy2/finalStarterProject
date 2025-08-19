import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface SignupRequest {
  name: string;
  email: string;
  password: string;
  role: string;
}

interface SignupResponse {
  message: string;
  userId?: string;
}

interface VerifyEmailRequest {
  email: string;
  OTP: string;
}

interface VerifyEmailResponse {
  message: string;
  verified: boolean;
}

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginData {
accessToken
: string;
  userId?: string;
  role?: string;
}
interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  errors: any | null;
  count: number;
}
type LoginResponse = ApiResponse<LoginData>



export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://akil-backend.onrender.com",
  }),
  endpoints: (builder) => ({
    signup: builder.mutation<SignupResponse, SignupRequest>({
      query: (body) => ({
        url: "/signup",
        method: "POST",
        body,
      }),
    }),

    verifyEmail: builder.mutation<VerifyEmailResponse, VerifyEmailRequest>({
      query: (body) => ({
        url: "/verify-email",
        method: "POST",
        body,
      }),
    }),

    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (body) => ({
        url: "/login",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useSignupMutation, useLoginMutation, useVerifyEmailMutation } = authApi;
