/**
 * Type definitions for Fees API responses
 */

export interface Fee {
  id: string;
  studentId: string;
  studentName?: string;
  invoiceNumber?: string;
  description: string;
  amount: number;
  dueDate: string;
  status: "pending" | "paid" | "overdue" | "partial";
  paidAmount?: number;
  paymentDate?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateFeeRequest {
  studentId: string;
  description: string;
  amount: number;
  dueDate: string;
}

export interface UpdateFeeRequest {
  description?: string;
  amount?: number;
  dueDate?: string;
  status?: "pending" | "paid" | "overdue" | "partial";
}

export interface FeesListResponse {
  data: Fee[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface FeesQueryParams {
  page?: number;
  limit?: number;
  studentId?: string;
  status?: "pending" | "paid" | "overdue" | "partial";
  startDate?: string;
  endDate?: string;
  search?: string;
}

