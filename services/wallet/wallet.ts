import { baseApi } from "../baseApi";
import type {
  Wallet,
  CreateWalletRequest,
  UpdateWalletRequest,
  WalletResponse,
  DeleteWalletResponse,
  FundWalletPayload,
  TransferFundsPayload,
  MakePaymentsPayload,
} from "./wallet-type";
import type { ApiListResponse, ApiResponse } from "../shared-types";

const BASE = "/wallets";

export const walletApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    getWallets: build.query<ApiListResponse<Wallet>, void>({
      query: () => ({ url: BASE }),
      providesTags: ["Wallet"],
    }),

    getWalletById: build.query<WalletResponse, string>({
      query: (id) => ({ url: `${BASE}/${id}` }),
      providesTags: (_, __, id) => [{ type: "Wallet", id }],
    }),

    createWallet: build.mutation<WalletResponse, CreateWalletRequest>({
      query: (body) => ({ url: BASE, method: "POST", body }),
      invalidatesTags: ["Wallet"],
    }),

    updateWallet: build.mutation<WalletResponse, { id: string; data: UpdateWalletRequest }>({
      query: ({ id, data }) => ({ url: `${BASE}/${id}`, method: "PUT", body: data }),
      invalidatesTags: (_, __, { id }) => [{ type: "Wallet", id }, "Wallet"],
    }),

    deleteWallet: build.mutation<DeleteWalletResponse, string>({
      query: (id) => ({ url: `${BASE}/${id}`, method: "DELETE" }),
      invalidatesTags: (_, __, id) => [{ type: "Wallet", id }, "Wallet"],
    }),

    getWalletBalance: build.query<ApiResponse<Wallet> | ApiResponse<{ balance: string }>, string | void>({
      query: (userId) => ({ url: `${BASE}/account/balance`, params: userId ? { user_id: userId } : {} }),
      providesTags: ["Wallet"],
    }),

    fundWallet: build.mutation<ApiResponse<Wallet>, FundWalletPayload>({
      query: (body) => ({ url: `${BASE}/account/fund`, method: "POST", body }),
      invalidatesTags: ["Wallet"],
    }),

    transferFunds: build.mutation<ApiResponse<Wallet>, TransferFundsPayload>({
      query: (body) => ({ url: `${BASE}/account/transfer`, method: "POST", body }),
      invalidatesTags: ["Wallet"],
    }),

    makePayment: build.mutation<ApiResponse<Wallet>, MakePaymentsPayload>({
      query: (body) => ({ url: `${BASE}/account/payment`, method: "POST", body }),
      invalidatesTags: ["Wallet"],
    }),
  }),
});

export const {
  useGetWalletsQuery,
  useGetWalletByIdQuery,
  useCreateWalletMutation,
  useUpdateWalletMutation,
  useDeleteWalletMutation,
  useGetWalletBalanceQuery,
  useFundWalletMutation,
  useTransferFundsMutation,
  useMakePaymentMutation,
} = walletApi;
