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
/** Backend order item in items array */
export interface OrderItemRaw {
  product_id: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  code?: string;
  creator_id?: string;
  school_id?: string;
  transaction_id?: string | null;
  items: OrderItemRaw[] | OrderItem[];
  total_amount?: string | number;
  total?: number;
  status: OrderStatus;
  paymentStatus?: PaymentStatus;
  paymentMethod?: string;
  transaction?: { payment_method?: string; amount?: string | number };
  created_at?: string;
  createdAt?: string;
  updated_at?: string;
  updatedAt?: string;
  completedAt?: string;
  items_details?: Array<{
    product_id: string;
    quantity: number;
    price: number;
    product?: { name: string; image?: string };
  }>;
}

/**
 * Order creation request payload
 */
export interface CreateOrderRequest {
  school_id?: string;
  total_amount: number;
  items: OrderItems[];
  transaction_id?: string | null;
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
  _all?: boolean;
  per_page?: number;
  page?: number;
  status?: OrderStatus;
  paymentStatus?: PaymentStatus;
  userId?: string;
  "created_at[gte]"?: string;
  "created_at[lte]"?: string;
}
