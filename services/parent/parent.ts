import { baseApi } from "../baseApi";
import type {
  // Types will be imported from parent-type.ts once defined
} from "./parent-type";

/**
 * RTK Query API endpoints for Parent dashboard
 * Provides functionality for fee payments, wallet, messages, etc.
 */
export const parentApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Endpoints will be added here based on Postman collection
  }),
});

// Export hooks will be added as endpoints are implemented
// export const { useXXXQuery, useXXXMutation } = parentApi;

