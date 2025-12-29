import { baseApi } from "../baseApi";
import type {
  Wallet,
  WalletTransaction,
  CreateWalletTransactionRequest,
  WalletTransactionsListResponse,
  WalletTransactionsQueryParams,
} from "./wallet-type";

export const walletApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getWallet: build.query<Wallet, string | void>({
      query: (userId) => {
        if (userId) {
          return `/wallet?userId=${userId}`;
        }
        return "/wallet";
      },
      providesTags: ["Wallet"],
    }),

    getWalletTransactions: build.query<WalletTransactionsListResponse, WalletTransactionsQueryParams | void>({
      query: (params) => {
        const queryParams = new URLSearchParams();
        if (params) {
          if (params.page) queryParams.set("page", params.page.toString());
          if (params.limit) queryParams.set("limit", params.limit.toString());
          if (params.walletId) queryParams.set("walletId", params.walletId);
          if (params.type) queryParams.set("type", params.type);
          if (params.status) queryParams.set("status", params.status);
          if (params.startDate) queryParams.set("startDate", params.startDate);
          if (params.endDate) queryParams.set("endDate", params.endDate);
        }
        const queryString = queryParams.toString();
        return `/wallet/transactions${queryString ? `?${queryString}` : ""}`;
      },
      providesTags: ["WalletTransaction"],
    }),

    createWalletTransaction: build.mutation<WalletTransaction, CreateWalletTransactionRequest>({
      query: (body) => ({
        url: "/wallet/transactions",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Wallet", "WalletTransaction"],
    }),
  }),
});

export const {
  useGetWalletQuery,
  useGetWalletTransactionsQuery,
  useCreateWalletTransactionMutation,
} = walletApi;

