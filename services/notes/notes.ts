import { baseApi } from "../baseApi";
import type {
  Notes,
  CreateNotesRequest,
  UpdateNotesRequest,
  NotesListResponse,
} from "./note-types";
import type { ApiResponse, ApiDeleteResponse } from "../shared-types";

const BASE = "/notes";

export interface NotesQueryParams {
  _all?: boolean;
  "type[eq]"?: string;
}

export const notesApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    getNotes: build.query<
      NotesListResponse | { data: Notes[] },
      NotesQueryParams | void
    >({
      query: (params) => ({ url: BASE, params: params ?? {} }),
      providesTags: ["Note"],
    }),

    getLessonPlans: build.query<{ data: Notes[] }, NotesQueryParams | void>({
      query: (params) => ({
        url: BASE,
        params: { _all: "true", "type[eq]": "lesson", ...(params ?? {}) },
      }),
      transformResponse: (res: { data?: Notes[] }): { data: Notes[] } => ({
        data: res?.data ?? [],
      }),
      providesTags: ["Note"],
    }),

    getNoteById: build.query<ApiResponse<Notes>, string>({
      query: (id) => ({ url: `${BASE}/${id}` }),
      providesTags: (_, __, id) => [{ type: "Note", id }],
    }),

    createNote: build.mutation<ApiResponse<Notes>, CreateNotesRequest>({
      query: (body) => ({ url: BASE, method: "POST", body }),
      invalidatesTags: ["Note"],
    }),

    updateNote: build.mutation<
      ApiResponse<Notes>,
      { id: string; data: UpdateNotesRequest }
    >({
      query: ({ id, data }) => ({
        url: `${BASE}/${id}`,
        method: "PUT",
        body: data,
      }),
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
  useGetLessonPlansQuery,
  useGetNoteByIdQuery,
  useCreateNoteMutation,
  useUpdateNoteMutation,
  useDeleteNoteMutation,
} = notesApi;
