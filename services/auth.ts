import { baseApi } from "./baseApi";

/**
 * Interface for authenticated user data
 * Contains user identification and role information
 */
export interface AuthUser {
  id: string; // Unique user identifier
  name: string; // User's display name
  role: "teacher" | "student" | "parent" | "admin" | "canteen"; // User's role for access control
  email: string; // User's email address
}

/**
 * Interface for login request payload
 * Sent to the API when user attempts to log in
 */
export interface LoginRequest {
  email: string; // User's email address
  password: string; // User's password (plain text, will be encrypted in transit)
}

/**
 * Interface for login response from API
 * Contains authentication token and user information
 */
export interface LoginResponse {
  token: string; // JWT token for authenticated requests
  user: AuthUser; // User information
}

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
  }),
});

// Export hooks for use in React components
export const { useLoginMutation, useGetProfileQuery } = authApi;




