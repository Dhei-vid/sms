import { User } from "../users/users-type";
import { School } from "../schools/schools-type";
import { Pagination, Currency } from "@/common/types";

export interface TransactionResponse {
  status: boolean;
  status_code: number;
  message: "Successful" | string;
  data: Transaction[];
  pagination: Pagination;
}

export interface Transaction {
  id: string;
  creator_id: string;
  updated_by_id?: null | string;
  receiver_id: string;
  school_id?: null | string;
  wallet_id: string;
  payment_type: "deposit" | string;
  payment_method: "fund" | string;
  transaction_type: "income" | string;
  amount: string;
  date?: string | null;
  reference: string;
  description: string;
  category: null;
  currency: Currency;
  channel: null;
  authorization_url: null;
  access_code: null;
  payment_status: "not complete" | string;
  status: "completed" | string;
  is_deleted: false;
  creator: User;
  updated_by?: null | User;
  receiver?: User | null;

  school?: School | null;
  wallet: TransactionWallet;

  created_at: string | null;
  updated_at: string | null;
  deleted_at: string | null;
}

interface TransactionWallet {
  id: string;
  creator_id: string;
  updated_by_id: null;
  school_id: null;
  user_id: string;
  balance: string;
  currency: "NGN" | string;
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
  payment_type: "deposit" | string;
  payment_method: "manual" | string;
  transaction_type: "expense" | "income" | string;
  amount: number;
  date?: string | null;
  reference: string;
  description: string;
  category: "salaries" | string;
  currency: "USD" | string;
  status: "completed" | string;
}

export interface InitializePayment {
  // "school_id": "01jyrdaafjsxp4neh45parbsq5",
  // "receiver_id": "01jyrdaab3r7chxs74zgcrmryd",
  // "sender_id": "01jyrdaafjsxp4neh45parbsq5",
  // "payment_type": "payment",
  payment_gateway: "flutterwave" | string;
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
