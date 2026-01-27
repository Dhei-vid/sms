import { ResponseStatus } from "@/common/types";

export type CBTResultsResponse = { data: [] } & ResponseStatus;

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
