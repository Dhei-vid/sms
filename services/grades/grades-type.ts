import type {
  ApiResponse,
  ApiListResponse,
  ApiDeleteResponse,
  BaseQueryParams,
} from "../shared-types";

/**
 * Type definitions for Grades API responses
 */

export interface Grade {
  id: string;
  studentId: string;
  studentName?: string;
  courseId: string;
  courseName?: string;
  assignmentId?: string;
  assignmentName?: string;
  score: number;
  maxScore?: number;
  percentage?: number;
  grade?: string;
  remarks?: string;
  teacherId?: string;
  teacherName?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateGradeRequest {
  studentId: string;
  courseId: string;
  assignmentId?: string;
  score: number;
  maxScore?: number;
  remarks?: string;
}

export interface UpdateGradeRequest {
  score?: number;
  maxScore?: number;
  remarks?: string;
}

/**
 * Grades list response with pagination
 */
export type GradeListResponse = ApiListResponse<Grade>;

/**
 * Grade response for single entity operations
 */
export type GradeResponse = ApiResponse<Grade>;

/**
 * Delete grade response
 */
export type DeleteGradeResponse = ApiDeleteResponse;

/**
 * Grade query parameters for filtering and pagination
 */
export interface GradeQueryParams extends BaseQueryParams {
  studentId?: string;
  courseId?: string;
  assignmentId?: string;
  teacherId?: string;
}

