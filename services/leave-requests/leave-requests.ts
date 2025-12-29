import { baseApi } from "../baseApi";
import type {
  LeaveRequest,
  CreateLeaveRequestRequest,
  UpdateLeaveRequestRequest,
  LeaveRequestsListResponse,
  LeaveRequestsQueryParams,
} from "./leave-requests-type";

export const leaveRequestsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getLeaveRequests: build.query<LeaveRequestsListResponse, LeaveRequestsQueryParams | void>({
      query: (params) => {
        const queryParams = new URLSearchParams();
        if (params) {
          if (params.page) queryParams.set("page", params.page.toString());
          if (params.limit) queryParams.set("limit", params.limit.toString());
          if (params.userId) queryParams.set("userId", params.userId);
          if (params.status) queryParams.set("status", params.status);
          if (params.leaveType) queryParams.set("leaveType", params.leaveType);
          if (params.startDate) queryParams.set("startDate", params.startDate);
          if (params.endDate) queryParams.set("endDate", params.endDate);
        }
        const queryString = queryParams.toString();
        return `/leave-requests${queryString ? `?${queryString}` : ""}`;
      },
      providesTags: ["LeaveRequest"],
    }),

    getLeaveRequestById: build.query<LeaveRequest, string>({
      query: (id) => `/leave-requests/${id}`,
      providesTags: (result, error, id) => [{ type: "LeaveRequest", id }],
    }),

    createLeaveRequest: build.mutation<LeaveRequest, CreateLeaveRequestRequest>({
      query: (body) => ({
        url: "/leave-requests",
        method: "POST",
        body,
      }),
      invalidatesTags: ["LeaveRequest"],
    }),

    updateLeaveRequest: build.mutation<LeaveRequest, { id: string; data: UpdateLeaveRequestRequest }>({
      query: ({ id, data }) => ({
        url: `/leave-requests/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "LeaveRequest", id }, "LeaveRequest"],
    }),

    deleteLeaveRequest: build.mutation<{ success: boolean; message: string }, string>({
      query: (id) => ({
        url: `/leave-requests/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["LeaveRequest"],
    }),
  }),
});

export const {
  useGetLeaveRequestsQuery,
  useGetLeaveRequestByIdQuery,
  useCreateLeaveRequestMutation,
  useUpdateLeaveRequestMutation,
  useDeleteLeaveRequestMutation,
} = leaveRequestsApi;

