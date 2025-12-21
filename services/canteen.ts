import { baseApi } from "./baseApi";

export interface CanteenProduct {
  id: string;
  name: string;
  price: number;
  category: string;
}

export const canteenApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getCanteenProducts: build.query<CanteenProduct[], void>({
      query: () => "/canteen/products",
      providesTags: ["CanteenProduct"],
    }),
  }),
});

export const { useGetCanteenProductsQuery } = canteenApi;