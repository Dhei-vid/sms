import { baseApi } from "../baseApi";
import { ApiResponse } from "../shared-types";
import type {
  ResultResponse,
  CreateResultParams,
  UpdateResultParams,
  DeleteResultParams,
  RecordResultsParams,
  ResultMetrics,
  Result,
} from "./result-types";
import { computeResultMetrics } from "./result-metrics";

const BASE = "/results";

export const resultsApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    getAllResults: build.query<ResultResponse, void>({
      query: () => ({ url: BASE }),
    }),

    getResultsById: build.query<ResultResponse, string>({
      query: (id) => `${BASE}/${id}`,
    }),

    createResults: build.mutation<ResultResponse, CreateResultParams>({
      query: (body) => ({
        url: `${BASE}`,
        method: "POST",
        body,
      }),
    }),

    recordResults: build.mutation<ResultResponse, RecordResultsParams>({
      query: (body) => ({
        url: `${BASE}/record/results`,
        method: "POST",
        body,
      }),
    }),

    updateResults: build.mutation<ResultResponse, UpdateResultParams, string>({
      query: (id, ...body) => ({
        url: `${BASE}/${id}`,
        method: "PUT",
        body,
      }),
    }),

    deleteResult: build.mutation<null, DeleteResultParams>({
      query: (id, ...body) => ({
        url: `${BASE}/${id}`,
        method: "DELETE",
        body,
      }),
    }),

    getResultMetrics: build.query<ApiResponse<ResultMetrics>, void>({
      query: () => ({ url: BASE }),
      transformResponse: (
        response: ApiResponse<Result | Result[]>,
      ): ApiResponse<ResultMetrics> => {
        const raw = response?.data;
        const results: Result[] = Array.isArray(raw) ? raw : raw ? [raw] : [];
        const metrics = computeResultMetrics(results);
        return {
          status: response.status ?? true,
          status_code: response.status_code ?? 200,
          message: response.message ?? "Success",
          data: metrics,
        };
      },
    }),
  }),
});

export const {
  useGetAllResultsQuery,
  useGetResultsByIdQuery,
  useCreateResultsMutation,
  useRecordResultsMutation,
  useUpdateResultsMutation,
  useDeleteResultMutation,
  useGetResultMetricsQuery,
} = resultsApi;
