/**
 * Type definitions for Users API responses
 * These types are based on the API response structure from the backend
 */

/**
 * User entity structure
 */
export interface User {
  id: string;
  name: string;
  email: string;
  role: "teacher" | "student" | "parent" | "admin" | "canteen";
  phone?: string;
  avatar?: string;
  status?: "active" | "inactive" | "suspended";
  createdAt?: string;
  updatedAt?: string;
}

/**
 * User creation request payload
 */
export interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
  role: "teacher" | "student" | "parent" | "admin" | "canteen";
  phone?: string;
}

/**
 * User update request payload
 */
export interface UpdateUserRequest {
  name?: string;
  email?: string;
  phone?: string;
  role?: "teacher" | "student" | "parent" | "admin" | "canteen";
  status?: "active" | "inactive" | "suspended";
  avatar?: string;
}

/**
 * Users list response with pagination
 */
export interface UsersListResponse {
  data: User[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

/**
 * User query parameters for filtering and pagination
 */
export interface UsersQueryParams {
  page?: number;
  limit?: number;
  role?: "teacher" | "student" | "parent" | "admin" | "canteen";
  status?: "active" | "inactive" | "suspended";
  search?: string;
}

