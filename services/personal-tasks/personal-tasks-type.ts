import type { ApiResponse, ApiListResponse } from "../shared-types";

export type PersonalTaskStatus = "pending" | "completed";
export type PersonalTaskType = "study" | "personal" | "other";

export interface PersonalTask {
  id: string;
  user_id: string;
  task_name: string;
  task_type: PersonalTaskType;
  deadline: string | null;
  status: PersonalTaskStatus;
  created_at: string;
  updated_at: string;
}

export interface CreatePersonalTaskRequest {
  user_id?: string;
  studentId?: string;
  task_name: string;
  task_type: PersonalTaskType;
  deadline?: string | null;
  status?: PersonalTaskStatus;
}

export interface UpdatePersonalTaskRequest {
  task_name?: string;
  task_type?: PersonalTaskType;
  deadline?: string | null;
  status?: PersonalTaskStatus;
}

export interface PersonalTasksQueryParams {
  user_id?: string;
  studentId?: string;
  _all?: boolean;
}

export type PersonalTasksListResponse = ApiListResponse<PersonalTask>;
