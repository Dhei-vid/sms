import { baseApi } from "../baseApi";
import type {
  Notifications,
  CreateNotifications,
  UpdateNotifications,
  NotificationsListResponse,
} from "./notification-types";
import type { ApiListResponse, ApiResponse, ApiDeleteResponse } from "../shared-types";

export const notificationsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getNotifications: build.query<ApiListResponse<Notifications>, { page?: number; limit?: number; search?: string } | void>({
      query: (params) => {
        const queryParams = new URLSearchParams();
        if (params) {
          if (params.page !== undefined) queryParams.set("page", params.page.toString());
          if (params.limit !== undefined) queryParams.set("limit", params.limit.toString());
          if (params.search) queryParams.set("search", params.search);
        }
        const queryString = queryParams.toString();
        return `/notifications${queryString ? `?${queryString}` : ""}`;
      },
      transformResponse: (response: ApiListResponse<Notifications>) => {
        if (response.status === false || (response.status_code && response.status_code >= 400)) {
          throw new Error(response.message || "Failed to fetch notifications");
        }
        return response;
      },
      providesTags: ["Notification"],
    }),

    getNotificationById: build.query<ApiResponse<Notifications>, string>({
      query: (id) => `/notifications/${id}`,
      transformResponse: (response: ApiResponse<Notifications>) => {
        if (response.status === false || (response.status_code && response.status_code >= 400)) {
          throw new Error(response.message || "Failed to fetch notification");
        }
        return response;
      },
      providesTags: (result, error, id) => [{ type: "Notification", id }],
    }),

    createNotification: build.mutation<ApiResponse<Notifications>, CreateNotifications>({
      query: (body) => ({
        url: "/notifications",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Notification"],
    }),

    updateNotification: build.mutation<ApiResponse<Notifications>, { id: string; data: UpdateNotifications }>({
      query: ({ id, data }) => ({
        url: `/notifications/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Notification", id }, "Notification"],
    }),

    deleteNotification: build.mutation<ApiDeleteResponse, string>({
      query: (id) => ({
        url: `/notifications/${id}`,
        method: "DELETE",
      }),
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
