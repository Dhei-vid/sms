import { ResponseStatus } from "@/common/types";

export type CBTExamsResponse = { data: [] } & ResponseStatus;

export interface CreateCBTExamsPayload {
  school_id: string;
  title: string;
  category: string;
  subject: string;
}

export interface AssessmentQuestion {
  id: string;
  question: string;
  options: string[];
  correct_answer: number; // index of the correct option
  category: string;
  subject: string;

  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;

  answer: string; // e.g., "B"
  image?: string | null;
}

export interface AssessmentPayload {
  user_id: string;
  school_id: string;

  title: string;
  category: string;
  subject: string;

  questions: AssessmentQuestion[];

  duration: number; // in minutes
  total_questions: number;
  completed: boolean;

  assessment_name: string;
  assessment_type: string;

  applicable_grades: string; // comma-separated
  applicable_subjects: string; // comma-separated
  applicable_subjects_ids: string[];

  total_marks_available: number;

  type: "general" | "personal" | "others" | string;

  schedule_date: string; // YYYY-MM-DD
  schedule_time: string; // HH:mm
  location_venue: string;

  assigned_invigilators_ids: string[];
  question_ids: string[];

  paper_submission_date: string; // YYYY-MM-DD
  paper_submission_time: string; // HH:mm
  score_submission_date: string; // YYYY-MM-DD
  score_submission_time: string; // HH:mm

  final_grade: number;
  scale_type: string;

  question_shuffle: boolean;
  answer_shuffle: boolean;
  partial_credit: boolean;
  max_attempt: number;
  display_result: string;

  status: "draft" | "vetted" | "approved" | string;
}
