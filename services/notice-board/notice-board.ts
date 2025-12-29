import { baseApi } from "../baseApi";
import type {
  Notice,
  CreateNoticeRequest,
  UpdateNoticeRequest,
  NoticesListResponse,
  NoticesQueryParams,
} from "./notice-board-type";

export const noticeBoardApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getNotices: build.query<NoticesListResponse, NoticesQueryParams | void>({
      query: (params) => {
        const queryParams = new URLSearchParams();
        if (params) {
          if (params.page) queryParams.set("page", params.page.toString());
          if (params.limit) queryParams.set("limit", params.limit.toString());
          if (params.authorId) queryParams.set("authorId", params.authorId);
          if (params.priority) queryParams.set("priority", params.priority);
          if (params.isPublished !== undefined) queryParams.set("isPublished", params.isPublished.toString());
          if (params.search) queryParams.set("search", params.search);
        }
        const queryString = queryParams.toString();
        return `/notice-board${queryString ? `?${queryString}` : ""}`;
      },
      providesTags: ["Notice"],
    }),

    getNoticeById: build.query<Notice, string>({
      query: (id) => `/notice-board/${id}`,
      providesTags: (result, error, id) => [{ type: "Notice", id }],
    }),

    createNotice: build.mutation<Notice, CreateNoticeRequest>({
      query: (body) => ({
        url: "/notice-board",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Notice"],
    }),

    updateNotice: build.mutation<Notice, { id: string; data: UpdateNoticeRequest }>({
      query: ({ id, data }) => ({
        url: `/notice-board/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Notice", id }, "Notice"],
    }),

    deleteNotice: build.mutation<{ success: boolean; message: string }, string>({
      query: (id) => ({
        url: `/notice-board/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Notice"],
    }),
  }),
});

export const {
  useGetNoticesQuery,
  useGetNoticeByIdQuery,
  useCreateNoticeMutation,
  useUpdateNoticeMutation,
  useDeleteNoticeMutation,
} = noticeBoardApi;

