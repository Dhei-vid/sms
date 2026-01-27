import type {
  ApiResponse,
  ApiListResponse,
  ApiDeleteResponse,
  BaseQueryParams,
} from "../shared-types";

/**
 * Type definitions for Messages API responses
 */

export interface Message {
  id: string;
  senderId: string;
  senderName?: string;
  recipientId: string;
  recipientName?: string;
  subject?: string;
  content: string;
  isRead?: boolean;
  readAt?: string;
  createdAt?: string;
}

export interface CreateMessageRequest {
  recipientId: string;
  subject?: string;
  content: string;
}

/**
 * Messages list response with pagination
 */
export type MessageListResponse = ApiListResponse<Message>;

/**
 * Message response for single entity operations
 */
export type MessageResponse = ApiResponse<Message>;

/**
 * Delete message response
 */
export type DeleteMessageResponse = ApiDeleteResponse;

/**
 * Message query parameters for filtering and pagination
 */
export interface MessageQueryParams extends BaseQueryParams {
  senderId?: string;
  recipientId?: string;
  isRead?: boolean;
}

