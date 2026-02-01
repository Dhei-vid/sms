import type { ApiListResponse, BaseQueryParams } from "../shared-types";

export interface CalendarEvent {
  id: string;
  title?: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  [key: string]: unknown;
}

export type CalendarEventsListResponse = ApiListResponse<CalendarEvent>;
export interface CalendarEventsQueryParams extends BaseQueryParams {
  limit?: number;
}
