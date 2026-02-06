import { baseApi } from "../baseApi";
import type {
  Course,
  CreateCourseRequest,
  UpdateCourseRequest,
} from "./courses-type";
import type { ApiListResponse } from "../shared-types";

const BASE = "/courses";

export const coursesApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    getCourses: build.query<ApiListResponse<Course>, { limit?: number } | void>(
      {
        query: (params) => ({ url: BASE, params: params ?? {} }),
        providesTags: ["Course"],
      },
    ),
    getCourseById: build.query<Course, string>({
      query: (id) => ({ url: `${BASE}/${id}` }),
      providesTags: (_, __, id) => [{ type: "Course", id }],
    }),
    createCourse: build.mutation<Course, CreateCourseRequest>({
      query: (body) => ({ url: BASE, method: "POST", body }),
      invalidatesTags: ["Course"],
    }),
    updateCourse: build.mutation<
      Course,
      { id: string; data: UpdateCourseRequest }
    >({
      query: ({ id, data }) => ({
        url: `${BASE}/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (_, __, { id }) => [{ type: "Course", id }, "Course"],
    }),
    deleteCourse: build.mutation<
      { success: boolean; message?: string },
      string
    >({
      query: (id) => ({ url: `${BASE}/${id}`, method: "DELETE" }),
      invalidatesTags: (_, __, id) => [{ type: "Course", id }, "Course"],
    }),
  }),
});

export const {
  useGetCoursesQuery,
  useGetCourseByIdQuery,
  useCreateCourseMutation,
  useUpdateCourseMutation,
  useDeleteCourseMutation,
} = coursesApi;
