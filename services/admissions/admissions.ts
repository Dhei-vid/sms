import { baseApi } from "../baseApi";
import type {
  Admission,
  CreateAdmissionRequest,
  UpdateAdmissionRequest,
  AdmissionsListResponse,
  AdmissionsQueryParams,
  AdmissionResponse,
  DeleteAdmissionResponse,
} from "./admissions-type";

export const admissionsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAdmissions: build.query<AdmissionsListResponse, AdmissionsQueryParams | void>({
      query: (params) => {
        const queryParams = new URLSearchParams();
        if (params) {
          if (params.page) queryParams.set("page", params.page.toString());
          if (params.limit) queryParams.set("limit", params.limit.toString());
          if (params.status) queryParams.set("status", params.status);
          if (params.classId) queryParams.set("classId", params.classId);
          if (params.search) queryParams.set("search", params.search);
          if (params.startDate) queryParams.set("startDate", params.startDate);
          if (params.endDate) queryParams.set("endDate", params.endDate);
        }
        const queryString = queryParams.toString();
        return `/admissions${queryString ? `?${queryString}` : ""}`;
      },
      providesTags: ["Admission"],
    }),

    getAdmissionById: build.query<AdmissionResponse, string>({
      query: (id) => `/admissions/${id}`,
      providesTags: (result, error, id) => [{ type: "Admission", id }],
    }),

    createAdmission: build.mutation<AdmissionResponse, CreateAdmissionRequest>({
      query: (body) => ({
        url: "/admissions",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Admission"],
    }),

    updateAdmission: build.mutation<AdmissionResponse, { id: string; data: UpdateAdmissionRequest }>({
      query: ({ id, data }) => ({
        url: `/admissions/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Admission", id }, "Admission"],
    }),

    deleteAdmission: build.mutation<DeleteAdmissionResponse, string>({
      query: (id) => ({
        url: `/admissions/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Admission"],
    }),
  }),
});

export const {
  useGetAdmissionsQuery,
  useGetAdmissionByIdQuery,
  useCreateAdmissionMutation,
  useUpdateAdmissionMutation,
  useDeleteAdmissionMutation,
} = admissionsApi;

