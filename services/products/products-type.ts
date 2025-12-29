/**
 * Type definitions for Products API responses
 * These types are based on the API response structure from the backend
 */

/**
 * Product entity structure
 */
export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  category?: string;
  image?: string;
  stock?: number;
  status?: "active" | "inactive" | "out_of_stock";
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Product creation request payload
 */
export interface CreateProductRequest {
  name: string;
  description?: string;
  price: number;
  category?: string;
  image?: string;
  stock?: number;
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
  status?: "active" | "inactive" | "out_of_stock";
}

/**
 * Products list response with pagination
 */
export interface ProductsListResponse {
  data: Product[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

/**
 * Product query parameters for filtering and pagination
 */
export interface ProductsQueryParams {
  page?: number;
  limit?: number;
  category?: string;
  status?: "active" | "inactive" | "out_of_stock";
  search?: string;
  minPrice?: number;
  maxPrice?: number;
}

