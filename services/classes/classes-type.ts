import type {
  GeneralStatus,
  ApiResponse,
  ApiListResponse,
  ApiDeleteResponse,
  BaseQueryParams,
} from "../shared-types";

/**
 * Type definitions for Classes API responses
 */

export interface Class {
  id: string;
  name: string;
  code?: string;
  level?: string;
  teacherId?: string;
  teacherName?: string;
  studentCount?: number;
  capacity?: number;
  schoolId?: string;
  status?: GeneralStatus;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateClassRequest {
  name: string;
  code?: string;
  level?: string;
  teacherId?: string;
  capacity?: number;
  schoolId?: string;
}

export interface UpdateClassRequest {
  name?: string;
  code?: string;
  level?: string;
  teacherId?: string;
  capacity?: number;
  status?: GeneralStatus;
}

/**
 * Classes list response with pagination
 */
export type ClassesListResponse = ApiListResponse<Class>;

/**
 * Class response for single entity operations
 */
export type ClassResponse = ApiResponse<Class>;

/**
 * Delete class response
 */
export type DeleteClassResponse = ApiDeleteResponse;

/**
 * Class query parameters for filtering and pagination
 */
export interface ClassesQueryParams extends BaseQueryParams {
  level?: string;
  teacherId?: string;
  status?: GeneralStatus;
}

