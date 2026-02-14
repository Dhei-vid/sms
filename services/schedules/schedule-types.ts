import { ResponseStatus } from "@/common/types";

export interface ScheduleEvent {
  id: string;
  creator_id: string;
  updated_by_id: string | null;
  school_id: string | null;
  invigilator_id: string | null;
  title: string;
  description: string;
  type: "meeting" | "exam" | "event" | string;
  date: string; // YYYY-MM-DD
  start_time: string; // HH:mm:ss.SSSSSS
  end_time: string; // HH:mm:ss.SSSSSS
  location: string | null;
  target_audience: "general" | "private" | "others" | string;
  specifics: string[] | null;
  status: "scheduled" | "cancelled" | "completed" | null;
  is_deleted: boolean;

  // relational expansions (nullable)
  updated_by: unknown | null;
  school: unknown | null;
  invigilator: unknown | null;

  created_at: string; // ISO timestamp
  updated_at: string; // ISO timestamp
  deleted_at: string | null;
}

export type ScheduleEventListResponse = {
  data: ScheduleEvent[];
} & ResponseStatus;

export interface CreateScheduleEventPayload {
  school_id: string;

  title: string;
  description: string;

  type?: "notice" | "exam" | "event" | "meeting" | "others" | string;

  date: string;
  start_time: string;
  end_time: string;

  location?: string;

  status?: "active" | "inactive" | "cancelled";

  target_audience?: "general" | "private" | "others";
  specifics?: string[]; // e.g. ["teacher", "student", "parent", "staff"]

  invigilator_id?: string | null;
}

export interface UpdateScheduleEventPayloadStrict {
  school_id: string;
  invigilator_id: string;

  title: string;
  description: string;

  type: "meeting" | "exam" | "event" | string;

  date: string;
  start_time: string;
  end_time: string;

  location: string;

  target_audience: "general" | "private" | "students" | "staff" | string;
  specifics: string[];

  status: "active" | "inactive" | "cancelled";
}
