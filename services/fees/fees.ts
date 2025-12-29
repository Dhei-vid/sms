import { baseApi } from "../baseApi";
import type {
  Fee,
  CreateFeeRequest,
  UpdateFeeRequest,
  FeesListResponse,
  FeesQueryParams,
} from "./fees-type";

export const feesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getFees: build.query<FeesListResponse, FeesQueryParams | void>({
      query: (params) => {
        const queryParams = new URLSearchParams();
        if (params) {
          if (params.page) queryParams.set("page", params.page.toString());
          if (params.limit) queryParams.set("limit", params.limit.toString());
          if (params.studentId) queryParams.set("studentId", params.studentId);
          if (params.status) queryParams.set("status", params.status);
          if (params.startDate) queryParams.set("startDate", params.startDate);
          if (params.endDate) queryParams.set("endDate", params.endDate);
          if (params.search) queryParams.set("search", params.search);
        }
        const queryString = queryParams.toString();
        return `/fees${queryString ? `?${queryString}` : ""}`;
      },
      providesTags: ["Fee"],
    }),

    getFeeById: build.query<Fee, string>({
      query: (id) => `/fees/${id}`,
      providesTags: (result, error, id) => [{ type: "Fee", id }],
    }),

    createFee: build.mutation<Fee, CreateFeeRequest>({
      query: (body) => ({
        url: "/fees",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Fee"],
    }),

    updateFee: build.mutation<Fee, { id: string; data: UpdateFeeRequest }>({
      query: ({ id, data }) => ({
        url: `/fees/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Fee", id }, "Fee"],
    }),

    deleteFee: build.mutation<{ success: boolean; message: string }, string>({
      query: (id) => ({
        url: `/fees/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Fee"],
    }),
  }),
});

export const {
  useGetFeesQuery,
  useGetFeeByIdQuery,
  useCreateFeeMutation,
  useUpdateFeeMutation,
  useDeleteFeeMutation,
} = feesApi;

