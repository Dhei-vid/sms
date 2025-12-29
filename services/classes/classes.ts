import { baseApi } from "../baseApi";
import type {
  Class,
  CreateClassRequest,
  UpdateClassRequest,
  ClassesListResponse,
  ClassesQueryParams,
} from "./classes-type";

export const classesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getClasses: build.query<ClassesListResponse, ClassesQueryParams | void>({
      query: (params) => {
        const queryParams = new URLSearchParams();
        if (params) {
          if (params.page) queryParams.set("page", params.page.toString());
          if (params.limit) queryParams.set("limit", params.limit.toString());
          if (params.level) queryParams.set("level", params.level);
          if (params.teacherId) queryParams.set("teacherId", params.teacherId);
          if (params.status) queryParams.set("status", params.status);
          if (params.search) queryParams.set("search", params.search);
        }
        const queryString = queryParams.toString();
        return `/classes${queryString ? `?${queryString}` : ""}`;
      },
      providesTags: ["Class"],
    }),

    getClassById: build.query<Class, string>({
      query: (id) => `/classes/${id}`,
      providesTags: (result, error, id) => [{ type: "Class", id }],
    }),

    createClass: build.mutation<Class, CreateClassRequest>({
      query: (body) => ({
        url: "/classes",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Class"],
    }),

    updateClass: build.mutation<Class, { id: string; data: UpdateClassRequest }>({
      query: ({ id, data }) => ({
        url: `/classes/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Class", id }, "Class"],
    }),

    deleteClass: build.mutation<{ success: boolean; message: string }, string>({
      query: (id) => ({
        url: `/classes/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Class"],
    }),
  }),
});

export const {
  useGetClassesQuery,
  useGetClassByIdQuery,
  useCreateClassMutation,
  useUpdateClassMutation,
  useDeleteClassMutation,
} = classesApi;

