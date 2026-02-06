import type {
  ApiListResponse,
  ApiResponse,
  ApiDeleteResponse,
  BaseQueryParams,
} from "../shared-types";

export interface Assignment {
  id: string;
  title?: string;
  dueDate?: string;
  studentId?: string;
  [key: string]: unknown;
}

export interface CreateAssignmentRequest {
  school_id?: string;
  title?: string;
  [key: string]: unknown;
}

export interface UpdateAssignmentRequest {
  title?: string;
  dueDate?: string;
  [key: string]: unknown;
}

export type AssignmentsListResponse = ApiListResponse<Assignment>;
export interface AssignmentsQueryParams extends BaseQueryParams {
  studentId?: string;
  limit?: number;
}
