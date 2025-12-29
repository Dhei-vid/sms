import { baseApi } from "../baseApi";
import type {
  User,
  CreateUserRequest,
  UpdateUserRequest,
  UsersListResponse,
  UsersQueryParams,
} from "./users-type";

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
        if (params) {
          if (params.page) queryParams.set("page", params.page.toString());
          if (params.limit) queryParams.set("limit", params.limit.toString());
          if (params.role) queryParams.set("role", params.role);
          if (params.status) queryParams.set("status", params.status);
          if (params.search) queryParams.set("search", params.search);
        }
        const queryString = queryParams.toString();
        return `/users${queryString ? `?${queryString}` : ""}`;
      },
      providesTags: ["User"],
    }),

    /**
     * Get user by ID query endpoint
     * Fetches a single user by their ID
     * 
     * @param id - User ID
     * @returns User object
     */
    getUserById: build.query<User, string>({
      query: (id) => `/users/${id}`,
      providesTags: (result, error, id) => [{ type: "User", id }],
    }),

    /**
     * Create user mutation endpoint
     * Creates a new user in the system
     * 
     * @param body - User creation data
     * @returns Created User object
     */
    createUser: build.mutation<User, CreateUserRequest>({
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
     * @returns Updated User object
     */
    updateUser: build.mutation<User, { id: string; data: UpdateUserRequest }>({
      query: ({ id, data }) => ({
        url: `/users/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "User", id }, "User"],
    }),

    /**
     * Delete user mutation endpoint
     * Deletes a user from the system
     * 
     * @param id - User ID to delete
     * @returns Success response
     */
    deleteUser: build.mutation<{ success: boolean; message: string }, string>({
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

