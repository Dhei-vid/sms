import type { ApiListResponse, ApiResponse, ApiDeleteResponse, BaseQueryParams } from "../shared-types";

export interface Course {
  id: string;
  name: string;
  [key: string]: unknown;
}

export interface CreateCourseRequest {
  school_id: string;
  name?: string;
  [key: string]: unknown;
}

export interface UpdateCourseRequest {
  name?: string;
  [key: string]: unknown;
}

export type CoursesListResponse = ApiListResponse<Course>;
export type CourseResponse = ApiResponse<Course>;
export interface CoursesQueryParams extends BaseQueryParams {
  schoolId?: string;
  limit?: number;
}
