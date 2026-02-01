import { baseApi } from "../baseApi";
import type { CreateSubjectsRequest, UpdateSubjectPayload } from "./subject-types";
import type { ApiResponse, ApiListResponse, ApiDeleteResponse } from "../shared-types";

const BASE = "/subjects";

export const subjectsApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    getSubjects: build.query<ApiListResponse<unknown>, void>({
      query: () => ({ url: BASE }),
      providesTags: ["Subject"],
    }),

    getSubjectById: build.query<ApiResponse<unknown>, string>({
      query: (id) => ({ url: `${BASE}/${id}` }),
      providesTags: (_, __, id) => [{ type: "Subject", id }],
    }),

    createSubject: build.mutation<ApiResponse<unknown>, CreateSubjectsRequest>({
      query: (body) => ({ url: BASE, method: "POST", body }),
      invalidatesTags: ["Subject"],
    }),

    updateSubject: build.mutation<ApiResponse<unknown>, { id: string; data: UpdateSubjectPayload }>({
      query: ({ id, data }) => ({ url: `${BASE}/${id}`, method: "PUT", body: data }),
      invalidatesTags: (_, __, { id }) => [{ type: "Subject", id }, "Subject"],
    }),

    deleteSubject: build.mutation<ApiDeleteResponse, string>({
      query: (id) => ({ url: `${BASE}/${id}`, method: "DELETE" }),
      invalidatesTags: (_, __, id) => [{ type: "Subject", id }, "Subject"],
    }),
  }),
});

export const {
  useGetSubjectsQuery,
  useGetSubjectByIdQuery,
  useCreateSubjectMutation,
  useUpdateSubjectMutation,
  useDeleteSubjectMutation,
} = subjectsApi;
