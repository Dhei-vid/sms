import { School } from "../schools/schools-type";
import { User, Roles } from "../users/users-type";
import type { ApiListResponse, ApiResponse, ApiDeleteResponse, BaseQueryParams } from "../shared-types";

export type NotificationsListResponse = ApiListResponse<Notifications>;

export interface Notifications {
  id: string;
  creator_id?: null | string;
  updated_by_id?: null | string;
  school_id?: null | string;
  title: string;
  content: string;
  type: "success" | "failed" | string;
  users: string[];
  read_users: [];
  user_details: User[];
  classes?: null;
  target_audience: "general" | string;
  specifics?: null;
  status?: null;
  is_deleted: boolean;
  creator?: null | User;
  updated_by: null;
  school?: null | School;
  created_at?: string | null;
  updated_at?: string | null;
  deleted_at?: null;
}

export interface CreateNotifications {
  school_id: string;
  title: string;
  content: string;
  type: "info" | string;
  status: "active" | string;
  // "users": ["Mathematics", "Physics", "Further Mathematics"],
  classes: string[];
}

export interface UpdateNotifications {
  school_id: string;
  title: string;
  content: string;
  type: "info" | string;
  read_users: string[];
  users: string[];
  classes: string[];
  target_audience: "private" | string;
  specifics: Roles[];
  status: "inactive";
}
