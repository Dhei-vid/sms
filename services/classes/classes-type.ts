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
  status?: "active" | "inactive";
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
  status?: "active" | "inactive";
}

export interface ClassesListResponse {
  data: Class[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ClassesQueryParams {
  page?: number;
  limit?: number;
  level?: string;
  teacherId?: string;
  status?: "active" | "inactive";
  search?: string;
}

