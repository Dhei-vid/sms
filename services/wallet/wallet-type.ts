/**
 * Type definitions for Wallet API responses
 */

export interface Wallet {
  id: string;
  userId: string;
  userName?: string;
  balance: number;
  currency: string;
  status?: "active" | "suspended";
  createdAt?: string;
  updatedAt?: string;
}

export interface WalletTransaction {
  id: string;
  walletId: string;
  type: "credit" | "debit";
  amount: number;
  description: string;
  reference?: string;
  status: "pending" | "completed" | "failed";
  createdAt?: string;
}

export interface CreateWalletTransactionRequest {
  amount: number;
  type: "credit" | "debit";
  description: string;
  reference?: string;
}

export interface WalletTransactionsListResponse {
  data: WalletTransaction[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface WalletTransactionsQueryParams {
  page?: number;
  limit?: number;
  walletId?: string;
  type?: "credit" | "debit";
  status?: "pending" | "completed" | "failed";
  startDate?: string;
  endDate?: string;
}

