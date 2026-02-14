import { baseApi } from "../baseApi";
import type {
  CreateCBTResultsPayload,
  UpdateCBTResultsPayload,
  CbtResult,
  CbtResultsQueryParams,
} from "./cbt-result-types";
import type {
  ApiResponse,
  ApiListResponse,
  ApiDeleteResponse,
} from "../shared-types";

const BASE = "/cbts/results";

export const cbtResultsApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    getCbtResults: build.query<
      ApiListResponse<CbtResult> | ApiResponse<CbtResult[]>,
      CbtResultsQueryParams | void
    >({
      query: (params) => {
        const p = params ?? {};
        const queryParams: Record<string, string> = p._all ? { _all: "true" } : {};
        if (p.exam_id) queryParams["exam_id[eq]"] = p.exam_id;
        if (p.page != null) queryParams.page = String(p.page);
        if (p.limit != null) queryParams.limit = String(p.limit);
        return { url: BASE, params: queryParams };
      },
      providesTags: ["CbtResult"],
    }),

    getCbtResultById: build.query<ApiResponse<CbtResult>, string>({
      query: (id) => ({ url: `${BASE}/${id}` }),
      providesTags: (_, __, id) => [{ type: "CbtResult", id }],
    }),

    createCbtResult: build.mutation<
      ApiResponse<CbtResult>,
      CreateCBTResultsPayload
    >({
      query: (body) => ({ url: BASE, method: "POST", body }),
      invalidatesTags: ["CbtResult"],
    }),

    updateCbtResult: build.mutation<
      ApiResponse<CbtResult>,
      { id: string; data: UpdateCBTResultsPayload }
    >({
      query: ({ id, data }) => ({
        url: `${BASE}/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (_, __, { id }) => [
        { type: "CbtResult", id },
        "CbtResult",
      ],
    }),

    deleteCbtResult: build.mutation<ApiDeleteResponse, string>({
      query: (id) => ({ url: `${BASE}/${id}`, method: "DELETE" }),
      invalidatesTags: (_, __, id) => [{ type: "CbtResult", id }, "CbtResult"],
    }),
  }),
});

export const {
  useGetCbtResultsQuery,
  useGetCbtResultByIdQuery,
  useCreateCbtResultMutation,
  useUpdateCbtResultMutation,
  useDeleteCbtResultMutation,
} = cbtResultsApi;
