import { baseApi } from "../baseApi";
import type {
  Notifications,
  CreateNotifications,
  UpdateNotifications,
  NotificationsListResponse,
} from "./notification-types";
import type {
  ApiListResponse,
  ApiResponse,
  ApiDeleteResponse,
} from "../shared-types";

const BASE = "/notifications";

export const notificationsApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    getNotifications: build.query<
      ApiListResponse<Notifications>,
      { page?: number; limit?: number; search?: string } | void
    >({
      query: (params) => ({ url: BASE, params: params ?? {} }),
      transformResponse: (response: ApiListResponse<Notifications>) => {
        if (
          response.status === false ||
          (response.status_code && response.status_code >= 400)
        ) {
          throw new Error(response.message || "Failed to fetch notifications");
        }
        return response;
      },
      providesTags: ["Notification"],
    }),

    getNotificationById: build.query<ApiResponse<Notifications>, string>({
      query: (id) => ({ url: `${BASE}/${id}` }),
      transformResponse: (response: ApiResponse<Notifications>) => {
        if (
          response.status === false ||
          (response.status_code && response.status_code >= 400)
        ) {
          throw new Error(response.message || "Failed to fetch notification");
        }
        return response;
      },
      providesTags: (_, __, id) => [{ type: "Notification", id }],
    }),

    createNotification: build.mutation<
      ApiResponse<Notifications>,
      CreateNotifications
    >({
      query: (body) => ({ url: BASE, method: "POST", body }),
      invalidatesTags: ["Notification"],
    }),

    updateNotification: build.mutation<
      ApiResponse<Notifications>,
      { id: string; data: UpdateNotifications }
    >({
      query: ({ id, data }) => ({
        url: `${BASE}/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (_, __, { id }) => [
        { type: "Notification", id },
        "Notification",
      ],
    }),

    deleteNotification: build.mutation<ApiDeleteResponse, string>({
      query: (id) => ({ url: `${BASE}/${id}`, method: "DELETE" }),
      invalidatesTags: ["Notification"],
    }),
  }),
});

export const {
  useGetNotificationsQuery,
  useGetNotificationByIdQuery,
  useCreateNotificationMutation,
  useUpdateNotificationMutation,
  useDeleteNotificationMutation,
} = notificationsApi;
