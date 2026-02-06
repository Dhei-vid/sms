import type {
  ApiListResponse,
  ApiResponse,
  BaseQueryParams,
} from "../shared-types";

export interface Notice {
  id: string;
  title?: string;
  content?: string;
  createdAt?: string;
  [key: string]: unknown;
}

export interface CreateNoticeRequest {
  [key: string]: unknown;
}

export type NoticesListResponse = ApiListResponse<Notice>;
export interface NoticesQueryParams extends BaseQueryParams {
  limit?: number;
}
