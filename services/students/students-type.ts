/**
 * Type definitions for Students API responses
 */

export interface Student {
  id: string;
  name: string;
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
  status?: "active" | "inactive" | "graduated" | "suspended";
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
  status?: "active" | "inactive" | "graduated" | "suspended";
}

export interface StudentsListResponse {
  data: Student[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface StudentsQueryParams {
  page?: number;
  limit?: number;
  classId?: string;
  status?: "active" | "inactive" | "graduated" | "suspended";
  search?: string;
}

