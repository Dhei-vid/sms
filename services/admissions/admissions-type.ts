import type {
  AdmissionStatus,
  ApiResponse,
  ApiListResponse,
  ApiDeleteResponse,
  BaseQueryParams,
} from "../shared-types";

/**
 * Type definitions for Admissions API responses
 */

export interface Admission {
  id: string;
  applicantName: string;
  applicantEmail: string;
  applicantPhone?: string;
  dateOfBirth?: string;
  classId?: string;
  className?: string;
  status: AdmissionStatus;
  applicationDate: string;
  documents?: string[];
  remarks?: string;
  reviewedBy?: string;
  reviewedAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateAdmissionRequest {
  applicantName: string;
  applicantEmail: string;
  applicantPhone?: string;
  dateOfBirth?: string;
  classId?: string;
  documents?: string[];
  remarks?: string;
}

export interface UpdateAdmissionRequest {
  applicantName?: string;
  applicantEmail?: string;
  applicantPhone?: string;
  classId?: string;
  status?: "pending" | "approved" | "rejected" | "enrolled";
  remarks?: string;
}

/**
 * Admissions list response with pagination
 */
export type AdmissionsListResponse = ApiListResponse<Admission>;

/**
 * Admission response for single entity operations
 */
export type AdmissionResponse = ApiResponse<Admission>;

/**
 * Delete admission response
 */
export type DeleteAdmissionResponse = ApiDeleteResponse;

/**
 * Admission query parameters for filtering and pagination
 */
export interface AdmissionsQueryParams extends BaseQueryParams {
  status?: AdmissionStatus;
  classId?: string;
  startDate?: string;
  endDate?: string;
}

