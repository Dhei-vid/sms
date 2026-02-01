import { baseApi } from "../baseApi";
import type { CreateCBTExamsPayload } from "./cbt-exam-types";
import type { ApiResponse, ApiListResponse, ApiDeleteResponse } from "../shared-types";

const BASE = "/cbts/exams";

export const cbtExamsApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    getCbtExams: build.query<ApiListResponse<unknown>, void>({
      query: () => ({ url: BASE }),
      providesTags: ["CbtExam"],
    }),

    getCbtExamById: build.query<ApiResponse<unknown>, string>({
      query: (id) => ({ url: `${BASE}/${id}` }),
      providesTags: (_, __, id) => [{ type: "CbtExam", id }],
    }),

    createCbtExam: build.mutation<ApiResponse<unknown>, CreateCBTExamsPayload>({
      query: (body) => ({ url: BASE, method: "POST", body }),
      invalidatesTags: ["CbtExam"],
    }),

    updateCbtExam: build.mutation<ApiResponse<unknown>, { id: string; data: Partial<CreateCBTExamsPayload> }>({
      query: ({ id, data }) => ({ url: `${BASE}/${id}`, method: "PUT", body: data }),
      invalidatesTags: (_, __, { id }) => [{ type: "CbtExam", id }, "CbtExam"],
    }),

    deleteCbtExam: build.mutation<ApiDeleteResponse, string>({
      query: (id) => ({ url: `${BASE}/${id}`, method: "DELETE" }),
      invalidatesTags: (_, __, id) => [{ type: "CbtExam", id }, "CbtExam"],
    }),
  }),
});

export const {
  useGetCbtExamsQuery,
  useGetCbtExamByIdQuery,
  useCreateCbtExamMutation,
  useUpdateCbtExamMutation,
  useDeleteCbtExamMutation,
} = cbtExamsApi;
