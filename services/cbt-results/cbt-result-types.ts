import { ResponseStatus } from "@/common/types";

export type CBTResultsResponse = { data: [] } & ResponseStatus;

/** Result as returned by list/detail API */
export interface CbtResult {
  id: string;
  exam_id: string;
  user_id?: string | null;
  stakeholder_id?: string | null;
  score: number;
  percentage: number;
  total_time_spent: number;
  completed_at: string | null;
  created_at: string;
  answers?: Array<{ question_id?: string; selected_option?: number; is_correct?: boolean; time_spent?: number }> | null;
  user?: { id: string; first_name?: string; last_name?: string; email?: string } | null;
  stakeholder?: { id: string; student_id?: string; user?: { first_name?: string; last_name?: string; email?: string } } | null;
  exam?: {
    id: string;
    title: string;
    total_questions?: number | null;
    questions?: Array<{ id: string; question?: string; answer_options?: string[]; correct_answer?: number }> | null;
    question_ids?: string[] | null;
    [key: string]: unknown;
  } | null;
  [key: string]: unknown;
}

export interface CbtResultsQueryParams {
  _all?: boolean;
  page?: number;
  limit?: number;
  /** Filter by exam ID (sent as exam_id[eq]) */
  exam_id?: string;
}

export interface CreateCBTResultsPayload {
  exam_id: string;
  percentage: number;
  score: number;
  total_time_spent: number;
}

export interface UpdateCBTResultsPayload {
  user_id: string;
  school_id: string;
  exam_id: string;
  stakeholder_id: string;
  answers: {
    question_id: string;
    selected_option: number;
    is_correct: boolean;
    time_spent: number;
  }[];
  percentage: number;
  score: number;
  total_time_spent: number;
  completed_at: string;
  status: "Active";
}
