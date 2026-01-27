/**
 * Type definitions for Leave Requests API responses
 */

export interface LeaveRequest {
  id: string;
  userId: string;
  userName?: string;
  userRole?: string;
  leaveType: "sick" | "vacation" | "personal" | "emergency" | "other";
  startDate: string;
  endDate: string;
  reason: string;
  status: "pending" | "approved" | "rejected";
  reviewedBy?: string;
  reviewedAt?: string;
  remarks?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateLeaveRequestRequest {
  leaveType: "sick" | "vacation" | "personal" | "emergency" | "other";
  startDate: string;
  endDate: string;
  reason: string;
}

export interface UpdateLeaveRequestRequest {
  leaveType?: "sick" | "vacation" | "personal" | "emergency" | "other";
  startDate?: string;
  endDate?: string;
  reason?: string;
  status?: "pending" | "approved" | "rejected";
  remarks?: string;
}

export interface LeaveRequestsListResponse {
  data: LeaveRequest[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface LeaveRequestsQueryParams {
  page?: number;
  limit?: number;
  userId?: string;
  status?: "pending" | "approved" | "rejected";
  leaveType?: "sick" | "vacation" | "personal" | "emergency" | "other";
  startDate?: string;
  endDate?: string;
}
