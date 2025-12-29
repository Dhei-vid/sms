import { baseApi } from "../baseApi";
import type {
  Student,
  CreateStudentRequest,
  UpdateStudentRequest,
  StudentsListResponse,
  StudentsQueryParams,
} from "./students-type";

export const studentsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getStudents: build.query<StudentsListResponse, StudentsQueryParams | void>({
      query: (params) => {
        const queryParams = new URLSearchParams();
        if (params) {
          if (params.page) queryParams.set("page", params.page.toString());
          if (params.limit) queryParams.set("limit", params.limit.toString());
          if (params.classId) queryParams.set("classId", params.classId);
          if (params.status) queryParams.set("status", params.status);
          if (params.search) queryParams.set("search", params.search);
        }
        const queryString = queryParams.toString();
        return `/students${queryString ? `?${queryString}` : ""}`;
      },
      providesTags: ["Student"],
    }),

    getStudentById: build.query<Student, string>({
      query: (id) => `/students/${id}`,
      providesTags: (result, error, id) => [{ type: "Student", id }],
    }),

    createStudent: build.mutation<Student, CreateStudentRequest>({
      query: (body) => ({
        url: "/students",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Student"],
    }),

    updateStudent: build.mutation<Student, { id: string; data: UpdateStudentRequest }>({
      query: ({ id, data }) => ({
        url: `/students/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Student", id }, "Student"],
    }),

    deleteStudent: build.mutation<{ success: boolean; message: string }, string>({
      query: (id) => ({
        url: `/students/${id}`,
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

