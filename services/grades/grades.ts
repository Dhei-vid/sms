import { baseApi } from "../baseApi";
import type {
  Grade,
  CreateGradeRequest,
  UpdateGradeRequest,
  GradesListResponse,
  GradesQueryParams,
} from "./grades-type";

export const gradesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getGrades: build.query<GradesListResponse, GradesQueryParams | void>({
      query: (params) => {
        const queryParams = new URLSearchParams();
        if (params) {
          if (params.page) queryParams.set("page", params.page.toString());
          if (params.limit) queryParams.set("limit", params.limit.toString());
          if (params.studentId) queryParams.set("studentId", params.studentId);
          if (params.courseId) queryParams.set("courseId", params.courseId);
          if (params.assignmentId) queryParams.set("assignmentId", params.assignmentId);
          if (params.teacherId) queryParams.set("teacherId", params.teacherId);
          if (params.search) queryParams.set("search", params.search);
        }
        const queryString = queryParams.toString();
        return `/grades${queryString ? `?${queryString}` : ""}`;
      },
      providesTags: ["Grade"],
    }),

    getGradeById: build.query<Grade, string>({
      query: (id) => `/grades/${id}`,
      providesTags: (result, error, id) => [{ type: "Grade", id }],
    }),

    createGrade: build.mutation<Grade, CreateGradeRequest>({
      query: (body) => ({
        url: "/grades",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Grade"],
    }),

    updateGrade: build.mutation<Grade, { id: string; data: UpdateGradeRequest }>({
      query: ({ id, data }) => ({
        url: `/grades/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Grade", id }, "Grade"],
    }),

    deleteGrade: build.mutation<{ success: boolean; message: string }, string>({
      query: (id) => ({
        url: `/grades/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Grade"],
    }),
  }),
});

export const {
  useGetGradesQuery,
  useGetGradeByIdQuery,
  useCreateGradeMutation,
  useUpdateGradeMutation,
  useDeleteGradeMutation,
} = gradesApi;

