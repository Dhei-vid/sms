import type {
  GeneralStatus,
  ApiResponse,
  ApiListResponse,
  ApiDeleteResponse,
  BaseQueryParams,
} from "../shared-types";

/**
 * Type definitions for Assignments API responses
 */

export interface Assignment {
  id: string;
  title: string;
  description?: string;
  courseId: string;
  courseName?: string;
  teacherId: string;
  teacherName?: string;
  dueDate: string;
  maxScore?: number;
  type?: "assignment" | "quiz" | "exam";
  status?: "draft" | "published" | "closed" | GeneralStatus;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateAssignmentRequest {
  title: string;
  description?: string;
  courseId: string;
  dueDate: string;
  maxScore?: number;
  type?: "assignment" | "quiz" | "exam";
}

export interface UpdateAssignmentRequest {
  title?: string;
  description?: string;
  dueDate?: string;
  maxScore?: number;
  type?: "assignment" | "quiz" | "exam";
  status?: "draft" | "published" | "closed" | GeneralStatus;
}

/**
 * Assignments list response with pagination
 */
export type AssignmentListResponse = ApiListResponse<Assignment>;

/**
 * Assignment response for single entity operations
 */
export type AssignmentResponse = ApiResponse<Assignment>;

/**
 * Delete assignment response
 */
export type DeleteAssignmentResponse = ApiDeleteResponse;

/**
 * Assignment query parameters for filtering and pagination
 */
export interface AssignmentQueryParams extends BaseQueryParams {
  courseId?: string;
  teacherId?: string;
  studentId?: string;
  type?: "assignment" | "quiz" | "exam";
  status?: "draft" | "published" | "closed" | GeneralStatus;
}

