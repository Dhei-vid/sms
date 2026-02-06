import { baseApi } from "../baseApi";
import type {
  Class,
  CreateClassRequest,
  UpdateClassRequest,
  ClassesListResponse,
  ClassesQueryParams,
} from "./classes-type";

const BASE = "/classes";

export const classesApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    getClasses: build.query<ClassesListResponse, ClassesQueryParams | void>({
      query: (params) => ({ url: BASE, params: params ?? {} }),
      providesTags: ["Class"],
    }),
    getClassById: build.query<Class, string>({
      query: (id) => ({ url: `${BASE}/${id}` }),
      providesTags: (_, __, id) => [{ type: "Class", id }],
    }),
    createClass: build.mutation<Class, CreateClassRequest>({
      query: (body) => ({ url: BASE, method: "POST", body }),
      invalidatesTags: ["Class"],
    }),
    updateClass: build.mutation<
      Class,
      { id: string; data: UpdateClassRequest }
    >({
      query: ({ id, data }) => ({
        url: `${BASE}/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (_, __, { id }) => [{ type: "Class", id }, "Class"],
    }),
    deleteClass: build.mutation<{ success: boolean; message?: string }, string>(
      {
        query: (id) => ({ url: `${BASE}/${id}`, method: "DELETE" }),
        invalidatesTags: (_, __, id) => [{ type: "Class", id }, "Class"],
      },
    ),
  }),
});

export const {
  useGetClassesQuery,
  useGetClassByIdQuery,
  useCreateClassMutation,
  useUpdateClassMutation,
  useDeleteClassMutation,
} = classesApi;
