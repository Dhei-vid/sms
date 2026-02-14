import { baseApi } from "../baseApi";
import type {
  ScheduleEvent,
  ScheduleEventListResponse,
  CreateScheduleEventPayload,
} from "./schedule-types";
import type { ApiResponse } from "../shared-types";

const BASE = "/schedules";

export interface SchedulesQueryParams {
  _all?: boolean;
  page?: number;
  limit?: number;
  "type[eq]"?: string;
  "school_id[eq]"?: string;
  "date[gte]"?: string;
  "date[lte]"?: string;
}

export const schedulesApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    getSchedules: build.query<
      ScheduleEventListResponse | { data: ScheduleEvent[] },
      SchedulesQueryParams | void
    >({
      query: (params) => ({ url: BASE, params: params ?? {} }),
      providesTags: ["Schedule"],
    }),

    getUpcomingEvents: build.query<
      { data: ScheduleEvent[] },
      { limit?: number } | void
    >({
      query: (params) => {
        const today = new Date().toISOString().split("T")[0];
        return {
          url: BASE,
          params: {
            _all: "true",
            "type[eq]": "event",
            "date[gte]": today,
          },
        };
      },
      transformResponse: (response: { data?: ScheduleEvent[] }, _meta, arg) => {
        const list = response?.data ?? [];
        const limit = arg?.limit ?? 5;
        return { data: list.slice(0, limit) };
      },
      providesTags: ["Schedule"],
    }),
    getExamSchedules: build.query<
      { data: ScheduleEvent[] },
      { dateFrom?: string; dateTo?: string; schoolId?: string } | void
    >({
      query: (params) => {
        const queryParams: Record<string, string> = { _all: "true", "type[eq]": "exam" };
        if (params?.dateFrom) queryParams["date[gte]"] = params.dateFrom;
        if (params?.dateTo) queryParams["date[lte]"] = params.dateTo;
        if (params?.schoolId) queryParams["school_id[eq]"] = params.schoolId;
        return { url: BASE, params: queryParams };
      },
      transformResponse: (response: { data?: ScheduleEvent[] }): { data: ScheduleEvent[] } => ({
        data: response?.data ?? [],
      }),
      providesTags: ["Schedule"],
    }),

    getScheduleById: build.query<ApiResponse<ScheduleEvent>, string>({
      query: (id) => ({ url: `${BASE}/${id}` }),
      providesTags: (_, __, id) => [{ type: "Schedule", id }],
    }),

    createSchedule: build.mutation<
      ApiResponse<ScheduleEvent>,
      CreateScheduleEventPayload
    >({
      query: (body) => ({ url: BASE, method: "POST", body }),
      invalidatesTags: ["Schedule"],
    }),

    updateSchedule: build.mutation<
      ApiResponse<ScheduleEvent>,
      { id: string; data: Partial<CreateScheduleEventPayload> }
    >({
      query: ({ id, data }) => ({
        url: `${BASE}/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (_, __, { id }) => [
        { type: "Schedule", id },
        "Schedule",
      ],
    }),

    deleteSchedule: build.mutation<
      { status: boolean; message: string },
      string
    >({
      query: (id) => ({ url: `${BASE}/${id}`, method: "DELETE" }),
      invalidatesTags: (_, __, id) => [{ type: "Schedule", id }, "Schedule"],
    }),
  }),
});

export const {
  useGetSchedulesQuery,
  useGetUpcomingEventsQuery,
  useGetExamSchedulesQuery,
  useGetScheduleByIdQuery,
  useCreateScheduleMutation,
  useUpdateScheduleMutation,
  useDeleteScheduleMutation,
} = schedulesApi;
