import { ResponseStatus } from "@/common/types";

export type CBTQuestionResponse = { data: [] } & ResponseStatus;

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
