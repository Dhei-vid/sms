import { baseApi } from "../baseApi";
import type {
  Message,
  CreateMessageRequest,
  MessagesListResponse,
  MessagesQueryParams,
} from "./messages-type";

export const messagesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getMessages: build.query<MessagesListResponse, MessagesQueryParams | void>({
      query: (params) => {
        const queryParams = new URLSearchParams();
        if (params) {
          if (params.page) queryParams.set("page", params.page.toString());
          if (params.limit) queryParams.set("limit", params.limit.toString());
          if (params.senderId) queryParams.set("senderId", params.senderId);
          if (params.recipientId) queryParams.set("recipientId", params.recipientId);
          if (params.isRead !== undefined) queryParams.set("isRead", params.isRead.toString());
          if (params.search) queryParams.set("search", params.search);
        }
        const queryString = queryParams.toString();
        return `/messages${queryString ? `?${queryString}` : ""}`;
      },
      providesTags: ["Message"],
    }),

    getMessageById: build.query<Message, string>({
      query: (id) => `/messages/${id}`,
      providesTags: (result, error, id) => [{ type: "Message", id }],
    }),

    createMessage: build.mutation<Message, CreateMessageRequest>({
      query: (body) => ({
        url: "/messages",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Message"],
    }),

    markAsRead: build.mutation<Message, string>({
      query: (id) => ({
        url: `/messages/${id}/read`,
        method: "PATCH",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Message", id }, "Message"],
    }),

    deleteMessage: build.mutation<{ success: boolean; message: string }, string>({
      query: (id) => ({
        url: `/messages/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Message"],
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

