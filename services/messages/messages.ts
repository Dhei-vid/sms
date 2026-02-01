import { baseApi } from "../baseApi";
import type { Message, CreateMessageRequest, MessagesListResponse, MessagesQueryParams } from "./messages-type";
import type { ApiResponse, ApiDeleteResponse } from "../shared-types";

const BASE = "/messages";

export const messagesApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    getMessages: build.query<MessagesListResponse, MessagesQueryParams | void>({
      query: (params) => ({ url: BASE, params: params ?? {} }),
      providesTags: ["Message"],
    }),
    getMessageById: build.query<ApiResponse<Message>, string>({
      query: (id) => ({ url: `${BASE}/${id}` }),
      providesTags: (_, __, id) => [{ type: "Message", id }],
    }),
    createMessage: build.mutation<ApiResponse<Message>, CreateMessageRequest>({
      query: (body) => ({ url: BASE, method: "POST", body }),
      invalidatesTags: ["Message"],
    }),
    markAsRead: build.mutation<ApiResponse<Message>, string>({
      query: (id) => ({ url: `${BASE}/${id}/read`, method: "PATCH" }),
      invalidatesTags: (_, __, id) => [{ type: "Message", id }, "Message"],
    }),
    deleteMessage: build.mutation<ApiDeleteResponse, string>({
      query: (id) => ({ url: `${BASE}/${id}`, method: "DELETE" }),
      invalidatesTags: (_, __, id) => [{ type: "Message", id }, "Message"],
    }),
  }),
});

export const {
  useGetMessagesQuery,
  useGetMessageByIdQuery,
  useCreateMessageMutation,
  useMarkAsReadMutation,
  useDeleteMessageMutation,
} = messagesApi;
