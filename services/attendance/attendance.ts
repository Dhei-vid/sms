import { baseApi } from "../baseApi";
import type {
  Attendance,
  CreateAttendanceRequest,
  BulkAttendanceRequest,
  AttendanceListResponse,
  AttendanceQueryParams,
} from "./attendance-type";

export const attendanceApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAttendance: build.query<AttendanceListResponse, AttendanceQueryParams | void>({
      query: (params) => {
        const queryParams = new URLSearchParams();
        if (params) {
          if (params.page) queryParams.set("page", params.page.toString());
          if (params.limit) queryParams.set("limit", params.limit.toString());
          if (params.studentId) queryParams.set("studentId", params.studentId);
          if (params.classId) queryParams.set("classId", params.classId);
          if (params.courseId) queryParams.set("courseId", params.courseId);
          if (params.date) queryParams.set("date", params.date);
          if (params.startDate) queryParams.set("startDate", params.startDate);
          if (params.endDate) queryParams.set("endDate", params.endDate);
          if (params.status) queryParams.set("status", params.status);
        }
        const queryString = queryParams.toString();
        return `/attendance${queryString ? `?${queryString}` : ""}`;
      },
      providesTags: ["Attendance"],
    }),

    getAttendanceById: build.query<Attendance, string>({
      query: (id) => `/attendance/${id}`,
      providesTags: (result, error, id) => [{ type: "Attendance", id }],
    }),

    createAttendance: build.mutation<Attendance, CreateAttendanceRequest>({
      query: (body) => ({
        url: "/attendance",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Attendance"],
    }),

    bulkCreateAttendance: build.mutation<{ success: boolean; message: string }, BulkAttendanceRequest>({
      query: (body) => ({
        url: "/attendance/bulk",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Attendance"],
    }),

    updateAttendance: build.mutation<Attendance, { id: string; data: Partial<CreateAttendanceRequest> }>({
      query: ({ id, data }) => ({
        url: `/attendance/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Attendance", id }, "Attendance"],
    }),

    deleteAttendance: build.mutation<{ success: boolean; message: string }, string>({
      query: (id) => ({
        url: `/attendance/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Attendance"],
    }),
  }),
});

export const {
  useGetAttendanceQuery,
  useGetAttendanceByIdQuery,
  useCreateAttendanceMutation,
  useBulkCreateAttendanceMutation,
  useUpdateAttendanceMutation,
  useDeleteAttendanceMutation,
} = attendanceApi;

