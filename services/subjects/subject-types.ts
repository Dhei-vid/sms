import { ResponseStatus } from "@/common/types";

export type SubjectListResponse = { data: [] } & ResponseStatus;

export interface CreateSubjectsRequest {
  school_id: string;
  head_of_department_id: string;
  name: string;
  code: string;
}

export interface ContentOutlineItem {
  unit_definition: string;
  topic_definition: string;
  planned_pacing: string;
}

export interface UpdateSubjectPayload {
  school_id: string;
  head_of_department_id: string;

  name: string;
  code: string;

  applicable_grade: string;

  credit_units: number;
  continuous_assessment: number;
  final_exam: number;

  curriculum_standard: string;

  content_outline_table: ContentOutlineItem[];

  status: "draft" | "vetted" | "approved" | string;
}
