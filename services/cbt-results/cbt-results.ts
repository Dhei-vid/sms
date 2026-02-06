import { baseApi } from "../baseApi";
import type {
  CreateCBTResultsPayload,
  UpdateCBTResultsPayload,
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
    getCbtResults: build.query<ApiListResponse<unknown>, void>({
      query: () => ({ url: BASE }),
      providesTags: ["CbtResult"],
    }),

    getCbtResultById: build.query<ApiResponse<unknown>, string>({
      query: (id) => ({ url: `${BASE}/${id}` }),
      providesTags: (_, __, id) => [{ type: "CbtResult", id }],
    }),

    createCbtResult: build.mutation<
      ApiResponse<unknown>,
      CreateCBTResultsPayload
    >({
      query: (body) => ({ url: BASE, method: "POST", body }),
      invalidatesTags: ["CbtResult"],
    }),

    updateCbtResult: build.mutation<
      ApiResponse<unknown>,
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
