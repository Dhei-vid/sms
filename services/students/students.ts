import { baseApi } from "../baseApi";
import type {
  Student,
  CreateStudentRequest,
  UpdateStudentRequest,
  StudentsListResponse,
  StudentsQueryParams,
  StudentResponse,
  DeleteStudentResponse,
} from "./students-type";
import type { ApiListResponse } from "../shared-types";

export const studentsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getStudents: build.query<StudentsListResponse, StudentsQueryParams | void>({
      query: (params) => {
        const queryParams = new URLSearchParams();
        queryParams.set("role[eq]", "student");
        
        if (params) {
          if (params.page !== undefined) queryParams.set("page", params.page.toString());
          if (params.limit !== undefined) queryParams.set("limit", params.limit.toString());
          if (params.classId) queryParams.set("classId", params.classId);
          if (params.status) queryParams.set("status", params.status);
          if (params.search) queryParams.set("search", params.search);
        }
        
        const queryString = queryParams.toString();
        return `/users?_all${queryString ? `&${queryString}` : ""}`;
      },
      transformResponse: (response: ApiListResponse<Student>) => {
        // Check status field - if false or error status_code, throw error
        if (response.status === false || (response.status_code && response.status_code >= 400)) {
          throw new Error(response.message || "Failed to fetch students");
        }
        // Return response as-is (components access response.data for array, response.total for count)
        return response;
      },
      providesTags: ["Student"],
    }),

    getStudentById: build.query<StudentResponse, string>({
      query: (id) => `/users/${id}`,
      // Cache by student ID - ensures data fetched once is shared across all dashboards
      // When student views their dashboard, data is cached
      // When admin/parent/teacher views same student, they get cached data (no refetch)
      providesTags: (result, error, id) => [{ type: "Student", id }],
    }),

    createStudent: build.mutation<StudentResponse, CreateStudentRequest>({
      query: (body) => ({
        url: "/users",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Student"],
    }),

    updateStudent: build.mutation<StudentResponse, { id: string; data: UpdateStudentRequest }>({
      query: ({ id, data }) => ({
        url: `/users/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Student", id }, "Student"],
    }),

    deleteStudent: build.mutation<DeleteStudentResponse, string>({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Student"],
    }),
  }),
});

export const {
  useGetStudentsQuery,
  useGetStudentByIdQuery,
  useCreateStudentMutation,
  useUpdateStudentMutation,
  useDeleteStudentMutation,
} = studentsApi;

