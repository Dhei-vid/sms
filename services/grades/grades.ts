import { baseApi } from "../baseApi";
import type {
  Grade,
  CreateGradeRequest,
  UpdateGradeRequest,
  GradesListResponse,
  GradesQueryParams,
} from "./grades-type";

const BASE = "/grades";

export const gradesApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    getGrades: build.query<GradesListResponse, GradesQueryParams | void>({
      query: (params) => ({ url: BASE, params: params ?? {} }),
      providesTags: ["Grade"],
    }),
    getGradeById: build.query<Grade, string>({
      query: (id) => ({ url: `${BASE}/${id}` }),
      providesTags: (_, __, id) => [{ type: "Grade", id }],
    }),
    createGrade: build.mutation<Grade, CreateGradeRequest>({
      query: (body) => ({ url: BASE, method: "POST", body }),
      invalidatesTags: ["Grade"],
    }),
    updateGrade: build.mutation<
      Grade,
      { id: string; data: UpdateGradeRequest }
    >({
      query: ({ id, data }) => ({
        url: `${BASE}/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (_, __, { id }) => [{ type: "Grade", id }, "Grade"],
    }),
    deleteGrade: build.mutation<{ success: boolean; message?: string }, string>(
      {
        query: (id) => ({ url: `${BASE}/${id}`, method: "DELETE" }),
        invalidatesTags: (_, __, id) => [{ type: "Grade", id }, "Grade"],
      },
    ),
  }),
});

export const {
  useGetGradesQuery,
  useGetGradeByIdQuery,
  useCreateGradeMutation,
  useUpdateGradeMutation,
  useDeleteGradeMutation,
} = gradesApi;
