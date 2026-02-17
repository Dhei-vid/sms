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
  /** Assignment type e.g. "quiz", "general", "test", "practice" */
  type?: string;
  /** Max score / total marks (from API) */
  maxScore?: number | string;
  /** Course/subject name (from API) */
  courseName?: string;
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
