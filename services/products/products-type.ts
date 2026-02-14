import { User } from "../users/users-type";
import { School } from "../schools/schools-type";
import type {
  ApiResponse,
  ApiListResponse,
  ApiDeleteResponse,
  BaseQueryParams,
} from "../shared-types";

/**
 * Type definitions for Products API responses
 * These types are based on the API response structure from the backend
 */

/**
 * Product entity structure
 */
export interface Product {
  id: string;
  creator_id: string;
  updated_by_id: string | null;
  school_id: string | null;

  name: string;
  description: string;

  price: string; // comes as string
  sale_price: string; // comes as string

  image: string;
  category: string;

  rating: number;
  stock: number;

  featured: boolean;
  in_stock: boolean;
  best_seller: boolean;

  type: string | null;
  slug: string | null;

  status: "available" | "unavailable" | "out_of_stock" | string; // extensible
  is_deleted: boolean;
  creator: User;
  updated_by?: null | User;

  school: null | School;
  created_at?: string | null;
  updated_at?: string | null;
  deleted_at?: string | null;
}

/**
 * Product creation request payload
 */
export interface CreateProductRequest {
  name: string;
  description?: string;
  sale_price: number;
  category?: string;
}

/**
 * Product update request payload
 */
export interface UpdateProductRequest {
  name?: string;
  description?: string;
  price?: number;
  category?: string;
  image?: string;
  stock?: number;
  rating?: number;
  in_stock: boolean;
  type: string;
  best_seller?: boolean;
  slug?: string;
  status?: "active" | "inactive" | "out_of_stock" | string;
}

/**
 * Products list response with pagination
 */
export type ProductsListResponse = ApiListResponse<Product>;

/**
 * Product response for single entity operations
 */
export type ProductResponse = ApiResponse<Product>;

/**
 * Delete product response
 */
export type DeleteProductResponse = ApiDeleteResponse;

/**
 * Product query parameters for filtering and pagination
 */
export interface ProductsQueryParams extends BaseQueryParams {
  _all?: boolean;
  "category[eq]"?: string;
}
