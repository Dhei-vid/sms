import { baseApi } from "./baseApi";

export interface TeacherCourse {
  id: string;
  subject: string;
  class: string;
  studentsEnrolled: number;
  contentStatus: string;
}

export const teacherCoursesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTeacherCourses: build.query<TeacherCourse[], void>({
      query: () => "/teacher/courses",
      providesTags: ["TeacherCourse"],
    }),
  }),
});

export const { useGetTeacherCoursesQuery } = teacherCoursesApi;