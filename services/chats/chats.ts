import { baseApi } from "../baseApi";
import type { ApiListResponse, ApiResponse, ApiDeleteResponse } from "../shared-types";
import type { Chat, SendChatPayload, UpdateChatPayload } from "./chat-types";

const BASE = "/chats";

export const chatsApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    getChats: build.query<ApiListResponse<Chat>, { page?: number; limit?: number; search?: string } | void>({
      query: (params) => ({ url: BASE, params: params ?? {} }),
      transformResponse: (response: ApiListResponse<Chat>) => {
        if (response.status === false || (response.status_code && response.status_code >= 400)) {
          throw new Error(response.message || "Failed to fetch chats");
        }
        return response;
      },
      providesTags: ["Chat"],
    }),

    getChatById: build.query<ApiResponse<Chat>, string>({
      query: (id) => ({ url: `${BASE}/${id}` }),
      transformResponse: (response: ApiResponse<Chat>) => {
        if (response.status === false || (response.status_code && response.status_code >= 400)) {
          throw new Error(response.message || "Failed to fetch chat");
        }
        return response;
      },
      providesTags: (_, __, id) => [{ type: "Chat", id }],
    }),

    sendChat: build.mutation<ApiResponse<Chat>, SendChatPayload>({
      query: (body) => ({ url: `${BASE}/send`, method: "POST", body }),
      invalidatesTags: ["Chat"],
    }),

    updateChatTitle: build.mutation<ApiResponse<Chat>, { id: string; data: UpdateChatPayload }>({
      query: ({ id, data }) => ({ url: `${BASE}/${id}`, method: "PUT", body: data }),
      invalidatesTags: (_, __, { id }) => [{ type: "Chat", id }, "Chat"],
    }),

    deleteChat: build.mutation<ApiDeleteResponse, string>({
      query: (id) => ({ url: `${BASE}/${id}`, method: "DELETE" }),
      invalidatesTags: ["Chat"],
    }),
  }),
});

export const {
  useGetChatsQuery,
  useGetChatByIdQuery,
  useSendChatMutation,
  useUpdateChatTitleMutation,
  useDeleteChatMutation,
} = chatsApi;
