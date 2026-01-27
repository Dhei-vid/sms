import { baseApi } from "../baseApi";
import type {
  ApiListResponse,
  ApiResponse,
  ApiDeleteResponse,
} from "../shared-types";
import type { Chat, SendChatPayload, UpdateChatPayload } from "./chat-types";

export const chatsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Get all chats
    getChats: build.query<
      ApiListResponse<Chat>,
      { page?: number; limit?: number; search?: string } | void
    >({
      query: (params) => {
        const queryParams = new URLSearchParams();
        if (params) {
          if (params.page !== undefined)
            queryParams.set("page", params.page.toString());
          if (params.limit !== undefined)
            queryParams.set("limit", params.limit.toString());
          if (params.search) queryParams.set("search", params.search);
        }
        const queryString = queryParams.toString();
        return `/chats${queryString ? `?${queryString}` : ""}`;
      },
      transformResponse: (response: ApiListResponse<Chat>) => {
        if (
          response.status === false ||
          (response.status_code && response.status_code >= 400)
        ) {
          throw new Error(response.message || "Failed to fetch chats");
        }
        return response;
      },
      providesTags: ["Chat"],
    }),

    // Get chat by ID
    getChatById: build.query<ApiResponse<Chat>, string>({
      query: (id) => `/chats/${id}`,
      transformResponse: (response: ApiResponse<Chat>) => {
        if (
          response.status === false ||
          (response.status_code && response.status_code >= 400)
        ) {
          throw new Error(response.message || "Failed to fetch chat");
        }
        return response;
      },
      providesTags: (result, error, id) => [{ type: "Chat", id }],
    }),

    // Send chat message
    sendChat: build.mutation<ApiResponse<Chat>, SendChatPayload>({
      query: (body) => ({
        url: "/chats/send",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Chat"],
    }),

    // Update chat title
    updateChatTitle: build.mutation<
      ApiResponse<Chat>,
      { id: string; data: UpdateChatPayload }
    >({
      query: ({ id, data }) => ({
        url: `/chats/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Chat", id },
        "Chat",
      ],
    }),

    // Delete chat
    deleteChat: build.mutation<ApiDeleteResponse, string>({
      query: (id) => ({
        url: `/chats/${id}`,
        method: "DELETE",
      }),
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
