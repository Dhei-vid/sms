import type {
  GeneralStatus,
  ApiResponse,
  ApiListResponse,
  ApiDeleteResponse,
  BaseQueryParams,
} from "../shared-types";

/**
 * Type definitions for Courses API responses
 */

export interface Course {
  id: string;
  name: string;
  code?: string;
  description?: string;
  subject?: string;
  teacherId?: string;
  teacherName?: string;
  classId?: string;
  className?: string;
  credits?: number;
  status?: GeneralStatus;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateCourseRequest {
  name: string;
  code?: string;
  description?: string;
  subject?: string;
  teacherId?: string;
  classId?: string;
  credits?: number;
}

export interface UpdateCourseRequest {
  name?: string;
  code?: string;
  description?: string;
  subject?: string;
  teacherId?: string;
  classId?: string;
  credits?: number;
  status?: GeneralStatus;
}

/**
 * Courses list response with pagination
 */
export type CourseListResponse = ApiListResponse<Course>;

/**
 * Course response for single entity operations
 */
export type CourseResponse = ApiResponse<Course>;

/**
 * Delete course response
 */
export type DeleteCourseResponse = ApiDeleteResponse;

/**
 * Course query parameters for filtering and pagination
 */
export interface CourseQueryParams extends BaseQueryParams {
  teacherId?: string;
  classId?: string;
  subject?: string;
  status?: GeneralStatus;
}

