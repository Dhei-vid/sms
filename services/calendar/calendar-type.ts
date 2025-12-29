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

export interface CalendarEventsListResponse {
  data: CalendarEvent[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface CalendarEventsQueryParams {
  page?: number;
  limit?: number;
  startDate?: string;
  endDate?: string;
  type?: "event" | "holiday" | "exam" | "meeting" | "deadline";
  search?: string;
}

