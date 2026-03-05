import { baseApi } from "../baseApi";
import type { ApiResponse } from "../shared-types";
import type {
  School,
  CreateSchoolRequest,
  UpdateSchoolRequest,
  SchoolListResponse,
  SchoolQueryParams,
} from "./schools-type";

const BASE = "/schools";

export const schoolsApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    getSchools: build.query<SchoolListResponse, SchoolQueryParams | void>({
      query: (params) => ({ url: BASE, params: params ?? {} }),
      providesTags: ["School"],
    }),

    getSchoolById: build.query<School, string>({
      query: (id) => ({ url: `${BASE}/${id}` }),
      transformResponse: (response: ApiResponse<School> | School): School => {
        if ("data" in response && response.data != null) {
          return response.data;
        }
        return response as School;
      },
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
        url: `${BASE}/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (_, __, { id }) => [{ type: "School", id }, "School"],
    }),

    deleteSchool: build.mutation<{ success: boolean; message: string }, string>(
      {
        query: (id) => ({ url: `${BASE}/${id}`, method: "DELETE" }),
        invalidatesTags: ["School"],
      },
    ),
  }),
});

export const {
  useGetSchoolsQuery,
  useGetSchoolByIdQuery,
  useCreateSchoolMutation,
  useUpdateSchoolMutation,
  useDeleteSchoolMutation,
} = schoolsApi;
