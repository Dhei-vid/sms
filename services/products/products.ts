import { baseApi } from "../baseApi";
import type {
  Product,
  CreateProductRequest,
  UpdateProductRequest,
  ProductsListResponse,
  ProductsQueryParams,
} from "./products-type";

const BASE = "/products";

export const productsApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    getProducts: build.query<ProductsListResponse, ProductsQueryParams | void>({
      query: (params) => ({ url: BASE, params: params ?? {} }),
      providesTags: ["Product"],
    }),

    getProductById: build.query<Product, string>({
      query: (id) => ({ url: `${BASE}/${id}` }),
      providesTags: (_, __, id) => [{ type: "Product", id }],
    }),

    createProduct: build.mutation<Product, CreateProductRequest>({
      query: (body) => ({ url: BASE, method: "POST", body }),
      invalidatesTags: ["Product"],
    }),

    updateProduct: build.mutation<Product, { id: string; data: UpdateProductRequest }>({
      query: ({ id, data }) => ({ url: `${BASE}/${id}`, method: "PUT", body: data }),
      invalidatesTags: (_, __, { id }) => [{ type: "Product", id }, "Product"],
    }),

    deleteProduct: build.mutation<{ success: boolean; message: string }, string>({
      query: (id) => ({ url: `${BASE}/${id}`, method: "DELETE" }),
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productsApi;
