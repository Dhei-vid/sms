import { baseApi } from "../baseApi";
import type { CalendarEvent, CalendarEventsListResponse, CalendarEventsQueryParams } from "./calendar-type";

const BASE = "/calendar/events";

export const calendarApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    getCalendarEvents: build.query<CalendarEventsListResponse, CalendarEventsQueryParams | void>({
      query: (params) => ({ url: BASE, params: params ?? {} }),
      providesTags: ["CalendarEvent"],
    }),
    getCalendarEventById: build.query<CalendarEvent, string>({
      query: (id) => ({ url: `${BASE}/${id}` }),
      providesTags: (_, __, id) => [{ type: "CalendarEvent", id }],
    }),
  }),
});

export const {
  useGetCalendarEventsQuery,
  useGetCalendarEventByIdQuery,
} = calendarApi;
