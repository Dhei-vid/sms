import { baseApi } from "../baseApi";
import type {
  Order,
  CreateOrderRequest,
  UpdateOrderRequest,
  OrdersListResponse,
  OrdersQueryParams,
} from "./orders-type";

/**
 * RTK Query API endpoints for Orders management
 * Provides CRUD operations for order management
 */
export const ordersApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    /**
     * Get all orders query endpoint
     * Fetches a paginated list of orders with optional filters
     * 
     * @param params - Query parameters for filtering and pagination
     * @returns OrdersListResponse with paginated order data
     */
    getOrders: build.query<OrdersListResponse, OrdersQueryParams | void>({
      query: (params) => {
        const queryParams = new URLSearchParams();
        if (params) {
          if (params.page) queryParams.set("page", params.page.toString());
          if (params.limit) queryParams.set("limit", params.limit.toString());
          if (params.userId) queryParams.set("userId", params.userId);
          if (params.status) queryParams.set("status", params.status);
          if (params.paymentStatus) queryParams.set("paymentStatus", params.paymentStatus);
          if (params.startDate) queryParams.set("startDate", params.startDate);
          if (params.endDate) queryParams.set("endDate", params.endDate);
        }
        const queryString = queryParams.toString();
        return `/orders${queryString ? `?${queryString}` : ""}`;
      },
      providesTags: ["Order"],
    }),

    /**
     * Get order by ID query endpoint
     * Fetches a single order by its ID
     * 
     * @param id - Order ID
     * @returns Order object
     */
    getOrderById: build.query<Order, string>({
      query: (id) => `/orders/${id}`,
      providesTags: (result, error, id) => [{ type: "Order", id }],
    }),

    /**
     * Create order mutation endpoint
     * Creates a new order in the system
     * 
     * @param body - Order creation data
     * @returns Created Order object
     */
    createOrder: build.mutation<Order, CreateOrderRequest>({
      query: (body) => ({
        url: "/orders",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Order"],
    }),

    /**
     * Update order mutation endpoint
     * Updates an existing order's information
     * 
     * @param param0 - Object containing order ID and update data
     * @returns Updated Order object
     */
    updateOrder: build.mutation<Order, { id: string; data: UpdateOrderRequest }>({
      query: ({ id, data }) => ({
        url: `/orders/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Order", id }, "Order"],
    }),

    /**
     * Delete order mutation endpoint
     * Deletes an order from the system
     * 
     * @param id - Order ID to delete
     * @returns Success response
     */
    deleteOrder: build.mutation<{ success: boolean; message: string }, string>({
      query: (id) => ({
        url: `/orders/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Order"],
    }),
  }),
});

// Export hooks for use in React components
export const {
  useGetOrdersQuery,
  useGetOrderByIdQuery,
  useCreateOrderMutation,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
} = ordersApi;

