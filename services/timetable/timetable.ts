import { baseApi } from "../baseApi";
import type {
  TimetableEntry,
  CreateTimetableEntryRequest,
  UpdateTimetableEntryRequest,
  TimetableListResponse,
  TimetableQueryParams,
} from "./timetable-type";

export const timetableApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTimetable: build.query<TimetableListResponse, TimetableQueryParams | void>({
      query: (params) => {
        const queryParams = new URLSearchParams();
        if (params) {
          if (params.page) queryParams.set("page", params.page.toString());
          if (params.limit) queryParams.set("limit", params.limit.toString());
          if (params.classId) queryParams.set("classId", params.classId);
          if (params.courseId) queryParams.set("courseId", params.courseId);
          if (params.teacherId) queryParams.set("teacherId", params.teacherId);
          if (params.dayOfWeek !== undefined) queryParams.set("dayOfWeek", params.dayOfWeek.toString());
          if (params.status) queryParams.set("status", params.status);
        }
        const queryString = queryParams.toString();
        return `/timetable${queryString ? `?${queryString}` : ""}`;
      },
      providesTags: ["Timetable"],
    }),

    getTimetableById: build.query<TimetableEntry, string>({
      query: (id) => `/timetable/${id}`,
      providesTags: (result, error, id) => [{ type: "Timetable", id }],
    }),

    createTimetableEntry: build.mutation<TimetableEntry, CreateTimetableEntryRequest>({
      query: (body) => ({
        url: "/timetable",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Timetable"],
    }),

    updateTimetableEntry: build.mutation<TimetableEntry, { id: string; data: UpdateTimetableEntryRequest }>({
      query: ({ id, data }) => ({
        url: `/timetable/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Timetable", id }, "Timetable"],
    }),

    deleteTimetableEntry: build.mutation<{ success: boolean; message: string }, string>({
      query: (id) => ({
        url: `/timetable/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Timetable"],
    }),
  }),
});

export const {
  useGetTimetableQuery,
  useGetTimetableByIdQuery,
  useCreateTimetableEntryMutation,
  useUpdateTimetableEntryMutation,
  useDeleteTimetableEntryMutation,
} = timetableApi;

