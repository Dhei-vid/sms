import { baseApi } from "../baseApi";
import type { CreateTransportPayload, UpdateTransportPayload, AssignBus } from "./transport-types";
import type { ApiResponse, ApiListResponse, ApiDeleteResponse } from "../shared-types";

const BASE = "/transports";

export const transportsApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    getTransports: build.query<ApiListResponse<unknown>, void>({
      query: () => ({ url: BASE }),
      providesTags: ["Transport"],
    }),

    getTransportById: build.query<ApiResponse<unknown>, string>({
      query: (id) => ({ url: `${BASE}/${id}` }),
      providesTags: (_, __, id) => [{ type: "Transport", id }],
    }),

    createTransport: build.mutation<ApiResponse<unknown>, CreateTransportPayload>({
      query: (body) => ({ url: BASE, method: "POST", body }),
      invalidatesTags: ["Transport"],
    }),

    updateTransport: build.mutation<ApiResponse<unknown>, { id: string; data: UpdateTransportPayload }>({
      query: ({ id, data }) => ({ url: `${BASE}/${id}`, method: "PUT", body: data }),
      invalidatesTags: (_, __, { id }) => [{ type: "Transport", id }, "Transport"],
    }),

    assignBus: build.mutation<ApiResponse<unknown>, AssignBus>({
      query: (body) => ({ url: `${BASE}/assign/bus`, method: "POST", body }),
      invalidatesTags: ["Transport"],
    }),

    deleteTransport: build.mutation<ApiDeleteResponse, string>({
      query: (id) => ({ url: `${BASE}/${id}`, method: "DELETE" }),
      invalidatesTags: (_, __, id) => [{ type: "Transport", id }, "Transport"],
    }),
  }),
});

export const {
  useGetTransportsQuery,
  useGetTransportByIdQuery,
  useCreateTransportMutation,
  useUpdateTransportMutation,
  useAssignBusMutation,
  useDeleteTransportMutation,
} = transportsApi;
