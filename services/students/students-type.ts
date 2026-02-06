import { User } from "../users/users-type";
import type {
  StudentStatus,
  ApiResponse,
  ApiListResponse,
  ApiDeleteResponse,
  BaseQueryParams,
} from "../shared-types";

/**
 * Type definitions for Students API responses
 */

export interface Student {
  id: string;
  creator_id: string;
  updated_by_id: string | null;
  username: string | null;
  first_name: string;
  last_name: string;
  middle_name: string;
  date_of_birth: string | null;
  email: string;
  phone?: string;
  studentId: string;
  classId?: string;
  className?: string;
  parentId?: string;
  parentName?: string;
  dateOfBirth?: string;
  address?: string;
  avatar?: string;
  status?: StudentStatus;
  admissionDate?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateStudentRequest {
  name: string;
  email: string;
  password: string;
  studentId: string;
  classId?: string;
  parentId?: string;
  phone?: string;
  dateOfBirth?: string;
  address?: string;
}

export interface UpdateStudentRequest {
  name?: string;
  email?: string;
  phone?: string;
  classId?: string;
  parentId?: string;
  address?: string;
  status?: StudentStatus;
}

/**
 * Students list response with pagination
 */
export type StudentsListResponse = ApiListResponse<Student>;

/**
 * Student response for single entity operations
 */
export type StudentResponse = ApiResponse<Student>;

/**
 * Delete student response
 */
export type DeleteStudentResponse = ApiDeleteResponse;

/**
 * Student query parameters for filtering and pagination
 */
export interface StudentsQueryParams extends BaseQueryParams {
  classId?: string;
  status?: StudentStatus;
}
