import { baseApi } from "../baseApi";
import type { Assignment, CreateAssignmentRequest, UpdateAssignmentRequest, AssignmentsListResponse, AssignmentsQueryParams } from "./assignments-type";

const BASE = "/assignments";

export const assignmentsApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    getAssignments: build.query<AssignmentsListResponse, AssignmentsQueryParams | void>({
      query: (params) => ({ url: BASE, params: params ?? {} }),
      providesTags: ["Assignment"],
    }),
    getAssignmentById: build.query<Assignment, string>({
      query: (id) => ({ url: `${BASE}/${id}` }),
      providesTags: (_, __, id) => [{ type: "Assignment", id }],
    }),
    createAssignment: build.mutation<Assignment, CreateAssignmentRequest>({
      query: (body) => ({ url: BASE, method: "POST", body }),
      invalidatesTags: ["Assignment"],
    }),
    updateAssignment: build.mutation<Assignment, { id: string; data: UpdateAssignmentRequest }>({
      query: ({ id, data }) => ({ url: `${BASE}/${id}`, method: "PUT", body: data }),
      invalidatesTags: (_, __, { id }) => [{ type: "Assignment", id }, "Assignment"],
    }),
    deleteAssignment: build.mutation<{ success: boolean; message?: string }, string>({
      query: (id) => ({ url: `${BASE}/${id}`, method: "DELETE" }),
      invalidatesTags: (_, __, id) => [{ type: "Assignment", id }, "Assignment"],
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
