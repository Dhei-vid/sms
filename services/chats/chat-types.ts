import type { ApiListResponse } from "../shared-types";
import type { Roles, User } from "../users/users-type";
import type { School } from "../schools/schools-type";

export type ChatResponse = ApiListResponse<Chat>;

export interface Chat {
  id: string;
  creator_id: string;
  updated_by_id?: null;
  school_id: string;
  title: string;
  participants: Array<ChatParticipants>;
  messages: Array<ChatMessages>;
  type: "general" | "staff" | string;
  is_deleted: boolean;
  creator: User;
  updated_by?: null;
  school: School;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
  has_more_messages?: boolean;
}

export interface GetChatByIdParams {
  id: string;
  message_limit?: number;
  message_before?: string;
}

export interface ChatParticipants {
  id: string;
  first_name: string;
  last_name: string;
  username: string;
  role: string;
}

export interface ChatMessages {
  id: string;
  content: string;
  content_type: ContentType;
  role: Roles;
  model_type: string;
  sender: ChatSender;
  created_at: string;
}

export interface ChatSender {
  id: string;
  first_name: string;
  last_name: string;
  username: string;
  role: Roles;
}

export interface SendChatPayload {
  message: string;
  id?: string;
  attachments?: []; // optional
  content_type?: string;
  model_type?: string;
  save_chat?: true; // optional
  type?: "general" | "staff" | string; // optional: general = all staff+teachers, staff = teachers only
  school_id?: string | null; // optional: required for type general/staff
  recipient_id?: string | null; // optional: for 1:1 messages, the other user's id (ULID)
  history: Array<ChatHistory>;
}

export interface ChatHistory {
  role: Roles;
  message: string;
  model_type: string;
}

export interface UpdateChatPayload {
  title: string;
}

type ContentType = "text/plain" | "text/markdown" | "text/html";
