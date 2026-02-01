import type { ApiListResponse, ApiResponse, ApiDeleteResponse, BaseQueryParams } from "../shared-types";

export interface Grade {
  id: string;
  [key: string]: unknown;
}

export interface CreateGradeRequest {
  school_id?: string;
  [key: string]: unknown;
}

export interface UpdateGradeRequest {
  [key: string]: unknown;
}

export type GradesListResponse = ApiListResponse<Grade>;
export interface GradesQueryParams extends BaseQueryParams {
  studentId?: string;
  courseId?: string;
  limit?: number;
}
