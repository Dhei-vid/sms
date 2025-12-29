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
  status: "pending" | "processing" | "completed" | "cancelled";
  paymentStatus?: "pending" | "paid" | "failed" | "refunded";
  paymentMethod?: string;
  createdAt?: string;
  updatedAt?: string;
  completedAt?: string;
}

/**
 * Order creation request payload
 */
export interface CreateOrderRequest {
  userId: string;
  items: {
    productId: string;
    quantity: number;
  }[];
  paymentMethod?: string;
}

/**
 * Order update request payload
 */
export interface UpdateOrderRequest {
  status?: "pending" | "processing" | "completed" | "cancelled";
  paymentStatus?: "pending" | "paid" | "failed" | "refunded";
  paymentMethod?: string;
}

/**
 * Orders list response with pagination
 */
export interface OrdersListResponse {
  data: Order[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

/**
 * Order query parameters for filtering and pagination
 */
export interface OrdersQueryParams {
  page?: number;
  limit?: number;
  userId?: string;
  status?: "pending" | "processing" | "completed" | "cancelled";
  paymentStatus?: "pending" | "paid" | "failed" | "refunded";
  startDate?: string;
  endDate?: string;
}

