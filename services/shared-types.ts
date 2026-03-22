import { Pagination } from "@/common/types";

export type Roles =
  | "teacher"
  | "staff"
  | "student"
  | "parent"
  | "admin"
  | "vendor"
  | string;

export type Gender = "male" | "female" | "other" | string;

export type UserStatus = "active" | "inactive" | "suspended" | string;
export type StudentStatus =
  | "active"
  | "inactive"
  | "graduated"
  | "suspended"
  | string;

export type OrderStatus =
  | "pending"
  | "processing"
  | "completed"
  | "cancelled"
  | string;
export type PaymentStatus = "pending" | "paid" | "failed" | "refunded" | string;
export type FeeStatus = "pending" | "paid" | "overdue" | "partial" | string;
export type GeneralStatus = "active" | "inactive" | string;
export type PaymentMethod = "manual" | "fund" | string;
export type PaymentType = "fees" | "subscription" | "order" | string;
export type TransactionType = "income" | "expense" | string;
export type AdmissionStatus =
  | "inquiry"
  | "application_started"
  | "submitted_forms"
  | "under_review"
  | "accepted_offers"
  | "enrolled"
  | "rejected"
  | string;

export interface AdmissionApplication {
  id: string;
  stakeholder_id: string;
  name: string;
  classApplyingFor: string | null;
  dateSubmitted: string;
  timeSubmitted: string;
  stage: number;
  statusLabel: string;
  admission_number: string | null;
  created_at?: string;
}

export type PaymentGateway = "paystack" | "flutterwave" | string;

export interface ApiResponse<T> {
  status: boolean;
  status_code: number;
  message: string;
  data: T;
}

export interface ApiListResponse<T> {
  status: boolean;
  status_code: number;
  message: string;
  data: T[];
  pagination: Pagination;
}

export interface ApiDeleteResponse {
  status: boolean;
  status_code: number;
  message: string;
  data?: null;
}

export interface BaseQueryParams {
  page?: number;
  limit?: number;
  search?: string;
}
