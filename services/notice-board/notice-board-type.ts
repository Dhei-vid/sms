/**
 * Type definitions for Notice Board API responses
 */

export interface Notice {
  id: string;
  title: string;
  content: string;
  authorId: string;
  authorName?: string;
  priority?: "low" | "medium" | "high" | "urgent";
  targetAudience?: ("admin" | "teacher" | "parent" | "student" | "canteen")[];
  attachments?: string[];
  isPublished?: boolean;
  publishedAt?: string;
  expiresAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateNoticeRequest {
  title: string;
  content: string;
  priority?: "low" | "medium" | "high" | "urgent";
  targetAudience?: ("admin" | "teacher" | "parent" | "student" | "canteen")[];
  attachments?: string[];
  expiresAt?: string;
}

export interface UpdateNoticeRequest {
  title?: string;
  content?: string;
  priority?: "low" | "medium" | "high" | "urgent";
  targetAudience?: ("admin" | "teacher" | "parent" | "student" | "canteen")[];
  attachments?: string[];
  isPublished?: boolean;
  expiresAt?: string;
}

export interface NoticesListResponse {
  data: Notice[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface NoticesQueryParams {
  page?: number;
  limit?: number;
  authorId?: string;
  priority?: "low" | "medium" | "high" | "urgent";
  isPublished?: boolean;
  search?: string;
}

