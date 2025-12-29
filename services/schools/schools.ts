import { baseApi } from "../baseApi";
import type {
  School,
  CreateSchoolRequest,
  UpdateSchoolRequest,
  SchoolsListResponse,
  SchoolsQueryParams,
} from "./schools-type";

/**
 * RTK Query API endpoints for Schools management
 * Provides CRUD operations for school management
 */
export const schoolsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    /**
     * Get all schools query endpoint
     * Fetches a paginated list of schools with optional filters
     * 
     * @param params - Query parameters for filtering and pagination
     * @returns SchoolsListResponse with paginated school data
     */
    getSchools: build.query<SchoolsListResponse, SchoolsQueryParams | void>({
      query: (params) => {
        const queryParams = new URLSearchParams();
        if (params) {
          if (params.page) queryParams.set("page", params.page.toString());
          if (params.limit) queryParams.set("limit", params.limit.toString());
          if (params.status) queryParams.set("status", params.status);
          if (params.search) queryParams.set("search", params.search);
        }
        const queryString = queryParams.toString();
        return `/schools${queryString ? `?${queryString}` : ""}`;
      },
      providesTags: ["School"],
    }),

    /**
     * Get school by ID query endpoint
     * Fetches a single school by its ID
     * 
     * @param id - School ID
     * @returns School object
     */
    getSchoolById: build.query<School, string>({
      query: (id) => `/schools/${id}`,
      providesTags: (result, error, id) => [{ type: "School", id }],
    }),

    /**
     * Create school mutation endpoint
     * Creates a new school in the system
     * 
     * @param body - School creation data
     * @returns Created School object
     */
    createSchool: build.mutation<School, CreateSchoolRequest>({
      query: (body) => ({
        url: "/schools",
        method: "POST",
        body,
      }),
      invalidatesTags: ["School"],
    }),

    /**
     * Update school mutation endpoint
     * Updates an existing school's information
     * 
     * @param param0 - Object containing school ID and update data
     * @returns Updated School object
     */
    updateSchool: build.mutation<School, { id: string; data: UpdateSchoolRequest }>({
      query: ({ id, data }) => ({
        url: `/schools/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "School", id }, "School"],
    }),

    /**
     * Delete school mutation endpoint
     * Deletes a school from the system
     * 
     * @param id - School ID to delete
     * @returns Success response
     */
    deleteSchool: build.mutation<{ success: boolean; message: string }, string>({
      query: (id) => ({
        url: `/schools/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["School"],
    }),
  }),
});

// Export hooks for use in React components
export const {
  useGetSchoolsQuery,
  useGetSchoolByIdQuery,
  useCreateSchoolMutation,
  useUpdateSchoolMutation,
  useDeleteSchoolMutation,
} = schoolsApi;

