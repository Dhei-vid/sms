/**
 * Type definitions for Schools API responses
 * These types are based on the API response structure from the backend
 */

/**
 * School entity structure
 */
export interface School {
  id: string;
  name: string;
  code?: string;
  address?: string;
  phone?: string;
  email?: string;
  logo?: string;
  website?: string;
  status?: "active" | "inactive";
  createdAt?: string;
  updatedAt?: string;
}

/**
 * School creation request payload
 */
export interface CreateSchoolRequest {
  name: string;
  code?: string;
  address?: string;
  phone?: string;
  email?: string;
  logo?: string;
  website?: string;
}

/**
 * School update request payload
 */
export interface UpdateSchoolRequest {
  name?: string;
  code?: string;
  address?: string;
  phone?: string;
  email?: string;
  logo?: string;
  website?: string;
  status?: "active" | "inactive";
}

/**
 * Schools list response with pagination
 */
export interface SchoolsListResponse {
  data: School[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

/**
 * School query parameters for filtering and pagination
 */
export interface SchoolsQueryParams {
  page?: number;
  limit?: number;
  status?: "active" | "inactive";
  search?: string;
}

