import type {
  ApiResponse,
  ApiListResponse,
  ApiDeleteResponse,
  BaseQueryParams,
} from "../shared-types";

/**
 * Type definitions for Calendar/Events API responses
 */

export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  startDate: string;
  endDate?: string;
  type?: "event" | "holiday" | "exam" | "meeting" | "deadline";
  location?: string;
  createdBy?: string;
  attendees?: string[];
  isAllDay?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateCalendarEventRequest {
  title: string;
  description?: string;
  startDate: string;
  endDate?: string;
  type?: "event" | "holiday" | "exam" | "meeting" | "deadline";
  location?: string;
  attendees?: string[];
  isAllDay?: boolean;
}

export interface UpdateCalendarEventRequest {
  title?: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  type?: "event" | "holiday" | "exam" | "meeting" | "deadline";
  location?: string;
  attendees?: string[];
  isAllDay?: boolean;
}

/**
 * Calendar events list response with pagination
 */
export type CalendarEventListResponse = ApiListResponse<CalendarEvent>;

/**
 * Calendar event response for single entity operations
 */
export type CalendarEventResponse = ApiResponse<CalendarEvent>;

/**
 * Delete calendar event response
 */
export type DeleteCalendarEventResponse = ApiDeleteResponse;

/**
 * Calendar event query parameters for filtering and pagination
 */
export interface CalendarEventQueryParams extends BaseQueryParams {
  startDate?: string;
  endDate?: string;
  type?: "event" | "holiday" | "exam" | "meeting" | "deadline";
}

