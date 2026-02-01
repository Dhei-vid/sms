import { baseApi } from "../baseApi";
import type {
  Stakeholders,
  CreateStakeholdersRequest,
  UpdateStakeholdersRequest,
  AssignDutyStakeholder,
  StakeholdersListResponse,
} from "./stakeholder-types";
import type { ApiResponse, ApiDeleteResponse } from "../shared-types";

const BASE = "/stakeholders";

export const stakeholdersApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    getStakeholders: build.query<StakeholdersListResponse, void>({
      query: () => ({ url: BASE }),
      providesTags: ["Stakeholder"],
    }),

    getStakeholderById: build.query<ApiResponse<Stakeholders>, string>({
      query: (id) => ({ url: `${BASE}/${id}` }),
      providesTags: (_, __, id) => [{ type: "Stakeholder", id }],
    }),

    createStakeholder: build.mutation<ApiResponse<Stakeholders>, CreateStakeholdersRequest>({
      query: (body) => ({ url: BASE, method: "POST", body }),
      invalidatesTags: ["Stakeholder"],
    }),

    assignDuty: build.mutation<ApiResponse<unknown>, AssignDutyStakeholder>({
      query: (body) => ({ url: `${BASE}/assign/duty`, method: "POST", body }),
      invalidatesTags: ["Stakeholder"],
    }),

    updateStakeholder: build.mutation<ApiResponse<Stakeholders>, { id: string; data: UpdateStakeholdersRequest }>({
      query: ({ id, data }) => ({ url: `${BASE}/${id}`, method: "PUT", body: data }),
      invalidatesTags: (_, __, { id }) => [{ type: "Stakeholder", id }, "Stakeholder"],
    }),

    deleteStakeholder: build.mutation<ApiDeleteResponse, string>({
      query: (id) => ({ url: `${BASE}/${id}`, method: "DELETE" }),
      invalidatesTags: (_, __, id) => [{ type: "Stakeholder", id }, "Stakeholder"],
    }),
  }),
});

export const {
  useGetStakeholdersQuery,
  useGetStakeholderByIdQuery,
  useCreateStakeholderMutation,
  useAssignDutyMutation,
  useUpdateStakeholderMutation,
  useDeleteStakeholderMutation,
} = stakeholdersApi;
