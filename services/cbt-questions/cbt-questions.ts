import { baseApi } from "../baseApi";
import type { CreateCBTQuestionPayload, UpdateCBTQuestionPayload } from "./cbt-question-types";
import type { ApiResponse, ApiListResponse, ApiDeleteResponse } from "../shared-types";

const BASE = "/cbts/questions";

export const cbtQuestionsApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    getCbtQuestions: build.query<ApiListResponse<unknown>, void>({
      query: () => ({ url: BASE }),
      providesTags: ["CbtQuestion"],
    }),

    getCbtQuestionById: build.query<ApiResponse<unknown>, string>({
      query: (id) => ({ url: `${BASE}/${id}` }),
      providesTags: (_, __, id) => [{ type: "CbtQuestion", id }],
    }),

    createCbtQuestion: build.mutation<ApiResponse<unknown>, CreateCBTQuestionPayload>({
      query: (body) => ({ url: BASE, method: "POST", body }),
      invalidatesTags: ["CbtQuestion"],
    }),

    updateCbtQuestion: build.mutation<ApiResponse<unknown>, { id: string; data: UpdateCBTQuestionPayload }>({
      query: ({ id, data }) => ({ url: `${BASE}/${id}`, method: "PUT", body: data }),
      invalidatesTags: (_, __, { id }) => [{ type: "CbtQuestion", id }, "CbtQuestion"],
    }),

    deleteCbtQuestion: build.mutation<ApiDeleteResponse, string>({
      query: (id) => ({ url: `${BASE}/${id}`, method: "DELETE" }),
      invalidatesTags: (_, __, id) => [{ type: "CbtQuestion", id }, "CbtQuestion"],
    }),
  }),
});

export const {
  useGetCbtQuestionsQuery,
  useGetCbtQuestionByIdQuery,
  useCreateCbtQuestionMutation,
  useUpdateCbtQuestionMutation,
  useDeleteCbtQuestionMutation,
} = cbtQuestionsApi;
