import { baseApi } from "./baseApi";

export interface AuthUser {
  id: string;
  name: string;
  role: "teacher" | "student" | "parent" | "admin" | "canteen";
  email: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: AuthUser;
}

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<LoginResponse, LoginRequest>({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Auth"],
    }),
    getProfile: build.query<AuthUser, void>({
      query: () => "/auth/profile",
      providesTags: ["Auth"],
    }),
  }),
});

export const { useLoginMutation, useGetProfileQuery } = authApi;



