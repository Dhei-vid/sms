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

export interface MessagesListResponse {
  data: Message[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface MessagesQueryParams {
  page?: number;
  limit?: number;
  senderId?: string;
  recipientId?: string;
  isRead?: boolean;
  search?: string;
}

