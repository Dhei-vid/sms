import { ResponseStatus } from "@/common/types";

export type NotesListResponse = { data: [] } & ResponseStatus;

export interface Notes {}

export interface CreateNotesRequest {
  school_id: string;
  // "user_id": "01jx31yxcbenpyaeg945dnh67m",
  title: string;
  description: string;
  type: "system" | "custom" | "others"; // system, custom, others
  status: string;
}

export interface UpdateNotesRequest {
  school_id: string;
  user_id: string;
  title: string;
  description: string;
  type: "lesson";
  status: "inactive";
  users_favorite: string[];
  duration: string;
  learning_objectives: string;
  instructional_materials: string;
  teaching_activities: string;
  assessment: string;
}
