import { baseApi } from "../baseApi";
import type {
  User,
  CreateUserRequest,
  UpdateUserRequest,
  UsersListResponse,
  UsersQueryParams,
  UserResponse,
  DeleteUserResponse,
} from "./users-type";
import type { ApiListResponse } from "../shared-types";

/**
 * RTK Query API endpoints for Users management
 * Provides CRUD operations for user management
 */
export const usersApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    /**
     * Get all users query endpoint
     * Fetches a paginated list of users with optional filters
     *
     * @param params - Query parameters for filtering and pagination
     * @returns UsersListResponse with paginated user data
     */
    getUsers: build.query<UsersListResponse, UsersQueryParams | void>({
      query: (params) => {
        const queryParams = new URLSearchParams();
        const hasRoleFilter = params?.role;
        
        if (params) {
          if (params.page !== undefined) queryParams.set("page", params.page.toString());
          if (params.limit !== undefined) queryParams.set("limit", params.limit.toString());
          if (params.role) {
            queryParams.set("role[eq]", params.role);
          }
          if (params.status) queryParams.set("status", params.status);
          if (params.search) queryParams.set("search", params.search);
          if (params.schoolId) queryParams.set("schoolId", params.schoolId);
          if (params.isActive !== undefined) queryParams.set("isActive", params.isActive.toString());
          if (params.isStaff !== undefined) queryParams.set("isStaff", params.isStaff.toString());
          if (params.isSuperuser !== undefined) queryParams.set("isSuperuser", params.isSuperuser.toString());
        }
        
        const queryString = queryParams.toString();
        if (hasRoleFilter) {
          return `/users?_all${queryString ? `&${queryString}` : ""}`;
        }
        return `/users${queryString ? `?${queryString}` : ""}`;
      },
      transformResponse: (response: ApiListResponse<User>) => {
        // Check status field - if false or error status_code, throw error
        if (response.status === false || (response.status_code && response.status_code >= 400)) {
          throw new Error(response.message || "Failed to fetch users");
        }
        // Return response as-is (components access response.data for array, response.total for count)
        return response;
      },
      providesTags: ["User"],
    }),

    /**
     * Get user by ID query endpoint
     * Fetches a single user by their ID
     *
     * @param id - User ID
     * @returns UserResponse with wrapped User object
     */
    getUserById: build.query<UserResponse, string>({
      query: (id) => `/users/${id}`,
      providesTags: (result, error, id) => [{ type: "User", id }],
    }),

    /**
     * Create user mutation endpoint
     * Creates a new user in the system
     *
     * @param body - User creation data
     * @returns UserResponse with created User object
     */
    createUser: build.mutation<UserResponse, CreateUserRequest>({
      query: (body) => ({
        url: "/users",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
    }),

    /**
     * Update user mutation endpoint
     * Updates an existing user's information
     *
     * @param param0 - Object containing user ID and update data
     * @returns UserResponse with updated User object
     */
    updateUser: build.mutation<UserResponse, { id: string; data: UpdateUserRequest }>({
      query: ({ id, data }) => ({
        url: `/users/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "User", id },
        "User",
      ],
    }),

    /**
     * Delete user mutation endpoint
     * Deletes a user from the system
     *
     * @param id - User ID to delete
     * @returns DeleteUserResponse with success status and message
     */
    deleteUser: build.mutation<DeleteUserResponse, string>({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

// Export hooks for use in React components
export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = usersApi;
