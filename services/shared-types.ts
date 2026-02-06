import { Pagination } from "@/common/types";

/**
 * Shared type definitions for all services
 * These types are used across multiple service modules to ensure consistency
 */

/**
 * User roles in the system
 */
export type Roles =
  | "teacher"
  | "student"
  | "parent"
  | "admin"
  | "canteen"
  | string;

/**
 * Gender options
 */
export type Gender = "male" | "female" | "other" | string;

/**
 * Common status values
 */
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

/**
 * Payment response structure
 */
export type PaymentGateway = "paystack" | "flutterwave" | string;

/**
 * Standard API response wrapper for single entity responses
 * Used for getById, create, update operations
 */
export interface ApiResponse<T> {
  status: boolean;
  status_code: number;
  message: string;
  data: T;
}

/**
 * Standard API response wrapper for list responses with pagination
 * Used for getAll/list operations
 */
export interface ApiListResponse<T> {
  status: boolean;
  status_code: number;
  message: string;
  data: T[];
  pagination: Pagination;
}

/**
 * Standard API response wrapper for delete operations
 */
export interface ApiDeleteResponse {
  status: boolean;
  status_code: number;
  message: string;
  data?: null;
}

/**
 * Standard query parameters for pagination
 */
export interface BaseQueryParams {
  page?: number;
  limit?: number;
  search?: string;
}
