import { baseApi } from "./baseApi";

export interface TeacherQuestion {
  id: string;
  courseId: string;
  questionText: string;
  difficulty?: string;
}

export const teacherQuestionsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTeacherQuestions: build.query<
      TeacherQuestion[],
      { courseId?: string } | void
    >({
      query: (arg) => {
        const params = new URLSearchParams();
        if (arg && arg.courseId) {
          params.set("courseId", arg.courseId);
        }
        const queryString = params.toString();
        return `/teacher/questions${queryString ? `?${queryString}` : ""}`;
      },
      providesTags: ["TeacherQuestion"],
    }),
  }),
});

export const { useGetTeacherQuestionsQuery } = teacherQuestionsApi;