import { Currency } from "@/common/types";
import { User } from "../users/users-type";
import { School } from "../schools/schools-type";
import type {
  ApiResponse,
  ApiListResponse,
  ApiDeleteResponse,
  BaseQueryParams,
} from "../shared-types";

/**
 * Type definitions for Wallet API responses
 */

export interface Wallet {
  id: string;
  creator_id: string;
  updated_by_id: null;
  school_id: null;
  user_id: string;
  balance: string;
  currency: Currency;
  status: null | string;
  created_at?: string | null;
  updated_at?: string | null;

  is_deleted: boolean;
  creator: User;
  updated_by?: null | User;
  school: null | School;
  user: User;
  deleted_at?: string | null;
}

export interface WalletBalance {}

export interface CreateWalletRequest {
  school_id?: string;
  user_id: string;
  balance: number;
  currency: Currency;
  status: string;
}

export interface UpdateWalletRequest {
  school_id?: string;
  user_id: string;
  balance: number;
  currency: Currency;
  status: string;
}

export interface FundWalletPayload {
  receiver_id: string;
  amount: number;
  currency: Currency;
}

export interface TransferFundsPayload {
  receiver_id: string;
  amount: number;
}

export interface MakePaymentsPayload {
  payment_type: "order" | "subscription" | "fees";
  amount: number;
  school_id: string;
  user_id?: string;
  receiver_id?: string;
  order_id?: string;
  fees_type?: string;
  subscription_id?: string;
  duration?: number;
}

/**
 * Wallet transactions list response with pagination
 */
export type WalletTransactionListResponse = ApiListResponse<Wallet>;

/**
 * Wallet response for single entity operations
 */
export type WalletResponse = ApiResponse<Wallet>;

/**
 * Delete wallet response
 */
export type DeleteWalletResponse = ApiDeleteResponse;

/**
 * Wallet transaction query parameters for filtering and pagination
 */
export interface WalletTransactionQueryParams extends BaseQueryParams {}
