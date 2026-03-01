import type { ApiResponse, ApiListResponse } from "../shared-types";
import { Stakeholders } from "../stakeholders/stakeholder-types";

export interface Result {
  id: string;
  creator_id: string;
  updated_by_id?: null | string;
  exam_id: string;
  term: string;
  session: string;
  class_name: string;
  grade: string;
  subject_results: Array<SubjectResult>;
}

interface SubjectResult {
  id: string;
  subject: string;
  class_score: number;
  exam_score: number;
  total_score: number;
  grade: string;
  remarks: string;
  teacher: Stakeholders;
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
  student_id: string;
  principal_remarks: string;
}

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
