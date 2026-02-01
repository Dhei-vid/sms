import { baseApi } from "../baseApi";
import type { CreateNotesRequest, UpdateNotesRequest } from "./note-types";
import type { ApiResponse, ApiListResponse, ApiDeleteResponse } from "../shared-types";

const BASE = "/notes";

export const notesApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    getNotes: build.query<ApiListResponse<unknown>, void>({
      query: () => ({ url: BASE }),
      providesTags: ["Note"],
    }),

    getNoteById: build.query<ApiResponse<unknown>, string>({
      query: (id) => ({ url: `${BASE}/${id}` }),
      providesTags: (_, __, id) => [{ type: "Note", id }],
    }),

    createNote: build.mutation<ApiResponse<unknown>, CreateNotesRequest>({
      query: (body) => ({ url: BASE, method: "POST", body }),
      invalidatesTags: ["Note"],
    }),

    updateNote: build.mutation<ApiResponse<unknown>, { id: string; data: UpdateNotesRequest }>({
      query: ({ id, data }) => ({ url: `${BASE}/${id}`, method: "PUT", body: data }),
      invalidatesTags: (_, __, { id }) => [{ type: "Note", id }, "Note"],
    }),

    deleteNote: build.mutation<ApiDeleteResponse, string>({
      query: (id) => ({ url: `${BASE}/${id}`, method: "DELETE" }),
      invalidatesTags: (_, __, id) => [{ type: "Note", id }, "Note"],
    }),
  }),
});

export const {
  useGetNotesQuery,
  useGetNoteByIdQuery,
  useCreateNoteMutation,
  useUpdateNoteMutation,
  useDeleteNoteMutation,
} = notesApi;
