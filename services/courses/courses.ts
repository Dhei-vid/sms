import { baseApi } from "../baseApi";
import type {
  Course,
  CreateCourseRequest,
  UpdateCourseRequest,
  CoursesListResponse,
  CoursesQueryParams,
} from "./courses-type";

export const coursesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getCourses: build.query<CoursesListResponse, CoursesQueryParams | void>({
      query: (params) => {
        const queryParams = new URLSearchParams();
        if (params) {
          if (params.page) queryParams.set("page", params.page.toString());
          if (params.limit) queryParams.set("limit", params.limit.toString());
          if (params.teacherId) queryParams.set("teacherId", params.teacherId);
          if (params.classId) queryParams.set("classId", params.classId);
          if (params.subject) queryParams.set("subject", params.subject);
          if (params.status) queryParams.set("status", params.status);
          if (params.search) queryParams.set("search", params.search);
        }
        const queryString = queryParams.toString();
        return `/courses${queryString ? `?${queryString}` : ""}`;
      },
      providesTags: ["Course"],
    }),

    getCourseById: build.query<Course, string>({
      query: (id) => `/courses/${id}`,
      providesTags: (result, error, id) => [{ type: "Course", id }],
    }),

    createCourse: build.mutation<Course, CreateCourseRequest>({
      query: (body) => ({
        url: "/courses",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Course"],
    }),

    updateCourse: build.mutation<Course, { id: string; data: UpdateCourseRequest }>({
      query: ({ id, data }) => ({
        url: `/courses/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Course", id }, "Course"],
    }),

    deleteCourse: build.mutation<{ success: boolean; message: string }, string>({
      query: (id) => ({
        url: `/courses/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Course"],
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

