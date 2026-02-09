import { baseApi } from "../baseApi";
import type {
  Stakeholders,
  CreateStakeholdersRequest,
  UpdateStakeholdersRequest,
  AssignDutyStakeholder,
  StakeholdersListResponse,
  AllStudentStakeholdersResponse,
  StakeholderListResponseWithMetrics,
  StudentStakeholderListResponseWithMetrics,
  StudentMetrics,
} from "./stakeholder-types";
import {
  calculateStakeholderMetrics,
  calculateStudentStakeholderMetrics,
  getStakeholderStageLabel,
  getAllStudents,
} from "./stakeholders-reducer";
import type { ApiResponse, ApiDeleteResponse } from "../shared-types";

const BASE = "/stakeholders";

export const stakeholdersApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    getStakeholders: build.query<StakeholdersListResponse, void>({
      query: () => ({ url: BASE }),
      providesTags: ["Stakeholder"],
    }),

    getAllStaff: build.query<AllStudentStakeholdersResponse, void>({
      query: () => ({ url: BASE }),
      transformResponse: (
        response: StakeholdersListResponse,
      ): AllStudentStakeholdersResponse => {
        const staff = response.data.filter(
          (s) => s.type === "staff" || s.type === "teacher",
        );
        return {
          ...response,
          data: staff.map((stakeholder) => ({
            ...stakeholder,
          })),
        };
      },
      providesTags: ["Stakeholder"],
    }),

    getAllStudents: build.query<AllStudentStakeholdersResponse, void>({
      query: () => ({ url: BASE }),
      transformResponse: (
        response: StakeholdersListResponse,
      ): AllStudentStakeholdersResponse => {
        const students = getAllStudents(response.data);
        return {
          ...response,
          data: students.map((stakeholder) => ({
            ...stakeholder,
          })),
        };
      },
      providesTags: ["Stakeholder"],
    }),

    getStudentStakeholderMetrics: build.query<
      StudentStakeholderListResponseWithMetrics,
      void
    >({
      query: () => ({ url: BASE }),
      transformResponse: (
        response: StakeholdersListResponse,
      ): StudentStakeholderListResponseWithMetrics => {
        const students = response.data.filter((s) => s.type === "student");
        return {
          ...response,
          data: students.map((stakeholder) => ({
            ...stakeholder,
          })),
          metrics: calculateStudentStakeholderMetrics(response.data),
        };
      },
      providesTags: ["Stakeholder"],
    }),

    getStakeholderMetrics: build.query<
      StakeholderListResponseWithMetrics,
      void
    >({
      query: () => ({ url: BASE }),
      transformResponse: (
        response: StakeholdersListResponse,
      ): StakeholderListResponseWithMetrics => {
        const students = response.data.filter((s) => s.type === "student");
        return {
          ...response,
          metrics: calculateStakeholderMetrics(students),
          data: students.map((stakeholder) => ({
            ...stakeholder,
            stage_text: getStakeholderStageLabel(stakeholder.stage),
          })),
        };
      },
      providesTags: ["Stakeholder"],
    }),

    getStudentMetrics: build.query<ApiResponse<StudentMetrics>, void>({
      query: () => ({ url: `${BASE}/metrics` }),
      providesTags: ["Stakeholder", "Attendance", "Transaction"],
    }),

    getStakeholderById: build.query<ApiResponse<Stakeholders>, string>({
      query: (id) => ({ url: `${BASE}/${id}` }),
      providesTags: (_, __, id) => [{ type: "Stakeholder", id }],
    }),

    getStudentById: build.query<ApiResponse<Stakeholders>, string>({
      query: (id) => ({ url: `${BASE}/${id}` }),
      transformResponse: (
        response: ApiResponse<Stakeholders>,
      ): ApiResponse<Stakeholders> => {
        if (response.data.type !== "student") {
          throw new Error("Stakeholder is not a student");
        }
        return {
          ...response,
          data: {
            ...response.data,
            stage_text: getStakeholderStageLabel(response.data.stage),
          },
        };
      },
      providesTags: (_, __, id) => [{ type: "Stakeholder", id }],
    }),

    createStakeholder: build.mutation<
      ApiResponse<Stakeholders>,
      CreateStakeholdersRequest | FormData
    >({
      query: (body) => {
        // If FormData, don't set Content-Type header (browser will set it with boundary)
        if (body instanceof FormData) {
          return {
            url: BASE,
            method: "POST",
            body,
            formData: true,
          };
        }
        return { url: BASE, method: "POST", body };
      },
      invalidatesTags: ["Stakeholder"],
    }),

    assignDuty: build.mutation<ApiResponse<unknown>, AssignDutyStakeholder>({
      query: (body) => ({ url: `${BASE}/assign/duty`, method: "POST", body }),
      invalidatesTags: ["Stakeholder"],
    }),

    updateStakeholder: build.mutation<
      ApiResponse<Stakeholders>,
      { id: string; data: UpdateStakeholdersRequest }
    >({
      query: ({ id, data }) => ({
        url: `${BASE}/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (_, __, { id }) => [
        { type: "Stakeholder", id },
        "Stakeholder",
      ],
    }),

    deleteStakeholder: build.mutation<ApiDeleteResponse, string>({
      query: (id) => ({ url: `${BASE}/${id}`, method: "DELETE" }),
      invalidatesTags: (_, __, id) => [
        { type: "Stakeholder", id },
        "Stakeholder",
      ],
    }),
  }),
});

export const {
  useGetStakeholdersQuery,
  useGetAllStaffQuery,
  useGetAllStudentsQuery,
  useGetStudentStakeholderMetricsQuery,
  useGetStakeholderMetricsQuery,
  useGetStudentMetricsQuery,
  useGetStakeholderByIdQuery,
  useGetStudentByIdQuery,
  useCreateStakeholderMutation,
  useAssignDutyMutation,
  useUpdateStakeholderMutation,
  useDeleteStakeholderMutation,
} = stakeholdersApi;
