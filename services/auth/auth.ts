import { baseApi } from "../baseApi";
import type {
  AuthUser,
  LoginRequest,
  LoginResponse,
  GoogleLoginRequest,
  ForgetPasswordRequest,
  ForgetPasswordResponse,
} from "./auth-type";

// Re-export types for convenience
export type {
  AuthUser,
  LoginRequest,
  LoginResponse,
  GoogleLoginRequest,
  ForgetPasswordRequest,
  ForgetPasswordResponse,
} from "./auth-type";

/**
 * RTK Query API endpoints for authentication
 * Provides login and profile fetching functionality
 */
export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    /**
     * Login mutation endpoint
     * Sends credentials to API and receives token + user data
     *
     * @param body - Login credentials (email and password)
     * @returns LoginResponse with token and user data
     */
    login: build.mutation<LoginResponse, LoginRequest>({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
      // Invalidate auth cache on login to refresh user data
      invalidatesTags: ["Auth"],
    }),

    /**
     * Get user profile query endpoint
     * Fetches current authenticated user's profile information
     *
     * @returns AuthUser with current user's information
     */
    getProfile: build.query<AuthUser, void>({
      query: () => "/auth/profile",
      // Cache profile data with Auth tag for automatic refetching
      providesTags: ["Auth"],
    }),

    /**
     * Google login mutation endpoint
     * Authenticates user using Google OAuth token
     *
     * @param body - Google login credentials (idToken, accessToken)
     * @returns LoginResponse with token and user data
     */
    googleLogin: build.mutation<LoginResponse, GoogleLoginRequest>({
      query: (body) => ({
        url: "/auth/google",
        method: "POST",
        body,
      }),
      // Invalidate auth cache on login to refresh user data
      invalidatesTags: ["Auth"],
    }),

    /**
     * Forget password mutation endpoint
     * Sends password reset email to user
     *
     * @param body - Forget password request (email)
     * @returns ForgetPasswordResponse with success message
     */
    forgetPassword: build.mutation<
      ForgetPasswordResponse,
      ForgetPasswordRequest
    >({
      query: (body) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body,
      }),
    }),

    /**
     * Change password mutation endpoint
     * Changes user's password using a token
     *
     * @param body - Change password request (token and new password)
     * @returns ForgetPasswordResponse with success message
     */
    changePassword: build.mutation<
      ForgetPasswordResponse,
      { token: string; newPassword: string }
    >({
      query: ({ token, newPassword }) => ({
        url: `/auth/change-password?token=${token}`,
        method: "POST",
        body: { newPassword },
      }),
    }),
  }),
});

// Export hooks for use in React components
export const {
  useLoginMutation,
  useGetProfileQuery,
  useGoogleLoginMutation,
  useForgetPasswordMutation,
} = authApi;
