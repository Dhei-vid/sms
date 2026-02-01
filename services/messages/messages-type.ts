import type { ApiListResponse, ApiResponse, ApiDeleteResponse, BaseQueryParams } from "../shared-types";

export interface Message {
  id: string;
  [key: string]: unknown;
}

export interface CreateMessageRequest {
  [key: string]: unknown;
}

export type MessagesListResponse = ApiListResponse<Message>;
export interface MessagesQueryParams extends BaseQueryParams {}
