import { ResponseStatus } from "@/common/types";
import { User } from "../users/users-type";
import { School } from "../schools/schools-type";

export type NotesListResponse = { data: Notes[] } & ResponseStatus;

export interface Notes {
  id: string;
  creator_id: string;
  updated_by_id: string | null;
  school_id: string | null;
  user_id: string | null;
  title: string;
  description: string;
  type: string;
  users_favorite: string[];
  duration: string | null;
  learning_objectives: string | null;
  instructional_materials: string | null;
  teaching_activities: string | null;
  assessment: string | null;
  status: string | null;
  is_deleted: boolean;
  creator?: User;
  updated_by?: User | null;
  school?: School | null;
  user?: User | null;
  users_favorite_details?: User[];
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface CreateNotesRequest {
  school_id: string;
  title: string;
  description: string;
  type?: "system" | "custom" | "lesson" | "others";
  status?: string;
}

export interface UpdateNotesRequest {
  school_id?: string;
  user_id?: string;
  title?: string;
  description?: string;
  type?: string;
  status?: string;
  users_favorite?: string[];
  duration?: string;
  learning_objectives?: string;
  instructional_materials?: string;
  teaching_activities?: string;
  assessment?: string;
}
