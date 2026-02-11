import { baseApi } from "../baseApi";
import type {
  UserRequest,
  CreateUserRequestRequest,
  UpdateUserRequestRequest,
  UserRequestsListResponse,
  UserRequestResponse,
  DeleteUserRequestResponse,
} from "./user-request-types";
import type { ApiListResponse } from "../shared-types";

const BASE = "/user-requests";

export const userRequestsApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    /**
     * Get all user requests
     */
    getUserRequests: build.query<UserRequestsListResponse, void>({
      query: () => ({ url: `${BASE}?_all=true` }), // Use _all to get all data without pagination wrapper
      transformResponse: (response: ApiListResponse<UserRequest> | any) => {
        if (
          response.status === false ||
          (response.status_code && response.status_code >= 400)
        ) {
          throw new Error(response.message || "Failed to fetch user requests");
        }
        // Backend returns different structures:
        // 1. With _all: { data: [...] } - array directly
        // 2. Paginated: { data: [...], pagination: {...} } - array with pagination
        // 3. Non-paginated fallback: { data: { data: [...] } } - nested object
        if (response.data && Array.isArray(response.data)) {
          return response;
        }
        // Handle nested data structure: { data: { data: [...] } }
        if (
          response.data &&
          typeof response.data === "object" &&
          "data" in response.data
        ) {
          return {
            ...response,
            data: (response.data as any).data || [],
            pagination:
              (response.data as any).pagination || response.pagination,
          };
        }
        // Fallback: ensure data is always an array
        return {
          ...response,
          data: [],
          pagination: response.pagination,
        };
      },
      providesTags: ["UserRequest"],
    }),

    /**
     * Get user request by ID
     */
    getUserRequestById: build.query<UserRequestResponse, string>({
      query: (id) => ({ url: `${BASE}/${id}` }),
      transformResponse: (response: UserRequestResponse) => {
        if (
          response.status === false ||
          (response.status_code && response.status_code >= 400)
        ) {
          throw new Error(response.message || "Failed to fetch user request");
        }
        return response;
      },
      providesTags: (_, __, id) => [{ type: "UserRequest", id }],
    }),

    /**
     * Create user request
     */
    createUserRequest: build.mutation<
      UserRequestResponse,
      CreateUserRequestRequest
    >({
      query: (body) => ({
        url: BASE,
        method: "POST",
        body,
      }),
      invalidatesTags: ["UserRequest"],
    }),

    /**
     * Update user request
     */
    updateUserRequest: build.mutation<
      UserRequestResponse,
      { id: string; data: UpdateUserRequestRequest }
    >({
      query: ({ id, data }) => ({
        url: `${BASE}/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (_, __, { id }) => [
        { type: "UserRequest", id },
        "UserRequest",
      ],
    }),

    /**
     * Delete user request
     */
    deleteUserRequest: build.mutation<DeleteUserRequestResponse, string>({
      query: (id) => ({ url: `${BASE}/${id}`, method: "DELETE" }),
      invalidatesTags: ["UserRequest"],
    }),
  }),
});

export const {
  useGetUserRequestsQuery,
  useGetUserRequestByIdQuery,
  useCreateUserRequestMutation,
  useUpdateUserRequestMutation,
  useDeleteUserRequestMutation,
} = userRequestsApi;
