import type {
  OrderStatus,
  PaymentStatus,
  ApiResponse,
  ApiListResponse,
  ApiDeleteResponse,
  BaseQueryParams,
} from "../shared-types";

/**
 * Type definitions for Orders API responses
 * These types are based on the API response structure from the backend
 */

/**
 * Order item structure
 */
export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  subtotal: number;
}

/**
 * Order entity structure
 */
export interface Order {
  id: string;
  userId: string;
  userName?: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  paymentStatus?: PaymentStatus;
  paymentMethod?: string;
  createdAt?: string;
  updatedAt?: string;
  completedAt?: string;
}

/**
 * Order creation request payload
 */
export interface CreateOrderRequest {
  school_id: string;
  total_amount: number;
  items: OrderItems[];
}

export interface OrderItems {
  product_id: string;
  quantity: number;
  price: number;
}

/**
 * Order update request payload
 */
export interface UpdateOrderRequest {
  school_id: string;
  transaction_id: string;
  total_amount: number;
  items: OrderItem[];
  status: "shipped" | string;
}

/**
 * Orders list response with pagination
 */
export type OrdersListResponse = ApiListResponse<Order>;

/**
 * Order response for single entity operations
 */
export type OrderResponse = ApiResponse<Order>;

/**
 * Delete order response
 */
export type DeleteOrderResponse = ApiDeleteResponse;

/**
 * Order query parameters for filtering and pagination
 */
export interface OrdersQueryParams extends BaseQueryParams {
  status?: OrderStatus;
  paymentStatus?: PaymentStatus;
  userId?: string;
}
