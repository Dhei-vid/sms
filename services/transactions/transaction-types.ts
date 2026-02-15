import { User } from "../users/users-type";
import { School } from "../schools/schools-type";
import { Pagination, Currency } from "@/common/types";
import {
  PaymentMethod,
  PaymentType,
  TransactionType,
  PaymentGateway,
} from "../shared-types";
import type { ApiResponse, BaseQueryParams } from "../shared-types";

export interface TransactionResponse {
  status: boolean;
  status_code: number;
  message: "Successful" | string;
  data: Transaction[];
  pagination?: Pagination;
}

type TransactionCategory = "salaries" | string;
type TransactionStatus = "completed" | "pending" | string;

export interface Transaction {
  id: string;
  creator_id: string;
  updated_by_id?: null | string;
  receiver_id: string;
  school_id?: null | string;
  wallet_id: string;
  payment_type: PaymentType;
  payment_method: PaymentMethod;
  transaction_type: TransactionType;
  amount: string;
  date?: string | null;
  reference: string;
  description: string;
  category: null;
  currency: Currency;
  status: TransactionStatus;
  creator: User;
  updated_by?: null | User;
  receiver?: User | null;
  school?: School | null;
  wallet: TransactionWallet;
  created_at: string | null;
  updated_at: string | null;
}

export interface TransactionWallet {
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
}

export interface CreateTransactions {
  school_id: string;
  amount: number;
}

export interface UpdateTransactions {
  receiver_id: string;
  school_id: string;
  wallet_id: string;
  payment_type: PaymentType;
  payment_method: PaymentMethod;
  transaction_type: TransactionType;
  amount: number;
  date?: string | null;
  reference: string;
  description: string;
  category: TransactionCategory;
  currency: Currency;
  status: TransactionStatus;
}

export interface InitializePayment {
  // "school_id": "01jyrdaafjsxp4neh45parbsq5",
  // "receiver_id": "01jyrdaab3r7chxs74zgcrmryd",
  // "sender_id": "01jyrdaafjsxp4neh45parbsq5",
  // "payment_type": "payment",
  payment_gateway: PaymentGateway;
  amount: number;
}

export interface VerifyTransaction {
  reference: string;
}

export interface TransferMoney {
  name: string;
  account_number: string;
  bank_code: string;
  amount: number;
}

export type TransactionSingleResponse = ApiResponse<Transaction>;

export interface TransactionsQueryParams extends BaseQueryParams {
  wallet_id?: string;
  user_id?: string;
  status?: TransactionStatus;
  payment_type?: PaymentType;
  transaction_type?: TransactionType;
  start_date?: string;
  end_date?: string;
  _all?: boolean | string;
}

export interface InitializePaymentData extends Transaction {
  channel: string;
  authorization_url: string;
  access_code: string;
}

export interface InitializePaymentResponse {
  status: boolean;
  status_code: number;
  message: string;
  data: InitializePaymentData;
}
