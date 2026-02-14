import { baseApi } from "../baseApi";
import type {
  Course,
  CreateCourseRequest,
  UpdateCourseRequest,
  ContentSubmission,
  CreateContentSubmissionRequest,
  TeacherActivityItem,
  TeacherActivityLogEntry,
  CoursesQueryParams,
} from "./courses-type";
import type { ApiListResponse, ApiResponse } from "../shared-types";

const BASE = "/courses";

export const coursesApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    getCourses: build.query<
      ApiListResponse<Course> | ApiResponse<Course[]>,
      CoursesQueryParams | void
    >({
      query: (params) => ({
        url: BASE,
        params: params?._all ? { _all: "true", ...params } : params ?? {},
      }),
      providesTags: ["Course"],
    }),
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
    getContentSubmissions: build.query<
      ApiListResponse<ContentSubmission> | ApiResponse<ContentSubmission[]>,
      { _all?: boolean } | void
    >({
      query: (params) => ({
        url: `${BASE}/content/submissions`,
        params: params?._all ? { _all: "true" } : {},
      }),
      providesTags: ["ContentSubmission"],
    }),
    getContentSubmissionById: build.query<ContentSubmission, string>({
      query: (id) => ({ url: `${BASE}/content/submissions/${id}` }),
      providesTags: (_, __, id) => [{ type: "ContentSubmission", id }],
    }),
    updateContentSubmission: build.mutation<
      ContentSubmission,
      { id: string; data: Partial<Pick<ContentSubmission, "status" | "course_location" | "resource_name" | "file_type" | "file_url">> }
    >({
      query: ({ id, data }) => ({
        url: `${BASE}/content/submissions/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (_, __, { id }) => [{ type: "ContentSubmission", id }, "ContentSubmission"],
    }),
    createContentSubmission: build.mutation<ContentSubmission, CreateContentSubmissionRequest>({
      query: (body) => ({
        url: `${BASE}/content/submissions`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["ContentSubmission"],
    }),
    getTeacherActivity: build.query<ApiResponse<TeacherActivityItem[]>, void>({
      query: () => ({ url: `${BASE}/teacher-activity` }),
      providesTags: ["TeacherActivity"],
    }),
    getTeacherActivityLog: build.query<
      ApiResponse<TeacherActivityLogEntry[]>,
      string
    >({
      query: (staffId) => ({
        url: `${BASE}/teachers/${staffId}/activity`,
      }),
      providesTags: (_, __, staffId) => [
        { type: "TeacherActivity", id: `log-${staffId}` },
      ],
    }),
    createTeacherAdministrativeNote: build.mutation<
      ApiResponse<TeacherActivityLogEntry>,
      { staffId: string; note: string }
    >({
      query: ({ staffId, note }) => ({
        url: `${BASE}/teachers/${staffId}/administrative-notes`,
        method: "POST",
        body: { note },
      }),
      invalidatesTags: (_, __, { staffId }) => [
        { type: "TeacherActivity", id: `log-${staffId}` },
      ],
    }),
  }),
});

export const {
  useGetCoursesQuery,
  useGetCourseByIdQuery,
  useCreateCourseMutation,
  useUpdateCourseMutation,
  useDeleteCourseMutation,
  useGetContentSubmissionsQuery,
  useGetContentSubmissionByIdQuery,
  useUpdateContentSubmissionMutation,
  useCreateContentSubmissionMutation,
  useGetTeacherActivityQuery,
  useGetTeacherActivityLogQuery,
  useCreateTeacherAdministrativeNoteMutation,
} = coursesApi;
