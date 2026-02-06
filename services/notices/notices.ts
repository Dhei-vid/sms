import { baseApi } from "../baseApi";
import type {
  Notice,
  NoticesListResponse,
  NoticesQueryParams,
} from "./notice-types";

const BASE = "/notices";

export const noticesApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    getNotices: build.query<NoticesListResponse, NoticesQueryParams | void>({
      query: (params) => ({ url: BASE, params: params ?? {} }),
      providesTags: ["Notice"],
    }),
    getNoticeById: build.query<Notice, string>({
      query: (id) => ({ url: `${BASE}/${id}` }),
      providesTags: (_, __, id) => [{ type: "Notice", id }],
    }),
  }),
});

export const { useGetNoticesQuery, useGetNoticeByIdQuery } = noticesApi;
