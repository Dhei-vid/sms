import { ResponseStatus } from "@/common/types";
import { User } from "../users/users-type";
import { School } from "../schools/schools-type";

export type NotesListResponse = { data: [] } & ResponseStatus;

export interface Notes {
  id: string;
  creator_id: string;
  updated_by_id: string;
  school_id: string;
  user_id: string;
  title: string;
  description: string;
  type: string;
  users_favorite: string[];
  duration: string;
  learning_objectives: string;
  instructional_materials: string;
  teaching_activities: string;
  assessment: string;
  status: string;
  is_deleted: boolean;
  creator: User;
  updated_by: User;
  school: School;
  user: User;
  users_favorite_details: User[];
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

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
