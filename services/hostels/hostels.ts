import { baseApi } from "../baseApi";
import type {
  CreateHostelsPayload,
  UpdateHostelsPayload,
  AssignHostelPayload,
} from "./hostels-types";
import type {
  ApiResponse,
  ApiListResponse,
  ApiDeleteResponse,
} from "../shared-types";

const BASE = "/hostels";

export const hostelsApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    getHostels: build.query<ApiListResponse<unknown>, void>({
      query: () => ({ url: BASE }),
      providesTags: ["Hostel"],
    }),

    getHostelById: build.query<ApiResponse<unknown>, string>({
      query: (id) => ({ url: `${BASE}/${id}` }),
      providesTags: (_, __, id) => [{ type: "Hostel", id }],
    }),

    createHostel: build.mutation<ApiResponse<unknown>, CreateHostelsPayload>({
      query: (body) => ({ url: BASE, method: "POST", body }),
      invalidatesTags: ["Hostel"],
    }),

    updateHostel: build.mutation<
      ApiResponse<unknown>,
      { id: string; data: UpdateHostelsPayload }
    >({
      query: ({ id, data }) => ({
        url: `${BASE}/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (_, __, { id }) => [{ type: "Hostel", id }, "Hostel"],
    }),

    assignRoom: build.mutation<ApiResponse<unknown>, AssignHostelPayload>({
      query: (body) => ({ url: `${BASE}/assign/room`, method: "POST", body }),
      invalidatesTags: ["Hostel"],
    }),

    deleteHostel: build.mutation<ApiDeleteResponse, string>({
      query: (id) => ({ url: `${BASE}/${id}`, method: "DELETE" }),
      invalidatesTags: (_, __, id) => [{ type: "Hostel", id }, "Hostel"],
    }),
  }),
});

export const {
  useGetHostelsQuery,
  useGetHostelByIdQuery,
  useCreateHostelMutation,
  useUpdateHostelMutation,
  useAssignRoomMutation,
  useDeleteHostelMutation,
} = hostelsApi;
