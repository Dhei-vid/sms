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
  status: "pending" | "approved" | "rejected" | "enrolled";
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

export interface AdmissionsListResponse {
  data: Admission[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface AdmissionsQueryParams {
  page?: number;
  limit?: number;
  status?: "pending" | "approved" | "rejected" | "enrolled";
  classId?: string;
  search?: string;
  startDate?: string;
  endDate?: string;
}

