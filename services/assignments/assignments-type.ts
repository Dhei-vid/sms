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
  status?: "draft" | "published" | "closed";
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
  status?: "draft" | "published" | "closed";
}

export interface AssignmentsListResponse {
  data: Assignment[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface AssignmentsQueryParams {
  page?: number;
  limit?: number;
  courseId?: string;
  teacherId?: string;
  studentId?: string;
  type?: "assignment" | "quiz" | "exam";
  status?: "draft" | "published" | "closed";
  search?: string;
}

