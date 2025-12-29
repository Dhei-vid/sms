/**
 * Type definitions for Parent dashboard API responses
 * These types are based on the API response structure from the backend
 */

/**
 * Invoice/Fee structure for parent dashboard
 */
export interface Invoice {
  id: string;
  name: string;
  amount: string;
  dateDue: string;
  status?: "pending" | "paid" | "overdue";
  description?: string;
  studentId?: string;
  studentName?: string;
}

/**
 * Payment record structure
 */
export interface Payment {
  id: string;
  description: string;
  paymentDate: string;
  amountPaid: string;
  status: "completed" | "pending" | "failed";
  invoiceId?: string;
  transactionId?: string;
  paymentMethod?: string;
}

/**
 * Payment request payload
 */
export interface PaymentRequest {
  invoiceIds: string[];
  amount: number;
  paymentMethod: string;
  // Additional payment fields will be added based on API requirements
}

/**
 * Payment response
 */
export interface PaymentResponse {
  success: boolean;
  transactionId?: string;
  message?: string;
  // Additional response fields will be added based on API response
}

/**
 * Wallet balance information
 */
export interface WalletBalance {
  balance: number;
  currency: string;
  lastUpdated?: string;
}

/**
 * Fee request structure
 */
export interface FeeRequest {
  id: string;
  studentId: string;
  amount: number;
  description: string;
  status: "pending" | "approved" | "rejected";
  requestedDate: string;
  // Additional fields will be added based on API response
}

