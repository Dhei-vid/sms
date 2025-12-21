import {
  createApi,
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import type { RootState } from "@/store";
import { clearError, setError } from "@/store/errorSlice";

const rawBaseQuery = fetchBaseQuery({
  baseUrl:
    process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://api.example.com/api",
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootState;
    const token = (state as any)?.auth?.token;

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    headers.set("Content-Type", "application/json");
    return headers;
  },
});

const baseQueryWithErrorHandling: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await rawBaseQuery(args, api, extraOptions);

  if (result.error) {
    const status = result.error.status;
    const data = result.error.data as { message?: string } | undefined;

    api.dispatch(
      setError({
        code: status,
        message: data?.message ?? "Something went wrong. Please try again.",
        details: data,
      })
    );
  } else {
    api.dispatch(clearError());
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithErrorHandling,
  tagTypes: ["TeacherCourse", "TeacherQuestion", "CanteenProduct", "Auth"],
  endpoints: () => ({}),
});