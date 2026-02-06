import { baseApi } from "../baseApi";
import type {
  Order,
  CreateOrderRequest,
  UpdateOrderRequest,
  OrdersListResponse,
  OrdersQueryParams,
} from "./orders-type";

const BASE = "/orders";

export const ordersApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    getOrders: build.query<OrdersListResponse, OrdersQueryParams | void>({
      query: (params) => ({ url: BASE, params: params ?? {} }),
      providesTags: ["Order"],
    }),

    getOrderById: build.query<Order, string>({
      query: (id) => ({ url: `${BASE}/${id}` }),
      providesTags: (_, __, id) => [{ type: "Order", id }],
    }),

    createOrder: build.mutation<Order, CreateOrderRequest>({
      query: (body) => ({ url: BASE, method: "POST", body }),
      invalidatesTags: ["Order"],
    }),

    updateOrder: build.mutation<
      Order,
      { id: string; data: UpdateOrderRequest }
    >({
      query: ({ id, data }) => ({
        url: `${BASE}/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (_, __, { id }) => [{ type: "Order", id }, "Order"],
    }),

    deleteOrder: build.mutation<{ success: boolean; message: string }, string>({
      query: (id) => ({ url: `${BASE}/${id}`, method: "DELETE" }),
      invalidatesTags: ["Order"],
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useGetOrderByIdQuery,
  useCreateOrderMutation,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
} = ordersApi;
