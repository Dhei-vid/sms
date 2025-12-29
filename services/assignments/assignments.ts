import { baseApi } from "../baseApi";
import type {
  Assignment,
  CreateAssignmentRequest,
  UpdateAssignmentRequest,
  AssignmentsListResponse,
  AssignmentsQueryParams,
} from "./assignments-type";

export const assignmentsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAssignments: build.query<AssignmentsListResponse, AssignmentsQueryParams | void>({
      query: (params) => {
        const queryParams = new URLSearchParams();
        if (params) {
          if (params.page) queryParams.set("page", params.page.toString());
          if (params.limit) queryParams.set("limit", params.limit.toString());
          if (params.courseId) queryParams.set("courseId", params.courseId);
          if (params.teacherId) queryParams.set("teacherId", params.teacherId);
          if (params.studentId) queryParams.set("studentId", params.studentId);
          if (params.type) queryParams.set("type", params.type);
          if (params.status) queryParams.set("status", params.status);
          if (params.search) queryParams.set("search", params.search);
        }
        const queryString = queryParams.toString();
        return `/assignments${queryString ? `?${queryString}` : ""}`;
      },
      providesTags: ["Assignment"],
    }),

    getAssignmentById: build.query<Assignment, string>({
      query: (id) => `/assignments/${id}`,
      providesTags: (result, error, id) => [{ type: "Assignment", id }],
    }),

    createAssignment: build.mutation<Assignment, CreateAssignmentRequest>({
      query: (body) => ({
        url: "/assignments",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Assignment"],
    }),

    updateAssignment: build.mutation<Assignment, { id: string; data: UpdateAssignmentRequest }>({
      query: ({ id, data }) => ({
        url: `/assignments/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Assignment", id }, "Assignment"],
    }),

    deleteAssignment: build.mutation<{ success: boolean; message: string }, string>({
      query: (id) => ({
        url: `/assignments/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Assignment"],
    }),
  }),
});

export const {
  useGetAssignmentsQuery,
  useGetAssignmentByIdQuery,
  useCreateAssignmentMutation,
  useUpdateAssignmentMutation,
  useDeleteAssignmentMutation,
} = assignmentsApi;

