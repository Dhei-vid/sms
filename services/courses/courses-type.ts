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
  status?: "active" | "inactive";
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
  status?: "active" | "inactive";
}

export interface CoursesListResponse {
  data: Course[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface CoursesQueryParams {
  page?: number;
  limit?: number;
  teacherId?: string;
  classId?: string;
  subject?: string;
  status?: "active" | "inactive";
  search?: string;
}

