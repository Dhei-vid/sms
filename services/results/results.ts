import { baseApi } from "../baseApi";
import type {
  ExamResult,
  ExamResultsListResponse,
  ExamResultsQueryParams,
  UpdateExamResultRequest,
} from "./result-types";
import type { AcademicAnalytics } from "./academic-analytics-types";

const BASE = "/results/";

/** Raw API response when using _all - returns { data: ExamResult[] } */
interface ResultsApiResponse {
  status?: boolean;
  status_code?: number;
  message?: string;
  data: ExamResult[];
}

function computeAcademicAnalytics(data: ExamResult[]): AcademicAnalytics {
  const gradeCounts: Record<string, number> = {
    "A+": 0,
    A: 0,
    B: 0,
    C: 0,
    D: 0,
    E: 0,
    F: 0,
  };

  let totalScore = 0;
  let scoreCount = 0;

  for (const er of data) {
    if (er.average_score != null && er.average_score > 0) {
      totalScore += er.average_score;
      scoreCount += 1;
    }
    if (er.subject_results?.length) {
      for (const sr of er.subject_results) {
        const g = (sr.grade || "F").trim().toUpperCase();
        if (g === "A+" && gradeCounts["A+"] !== undefined) gradeCounts["A+"] += 1;
        else if (gradeCounts[g] !== undefined) gradeCounts[g] += 1;
        else gradeCounts["F"] += 1;
      }
    } else if (er.grade) {
      const g = (er.grade || "F").trim().toUpperCase();
      if (g === "A+" && gradeCounts["A+"] !== undefined) gradeCounts["A+"] += 1;
      else if (gradeCounts[g] !== undefined) gradeCounts[g] += 1;
      else gradeCounts["F"] += 1;
    }
  }

  const average_score = scoreCount > 0 ? Math.round((totalScore / scoreCount) * 10) / 10 : 0;

  const grade_distribution = [
    { label: "A-Grade", grade: "A+", value: gradeCounts["A+"] + gradeCounts["A"] },
    { label: "B-Grade", grade: "B", value: gradeCounts["B"] },
    { label: "C-Grade", grade: "C", value: gradeCounts["C"] },
    { label: "D-Grade", grade: "D", value: gradeCounts["D"] },
    { label: "E-Grade", grade: "E", value: gradeCounts["E"] },
    { label: "F-Grade", grade: "F", value: gradeCounts["F"] },
  ];

  return {
    average_score,
    grade_distribution,
    session: "",
    term: "",
    class_filter: "",
  };
}

export interface AcademicAnalyticsParams {
  session?: string;
  term?: string;
  class_name?: string;
  school_id?: string;
}

export const resultsApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    getExamResults: build.query<
      ExamResultsListResponse,
      ExamResultsQueryParams | void
    >({
      query: (params) => ({ url: BASE, params: params ?? {} }),
      providesTags: ["ExamResult"],
    }),

    getAllExamResults: build.query<
      ExamResultsListResponse,
      ExamResultsQueryParams | void
    >({
      query: (params) => ({
        url: BASE,
        params: { _all: true, ...params },
      }),
      providesTags: ["ExamResult"],
    }),

    getExamResultById: build.query<{ data: ExamResult }, string>({
      query: (id) => ({ url: `${BASE}${id}` }),
      providesTags: (_, __, id) => [{ type: "ExamResult", id }],
    }),

    /** Uses GET /results with _all and transformResponse - no separate analytics endpoint */
    getAcademicAnalytics: build.query<
      AcademicAnalytics,
      AcademicAnalyticsParams | void
    >({
      query: (params) => {
        const queryParams: Record<string, string> = { _all: "true" };
        if (params?.session) queryParams["session[eq]"] = params.session;
        if (params?.term) queryParams["term[eq]"] = params.term;
        if (params?.class_name && params.class_name !== "all")
          queryParams["class_name[like]"] = params.class_name;
        if (params?.school_id) queryParams["school_id[eq]"] = params.school_id;
        return { url: BASE, params: queryParams };
      },
      transformResponse: (response: ResultsApiResponse): AcademicAnalytics => {
        const data = response?.data ?? [];
        return computeAcademicAnalytics(data);
      },
      providesTags: ["ExamResult"],
    }),

    updateExamResult: build.mutation<
      { data: ExamResult },
      { id: string; data: UpdateExamResultRequest }
    >({
      query: ({ id, data }) => ({
        url: `${BASE}${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (_, __, { id }) => [{ type: "ExamResult", id }, "ExamResult"],
    }),
  }),
});

export const {
  useGetExamResultsQuery,
  useGetAllExamResultsQuery,
  useGetExamResultByIdQuery,
  useGetAcademicAnalyticsQuery,
  useUpdateExamResultMutation,
} = resultsApi;
