import { ResponseStatus } from "@/common/types";

export type CBTQuestionResponse = { data: [] } & ResponseStatus;

/** Question as returned by list/detail API */
export interface CbtQuestion {
  id: string;
  question: string;
  answer_options: string[];
  correct_answer: number;
  explanation: string | null;
  subject: string;
  topic_covered?: number | null;
  type?: string | null;
  category?: string | null;
  tag?: string | null;
  status?: string | null;
  creator_id?: string | null;
  creator?: { id: string; email?: string; first_name?: string; last_name?: string } | null;
  created_at?: string;
  [key: string]: unknown;
}

export interface CbtQuestionsQueryParams {
  _all?: boolean;
  page?: number;
  limit?: number;
}

export interface CreateCBTQuestionPayload {
  school_id: string;
  question: string;
  subject: string;
  correct_answer: number;
}

export interface UpdateCBTQuestionPayload {
  school_id: string;
  question: string;
  subject: string;
  correct_answer: number;
  answer_options: string[];
  explanation: string;
}
