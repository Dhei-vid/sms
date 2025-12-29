import { baseApi } from "../baseApi";
import type {
  Product,
  CreateProductRequest,
  UpdateProductRequest,
  ProductsListResponse,
  ProductsQueryParams,
} from "./products-type";

/**
 * RTK Query API endpoints for Products management
 * Provides CRUD operations for product management
 */
export const productsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    /**
     * Get all products query endpoint
     * Fetches a paginated list of products with optional filters
     * 
     * @param params - Query parameters for filtering and pagination
     * @returns ProductsListResponse with paginated product data
     */
    getProducts: build.query<ProductsListResponse, ProductsQueryParams | void>({
      query: (params) => {
        const queryParams = new URLSearchParams();
        if (params) {
          if (params.page) queryParams.set("page", params.page.toString());
          if (params.limit) queryParams.set("limit", params.limit.toString());
          if (params.category) queryParams.set("category", params.category);
          if (params.status) queryParams.set("status", params.status);
          if (params.search) queryParams.set("search", params.search);
          if (params.minPrice) queryParams.set("minPrice", params.minPrice.toString());
          if (params.maxPrice) queryParams.set("maxPrice", params.maxPrice.toString());
        }
        const queryString = queryParams.toString();
        return `/products${queryString ? `?${queryString}` : ""}`;
      },
      providesTags: ["Product"],
    }),

    /**
     * Get product by ID query endpoint
     * Fetches a single product by its ID
     * 
     * @param id - Product ID
     * @returns Product object
     */
    getProductById: build.query<Product, string>({
      query: (id) => `/products/${id}`,
      providesTags: (result, error, id) => [{ type: "Product", id }],
    }),

    /**
     * Create product mutation endpoint
     * Creates a new product in the system
     * 
     * @param body - Product creation data
     * @returns Created Product object
     */
    createProduct: build.mutation<Product, CreateProductRequest>({
      query: (body) => ({
        url: "/products",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Product"],
    }),

    /**
     * Update product mutation endpoint
     * Updates an existing product's information
     * 
     * @param param0 - Object containing product ID and update data
     * @returns Updated Product object
     */
    updateProduct: build.mutation<Product, { id: string; data: UpdateProductRequest }>({
      query: ({ id, data }) => ({
        url: `/products/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Product", id }, "Product"],
    }),

    /**
     * Delete product mutation endpoint
     * Deletes a product from the system
     * 
     * @param id - Product ID to delete
     * @returns Success response
     */
    deleteProduct: build.mutation<{ success: boolean; message: string }, string>({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});

// Export hooks for use in React components
export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productsApi;

