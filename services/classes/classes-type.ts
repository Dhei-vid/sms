import type {
  ApiListResponse,
  ApiResponse,
  ApiDeleteResponse,
  BaseQueryParams,
} from "../shared-types";

export interface Class {
  id: string;
  name: string;
  [key: string]: unknown;
}

export interface CreateClassRequest {
  school_id: string;
  name: string;
  [key: string]: unknown;
}

export interface UpdateClassRequest {
  name?: string;
  [key: string]: unknown;
}

export type ClassesListResponse = ApiListResponse<Class>;
export type ClassResponse = ApiResponse<Class>;
export type DeleteClassResponse = ApiDeleteResponse;

export interface ClassesQueryParams extends BaseQueryParams {
  schoolId?: string;
  search?: string;
}
