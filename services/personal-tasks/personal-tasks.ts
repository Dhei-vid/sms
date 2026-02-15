import { baseApi } from "../baseApi";
import type {
  PersonalTask,
  CreatePersonalTaskRequest,
  UpdatePersonalTaskRequest,
  PersonalTasksQueryParams,
} from "./personal-tasks-type";
import type { ApiResponse } from "../shared-types";

const BASE = "/personal-tasks";

export const personalTasksApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    getPersonalTasks: build.query<
      { data: PersonalTask[] },
      PersonalTasksQueryParams | void
    >({
      query: (params) => ({
        url: BASE,
        params: { _all: "true", ...(params ?? {}) },
      }),
      transformResponse: (response: { data?: PersonalTask[] }): { data: PersonalTask[] } => ({
        data: Array.isArray(response?.data) ? response.data : [],
      }),
      providesTags: ["PersonalTask"],
    }),

    getPersonalTaskById: build.query<ApiResponse<PersonalTask>, string>({
      query: (id) => ({ url: `${BASE}/${id}` }),
      providesTags: (_, __, id) => [{ type: "PersonalTask", id }],
    }),

    createPersonalTask: build.mutation<ApiResponse<PersonalTask>, CreatePersonalTaskRequest>({
      query: (body) => ({ url: BASE, method: "POST", body }),
      invalidatesTags: ["PersonalTask"],
    }),

    updatePersonalTask: build.mutation<
      ApiResponse<PersonalTask>,
      { id: string; data: UpdatePersonalTaskRequest }
    >({
      query: ({ id, data }) => ({
        url: `${BASE}/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (_, __, { id }) => [{ type: "PersonalTask", id }, "PersonalTask"],
    }),

    deletePersonalTask: build.mutation<{ message: string }, string>({
      query: (id) => ({ url: `${BASE}/${id}`, method: "DELETE" }),
      invalidatesTags: (_, __, id) => [{ type: "PersonalTask", id }, "PersonalTask"],
    }),
  }),
});

export const {
  useGetPersonalTasksQuery,
  useGetPersonalTaskByIdQuery,
  useCreatePersonalTaskMutation,
  useUpdatePersonalTaskMutation,
  useDeletePersonalTaskMutation,
} = personalTasksApi;
