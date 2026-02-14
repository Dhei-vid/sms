import { baseApi } from "../baseApi";
import type { ApiResponse } from "../shared-types";
import type {
  School,
  CreateSchoolRequest,
  UpdateSchoolRequest,
  TimetableUpdatePayload,
  SchoolListResponse,
  SchoolQueryParams,
  SchoolApplicationConfig,
  SchoolApplicationConfigUpdate,
  SchoolSettingsDashboard,
  SchoolSettingsDashboardUpdate,
  RoleTemplate,
  RoleTemplateModulesResponse,
  RoleTemplatesListResponse,
  RoleTemplateUpdatePayload,
} from "./schools-type";

const BASE = "/schools/";

export const schoolsApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    getSchools: build.query<SchoolListResponse, SchoolQueryParams | void>({
      query: (params) => ({ url: BASE, params: params ?? {} }),
      providesTags: ["School"],
    }),

    getSchoolById: build.query<School, string>({
      query: (id) => ({ url: `${BASE}${id}` }),
      providesTags: (_, __, id) => [{ type: "School", id }],
    }),

    createSchool: build.mutation<School, CreateSchoolRequest>({
      query: (body) => ({ url: BASE, method: "POST", body }),
      invalidatesTags: ["School"],
    }),

    updateSchool: build.mutation<
      School,
      { id: string; data: UpdateSchoolRequest }
    >({
      query: ({ id, data }) => ({
        url: `${BASE}${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (_, __, { id }) => [{ type: "School", id }, "School"],
    }),

    updateSchoolTimetable: build.mutation<
      School,
      { id: string; data: TimetableUpdatePayload }
    >({
      query: ({ id, data }) => ({
        url: `${BASE}${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (_, __, { id }) => [{ type: "School", id }, "School"],
    }),

    deleteSchool: build.mutation<{ success: boolean; message: string }, string>(
      {
        query: (id) => ({ url: `${BASE}${id}`, method: "DELETE" }),
        invalidatesTags: ["School"],
      },
    ),

    getSchoolApplicationConfig: build.query<
      ApiResponse<SchoolApplicationConfig>,
      string
    >({
      query: (schoolId) => ({
        url: `${BASE}${schoolId}/application-config`,
      }),
      providesTags: (_, __, schoolId) => [
        { type: "School", id: schoolId },
        { type: "School", id: `${schoolId}-application-config` },
      ],
    }),

    updateSchoolApplicationConfig: build.mutation<
      ApiResponse<SchoolApplicationConfig>,
      { schoolId: string; data: SchoolApplicationConfigUpdate }
    >({
      query: ({ schoolId, data }) => ({
        url: `${BASE}${schoolId}/application-config`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (_, __, { schoolId }) => [
        { type: "School", id: schoolId },
        { type: "School", id: `${schoolId}-application-config` },
      ],
    }),

    getSchoolSettingsDashboard: build.query<
      ApiResponse<SchoolSettingsDashboard>,
      string
    >({
      query: (schoolId) => ({
        url: `${BASE}${schoolId}/settings-dashboard`,
      }),
      providesTags: (_, __, schoolId) => [
        { type: "School", id: schoolId },
        { type: "School", id: `${schoolId}-settings-dashboard` },
      ],
    }),

    updateSchoolSettingsDashboard: build.mutation<
      ApiResponse<SchoolSettingsDashboard>,
      { schoolId: string; data: SchoolSettingsDashboardUpdate }
    >({
      query: ({ schoolId, data }) => ({
        url: `${BASE}${schoolId}/settings-dashboard`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (_, __, { schoolId }) => [
        { type: "School", id: schoolId },
        { type: "School", id: `${schoolId}-settings-dashboard` },
      ],
    }),

    getSchoolRoleTemplateModules: build.query<
      RoleTemplateModulesResponse,
      string
    >({
      query: (schoolId) => ({
        url: `${BASE}${schoolId}/role-template-modules`,
      }),
      transformResponse: (
        response: ApiResponse<RoleTemplateModulesResponse> & {
          data?: { modules?: string[] };
        },
      ): RoleTemplateModulesResponse => {
        const raw = response?.data ?? response;
        const mods = Array.isArray(raw?.modules) ? raw.modules : [];
        return { modules: mods };
      },
      providesTags: (_, __, schoolId) => [
        { type: "School", id: schoolId },
        { type: "School", id: `${schoolId}-role-template-modules` },
      ],
    }),

    getSchoolRoleTemplates: build.query<
      RoleTemplatesListResponse,
      string
    >({
      query: (schoolId) => ({
        url: `${BASE}${schoolId}/role-templates`,
      }),
      transformResponse: (
        response: ApiResponse<RoleTemplatesListResponse> & {
          data?: {
            role_templates?: unknown[];
            roleTemplates?: unknown[];
            modules?: string[];
          };
        },
      ): RoleTemplatesListResponse => {
        const raw = response?.data ?? response;
        const list = Array.isArray(raw?.roleTemplates)
          ? raw.roleTemplates
          : Array.isArray((raw as { role_templates?: unknown[] })?.role_templates)
            ? (raw as { role_templates: unknown[] }).role_templates
            : [];
        const mods = Array.isArray(raw?.modules) ? raw.modules : [];
        return {
          roleTemplates: list as RoleTemplate[],
          modules: mods as string[],
        };
      },
      providesTags: (_, __, schoolId) => [
        { type: "School", id: schoolId },
        { type: "School", id: `${schoolId}-role-templates` },
      ],
    }),

    getSchoolRoleTemplate: build.query<
      ApiResponse<RoleTemplate>,
      { schoolId: string; templateId: string }
    >({
      query: ({ schoolId, templateId }) => ({
        url: `${BASE}${schoolId}/role-templates/${templateId}`,
      }),
      providesTags: (_, __, { schoolId, templateId }) => [
        { type: "School", id: `${schoolId}-role-templates` },
        { type: "School", id: `${schoolId}-role-template-${templateId}` },
      ],
    }),

    updateSchoolRoleTemplate: build.mutation<
      ApiResponse<RoleTemplate>,
      { schoolId: string; templateId: string; data: RoleTemplateUpdatePayload }
    >({
      query: ({ schoolId, templateId, data }) => ({
        url: `${BASE}${schoolId}/role-templates/${templateId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (_, __, { schoolId, templateId }) => [
        { type: "School", id: schoolId },
        { type: "School", id: `${schoolId}-role-templates` },
        { type: "School", id: `${schoolId}-role-template-${templateId}` },
      ],
    }),
  }),
});

export const {
  useGetSchoolsQuery,
  useGetSchoolByIdQuery,
  useCreateSchoolMutation,
  useUpdateSchoolMutation,
  useUpdateSchoolTimetableMutation,
  useDeleteSchoolMutation,
  useGetSchoolApplicationConfigQuery,
  useUpdateSchoolApplicationConfigMutation,
  useGetSchoolSettingsDashboardQuery,
  useUpdateSchoolSettingsDashboardMutation,
  useGetSchoolRoleTemplateModulesQuery,
  useGetSchoolRoleTemplatesQuery,
  useGetSchoolRoleTemplateQuery,
  useUpdateSchoolRoleTemplateMutation,
} = schoolsApi;
