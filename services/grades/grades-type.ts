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

export interface GradesListResponse {
  data: Grade[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface GradesQueryParams {
  page?: number;
  limit?: number;
  studentId?: string;
  courseId?: string;
  assignmentId?: string;
  teacherId?: string;
  search?: string;
}

