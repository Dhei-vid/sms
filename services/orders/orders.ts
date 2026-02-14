import { baseApi } from "../baseApi";
import type {
  Order,
  CreateOrderRequest,
  UpdateOrderRequest,
  OrdersListResponse,
  OrdersQueryParams,
} from "./orders-type";

const BASE = "/canteens/orders";

export const ordersApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    getOrders: build.query<OrdersListResponse, OrdersQueryParams | void>({
      query: (params) => {
        const p = params ?? {};
        const queryParams: Record<string, string | number> = {};
        if (p._all) queryParams._all = "true";
        if (p.per_page != null) queryParams.per_page = p.per_page;
        if (p.page != null) queryParams.page = p.page;
        if (p.status) queryParams.status = p.status;
        if (p["created_at[gte]"]) queryParams["created_at[gte]"] = p["created_at[gte]"];
        if (p["created_at[lte]"]) queryParams["created_at[lte]"] = p["created_at[lte]"];
        if (p.search) queryParams.search = p.search;
        return { url: BASE, params: queryParams };
      },
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
