import type { ApiResponse, ApiListResponse } from "../shared-types";
import { Stakeholders } from "../stakeholders/stakeholder-types";

/** Subject result (per-subject scores) from the API */
export interface SubjectResult {
  id: string;
  subject: string;
  class_score: number;
  exam_score: number;
  first_ca?: number;
  second_ca?: number;
  total_score: number;
  grade: string;
  remarks: string;
  teacher: Stakeholders;
  created_at?: string;
  updated_at?: string;
}

export interface Result {
  id: string;
  creator_id: string;
  updated_by_id?: null | string;
  exam_id: string;
  term: string;
  session: string;
  class_name: string;
  grade: string;
  subject_results: SubjectResult[];
}

/** Exam result as returned by GET /results (matches backend ExamResultSerializer) */
export interface ExamResult extends Result {
  student_id?: string;
  student?: Record<string, unknown>;
  school_id?: string;
  school?: Record<string, unknown>;
  total_score: number;
  average_score: number;
  position: number;
  teacher_remarks: string | null;
  principal_remarks: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface CreateResultParams {
  student_id: string;
  exam_id: string;
  term: string;
  session: string;
  class_name: string;
  grade: string;
  subject_results: Array<SubjectResult>;
  total_score: number;
  average_score: number;
  position: number;
  teacher_remarks: string;
  principal_remarks: string;
}

export interface UpdateResultParams {
  student_id?: string;
  principal_remarks?: string;
}

/** Params for PUT /results/:id (partial update). Call as { id, principal_remarks } or { id, data: { principal_remarks } }. */
export interface UpdateExamResultParams {
  id: string;
  principal_remarks?: string;
  student_id?: string;
  /** Alternative: pass update fields under data (e.g. { id, data: { principal_remarks } }) */
  data?: Partial<UpdateResultParams>;
}

/** Query params for GET /results (supports _all and filter keys like class_name[eq], term[eq], session[eq]) */
export interface ExamResultsQueryParams {
  _all?: boolean;
  [key: string]: string | boolean | number | undefined;
}

/** List response: backend may return data as array or { data: array } */
export type ExamResultsListResponse = ApiResponse<ExamResult[]>;

// WHY??
export interface DeleteResultParams {
  creator_id: string;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  birthday: string;
  gender: string;
  status: string;
  is_active: boolean;
  is_staff: boolean;
  is_superuser: boolean;
  role: string;
  profile_image_url: string;
  profile_image_public_id: string;
  language_preference: string;
  theme: string;
  api_usage: number;
  model_preferences: string[];
  training_data: string[];
  personalization_settings: { height: string };
  two_factor_enabled: boolean;
  data_sharing_consent: boolean;
}

export interface RecordResultsParams {
  results: Array<{
    student_id: string;
    exam_id: string;
    term: string;
    session: string;
    class_name: string;
    grade: string;
    subject_results: SubjectResult;
    total_score: number;
    average_score: number;
    position: number;
    teacher_remarks: string;
    principal_remarks: string;
    is_deleted: boolean;
  }>;
}

/** Single grade bucket in the distribution (e.g. A-Grade, B-Grade) */
export interface GradeDistributionItem {
  label: string;
  grade: string;
  value: number;
  percentage: number;
}

export interface ResultMetrics {
  average_score: number;
  average_grade_letter: string;
  grade_distribution: GradeDistributionItem[];
  total_students: number;
}

export type ResultResponse = ApiResponse<Result>;
