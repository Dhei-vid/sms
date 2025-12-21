import {
  createApi,
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import type { RootState } from "@/store";
import { clearError, setError } from "@/store/errorSlice";

/**
 * Base query configuration for RTK Query
 * Sets up the base URL and prepares headers for all API requests
 */
const rawBaseQuery = fetchBaseQuery({
  baseUrl:
    process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://api.example.com/api",
  /**
   * Function to prepare headers for each API request
   * Automatically attaches authentication token if user is logged in
   * 
   * @param headers - Headers object to modify
   * @param getState - Function to get current Redux state
   * @returns Modified headers with auth token and content type
   */
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootState;
    // Get authentication token from Redux auth slice
    const token = state.auth?.token;

    // Attach Bearer token to Authorization header if token exists
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    // Set content type for all requests
    headers.set("Content-Type", "application/json");
    return headers;
  },
});

/**
 * Enhanced base query with error handling
 * Intercepts all API responses and handles errors globally
 * Dispatches error actions to Redux store for UI error display
 * 
 * @param args - API endpoint URL or fetch arguments
 * @param api - RTK Query API object with dispatch and getState
 * @param extraOptions - Additional options for the query
 * @returns Query result with error handling applied
 */
const baseQueryWithErrorHandling: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // Execute the base query
  const result = await rawBaseQuery(args, api, extraOptions);

  // Handle errors by dispatching to error slice
  if (result.error) {
    const status = result.error.status;
    const data = result.error.data as { message?: string } | undefined;

    // Dispatch error to global error state
    api.dispatch(
      setError({
        code: status,
        message: data?.message ?? "Something went wrong. Please try again.",
        details: data,
      })
    );
  } else {
    // Clear any previous errors on successful request
    api.dispatch(clearError());
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithErrorHandling,
  tagTypes: ["TeacherCourse", "TeacherQuestion", "CanteenProduct", "Auth"],
  endpoints: () => ({}),
});