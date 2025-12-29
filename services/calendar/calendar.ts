import { baseApi } from "../baseApi";
import type {
  CalendarEvent,
  CreateCalendarEventRequest,
  UpdateCalendarEventRequest,
  CalendarEventsListResponse,
  CalendarEventsQueryParams,
} from "./calendar-type";

export const calendarApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getCalendarEvents: build.query<CalendarEventsListResponse, CalendarEventsQueryParams | void>({
      query: (params) => {
        const queryParams = new URLSearchParams();
        if (params) {
          if (params.page) queryParams.set("page", params.page.toString());
          if (params.limit) queryParams.set("limit", params.limit.toString());
          if (params.startDate) queryParams.set("startDate", params.startDate);
          if (params.endDate) queryParams.set("endDate", params.endDate);
          if (params.type) queryParams.set("type", params.type);
          if (params.search) queryParams.set("search", params.search);
        }
        const queryString = queryParams.toString();
        return `/calendar/events${queryString ? `?${queryString}` : ""}`;
      },
      providesTags: ["CalendarEvent"],
    }),

    getCalendarEventById: build.query<CalendarEvent, string>({
      query: (id) => `/calendar/events/${id}`,
      providesTags: (result, error, id) => [{ type: "CalendarEvent", id }],
    }),

    createCalendarEvent: build.mutation<CalendarEvent, CreateCalendarEventRequest>({
      query: (body) => ({
        url: "/calendar/events",
        method: "POST",
        body,
      }),
      invalidatesTags: ["CalendarEvent"],
    }),

    updateCalendarEvent: build.mutation<CalendarEvent, { id: string; data: UpdateCalendarEventRequest }>({
      query: ({ id, data }) => ({
        url: `/calendar/events/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "CalendarEvent", id }, "CalendarEvent"],
    }),

    deleteCalendarEvent: build.mutation<{ success: boolean; message: string }, string>({
      query: (id) => ({
        url: `/calendar/events/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["CalendarEvent"],
    }),
  }),
});

export const {
  useGetCalendarEventsQuery,
  useGetCalendarEventByIdQuery,
  useCreateCalendarEventMutation,
  useUpdateCalendarEventMutation,
  useDeleteCalendarEventMutation,
} = calendarApi;

