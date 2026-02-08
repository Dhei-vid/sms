import { School } from "../schools/schools-type";
import { User, Roles } from "../users/users-type";
import type {
  ApiListResponse,
  ApiResponse,
  ApiDeleteResponse,
  BaseQueryParams,
} from "../shared-types";

export type NotificationsListResponse = ApiListResponse<Notifications>;

type NotificationsType = "info" | string;
type NotificationsStatus = "inactive" | "active";
type TargetAudience = "general" | "private" | string;

export interface Notifications {
  id: string;
  creator_id?: null | string;
  updated_by_id?: null | string;
  school_id?: null | string;
  title: string;
  content: string;
  type: NotificationsType;
  users: string[];
  read_users: string[];
  user_details: User[];
  classes?: string[];
  target_audience: TargetAudience;
  specifics?: Roles[];
  status?: NotificationsStatus;
  is_deleted: boolean;
  creator?: null | User;
  updated_by: null | User;
  school?: null | School;
  created_at?: string | null;
  updated_at?: string | null;
  deleted_at?: null;
}

export interface CreateNotifications {
  school_id: string;
  title: string;
  content: string;
  type: NotificationsType;
  status: NotificationsStatus;
  classes: string[];
}

export interface UpdateNotifications {
  school_id: string;
  title: string;
  content: string;
  type: NotificationsType;
  read_users: string[];
  users: string[];
  classes: string[];
  target_audience: TargetAudience;
  specifics: Roles[];
  status: NotificationsStatus;
}
