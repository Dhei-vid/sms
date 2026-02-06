import { baseApi } from "../baseApi";
import type {
  LeaveRequest,
  CreateLeaveRequestRequest,
  UpdateLeaveRequestRequest,
  LeaveRequestsListResponse,
  LeaveRequestsQueryParams,
} from "./leave-requests-type";

const BASE = "/leave-requests";

export const leaveRequestsApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    getLeaveRequests: build.query<
      LeaveRequestsListResponse,
      LeaveRequestsQueryParams | void
    >({
      query: (params) => ({ url: BASE, params: params ?? {} }),
      providesTags: ["LeaveRequest"],
    }),

    getLeaveRequestById: build.query<LeaveRequest, string>({
      query: (id) => ({ url: `${BASE}/${id}` }),
      providesTags: (_, __, id) => [{ type: "LeaveRequest", id }],
    }),

    createLeaveRequest: build.mutation<LeaveRequest, CreateLeaveRequestRequest>(
      {
        query: (body) => ({ url: BASE, method: "POST", body }),
        invalidatesTags: ["LeaveRequest"],
      },
    ),

    updateLeaveRequest: build.mutation<
      LeaveRequest,
      { id: string; data: UpdateLeaveRequestRequest }
    >({
      query: ({ id, data }) => ({
        url: `${BASE}/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (_, __, { id }) => [
        { type: "LeaveRequest", id },
        "LeaveRequest",
      ],
    }),

    deleteLeaveRequest: build.mutation<
      { success: boolean; message: string },
      string
    >({
      query: (id) => ({ url: `${BASE}/${id}`, method: "DELETE" }),
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
