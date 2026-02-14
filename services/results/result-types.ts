import type { ApiResponse, ApiListResponse } from "../shared-types";

export interface SubjectResult {
  id: string;
  subject: string;
  teacher_id: string;
  class_score: number;
  exam_score: number;
  first_ca: number;
  second_ca: number;
  total_score: number;
  grade: string;
  remarks: string | null;
  teacher?: unknown;
  created_at: string;
  updated_at: string;
}

export interface ExamResult {
  id: string;
  creator_id: string | null;
  updated_by_id: string | null;
  school_id: string | null;
  student_id: string;
  exam_id: string | null;
  term: string;
  session: string;
  class_name: string;
  grade: string | null;
  subject_results: SubjectResult[];
  total_score: number;
  average_score: number;
  position: number | null;
  teacher_remarks: string | null;
  principal_remarks: string | null;
  student?: unknown;
  school?: unknown;
  creator?: unknown;
  updated_by?: unknown;
  created_at: string;
  updated_at: string;
}

export type ExamResultsListResponse = ApiListResponse<ExamResult> | {
  status: boolean;
  status_code: number;
  message: string;
  data: ExamResult[];
};

export interface ExamResultsQueryParams {
  _all?: boolean;
  page?: number;
  limit?: number;
  session?: string;
  term?: string;
  "class_name[eq]"?: string;
  "term[eq]"?: string;
  "session[eq]"?: string;
  "student_id[eq]"?: string;
  "school_id[eq]"?: string;
}

export interface UpdateExamResultRequest {
  principal_remarks?: string;
  teacher_remarks?: string;
  grade?: string;
  total_score?: number;
  average_score?: number;
  position?: number;
  subject_results?: unknown[];
}
